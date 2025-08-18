"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface FadeInProps {
	children: ReactNode;
	delay?: number;
	duration?: number;
	threshold?: number;
	once?: boolean;
	className?: string;
}

export const FadeIn = ({
	children,
	delay = 0,
	duration = 0.6,
	threshold = 0.1,
	once = false, // Permettre la réactivation par défaut
	className = "",
}: FadeInProps) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			exit={{ opacity: 0 }}
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
