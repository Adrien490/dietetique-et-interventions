import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title:
		"Politique de confidentialité | Manon Chaillou - Diététicienne Nutritionniste Nantes",
	description:
		"Politique de confidentialité et protection des données personnelles du site de Manon Chaillou, diététicienne nutritionniste à Nantes. Conformité RGPD.",
	robots: "noindex, nofollow",
};

export default function PrivacyPage() {
	return (
		<section
			className="py-16 lg:py-24 bg-background min-h-screen"
			aria-label="Politique de confidentialité de Manon Chaillou, diététicienne nutritionniste à Nantes"
			role="region"
			aria-labelledby="privacy-title"
			aria-describedby="privacy-description"
		>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* En-tête */}
				<div className="text-center mb-12">
					<h1
						id="privacy-title"
						className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
					>
						Politique de confidentialité
					</h1>
					<p
						id="privacy-description"
						className="text-lg text-muted-foreground max-w-2xl mx-auto"
					>
						Protection de vos données personnelles - Conformité RGPD
					</p>
					<p className="text-sm text-muted-foreground mt-2">
						Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
					</p>
				</div>

				{/* Contenu */}
				<div className="space-y-8">
					{/* Introduction */}
					<article
						className="focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg p-2 -m-2"
						aria-labelledby="intro-title"
						tabIndex={0}
					>
						<h2
							id="intro-title"
							className="text-2xl font-semibold text-foreground mb-4"
						>
							Introduction
						</h2>
						<div className="text-foreground/90 space-y-4 leading-relaxed">
							<p>
								En tant que diététicienne nutritionniste, je suis
								particulièrement sensible à la protection de vos données
								personnelles et au respect de votre vie privée. Cette politique
								de confidentialité explique comment je collecte, utilise, stocke
								et protège vos informations personnelles.
							</p>
							<p>
								Cette politique est conforme au Règlement Général sur la
								Protection des Données (RGPD) et à la loi française Informatique
								et Libertés.
							</p>
						</div>
					</article>

					{/* Responsable du traitement */}
					<article
						className="focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg p-2 -m-2"
						aria-labelledby="responsible-title"
						tabIndex={0}
					>
						<h2
							id="responsible-title"
							className="text-2xl font-semibold text-foreground mb-4"
						>
							Responsable du traitement
						</h2>
						<div className="bg-muted/30 p-6 rounded-lg">
							<div className="space-y-2 text-foreground/90">
								<p>
									<strong className="text-foreground">Nom :</strong> Manon
									Chaillou
								</p>
								<p>
									<strong className="text-foreground">Qualité :</strong>{" "}
									Diététicienne Nutritionniste
								</p>
								<p>
									<strong className="text-foreground">Adresse :</strong>{" "}
									[Adresse du cabinet à Nantes]
								</p>
								<p>
									<strong className="text-foreground">Email :</strong> [Email
									professionnel]
								</p>
								<p>
									<strong className="text-foreground">Téléphone :</strong>{" "}
									[Numéro de téléphone]
								</p>
							</div>
						</div>
					</article>

					{/* Données collectées */}
					<article
						className="focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg p-2 -m-2"
						aria-labelledby="data-title"
						tabIndex={0}
					>
						<h2
							id="data-title"
							className="text-2xl font-semibold text-foreground mb-4"
						>
							Données personnelles collectées
						</h2>
						<div className="space-y-6">
							<div>
								<h3 className="text-xl font-semibold text-foreground mb-3">
									Via le formulaire de contact
								</h3>
								<ul className="list-disc pl-6 text-foreground/90 space-y-2">
									<li>Nom et prénom</li>
									<li>Adresse email</li>
									<li>Numéro de téléphone (optionnel)</li>
									<li>Message et informations fournies</li>
								</ul>
							</div>

							<div>
								<h3 className="text-xl font-semibold text-foreground mb-3">
									Lors des consultations
								</h3>
								<ul className="list-disc pl-6 text-foreground/90 space-y-2">
									<li>
										Données d&apos;identification (nom, prénom, adresse,
										téléphone)
									</li>
									<li>Informations médicales et nutritionnelles</li>
									<li>Habitudes alimentaires et mode de vie</li>
									<li>Objectifs et motivations</li>
									<li>Historique des consultations</li>
								</ul>
							</div>

							<div>
								<h3 className="text-xl font-semibold text-foreground mb-3">
									Données de navigation
								</h3>
								<ul className="list-disc pl-6 text-foreground/90 space-y-2">
									<li>Adresse IP</li>
									<li>Type de navigateur</li>
									<li>Pages visitées</li>
									<li>Durée de visite</li>
									<li>Cookies (voir section dédiée)</li>
								</ul>
							</div>
						</div>
					</article>

					{/* Finalités du traitement */}
					<article
						className="focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg p-2 -m-2"
						aria-labelledby="purposes-title"
						tabIndex={0}
					>
						<h2
							id="purposes-title"
							className="text-2xl font-semibold text-foreground mb-4"
						>
							Finalités du traitement
						</h2>
						<div className="text-foreground/90 space-y-4 leading-relaxed">
							<div>
								<p className="font-semibold text-foreground mb-2">
									Pour les consultations :
								</p>
								<ul className="list-disc pl-6 space-y-2">
									<li>Fournir des conseils nutritionnels personnalisés</li>
									<li>Assurer le suivi de votre parcours nutritionnel</li>
									<li>
										Respecter les obligations légales de tenue de dossier
										patient
									</li>
									<li>Gérer les rendez-vous et la facturation</li>
								</ul>
							</div>

							<div>
								<p className="font-semibold text-foreground mb-2">
									Pour le site web :
								</p>
								<ul className="list-disc pl-6 space-y-2">
									<li>Répondre à vos demandes d&apos;information</li>
									<li>Améliorer l&apos;expérience utilisateur</li>
									<li>
										Analyser l&apos;utilisation du site (statistiques
										anonymisées)
									</li>
									<li>Assurer la sécurité du site</li>
								</ul>
							</div>
						</div>
					</article>

					{/* Base légale */}
					<article
						className="focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg p-2 -m-2"
						aria-labelledby="legal-basis-title"
						tabIndex={0}
					>
						<h2
							id="legal-basis-title"
							className="text-2xl font-semibold text-foreground mb-4"
						>
							Base légale du traitement
						</h2>
						<div className="text-foreground/90 space-y-4 leading-relaxed">
							<p>
								<strong className="text-foreground">Consentement :</strong> Pour
								l&apos;envoi de communications et l&apos;utilisation de cookies
								non essentiels
							</p>
							<p>
								<strong className="text-foreground">Intérêt légitime :</strong>{" "}
								Pour l&apos;amélioration de nos services et la sécurité du site
							</p>
							<p>
								<strong className="text-foreground">Obligation légale :</strong>{" "}
								Pour la tenue des dossiers patients (Code de la santé publique)
							</p>
							<p>
								<strong className="text-foreground">
									Exécution du contrat :
								</strong>{" "}
								Pour la fourniture des services de consultation
							</p>
						</div>
					</article>

					{/* Conservation des données */}
					<article
						className="focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg p-2 -m-2"
						aria-labelledby="conservation-title"
						tabIndex={0}
					>
						<h2
							id="conservation-title"
							className="text-2xl font-semibold text-foreground mb-4"
						>
							Durée de conservation
						</h2>
						<div className="bg-muted/30 p-6 rounded-lg">
							<div className="text-foreground/90 space-y-3">
								<p>
									<strong className="text-foreground">
										Dossiers patients :
									</strong>{" "}
									20 ans après la dernière consultation (obligation légale)
								</p>
								<p>
									<strong className="text-foreground">
										Données de contact :
									</strong>{" "}
									3 ans après le dernier contact
								</p>
								<p>
									<strong className="text-foreground">
										Données de navigation :
									</strong>{" "}
									13 mois maximum
								</p>
								<p>
									<strong className="text-foreground">Cookies :</strong> 13 mois
									maximum
								</p>
							</div>
						</div>
					</article>

					{/* Partage des données */}
					<article
						className="focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg p-2 -m-2"
						aria-labelledby="data-sharing-title"
						tabIndex={0}
					>
						<h2
							id="data-sharing-title"
							className="text-2xl font-semibold text-foreground mb-4"
						>
							Partage des données
						</h2>
						<div className="text-foreground/90 space-y-4 leading-relaxed">
							<p>
								Vos données personnelles ne sont{" "}
								<strong className="text-foreground">
									jamais vendues, louées ou échangées
								</strong>{" "}
								à des tiers à des fins commerciales.
							</p>
							<p>
								Elles peuvent être partagées uniquement dans les cas suivants :
							</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>Avec votre consentement explicite</li>
								<li>
									Avec d&apos;autres professionnels de santé pour votre suivi
									(avec votre accord)
								</li>
								<li>Pour répondre à une obligation légale ou judiciaire</li>
								<li>
									Avec des prestataires techniques (hébergement, maintenance)
									sous contrat de confidentialité
								</li>
							</ul>
						</div>
					</article>

					{/* Sécurité */}
					<article
						className="focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg p-2 -m-2"
						aria-labelledby="security-title"
						tabIndex={0}
					>
						<h2
							id="security-title"
							className="text-2xl font-semibold text-foreground mb-4"
						>
							Sécurité des données
						</h2>
						<div className="text-foreground/90 space-y-4 leading-relaxed">
							<p>
								Je mets en place des mesures techniques et organisationnelles
								appropriées pour protéger vos données :
							</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>Chiffrement des données en transit (HTTPS)</li>
								<li>Hébergement sécurisé chez des prestataires certifiés</li>
								<li>Accès restreint aux données personnelles</li>
								<li>Sauvegardes régulières et sécurisées</li>
								<li>Mise à jour régulière des systèmes de sécurité</li>
							</ul>
						</div>
					</article>

					{/* Cookies */}
					<article
						className="focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg p-2 -m-2"
						aria-labelledby="cookies-title"
						tabIndex={0}
					>
						<h2
							id="cookies-title"
							className="text-2xl font-semibold text-foreground mb-4"
						>
							Cookies
						</h2>
						<div className="text-foreground/90 space-y-4 leading-relaxed">
							<p>
								Ce site utilise des cookies pour améliorer votre expérience de
								navigation.
							</p>

							<div className="space-y-4">
								<div>
									<h3 className="text-lg font-semibold text-foreground mb-2">
										Cookies essentiels
									</h3>
									<p>
										Nécessaires au fonctionnement du site (sécurité,
										navigation). Ils ne peuvent pas être désactivés.
									</p>
								</div>

								<div>
									<h3 className="text-lg font-semibold text-foreground mb-2">
										Cookies analytiques
									</h3>
									<p>
										Nous permettent d&apos;analyser l&apos;utilisation du site
										pour l&apos;améliorer. Vous pouvez les refuser sans impact
										sur votre navigation.
									</p>
								</div>
							</div>

							<p>
								Vous pouvez gérer vos préférences de cookies dans les paramètres
								de votre navigateur.
							</p>
						</div>
					</article>

					{/* Vos droits */}
					<article
						className="focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg p-2 -m-2"
						aria-labelledby="rights-title"
						tabIndex={0}
					>
						<h2
							id="rights-title"
							className="text-2xl font-semibold text-foreground mb-4"
						>
							Vos droits
						</h2>
						<div className="text-foreground/90 space-y-4 leading-relaxed">
							<p>Conformément au RGPD, vous disposez des droits suivants :</p>
							<div className="grid md:grid-cols-2 gap-4">
								<div className="bg-muted/30 p-4 rounded-lg">
									<h3 className="font-semibold text-foreground mb-2">
										Droit d&apos;accès
									</h3>
									<p className="text-sm">
										Connaître les données que nous détenons sur vous
									</p>
								</div>
								<div className="bg-muted/30 p-4 rounded-lg">
									<h3 className="font-semibold text-foreground mb-2">
										Droit de rectification
									</h3>
									<p className="text-sm">Corriger des données inexactes</p>
								</div>
								<div className="bg-muted/30 p-4 rounded-lg">
									<h3 className="font-semibold text-foreground mb-2">
										Droit d&apos;effacement
									</h3>
									<p className="text-sm">
										Demander la suppression de vos données
									</p>
								</div>
								<div className="bg-muted/30 p-4 rounded-lg">
									<h3 className="font-semibold text-foreground mb-2">
										Droit à la portabilité
									</h3>
									<p className="text-sm">
										Récupérer vos données dans un format lisible
									</p>
								</div>
								<div className="bg-muted/30 p-4 rounded-lg">
									<h3 className="font-semibold text-foreground mb-2">
										Droit d&apos;opposition
									</h3>
									<p className="text-sm">Vous opposer à certains traitements</p>
								</div>
								<div className="bg-muted/30 p-4 rounded-lg">
									<h3 className="font-semibold text-foreground mb-2">
										Droit de limitation
									</h3>
									<p className="text-sm">
										Limiter le traitement de vos données
									</p>
								</div>
							</div>

							<div className="mt-4">
								<p className="font-semibold text-foreground mb-2">
									Comment exercer vos droits :
								</p>
								<ul className="list-disc pl-6 space-y-2">
									<li>Par email : [email professionnel]</li>
									<li>Par courrier : [adresse postale]</li>
									<li>Lors de votre prochaine consultation</li>
								</ul>
							</div>

							<p className="mt-4">
								<strong className="text-foreground">Délai de réponse :</strong>{" "}
								1 mois maximum (prolongeable de 2 mois si nécessaire)
							</p>
						</div>
					</article>

					{/* Réclamation */}
					<article
						className="focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg p-2 -m-2"
						aria-labelledby="complaint-title"
						tabIndex={0}
					>
						<h2
							id="complaint-title"
							className="text-2xl font-semibold text-foreground mb-4"
						>
							Réclamation
						</h2>
						<div className="text-foreground/90 space-y-4 leading-relaxed">
							<p>
								Si vous estimez que vos droits ne sont pas respectés, vous
								pouvez :
							</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>Me contacter directement pour résoudre le problème</li>
								<li>
									Déposer une réclamation auprès de la CNIL (Commission
									Nationale de l&apos;Informatique et des Libertés)
								</li>
							</ul>

							<div className="bg-muted/30 p-4 rounded-lg mt-4">
								<p className="font-semibold text-foreground mb-2">
									Contact CNIL :
								</p>
								<p>
									Site web :{" "}
									<Link
										href="https://www.cnil.fr"
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm ml-1"
										aria-label="Site web de la CNIL (lien externe)"
									>
										cnil.fr
									</Link>
								</p>
								<p>Adresse : 3 Place de Fontenoy, 75007 Paris</p>
								<p>Téléphone : 01 53 73 22 22</p>
							</div>
						</div>
					</article>

					{/* Modifications */}
					<article
						className="focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg p-2 -m-2"
						aria-labelledby="modifications-title"
						tabIndex={0}
					>
						<h2
							id="modifications-title"
							className="text-2xl font-semibold text-foreground mb-4"
						>
							Modifications de cette politique
						</h2>
						<div className="text-foreground/90 space-y-4 leading-relaxed">
							<p>
								Cette politique de confidentialité peut être mise à jour pour
								refléter les changements dans nos pratiques ou pour des raisons
								légales.
							</p>
							<p>
								Les modifications importantes vous seront notifiées par email ou
								via un avis sur le site.
							</p>
						</div>
					</article>

					{/* Contact */}
					<article
						className="focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg p-2 -m-2"
						aria-labelledby="contact-title"
						tabIndex={0}
					>
						<h2
							id="contact-title"
							className="text-2xl font-semibold text-foreground mb-4"
						>
							Contact
						</h2>
						<div className="text-foreground/90 space-y-4 leading-relaxed">
							<p>
								Pour toute question concernant cette politique de
								confidentialité ou l&apos;utilisation de vos données
								personnelles :
							</p>
							<div className="space-y-2">
								<Link
									href="/contact"
									className="inline-flex items-center text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
									aria-label="Accéder au formulaire de contact"
								>
									→ Formulaire de contact
								</Link>
								<p>
									<strong className="text-foreground">Email :</strong> [email
									professionnel]
								</p>
								<p>
									<strong className="text-foreground">Téléphone :</strong>{" "}
									[numéro de téléphone]
								</p>
							</div>
						</div>
					</article>
				</div>

				{/* Retour à l'accueil */}
				<div className="mt-12 text-center">
					<Link
						href="/"
						className="inline-flex items-center text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm text-base"
						aria-label="Retourner à la page d'accueil"
					>
						← Retour à l&apos;accueil
					</Link>
				</div>
			</div>
		</section>
	);
}
