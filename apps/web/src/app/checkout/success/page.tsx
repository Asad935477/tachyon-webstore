"use client";

import { buttonVariants } from "@tachyon-webstore/ui/components/button";
import { Skeleton } from "@tachyon-webstore/ui/components/skeleton";
import { cn } from "@tachyon-webstore/ui/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { formatPrice } from "@/lib/format";
import { trpc } from "@/utils/trpc";

function SuccessContent() {
	const searchParams = useSearchParams();
	const sessionId = searchParams.get("session_id");

	const order = useQuery(
		trpc.checkout.getSessionStatus.queryOptions(
			{ sessionId: sessionId ?? "" },
			{ enabled: !!sessionId },
		),
	);

	return (
		<div className="mx-auto max-w-xl px-4 py-16 text-center">
			<CheckCircle2 className="mx-auto mb-4 size-12 text-green-500" />
			<h1 className="font-semibold text-3xl tracking-tight">Order confirmed</h1>
			<p className="mt-2 text-muted-foreground text-sm">
				Thanks for your order. A confirmation email is on its way.
			</p>

			{order.isLoading ? (
				<Skeleton className="mx-auto mt-6 h-20 max-w-sm" />
			) : order.data ? (
				<div className="mt-6 space-y-2 rounded-lg border bg-muted/20 p-4 text-sm">
					<div className="flex justify-between">
						<span className="text-muted-foreground">Order</span>
						<span className="font-mono">{order.data.id.slice(0, 12)}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">Total</span>
						<span>{formatPrice(order.data.total, order.data.currency)}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">Status</span>
						<span className="capitalize">{order.data.status}</span>
					</div>
				</div>
			) : null}

			<Link
				href="/products"
				className={cn(buttonVariants(), "mt-8 inline-flex")}
			>
				Continue shopping
			</Link>
		</div>
	);
}

export default function SuccessPage() {
	return (
		<Suspense>
			<SuccessContent />
		</Suspense>
	);
}
