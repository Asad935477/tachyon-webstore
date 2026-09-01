import { Button } from "@tachyon-webstore/ui/components/button";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
	return (
		<section className="relative overflow-hidden border-b bg-muted/40">
			<div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
				<div className="space-y-5">
					<div className="font-medium text-muted-foreground text-xs uppercase tracking-widest">
						New season · Premium tech
					</div>
					<h1 className="font-semibold text-4xl tracking-tight md:text-5xl">
						Gear that keeps up with you.
					</h1>
					<p className="max-w-md text-muted-foreground text-sm">
						Headphones, wearables, and computing essentials chosen for how they
						feel in your hands — and how long they last.
					</p>
					<div className="flex gap-3">
						<Link href="/products">
							<Button size="lg">Shop now</Button>
						</Link>
						<Link href="/categories">
							<Button size="lg" variant="outline">
								Browse categories
							</Button>
						</Link>
					</div>
				</div>
				<div className="relative aspect-square w-full overflow-hidden rounded-lg bg-background ring-1 ring-foreground/10">
					<Image
						src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&h=900&q=80"
						alt="Premium wireless headphones"
						fill
						sizes="(max-width: 768px) 100vw, 50vw"
						className="object-cover"
					/>
				</div>
			</div>
		</section>
	);
}
