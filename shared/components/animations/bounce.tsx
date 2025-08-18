"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface BounceProps {
	children: ReactNode;
	delay?: number;
	duration?: number;
	bounce?: number;
	threshold?: number;
	once?: boolean;
	className?: string;
}

export const Bounce = ({
	children,
	delay = 0,
	duration = 0.8,
	bounce = 0.6,
	threshold = 0.1,
	once = false, // Permettre la réactivation par défaut
	className = "",
}: BounceProps) => {
	return (
		<motion.div
			initial={{
				scale: 0,
				opacity: 0,
			}}
			whileInView={{
				scale: 1,
				opacity: 1,
			}}
			exit={{
				scale: 0,
				opacity: 0,
			}}
			transition={{
				duration,
				delay,
				ease: "easeOut",
				type: "spring",
				bounce,
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
