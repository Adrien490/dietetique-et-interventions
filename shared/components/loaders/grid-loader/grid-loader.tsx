"use client";

import { cn } from "@/shared/utils";
import { motion } from "framer-motion";
import { bgColorClass, loaderAnimations, sizeClasses } from "./constants";
import { GridLoaderProps } from "./types";

export function GridLoader({
	size = "sm",
	color = "primary",
	className,
}: GridLoaderProps) {
	return (
		<motion.div
			className={cn(
				"grid grid-cols-3 gap-1",
				sizeClasses.container[size],
				className
			)}
			variants={loaderAnimations.container}
			initial="initial"
			animate="animate"
		>
			{[...Array(9)].map((_, i) => {
				const row = Math.floor(i / 3);
				const col = i % 3;
				const isCenter = row === 1 && col === 1;
				const isCorner = (row === 0 || row === 2) && (col === 0 || col === 2);

				return (
					<motion.div
						key={i}
						variants={loaderAnimations.item}
						className={cn("rounded-sm", bgColorClass[color])}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							delay: isCenter ? 0.1 : isCorner ? 0.2 : 0,
							ease: "easeInOut",
						}}
						animate={{
							opacity: [0, 1, 0],
							scale: isCenter
								? [0.3, 1, 0.3]
								: isCorner
									? [0.5, 0.8, 0.5]
									: [0.4, 0.9, 0.4],
						}}
					/>
				);
			})}
		</motion.div>
	);
}
