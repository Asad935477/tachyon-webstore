import { z } from "zod";

const imageSchema = z.object({
	id: z.string(),
	url: z.string().url(),
	alt: z.string().nullable(),
	position: z.number(),
});

const variantSchema = z.object({
	id: z.string(),
	name: z.string(),
	sku: z.string(),
	price: z.number().nullable(),
	stock: z.number(),
	isDefault: z.boolean(),
	position: z.number(),
});

const categoryRefSchema = z.object({
	id: z.string(),
	slug: z.string(),
	name: z.string(),
});

const productSchema = z.object({
	id: z.string(),
	slug: z.string(),
	name: z.string(),
	description: z.string(),
	price: z.number(),
	compareAtPrice: z.number().nullable(),
	currency: z.string(),
	featured: z.boolean(),
	category: categoryRefSchema,
	images: z.array(imageSchema),
	variants: z.array(variantSchema),
});

const categorySchema = z.object({
	id: z.string(),
	slug: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	image: z.string().url().nullable(),
	position: z.number(),
	_count: z.object({ products: z.number() }),
});

const img = (id: string, w = 1200, h = 900) =>
	`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const categoryData = [
	{
		id: "cat-audio",
		slug: "audio",
		name: "Audio",
		description: "Headphones, earbuds, and speakers tuned for the long haul.",
		image: img("photo-1505740420928-5e560c06d30e"),
		position: 1,
	},
	{
		id: "cat-wearables",
		slug: "wearables",
		name: "Wearables",
		description: "Smartwatches and bands that keep pace with you.",
		image: img("photo-1579586337278-3befd40fd17a"),
		position: 2,
	},
	{
		id: "cat-computing",
		slug: "computing",
		name: "Computing",
		description: "Laptops, tablets, and tools for focused work.",
		image: img("photo-1496181133206-80ce9b88a853"),
		position: 3,
	},
	{
		id: "cat-accessories",
		slug: "accessories",
		name: "Accessories",
		description: "Cables, chargers, and the essentials that tie it together.",
		image: img("photo-1601524909162-ae8725290836"),
		position: 4,
	},
	{
		id: "cat-displays",
		slug: "displays",
		name: "Displays",
		description: "Monitors and screens built for clarity and color.",
		image: img("photo-1547119957-637f8679db1e"),
		position: 5,
	},
	{
		id: "cat-smart-home",
		slug: "smart-home",
		name: "Smart Home",
		description: "Connected devices that make home feel effortless.",
		image: img("photo-1558002038-1055907df827"),
		position: 6,
	},
];

const productData = [
	{
		id: "p-sonic-drift",
		slug: "sonic-drift-wireless-headphones",
		name: "Sonic Drift Wireless Headphones",
		description:
			"Over-ear headphones with adaptive noise cancellation, 40-hour battery life, and spatial audio that follows your head.",
		price: 34900,
		compareAtPrice: 39900,
		currency: "usd",
		featured: true,
		category: { id: "cat-audio", slug: "audio", name: "Audio" },
		images: [
			img("photo-1505740420928-5e560c06d30e"),
			img("photo-1583394838336-acd977736f90"),
			img("photo-1484704849700-f032a568e944"),
		],
		variants: [
			{ name: "Matte Black", sku: "SDH-BLK", price: null, stock: 42, isDefault: true },
			{ name: "Arctic White", sku: "SDH-WHT", price: null, stock: 28, isDefault: false },
			{ name: "Sandstone", sku: "SDH-SND", price: 35900, stock: 15, isDefault: false },
		],
	},
	{
		id: "p-pulse-buds",
		slug: "pulse-buds-pro",
		name: "Pulse Buds Pro",
		description:
			"True wireless earbuds with hybrid drivers, six-microphone call clarity, and a pocketable wireless-charging case.",
		price: 19900,
		compareAtPrice: null,
		currency: "usd",
		featured: true,
		category: { id: "cat-audio", slug: "audio", name: "Audio" },
		images: [
			img("photo-1590658268037-6bf12165a8df"),
			img("photo-1606220945770-b5b6c2c55bf1"),
			img("photo-1590658153324-0b0e1e2e2d6a"),
		],
		variants: [
			{ name: "Graphite", sku: "PBP-GPH", price: null, stock: 60, isDefault: true },
			{ name: "Ivory", sku: "PBP-IVY", price: null, stock: 35, isDefault: false },
			{ name: "Mint", sku: "PBP-MNT", price: 21900, stock: 12, isDefault: false },
		],
	},
	{
		id: "p-echo-pillar",
		slug: "echo-pillar-smart-speaker",
		name: "Echo Pillar Smart Speaker",
		description:
			"Room-filling 360-degree sound with a fabric finish, multi-room pairing, and a built-in voice assistant.",
		price: 14900,
		compareAtPrice: null,
		currency: "usd",
		featured: false,
		category: { id: "cat-audio", slug: "audio", name: "Audio" },
		images: [
			img("photo-1608043152269-423dbba4e7e1"),
			img("photo-1545454675-3531b543be5d"),
		],
		variants: [
			{ name: "Charcoal", sku: "EPS-CHR", price: null, stock: 50, isDefault: true },
			{ name: "Cloud", sku: "EPS-CLD", price: null, stock: 22, isDefault: false },
		],
	},
	{
		id: "p-meridian",
		slug: "meridian-smartwatch",
		name: "Meridian Smartwatch",
		description:
			"A titanium smartwatch with always-on AMOLED display, dual-band GPS, and up to 10 days of battery.",
		price: 42900,
		compareAtPrice: 49900,
		currency: "usd",
		featured: true,
		category: { id: "cat-wearables", slug: "wearables", name: "Wearables" },
		images: [
			img("photo-1579586337278-3befd40fd17a"),
			img("photo-1508685096489-7aacd43bd3b1"),
			img("photo-1523275335684-37898b6baf30"),
		],
		variants: [
			{ name: "Titanium / 42mm", sku: "MSW-T42", price: null, stock: 20, isDefault: true },
			{ name: "Titanium / 46mm", sku: "MSW-T46", price: 44900, stock: 18, isDefault: false },
			{ name: "Midnight / 42mm", sku: "MSW-M42", price: null, stock: 14, isDefault: false },
		],
	},
	{
		id: "p-cadence",
		slug: "cadence-fitness-band",
		name: "Cadence Fitness Band",
		description:
			"A featherweight tracker with heart-rate, sleep, and SpO2 monitoring plus a week of battery in one charge.",
		price: 9900,
		compareAtPrice: null,
		currency: "usd",
		featured: false,
		category: { id: "cat-wearables", slug: "wearables", name: "Wearables" },
		images: [
			img("photo-1557935728-e6d1eaabe558"),
			img("photo-1579586337278-3befd40fd17a"),
		],
		variants: [
			{ name: "Black / S", sku: "CFB-BKS", price: null, stock: 80, isDefault: true },
			{ name: "Black / M", sku: "CFB-BKM", price: null, stock: 75, isDefault: false },
			{ name: "Lilac / S", sku: "CFB-LIS", price: null, stock: 40, isDefault: false },
		],
	},
	{
		id: "p-aeron-14",
		slug: "aeron-14-ultrabook",
		name: "Aeron 14 Ultrabook",
		description:
			"A 14-inch magnesium-alloy ultrabook with a 2.8K OLED panel, all-day battery, and a whisper-quiet keyboard.",
		price: 149900,
		compareAtPrice: 169900,
		currency: "usd",
		featured: true,
		category: { id: "cat-computing", slug: "computing", name: "Computing" },
		images: [
			img("photo-1496181133206-80ce9b88a853"),
			img("photo-1517336714731-489689fd1ca8"),
			img("photo-1541807084-5c52b6b3adef"),
		],
		variants: [
			{ name: "16GB / 512GB", sku: "A14-16512", price: null, stock: 12, isDefault: true },
			{ name: "32GB / 1TB", sku: "A14-321T", price: 174900, stock: 8, isDefault: false },
		],
	},
	{
		id: "p-aeron-slate",
		slug: "aeron-slate-11",
		name: "Aeron Slate 11",
		description:
			"An 11-inch tablet with a laminated 120Hz display, magnetic keyboard, and a stylus that feels like ink.",
		price: 79900,
		compareAtPrice: null,
		currency: "usd",
		featured: true,
		category: { id: "cat-computing", slug: "computing", name: "Computing" },
		images: [
			img("photo-1544244015-0df4b3ffc6b0"),
			img("photo-1561154464-82e9adf32764"),
			img("photo-1585790050230-5dd28404ccb9"),
		],
		variants: [
			{ name: "Wi-Fi / 256GB", sku: "AS11-256", price: null, stock: 25, isDefault: true },
			{ name: "Wi-Fi / 512GB", sku: "AS11-512", price: 94900, stock: 15, isDefault: false },
		],
	},
	{
		id: "p-volt-charger",
		slug: "volt-gan-charger-100w",
		name: "Volt GaN Charger 100W",
		description:
			"A compact gallium-nitride charger that powers a laptop, phone, and earbuds at once without the bulk.",
		price: 6900,
		compareAtPrice: null,
		currency: "usd",
		featured: false,
		category: { id: "cat-accessories", slug: "accessories", name: "Accessories" },
		images: [
			img("photo-1583863788434-e58a36330cf0"),
			img("photo-1609091839311-d5365f9ff1c5"),
		],
		variants: [{ name: "Single Port", sku: "VGC-100", price: null, stock: 120, isDefault: true }],
	},
	{
		id: "p-flow-power",
		slug: "flow-magnetic-power-bank",
		name: "Flow Magnetic Power Bank",
		description:
			"A 10,000mAh magnetic power bank that snaps to your phone and tops it up wirelessly while you go.",
		price: 5900,
		compareAtPrice: null,
		currency: "usd",
		featured: true,
		category: { id: "cat-accessories", slug: "accessories", name: "Accessories" },
		images: [
			img("photo-1609091839311-d5365f9ff1c5"),
			img("photo-1610945265064-0e34e5519bbf"),
		],
		variants: [
			{ name: "Graphite", sku: "FMP-GPH", price: null, stock: 90, isDefault: true },
			{ name: "Sand", sku: "FMP-SND", price: null, stock: 60, isDefault: false },
		],
	},
	{
		id: "p-orbit-keyboard",
		slug: "orbit-mechanical-keyboard",
		name: "Orbit Mechanical Keyboard",
		description:
			"A low-profile mechanical keyboard with hot-swappable switches, gasket mounting, and per-key RGB.",
		price: 15900,
		compareAtPrice: 18900,
		currency: "usd",
		featured: false,
		category: { id: "cat-accessories", slug: "accessories", name: "Accessories" },
		images: [
			img("photo-1618384887929-16ec33fab9ef"),
			img("photo-1587829741301-dc798b83add3"),
		],
		variants: [
			{ name: "Slate / Linear", sku: "OMK-SLL", price: null, stock: 45, isDefault: true },
			{ name: "Slate / Tactile", sku: "OMK-SLT", price: null, stock: 32, isDefault: false },
		],
	},
	{
		id: "p-halo-27",
		slug: "halo-27-4k-monitor",
		name: "Halo 27 4K Monitor",
		description:
			"A 27-inch 4K monitor with 98% DCI-P3 color, USB-C single-cable connection, and a slim three-sided borderless design.",
		price: 54900,
		compareAtPrice: 64900,
		currency: "usd",
		featured: true,
		category: { id: "cat-displays", slug: "displays", name: "Displays" },
		images: [
			img("photo-1547119957-637f8679db1e"),
			img("photo-1527443224154-c4a3942d3acf"),
		],
		variants: [{ name: "27-inch", sku: "H27-4K", price: null, stock: 30, isDefault: true }],
	},
	{
		id: "p-halo-32",
		slug: "halo-32-curved-display",
		name: "Halo 32 Curved Display",
		description:
			"An immersive 32-inch curved QHD display with a 165Hz refresh rate and adaptive sync for smooth motion.",
		price: 44900,
		compareAtPrice: null,
		currency: "usd",
		featured: false,
		category: { id: "cat-displays", slug: "displays", name: "Displays" },
		images: [
			img("photo-1527443224154-c4a3942d3acf"),
			img("photo-1547119957-637f8679db1e"),
		],
		variants: [{ name: "32-inch Curved", sku: "H32-QHD", price: null, stock: 18, isDefault: true }],
	},
	{
		id: "p-lumen-projector",
		slug: "lumen-portable-projector",
		name: "Lumen Portable Projector",
		description:
			"A pocket-sized 1080p projector with autofocus, keystone correction, and a built-in battery for movie night anywhere.",
		price: 37900,
		compareAtPrice: 42900,
		currency: "usd",
		featured: false,
		category: { id: "cat-displays", slug: "displays", name: "Displays" },
		images: [
			img("photo-1517604931442-7e0c8ed2963c"),
			img("photo-1489599849927-2ee91cede3ba"),
		],
		variants: [{ name: "Standard", sku: "LPP-STD", price: null, stock: 22, isDefault: true }],
	},
	{
		id: "p-lumen-bulb",
		slug: "lumen-smart-bulb-2-pack",
		name: "Lumen Smart Bulb (2-Pack)",
		description:
			"Tunable white and full-color smart bulbs with scheduling, scenes, and voice control built in.",
		price: 3900,
		compareAtPrice: null,
		currency: "usd",
		featured: false,
		category: { id: "cat-smart-home", slug: "smart-home", name: "Smart Home" },
		images: [
			img("photo-1558002038-1055907df827"),
			img("photo-1564053489984-317bbd824340"),
		],
		variants: [{ name: "E26 / 2-Pack", sku: "LSB-2P", price: null, stock: 140, isDefault: true }],
	},
	{
		id: "p-nest-thermostat",
		slug: "nest-thermostat-slim",
		name: "Nest Thermostat Slim",
		description:
			"A slim smart thermostat that learns your schedule and helps trim energy use without the clutter.",
		price: 24900,
		compareAtPrice: null,
		currency: "usd",
		featured: false,
		category: { id: "cat-smart-home", slug: "smart-home", name: "Smart Home" },
		images: [
			img("photo-1545259741-2ea3ebf61fa3"),
			img("photo-1558002038-1055907df827"),
		],
		variants: [{ name: "White", sku: "NTS-WHT", price: null, stock: 25, isDefault: true }],
	},
	{
		id: "p-falcon-drone",
		slug: "falcon-4k-drone",
		name: "Falcon 4K Drone",
		description:
			"A foldable 4K drone with a 3-axis gimbal, 30-minute flight time, and intelligent follow modes for cinematic captures.",
		price: 69900,
		compareAtPrice: 79900,
		currency: "usd",
		featured: true,
		category: { id: "cat-accessories", slug: "accessories", name: "Accessories" },
		images: [
			img("photo-1473968512647-3e447244af8f"),
			img("photo-1508614589041-895b88991e3e"),
		],
		variants: [
			{ name: "Standard Kit", sku: "F4K-STD", price: null, stock: 16, isDefault: true },
			{ name: "Fly More Kit", sku: "F4K-FM", price: 79900, stock: 9, isDefault: false },
		],
	},
];

const parsedCategories = z.array(categorySchema).parse(
	categoryData.map((category) => {
		const products = productData.filter((p) => p.category.slug === category.slug).length;
		return { ...category, _count: { products } };
	}),
);

const parsedProducts = z.array(productSchema).parse(
	productData.map((product) => ({
		...product,
		images: product.images.map((url, index) => ({
			id: `${product.id}-img-${index}`,
			url,
			alt: `${product.name} image ${index + 1}`,
			position: index,
		})),
		variants: product.variants.map((variant, index) => ({
			...variant,
			id: `${product.id}-var-${index}`,
			position: index,
		})),
	})),
);

export const mockCategories = parsedCategories;
export const mockProducts = parsedProducts;

export type MockCategory = z.infer<typeof categorySchema>;
export type MockProduct = z.infer<typeof productSchema>;

export function getMockFeaturedProducts(limit: number) {
	return mockProducts
		.filter((product) => product.featured)
		.slice(0, limit);
}

export function getMockCategories() {
	return mockCategories;
}

export function getMockProductBySlug(slug: string) {
	return mockProducts.find((product) => product.slug === slug) ?? null;
}

export function getMockProduct(id: string) {
	return mockProducts.find((product) => product.id === id) ?? null;
}

export function getMockProducts(input: {
	q?: string;
	category?: string;
	sort: "featured" | "newest" | "price-asc" | "price-desc";
	minPrice?: number;
	maxPrice?: number;
	page: number;
	pageSize: number;
}) {
	let items = mockProducts.slice();

	if (input.category) {
		items = items.filter((product) => product.category.slug === input.category);
	}

	if (input.q) {
		const q = input.q.toLowerCase();
		items = items.filter(
			(product) =>
				product.name.toLowerCase().includes(q) ||
				product.description.toLowerCase().includes(q),
		);
	}

	if (input.minPrice !== undefined || input.maxPrice !== undefined) {
		items = items.filter((product) => {
			if (input.minPrice !== undefined && product.price < input.minPrice) {
				return false;
			}
			if (input.maxPrice !== undefined && product.price > input.maxPrice) {
				return false;
			}
			return true;
		});
	}

	switch (input.sort) {
		case "featured":
			items.sort((a, b) => Number(b.featured) - Number(a.featured));
			break;
		case "price-asc":
			items.sort((a, b) => a.price - b.price);
			break;
		case "price-desc":
			items.sort((a, b) => b.price - a.price);
			break;
		case "newest":
		default:
			break;
	}

	const total = items.length;
	const start = (input.page - 1) * input.pageSize;
	const pageItems = items.slice(start, start + input.pageSize);

	return {
		items: pageItems,
		total,
		page: input.page,
		pageSize: input.pageSize,
		pageCount: Math.max(1, Math.ceil(total / input.pageSize)),
	};
}
