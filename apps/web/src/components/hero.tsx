"use client";

import { buttonVariants } from "@tachyon-webstore/ui/components/button";
import { cn } from "@tachyon-webstore/ui/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { formatPrice } from "@/lib/format";
import { trpc } from "@/utils/trpc";

export function Hero() {
	const reduce = useReducedMotion();
	const featured = useQuery(
		trpc.catalog.getFeaturedProducts.queryOptions({ limit: 5 }),
	);
	const products = featured.data ?? [];
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (products.length <= 1) {
			return;
		}
		const timer = setInterval(() => {
			setIndex((i) => (i + 1) % products.length);
		}, 4500);
		return () => clearInterval(timer);
	}, [products.length]);

	const product = products[index];

	return (
		<section className="relative overflow-hidden border-b">
			<div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
				<div className="space-y-7">
					<motion.div
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
						className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-muted-foreground text-xs"
					>
						<span className="size-1.5 rounded-full bg-primary" />
						New season · Premium tech
					</motion.div>

					<h1 className="font-semibold text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
						<motion.span
							className="block"
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.7,
								delay: 0.1,
								ease: [0.22, 1, 0.36, 1],
							}}
						>
							Objects for a
						</motion.span>
						<motion.span
							className="block text-muted-foreground"
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.7,
								delay: 0.2,
								ease: [0.22, 1, 0.36, 1],
							}}
						>
							faster life.
						</motion.span>
					</h1>

					<motion.p
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
						className="max-w-md text-base text-muted-foreground"
					>
						Headphones, wearables, and computing tools chosen for how they feel
						in your hands — and how long they last.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
						className="flex flex-wrap gap-3"
					>
						<Link
							href={product ? `/products/${product.slug}` : "/products"}
							className={cn(buttonVariants({ size: "lg" }), "group")}
						>
							Shop now
							<ArrowRight className="transition-transform group-hover:translate-x-0.5" />
						</Link>
						<Link
							href="/collections"
							className={buttonVariants({ variant: "outline", size: "lg" })}
						>
							Browse collections
						</Link>
					</motion.div>
				</div>

				<motion.div
					initial={{ opacity: 0, scale: 0.96 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
					className="relative"
				>
					<div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-foreground/10">
						<AnimatePresence mode="popLayout">
							{product ? (
								<motion.div
									key={product.id}
									className="absolute inset-0"
									initial={{ opacity: 0, scale: reduce ? 1 : 1.05 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
									transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
								>
									<Image
										src={product.images[0]?.url ?? ""}
										alt={product.images[0]?.alt ?? product.title}
										fill
										sizes="(max-width: 1024px) 100vw, 50vw"
										className="object-cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
								</motion.div>
							) : null}
						</AnimatePresence>
					</div>

					{product ? (
						<motion.div
							key={`card-${product.id}`}
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
							className="absolute -bottom-6 -left-6 max-w-[240px] rounded-2xl border bg-background/90 p-4 shadow-lg backdrop-blur"
						>
							<div className="text-muted-foreground text-xs">
								{product.category.name}
							</div>
							<div className="truncate font-medium">{product.title}</div>
							<div className="text-sm">{formatPrice(product.price)}</div>
						</motion.div>
					) : null}

					{products.length > 1 ? (
						<div className="absolute top-1/2 -right-4 flex -translate-y-1/2 flex-col gap-2">
							{products.map((p, i) => (
								<button
									key={p.id}
									type="button"
									onClick={() => setIndex(i)}
									className={cn(
										"h-1.5 rounded-full transition-all",
										i === index
											? "w-6 bg-primary"
											: "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50",
									)}
									aria-label={`Show ${p.title}`}
								/>
							))}
						</div>
					) : null}
				</motion.div>
			</div>
		</section>
	);
}
