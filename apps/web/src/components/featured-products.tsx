"use client";
import { Skeleton } from "@tachyon-webstore/ui/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { trpc } from "@/utils/trpc";
import { ProductGrid } from "./product-grid";

export function FeaturedProducts() {
	const featured = useQuery(
		trpc.catalog.getFeaturedProducts.queryOptions({ limit: 8 }),
	);

	return (
		<section className="mx-auto max-w-7xl px-4 py-12">
			<div className="mb-6 flex items-end justify-between">
				<div>
					<h2 className="font-semibold text-2xl tracking-tight">Featured</h2>
					<p className="text-muted-foreground text-sm">
						Handpicked for the season.
					</p>
				</div>
				<Link href="/products" className="text-sm hover:underline">
					View all
				</Link>
			</div>

			{featured.isLoading ? (
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
					{Array.from({ length: 4 }).map((_, i) => (
						<Skeleton key={i} className="aspect-[3/4]" />
					))}
				</div>
			) : featured.data?.length ? (
				<ProductGrid products={featured.data} />
			) : null}
		</section>
	);
}
