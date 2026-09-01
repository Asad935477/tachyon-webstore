"use client";

import { buttonVariants } from "@tachyon-webstore/ui/components/button";
import { cn } from "@tachyon-webstore/ui/lib/utils";
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
				<Link href="/products" className={cn(buttonVariants(), "mt-4")}>
					Browse products
				</Link>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
			<h1 className="mb-8 text-3xl font-semibold tracking-tight">Checkout</h1>
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
					<div className="flex items-center gap-2 text-xs text-muted-foreground">
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
