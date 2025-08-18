import { ContactStatus } from "@/app/generated/prisma";
import { EmptyState } from "@/shared/components/empty-state";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { ArrowLeft, Calendar, Mail, User } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { GetContactReturn } from "../types";

interface ContactRequestHeaderProps {
	contactRequestPromise: Promise<GetContactReturn | null>;
}

const CONTACT_REQUEST_STATUS_LABELS: Record<ContactStatus, string> = {
	PENDING: "En attente",
	IN_PROGRESS: "En cours",
	COMPLETED: "Terminé",
	ARCHIVED: "Archivé",
};

const CONTACT_REQUEST_STATUS_COLORS: Record<ContactStatus, string> = {
	PENDING: "#f59e0b",
	IN_PROGRESS: "#3b82f6",
	COMPLETED: "#10b981",
	ARCHIVED: "#6b7280",
};

export function ContactRequestHeader({
	contactRequestPromise,
}: ContactRequestHeaderProps) {
	const contactRequest = use(contactRequestPromise);

	if (!contactRequest) {
		return <EmptyState title="Demande de contact non trouvée" />;
	}

	return (
		<div className="pb-6 border-b mb-6">
			<div className="flex flex-col gap-4">
				{/* Section principale avec nom et sujet */}
				<div>
					<div className="flex flex-wrap items-center gap-3">
						<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
							{contactRequest.fullName}
						</h1>
						<div className="flex items-center gap-2">
							<Badge
								variant="outline"
								style={{
									backgroundColor: `${
										CONTACT_REQUEST_STATUS_COLORS[
											contactRequest.status as ContactStatus
										]
									}20`,
									color:
										CONTACT_REQUEST_STATUS_COLORS[
											contactRequest.status as ContactStatus
										],
									borderColor:
										CONTACT_REQUEST_STATUS_COLORS[
											contactRequest.status as ContactStatus
										],
								}}
							>
								{
									CONTACT_REQUEST_STATUS_LABELS[
										contactRequest.status as ContactStatus
									]
								}
							</Badge>
						</div>
					</div>

					<div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm text-muted-foreground">
						<div className="flex items-center gap-1.5">
							<Mail className="h-3.5 w-3.5" />
							<span>{contactRequest.email}</span>
						</div>
						<span className="text-muted-foreground/50">•</span>
						<div className="flex items-center gap-1.5">
							<span className="font-medium">Sujet:</span>
							<span>{contactRequest.subject}</span>
						</div>
						<span className="text-muted-foreground/50">•</span>
						<div className="flex items-center gap-1.5">
							<span className="font-medium">ID:</span>
							<span className="font-mono">
								{contactRequest.id.substring(0, 8)}
							</span>
						</div>
					</div>

					{/* Informations utilisateur si disponibles */}
					{contactRequest.user && (
						<div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
							<User className="h-3.5 w-3.5" />
							<span>Utilisateur connecté:</span>
							<span className="font-medium">{contactRequest.user.name}</span>
							<span>({contactRequest.user.email})</span>
						</div>
					)}

					{/* Date de création */}
					<div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
						<Calendar className="h-3.5 w-3.5" />
						<span>Créé le:</span>
						<span>
							{new Date(contactRequest.createdAt).toLocaleDateString("fr-FR", {
								year: "numeric",
								month: "long",
								day: "numeric",
								hour: "2-digit",
								minute: "2-digit",
							})}
						</span>
					</div>
				</div>

				{/* Bouton de retour */}
				<div className="flex flex-wrap gap-3 pt-4">
					<Button variant="outline" size="sm" asChild>
						<Link href="/dashboard/contacts">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Retour à la liste
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
