export const sizeClasses = {
	container: {
		xs: "h-9 w-9",
		sm: "h-12 w-12",
		md: "h-16 w-16",
		lg: "h-20 w-20",
		xl: "h-24 w-24",
	},
};

export const bgColorClass = {
	default: "bg-muted-foreground",
	primary: "bg-primary",
	secondary: "bg-secondary",
	foreground: "bg-foreground",
	muted: "bg-muted",
	accent: "bg-accent",
	success: "bg-emerald-600 dark:bg-emerald-500",
	warning: "bg-amber-600 dark:bg-amber-500",
	destructive: "bg-destructive",
	white: "bg-white",
};

// Animation presets pour framer-motion
export const loaderAnimations = {
	container: {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
				delayChildren: 0.1,
			},
		},
	},
	item: {
		initial: {
			opacity: 0,
			scale: 0.5,
		},
		animate: {
			opacity: [0, 1, 0],
			scale: [0.4, 0.9, 0.4],
		},
	},
};
