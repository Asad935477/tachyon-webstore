import { Badge } from "@tachyon-webstore/ui/components/badge";
import { Card, CardContent } from "@tachyon-webstore/ui/components/card";
import Image from "next/image";
import Link from "next/link";

import type { ProductSummary } from "@/lib/catalog";

import { Price } from "./price";

export function ProductCard({ product }: { product: ProductSummary }) {
	const firstImage = product.images[0]?.url;
	const onSale =
		product.compareAtPrice !== null && product.compareAtPrice > product.price;

	return (
		<Link href={`/products/${product.slug}`} className="group block">
			<Card className="h-full transition-colors hover:ring-foreground/25">
				<div className="relative aspect-square w-full overflow-hidden bg-muted">
					{firstImage ? (
						<Image
							src={firstImage}
							alt={product.images[0]?.alt ?? product.name}
							fill
							sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
							className="object-cover transition-transform duration-300 group-hover:scale-105"
						/>
					) : (
						<div className="flex h-full items-center justify-center text-muted-foreground">
							{product.name}
						</div>
					)}
					{onSale ? (
						<Badge className="absolute top-2 left-2" variant="secondary">
							Sale
						</Badge>
					) : null}
				</div>
				<CardContent className="gap-1 py-3">
					<div className="truncate text-muted-foreground text-xs">
						{product.category.name}
					</div>
					<h3 className="line-clamp-2 font-medium">{product.name}</h3>
					<Price
						cents={product.price}
						compareAtCents={product.compareAtPrice}
						currency={product.currency}
					/>
				</CardContent>
			</Card>
		</Link>
	);
}
