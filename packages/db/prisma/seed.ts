import prisma from "@tachyon-webstore/db";

const img = (id: string, w = 1200, h = 900) =>
	`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const categories = [
	{
		slug: "audio",
		name: "Audio",
		description: "Headphones, earbuds, and speakers tuned for the long haul.",
		image: img("photo-1583394838336-acd977736f90"),
		position: 1,
	},
	{
		slug: "wearables",
		name: "Wearables",
		description: "Smartwatches and bands that keep pace with you.",
		image: img("photo-1579586337278-3befd40fd17a"),
		position: 2,
	},
	{
		slug: "computing",
		name: "Computing",
		description: "Laptops, tablets, and tools for focused work.",
		image: img("photo-1496181133206-80ce9b88a853"),
		position: 3,
	},
	{
		slug: "accessories",
		name: "Accessories",
		description: "Cables, chargers, and the essentials that tie it together.",
		image: img("photo-1600185365483-26d7a4cc7519"),
		position: 4,
	},
	{
		slug: "displays",
		name: "Displays",
		description: "Monitors and screens built for clarity and color.",
		image: img("photo-1547119957-637f8679db1e"),
		position: 5,
	},
	{
		slug: "smart-home",
		name: "Smart Home",
		description: "Connected devices that make home feel effortless.",
		image: img("photo-1558002038-1055907df827"),
		position: 6,
	},
];

type ProductSeed = {
	slug: string;
	name: string;
	description: string;
	price: number;
	compareAtPrice?: number;
	featured?: boolean;
	category: string;
	images: string[];
	variants: {
		name: string;
		sku: string;
		price?: number;
		stock: number;
		isDefault?: boolean;
	}[];
};

const products: ProductSeed[] = [
	{
		slug: "sonic-drift-wireless-headphones",
		name: "Sonic Drift Wireless Headphones",
		description:
			"Over-ear headphones with adaptive noise cancellation, 40-hour battery life, and spatial audio that follows your head.",
		price: 34900,
		compareAtPrice: 39900,
		featured: true,
		category: "audio",
		images: [
			img("photo-1505740420928-5e560c06d30e"),
			img("photo-1583394838336-acd977736f90"),
			img("photo-1484704849700-f032a568e944"),
		],
		variants: [
			{ name: "Matte Black", sku: "SDH-BLK", stock: 42, isDefault: true },
			{ name: "Arctic White", sku: "SDH-WHT", stock: 28 },
			{ name: "Sandstone", sku: "SDH-SND", stock: 15, price: 35900 },
		],
	},
	{
		slug: "pulse-buds-pro",
		name: "Pulse Buds Pro",
		description:
			"True wireless earbuds with hybrid drivers, six-microphone call clarity, and a pocketable wireless-charging case.",
		price: 19900,
		featured: true,
		category: "audio",
		images: [
			img("photo-1590658268037-6bf12165a8df"),
			img("photo-1606220945770-b5b6c2c55bf1"),
			img("photo-1600185365926-3a2ce3cdb9eb"),
		],
		variants: [
			{ name: "Graphite", sku: "PBP-GPH", stock: 60, isDefault: true },
			{ name: "Ivory", sku: "PBP-IVY", stock: 35 },
			{ name: "Mint", sku: "PBP-MNT", stock: 12, price: 21900 },
		],
	},
	{
		slug: "echo-pillar-smart-speaker",
		name: "Echo Pillar Smart Speaker",
		description:
			"Room-filling 360-degree sound with a fabric finish, multi-room pairing, and a built-in voice assistant.",
		price: 14900,
		featured: false,
		category: "audio",
		images: [
			img("photo-1608043152269-423dbba4e7e1"),
			img("photo-1545454675-3531b543be5d"),
		],
		variants: [
			{ name: "Charcoal", sku: "EPS-CHR", stock: 50, isDefault: true },
			{ name: "Cloud", sku: "EPS-CLD", stock: 22 },
		],
	},
	{
		slug: "meridian-smartwatch",
		name: "Meridian Smartwatch",
		description:
			"A titanium smartwatch with always-on AMOLED display, dual-band GPS, and up to 10 days of battery.",
		price: 42900,
		compareAtPrice: 49900,
		featured: true,
		category: "wearables",
		images: [
			img("photo-1579586337278-3befd40fd17a"),
			img("photo-1508685096489-7aacd43bd3b1"),
			img("photo-1523275335684-37898b6baf30"),
		],
		variants: [
			{ name: "Titanium / 42mm", sku: "MSW-T42", stock: 20, isDefault: true },
			{ name: "Titanium / 46mm", sku: "MSW-T46", stock: 18, price: 44900 },
			{ name: "Midnight / 42mm", sku: "MSW-M42", stock: 14 },
		],
	},
	{
		slug: "cadence-fitness-band",
		name: "Cadence Fitness Band",
		description:
			"A featherweight tracker with heart-rate, sleep, and SpO2 monitoring plus a week of battery in one charge.",
		price: 9900,
		featured: false,
		category: "wearables",
		images: [
			img("photo-1557935728-e6d1eaabe558"),
			img("photo-1557935728-e6d1eaabe558"),
		],
		variants: [
			{ name: "Black / S", sku: "CFB-BKS", stock: 80, isDefault: true },
			{ name: "Black / M", sku: "CFB-BKM", stock: 75 },
			{ name: "Lilac / S", sku: "CFB-LIS", stock: 40 },
		],
	},
	{
		slug: "aeron-14-ultrabook",
		name: "Aeron 14 Ultrabook",
		description:
			"A 14-inch magnesium-alloy ultrabook with a 2.8K OLED panel, all-day battery, and a whisper-quiet keyboard.",
		price: 149900,
		compareAtPrice: 169900,
		featured: true,
		category: "computing",
		images: [
			img("photo-1496181133206-80ce9b88a853"),
			img("photo-1517336714731-489689fd1ca8"),
			img("photo-1526170375885-4d8ecf77b99f"),
		],
		variants: [
			{ name: "16GB / 512GB", sku: "A14-16512", stock: 12, isDefault: true },
			{ name: "32GB / 1TB", sku: "A14-321T", stock: 8, price: 174900 },
		],
	},
	{
		slug: "aeron-slate-11",
		name: "Aeron Slate 11",
		description:
			"An 11-inch tablet with a laminated 120Hz display, magnetic keyboard, and a stylus that feels like ink.",
		price: 79900,
		featured: true,
		category: "computing",
		images: [
			img("photo-1544244015-0df4b3ffc6b0"),
			img("photo-1561154464-82e9adf32764"),
			img("photo-1585790050230-5dd28404ccb9"),
		],
		variants: [
			{ name: "Wi-Fi / 256GB", sku: "AS11-256", stock: 25, isDefault: true },
			{ name: "Wi-Fi / 512GB", sku: "AS11-512", stock: 15, price: 94900 },
		],
	},
	{
		slug: "volt-gan-charger-100w",
		name: "Volt GaN Charger 100W",
		description:
			"A compact gallium-nitride charger that powers a laptop, phone, and earbuds at once without the bulk.",
		price: 6900,
		featured: false,
		category: "accessories",
		images: [
			img("photo-1583863788434-e58a36330cf0"),
			img("photo-1609091839311-d5365f9ff1c5"),
		],
		variants: [
			{ name: "Single Port", sku: "VGC-100", stock: 120, isDefault: true },
		],
	},
	{
		slug: "flow-magnetic-power-bank",
		name: "Flow Magnetic Power Bank",
		description:
			"A 10,000mAh magnetic power bank that snaps to your phone and tops it up wirelessly while you go.",
		price: 5900,
		featured: true,
		category: "accessories",
		images: [
			img("photo-1609091839311-d5365f9ff1c5"),
			img("photo-1610945265064-0e34e5519bbf"),
		],
		variants: [
			{ name: "Graphite", sku: "FMP-GPH", stock: 90, isDefault: true },
			{ name: "Sand", sku: "FMP-SND", stock: 60 },
		],
	},
	{
		slug: "halo-27-4k-monitor",
		name: "Halo 27 4K Monitor",
		description:
			"A 27-inch 4K monitor with 98% DCI-P3 color, USB-C single-cable connection, and a slim three-sided borderless design.",
		price: 54900,
		compareAtPrice: 64900,
		featured: true,
		category: "displays",
		images: [
			img("photo-1547119957-637f8679db1e"),
			img("photo-1527443224154-c4a3942d3acf"),
		],
		variants: [{ name: "27-inch", sku: "H27-4K", stock: 30, isDefault: true }],
	},
	{
		slug: "halo-32-curved-display",
		name: "Halo 32 Curved Display",
		description:
			"An immersive 32-inch curved QHD display with a 165Hz refresh rate and adaptive sync for smooth motion.",
		price: 44900,
		featured: false,
		category: "displays",
		images: [
			img("photo-1527443224154-c4a3942d3acf"),
			img("photo-1547119957-637f8679db1e"),
		],
		variants: [
			{ name: "32-inch Curved", sku: "H32-QHD", stock: 18, isDefault: true },
		],
	},
	{
		slug: "lumen-smart-bulb-2-pack",
		name: "Lumen Smart Bulb (2-Pack)",
		description:
			"Tunable white and full-color smart bulbs with scheduling, scenes, and voice control built in.",
		price: 3900,
		featured: false,
		category: "smart-home",
		images: [
			img("photo-1558002038-1055907df827"),
			img("photo-1558002038-1055907df827"),
		],
		variants: [
			{ name: "E26 / 2-Pack", sku: "LSB-2P", stock: 140, isDefault: true },
		],
	},
	{
		slug: "nest-thermostat-slim",
		name: "Nest Thermostat Slim",
		description:
			"A slim smart thermostat that learns your schedule and helps trim energy use without the clutter.",
		price: 24900,
		featured: false,
		category: "smart-home",
		images: [
			img("photo-1545259741-2ea3ebf61fa3"),
			img("photo-1558002038-1055907df827"),
		],
		variants: [{ name: "White", sku: "NTS-WHT", stock: 25, isDefault: true }],
	},
];

async function main() {
	console.log("Seeding categories...");
	for (const category of categories) {
		await prisma.category.upsert({
			where: { slug: category.slug },
			update: category,
			create: category,
		});
	}

	console.log("Seeding products...");
	for (const product of products) {
		const category = categories.find((c) => c.slug === product.category);
		if (!category) {
			throw new Error(`Unknown category: ${product.category}`);
		}

		await prisma.product.upsert({
			where: { slug: product.slug },
			update: {
				name: product.name,
				description: product.description,
				price: product.price,
				compareAtPrice: product.compareAtPrice ?? null,
				featured: product.featured ?? false,
				category: { connect: { slug: category.slug } },
				images: {
					deleteMany: {},
					create: product.images.map((url, index) => ({
						url,
						alt: `${product.name} image ${index + 1}`,
						position: index,
					})),
				},
				variants: {
					deleteMany: {},
					create: product.variants.map((variant, index) => ({
						...variant,
						attributes: {},
						position: index,
					})),
				},
			},
			create: {
				slug: product.slug,
				name: product.name,
				description: product.description,
				price: product.price,
				compareAtPrice: product.compareAtPrice ?? null,
				featured: product.featured ?? false,
				category: { connect: { slug: category.slug } },
				images: {
					create: product.images.map((url, index) => ({
						url,
						alt: `${product.name} image ${index + 1}`,
						position: index,
					})),
				},
				variants: {
					create: product.variants.map((variant, index) => ({
						...variant,
						attributes: {},
						position: index,
					})),
				},
			},
		});
	}

	console.log("Seed complete.");
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
