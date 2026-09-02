"use client";

import { Compass, Heart, Leaf, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { Stats } from "@/components/stats";

const values = [
	{
		icon: Compass,
		title: "Considered curation",
		body: "We don't chase trends. Every product earns a place through real, repeated use.",
	},
	{
		icon: Heart,
		title: "Honest support",
		body: "Real humans, clear answers, and a two-year warranty on everything.",
	},
	{
		icon: Leaf,
		title: "Built to last",
		body: "Materials and design chosen for longevity, not planned obsolescence.",
	},
];

export default function AboutPage() {
	const reduce = useReducedMotion();

	return (
		<div className="overflow-x-hidden">
			<section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
				<div className="grid items-center gap-12 lg:grid-cols-2">
					<div className="space-y-6">
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
							className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-muted-foreground text-xs"
						>
							<span className="size-1.5 rounded-full bg-primary" />
							Our philosophy
						</motion.div>

						<motion.h1
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.7,
								delay: 0.1,
								ease: [0.22, 1, 0.36, 1],
							}}
							className="font-semibold text-5xl leading-[1.05] tracking-tight sm:text-6xl"
						>
							Less, but
							<br />
							<span className="text-muted-foreground">better.</span>
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.7,
								delay: 0.2,
								ease: [0.22, 1, 0.36, 1],
							}}
							className="max-w-xl text-lg text-muted-foreground"
						>
							Tachyon exists for people who would rather own a few excellent
							things than many average ones. We curate technology with a bias
							toward restraint — products that are quiet, durable, and genuinely
							useful.
						</motion.p>
					</div>

					<motion.div
						initial={{ opacity: 0, scale: 0.96 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
						className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-foreground/10"
					>
						<Image
							src="/images/photo-1498049794561-7780e7231661.jpg"
							alt="Considered workspace"
							fill
							priority
							sizes="(max-width: 1024px) 100vw, 50vw"
							className="object-cover"
						/>
					</motion.div>
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
				<Reveal className="mb-12 text-center">
					<p className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-widest">
						What we stand for
					</p>
					<h2 className="font-semibold text-4xl tracking-tight">
						Three principles, one standard.
					</h2>
				</Reveal>

				<div className="grid gap-6 md:grid-cols-3">
					{values.map((value, index) => (
						<Reveal key={value.title} delay={index * 0.08}>
							<motion.div
								whileHover={reduce ? undefined : { y: -6 }}
								className="group h-full rounded-3xl border bg-card p-8 transition-colors hover:border-primary/40"
							>
								<div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-muted text-primary transition-transform duration-300 group-hover:scale-110">
									<value.icon className="size-6" />
								</div>
								<h3 className="font-semibold text-xl">{value.title}</h3>
								<p className="mt-3 text-muted-foreground text-sm leading-relaxed">
									{value.body}
								</p>
							</motion.div>
						</Reveal>
					))}
				</div>
			</section>

			<Stats />

			<section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
				<div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/15 via-background to-chart-2/15 p-10 text-center sm:p-16">
					<Sparkles className="mx-auto mb-6 size-8 text-primary" />
					<h2 className="font-semibold text-4xl tracking-tight">
						Objects for a faster life.
					</h2>
					<p className="mx-auto mt-4 max-w-xl text-muted-foreground">
						Start with the pieces that matter most — and discover the difference
						considered design makes.
					</p>
					<Reveal className="mt-8" delay={0.1}>
						<motion.div
							whileHover={reduce ? undefined : { scale: 1.03 }}
							className="inline-block"
						>
							<a
								href="/products"
								className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 font-medium text-primary-foreground text-sm hover:bg-primary/80"
							>
								Browse the catalog
							</a>
						</motion.div>
					</Reveal>
				</div>
			</section>
		</div>
	);
}
