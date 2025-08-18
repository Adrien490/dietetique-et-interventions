import { cn } from "@/shared/utils";
import React from "react";

export interface ServiceItemProps {
	title: string;
	description: string;
	icon: React.ReactNode;
	index: number;
}

export function ServiceItem({
	title,
	description,
	icon,
	index,
}: ServiceItemProps) {
	return (
		<article
			data-ai-category="healthcare-nutrition"
			style={{
				// Mobile performance (existing)
				touchAction: "manipulation",
				WebkitTapHighlightColor: "transparent",
				// Core Web Vitals optimizations
				containIntrinsicSize: "auto 280px", // CLS prevention
				contentVisibility: index > 3 ? "auto" : "visible", // Lazy render
				willChange: "transform", // GPU layer preparation
			}}
			className={cn(
				"flex flex-col py-10 relative group/prestation border-border/50",
				"focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg",
				"transition-all duration-300 hover:shadow-sm",
				"active:scale-[0.98] md:active:scale-100",
				"touch-manipulation"
			)}
			tabIndex={0}
		>
			{/* Hover effect - gradient from top for first row */}
			{index < 2 && (
				<div
					className="opacity-0 group-hover/prestation:opacity-100 group-focus-within/prestation:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"
					aria-hidden="true"
				/>
			)}

			{/* Hover effect - gradient from bottom for second row */}
			{index >= 2 && (
				<div
					className="opacity-0 group-hover/prestation:opacity-100 group-focus-within/prestation:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"
					aria-hidden="true"
				/>
			)}

			{/* Icon */}
			<div
				className="mb-4 relative z-10 px-10 text-primary group-hover/prestation:scale-110 group-focus-within/prestation:scale-110 transition-transform duration-300"
				aria-hidden="true"
			>
				{icon}
			</div>

			{/* Title */}
			<div className="text-lg font-bold mb-3 relative z-10 px-10">
				<div
					className="absolute left-0 inset-y-0 h-6 group-hover/prestation:h-8 group-focus-within/prestation:h-8 w-1 rounded-tr-full rounded-br-full bg-border group-hover/prestation:bg-primary group-focus-within/prestation:bg-primary transition-all duration-300 origin-center"
					aria-hidden="true"
				/>
				<h3
					id={`prestation-title-${index}`}
					className="group-hover/prestation:translate-x-2 group-focus-within/prestation:translate-x-2 transition duration-300 inline-block text-foreground"
				>
					{title}
				</h3>
			</div>

			{/* Description */}
			<p
				id={`prestation-desc-${index}`}
				className="text-sm text-foreground/80 max-w-xs relative z-10 px-10 leading-relaxed"
			>
				{description}
			</p>
		</article>
	);
}
