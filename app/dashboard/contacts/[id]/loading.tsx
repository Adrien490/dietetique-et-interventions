import { ContactHeaderSkeleton } from "@/domains/contact/features/get-contact/components";
import { ContentCard } from "@/shared/components/content-card";
import { PageContainer } from "@/shared/components/page-container";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function ContactLoading() {
	return (
		<PageContainer className="pt-4">
			{/* Header avec skeleton */}
			<ContactHeaderSkeleton />

			{/* Contenu principal */}
			<div className="space-y-6 pb-8">
				{/* Conteneur principal à deux colonnes */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Colonne principale (2/3) */}
					<div className="lg:col-span-2 space-y-6">
						{/* Message */}
						<ContentCard title="Message">
							<div className="space-y-3">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-3/4" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-2/3" />
							</div>
						</ContentCard>

						{/* Pièces jointes */}
						<ContentCard title="Pièces jointes">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{Array.from({ length: 2 }).map((_, i) => (
									<div key={i} className="border rounded-lg overflow-hidden">
										{/* Aperçu */}
										<div className="aspect-video bg-muted/30 flex items-center justify-center">
											<Skeleton className="h-12 w-12 rounded" />
										</div>

										{/* Informations du fichier */}
										<div className="p-4 space-y-3">
											<Skeleton className="h-4 w-3/4" />
											<Skeleton className="h-3 w-1/2" />

											{/* Actions */}
											<div className="flex gap-2">
												<Skeleton className="h-8 flex-1" />
												<Skeleton className="h-8 flex-1" />
											</div>
										</div>
									</div>
								))}
							</div>
						</ContentCard>
					</div>

					{/* Colonne latérale (1/3) */}
					<div className="space-y-6">
						{/* Informations de suivi */}
						<ContentCard title="Suivi">
							<div className="space-y-4">
								<div>
									<Skeleton className="h-3 w-24 mb-2" />
									<Skeleton className="h-4 w-32" />
								</div>
							</div>
						</ContentCard>

						{/* Statistiques */}
						<ContentCard title="Résumé">
							<div className="grid grid-cols-1 gap-4">
								{/* Nombre de pièces jointes */}
								<div className="bg-muted/40 rounded-lg p-4 flex flex-col items-center justify-center">
									<Skeleton className="h-8 w-8 mb-2" />
									<Skeleton className="h-3 w-20" />
								</div>

								{/* Assigné à */}
								<div className="bg-muted/40 rounded-lg p-4 space-y-2">
									<Skeleton className="h-3 w-16" />
									<Skeleton className="h-4 w-24" />
									<Skeleton className="h-3 w-32" />
								</div>
							</div>
						</ContentCard>
					</div>
				</div>
			</div>
		</PageContainer>
	);
}

