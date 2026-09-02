export function Marquee({ items }: { items: string[] }) {
	// Repeat enough times so each half is wider than the viewport.
	const repeated = [...items, ...items, ...items, ...items];

	const group = (keyPrefix: string) => (
		<div className="flex shrink-0 items-center gap-14 pr-14">
			{repeated.map((item, index) => (
				<span
					key={`${keyPrefix}-${item}-${index}`}
					className="flex shrink-0 items-center gap-3 font-medium text-muted-foreground text-sm"
				>
					<span className="size-1.5 rounded-full bg-primary" />
					{item}
				</span>
			))}
		</div>
	);

	return (
		<div className="relative flex overflow-hidden py-6">
			<div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
			<div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

			<div className="marquee-track flex w-max">
				{group("a")}
				<div
					className="flex shrink-0 items-center gap-14 pr-14"
					aria-hidden="true"
				>
					{repeated.map((item, index) => (
						<span
							key={`b-${item}-${index}`}
							className="flex shrink-0 items-center gap-3 font-medium text-muted-foreground text-sm"
						>
							<span className="size-1.5 rounded-full bg-primary" />
							{item}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
