"use client";

import { Button } from "@tachyon-webstore/ui/components/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { CartItemRow } from "@/components/cart-item";
import { EmptyState } from "@/components/empty-state";
import { OrderSummary } from "@/components/order-summary";
import { useCart } from "@/lib/cart-context";

export function CartView() {
	const { items, subtotal, clear } = useCart();

	if (items.length === 0) {
		return (
			<div className="mx-auto max-w-3xl px-4 py-16">
				<EmptyState icon={ShoppingCart} title="Your cart is empty">
					<Link href="/products">
						<Button>Continue shopping</Button>
					</Link>
				</EmptyState>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-7xl px-4 py-10">
			<div className="mb-8 flex items-center justify-between">
				<h1 className="font-semibold text-3xl tracking-tight">Your cart</h1>
				<Button variant="ghost" onClick={clear}>
					Clear cart
				</Button>
			</div>

			<div className="grid gap-8 lg:grid-cols-[1fr_320px]">
				<div>
					{items.map((item) => (
						<CartItemRow
							key={`${item.productId}:${item.variantId ?? "default"}`}
							item={item}
						/>
					))}
				</div>
				<div className="space-y-4">
					<OrderSummary subtotal={subtotal} />
					<Link href="/checkout" className="block">
						<Button size="lg" className="w-full">
							Proceed to checkout
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
