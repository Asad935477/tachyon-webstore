import prisma from "@tachyon-webstore/db";
import { env } from "@tachyon-webstore/env/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { publicProcedure, router } from "../index";
import { stripe } from "../stripe";

const checkoutItemSchema = z.object({
	productId: z.string().min(1),
	variantId: z.string().optional(),
	quantity: z.number().int().positive().max(99),
});

export const checkoutRouter = router({
	createSession: publicProcedure
		.input(z.object({ items: z.array(checkoutItemSchema).min(1) }))
		.mutation(async ({ ctx, input }) => {
			const resolved = await Promise.all(
				input.items.map(async ({ productId, variantId, quantity }) => {
					const product = await prisma.product.findUnique({
						where: { id: productId },
						include: {
							images: { orderBy: { position: "asc" }, take: 1 },
							variants: { orderBy: { position: "asc" } },
						},
					});

					if (product?.status !== "active") {
						throw new TRPCError({
							code: "NOT_FOUND",
							message: `Product ${productId} not found`,
						});
					}

					const variant = variantId
						? product.variants.find((v) => v.id === variantId)
						: (product.variants.find((v) => v.isDefault) ??
							product.variants[0]);

					if (!variant) {
						throw new TRPCError({
							code: "BAD_REQUEST",
							message: `No variant for ${product.name}`,
						});
					}

					const price = variant.price ?? product.price;

					return {
						product,
						variant,
						quantity,
						unitPrice: price,
						lineTotal: price * quantity,
					};
				}),
			);

			const subtotal = resolved.reduce((sum, item) => sum + item.lineTotal, 0);
			const shipping = 0;
			const tax = 0;
			const total = subtotal + shipping + tax;
			const email = ctx.session?.user?.email ?? "guest@example.com";

			const order = await prisma.order.create({
				data: {
					userId: ctx.session?.user?.id ?? null,
					email,
					stripeSessionId: "pending",
					status: "pending",
					subtotal,
					shipping,
					tax,
					total,
					currency: "usd",
					items: {
						create: resolved.map((item) => ({
							productId: item.product.id,
							variantId: item.variant.id,
							name: item.variant.name,
							sku: item.variant.sku,
							price: item.unitPrice,
							quantity: item.quantity,
							image: item.product.images[0]?.url ?? null,
						})),
					},
				},
			});

			const successUrl = new URL("/checkout/success", env.CORS_ORIGIN);
			successUrl.searchParams.set("session_id", "{CHECKOUT_SESSION_ID}");
			const cancelUrl = new URL("/checkout/cancel", env.CORS_ORIGIN);

			const session = await stripe.checkout.sessions.create({
				mode: "payment",
				client_reference_id: order.id,
				customer_email: email === "guest@example.com" ? undefined : email,
				line_items: resolved.map((item) => ({
					quantity: item.quantity,
					price_data: {
						currency: "usd",
						unit_amount: item.unitPrice,
						product_data: {
							name: item.variant.name,
							...(item.product.description
								? { description: item.product.description.slice(0, 500) }
								: {}),
							...(item.product.images[0]?.url
								? { images: [item.product.images[0].url] }
								: {}),
							metadata: {
								productId: item.product.id,
								variantId: item.variant.id,
							},
						},
					},
				})),
				success_url: successUrl.toString(),
				cancel_url: cancelUrl.toString(),
			});

			await prisma.order.update({
				where: { id: order.id },
				data: { stripeSessionId: session.id },
			});

			return { url: session.url, sessionId: session.id };
		}),

	getSessionStatus: publicProcedure
		.input(z.object({ sessionId: z.string().min(1) }))
		.query(async ({ input }) => {
			const order = await prisma.order.findUnique({
				where: { stripeSessionId: input.sessionId },
				include: { items: true },
			});

			if (!order) {
				throw new TRPCError({ code: "NOT_FOUND", message: "Order not found" });
			}

			return {
				id: order.id,
				status: order.status,
				email: order.email,
				total: order.total,
				currency: order.currency,
				items: order.items,
			};
		}),
});
