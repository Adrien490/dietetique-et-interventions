import { Skeleton } from "@/shared/components/ui/skeleton";

export function ContactHeaderSkeleton() {
	return (
		<div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
			<div className="space-y-2">
				<div className="flex items-center gap-3">
					<Skeleton className="h-9 w-56" />
					<Skeleton className="h-5 w-20" />
				</div>

				<div className="flex items-center gap-3 text-sm">
					<Skeleton className="h-4 w-48" />
					<span className="text-muted-foreground/20">•</span>
					<Skeleton className="h-4 w-32" />
					<span className="text-muted-foreground/20">•</span>
					<Skeleton className="h-4 w-24" />
				</div>

				<div className="flex items-center gap-3 text-sm">
					<Skeleton className="h-4 w-40" />
				</div>

				<div className="flex items-center gap-3 text-sm">
					<Skeleton className="h-4 w-56" />
				</div>

				<div className="flex flex-wrap gap-3 mt-4">
					<Skeleton className="h-9 w-20" />
					<Skeleton className="h-9 w-32" />
					<Skeleton className="h-9 w-28" />
				</div>
			</div>

			<div className="sticky top-0 z-10 pb-2 flex-shrink-0">
				<Skeleton className="h-9 w-40" />
			</div>
		</div>
	);
}
