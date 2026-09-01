"use client";

import { cn } from "@tachyon-webstore/ui/lib/utils";
import Image from "next/image";
import { useState } from "react";

import type { ProductImageSummary } from "@/lib/catalog";

export function ProductGallery({ images }: { images: ProductImageSummary[] }) {
	const [active, setActive] = useState(0);
	const current = images[active];

	if (!current) {
		return <div className="aspect-square w-full bg-muted" />;
	}

	return (
		<div className="space-y-3">
			<div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted ring-1 ring-foreground/10">
				<Image
					src={current.url}
					alt={current.alt ?? "Product image"}
					fill
					sizes="(max-width: 1024px) 100vw, 50vw"
					className="object-cover"
				/>
			</div>
			{images.length > 1 ? (
				<div className="flex gap-2">
					{images.map((image, index) => (
						<button
							key={image.id}
							type="button"
							onClick={() => setActive(index)}
							className={cn(
								"relative h-16 w-16 overflow-hidden rounded-none bg-muted ring-1 transition-colors",
								index === active ? "ring-foreground/40" : "ring-foreground/10",
							)}
						>
							<Image
								src={image.url}
								alt={image.alt ?? `Image ${index + 1}`}
								fill
								sizes="64px"
								className="object-cover"
							/>
						</button>
					))}
				</div>
			) : null}
		</div>
	);
}
