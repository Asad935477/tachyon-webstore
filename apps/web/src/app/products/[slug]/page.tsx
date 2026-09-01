"use client";

import { Skeleton } from "@tachyon-webstore/ui/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import { PackageSearch } from "lucide-react";
import { useParams } from "next/navigation";

import { EmptyState } from "@/components/empty-state";
import { trpc } from "@/utils/trpc";

import { ProductDetail } from "./product-detail";

export default function ProductDetailPage() {
	const params = useParams<{ slug: string }>();
	const product = useQuery(
		trpc.catalog.getProductBySlug.queryOptions({ slug: params.slug }),
	);

	if (product.isLoading) {
		return (
			<div className="mx-auto max-w-7xl px-4 py-10">
				<div className="grid gap-8 lg:grid-cols-2">
					<Skeleton className="aspect-square" />
					<div className="space-y-4">
						<Skeleton className="h-8 w-2/3" />
						<Skeleton className="h-6 w-1/3" />
						<Skeleton className="h-24 w-full" />
					</div>
				</div>
			</div>
		);
	}

	if (!product.data) {
		return (
			<div className="mx-auto max-w-7xl px-4 py-10">
				<EmptyState icon={PackageSearch} title="Product not found" />
			</div>
		);
	}

	return <ProductDetail product={product.data} />;
}
