"use client";

import { Skeleton } from "@tachyon-webstore/ui/components/skeleton";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

import { trpc } from "@/utils/trpc";

export function CategoriesView() {
	const categories = useQuery(trpc.catalog.getCategories.queryOptions());

	return (
		<div className="mx-auto max-w-7xl px-4 py-10">
			<h1 className="mb-8 font-semibold text-3xl tracking-tight">Categories</h1>
			{categories.isLoading ? (
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
					{Array.from({ length: 6 }).map((_, i) => (
						<Skeleton key={i} className="aspect-square" />
					))}
				</div>
			) : (
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
					{categories.data?.map((category) => (
						<Link
							key={category.id}
							href={`/categories/${category.slug}`}
							className="group overflow-hidden rounded-lg bg-background ring-1 ring-foreground/10 transition-colors hover:ring-foreground/25"
						>
							<div className="relative aspect-[4/3] overflow-hidden bg-muted">
								{category.image ? (
									<Image
										src={category.image}
										alt={category.name}
										fill
										sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
										className="object-cover transition-transform duration-300 group-hover:scale-105"
									/>
								) : null}
							</div>
							<div className="p-4">
								<div className="font-medium">{category.name}</div>
								{category.description ? (
									<p className="mt-1 line-clamp-2 text-muted-foreground text-xs">
										{category.description}
									</p>
								) : null}
								<div className="mt-2 text-muted-foreground text-xs">
									{category._count.products} products
								</div>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
