import type { ProductSummary } from "@/lib/catalog";

import { Reveal } from "./motion/reveal";
import { ProductCard } from "./product-card";

export function ProductGrid({ products }: { products: ProductSummary[] }) {
	return (
		<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
			{products.map((product, index) => (
				<Reveal key={product.id} delay={Math.min(index * 0.05, 0.3)}>
					<ProductCard product={product} />
				</Reveal>
			))}
		</div>
	);
}
