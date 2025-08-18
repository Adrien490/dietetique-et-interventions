import { cn } from "@/shared/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ContentCardProps {
	title: string;
	children: React.ReactNode;
	className?: string;
}

export function ContentCard({ title, children, className }: ContentCardProps) {
	return (
		<Card className={cn("", className)}>
			<CardHeader>
				<CardTitle className="text-lg font-semibold">{title}</CardTitle>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
}
