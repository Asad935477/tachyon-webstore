import prisma from "@tachyon-webstore/db";
import { z } from "zod";

import {
	getMockCategories,
	getMockFeaturedProducts,
	getMockProduct,
	getMockProductBySlug,
	getMockProducts,
} from "../mock/catalog";
import { publicProcedure, router } from "../index";

const productInclude = {
	category: true,
	images: { orderBy: { position: "asc" as const } },
	variants: { orderBy: { position: "asc" as const } },
} as const;

const sortInput = z
	.enum(["featured", "newest", "price-asc", "price-desc"])
	.default("featured");

export const catalogRouter = router({
	getFeaturedProducts: publicProcedure
		.input(
			z
				.object({ limit: z.number().int().positive().max(50).default(8) })
				.optional(),
		)
		.query(async ({ input }) => {
			const limit = input?.limit ?? 8;

			try {
				const products = await prisma.product.findMany({
					where: { status: "active", featured: true },
					include: productInclude,
					orderBy: { createdAt: "desc" },
					take: limit,
				});
				if (products.length > 0) {
					return products;
				}
			} catch {
				// fall through to mock data
			}

			return getMockFeaturedProducts(limit);
		}),

	getProducts: publicProcedure
		.input(
			z.object({
				q: z.string().optional(),
				category: z.string().optional(),
				sort: sortInput,
				minPrice: z.number().int().nonnegative().optional(),
				maxPrice: z.number().int().nonnegative().optional(),
				page: z.number().int().positive().default(1),
				pageSize: z.number().int().positive().max(100).default(12),
			}),
		)
		.query(async ({ input }) => {
			const where = {
				status: "active" as const,
				...(input.category ? { category: { slug: input.category } } : {}),
				...(input.minPrice !== undefined || input.maxPrice !== undefined
					? {
							price: {
								...(input.minPrice !== undefined
									? { gte: input.minPrice }
									: {}),
								...(input.maxPrice !== undefined
									? { lte: input.maxPrice }
									: {}),
							},
						}
					: {}),
				...(input.q
					? {
							OR: [
								{ name: { contains: input.q, mode: "insensitive" as const } },
								{
									description: {
										contains: input.q,
										mode: "insensitive" as const,
									},
								},
							],
						}
					: {}),
			};

			const orderBy = {
				featured: [
					{ featured: "desc" as const },
					{ createdAt: "desc" as const },
				],
				newest: { createdAt: "desc" as const },
				"price-asc": { price: "asc" as const },
				"price-desc": { price: "desc" as const },
			}[input.sort];

			try {
				const [items, total] = await prisma.$transaction([
					prisma.product.findMany({
						where,
						include: productInclude,
						orderBy,
						skip: (input.page - 1) * input.pageSize,
						take: input.pageSize,
					}),
					prisma.product.count({ where }),
				]);

				if (total > 0) {
					return {
						items,
						total,
						page: input.page,
						pageSize: input.pageSize,
						pageCount: Math.max(1, Math.ceil(total / input.pageSize)),
					};
				}
			} catch {
				// fall through to mock data
			}

			return getMockProducts(input);
		}),

	getCategories: publicProcedure.query(async () => {
		try {
			const categories = await prisma.category.findMany({
				orderBy: { position: "asc" },
				include: {
					_count: { select: { products: { where: { status: "active" } } } },
				},
			});
			if (categories.length > 0) {
				return categories;
			}
		} catch {
			// fall through to mock data
		}

		return getMockCategories();
	}),

	getProductBySlug: publicProcedure
		.input(z.object({ slug: z.string().min(1) }))
		.query(async ({ input }) => {
			try {
				const product = await prisma.product.findFirst({
					where: { slug: input.slug, status: "active" },
					include: productInclude,
				});
				if (product) {
					return product;
				}
			} catch {
				// fall through to mock data
			}

			return getMockProductBySlug(input.slug);
		}),

	getProduct: publicProcedure
		.input(z.object({ id: z.string().min(1) }))
		.query(async ({ input }) => {
			try {
				const product = await prisma.product.findUnique({
					where: { id: input.id },
					include: productInclude,
				});
				if (product) {
					return product;
				}
			} catch {
				// fall through to mock data
			}

			return getMockProduct(input.id);
		}),
});
