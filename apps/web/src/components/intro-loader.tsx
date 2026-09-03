"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The first-visit curtain.
 *
 * Appearance is deliberately unchanged — the composition (Geist 500 at -0.04em
 * against 0.45em micro-caps) was already right. Everything here is behaviour:
 *
 *  - Total runtime 2.6s, down from 5.1s.
 *  - Progress tracks `document.fonts.ready` rather than a bare timer, so the
 *    number means something. It holds at 92% until the wordmark's face is
 *    actually available, then completes.
 *  - Click or Escape dismisses it. Nothing should trap a visitor.
 *  - `aria-hidden` throughout: the storefront is already mounted behind this,
 *    so assistive tech reads the real page instead of the curtain.
 */

/** Progress runs for this long, then waits on fonts if they're still loading. */
const PROGRESS_MS = 2100;
/** Hard stop — never hold the visitor if fonts hang or fail. */
const CEILING_MS = 3600;
/** Matches the `.intro--leaving` opacity transition in index.css. */
const FADE_MS = 500;
/** Progress parks here until fonts resolve, so 100 always means "ready". */
const HOLD_AT = 92;

export function IntroLoader({ onDone }: { onDone: () => void }) {
	const [progress, setProgress] = useState(0);
	const [leaving, setLeaving] = useState(false);
	const dismissed = useRef(false);

	const dismiss = useCallback(() => {
		if (dismissed.current) {
			return;
		}
		dismissed.current = true;
		setProgress(100);
		setLeaving(true);
		window.setTimeout(onDone, FADE_MS);
	}, [onDone]);

	useEffect(() => {
		const started = performance.now();
		let raf = 0;
		let ready = false;

		// Resolve as soon as the fonts are usable, but never hang on them.
		const fontsReady =
			typeof document !== "undefined" && "fonts" in document
				? document.fonts.ready
				: Promise.resolve();

		Promise.race([
			fontsReady,
			new Promise((resolve) => window.setTimeout(resolve, CEILING_MS)),
		]).then(() => {
			ready = true;
		});

		function tick(now: number) {
			const elapsed = now - started;
			const eased = 1 - (1 - Math.min(elapsed / PROGRESS_MS, 1)) ** 3;
			const value = Math.round(eased * 100);

			// Park just short of 100 until there's something real to report.
			setProgress(ready ? value : Math.min(value, HOLD_AT));

			if (elapsed >= PROGRESS_MS && ready) {
				dismiss();
				return;
			}
			if (elapsed >= CEILING_MS) {
				dismiss();
				return;
			}
			raf = requestAnimationFrame(tick);
		}

		raf = requestAnimationFrame(tick);

		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") {
				dismiss();
			}
		}
		window.addEventListener("keydown", onKey);

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("keydown", onKey);
		};
	}, [dismiss]);

	return (
		<div
			className={`intro ${leaving ? "intro--leaving" : ""}`}
			// The storefront is mounted behind this; let AT read that instead.
			aria-hidden="true"
			onClick={dismiss}
		>
			<div className="intro-bg">
				<div className="intro-blob intro-blob--a" />
				<div className="intro-blob intro-blob--b" />
				<div className="intro-blob intro-blob--c" />
			</div>

			<div className="intro-content">
				<p className="intro-eyebrow">Premium technology</p>

				{/* Was an <h1>, which put a second level-1 heading on every page. */}
				<p className="intro-title">Tachyon</p>

				<div className="intro-rule" />

				<p className="intro-sub">Webstore</p>

				<div className="intro-progress">
					<div className="intro-progress-track">
						<div
							className="intro-progress-fill"
							style={{ width: `${progress}%` }}
						/>
					</div>
					<span className="intro-progress-value">{progress}</span>
				</div>
			</div>
		</div>
	);
}
