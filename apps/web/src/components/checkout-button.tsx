"use client";

import { Button } from "@tachyon-webstore/ui/components/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { useCart } from "@/lib/cart-context";
import { trpc } from "@/utils/trpc";

export function CheckoutButton() {
	const { items, clear } = useCart();

	const checkout = useMutation({
		...trpc.checkout.createSession.mutationOptions(),
		onSuccess: (data) => {
			clear();
			if (data.url) {
				window.location.assign(data.url);
			}
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return (
		<Button
			size="lg"
			className="w-full"
			disabled={items.length === 0 || checkout.isPending}
			onClick={() =>
				checkout.mutate({
					items: items.map((item) => ({
						productId: item.productId,
						quantity: item.quantity,
					})),
				})
			}
		>
			{checkout.isPending ? "Redirecting..." : "Pay with Stripe"}
		</Button>
	);
}
