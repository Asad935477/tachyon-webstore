"use client";

import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";

import { trpc } from "@/utils/trpc";

import { Reveal } from "./motion/reveal";

export function Testimonials() {
	const testimonials = useQuery(trpc.catalog.getTestimonials.queryOptions());

	if (!testimonials.data?.length) {
		return null;
	}

	return (
		<section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
			<Reveal className="mb-10 text-center">
				<h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
					Loved by the curious.
				</h2>
				<p className="mt-2 text-muted-foreground">
					Real words from people who use Tachyon gear daily.
				</p>
			</Reveal>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{testimonials.data.map((t, index) => (
					<Reveal key={t.id} delay={index * 0.07}>
						<figure className="flex h-full flex-col gap-4 rounded-2xl border bg-card p-6">
							<div className="flex gap-0.5 text-primary">
								{Array.from({ length: 5 }).map((_, i) => (
									<Star
										key={i}
										className={`size-4 ${i < t.rating ? "fill-current" : "opacity-30"}`}
									/>
								))}
							</div>
							<blockquote className="flex-1 text-sm text-foreground/90">
								“{t.quote}”
							</blockquote>
							<figcaption>
								<div className="font-medium">{t.name}</div>
								<div className="text-xs text-muted-foreground">{t.role}</div>
							</figcaption>
						</figure>
					</Reveal>
				))}
			</div>
		</section>
	);
}
