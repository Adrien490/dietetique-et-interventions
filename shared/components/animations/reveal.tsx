"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface RevealProps {
	children: ReactNode;
	delay?: number;
	duration?: number;
	threshold?: number;
	once?: boolean;
	className?: string;
}

export const Reveal = ({
	children,
	delay = 0,
	duration = 0.6,
	threshold = 0.1,
	once = false, // Changé pour permettre la réactivation par défaut
	className = "",
}: RevealProps) => {
	return (
		<motion.div
			initial={{
				opacity: 0,
				y: 50,
			}}
			whileInView={{
				opacity: 1,
				y: 0,
			}}
			exit={{
				opacity: 0,
				y: 50,
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
