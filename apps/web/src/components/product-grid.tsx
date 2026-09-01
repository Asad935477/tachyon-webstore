import type { ProductSummary } from "@/lib/catalog";

import { ProductCard } from "./product-card";

export function ProductGrid({ products }: { products: ProductSummary[] }) {
	return (
		<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
}
