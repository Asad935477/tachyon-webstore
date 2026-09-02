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
import { useCart } from "@/lib/cart-context";
import type { ProductSummary } from "@/lib/catalog";

export function ProductDetail({ product }: { product: ProductSummary }) {
	const router = useRouter();
	const { addItem } = useCart();
	const [quantity, setQuantity] = useState(1);

	const outOfStock = product.stock <= 0;
	const lowStock = !outOfStock && product.stock <= 5;

	function handleAdd() {
		if (outOfStock) {
			toast.error("This product is out of stock.");
			return;
		}
		addItem({
			productId: product.id,
			slug: product.slug,
			name: product.title,
			price: product.price,
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
							{product.title}
						</h1>
						<Price
							cents={product.price}
							compareAtCents={product.compareAtPrice}
							currency={product.currency}
							className="text-xl"
						/>
					</div>

					<p className="text-muted-foreground text-sm leading-relaxed">
						{product.description}
					</p>

					{product.highlights.length > 0 ? (
						<ul className="grid gap-1.5 text-muted-foreground text-sm sm:grid-cols-2">
							{product.highlights.map((highlight) => (
								<li key={highlight} className="flex items-center gap-2">
									<span className="size-1 rounded-full bg-primary" />
									{highlight}
								</li>
							))}
						</ul>
					) : null}

					{lowStock ? (
						<Badge variant="secondary" className="self-center">
							Only {product.stock} left in stock
						</Badge>
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
					</div>
				</div>
			</div>
		</div>
	);
}
