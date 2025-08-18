"use client";

import { cn } from "@/shared/utils";
import { motion } from "framer-motion";
import { colorClass, loaderAnimations, sizeClasses } from "./constants";
import { ShimmerLoaderProps } from "./types";

export function ShimmerLoader({
	size = "sm",
	color = "primary",
	width = "w-20",
	text,
	className,
}: ShimmerLoaderProps) {
	if (text) {
		return (
			<div className={cn("flex flex-col items-center gap-2", className)}>
				<div
					className={cn(
						"relative overflow-hidden rounded-md",
						sizeClasses.containers[size],
						width
					)}
				>
					<div className={cn("absolute inset-0", colorClass.bg[color])} />
					<motion.div
						className={cn(
							"absolute inset-0 -translate-x-full",
							colorClass.shimmer[color]
						)}
						variants={loaderAnimations.shimmer}
						initial="initial"
						animate="animate"
						transition={{
							duration: 1.8,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>
				</div>
				<span className="text-sm font-medium text-foreground">{text}</span>
			</div>
		);
	}

	return (
		<div
			className={cn(
				"relative overflow-hidden rounded-md",
				sizeClasses.containers[size],
				width,
				className
			)}
		>
			<div className={cn("absolute inset-0", colorClass.bg[color])} />
			<motion.div
				className={cn(
					"absolute inset-0 -translate-x-full",
					colorClass.shimmer[color]
				)}
				variants={loaderAnimations.shimmer}
				initial="initial"
				animate="animate"
				transition={{
					duration: 1.8,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>
		</div>
	);
}
