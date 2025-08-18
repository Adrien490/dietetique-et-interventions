import { Reveal } from "@/shared/components/animations";
import Image from "next/image";
import Link from "next/link";
import { ABOUT_STEPS, type AboutStep } from "./about-steps";

export function About() {
	return (
		<section
			id="about"
			className="py-16 lg:py-24 bg-background min-h-screen"
			aria-label="À propos de Manon Chaillou, diététicienne nutritionniste à Nantes"
			role="region"
			data-voice-queries="qui est manon chaillou,diététicienne nantes expérience,parcours nutritionniste"
			data-content-type="professional-biography"
			itemScope
			itemType="https://schema.org/Person"
		>
			<p className="sr-only">
				Manon Chaillou est une diététicienne nutritionniste expérimentée à
				Nantes. Elle a travaillé au CHU de Nantes en cardiologie, obésité,
				gériatrie et pédiatrie.
			</p>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-left mb-12">
					{/* Titre, description et photo alignés */}
					<div className="flex flex-col sm:flex-row sm:items-start sm:gap-6 mb-8">
						<div className="flex-1">
							<Reveal threshold={0.2} delay={0} duration={0.4}>
								<h2
									id="about-title"
									className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
								>
									À propos
								</h2>
							</Reveal>
							<p
								id="about-description"
								className="text-lg text-muted-foreground max-w-2xl mb-4"
							>
								C&apos;est à l&apos;hôpital que j&apos;ai commencé mon parcours,
								et je conjugue aujourd&apos;hui cette activité à la pratique en
								libéral pour vous accompagner au plus proche de votre quotidien.
							</p>

							{/* Lien interne contextuel */}
							<p className="text-sm text-muted-foreground mt-4">
								Découvrez{" "}
								<Link
									href="#services"
									className="text-primary hover:text-primary/80 transition-colors underline decoration-1 underline-offset-2 hover:decoration-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
									aria-label="Consulter mes prestations de diététique et nutrition à Nantes"
								>
									mes spécialisations en nutrition clinique
								</Link>{" "}
								et{" "}
								<Link
									href="#contact"
									className="text-primary hover:text-primary/80 transition-colors underline decoration-1 underline-offset-2 hover:decoration-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
									aria-label="Prendre rendez-vous pour une consultation diététique personnalisée"
								>
									prenez rendez-vous pour une consultation personnalisée
								</Link>
								.
							</p>
						</div>

						{/* Photo optimisée SEO */}
						<div className="flex-shrink-0 mt-4 sm:mt-0">
							<div className="relative h-32 w-32 overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg sm:h-36 sm:w-36">
								<Image
									src="/manon.png"
									alt="Manon Chaillou, diététicienne nutritionniste diplômée à Nantes - Portrait professionnel"
									fill
									className="object-cover object-center"
									priority
									quality={90}
									sizes="(max-width: 640px) 128px, 144px"
									itemProp="image"
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Timeline responsive avec Performance Critical Rendering */}
				<div className="relative">
					{/* Ligne horizontale pour desktop */}
					<div
						className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-border/30 rounded-full"
						aria-hidden="true"
					/>

					{/* Étapes du parcours professionnel */}
					<div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 lg:gap-12">
						{ABOUT_STEPS.map((step: AboutStep, index) => (
							<article
								key={step.id}
								style={{
									contentVisibility: index > 2 ? "auto" : "visible", // Lazy render steps 4+
									containIntrinsicSize: "auto 300px",
								}}
								className="flex flex-col items-start w-full lg:flex-1 relative text-left focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg p-2 -m-2"
								aria-labelledby={`about-${step.id}-title`}
								tabIndex={0}
								itemProp="alumniOf"
								itemScope
								itemType="https://schema.org/EducationalOrganization"
							>
								<div className="relative z-10 mb-6 flex-shrink-0">
									<div className="w-16 h-16 rounded-full border-4 border-background bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
										<span aria-hidden="true">{step.icon}</span>
									</div>
								</div>

								<div className="w-full">
									<h3
										id={`about-${step.id}-title`}
										className="text-xl font-semibold text-foreground mb-4 text-left"
									>
										{step.title}
									</h3>
									<div className="text-sm text-foreground/90 leading-relaxed text-left space-y-3 w-full">
										{step.description.map(
											(paragraph: string, paragraphIndex: number) => (
												<p key={paragraphIndex} className="w-full">
													{paragraph}
												</p>
											)
										)}
									</div>
								</div>
							</article>
						))}
					</div>
				</div>

				{/* Citation mise en valeur */}
				<Reveal threshold={0.3} delay={0} duration={0.5}>
					<div className="mt-16 flex justify-center">
						<blockquote className="max-w-3xl text-center">
							<p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed italic">
								« L&apos;alimentation doit être synonyme de plaisir et de
								sérénité. »
							</p>
						</blockquote>
					</div>
				</Reveal>

				{/* Section d'information supplémentaire avec mots-clés longue traîne */}
				<aside className="mt-16 text-center">
					<div className="bg-background/50 p-8 rounded-lg border border-border/50">
						<h3 className="text-xl font-semibold text-foreground mb-4">
							Pourquoi consulter une diététicienne ?
						</h3>
						<div className="grid md:grid-cols-2 gap-6 text-left">
							<div>
								<h4 className="font-medium text-foreground mb-2">
									Expertise professionnelle
								</h4>
								<p className="text-sm text-foreground/80">
									Diplômée en diététique et nutrition, je garantis des prises en
									charge rigoureusement scientifiques, et adaptées selon vos
									besoins individuels.
								</p>
							</div>
							<div>
								<h4 className="font-medium text-foreground mb-2">
									Suivi personnalisé
								</h4>
								<p className="text-sm text-foreground/80">
									Chaque consultation est adaptée à vos besoins spécifiques, vos
									objectifs et votre mode de vie pour un accompagnement
									nutritionnel durable et efficace.
								</p>
							</div>
							<div>
								<h4 className="font-medium text-foreground mb-2">
									Approche bienveillante
								</h4>
								<p className="text-sm text-foreground/80">
									Sans régime restrictif ni contraintes, je privilégie une
									démarche respectueuse et votre relation à l&apos;alimentation
									pour retrouver le plaisir de manger.
								</p>
							</div>
							<div>
								<h4 className="font-medium text-foreground mb-2">
									Localisation pratique
								</h4>
								<p className="text-sm text-foreground/80">
									Mobile sur toute la région nantaise et communes limitrophes,
									je propose des consultations à votre domicile, et des
									téléconsultations pour m&apos;adapter à vos contraintes.
								</p>
							</div>
						</div>
					</div>
				</aside>
			</div>
		</section>
	);
}
