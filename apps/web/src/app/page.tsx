import { Bento } from "@/components/bento";
import { CategoryTiles } from "@/components/category-tiles";
import { FeaturedProducts } from "@/components/featured-products";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/motion/marquee";
import { Newsletter } from "@/components/newsletter";
import { Stats } from "@/components/stats";
import { Testimonials } from "@/components/testimonials";
import { ValueProps } from "@/components/value-props";

const marqueeItems = [
	"Free shipping over $50",
	"2-year warranty",
	"30-day returns",
	"Carbon-neutral delivery",
	"Member pricing",
	"Lifetime support",
];

export default function Home() {
	return (
		<>
			<Hero />
			<Marquee items={marqueeItems} />
			<FeaturedProducts />
			<Bento />
			<Stats />
			<CategoryTiles />
			<ValueProps />
			<Testimonials />
			<Newsletter />
		</>
	);
}
