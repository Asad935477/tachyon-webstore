import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "../index.css";
import { AppShell } from "@/components/app-shell";
import { Footer } from "@/components/footer";
import Header from "@/components/header";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import Providers from "@/components/providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Tachyon — Premium Tech & Gadgets",
	description:
		"Curated headphones, wearables, computing, and smart-home essentials.",
};

/**
 * Runs before first paint, so the curtain decision is made without a flash in
 * either direction: returning visitors never glimpse the splash, and first-time
 * visitors never glimpse the storefront underneath it.
 *
 * Sets `data-intro="pending"` on <html>; `index.css` paints a plain void cover
 * off that attribute until <AppShell> mounts the animated loader over it.
 * Reduced-motion skips the curtain entirely — the CSS used to freeze the
 * animation but leave the full duration running, which was the worse outcome.
 */
const introGate = `(function(){try{
  var seen = localStorage.getItem("tachyon:intro:seen");
  var still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!seen && !still) document.documentElement.dataset.intro = "pending";
}catch(e){}})();`;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: introGate }} />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden antialiased`}
			>
				<Providers>
					<AppShell>
						<ScrollProgress />
						<div className="grid min-h-svh grid-rows-[auto_1fr_auto]">
							<Header />
							<main className="min-w-0 overflow-x-clip">{children}</main>
							<Footer />
						</div>
					</AppShell>
				</Providers>
			</body>
		</html>
	);
}
