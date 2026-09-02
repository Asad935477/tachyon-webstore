import prisma from "@tachyon-webstore/db";
import { env } from "@tachyon-webstore/env/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { publicProcedure, router } from "../index";
import { stripe } from "../stripe";

/**
 * ═════════════════════════════════════════════════════════════════════════════
 * CHECKOUT ROUTER — Order Processing Algorithm (Level 2 DFD)
 * ═════════════════════════════════════════════════════════════════════════════
 *
 * 3.1 Validate Inventory  →  quantity must be <= product.stock (Prisma query),
 *                           otherwise a TRPCError is thrown.
 * 3.2 Calculate Total     →  prices are NEVER trusted from the client; the
 *                           server re-reads product.price from the database
 *                           and computes the order total itself.
 * 3.3 Generate Session    →  a Stripe Checkout Session is created and the
 *                           redirect URL returned to the caller.
 * 3.4 Webhook Success     →  (handled by /api/stripe/webhook in apps/server)
 *                           the ORDER is only created AFTER Stripe confirms
 *                           payment, inside a single Prisma transaction that
 *                           also decrements stock.
 *
 * Money convention: all prices are stored as integer minor units (cents) in
 * the database. Stripe's `unit_amount` expects minor units, so the value is
 * rounded and validated before it is sent.
 * ═════════════════════════════════════════════════════════════════════════════
 */

/** A single cart line: a product id plus the requested quantity. */
const checkoutItemSchema = z.object({
	productId: z.string().min(1),
	quantity: z.number().int().positive().max(99),
});

export const checkoutRouter = router({
	/**
	 * 3.1 → 3.3 — Create a Stripe Checkout Session for the given cart payload.
	 *
	 * The client (Zustand cart store) sends ONLY product ids and quantities.
	 * Unit prices and the order total are resolved from the database here so a
	 * tampered client cannot under-pay.
	 */
	createSession: publicProcedure
		.input(
			z.object({
				items: z.array(checkoutItemSchema).min(1),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			// Stripe requires whole minor units (cents); floats from the ERD
			// are rounded defensively and rejected if the stored price is not a
			// sensible minor-unit amount.
			const minorUnitPrice = (price: number): number => {
				const units = Math.round(price);
				if (!Number.isFinite(price) || units <= 0) {
					throw new TRPCError({
						code: "INTERNAL_SERVER_ERROR",
						message: "Invalid product price configuration",
					});
				}
				return units;
			};

			// ── 3.1 Validate Inventory ────────────────────────────────────────
			// Merge duplicate product ids from the client into single lines
			// (quantities summed) so Stripe receives exactly one line per
			// product, then resolve every line against the database.
			const merged = new Map<string, number>();
			for (const { productId, quantity } of input.items) {
				merged.set(productId, (merged.get(productId) ?? 0) + quantity);
			}

			const resolved = await Promise.all(
				[...merged].map(async ([productId, quantity]) => {
					const product = await prisma.product.findUnique({
						where: { id: productId },
						include: {
							// Only the first image is needed for the checkout
							// summary rendered inside Stripe Hosted Checkout.
							images: { orderBy: { position: "asc" }, take: 1 },
						},
					});

					// A missing (or non-active) product can never be purchased.
					if (product?.status !== "active") {
						throw new TRPCError({
							code: "NOT_FOUND",
							message: `Product ${productId} does not exist or is not available`,
						});
					}

					// 3.1 — Inventory check: requested quantity must not exceed
					// the available stock. Throw a typed tRPC error when sold
					// out (or partially out of stock).
					if (quantity > product.stock) {
						throw new TRPCError({
							code: "CONFLICT",
							message:
								product.stock === 0
									? `"${product.title}" is out of stock`
									: `Only ${product.stock} unit(s) of "${product.title}" are left, but ${quantity} were requested`,
						});
					}

					return {
						product,
						quantity,
						// Rounded once here so the total we calculate matches
						// what Stripe will actually charge, cent for cent.
						unitAmount: minorUnitPrice(product.price),
					};
				}),
			);

			// ── 3.2 Calculate Total (server-side only) ───────────────────────
			// Aggregate the total from DB prices. The client's cart subtotal is
			// deliberately ignored.
			const totalAmount = resolved.reduce(
				(sum, { unitAmount, quantity }) => sum + unitAmount * quantity,
				0,
			);

			// Redirect destinations for Stripe Hosted Checkout. The literal
			// `{CHECKOUT_SESSION_ID}` template is replaced by Stripe so the
			// success page can query this router for the paid order.
			const successUrl = new URL("/checkout/success", env.CORS_ORIGIN);
			successUrl.searchParams.set("session_id", "{CHECKOUT_SESSION_ID}");
			const cancelUrl = new URL("/checkout/cancel", env.CORS_ORIGIN);

			// ── 3.3 Generate Stripe Session ──────────────────────────────────
			let session: Awaited<ReturnType<typeof stripe.checkout.sessions.create>>;
			try {
				session = await stripe.checkout.sessions.create({
					mode: "payment",
					// Metadata travels with the session into the webhook:
					//  - userId links the ORDER to the authenticated USER row
					//    (guests are resolved by their Stripe customer email).
					//  - expectedTotal is the server-calculated total (3.2), so
					//    the webhook can detect any mismatch with the amount
					//    Stripe actually charged.
					metadata: {
						...(ctx.session?.user?.id ? { userId: ctx.session.user.id } : {}),
						expectedTotal: String(totalAmount),
					},
					customer_email: ctx.session?.user?.email,
					line_items: resolved.map(({ product, quantity, unitAmount }) => ({
						quantity,
						price_data: {
							currency: product.currency,
							unit_amount: unitAmount,
							product_data: {
								name: product.title,
								...(product.description
									? { description: product.description.slice(0, 500) }
									: {}),
								...(product.images[0]?.url
									? { images: [product.images[0].url] }
									: {}),
								// productId metadata lets the webhook map Stripe
								// line items back to PRODUCT rows when it builds
								// ORDER_ITEM records and decrements stock.
								metadata: { productId: product.id },
							},
						},
					})),
					success_url: successUrl.toString(),
					cancel_url: cancelUrl.toString(),
				});
			} catch (err) {
				// Surface Stripe failures as an internal error; the original
				// error is attached as the cause for server-side debugging.
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Could not create Stripe Checkout Session",
					cause: err,
				});
			}

			// Stripe docs: session.url may be null if the session is not ready;
			// refuse rather than redirecting the client into a dead end.
			if (!session.url) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Stripe did not return a checkout URL",
				});
			}

			return {
				url: session.url,
				sessionId: session.id,
				// Server-calculated total (3.2) in minor units — echoed back to
				// the client for display only; it is never used for charging.
				total: totalAmount,
			};
		}),

	/**
	 * Query used by the /checkout/success page to render the confirmed order.
	 * The order itself is created by the Stripe webhook (see 3.4), so this
	 * endpoint simply looks it up by the Stripe Session id.
	 */
	getSessionStatus: publicProcedure
		.input(z.object({ sessionId: z.string().min(1) }))
		.query(async ({ input }) => {
			const order = await prisma.order.findUnique({
				where: { stripeSessionId: input.sessionId },
				include: { items: true },
			});

			if (!order) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Order not found yet — it appears once payment is confirmed",
				});
			}

			return {
				id: order.id,
				status: order.status,
				email: order.email,
				// The ERD ORDER model stores `totalAmount`; it is exposed as
				// `total` for the client. All prices are USD minor units.
				total: order.totalAmount,
				currency: "usd",
				items: order.items,
			};
		}),
});
