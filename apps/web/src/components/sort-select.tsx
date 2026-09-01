"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@tachyon-webstore/ui/components/select";

import type { ProductSort } from "@/lib/catalog";

const options: { value: ProductSort; label: string }[] = [
	{ value: "featured", label: "Featured" },
	{ value: "newest", label: "Newest" },
	{ value: "price-asc", label: "Price: Low to High" },
	{ value: "price-desc", label: "Price: High to Low" },
];

export function SortSelect({
	value,
	onChange,
}: {
	value: ProductSort;
	onChange: (value: ProductSort) => void;
}) {
	return (
		<Select value={value} onValueChange={(v) => onChange(v as ProductSort)}>
			<SelectTrigger size="sm" className="w-44">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
