"use client";

import { Button } from "@tachyon-webstore/ui/components/button";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

import { CartItemRow } from "@/components/cart-item";
import { CheckoutButton } from "@/components/checkout-button";
import { OrderSummary } from "@/components/order-summary";
import { useCart } from "@/lib/cart-context";

export function CheckoutView() {
	const { items, subtotal } = useCart();

	if (items.length === 0) {
		return (
			<div className="mx-auto max-w-3xl px-4 py-16 text-center">
				<p className="text-muted-foreground">Your cart is empty.</p>
				<Link href="/products">
					<Button className="mt-4">Browse products</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-7xl px-4 py-10">
			<h1 className="mb-8 font-semibold text-3xl tracking-tight">Checkout</h1>
			<div className="grid gap-8 lg:grid-cols-[1fr_360px]">
				<div className="space-y-4">
					<div>
						{items.map((item) => (
							<CartItemRow
								key={`${item.productId}:${item.variantId ?? "default"}`}
								item={item}
							/>
						))}
					</div>
					<div className="flex items-center gap-2 text-muted-foreground text-xs">
						<ShieldCheck className="size-4" />
						Payment is processed securely by Stripe.
					</div>
				</div>
				<div className="space-y-4">
					<OrderSummary subtotal={subtotal} />
					<CheckoutButton />
				</div>
			</div>
		</div>
	);
}
