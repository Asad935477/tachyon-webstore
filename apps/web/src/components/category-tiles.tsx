"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

import { trpc } from "@/utils/trpc";

export function CategoryTiles() {
	const categories = useQuery(trpc.catalog.getCategories.queryOptions());

	if (!categories.data?.length) {
		return null;
	}

	return (
		<section className="border-t bg-muted/30">
			<div className="mx-auto max-w-7xl px-4 py-12">
				<h2 className="mb-6 font-semibold text-2xl tracking-tight">
					Shop by category
				</h2>
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
					{categories.data.map((category) => (
						<Link
							key={category.id}
							href={`/categories/${category.slug}`}
							className="group overflow-hidden rounded-lg bg-background ring-1 ring-foreground/10 transition-colors hover:ring-foreground/25"
						>
							<div className="relative aspect-square overflow-hidden bg-muted">
								{category.image ? (
									<Image
										src={category.image}
										alt={category.name}
										fill
										sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
										className="object-cover transition-transform duration-300 group-hover:scale-105"
									/>
								) : null}
							</div>
							<div className="p-3">
								<div className="font-medium">{category.name}</div>
								<div className="text-muted-foreground text-xs">
									{category._count.products} products
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
