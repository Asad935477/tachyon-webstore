"use client";
import { buttonVariants } from "@tachyon-webstore/ui/components/button";
import { Skeleton } from "@tachyon-webstore/ui/components/skeleton";
import { cn } from "@tachyon-webstore/ui/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { trpc } from "@/utils/trpc";

import { Reveal } from "./motion/reveal";
import { ProductGrid } from "./product-grid";

export function FeaturedProducts() {
	const featured = useQuery(
		trpc.catalog.getFeaturedProducts.queryOptions({ limit: 8 }),
	);

	return (
		<section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
			<Reveal className="mb-10 flex items-end justify-between">
				<div>
					<h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
						Featured this season
					</h2>
					<p className="mt-2 text-muted-foreground">
						Handpicked pieces worth your attention.
					</p>
				</div>
				<Link
					href="/products"
					className={cn(buttonVariants({ variant: "outline" }), "group hidden sm:inline-flex")}
				>
					View all
					<ArrowRight className="transition-transform group-hover:translate-x-0.5" />
				</Link>
			</Reveal>

			{featured.isLoading ? (
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
					{Array.from({ length: 4 }).map((_, i) => (
						<Skeleton key={i} className="aspect-[4/5]" />
					))}
				</div>
			) : featured.data?.length ? (
				<ProductGrid products={featured.data} />
			) : null}
		</section>
	);
}
