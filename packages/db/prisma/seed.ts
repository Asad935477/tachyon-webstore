import dotenv from "dotenv";

dotenv.config({ path: "../../apps/server/.env" });

const { mockCategories, mockProducts } = await import(
	"../../api/src/mock/catalog"
);
const { default: prisma } = await import("@tachyon-webstore/db");

async function main() {
	console.log("Seeding categories...");
	for (const category of mockCategories) {
		await prisma.category.upsert({
			where: { slug: category.slug },
			update: {
				name: category.name,
				description: category.description,
				image: category.image,
				position: category.position,
			},
			create: {
				slug: category.slug,
				name: category.name,
				description: category.description,
				image: category.image,
				position: category.position,
			},
		});
	}

	const dbCategories = await prisma.category.findMany();
	const categoryBySlug = new Map(
		dbCategories.map((c) => [c.slug, c]),
	);

	console.log("Seeding products...");
	for (const product of mockProducts) {
		const category = categoryBySlug.get(product.category.slug);
		if (!category) {
			throw new Error(`Unknown category: ${product.category.slug}`);
		}

		await prisma.product.upsert({
			where: { slug: product.slug },
			update: {
				name: product.name,
				tagline: product.tagline,
				description: product.description,
				price: product.price,
				compareAtPrice: product.compareAtPrice,
				currency: product.currency,
				featured: product.featured,
				isNew: product.isNew,
				bestseller: product.bestseller,
				rating: product.rating,
				reviewCount: product.reviewCount,
				highlights: product.highlights,
				categoryId: category.id,
				images: {
					deleteMany: {},
					create: product.images.map((image, index) => ({
						url: image.url,
						alt: image.alt,
						position: index,
					})),
				},
				variants: {
					deleteMany: {},
					create: product.variants.map((variant, index) => ({
						name: variant.name,
						sku: variant.sku,
						price: variant.price,
						stock: variant.stock,
						isDefault: variant.isDefault,
						position: index,
					})),
				},
			},
			create: {
				slug: product.slug,
				name: product.name,
				tagline: product.tagline,
				description: product.description,
				price: product.price,
				compareAtPrice: product.compareAtPrice,
				currency: product.currency,
				featured: product.featured,
				isNew: product.isNew,
				bestseller: product.bestseller,
				rating: product.rating,
				reviewCount: product.reviewCount,
				highlights: product.highlights,
				categoryId: category.id,
				images: {
					create: product.images.map((image, index) => ({
						url: image.url,
						alt: image.alt,
						position: index,
					})),
				},
				variants: {
					create: product.variants.map((variant, index) => ({
						name: variant.name,
						sku: variant.sku,
						price: variant.price,
						stock: variant.stock,
						isDefault: variant.isDefault,
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
