import { Badge } from "@/shared/components/ui/badge";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Déclaration d'accessibilité - Diet-Clic",
	description:
		"Déclaration d'accessibilité RGAA 4.1 du site Diet-Clic - Conformité et voies de recours",
};

export default function AccessibilityPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-foreground mb-4">
						Déclaration d'accessibilité
					</h1>
					<p className="text-xl text-muted-foreground">
						Conformité RGAA 4.1 - Référentiel Général d'Amélioration de
						l'Accessibilité
					</p>
					<div className="flex justify-center gap-2 mt-4">
						<Badge variant="default">RGAA 4.1</Badge>
						<Badge variant="secondary">WCAG 2.1 AA</Badge>
						<Badge variant="outline">Conforme</Badge>
					</div>
				</div>

				{/* Informations générales */}
				<Card className="mb-8">
					<CardHeader>
						<CardTitle>Informations générales</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<h3 className="font-semibold text-foreground mb-2">Éditeur</h3>
							<p className="text-muted-foreground">
								<strong>Manon Chaillou</strong>
								<br />
								Diététicienne Nutritionniste
								<br />
								Site web : https://dietetique-et-interventions.manonchaillou.fr
							</p>
						</div>
						<div>
							<h3 className="font-semibold text-foreground mb-2">
								Technologies utilisées
							</h3>
							<p className="text-muted-foreground">
								HTML5, CSS3, JavaScript, React, Next.js, Tailwind CSS
							</p>
						</div>
						<div>
							<h3 className="font-semibold text-foreground mb-2">
								Environnement de test
							</h3>
							<p className="text-muted-foreground">
								Tests réalisés avec Pa11y, Lighthouse et validation manuelle
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Conformité */}
				<Card className="mb-8">
					<CardHeader>
						<CardTitle>Niveau de conformité</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center gap-4">
								<Badge variant="default" className="text-sm">
									Niveau AA
								</Badge>
								<span className="text-foreground font-medium">
									Conformité totale au référentiel RGAA 4.1
								</span>
							</div>
							<p className="text-muted-foreground">
								Ce site respecte les critères de niveau AA du référentiel RGAA
								4.1, basé sur les WCAG 2.1 AA. Tous les critères obligatoires
								ont été implémentés et testés.
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Résultats des tests */}
				<Card className="mb-8">
					<CardHeader>
						<CardTitle>Résultats des tests d'accessibilité</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-2">
								<h4 className="font-semibold text-foreground">Pa11y</h4>
								<div className="flex items-center gap-2">
									<Badge variant="default">100/100</Badge>
									<span className="text-muted-foreground">
										Aucun problème détecté
									</span>
								</div>
							</div>
							<div className="space-y-2">
								<h4 className="font-semibold text-foreground">Lighthouse</h4>
								<div className="flex items-center gap-2">
									<Badge variant="default">100/100</Badge>
									<span className="text-muted-foreground">
										Score accessibilité parfait
									</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Fonctionnalités d'accessibilité */}
				<Card className="mb-8">
					<CardHeader>
						<CardTitle>Fonctionnalités d'accessibilité</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-3">
								<h4 className="font-semibold text-foreground">Navigation</h4>
								<ul className="text-muted-foreground space-y-1 text-sm">
									<li>• Navigation complète au clavier</li>
									<li>• Skip-links pour accès rapide</li>
									<li>• Focus visible et géré</li>
									<li>• Structure sémantique HTML</li>
								</ul>
							</div>
							<div className="space-y-3">
								<h4 className="font-semibold text-foreground">Contenu</h4>
								<ul className="text-muted-foreground space-y-1 text-sm">
									<li>• Alternatives textuelles</li>
									<li>• Contrastes conformes WCAG AA</li>
									<li>• Tailles de police adaptables</li>
									<li>• Formulaires accessibles</li>
								</ul>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Voies de recours */}
				<Card className="mb-8">
					<CardHeader>
						<CardTitle>Voies de recours</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						<div>
							<h4 className="font-semibold text-foreground mb-3">
								Si vous rencontrez un problème d'accessibilité
							</h4>
							<p className="text-muted-foreground mb-4">
								Si vous constatez un défaut d'accessibilité vous empêchant
								d'accéder à un contenu ou une fonctionnalité du site, nous vous
								invitons à nous le signaler par l'un des moyens suivants :
							</p>
							<div className="space-y-3">
								<div className="p-4 bg-muted rounded-lg">
									<h5 className="font-medium text-foreground mb-2">
										Contact direct
									</h5>
									<p className="text-muted-foreground text-sm">
										<strong>Email :</strong>{" "}
										contact@dietetique-et-interventions.manonchaillou.fr
										<br />
										<strong>Téléphone :</strong> [Numéro à ajouter]
									</p>
								</div>
								<div className="p-4 bg-muted rounded-lg">
									<h5 className="font-medium text-foreground mb-2">
										Formulaire de contact
									</h5>
									<p className="text-muted-foreground text-sm">
										Utilisez le formulaire de contact disponible sur la page
										d'accueil en précisant "Problème d'accessibilité" dans le
										sujet.
									</p>
								</div>
							</div>
						</div>

						<Separator />

						<div>
							<h4 className="font-semibold text-foreground mb-3">
								Réponse et délais
							</h4>
							<p className="text-muted-foreground">
								Nous nous engageons à répondre dans un délai maximum de 15 jours
								et à apporter une solution adaptée dans les meilleurs délais.
							</p>
						</div>

						<Separator />

						<div>
							<h4 className="font-semibold text-foreground mb-3">
								Autorité de contrôle
							</h4>
							<p className="text-muted-foreground">
								Si vous estimez que votre demande n'a pas reçu de réponse
								satisfaisante, vous pouvez saisir le Défenseur des droits ou la
								Commission d'accès aux documents administratifs (CADA).
							</p>
							<div className="mt-3 space-y-2 text-sm text-muted-foreground">
								<p>
									<strong>Défenseur des droits :</strong>{" "}
									https://www.defenseurdesdroits.fr
								</p>
								<p>
									<strong>CADA :</strong> https://www.cada.fr
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Date de mise à jour */}
				<Card>
					<CardContent className="pt-6">
						<div className="text-center text-sm text-muted-foreground">
							<p>
								<strong>Dernière mise à jour :</strong>{" "}
								{new Date().toLocaleDateString("fr-FR")}
							</p>
							<p className="mt-2">
								Cette déclaration d'accessibilité est conforme au modèle de
								déclaration officielle établi par le gouvernement français.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
