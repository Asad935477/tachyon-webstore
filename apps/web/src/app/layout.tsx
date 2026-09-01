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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
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
