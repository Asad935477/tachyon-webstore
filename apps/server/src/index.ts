import { serve } from "@hono/node-server";
import { trpcServer } from "@hono/trpc-server";
import { createContext } from "@tachyon-webstore/api/context";
import { sendOrderReceipt } from "@tachyon-webstore/api/receipt";
import { appRouter } from "@tachyon-webstore/api/routers/index";
import { stripe } from "@tachyon-webstore/api/stripe";
import { auth } from "@tachyon-webstore/auth";
import prisma from "@tachyon-webstore/db";
import { env } from "@tachyon-webstore/env/server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import type Stripe from "stripe";

const app = new Hono();

app.use(logger());
app.use(
	"/*",
	cors({
		origin: env.CORS_ORIGIN,
		allowMethods: ["GET", "POST", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

/**
 * ═════════════════════════════════════════════════════════════════════════════
 * STRIPE WEBHOOK — Order Processing Algorithm (Level 2 DFD), step 3.4
 * ═════════════════════════════════════════════════════════════════════════════
 *
 * Flow (strict per DFD):
 *   3.4 Listen for `checkout.session.completed`.
 *   3.4.6 Inside the handler, run ONE Prisma interactive `$transaction` that
 *        simultaneously:
 *          a. creates the ORDER row with nested ORDER_ITEM rows, and
 *          b. decrements the `stock` of each purchased PRODUCT.
 *   3.4.7 Trigger the mock email receipt function.
 *
 * Reliability notes:
 *   - Idempotency: Stripe may deliver the same event more than once. Because
 *     `Order.stripeSessionId` is unique, a duplicate event is detected and
 *     short-circuited before any writes occur.
 *   - Atomicity: the ORDER creation and every stock decrement share one
 *     interactive transaction. If any decrement fails (e.g. stock was raced
 *     to zero by a concurrent checkout), the transaction rolls back and the
 *     handler returns 500 so Stripe retries the event later.
 * ═════════════════════════════════════════════════════════════════════════════
 */

/** Resolves the USER row an ORDER should belong to (see USER 1-to-many ORDER). */
async function resolveOrderUser(session: Stripe.Checkout.Session) {
	const email = session.customer_details?.email;

	// 1) Authenticated checkout: the session carries the user id in metadata.
	if (session.metadata?.userId) {
		const existing = await prisma.user.findUnique({
			where: { id: session.metadata.userId },
		});
		if (existing) {
			return existing;
		}
	}

	// 2) Returning guest: match by the email collected by Stripe Hosted
	//    Checkout.
	if (email) {
		const existing = await prisma.user.findUnique({ where: { email } });
		if (existing) {
			return existing;
		}
	}

	// 3) Brand-new guest: materialize a minimal USER row so the ORDER's
	//    required foreign key can be satisfied. A unique synthetic email is
	//    used when Stripe did not provide one.
	const syntheticEmail = `${session.id}@guest.tachyon.local`;
	const name =
		session.customer_details?.name ?? email?.split("@")[0] ?? "Guest";

	return prisma.user.create({
		data: {
			name,
			email: email ?? syntheticEmail,
			role: "customer",
		},
	});
}

/** Handles a single `checkout.session.completed` event. */
async function handleCheckoutCompleted(
	session: Stripe.Checkout.Session,
): Promise<"processed" | "skipped"> {
	// ── Idempotency guard ──────────────────────────────────────────────────
	const existing = await prisma.order.findUnique({
		where: { stripeSessionId: session.id },
	});
	if (existing) {
		return "skipped";
	}

	// ── Recover the cart payload from Stripe ───────────────────────────────
	// The checkout mutation attached each PRODUCT id to its line item's
	// product metadata; quantities come from the line items themselves. This
	// is the authoritative, payment-backed source of truth for the order.
	const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
		expand: ["data.price.product"],
	});

	const purchased = lineItems.data.map((item) => {
		// `price.product` may be a full Product, a DeletedProduct, or an id
		// string; only a live Product carries our metadata.
		const product = item.price?.product;
		const productId =
			typeof product === "object" &&
			product !== null &&
			"metadata" in product &&
			product.metadata
				? product.metadata.productId
				: undefined;
		const quantity = item.quantity ?? 0;
		if (!productId || quantity <= 0) {
			throw new Error(
				`Line item ${item.id} is missing product metadata (productId: ${productId}, quantity: ${quantity})`,
			);
		}
		return { productId, quantity };
	});

	if (purchased.length === 0) {
		throw new Error(`Checkout Session ${session.id} has no line items`);
	}

	// ── Total from Stripe (never from the client) ──────────────────────────
	// `amount_total` is the Stripe-verified gross in minor units (cents),
	// matching the price convention used across the schema.
	const totalAmount = session.amount_total;
	if (totalAmount === null || totalAmount < 0) {
		throw new Error(`Checkout Session ${session.id} has no amount_total`);
	}

	// Cross-check against the server-calculated total (DFD 3.2) that the
	// checkout mutation stored on the session. A mismatch is logged — it
	// means prices changed between checkout and payment — but it never blocks
	// an already-paid order from being persisted.
	const expectedTotal = Number(session.metadata?.expectedTotal);
	if (Number.isFinite(expectedTotal) && expectedTotal !== totalAmount) {
		console.warn(
			`[stripe] total mismatch on ${session.id}: server calculated ${expectedTotal}, Stripe charged ${totalAmount}`,
		);
	}

	// ── Link the order to a USER (ERD: USER 1-to-many ORDER) ───────────────
	const user = await resolveOrderUser(session);

	const email = session.customer_details?.email ?? user.email;

	// ── 3.4.6 Prisma interactive transaction ───────────────────────────────
	// Both writes happen "simultaneously" inside one transaction:
	//   a. CREATE the ORDER with its nested ORDER_ITEM rows.
	//   b. DECREMENT the stock of every purchased PRODUCT.
	// The guarded `updateMany` (stock >= quantity) prevents overselling when
	// two webhook deliveries race; a zero update throws, rolling back the
	// ORDER that was just created.
	const order = await prisma.$transaction(async (tx) => {
		const created = await tx.order.create({
			data: {
				userId: user.id,
				email,
				stripeSessionId: session.id,
				status: "paid",
				totalAmount,
				// Auxiliary column (not part of the core ERD): persisted for
				// fulfillment purposes only.
				shippingAddress:
					(session.customer_details?.address as object | undefined) ??
					undefined,
				items: {
					create: purchased.map(({ productId, quantity }) => ({
						productId,
						quantity,
					})),
				},
			},
			include: { items: true },
		});

		for (const { productId, quantity } of purchased) {
			const { count } = await tx.product.updateMany({
				where: { id: productId, stock: { gte: quantity } },
				data: { stock: { decrement: quantity } },
			});
			if (count === 0) {
				// Aborts the whole transaction: the ORDER row is rolled back
				// and the webhook returns 500 so Stripe retries.
				throw new Error(
					`Insufficient stock for product ${productId} (wanted ${quantity})`,
				);
			}
		}

		return created;
	});

	// ── 3.4.7 Send receipt (mock email) ────────────────────────────────────
	await sendOrderReceipt(order);

	return "processed";
}

app.post("/api/stripe/webhook", async (c) => {
	// 1) The signature header is mandatory; without it the event cannot be
	//    verified and must be rejected immediately.
	const signature = c.req.header("stripe-signature");
	if (!signature) {
		return c.json({ error: "Missing stripe-signature header" }, 400);
	}

	// 2) Verify the payload with the webhook signing secret. `constructEventAsync`
	//    returns a typed Event; a mismatch throws and we respond 400.
	let event: Stripe.Event;
	try {
		event = await stripe.webhooks.constructEventAsync(
			await c.req.text(),
			signature,
			env.STRIPE_WEBHOOK_SECRET,
		);
	} catch (err) {
		console.error("Stripe webhook signature verification failed:", err);
		return c.json(
			{ error: err instanceof Error ? err.message : "Invalid signature" },
			400,
		);
	}

	// 3) Dispatch on the event type. Only `checkout.session.completed`
	//    materializes an ORDER; everything else is acknowledged so Stripe
	//    stops retrying.
	if (event.type === "checkout.session.completed") {
		const session = event.data.object as Stripe.Checkout.Session;
		try {
			const result = await handleCheckoutCompleted(session);
			console.log(
				`[stripe] checkout.session.completed ${session.id} → ${result}`,
			);
		} catch (err) {
			// A 500 here makes Stripe retry the event (with backoff). Because
			// the handler is idempotent + transactional, retries are safe.
			console.error(
				`[stripe] failed to process checkout.session.completed ${session.id}:`,
				err,
			);
			return c.json(
				{
					error:
						err instanceof Error
							? err.message
							: "Failed to process checkout completion",
				},
				500,
			);
		}
	} else {
		console.log(`[stripe] ignored event type: ${event.type}`);
	}

	return c.json({ received: true });
});

app.use(
	"/trpc/*",
	trpcServer({
		router: appRouter,
		createContext: (_opts, context) => {
			return createContext({ context });
		},
	}),
);

app.get("/", (c) => {
	return c.text("OK");
});

const port = Number(process.env.PORT ?? 3000);

serve(
	{
		fetch: app.fetch,
		port,
	},
	(info) => {
		console.log(`Server running at http://localhost:${info.port}`);
	},
);

export default app;
