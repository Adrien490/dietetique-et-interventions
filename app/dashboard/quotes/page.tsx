import { PageContainer } from "@/shared/components/page-container";
import { PageHeader } from "@/shared/components/page-header";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { FileText } from "lucide-react";

export default function QuotesPage() {
	return (
		<PageContainer>
			<PageHeader
				title="Devis"
				description="Gestion des devis et propositions"
			/>

			<Card className="max-w-2xl">
				<CardHeader>
					<div className="flex items-center gap-3">
						<FileText className="h-8 w-8 text-muted-foreground" />
						<CardTitle>Fonctionnalité à venir</CardTitle>
					</div>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground">
						La gestion des devis sera disponible prochainement.
					</p>
				</CardContent>
			</Card>
		</PageContainer>
	);
}
