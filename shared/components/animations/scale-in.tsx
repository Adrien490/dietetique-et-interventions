"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface ScaleInProps {
	children: ReactNode;
	delay?: number;
	duration?: number;
	initialScale?: number;
	threshold?: number;
	once?: boolean;
	className?: string;
}

export const ScaleIn = ({
	children,
	delay = 0,
	duration = 0.6,
	initialScale = 0.8,
	threshold = 0.1,
	once = false, // Permettre la réactivation par défaut
	className = "",
}: ScaleInProps) => {
	return (
		<motion.div
			initial={{
				scale: initialScale,
				opacity: 0,
			}}
			whileInView={{
				scale: 1,
				opacity: 1,
			}}
			exit={{
				scale: initialScale,
				opacity: 0,
			}}
			transition={{
				duration,
				delay,
				ease: "easeOut",
			}}
			viewport={{
				once,
				amount: threshold,
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
};
