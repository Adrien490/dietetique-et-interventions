import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title:
		"Mentions légales | Manon Chaillou - Diététicienne Nutritionniste Nantes",
	description:
		"Mentions légales du site de Manon Chaillou, diététicienne nutritionniste diplômée à Nantes. Informations légales et réglementaires.",
	robots: "noindex, nofollow",
};

export default function LegalPage() {
	return (
		<section
			className="py-16 lg:py-24 bg-background min-h-screen"
			aria-label="Mentions légales de Manon Chaillou, diététicienne nutritionniste à Nantes"
			role="region"
			aria-labelledby="legal-title"
			aria-describedby="legal-description"
		>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* En-tête */}
				<div className="text-center mb-12">
					<h1
						id="legal-title"
						className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
					>
						Mentions légales
					</h1>
					<p
						id="legal-description"
						className="text-lg text-muted-foreground max-w-2xl mx-auto"
					>
						Informations légales et réglementaires du site de Manon Chaillou,
						diététicienne nutritionniste diplômée à Nantes
					</p>
				</div>

				{/* Contenu */}
				<div className="space-y-8">
					{/* Éditeur du site */}
					<article
						className="focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg p-2 -m-2"
						aria-labelledby="editor-title"
						tabIndex={0}
					>
						<h2
							id="editor-title"
							className="text-2xl font-semibold text-foreground mb-4"
						>
							Éditeur du site
						</h2>
						<div className="bg-muted/30 p-6 rounded-lg">
							<div className="space-y-2 text-foreground/90">
								<p>
									<strong className="text-foreground">Nom :</strong> Manon
									Chaillou
								</p>
								<p>
									<strong className="text-foreground">Profession :</strong>{" "}
									Diététicienne Nutritionniste
								</p>
								<p>
									<strong className="text-foreground">Diplôme :</strong> BUT
									Génie Biologique – parcours Diététique et Nutrition (IUT de
									Nancy)
								</p>
								<p>
									<strong className="text-foreground">Adresse :</strong>{" "}
									[Adresse du cabinet à Nantes]
								</p>
								<p>
									<strong className="text-foreground">Téléphone :</strong>{" "}
									[Numéro de téléphone]
								</p>
								<p>
									<strong className="text-foreground">Email :</strong> [Email
									professionnel]
								</p>
								<p>
									<strong className="text-foreground">SIRET :</strong> [Numéro
									SIRET]
								</p>
								<p>
									<strong className="text-foreground">N° ADELI :</strong>{" "}
									[Numéro ADELI]
								</p>
							</div>
						</div>
					</article>

					{/* Hébergement */}
					<article
						className="focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg p-2 -m-2"
						aria-labelledby="hosting-title"
						tabIndex={0}
					>
						<h2
							id="hosting-title"
							className="text-2xl font-semibold text-foreground mb-4"
						>
							Hébergement
						</h2>
						<div className="bg-muted/30 p-6 rounded-lg">
							<div className="space-y-2 text-foreground/90">
								<p>
									<strong className="text-foreground">Hébergeur :</strong>{" "}
									Vercel Inc.
								</p>
								<p>
									<strong className="text-foreground">Adresse :</strong> 340 S
									Lemon Ave #4133, Walnut, CA 91789, États-Unis
								</p>
								<p>
									<strong className="text-foreground">Site web :</strong>
									<Link
										href="https://vercel.com"
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm ml-1"
										aria-label="Site web de Vercel (lien externe)"
									>
										vercel.com
									</Link>
								</p>
							</div>
						</div>
					</article>

					{/* Propriété intellectuelle */}
					<article
						className="focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg p-2 -m-2"
						aria-labelledby="intellectual-title"
						tabIndex={0}
					>
						<h2
							id="intellectual-title"
							className="text-2xl font-semibold text-foreground mb-4"
						>
							Propriété intellectuelle
						</h2>
						<div className="text-foreground/90 space-y-4 leading-relaxed">
							<p>
								Ce site web et l&apos;ensemble de son contenu (textes, images,
								vidéos, logos, etc.) sont protégés par le droit d&apos;auteur et
								appartiennent à Manon Chaillou ou à leurs propriétaires
								respectifs.
							</p>
							<p>
								Toute reproduction, distribution, modification, adaptation,
								retransmission ou publication de ces différents éléments est
								strictement interdite sans l&apos;accord exprès par écrit de
								Manon Chaillou.
							</p>
						</div>
					</article>

					{/* Responsabilité */}
					<article
						className="focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg p-2 -m-2"
						aria-labelledby="responsibility-title"
						tabIndex={0}
					>
						<h2
							id="responsibility-title"
							className="text-2xl font-semibold text-foreground mb-4"
						>
							Responsabilité
						</h2>
						<div className="text-foreground/90 space-y-4 leading-relaxed">
							<p>
								Les informations contenues sur ce site sont données à titre
								indicatif et ne sauraient engager la responsabilité de Manon
								Chaillou.
							</p>
							<p>
								Les conseils nutritionnels présentés sur ce site ne se
								substituent en aucun cas à une consultation médicale. Il est
								recommandé de consulter votre médecin traitant avant
								d&apos;entreprendre tout changement alimentaire important.
							</p>
							<p>
								Manon Chaillou ne pourra être tenue responsable des dommages
								directs ou indirects résultant de l&apos;utilisation de ce site.
							</p>
						</div>
					</article>

					{/* Réglementation professionnelle */}
					<article
						className="focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg p-2 -m-2"
						aria-labelledby="regulation-title"
						tabIndex={0}
					>
						<h2
							id="regulation-title"
							className="text-2xl font-semibold text-foreground mb-4"
						>
							Réglementation professionnelle
						</h2>
						<div className="text-foreground/90 space-y-4 leading-relaxed">
							<p>
								<strong className="text-foreground">
									Titre professionnel :
								</strong>{" "}
								Diététicienne Nutritionniste (titre protégé par l&apos;Article
								L4371-1 du Code de la santé publique)
							</p>
							<p>
								<strong className="text-foreground">
									Autorité de contrôle :
								</strong>{" "}
								Agence Régionale de Santé (ARS) des Pays de la Loire
							</p>
							<p>
								<strong className="text-foreground">
									Ordre professionnel :
								</strong>{" "}
								Association Française des Diététiciens Nutritionnistes (AFDN)
							</p>
							<p>
								<strong className="text-foreground">
									Règles professionnelles :
								</strong>{" "}
								Code de déontologie des diététiciens
							</p>
							<p>
								<strong className="text-foreground">
									Assurance responsabilité civile professionnelle :
								</strong>{" "}
								[Nom de l&apos;assurance]
							</p>
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
								navigation et analyser l&apos;utilisation du site. Ces cookies
								ne collectent aucune information personnelle.
							</p>
							<p>
								Vous pouvez désactiver les cookies dans les paramètres de votre
								navigateur, mais cela peut affecter certaines fonctionnalités du
								site.
							</p>
						</div>
					</article>

					{/* Droit applicable */}
					<article
						className="focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg p-2 -m-2"
						aria-labelledby="law-title"
						tabIndex={0}
					>
						<h2
							id="law-title"
							className="text-2xl font-semibold text-foreground mb-4"
						>
							Droit applicable
						</h2>
						<div className="text-foreground/90 space-y-4 leading-relaxed">
							<p>
								Les présentes mentions légales sont régies par le droit
								français. En cas de litige, les tribunaux français seront seuls
								compétents.
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
								Pour toute question relative à ces mentions légales, vous pouvez
								me contacter :
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
