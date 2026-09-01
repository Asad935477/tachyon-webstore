"use client";

import { Badge } from "@tachyon-webstore/ui/components/badge";
import { motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { useCart } from "@/lib/cart-context";
import type { ProductSummary } from "@/lib/catalog";

import { Price } from "./price";
import { Rating } from "./rating";

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
				className="relative h-full overflow-hidden rounded-2xl border bg-card transition-colors duration-300 group-hover:border-primary/30"
			>
				<div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
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

					<div className="absolute left-3 top-3 flex flex-col gap-1.5">
						{onSale ? <Badge variant="secondary">Sale</Badge> : null}
						{product.isNew ? <Badge variant="outline">New</Badge> : null}
						{product.bestseller ? (
							<Badge variant="default">Bestseller</Badge>
						) : null}
					</div>

					<button
						type="button"
						onClick={quickAdd}
						className="absolute right-3 bottom-3 flex size-9 translate-y-2 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground"
						aria-label={`Add ${product.name} to cart`}
					>
						<Plus className="size-4" />
					</button>
				</div>

				<div className="p-4">
					<div className="mb-1 text-xs text-muted-foreground">
						{product.category.name}
					</div>
					<h3 className="truncate font-medium">{product.name}</h3>
					<div className="mt-1">
						<Rating value={product.rating} count={product.reviewCount} />
					</div>
					<div className="mt-2">
						<Price
							cents={product.price}
							compareAtCents={product.compareAtPrice}
							currency={product.currency}
						/>
					</div>
				</div>
			</motion.div>
		</Link>
	);
}
