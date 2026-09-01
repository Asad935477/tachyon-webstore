import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Footer() {
	return (
		<footer className="border-t border-border/60 bg-muted/30">
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
				<div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
					<div className="space-y-3">
						<Link href="/" className="flex items-center gap-2">
							<Sparkles className="size-4 text-primary" />
							<span className="font-semibold">Tachyon</span>
						</Link>
						<p className="max-w-xs text-sm text-muted-foreground">
							Premium technology and considered design, curated for people who
							care about the details.
						</p>
					</div>

					<div className="space-y-3 text-sm">
						<div className="font-medium">Shop</div>
						<Link
							href="/products"
							className="block text-muted-foreground transition-colors hover:text-foreground"
						>
							All products
						</Link>
						<Link
							href="/collections"
							className="block text-muted-foreground transition-colors hover:text-foreground"
						>
							Collections
						</Link>
						<Link
							href="/deals"
							className="block text-muted-foreground transition-colors hover:text-foreground"
						>
							Deals
						</Link>
					</div>

					<div className="space-y-3 text-sm">
						<div className="font-medium">Explore</div>
						<Link
							href="/categories"
							className="block text-muted-foreground transition-colors hover:text-foreground"
						>
							Categories
						</Link>
						<Link
							href="/about"
							className="block text-muted-foreground transition-colors hover:text-foreground"
						>
							About
						</Link>
						<span className="block text-muted-foreground">Journal</span>
					</div>

					<div className="space-y-3 text-sm">
						<div className="font-medium">Support</div>
						<span className="block text-muted-foreground">Shipping &amp; returns</span>
						<span className="block text-muted-foreground">Warranty</span>
						<span className="block text-muted-foreground">Contact</span>
					</div>
				</div>

				<div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
					<span>© {new Date().getFullYear()} Tachyon. All rights reserved.</span>
					<span className="tracking-widest uppercase">Crafted for the curious</span>
				</div>
			</div>
		</footer>
	);
}
