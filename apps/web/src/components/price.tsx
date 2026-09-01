import { cn } from "@tachyon-webstore/ui/lib/utils";

import { formatPrice } from "@/lib/format";

export function Price({
	cents,
	compareAtCents,
	currency = "usd",
	className,
}: {
	cents: number;
	compareAtCents?: number | null;
	currency?: string;
	className?: string;
}) {
	return (
		<span className={cn("inline-flex items-baseline gap-2", className)}>
			<span className="font-medium">{formatPrice(cents, currency)}</span>
			{compareAtCents && compareAtCents > cents ? (
				<span className="text-muted-foreground text-xs line-through">
					{formatPrice(compareAtCents, currency)}
				</span>
			) : null}
		</span>
	);
}
