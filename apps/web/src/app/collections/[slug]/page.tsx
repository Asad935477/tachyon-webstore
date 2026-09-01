"use client";

import { Skeleton } from "@tachyon-webstore/ui/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import { PackageSearch } from "lucide-react";
import { useParams } from "next/navigation";

import { EmptyState } from "@/components/empty-state";
import { ProductGrid } from "@/components/product-grid";
import { Reveal } from "@/components/motion/reveal";
import { trpc } from "@/utils/trpc";

export default function CollectionPage() {
	const params = useParams<{ slug: string }>();
	const collection = useQuery(
		trpc.catalog.getCollection.queryOptions({ slug: params.slug }),
	);
	const products = useQuery(
		trpc.catalog.getProducts.queryOptions({
			sort: "featured",
			page: 1,
			pageSize: 100,
		}),
	);

	if (collection.isLoading) {
		return (
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
				<Skeleton className="mb-8 h-24 max-w-lg" />
				<Skeleton className="aspect-[4/5] max-w-7xl" />
			</div>
		);
	}

	const data = collection.data;

	if (!data) {
		return (
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
				<EmptyState icon={PackageSearch} title="Collection not found" />
			</div>
		);
	}

	const items =
		products.data?.items.filter((p) => data.productIds.includes(p.id)) ?? [];

	return (
		<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
			<Reveal className="mb-10">
				<h1 className="text-4xl font-semibold tracking-tight">{data.title}</h1>
				<p className="mt-2 text-muted-foreground">{data.description}</p>
			</Reveal>

			{items.length ? (
				<ProductGrid products={items} />
			) : (
				<EmptyState icon={PackageSearch} title="No products yet" />
			)}
		</div>
	);
}
