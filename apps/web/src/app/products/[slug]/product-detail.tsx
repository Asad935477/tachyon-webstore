"use client";

import { Badge } from "@tachyon-webstore/ui/components/badge";
import { Button } from "@tachyon-webstore/ui/components/button";
import { Separator } from "@tachyon-webstore/ui/components/separator";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Price } from "@/components/price";
import { ProductGallery } from "@/components/product-gallery";
import { VariantSelector } from "@/components/variant-selector";
import { useCart } from "@/lib/cart-context";
import type { ProductSummary } from "@/lib/catalog";

export function ProductDetail({ product }: { product: ProductSummary }) {
	const router = useRouter();
	const { addItem } = useCart();
	const defaultVariant =
		product.variants.find((v) => v.isDefault) ?? product.variants[0];
	const [variantId, setVariantId] = useState<string | undefined>(
		defaultVariant?.id,
	);
	const [quantity, setQuantity] = useState(1);

	const variant =
		product.variants.find((v) => v.id === variantId) ?? defaultVariant;
	const price = variant?.price ?? product.price;
	const outOfStock = variant ? variant.stock <= 0 : false;

	function handleAdd() {
		if (!variant) {
			toast.error("This product has no available options.");
			return;
		}
		addItem({
			productId: product.id,
			variantId: variant.id,
			slug: product.slug,
			name: product.name,
			variantName: product.variants.length > 1 ? variant.name : undefined,
			price,
			image: product.images[0]?.url,
			quantity,
		});
		toast.success("Added to cart");
	}

	return (
		<div className="mx-auto max-w-7xl px-4 py-10">
			<div className="grid gap-8 lg:grid-cols-2">
				<ProductGallery images={product.images} />
				<div className="space-y-5">
					<div className="space-y-2">
						<div className="font-medium text-muted-foreground text-xs uppercase tracking-widest">
							{product.category.name}
						</div>
						<h1 className="font-semibold text-3xl tracking-tight">
							{product.name}
						</h1>
						<Price
							cents={price}
							compareAtCents={product.compareAtPrice}
							currency={product.currency}
							className="text-xl"
						/>
					</div>

					<p className="text-muted-foreground text-sm leading-relaxed">
						{product.description}
					</p>

					{product.variants.length > 0 ? (
						<div className="space-y-2">
							<div className="font-medium text-muted-foreground text-xs">
								{product.variants.length > 1
									? "Choose an option"
									: "Configuration"}
							</div>
							<VariantSelector
								variants={product.variants}
								selected={variantId}
								onSelect={setVariantId}
							/>
						</div>
					) : null}

					<Separator />

					<div className="flex items-center gap-4">
						<div className="flex items-center rounded-lg border border-input">
							<button
								type="button"
								className="flex h-10 w-10 items-center justify-center rounded-l-lg hover:bg-muted"
								onClick={() => setQuantity((q) => Math.max(1, q - 1))}
							>
								<Minus className="size-4" />
							</button>
							<span className="w-10 text-center text-sm">{quantity}</span>
							<button
								type="button"
								className="flex h-10 w-10 items-center justify-center rounded-r-lg hover:bg-muted"
								onClick={() => setQuantity((q) => q + 1)}
							>
								<Plus className="size-4" />
							</button>
						</div>
						<Button
							size="lg"
							className="h-10 flex-1"
							disabled={outOfStock}
							onClick={handleAdd}
						>
							<ShoppingBag />
							{outOfStock ? "Out of stock" : "Add to cart"}
						</Button>
					</div>

					<div className="flex gap-3 pt-2">
						<Button variant="outline" onClick={() => router.back()}>
							Back
						</Button>
						{product.variants.length > 1 && variant ? (
							<Badge variant="secondary" className="self-center">
								SKU {variant.sku}
							</Badge>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}
