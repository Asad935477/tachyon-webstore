"use client";

import { Badge } from "@tachyon-webstore/ui/components/badge";
import { cn } from "@tachyon-webstore/ui/lib/utils";

import type { ProductVariantSummary } from "@/lib/catalog";

export function VariantSelector({
	variants,
	selected,
	onSelect,
}: {
	variants: ProductVariantSummary[];
	selected?: string;
	onSelect: (id: string) => void;
}) {
	return (
		<div className="flex flex-wrap gap-2">
			{variants.map((variant) => {
				const active = selected === variant.id;
				return (
					<button
						key={variant.id}
						type="button"
						onClick={() => onSelect(variant.id)}
						disabled={variant.stock <= 0}
					>
						<Badge
							variant={active ? "default" : "outline"}
							className={cn(
								"cursor-pointer py-1",
								variant.stock <= 0 && "cursor-not-allowed opacity-40",
							)}
						>
							{variant.name}
						</Badge>
					</button>
				);
			})}
		</div>
	);
}
