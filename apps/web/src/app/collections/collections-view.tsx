"use client";

import { Skeleton } from "@tachyon-webstore/ui/components/skeleton";
import { motion, useReducedMotion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { trpc } from "@/utils/trpc";

export function CollectionsView() {
	const reduce = useReducedMotion();
	const collections = useQuery(trpc.catalog.getCollections.queryOptions());

	return (
		<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
			<Reveal className="mb-10">
				<h1 className="text-4xl font-semibold tracking-tight">Collections</h1>
				<p className="mt-2 text-muted-foreground">
					Curated sets for how you actually work and live.
				</p>
			</Reveal>

			{collections.isLoading ? (
				<div className="grid gap-4 md:grid-cols-3">
					{Array.from({ length: 3 }).map((_, i) => (
						<Skeleton key={i} className="aspect-[4/5]" />
					))}
				</div>
			) : (
				<div className="grid gap-4 md:grid-cols-3">
					{collections.data?.map((collection, index) => (
						<Reveal key={collection.id} delay={index * 0.07}>
							<motion.div
								whileHover={reduce ? undefined : { y: -4 }}
								className="group h-full"
							>
								<Link
									href={`/collections/${collection.slug}`}
									className="block h-full overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary/30"
								>
									<div className="relative aspect-[4/5] overflow-hidden bg-muted">
										<Image
											src={collection.image}
											alt={collection.title}
											fill
											sizes="(max-width: 768px) 100vw, 33vw"
											className="object-cover transition-transform duration-700 group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
										<div className="absolute right-4 bottom-4 flex size-9 items-center justify-center rounded-full bg-background/85 text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
											<ArrowUpRight className="size-4" />
										</div>
									</div>
									<div className="p-5">
										<h2 className="text-lg font-medium">{collection.title}</h2>
										<p className="mt-1 text-sm text-muted-foreground">
											{collection.description}
										</p>
										<div className="mt-2 text-xs text-muted-foreground">
											{collection.productIds.length} products
										</div>
									</div>
								</Link>
							</motion.div>
						</Reveal>
					))}
				</div>
			)}
		</div>
	);
}
