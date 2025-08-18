"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface SlideProps {
	children: ReactNode;
	direction?: "horizontal" | "vertical";
	speed?: number;
	reverse?: boolean;
	className?: string;
}

export const Slide = ({
	children,
	direction = "horizontal",
	speed = 20,
	reverse = false,
	className = "",
}: SlideProps) => {
	const getAnimation = () => {
		if (direction === "horizontal") {
			return {
				x: reverse ? ["0%", "-100%"] : ["0%", "100%"],
			};
		} else {
			return {
				y: reverse ? ["0%", "-100%"] : ["0%", "100%"],
			};
		}
	};

	return (
		<motion.div
			animate={getAnimation()}
			transition={{
				duration: speed,
				repeat: Infinity,
				repeatType: "loop" as const,
				ease: "linear",
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
};
