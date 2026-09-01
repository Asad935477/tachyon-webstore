import { Button } from "@tachyon-webstore/ui/components/button";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CancelPage() {
	return (
		<div className="mx-auto max-w-xl px-4 py-16 text-center">
			<XCircle className="mx-auto mb-4 size-12 text-destructive" />
			<h1 className="font-semibold text-3xl tracking-tight">
				Payment cancelled
			</h1>
			<p className="mt-2 text-muted-foreground text-sm">
				No charge was made. Your cart is still waiting for you.
			</p>
			<div className="mt-8 flex justify-center gap-3">
				<Link href="/cart">
					<Button variant="outline">Return to cart</Button>
				</Link>
				<Link href="/products">
					<Button>Continue shopping</Button>
				</Link>
			</div>
		</div>
	);
}
