import Link from "next/link";

export function Footer() {
	return (
		<footer className="border-t bg-muted/30">
			<div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
				<div className="space-y-2">
					<div className="font-semibold">Tachyon</div>
					<p className="text-muted-foreground text-xs">
						Premium tech and gadgets, curated for people who care about the
						details.
					</p>
				</div>
				<div className="space-y-2 text-sm">
					<div className="font-medium">Shop</div>
					<Link
						href="/products"
						className="block text-muted-foreground hover:text-foreground"
					>
						All products
					</Link>
					<Link
						href="/categories"
						className="block text-muted-foreground hover:text-foreground"
					>
						Categories
					</Link>
				</div>
				<div className="space-y-2 text-sm">
					<div className="font-medium">Support</div>
					<span className="block text-muted-foreground">
						Shipping &amp; returns
					</span>
					<span className="block text-muted-foreground">Warranty</span>
				</div>
				<div className="space-y-2 text-sm">
					<div className="font-medium">Company</div>
					<span className="block text-muted-foreground">About</span>
					<span className="block text-muted-foreground">Contact</span>
				</div>
			</div>
			<div className="border-t px-4 py-4 text-center text-muted-foreground text-xs">
				© {new Date().getFullYear()} Tachyon. All rights reserved.
			</div>
		</footer>
	);
}
