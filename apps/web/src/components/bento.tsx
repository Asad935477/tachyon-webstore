"use client";

import { buttonVariants } from "@tachyon-webstore/ui/components/button";
import { cn } from "@tachyon-webstore/ui/lib/utils";
import { ArrowUpRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "./motion/reveal";

const stats = [
	{
		icon: Zap,
		value: "48h",
		label: "Battery life on our top pick",
	},
	{
		icon: ShieldCheck,
		value: "2yr",
		label: "Warranty on everything",
	},
];

export function Bento() {
	const reduce = useReducedMotion();

	return (
		<section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
			<Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
				<div>
					<p className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-widest">
						The Tachyon standard
					</p>
					<h2 className="font-semibold text-4xl tracking-tight sm:text-5xl">
						Less, but better.
					</h2>
				</div>
				<Link
					href="/about"
					className="group inline-flex items-center gap-1 text-muted-foreground text-sm hover:text-foreground"
				>
					Our philosophy
					<ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
				</Link>
			</Reveal>

			<div className="grid gap-4 lg:auto-rows-[220px] lg:grid-cols-4">
				<Reveal className="lg:col-span-2 lg:row-span-2">
					<motion.div
						whileHover={reduce ? undefined : { y: -4 }}
						className="group relative h-full min-h-[280px] overflow-hidden rounded-3xl border"
					>
						<Image
							src="/images/photo-1505740420928-5e560c06d30e.jpg"
							alt="Sonic Drift headphones"
							fill
							sizes="(max-width: 1024px) 100vw, 50vw"
							className="object-cover transition-transform duration-700 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
						<div className="absolute inset-x-0 bottom-0 p-6">
							<div className="font-medium text-white/70 text-xs uppercase tracking-widest">
								Featured
							</div>
							<h3 className="font-semibold text-2xl text-white">Sonic Drift</h3>
							<p className="mt-1 max-w-sm text-sm text-white/80">
								Noise-cancelling headphones engineered to disappear.
							</p>
						</div>
					</motion.div>
				</Reveal>

				<Reveal delay={0.08} className="lg:col-span-1 lg:row-span-2">
					<motion.div
						whileHover={reduce ? undefined : { y: -4 }}
						className="group relative h-full min-h-[280px] overflow-hidden rounded-3xl border"
					>
						<Image
							src="/images/photo-1579586337278-3befd40fd17a.jpg"
							alt="Meridian smartwatch"
							fill
							sizes="(max-width: 1024px) 50vw, 25vw"
							className="object-cover transition-transform duration-700 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
						<div className="absolute inset-x-0 bottom-0 p-5">
							<h3 className="font-semibold text-lg text-white">Meridian</h3>
							<p className="text-white/75 text-xs">Worn lightly.</p>
						</div>
					</motion.div>
				</Reveal>

				{stats.map((stat, index) => (
					<Reveal key={stat.label} delay={0.12 + index * 0.06}>
						<motion.div
							whileHover={reduce ? undefined : { y: -4 }}
							className="flex h-full min-h-[140px] flex-col justify-between rounded-3xl border bg-card p-6 transition-colors hover:border-primary/40"
						>
							<div className="flex size-11 items-center justify-center rounded-2xl bg-muted text-primary">
								<stat.icon className="size-5" />
							</div>
							<div>
								<div className="font-semibold text-3xl tracking-tight">
									{stat.value}
								</div>
								<div className="mt-1 text-muted-foreground text-sm">
									{stat.label}
								</div>
							</div>
						</motion.div>
					</Reveal>
				))}

				<Reveal delay={0.16} className="lg:col-span-2">
					<motion.div
						whileHover={reduce ? undefined : { y: -4 }}
						className="group relative h-full min-h-[220px] overflow-hidden rounded-3xl border"
					>
						<Image
							src="/images/photo-1496181133206-80ce9b88a853.jpg"
							alt="Aeron 14 laptop"
							fill
							sizes="(max-width: 1024px) 100vw, 50vw"
							className="object-cover transition-transform duration-700 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
						<div className="absolute inset-y-0 left-0 flex max-w-xs flex-col justify-center p-6">
							<h3 className="font-semibold text-white text-xl">
								Think at the speed of light.
							</h3>
							<p className="mt-2 text-sm text-white/75">
								The Aeron 14 is a featherweight ultrabook for focused work.
							</p>
						</div>
					</motion.div>
				</Reveal>

				<Reveal delay={0.2} className="lg:col-span-2">
					<div className="relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/15 via-background to-chart-2/15 p-6 sm:p-8">
						<Sparkles className="size-6 text-primary" />
						<div>
							<h3 className="font-semibold text-xl tracking-tight">
								Discover the difference
							</h3>
							<p className="mt-2 max-w-md text-muted-foreground text-sm">
								A curated catalog, refined over time. No noise, no clutter —
								just the tools that genuinely help you do better work.
							</p>
						</div>
						<Link
							href="/collections"
							className={cn(buttonVariants(), "group mt-6 w-fit")}
						>
							Explore collections
							<ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</Link>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
