import { getContactRequest } from "@/domains/contact-request/features/get-contact-request";
import { ContentCard } from "@/shared/components/content-card";
import { EmptyState } from "@/shared/components/empty-state";
import { Button } from "@/shared/components/ui/button";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
	DownloadIcon,
	ExternalLinkIcon,
	FileIcon,
	FileImageIcon,
	FileTextIcon,
} from "lucide-react";

type Props = {
	params: Promise<{
		id: string;
	}>;
};

// Helper function pour déterminer le type de fichier et l'icône appropriée
function getFileIcon(filename: string) {
	const extension = filename.toLowerCase().split(".").pop();

	switch (extension) {
		case "jpg":
		case "jpeg":
		case "png":
		case "gif":
		case "webp":
		case "svg":
			return FileImageIcon;
		case "pdf":
		case "doc":
		case "docx":
		case "txt":
		case "rtf":
			return FileTextIcon;
		default:
			return FileIcon;
	}
}

export default async function ContactPage({ params }: Props) {
	const { id } = await params;

	const contactRequest = await getContactRequest({ id });

	if (!contactRequest) {
		return <EmptyState title="Contact non trouvé" />;
	}

	return (
		<div className="space-y-6 pb-8">
			{/* Conteneur principal à deux colonnes */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Colonne principale (2/3) */}
				<div className="lg:col-span-2 space-y-6">
					{/* Informations de contact */}

					{/* Message */}
					<ContentCard title="Message">
						<div className="prose prose-sm max-w-none">
							<p className="text-sm leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere">
								{contactRequest.message}
							</p>
						</div>
					</ContentCard>

					{/* Pièces jointes */}
					{contactRequest.attachments &&
						contactRequest.attachments.length > 0 && (
							<ContentCard
								title={`Pièces jointes (${contactRequest.attachments.length})`}
							>
								<div className="space-y-3">
									{contactRequest.attachments.map((attachment) => {
										const FileIconComponent = getFileIcon(attachment.filename);

										return (
											<div
												key={attachment.id}
												className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
											>
												<div className="flex items-center gap-3 min-w-0 flex-1">
													<FileIconComponent className="h-5 w-5 text-muted-foreground flex-shrink-0" />
													<div className="min-w-0 flex-1">
														<h3
															className="font-medium text-sm truncate"
															title={attachment.filename}
														>
															{attachment.filename}
														</h3>
														<p className="text-xs text-muted-foreground">
															Ajouté le{" "}
															{format(
																new Date(attachment.createdAt),
																"dd/MM/yyyy",
																{ locale: fr }
															)}
														</p>
													</div>
												</div>

												{/* Actions */}
												<div className="flex gap-2 flex-shrink-0">
													<Button size="sm" variant="outline" asChild>
														<a
															href={attachment.url}
															target="_blank"
															rel="noopener noreferrer"
														>
															<ExternalLinkIcon className="h-3 w-3 mr-1" />
															Voir
														</a>
													</Button>
													<Button size="sm" variant="outline" asChild>
														<a
															href={attachment.url}
															download={attachment.filename}
														>
															<DownloadIcon className="h-3 w-3 mr-1" />
															Télécharger
														</a>
													</Button>
												</div>
											</div>
										);
									})}
								</div>
							</ContentCard>
						)}
				</div>

				{/* Colonne latérale (1/3) */}
				<div className="space-y-6">
					{/* Informations de suivi */}
					<ContentCard title="Suivi">
						<div className="space-y-4">
							<div>
								<p className="text-xs text-muted-foreground mb-1">
									Dernière modification
								</p>
								<p className="text-sm">
									{format(
										new Date(contactRequest.updatedAt),
										"dd/MM/yyyy à HH:mm",
										{
											locale: fr,
										}
									)}
								</p>
							</div>
						</div>
					</ContentCard>

					{/* Statistiques */}
					<ContentCard title="Résumé">
						<div className="grid grid-cols-1 gap-4">
							<div className="bg-muted/40 rounded-lg p-4 flex flex-col items-center justify-center">
								<span className="text-2xl font-bold">
									{contactRequest.attachments?.length || 0}
								</span>
								<span className="text-xs text-muted-foreground mt-1">
									Pièce(s) jointe(s)
								</span>
							</div>

							{contactRequest.user && (
								<div className="bg-muted/40 rounded-lg p-4">
									<p className="text-xs text-muted-foreground mb-1">
										Assigné à
									</p>
									<p className="text-sm font-medium">
										{contactRequest.user.name}
									</p>
									<p className="text-xs text-muted-foreground">
										{contactRequest.user.email}
									</p>
								</div>
							)}
						</div>
					</ContentCard>
				</div>
			</div>
		</div>
	);
}
