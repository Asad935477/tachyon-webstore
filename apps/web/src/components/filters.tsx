"use client";

import { Badge } from "@tachyon-webstore/ui/components/badge";
import { Button } from "@tachyon-webstore/ui/components/button";
import { X } from "lucide-react";

import type { CategorySummary } from "@/lib/catalog";

export function Filters({
	categories,
	selectedCategory,
	minPrice,
	maxPrice,
	onCategoryChange,
	onMinPriceChange,
	onMaxPriceChange,
	onClear,
}: {
	categories: CategorySummary[];
	selectedCategory?: string;
	minPrice?: number;
	maxPrice?: number;
	onCategoryChange: (slug?: string) => void;
	onMinPriceChange: (value?: number) => void;
	onMaxPriceChange: (value?: number) => void;
	onClear: () => void;
}) {
	const hasActive =
		selectedCategory || minPrice !== undefined || maxPrice !== undefined;

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<span className="font-medium text-sm">Filters</span>
				{hasActive ? (
					<Button variant="ghost" size="sm" onClick={onClear}>
						<X /> Clear
					</Button>
				) : null}
			</div>

			<div className="space-y-2">
				<div className="font-medium text-muted-foreground text-xs">
					Category
				</div>
				<div className="flex flex-wrap gap-2">
					{categories.map((category) => {
						const active = selectedCategory === category.slug;
						return (
							<button
								key={category.id}
								type="button"
								onClick={() =>
									onCategoryChange(active ? undefined : category.slug)
								}
							>
								<Badge
									variant={active ? "default" : "outline"}
									className="cursor-pointer"
								>
									{category.name}
								</Badge>
							</button>
						);
					})}
				</div>
			</div>

			<div className="space-y-2">
				<div className="font-medium text-muted-foreground text-xs">
					Price range (USD)
				</div>
				<div className="flex items-center gap-2">
					<input
						type="number"
						min={0}
						placeholder="Min"
						value={minPrice !== undefined ? minPrice / 100 : ""}
						onChange={(e) =>
							onMinPriceChange(
								e.target.value
									? Math.round(Number(e.target.value) * 100)
									: undefined,
							)
						}
						className="h-8 w-full rounded-none border border-input bg-transparent px-2 text-xs"
					/>
					<span className="text-muted-foreground">–</span>
					<input
						type="number"
						min={0}
						placeholder="Max"
						value={maxPrice !== undefined ? maxPrice / 100 : ""}
						onChange={(e) =>
							onMaxPriceChange(
								e.target.value
									? Math.round(Number(e.target.value) * 100)
									: undefined,
							)
						}
						className="h-8 w-full rounded-none border border-input bg-transparent px-2 text-xs"
					/>
				</div>
			</div>
		</div>
	);
}
