"use client";

import { Badge } from "@tachyon-webstore/ui/components/badge";
import { motion, useReducedMotion } from "motion/react";
import { Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { useCart } from "@/lib/cart-context";
import type { ProductSummary } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product }: { product: ProductSummary }) {
	const reduce = useReducedMotion();
	const { addItem } = useCart();
	const firstImage = product.images[0]?.url;
	const onSale =
		product.compareAtPrice !== null && product.compareAtPrice > product.price;
	const defaultVariant =
		product.variants.find((v) => v.isDefault) ?? product.variants[0];

	function quickAdd(e: React.MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		if (!defaultVariant) {
			return;
		}
		addItem({
			productId: product.id,
			variantId: defaultVariant.id,
			slug: product.slug,
			name: product.name,
			variantName: product.variants.length > 1 ? defaultVariant.name : undefined,
			price: defaultVariant.price ?? product.price,
			image: product.images[0]?.url,
			quantity: 1,
		});
		toast.success("Added to cart");
	}

	return (
		<Link href={`/products/${product.slug}`} className="group block">
			<motion.div
				whileHover={reduce ? undefined : { y: -4 }}
				transition={{ type: "spring", stiffness: 300, damping: 22 }}
				className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border bg-muted"
			>
				{firstImage ? (
					<Image
						src={firstImage}
						alt={product.images[0]?.alt ?? product.name}
						fill
						sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
						className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
					/>
				) : (
					<div className="flex h-full items-center justify-center text-muted-foreground">
						{product.name}
					</div>
				)}

				{/* Bottom-to-top fade so the text is always legible */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

				{/* Badges */}
				<div className="absolute left-3 top-3 flex flex-col gap-1.5">
					{onSale ? <Badge variant="secondary">Sale</Badge> : null}
					{product.isNew ? <Badge variant="outline">New</Badge> : null}
					{product.bestseller ? (
						<Badge variant="default">Bestseller</Badge>
					) : null}
				</div>

				{/* Quick add */}
				<button
					type="button"
					onClick={quickAdd}
					className="absolute right-3 top-3 flex size-9 translate-y-2 items-center justify-center rounded-full bg-white/90 text-foreground opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white"
					aria-label={`Add ${product.name} to cart`}
				>
					<Plus className="size-4" />
				</button>

				{/* Text overlay */}
				<div className="absolute inset-x-0 bottom-0 p-4">
					<div className="mb-1 flex items-center gap-1 text-xs text-white/70">
						{product.category.name}
					</div>
					<h3 className="truncate font-medium text-white">{product.name}</h3>

					<div className="mt-1 flex items-center gap-1.5">
						<div className="flex items-center gap-0.5">
							{Array.from({ length: 5 }).map((_, i) => (
								<Star
									key={i}
									className={`size-3.5 ${
										i < Math.round(product.rating)
											? "fill-amber-300 text-amber-300"
											: "text-white/40"
									}`}
								/>
							))}
						</div>
						<span className="text-xs text-white/80">
							{product.rating.toFixed(1)}
						</span>
						<span className="text-xs text-white/50">
							({product.reviewCount})
						</span>
					</div>

					<div className="mt-1.5 flex items-baseline gap-2">
						<span className="font-medium text-white">
							{formatPrice(product.price, product.currency)}
						</span>
						{onSale ? (
							<span className="text-xs text-white/60 line-through">
								{formatPrice(product.compareAtPrice ?? 0, product.currency)}
							</span>
						) : null}
					</div>
				</div>
			</motion.div>
		</Link>
	);
}
