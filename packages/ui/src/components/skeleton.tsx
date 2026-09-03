import { cn } from "@tachyon-webstore/ui/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			className={cn(
				"relative isolate overflow-hidden rounded-md bg-muted",
				"after:absolute after:inset-0 after:animate-[skeleton-sheen_1.4s_ease-in-out_infinite]",
				"after:bg-gradient-to-r after:from-transparent after:via-foreground/[0.06] after:to-transparent",
				"motion-reduce:after:animate-none",
				className,
			)}
			{...props}
		/>
	);
}

export { Skeleton };
