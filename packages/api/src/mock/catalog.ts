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
	tagline: z.string(),
	description: z.string(),
	price: z.number(),
	compareAtPrice: z.number().nullable(),
	currency: z.string(),
	featured: z.boolean(),
	isNew: z.boolean(),
	bestseller: z.boolean(),
	rating: z.number(),
	reviewCount: z.number(),
	category: categoryRefSchema,
	images: z.array(imageSchema),
	variants: z.array(variantSchema),
	highlights: z.array(z.string()),
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

const testimonialSchema = z.object({
	id: z.string(),
	name: z.string(),
	role: z.string(),
	quote: z.string(),
	rating: z.number(),
});

const collectionSchema = z.object({
	id: z.string(),
	slug: z.string(),
	title: z.string(),
	description: z.string(),
	image: z.string().url(),
	productIds: z.array(z.string()),
});

const img = (id: string, w = 1600, h = 1200) =>
	`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const categoryData = [
	{
		id: "cat-audio",
		slug: "audio",
		name: "Audio",
		description: "Immersive sound, engineered to disappear into the moment.",
		image: img("photo-1505740420928-5e560c06d30e"),
		position: 1,
	},
	{
		id: "cat-wearables",
		slug: "wearables",
		name: "Wearables",
		description: "Quiet companions for every heartbeat and every mile.",
		image: img("photo-1579586337278-3befd40fd17a"),
		position: 2,
	},
	{
		id: "cat-computing",
		slug: "computing",
		name: "Computing",
		description: "Machines that keep up with the speed of your thinking.",
		image: img("photo-1496181133206-80ce9b88a853"),
		position: 3,
	},
	{
		id: "cat-accessories",
		slug: "accessories",
		name: "Accessories",
		description: "The considered details that complete the setup.",
		image: img("photo-1600185365483-26d7a4cc7519"),
		position: 4,
	},
	{
		id: "cat-displays",
		slug: "displays",
		name: "Displays",
		description: "Windows into worlds of color and clarity.",
		image: img("photo-1547119957-637f8679db1e"),
		position: 5,
	},
	{
		id: "cat-smart-home",
		slug: "smart-home",
		name: "Smart Home",
		description: "A calmer, more connected way to live.",
		image: img("photo-1558002038-1055907df827"),
		position: 6,
	},
];

const productData = [
	{
		id: "p-sonic-drift",
		slug: "sonic-drift-wireless-headphones",
		name: "Sonic Drift",
		tagline: "Silence, refined.",
		description:
			"Over-ear headphones with adaptive noise cancellation, a 40-hour battery, and spatial audio that follows the movement of your head. Memory-foam ear cups and a featherweight frame make them disappear after the first song.",
		price: 34900,
		compareAtPrice: 39900,
		currency: "usd",
		featured: true,
		isNew: false,
		bestseller: true,
		rating: 4.9,
		reviewCount: 1284,
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
		highlights: [
			"Adaptive active noise cancellation",
			"40-hour battery life",
			"Head-tracked spatial audio",
			"Multi-point Bluetooth 5.4",
		],
	},
	{
		id: "p-pulse-buds",
		slug: "pulse-buds-pro",
		name: "Pulse Buds Pro",
		tagline: "Sound that moves with you.",
		description:
			"True wireless earbuds with hybrid drivers, six-microphone call clarity, and a pocketable wireless-charging case. Sweat and dust resistant for wherever the day takes you.",
		price: 19900,
		compareAtPrice: null,
		currency: "usd",
		featured: true,
		isNew: true,
		bestseller: false,
		rating: 4.8,
		reviewCount: 862,
		category: { id: "cat-audio", slug: "audio", name: "Audio" },
		images: [
			img("photo-1590658268037-6bf12165a8df"),
			img("photo-1606220945770-b5b6c2c55bf1"),
			img("photo-1600185365926-3a2ce3cdb9eb"),
		],
		variants: [
			{ name: "Graphite", sku: "PBP-GPH", price: null, stock: 60, isDefault: true },
			{ name: "Ivory", sku: "PBP-IVY", price: null, stock: 35, isDefault: false },
			{ name: "Mint", sku: "PBP-MNT", price: 21900, stock: 12, isDefault: false },
		],
		highlights: [
			"Hybrid dual-driver acoustic system",
			"6-mic adaptive beamforming",
			"IPX5 sweat resistance",
			"Wireless charging case",
		],
	},
	{
		id: "p-echo-pillar",
		slug: "echo-pillar-smart-speaker",
		name: "Echo Pillar",
		tagline: "A room in full color.",
		description:
			"Room-filling 360-degree sound wrapped in a warm fabric finish. Multi-room pairing and a built-in voice assistant make it the quiet center of the home.",
		price: 14900,
		compareAtPrice: null,
		currency: "usd",
		featured: false,
		isNew: false,
		bestseller: false,
		rating: 4.6,
		reviewCount: 431,
		category: { id: "cat-audio", slug: "audio", name: "Audio" },
		images: [
			img("photo-1608043152269-423dbba4e7e1"),
			img("photo-1545454675-3531b543be5d"),
		],
		variants: [
			{ name: "Charcoal", sku: "EPS-CHR", price: null, stock: 50, isDefault: true },
			{ name: "Cloud", sku: "EPS-CLD", price: null, stock: 22, isDefault: false },
		],
		highlights: [
			"360° room-filling sound",
			"Multi-room grouping",
			"Built-in voice assistant",
			"Recycled fabric finish",
		],
	},
	{
		id: "p-meridian",
		slug: "meridian-smartwatch",
		name: "Meridian",
		tagline: "Time, worn lightly.",
		description:
			"A titanium smartwatch with an always-on AMOLED display, dual-band GPS, and up to 10 days of battery. Built for the long view, finished to disappear on the wrist.",
		price: 42900,
		compareAtPrice: 49900,
		currency: "usd",
		featured: true,
		isNew: false,
		bestseller: true,
		rating: 4.9,
		reviewCount: 1547,
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
		highlights: [
			"Always-on AMOLED display",
			"Dual-band GPS",
			"10-day battery life",
			"Aerospace-grade titanium",
		],
	},
	{
		id: "p-cadence",
		slug: "cadence-fitness-band",
		name: "Cadence",
		tagline: "Small signal, big picture.",
		description:
			"A featherweight tracker with heart-rate, sleep, and SpO2 monitoring plus a week of battery in one charge. The essential metrics, minus the noise.",
		price: 9900,
		compareAtPrice: null,
		currency: "usd",
		featured: false,
		isNew: false,
		bestseller: false,
		rating: 4.5,
		reviewCount: 689,
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
		highlights: [
			"Continuous heart-rate tracking",
			"Sleep & SpO2 insights",
			"7-day battery",
			"5ATM water resistance",
		],
	},
	{
		id: "p-aeron-14",
		slug: "aeron-14-ultrabook",
		name: "Aeron 14",
		tagline: "Think at the speed of light.",
		description:
			"A 14-inch magnesium-alloy ultrabook with a 2.8K OLED panel, all-day battery, and a whisper-quiet keyboard. Light enough to forget, powerful enough to remember.",
		price: 149900,
		compareAtPrice: 169900,
		currency: "usd",
		featured: true,
		isNew: true,
		bestseller: true,
		rating: 4.9,
		reviewCount: 732,
		category: { id: "cat-computing", slug: "computing", name: "Computing" },
		images: [
			img("photo-1496181133206-80ce9b88a853"),
			img("photo-1517336714731-489689fd1ca8"),
			img("photo-1526170375885-4d8ecf77b99f"),
		],
		variants: [
			{ name: "16GB / 512GB", sku: "A14-16512", price: null, stock: 12, isDefault: true },
			{ name: "32GB / 1TB", sku: "A14-321T", price: 174900, stock: 8, isDefault: false },
		],
		highlights: [
			"2.8K OLED 120Hz display",
			"Magnesium-alloy chassis",
			"All-day battery",
			"Whisper-quiet keyboard",
		],
	},
	{
		id: "p-aeron-slate",
		slug: "aeron-slate-11",
		name: "Aeron Slate 11",
		tagline: "A canvas for every idea.",
		description:
			"An 11-inch tablet with a laminated 120Hz display, magnetic keyboard, and a stylus that feels like ink. Sketch, write, and think on one surface.",
		price: 79900,
		compareAtPrice: null,
		currency: "usd",
		featured: true,
		isNew: false,
		bestseller: false,
		rating: 4.7,
		reviewCount: 511,
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
		highlights: [
			"Laminated 120Hz display",
			"Pressure-sensitive stylus",
			"Magnetic keyboard",
			"Ultra-portable 0.4kg",
		],
	},
	{
		id: "p-volt-charger",
		slug: "volt-gan-charger-100w",
		name: "Volt GaN 100W",
		tagline: "Power, compressed.",
		description:
			"A compact gallium-nitride charger that powers a laptop, phone, and earbuds at once without the bulk. Small enough for the pocket, capable enough for the desk.",
		price: 6900,
		compareAtPrice: null,
		currency: "usd",
		featured: false,
		isNew: false,
		bestseller: false,
		rating: 4.6,
		reviewCount: 903,
		category: { id: "cat-accessories", slug: "accessories", name: "Accessories" },
		images: [
			img("photo-1583863788434-e58a36330cf0"),
			img("photo-1609091839311-d5365f9ff1c5"),
		],
		variants: [
			{ name: "Single Port", sku: "VGC-100", price: null, stock: 120, isDefault: true },
		],
		highlights: [
			"100W GaN output",
			"Charges 3 devices at once",
			"Pocket-sized",
			"Universal compatibility",
		],
	},
	{
		id: "p-flow-power",
		slug: "flow-magnetic-power-bank",
		name: "Flow Magnetic Power Bank",
		tagline: "Keep the current flowing.",
		description:
			"A 10,000mAh magnetic power bank that snaps to your phone and tops it up wirelessly while you go. No cables, no fuss.",
		price: 5900,
		compareAtPrice: null,
		currency: "usd",
		featured: true,
		isNew: false,
		bestseller: true,
		rating: 4.8,
		reviewCount: 1120,
		category: { id: "cat-accessories", slug: "accessories", name: "Accessories" },
		images: [
			img("photo-1609091839311-d5365f9ff1c5"),
			img("photo-1610945265064-0e34e5519bbf"),
		],
		variants: [
			{ name: "Graphite", sku: "FMP-GPH", price: null, stock: 90, isDefault: true },
			{ name: "Sand", sku: "FMP-SND", price: null, stock: 60, isDefault: false },
		],
		highlights: [
			"10,000mAh capacity",
			"Magnetic snap alignment",
			"15W wireless output",
			"Pass-through charging",
		],
	},
	{
		id: "p-orbit-keyboard",
		slug: "orbit-mechanical-keyboard",
		name: "Orbit Keyboard",
		tagline: "Every keystroke, weighted.",
		description:
			"A low-profile mechanical keyboard with hot-swappable switches, gasket mounting, and per-key RGB. Tactile, quiet, and built to disappear under your fingers.",
		price: 15900,
		compareAtPrice: 18900,
		currency: "usd",
		featured: false,
		isNew: true,
		bestseller: false,
		rating: 4.7,
		reviewCount: 348,
		category: { id: "cat-accessories", slug: "accessories", name: "Accessories" },
		images: [
			img("photo-1618384887929-16ec33fab9ef"),
			img("photo-1587829741301-dc798b83add3"),
		],
		variants: [
			{ name: "Slate / Linear", sku: "OMK-SLL", price: null, stock: 45, isDefault: true },
			{ name: "Slate / Tactile", sku: "OMK-SLT", price: null, stock: 32, isDefault: false },
		],
		highlights: [
			"Hot-swappable switches",
			"Gasket-mounted plate",
			"Per-key RGB",
			"Low-profile aluminum",
		],
	},
	{
		id: "p-halo-27",
		slug: "halo-27-4k-monitor",
		name: "Halo 27",
		tagline: "Color, in full command.",
		description:
			"A 27-inch 4K monitor with 98% DCI-P3 color, USB-C single-cable connection, and a slim three-sided borderless design. Made for the ones who sweat the details.",
		price: 54900,
		compareAtPrice: 64900,
		currency: "usd",
		featured: true,
		isNew: false,
		bestseller: true,
		rating: 4.8,
		reviewCount: 421,
		category: { id: "cat-displays", slug: "displays", name: "Displays" },
		images: [
			img("photo-1547119957-637f8679db1e"),
			img("photo-1527443224154-c4a3942d3acf"),
		],
		variants: [
			{ name: "27-inch", sku: "H27-4K", price: null, stock: 30, isDefault: true },
		],
		highlights: [
			"27-inch 4K panel",
			"98% DCI-P3 color",
			"USB-C single-cable",
			"3-sided borderless",
		],
	},
	{
		id: "p-halo-32",
		slug: "halo-32-curved-display",
		name: "Halo 32",
		tagline: "Step into the frame.",
		description:
			"An immersive 32-inch curved QHD display with a 165Hz refresh rate and adaptive sync for smooth motion. Game, create, and lose track of time.",
		price: 44900,
		compareAtPrice: null,
		currency: "usd",
		featured: false,
		isNew: false,
		bestseller: false,
		rating: 4.7,
		reviewCount: 296,
		category: { id: "cat-displays", slug: "displays", name: "Displays" },
		images: [
			img("photo-1527443224154-c4a3942d3acf"),
			img("photo-1547119957-637f8679db1e"),
		],
		variants: [
			{ name: "32-inch Curved", sku: "H32-QHD", price: null, stock: 18, isDefault: true },
		],
		highlights: [
			"32-inch curved QHD",
			"165Hz refresh rate",
			"Adaptive sync",
			"Immersive 1500R curve",
		],
	},
	{
		id: "p-lumen-projector",
		slug: "lumen-portable-projector",
		name: "Lumen Projector",
		tagline: "Bring the theater home.",
		description:
			"A pocket-sized 1080p projector with autofocus, keystone correction, and a built-in battery for movie night anywhere. Cinema, minus the cords.",
		price: 37900,
		compareAtPrice: 42900,
		currency: "usd",
		featured: false,
		isNew: false,
		bestseller: false,
		rating: 4.5,
		reviewCount: 187,
		category: { id: "cat-displays", slug: "displays", name: "Displays" },
		images: [
			img("photo-1517604931442-7e0c8ed2963c"),
			img("photo-1489599849927-2ee91cede3ba"),
		],
		variants: [
			{ name: "Standard", sku: "LPP-STD", price: null, stock: 22, isDefault: true },
		],
		highlights: [
			"1080p native resolution",
			"Autofocus & keystone",
			"Built-in battery",
			"Pocket-sized body",
		],
	},
	{
		id: "p-lumen-bulb",
		slug: "lumen-smart-bulb-2-pack",
		name: "Lumen Bulb",
		tagline: "Set the scene.",
		description:
			"Tunable white and full-color smart bulbs with scheduling, scenes, and voice control built in. The right light for every hour.",
		price: 3900,
		compareAtPrice: null,
		currency: "usd",
		featured: false,
		isNew: false,
		bestseller: false,
		rating: 4.4,
		reviewCount: 812,
		category: { id: "cat-smart-home", slug: "smart-home", name: "Smart Home" },
		images: [
			img("photo-1558002038-1055907df827"),
			img("photo-1564053489984-317bbd824340"),
		],
		variants: [
			{ name: "E26 / 2-Pack", sku: "LSB-2P", price: null, stock: 140, isDefault: true },
		],
		highlights: [
			"16M colors",
			"Tunable white",
			"Scheduling & scenes",
			"Voice control",
		],
	},
	{
		id: "p-nest-thermostat",
		slug: "nest-thermostat-slim",
		name: "Nest Thermostat Slim",
		tagline: "Comfort, on autopilot.",
		description:
			"A slim smart thermostat that learns your schedule and helps trim energy use without the clutter. A calmer home, with less to think about.",
		price: 24900,
		compareAtPrice: null,
		currency: "usd",
		featured: false,
		isNew: false,
		bestseller: false,
		rating: 4.6,
		reviewCount: 273,
		category: { id: "cat-smart-home", slug: "smart-home", name: "Smart Home" },
		images: [
			img("photo-1545259741-2ea3ebf61fa3"),
			img("photo-1558002038-1055907df827"),
		],
		variants: [
			{ name: "White", sku: "NTS-WHT", price: null, stock: 25, isDefault: true },
		],
		highlights: [
			"Learns your schedule",
			"Energy savings insights",
			"Remote control",
			"Slim, minimal design",
		],
	},
	{
		id: "p-falcon-drone",
		slug: "falcon-4k-drone",
		name: "Falcon 4K",
		tagline: "See it from above.",
		description:
			"A foldable 4K drone with a 3-axis gimbal, 30-minute flight time, and intelligent follow modes for cinematic captures. The sky, your studio.",
		price: 69900,
		compareAtPrice: 79900,
		currency: "usd",
		featured: true,
		isNew: true,
		bestseller: false,
		rating: 4.8,
		reviewCount: 534,
		category: { id: "cat-accessories", slug: "accessories", name: "Accessories" },
		images: [
			img("photo-1473968512647-3e447244af8f"),
			img("photo-1508614589041-895b88991e3e"),
		],
		variants: [
			{ name: "Standard Kit", sku: "F4K-STD", price: null, stock: 16, isDefault: true },
			{ name: "Fly More Kit", sku: "F4K-FM", price: 79900, stock: 9, isDefault: false },
		],
		highlights: [
			"4K / 60fps camera",
			"3-axis gimbal",
			"30-min flight time",
			"Intelligent follow modes",
		],
	},
	{
		id: "p-aero-mouse",
		slug: "aero-precision-mouse",
		name: "Aero Mouse",
		tagline: "Precision in your palm.",
		description:
			"An ultra-light wireless mouse with an 8K polling sensor and a sculpted shell that fits like an extension of the hand. Zero drag, full control.",
		price: 12900,
		compareAtPrice: null,
		currency: "usd",
		featured: false,
		isNew: true,
		bestseller: false,
		rating: 4.7,
		reviewCount: 244,
		category: { id: "cat-accessories", slug: "accessories", name: "Accessories" },
		images: [
			img("photo-1527864550417-7fd91fc51a46"),
			img("photo-1586816879360-004f5b0c51e5"),
		],
		variants: [
			{ name: "Graphite", sku: "AM-GPH", price: null, stock: 55, isDefault: true },
			{ name: "White", sku: "AM-WHT", price: null, stock: 40, isDefault: false },
		],
		highlights: [
			"49g ultra-light body",
			"8K polling sensor",
			"Wireless + wired",
			"100-hour battery",
		],
	},
	{
		id: "p-sol-lamp",
		slug: "sol-ambient-lamp",
		name: "Sol Lamp",
		tagline: "Light, softened.",
		description:
			"A sculptural ambient lamp with touch dimming and a warm, sun-like glow. A quiet object that changes the room.",
		price: 8900,
		compareAtPrice: 10900,
		currency: "usd",
		featured: false,
		isNew: false,
		bestseller: false,
		rating: 4.5,
		reviewCount: 198,
		category: { id: "cat-smart-home", slug: "smart-home", name: "Smart Home" },
		images: [
			img("photo-1507473885765-e6ed057f782c"),
			img("photo-1513506003901-1e6a229e2d15"),
		],
		variants: [
			{ name: "Warm White", sku: "SOL-WW", price: null, stock: 70, isDefault: true },
		],
		highlights: [
			"Touch dimming",
			"Warm 2700K glow",
			"Sculptural form",
			"Soft-touch finish",
		],
	},
];

const testimonialData = [
	{
		id: "t-1",
		name: "Maya Chen",
		role: "Product Designer",
		quote:
			"The Sonic Drift headphones replaced three pairs on my desk. They just fade away, and the noise-cancelling is genuinely magic.",
		rating: 5,
	},
	{
		id: "t-2",
		name: "Devon Brooks",
		role: "Indie Developer",
		quote:
			"I've gone through a lot of 'minimal' gear. Tachyon is the first that actually feels considered, not just stripped down.",
		rating: 5,
	},
	{
		id: "t-3",
		name: "Sofia Reyes",
		role: "Photographer",
		quote:
			"The Halo 27's color accuracy is the closest I've seen to my reference display at twice the price. A real tool.",
		rating: 5,
	},
	{
		id: "t-4",
		name: "James Park",
		role: "Founder",
		quote:
			"Ordered the Falcon drone on a Tuesday, had it in the air Thursday. Packaging, setup, everything felt premium.",
		rating: 4,
	},
];

const collectionData = [
	{
		id: "col-editor",
		slug: "editors-picks",
		title: "Editor's Picks",
		description: "The pieces we reach for first.",
		image: img("photo-1498049794561-7780e7231661"),
		productIds: ["p-sonic-drift", "p-aeron-14", "p-halo-27", "p-meridian"],
	},
	{
		id: "col-new",
		slug: "new-arrivals",
		title: "New Arrivals",
		description: "Fresh off the bench, ready for the desk.",
		image: img("photo-1526738549149-8e07eca6c147"),
		productIds: ["p-pulse-buds", "p-aeron-14", "p-falcon-drone", "p-aero-mouse"],
	},
	{
		id: "col-travel",
		slug: "travel-kit",
		title: "The Travel Kit",
		description: "Everything you need, nothing you don't.",
		image: img("photo-1544735716-392fe2489ffa"),
		productIds: ["p-pulse-buds", "p-flow-power", "p-volt-charger", "p-cadence"],
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

const parsedTestimonials = z.array(testimonialSchema).parse(testimonialData);
const parsedCollections = z.array(collectionSchema).parse(collectionData);

export const mockCategories = parsedCategories;
export const mockProducts = parsedProducts;
export const mockTestimonials = parsedTestimonials;
export const mockCollections = parsedCollections;

export type MockCategory = z.infer<typeof categorySchema>;
export type MockProduct = z.infer<typeof productSchema>;
export type MockTestimonial = z.infer<typeof testimonialSchema>;
export type MockCollection = z.infer<typeof collectionSchema>;

export function getMockFeaturedProducts(limit: number) {
	return mockProducts.filter((product) => product.featured).slice(0, limit);
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
				product.tagline.toLowerCase().includes(q) ||
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
			items.sort((a, b) => Number(b.isNew) - Number(a.isNew));
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

export function getMockTestimonials() {
	return mockTestimonials;
}

export function getMockCollections() {
	return mockCollections;
}

export function getMockCollection(slug: string) {
	return mockCollections.find((collection) => collection.slug === slug) ?? null;
}
