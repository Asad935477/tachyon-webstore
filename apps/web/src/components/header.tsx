"use client";

import { Badge } from "@tachyon-webstore/ui/components/badge";
import { Button, buttonVariants } from "@tachyon-webstore/ui/components/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@tachyon-webstore/ui/components/sheet";
import { cn } from "@tachyon-webstore/ui/lib/utils";
import { Menu, ShoppingBag, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useCart } from "@/lib/cart-context";
import { ModeToggle } from "./mode-toggle";
import { Magnetic } from "./motion/magnetic";
import UserMenu from "./user-menu";

const nav = [
	{ href: "/products", label: "Shop" },
	{ href: "/categories", label: "Categories" },
	{ href: "/collections", label: "Collections" },
	{ href: "/deals", label: "Deals" },
	{ href: "/about", label: "About" },
] as const;

export default function Header() {
	const { count } = useCart();
	const pathname = usePathname();

	return (
		<header className="sticky top-0 z-50 border-border/60 border-b bg-background/75 backdrop-blur-xl">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
				<Magnetic strength={12}>
					<Link href="/" className="group flex items-center gap-2">
						<Sparkles className="size-4 text-primary transition-transform duration-500 group-hover:rotate-12" />
						<span className="font-semibold text-lg tracking-tight">
							Tachyon
						</span>
					</Link>
				</Magnetic>

				<nav className="hidden items-center gap-1 md:flex">
					{nav.map((item) => {
						const active = pathname === item.href;
						return (
							<Link
								key={item.href}
								href={item.href}
								className={`relative px-3 py-2 text-sm transition-colors ${
									active
										? "text-foreground"
										: "text-muted-foreground hover:text-foreground"
								}`}
							>
								{item.label}
								{active ? (
									<span className="absolute inset-x-3 -bottom-px h-px bg-primary" />
								) : null}
							</Link>
						);
					})}
				</nav>

				<div className="flex items-center gap-1.5">
					<Link
						href="/cart"
						className={cn(
							buttonVariants({ variant: "ghost", size: "icon" }),
							"relative",
						)}
					>
						<ShoppingBag className="size-[18px]" />
						{count > 0 ? (
							<Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 text-[10px]">
								{count}
							</Badge>
						) : null}
						<span className="sr-only">Cart</span>
					</Link>
					<ModeToggle />
					<div className="hidden md:block">
						<UserMenu />
					</div>

					<Sheet>
						<SheetTrigger
							render={
								<Button variant="ghost" size="icon" className="md:hidden" />
							}
						>
							<Menu className="size-[18px]" />
							<span className="sr-only">Menu</span>
						</SheetTrigger>
						<SheetContent side="right" className="w-72">
							<SheetHeader>
								<SheetTitle>Menu</SheetTitle>
							</SheetHeader>
							<nav className="flex flex-col gap-1 p-4">
								{nav.map((item) => (
									<Link
										key={item.href}
										href={item.href}
										className="rounded-lg px-3 py-3 text-base hover:bg-muted"
									>
										{item.label}
									</Link>
								))}
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
