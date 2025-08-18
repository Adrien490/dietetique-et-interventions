import { Reveal, SlideIn, Stagger } from "@/shared/components/animations";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";

export function Hero() {
	return (
		<section
			id="main-content"
			aria-labelledby="hero-title"
			data-voice-queries="diététicienne nantes,nutritionniste nantes,consultation nutrition"
			data-business-intent="healthcare-nutrition"
			className="flex items-center justify-center w-full flex-col px-4 min-h-screen"
			itemScope
			itemType="https://schema.org/Person"
		>
			<p className="sr-only">
				Vous cherchez une diététicienne nutritionniste à Nantes ? Je suis Manon
				Chaillou, diplômée et spécialisée en rééquilibrage alimentaire.
			</p>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-20">
				<div className="text-center space-y-8">
					{/* Titre principal optimisé SEO avec géolocalisation - Animation immédiate */}
					<SlideIn direction="up" delay={0} duration={0.4}>
						<h1
							id="hero-title"
							className="text-center bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text text-4xl md:text-6xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight"
						>
							<span itemProp="name">Manon Chaillou</span>
							<br />
							<span itemProp="jobTitle">
								Diététicienne Nutritionniste
							</span> à{" "}
							<span
								itemProp="workLocation"
								itemScope
								itemType="https://schema.org/Place"
							>
								<span itemProp="name">Nantes</span>
							</span>
						</h1>
					</SlideIn>

					{/* Description optimisée - Sans animation */}
					<p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground text-center relative z-20">
						Diététicienne nutritionniste aux multiples casquettes :{" "}
						<span itemProp="knowsAbout">activité hospitalière</span>,{" "}
						<span itemProp="knowsAbout">suivis individualisés en libéral</span>,{" "}
						<span itemProp="knowsAbout">prestations de groupe</span>.
					</p>

					{/* Informations professionnelles additionnelles */}
					<div className="sr-only">
						<span
							itemProp="hasOccupation"
							itemScope
							itemType="https://schema.org/Occupation"
						>
							<span itemProp="name">Diététicienne Nutritionniste</span>
							<span
								itemProp="occupationLocation"
								itemScope
								itemType="https://schema.org/City"
							>
								<span itemProp="name">Nantes</span>
							</span>
						</span>
						<span
							itemProp="alumniOf"
							itemScope
							itemType="https://schema.org/EducationalOrganization"
						>
							<span itemProp="name">IUT Nancy - BUT Génie Biologique</span>
						</span>
						<span
							itemProp="worksFor"
							itemScope
							itemType="https://schema.org/Hospital"
						>
							<span itemProp="name">CHU de Nantes</span>
						</span>
					</div>

					{/* Boutons CTA optimisés - Animation au scroll avec Stagger */}
					<Reveal threshold={0.3} delay={0} duration={0.3}>
						<Stagger
							delay={0.1}
							staggerDelay={0.1}
							className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center relative z-20"
						>
							<Button
								asChild
								size="lg"
								className="text-base focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
							>
								<Link
									href="#contact"
									aria-label="Prendre rendez-vous avec Manon Chaillou, diététicienne nutritionniste à Nantes - Consultation personnalisée"
								>
									Prendre rendez-vous
								</Link>
							</Button>
							<Button
								asChild
								variant="outline"
								size="lg"
								className="text-base focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
							>
								<Link
									href="#about"
									aria-label="Découvrir le parcours et les spécialités de Manon Chaillou, diététicienne nutritionniste à Nantes"
								>
									Découvrir mon parcours professionnel
								</Link>
							</Button>
						</Stagger>
					</Reveal>

					{/* Liens de navigation internes optimisés SEO - Sans animation */}
					<div className="pt-8 space-y-4">
						<p className="text-sm text-muted-foreground">
							Explorez mes services de diététique et nutrition :
						</p>
						<div className="flex flex-wrap justify-center gap-4 text-sm">
							<Link
								href="#services"
								className="text-primary hover:text-primary/80 transition-colors underline decoration-1 underline-offset-4 hover:decoration-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-1"
								aria-label="Consulter toutes mes prestations de diététique à Nantes"
							>
								Mes prestations de nutrition
							</Link>
							<span className="text-muted-foreground/50">•</span>
							<Link
								href="#faq"
								className="text-primary hover:text-primary/80 transition-colors underline decoration-1 underline-offset-4 hover:decoration-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-1"
								aria-label="Consulter les questions fréquentes sur la diététique et nutrition"
							>
								Questions fréquentes sur la diététique
							</Link>
							<span className="text-muted-foreground/50">•</span>
							<Link
								href="#contact"
								className="text-primary hover:text-primary/80 transition-colors underline decoration-1 underline-offset-4 hover:decoration-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-1"
								aria-label="Contacter Manon Chaillou pour une consultation diététique à Nantes"
							>
								Me contacter directement
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
