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

export type ProductSummary = {
	id: string;
	slug: string;
	title: string;
	description: string;
	price: number;
	compareAtPrice: number | null;
	currency: string;
	stock: number;
	featured: boolean;
	isNew: boolean;
	bestseller: boolean;
	rating: number;
	reviewCount: number;
	category: { id: string; slug: string; name: string };
	images: ProductImageSummary[];
	highlights: string[];
};

export type ProductPage = {
	items: ProductSummary[];
	total: number;
	page: number;
	pageSize: number;
	pageCount: number;
};

export type Testimonial = {
	id: string;
	name: string;
	role: string;
	quote: string;
	rating: number;
};

export type Collection = {
	id: string;
	slug: string;
	title: string;
	description: string;
	image: string;
	productIds: string[];
};
