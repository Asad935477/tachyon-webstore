import { buttonVariants } from "@tachyon-webstore/ui/components/button";
import { cn } from "@tachyon-webstore/ui/lib/utils";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CancelPage() {
	return (
		<div className="mx-auto max-w-xl px-4 py-16 text-center">
			<XCircle className="mx-auto mb-4 size-12 text-destructive" />
			<h1 className="text-3xl font-semibold tracking-tight">
				Payment cancelled
			</h1>
			<p className="mt-2 text-sm text-muted-foreground">
				No charge was made. Your cart is still waiting for you.
			</p>
			<div className="mt-8 flex justify-center gap-3">
				<Link
					href="/cart"
					className={buttonVariants({ variant: "outline" })}
				>
					Return to cart
				</Link>
				<Link href="/products" className={buttonVariants()}>
					Continue shopping
				</Link>
			</div>
		</div>
	);
}
