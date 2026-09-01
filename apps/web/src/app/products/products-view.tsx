"use client";

import { Skeleton } from "@tachyon-webstore/ui/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import { PackageSearch } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { EmptyState } from "@/components/empty-state";
import { Filters } from "@/components/filters";
import { ProductGrid } from "@/components/product-grid";
import { SearchBar } from "@/components/search-bar";
import { SortSelect } from "@/components/sort-select";
import type { ProductSort } from "@/lib/catalog";
import { trpc } from "@/utils/trpc";

export function ProductsView({
	initialCategory,
}: {
	initialCategory?: string;
}) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [q, setQ] = useState(searchParams.get("q") ?? "");
	const [category, setCategory] = useState<string | undefined>(initialCategory);
	const [sort, setSort] = useState<ProductSort>(
		(searchParams.get("sort") as ProductSort) ?? "featured",
	);
	const [minPrice, setMinPrice] = useState<number | undefined>();
	const [maxPrice, setMaxPrice] = useState<number | undefined>();
	const [page, setPage] = useState(1);

	const categories = useQuery(trpc.catalog.getCategories.queryOptions());
	const products = useQuery(
		trpc.catalog.getProducts.queryOptions({
			q: q || undefined,
			category,
			sort,
			minPrice,
			maxPrice,
			page,
			pageSize: 12,
		}),
	);

	function updateParams(next: Record<string, string | undefined>) {
		const params = new URLSearchParams(searchParams.toString());
		for (const [key, value] of Object.entries(next)) {
			if (value) {
				params.set(key, value);
			} else {
				params.delete(key);
			}
		}
		router.replace(`?${params.toString()}`, { scroll: false });
	}

	return (
		<div className="mx-auto max-w-7xl px-4 py-10">
			<div className="mb-8 space-y-4">
				<h1 className="font-semibold text-3xl tracking-tight">Shop all</h1>
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div className="w-full md:max-w-md">
						<SearchBar
							value={q}
							onChange={(value) => {
								setQ(value);
								setPage(1);
								updateParams({ q: value || undefined });
							}}
							onSubmit={() => setPage(1)}
						/>
					</div>
					<SortSelect
						value={sort}
						onChange={(value) => {
							setSort(value);
							setPage(1);
							updateParams({ sort: value });
						}}
					/>
				</div>
			</div>

			<div className="grid gap-8 lg:grid-cols-[240px_1fr]">
				<aside>
					{categories.isLoading ? (
						<Skeleton className="h-48" />
					) : categories.data ? (
						<Filters
							categories={categories.data}
							selectedCategory={category}
							minPrice={minPrice}
							maxPrice={maxPrice}
							onCategoryChange={(value) => {
								setCategory(value);
								setPage(1);
								updateParams({ category: value });
							}}
							onMinPriceChange={setMinPrice}
							onMaxPriceChange={setMaxPrice}
							onClear={() => {
								setCategory(undefined);
								setMinPrice(undefined);
								setMaxPrice(undefined);
								setPage(1);
								updateParams({ category: undefined });
							}}
						/>
					) : null}
				</aside>

				<section>
					{products.isLoading ? (
						<div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
							{Array.from({ length: 6 }).map((_, i) => (
								<Skeleton key={i} className="aspect-[3/4]" />
							))}
						</div>
					) : products.data?.items.length ? (
						<>
							<ProductGrid products={products.data.items} />
							<div className="mt-8 flex items-center justify-center gap-4">
								<button
									type="button"
									disabled={page <= 1}
									onClick={() => setPage((p) => p - 1)}
									className="text-sm disabled:opacity-40"
								>
									Previous
								</button>
								<span className="text-muted-foreground text-sm">
									Page {page} of {products.data.pageCount}
								</span>
								<button
									type="button"
									disabled={page >= products.data.pageCount}
									onClick={() => setPage((p) => p + 1)}
									className="text-sm disabled:opacity-40"
								>
									Next
								</button>
							</div>
						</>
					) : (
						<EmptyState
							icon={PackageSearch}
							title="No products found"
							description="Try adjusting your search or filters."
						/>
					)}
				</section>
			</div>
		</div>
	);
}
