"use client";

import { cn } from "@/shared/utils";
import { motion } from "framer-motion";
import { colorClass, loaderAnimations, sizeClasses } from "./constants";
import { DotRingLoaderProps } from "./types";

export function DotRingLoader({
	size = "sm",
	color = "primary",
	className,
}: DotRingLoaderProps) {
	return (
		<div className={cn("relative flex items-center justify-center", className)}>
			<motion.div
				className={cn(
					"absolute rounded-full border-2 border-transparent",
					sizeClasses.rings[size],
					"border-t-current border-r-current",
					colorClass[color]
				)}
				variants={loaderAnimations.ring}
				initial="initial"
				animate="animate"
				transition={{
					rotate: {
						duration: 1.2,
						repeat: Infinity,
						ease: "linear",
					},
					scale: {
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut",
					},
					opacity: {
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut",
					},
				}}
			/>
			<motion.div
				className={cn(
					"rounded-full",
					sizeClasses.dots[size],
					"bg-current",
					colorClass[color]
				)}
				variants={loaderAnimations.dot}
				initial="initial"
				animate="animate"
				transition={{
					duration: 2,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>
		</div>
	);
}
