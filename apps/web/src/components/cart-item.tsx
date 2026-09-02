"use client";

import { Button } from "@tachyon-webstore/ui/components/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { type CartItem, itemKey, useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

export function CartItemRow({ item }: { item: CartItem }) {
	const { setQuantity, removeItem } = useCart();
	const key = itemKey(item);

	return (
		<div className="flex gap-4 border-b py-4">
			<Link
				href={`/products/${item.slug}`}
				className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-foreground/10"
			>
				{item.image ? (
					<Image
						src={item.image}
						alt={item.name}
						fill
						sizes="80px"
						className="object-cover"
					/>
				) : null}
			</Link>
			<div className="flex flex-1 flex-col">
				<div className="flex items-start justify-between gap-2">
					<div>
						<Link
							href={`/products/${item.slug}`}
							className="font-medium hover:underline"
						>
							{item.name}
						</Link>
					</div>
					<Button
						variant="ghost"
						size="icon-sm"
						onClick={() => removeItem(key)}
						aria-label="Remove item"
					>
						<Trash2 />
					</Button>
				</div>
				<div className="mt-auto flex items-center justify-between">
					<div className="flex items-center rounded-lg border border-input">
						<button
							type="button"
							className="flex h-8 w-8 items-center justify-center rounded-l-lg hover:bg-muted"
							onClick={() => setQuantity(key, item.quantity - 1)}
						>
							<Minus className="size-3.5" />
						</button>
						<span className="w-8 text-center text-sm">{item.quantity}</span>
						<button
							type="button"
							className="flex h-8 w-8 items-center justify-center rounded-r-lg hover:bg-muted"
							onClick={() => setQuantity(key, item.quantity + 1)}
						>
							<Plus className="size-3.5" />
						</button>
					</div>
					<div className="font-medium">
						{formatPrice(item.price * item.quantity)}
					</div>
				</div>
			</div>
		</div>
	);
}
