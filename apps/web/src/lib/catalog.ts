export type ProductSort = "featured" | "newest" | "price-asc" | "price-desc";

export type CatalogParams = {
	q?: string;
	category?: string;
	sort: ProductSort;
	minPrice?: number;
	maxPrice?: number;
	page: number;
	pageSize: number;
};

export type CategorySummary = {
	id: string;
	slug: string;
	name: string;
	description: string | null;
	image: string | null;
	position: number;
	_count: { products: number };
};

export type ProductImageSummary = {
	id: string;
	url: string;
	alt: string | null;
	position: number;
};

export type ProductVariantSummary = {
	id: string;
	name: string;
	sku: string;
	price: number | null;
	stock: number;
	isDefault: boolean;
	position: number;
};

export type ProductSummary = {
	id: string;
	slug: string;
	name: string;
	description: string;
	price: number;
	compareAtPrice: number | null;
	currency: string;
	featured: boolean;
	category: { id: string; slug: string; name: string };
	images: ProductImageSummary[];
	variants: ProductVariantSummary[];
};

export type ProductPage = {
	items: ProductSummary[];
	total: number;
	page: number;
	pageSize: number;
	pageCount: number;
};
