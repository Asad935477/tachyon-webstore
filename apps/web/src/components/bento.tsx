"use client";

import { buttonVariants } from "@tachyon-webstore/ui/components/button";
import { cn } from "@tachyon-webstore/ui/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Cpu, ShieldCheck, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

import { Reveal } from "./motion/reveal";

const tiles = [
	{
		icon: Cpu,
		title: "Engineered without noise",
		body: "Every material earns its place — nothing extra, nothing missing.",
		span: "lg:col-span-2",
	},
	{
		icon: Zap,
		title: "Fast by default",
		body: "Snappy interactions, instant feedback, zero waiting.",
	},
	{
		icon: ShieldCheck,
		title: "Built to last",
		body: "Two-year warranty on everything we ship.",
	},
];

export function Bento() {
	const reduce = useReducedMotion();

	return (
		<section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
			<Reveal className="mb-10 flex items-end justify-between">
				<div>
					<h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
						Less, but better.
					</h2>
					<p className="mt-2 text-muted-foreground">
						The principles behind every product we carry.
					</p>
				</div>
				<Link href="/about" className="hidden text-sm text-muted-foreground hover:text-foreground sm:block">
					Our philosophy <ArrowUpRight className="inline size-4" />
				</Link>
			</Reveal>

			<div className="grid gap-4 md:grid-cols-3">
				{tiles.map((tile, index) => (
					<Reveal
						key={tile.title}
						delay={index * 0.08}
						className={tile.span ?? ""}
					>
						<motion.div
							whileHover={reduce ? undefined : { y: -4 }}
							className={`group h-full rounded-2xl border bg-card p-6 transition-colors hover:border-primary/40 ${tile.span ?? ""}`}
						>
							<div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-muted text-primary">
								<tile.icon className="size-5" />
							</div>
							<h3 className="font-medium">{tile.title}</h3>
							<p className="mt-1 text-sm text-muted-foreground">{tile.body}</p>
						</motion.div>
					</Reveal>
				))}

				<Reveal delay={0.24} className="md:col-span-3">
					<div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-chart-2/10 p-8 md:p-12">
						<div className="relative z-10 max-w-lg">
							<Sparkles className="mb-4 size-6 text-primary" />
							<h3 className="text-2xl font-semibold tracking-tight">
								Discover the Tachyon difference
							</h3>
							<p className="mt-2 text-muted-foreground">
								A curated catalog, refined over time. No noise, no clutter — just
								the tools that genuinely help you do better work.
							</p>
							<Link
								href="/collections"
								className={cn(buttonVariants(), "group mt-5")}
							>
								Explore collections
								<ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
							</Link>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
