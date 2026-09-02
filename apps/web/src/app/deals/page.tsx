"use client";

import { Skeleton } from "@tachyon-webstore/ui/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Tag } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ProductGrid } from "@/components/product-grid";
import { trpc } from "@/utils/trpc";

export default function DealsPage() {
	const products = useQuery(
		trpc.catalog.getProducts.queryOptions({
			sort: "price-asc",
			page: 1,
			pageSize: 100,
		}),
	);

	const deals =
		products.data?.items.filter(
			(p) => p.compareAtPrice !== null && p.compareAtPrice > p.price,
		) ?? [];

	return (
		<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
			<Reveal className="mb-10">
				<div className="flex items-center gap-2 text-primary">
					<Tag className="size-5" />
					<span className="font-medium text-sm uppercase tracking-widest">
						Limited time
					</span>
				</div>
				<h1 className="mt-3 font-semibold text-4xl tracking-tight">Deals</h1>
				<p className="mt-2 text-muted-foreground">
					Well-made things, briefly less expensive.
				</p>
			</Reveal>

			{products.isLoading ? (
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
					{Array.from({ length: 4 }).map((_, i) => (
						<Skeleton key={i} className="aspect-[4/5]" />
					))}
				</div>
			) : deals.length ? (
				<ProductGrid products={deals} />
			) : (
				<p className="text-muted-foreground">
					No deals right now — check back soon.
				</p>
			)}
		</div>
	);
}
