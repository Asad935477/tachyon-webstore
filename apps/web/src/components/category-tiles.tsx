"use client";
import { motion, useReducedMotion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { trpc } from "@/utils/trpc";

import { Reveal } from "./motion/reveal";

export function CategoryTiles() {
	const reduce = useReducedMotion();
	const categories = useQuery(trpc.catalog.getCategories.queryOptions());

	if (!categories.data?.length) {
		return null;
	}

	return (
		<section className="border-y bg-muted/30">
			<div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
				<Reveal className="mb-10 flex items-end justify-between">
					<div>
						<h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
							Shop by category
						</h2>
						<p className="mt-2 text-muted-foreground">
							Six ways to find your next favorite thing.
						</p>
					</div>
				</Reveal>

				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
					{categories.data.map((category, index) => (
						<Reveal key={category.id} delay={index * 0.05}>
							<motion.div
								whileHover={reduce ? undefined : { y: -4 }}
								className="group"
							>
								<Link
									href={`/categories/${category.slug}`}
									className="block overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary/30"
								>
									<div className="relative aspect-square overflow-hidden bg-muted">
										{category.image ? (
											<Image
												src={category.image}
												alt={category.name}
												fill
												sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
												className="object-cover transition-transform duration-700 group-hover:scale-105"
											/>
										) : null}
										<div className="absolute right-2 bottom-2 flex size-7 items-center justify-center rounded-full bg-background/80 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
											<ArrowUpRight className="size-4" />
										</div>
									</div>
									<div className="p-3">
										<div className="font-medium">{category.name}</div>
										<div className="text-xs text-muted-foreground">
											{category._count.products} products
										</div>
									</div>
								</Link>
							</motion.div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
