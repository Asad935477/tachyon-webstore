"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

const stats = [
	{ value: 48, suffix: "h", label: "Battery life, top pick" },
	{ value: 120, suffix: "+", label: "Products curated" },
	{ value: 30, suffix: "d", label: "Hassle-free returns" },
	{ value: 4.9, suffix: "", label: "Average rating", decimals: 1 },
];

function Counter({
	value,
	suffix,
	decimals = 0,
}: {
	value: number;
	suffix: string;
	decimals?: number;
}) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, margin: "-40px" });
	const reduce = useReducedMotion();

	return (
		<span ref={ref}>
			{reduce || !inView
				? value.toFixed(decimals)
				: (
						<motion.span
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3 }}
						>
							{value.toFixed(decimals)}
						</motion.span>
					)}
			{suffix}
		</span>
	);
}

export function Stats() {
	return (
		<section className="border-y bg-muted/30">
			<div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
				{stats.map((stat) => (
					<div key={stat.label} className="text-center sm:text-left">
						<div className="text-4xl font-semibold tracking-tight">
							<Counter
								value={stat.value}
								suffix={stat.suffix}
								decimals={stat.decimals ?? 0}
							/>
						</div>
						<div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
					</div>
				))}
			</div>
		</section>
	);
}
