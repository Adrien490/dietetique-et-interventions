"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface SlideInProps {
	children: ReactNode;
	direction?: "up" | "down" | "left" | "right";
	delay?: number;
	duration?: number;
	distance?: number;
	threshold?: number;
	once?: boolean;
	className?: string;
}

export const SlideIn = ({
	children,
	direction = "up",
	delay = 0,
	duration = 0.6,
	distance = 50,
	threshold = 0.1,
	once = false, // Permettre la réactivation par défaut
	className = "",
}: SlideInProps) => {
	const getInitialPosition = () => {
		switch (direction) {
			case "up":
				return { y: distance, opacity: 0 };
			case "down":
				return { y: -distance, opacity: 0 };
			case "left":
				return { x: distance, opacity: 0 };
			case "right":
				return { x: -distance, opacity: 0 };
		}
	};

	return (
		<motion.div
			initial={getInitialPosition()}
			whileInView={{
				x: 0,
				y: 0,
				opacity: 1,
			}}
			exit={getInitialPosition()}
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
