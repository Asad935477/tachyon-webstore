import { Suspense } from "react";

import { ProductsView } from "@/app/products/products-view";

export default async function CategoryPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	return (
		<Suspense>
			<ProductsView initialCategory={slug} />
		</Suspense>
	);
}
