import { trpcServer } from "@hono/trpc-server";
import { createContext } from "@tachyon-webstore/api/context";
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

app.post("/api/stripe/webhook", async (c) => {
	const signature = c.req.header("stripe-signature");
	if (!signature) {
		return c.json({ error: "Missing stripe-signature header" }, 400);
	}

	let event: Stripe.Event;
	try {
		event = await stripe.webhooks.constructEventAsync(
			await c.req.text(),
			signature,
			env.STRIPE_WEBHOOK_SECRET,
		);
	} catch (err) {
		return c.json(
			{ error: err instanceof Error ? err.message : "Invalid signature" },
			400,
		);
	}

	if (event.type === "checkout.session.completed") {
		const session = event.data.object as Stripe.Checkout.Session;
		const stripeSessionId = session.id;

		const order = await prisma.order.findUnique({
			where: { stripeSessionId },
			include: { items: true },
		});

		if (order && order.status !== "paid") {
			await prisma.$transaction(async (tx) => {
				await tx.order.update({
					where: { id: order.id },
					data: {
						status: "paid",
						email: session.customer_details?.email ?? order.email,
						shippingAddress:
							(session.customer_details?.address as object | undefined) ??
							undefined,
					},
				});

				for (const item of order.items) {
					if (item.variantId) {
						await tx.productVariant.update({
							where: { id: item.variantId },
							data: { stock: { decrement: item.quantity } },
						});
					}
				}
			});
		}
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

export default app;
