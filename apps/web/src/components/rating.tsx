import { Star } from "lucide-react";

export function Rating({ value, count }: { value: number; count?: number }) {
	return (
		<div className="flex items-center gap-1.5">
			<div className="flex items-center gap-0.5">
				{Array.from({ length: 5 }).map((_, i) => (
					<Star
						key={i}
						className={`size-3.5 ${
							i < Math.round(value) ? "fill-primary text-primary" : "text-muted"
						}`}
					/>
				))}
			</div>
			<span className="text-xs text-muted-foreground">{value.toFixed(1)}</span>
			{count !== undefined ? (
				<span className="text-xs text-muted-foreground/70">({count})</span>
			) : null}
		</div>
	);
}
