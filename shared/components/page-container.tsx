import { cn } from "@/shared/utils";

interface PageContainerProps {
	children: React.ReactNode;
	className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
	return (
		<div
			className={cn(
				"px-4 sm:px-6 lg:px-8",

				className
			)}
		>
			{children}
		</div>
	);
}
