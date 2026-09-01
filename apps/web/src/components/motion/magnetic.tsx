"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";

export function Magnetic({
	children,
	strength = 24,
	className,
}: {
	children: React.ReactNode;
	strength?: number;
	className?: string;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const sx = useSpring(x, { stiffness: 200, damping: 18 });
	const sy = useSpring(y, { stiffness: 200, damping: 18 });

	function onPointerMove(e: React.PointerEvent) {
		const el = ref.current;
		if (!el) {
			return;
		}
		const rect = el.getBoundingClientRect();
		x.set(((e.clientX - rect.left) / rect.width - 0.5) * strength);
		y.set(((e.clientY - rect.top) / rect.height - 0.5) * strength);
	}

	function onPointerLeave() {
		x.set(0);
		y.set(0);
	}

	return (
		<motion.div
			ref={ref}
			className={className}
			style={{ x: sx, y: sy }}
			onPointerMove={onPointerMove}
			onPointerLeave={onPointerLeave}
		>
			{children}
		</motion.div>
	);
}
