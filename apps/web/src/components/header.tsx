"use client";
import { Badge } from "@tachyon-webstore/ui/components/badge";
import { Button } from "@tachyon-webstore/ui/components/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

import { useCart } from "@/lib/cart-context";

import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

export default function Header() {
	const { count } = useCart();

	return (
		<header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
			<div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4">
				<Link href="/" className="font-semibold text-lg tracking-tight">
					Tachyon
				</Link>

				<nav className="hidden items-center gap-6 text-sm md:flex">
					<Link
						href="/products"
						className="text-muted-foreground hover:text-foreground"
					>
						Shop
					</Link>
					<Link
						href="/categories"
						className="text-muted-foreground hover:text-foreground"
					>
						Categories
					</Link>
				</nav>

				<div className="flex items-center gap-2">
					<Link href="/cart">
						<Button variant="ghost" size="icon" className="relative">
							<ShoppingBag />
							{count > 0 ? (
								<Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px]">
									{count}
								</Badge>
							) : null}
							<span className="sr-only">Cart</span>
						</Button>
					</Link>
					<ModeToggle />
					<UserMenu />
				</div>
			</div>
		</header>
	);
}
