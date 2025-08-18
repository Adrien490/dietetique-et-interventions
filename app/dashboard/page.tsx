import { ContactStatus } from "@/app/generated/prisma";
import { countContactRequests } from "@/domains/contact-request/features/count-contact-requests";
import { PageContainer } from "@/shared/components/page-container";
import { PageHeader } from "@/shared/components/page-header";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import {
	Archive,
	Calendar,
	CheckCircle,
	TrendingUp,
	Users,
} from "lucide-react";

export default async function DashboardPage() {
	// Récupération des statistiques
	const totalContactRequests = await countContactRequests({ filters: {} });

	const inProgressContactRequests = await countContactRequests({
		filters: { status: ContactStatus.IN_PROGRESS },
	});
	const completedContactRequests = await countContactRequests({
		filters: { status: ContactStatus.COMPLETED },
	});

	const stats = [
		{
			title: "Total des contacts",
			value: totalContactRequests,
			icon: Users,
			description: "Nombre total de demandes",
			color: "text-blue-600",
		},

		{
			title: "En cours",
			value: inProgressContactRequests,
			icon: TrendingUp,
			description: "Demandes en traitement",
			color: "text-yellow-600",
		},
		{
			title: "Traités",
			value: completedContactRequests,
			icon: CheckCircle,
			description: "Demandes finalisées",
			color: "text-green-600",
		},
	];

	return (
		<PageContainer>
			<PageHeader
				title="Tableau de bord"
				description="Vue d'ensemble de votre activité"
			/>

			{/* Statistiques */}
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
				{stats.map((stat) => {
					const Icon = stat.icon;
					return (
						<Card key={stat.title}>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									{stat.title}
								</CardTitle>
								<Icon className={`h-4 w-4 ${stat.color}`} />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{stat.value}</div>
								<p className="text-xs text-muted-foreground">
									{stat.description}
								</p>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* Actions rapides */}
			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Calendar className="h-5 w-5" />
							Actions rapides
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						<div className="text-sm text-muted-foreground">
							• Consultez vos nouveaux contacts
						</div>
						<div className="text-sm text-muted-foreground">
							• Gérez vos demandes en cours
						</div>
						<div className="text-sm text-muted-foreground">
							• Créez de nouveaux devis
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Archive className="h-5 w-5" />
							Activité récente
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-sm text-muted-foreground">
							{totalContactRequests > 0
								? `${totalContactRequests} demande(s) de contact au total`
								: "Aucune demande de contact pour le moment"}
						</div>
					</CardContent>
				</Card>
			</div>
		</PageContainer>
	);
}
