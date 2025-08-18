import { StructuredData } from "@/shared/components/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		default: "Connexion - Manon Chaillou Diététicienne",
		template: "%s | Manon Chaillou Diététicienne",
	},
	description:
		"Connexion à l'espace professionnel de Manon Chaillou, diététicienne nutritionniste à Nantes.",
	robots: {
		index: false, // Pas d'indexation des pages d'auth
		follow: false,
	},
};

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<StructuredData />
			<div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
				{/* Fond avec motif subtil */}
				<div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

				{/* Contenu */}
				<div className="relative z-10">{children}</div>
			</div>
		</>
	);
}
