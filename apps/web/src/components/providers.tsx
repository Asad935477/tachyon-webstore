"use client";

import { Toaster } from "@tachyon-webstore/ui/components/sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { CartProvider } from "@/lib/cart-context";
import { queryClient } from "@/utils/trpc";

import { ThemeProvider } from "./theme-provider";

/**
 * Void & Light is dark-committed — see CLAUDE.md. ThemeProvider stays so the
 * `dark:` variants baked into the primitives keep resolving, but the theme is
 * forced; there is no light palette to switch to.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			forcedTheme="dark"
			disableTransitionOnChange
		>
			<QueryClientProvider client={queryClient}>
				<CartProvider>{children}</CartProvider>
				<ReactQueryDevtools />
			</QueryClientProvider>
			<Toaster richColors />
		</ThemeProvider>
	);
}
