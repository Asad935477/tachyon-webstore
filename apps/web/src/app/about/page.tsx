import { Reveal } from "@/components/motion/reveal";
import { Stats } from "@/components/stats";
import { ValueProps } from "@/components/value-props";

export default function AboutPage() {
	return (
		<>
			<section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
				<Reveal>
					<h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
						Less, but better.
					</h1>
					<p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
						Tachyon exists for people who would rather own a few excellent
						things than many average ones. We curate technology with a bias
						toward restraint — products that are quiet, durable, and genuinely
						useful.
					</p>
				</Reveal>
			</section>

			<Stats />
			<ValueProps />

			<section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
				<Reveal>
					<h2 className="text-2xl font-semibold tracking-tight">Our promise</h2>
					<div className="mt-8 grid gap-4 sm:grid-cols-2">
						<div className="rounded-2xl border bg-card p-6">
							<h3 className="font-medium">Considered curation</h3>
							<p className="mt-2 text-sm text-muted-foreground">
								We don&apos;t chase trends. Every product earns a place through
								real, repeated use.
							</p>
						</div>
						<div className="rounded-2xl border bg-card p-6">
							<h3 className="font-medium">Honest support</h3>
							<p className="mt-2 text-sm text-muted-foreground">
								Real humans, clear answers, and a two-year warranty on
								everything we ship.
							</p>
						</div>
					</div>
				</Reveal>
			</section>
		</>
	);
}
