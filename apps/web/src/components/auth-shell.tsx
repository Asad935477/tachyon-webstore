"use client";

import { motion } from "motion/react";
import { Sparkles, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const perks = [
	{ icon: Truck, label: "Free shipping over $50" },
	{ icon: ShieldCheck, label: "2-year warranty" },
	{ icon: RefreshCw, label: "30-day returns" },
];

export function AuthShell({ children }: { children: React.ReactNode }) {
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<motion.aside
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				className="relative hidden overflow-hidden lg:block"
			>
				<Image
					src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1600&h=2000&q=80"
					alt="Workspace with premium tech"
					fill
					priority
					sizes="50vw"
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />

				<div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
					<Link href="/" className="flex items-center gap-2">
						<Sparkles className="size-5 text-primary" />
						<span className="text-lg font-semibold tracking-tight">Tachyon</span>
					</Link>

					<div className="space-y-6">
						<h2 className="text-3xl font-semibold leading-tight tracking-tight xl:text-4xl">
							Objects for a
							<br />
							<span className="text-muted-foreground">faster life.</span>
						</h2>
						<p className="max-w-sm text-sm text-muted-foreground">
							Join the people who choose considered technology over clutter.
						</p>

						<ul className="space-y-3">
							{perks.map((perk) => (
								<li
									key={perk.label}
									className="flex items-center gap-3 text-sm text-muted-foreground"
								>
									<span className="flex size-8 items-center justify-center rounded-full bg-background/60 backdrop-blur">
										<perk.icon className="size-4 text-primary" />
									</span>
									{perk.label}
								</li>
							))}
						</ul>
					</div>

					<p className="text-xs text-muted-foreground">
						© {new Date().getFullYear()} Tachyon. All rights reserved.
					</p>
				</div>
			</motion.aside>

			<main className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-12">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
					className="w-full max-w-md"
				>
					<div className="mb-8 flex items-center gap-2 lg:hidden">
						<Sparkles className="size-5 text-primary" />
						<span className="text-lg font-semibold tracking-tight">Tachyon</span>
					</div>
					{children}
				</motion.div>
			</main>
		</div>
	);
}
