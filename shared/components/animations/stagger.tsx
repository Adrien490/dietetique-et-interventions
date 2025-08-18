"use client";

import { motion } from "motion/react";
import { Children, ReactNode } from "react";

interface StaggerProps {
	children: ReactNode;
	delay?: number;
	staggerDelay?: number;
	duration?: number;
	threshold?: number;
	once?: boolean;
	className?: string;
}

export const Stagger = ({
	children,
	delay = 0,
	staggerDelay = 0.1,
	duration = 0.6,
	threshold = 0.1,
	once = false, // Permettre la réactivation par défaut
	className = "",
}: StaggerProps) => {
	const childrenArray = Children.toArray(children);

	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{
				once,
				amount: threshold,
			}}
			variants={{
				hidden: {},
				visible: {
					transition: {
						delayChildren: delay,
						staggerChildren: staggerDelay,
					},
				},
			}}
			className={className}
		>
			{childrenArray.map((child, index) => (
				<motion.div
					key={index}
					variants={{
						hidden: {
							opacity: 0,
							y: 20,
						},
						visible: {
							opacity: 1,
							y: 0,
							transition: {
								duration,
								ease: "easeOut",
							},
						},
					}}
				>
					{child}
				</motion.div>
			))}
		</motion.div>
	);
};
