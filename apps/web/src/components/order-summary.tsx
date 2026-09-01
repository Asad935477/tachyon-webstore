import { Separator } from "@tachyon-webstore/ui/components/separator";

import { formatPrice } from "@/lib/format";

export function OrderSummary({
	subtotal,
	shipping = 0,
	tax = 0,
}: {
	subtotal: number;
	shipping?: number;
	tax?: number;
}) {
	const total = subtotal + shipping + tax;

	return (
		<div className="space-y-3 rounded-lg border bg-muted/20 p-4 text-sm">
			<h2 className="font-medium">Order summary</h2>
			<div className="flex justify-between">
				<span className="text-muted-foreground">Subtotal</span>
				<span>{formatPrice(subtotal)}</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">Shipping</span>
				<span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">Tax</span>
				<span>{formatPrice(tax)}</span>
			</div>
			<Separator />
			<div className="flex justify-between font-medium">
				<span>Total</span>
				<span>{formatPrice(total)}</span>
			</div>
		</div>
	);
}
