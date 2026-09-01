"use client";

import { Rocket, RefreshCw, ShieldCheck, Truck } from "lucide-react";

import { Reveal } from "./motion/reveal";

const props = [
	{ icon: Truck, title: "Free shipping", description: "On orders over $50, delivered fast." },
	{ icon: ShieldCheck, title: "2-year warranty", description: "Every product covered end to end." },
	{ icon: RefreshCw, title: "30-day returns", description: "Changed your mind? No problem." },
	{ icon: Rocket, title: "Launch-day service", description: "Priority support when it matters." },
];

export function ValueProps() {
	return (
		<section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{props.map((prop, index) => (
					<Reveal key={prop.title} delay={index * 0.07}>
						<div className="group flex gap-4 rounded-2xl border bg-card p-5 transition-colors hover:border-primary/30">
							<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-primary transition-transform duration-300 group-hover:scale-110">
								<prop.icon className="size-5" />
							</div>
							<div>
								<div className="font-medium">{prop.title}</div>
								<p className="mt-1 text-sm text-muted-foreground">
									{prop.description}
								</p>
							</div>
						</div>
					</Reveal>
				))}
			</div>
		</section>
	);
}
