import { Suspense } from "react";

import { ProductsView } from "./products-view";

export default function ProductsPage() {
	return (
		<Suspense>
			<ProductsView />
		</Suspense>
	);
}
