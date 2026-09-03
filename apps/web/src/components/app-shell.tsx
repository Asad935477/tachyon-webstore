"use client";

import { useCallback, useEffect, useState } from "react";

import { IntroLoader } from "./intro-loader";

export const INTRO_STORAGE_KEY = "tachyon:intro:seen";

/**
 * Decides whether the first-visit curtain plays.
 *
 * `children` render unconditionally — the server now ships the storefront, not
 * the splash, so the LCP element is real content and crawlers see the page.
 * The gap that used to cause a flash is covered before first paint by the
 * inline script in `layout.tsx`, which sets `data-intro="pending"` on <html>
 * and lets CSS paint a plain void over everything until this mounts.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
	const [showIntro, setShowIntro] = useState(false);

	useEffect(() => {
		// The pre-paint script already applied the localStorage and
		// reduced-motion rules; this only reads its verdict.
		if (document.documentElement.dataset.intro === "pending") {
			setShowIntro(true);
		}
	}, []);

	// Stable identity — an inline arrow here re-ran IntroLoader's effect on
	// every parent render and reset the progress bar to zero.
	const handleDone = useCallback(() => {
		try {
			// localStorage, not sessionStorage: a returning visitor shouldn't
			// sit through the curtain again on their next visit either.
			window.localStorage.setItem(INTRO_STORAGE_KEY, "1");
		} catch {
			// Private mode / storage disabled — the curtain just plays again.
		}
		delete document.documentElement.dataset.intro;
		setShowIntro(false);
	}, []);

	return (
		<>
			{showIntro ? <IntroLoader onDone={handleDone} /> : null}
			{children}
		</>
	);
}
