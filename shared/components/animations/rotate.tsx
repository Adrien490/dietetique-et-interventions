"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface RotateProps {
	children: ReactNode;
	delay?: number;
	duration?: number;
	initialRotation?: number;
	threshold?: number;
	once?: boolean;
	className?: string;
}

export const Rotate = ({
	children,
	delay = 0,
	duration = 0.6,
	initialRotation = -180,
	threshold = 0.1,
	once = false, // Permettre la réactivation par défaut
	className = "",
}: RotateProps) => {
	return (
		<motion.div
			initial={{
				rotate: initialRotation,
				opacity: 0,
			}}
			whileInView={{
				rotate: 0,
				opacity: 1,
			}}
			exit={{
				rotate: initialRotation,
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
