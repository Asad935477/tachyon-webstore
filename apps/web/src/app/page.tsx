import { CategoryTiles } from "@/components/category-tiles";
import { FeaturedProducts } from "@/components/featured-products";
import { Hero } from "@/components/hero";
import { Newsletter } from "@/components/newsletter";
import { ValueProps } from "@/components/value-props";

export default function Home() {
	return (
		<>
			<Hero />
			<FeaturedProducts />
			<ValueProps />
			<CategoryTiles />
			<Newsletter />
		</>
	);
}
