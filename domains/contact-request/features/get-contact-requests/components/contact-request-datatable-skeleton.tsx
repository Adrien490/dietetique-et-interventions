import { Skeleton } from "@/shared/components/ui/skeleton";

export function ContactRequestDataTableSkeleton() {
	return (
		<div className="space-y-4">
			{/* Table container */}
			<div className="rounded-md border">
				{/* Table header */}
				<div className="flex items-center space-x-4 p-4 border-b bg-muted/50">
					<Skeleton className="h-4 w-4" /> {/* Checkbox */}
					<Skeleton className="h-4 w-32" /> {/* Nom complet */}
					<Skeleton className="h-4 w-48" /> {/* Email */}
					<Skeleton className="h-4 w-24" /> {/* Sujet */}
					<Skeleton className="h-4 w-20" /> {/* Statut */}
					<Skeleton className="h-4 w-24" /> {/* Date de création */}
					<Skeleton className="h-4 w-16" /> {/* Actions */}
				</div>

				{/* Table rows */}
				{Array.from({ length: 10 }).map((_, i) => (
					<div
						key={i}
						className="flex items-center space-x-4 p-4 border-b last:border-0 hover:bg-muted/50"
					>
						<Skeleton className="h-4 w-4" /> {/* Checkbox */}
						<div className="flex items-center gap-2">
							<Skeleton className="h-8 w-8 rounded-full" /> {/* Avatar */}
							<Skeleton className="h-4 w-32" /> {/* Nom */}
						</div>
						<Skeleton className="h-4 w-48" /> {/* Email */}
						<div className="space-y-1">
							<Skeleton className="h-4 w-24" /> {/* Sujet */}
							<Skeleton className="h-3 w-16" /> {/* Pièces jointes */}
						</div>
						<Skeleton className="h-5 w-20 rounded-full" /> {/* Badge statut */}
						<Skeleton className="h-4 w-24" /> {/* Date */}
						<Skeleton className="h-8 w-8 rounded-full" /> {/* Actions button */}
					</div>
				))}
			</div>

			{/* Pagination */}
			<div className="flex items-center justify-between">
				<Skeleton className="h-4 w-40" /> {/* Résultats info */}
				<div className="flex items-center gap-2">
					<Skeleton className="h-8 w-20" /> {/* Précédent */}
					<Skeleton className="h-8 w-8" /> {/* Page 1 */}
					<Skeleton className="h-8 w-8" /> {/* Page 2 */}
					<Skeleton className="h-8 w-8" /> {/* Page 3 */}
					<Skeleton className="h-8 w-20" /> {/* Suivant */}
				</div>
			</div>
		</div>
	);
}
