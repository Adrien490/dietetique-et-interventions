import { Reveal, Stagger } from "@/shared/components/animations";
import { PRESTATIONS } from "@/shared/constants/prestations";
import { User, Users } from "lucide-react";
import Link from "next/link";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../../shared/components/ui/tabs";
import { PRESTATIONS_GROUPE } from "../../../shared/constants/prestations-groupe";
import { ServiceItem } from "./service-item";

export function Services() {
	return (
		<section
			id="services"
			className="py-16 lg:py-24 bg-muted/50"
			aria-label="Prestations et services de diététique à Nantes"
			role="region"
			data-voice-queries="consultation diététique nantes,nutritionniste près de moi,diététicienne spécialisée"
			data-service-types="individual,group,therapeutic"
			itemScope
			itemType="https://schema.org/MedicalBusiness"
		>
			<p className="sr-only">
				Manon Chaillou propose des consultations de diététique à Nantes.
				Services individuels et ateliers de groupe disponibles. Spécialisations
				: poids, grossesse, pathologies, dénutrition.
			</p>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
				<Reveal threshold={0.2} delay={0} duration={0.4}>
					<div className="text-left mb-16">
						<h2
							id="services-title"
							className="text-3xl lg:text-4xl font-bold text-foreground mb-6"
						>
							Consultations diététique et nutrition à Nantes
						</h2>
						<p
							id="services-description"
							className="text-lg text-foreground/80 max-w-3xl"
						>
							Consultations personnalisées et accompagnement nutritionnel adapté
							à vos besoins. Que ce soit pour un rééquilibrage alimentaire, une
							perte de poids ou un suivi thérapeutique, je vous propose un
							accompagnement bienveillant et professionnel à Nantes ou en
							téléconsultation.
						</p>
					</div>
				</Reveal>

				<Tabs defaultValue="individuelles" className="w-full">
					<TabsList className="grid w-full grid-cols-2 bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-2 h-auto gap-2 shadow-sm">
						<TabsTrigger
							value="individuelles"
							className="flex items-center gap-3 px-6 py-4 text-base font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						>
							<User className="w-5 h-5" aria-hidden="true" />
							<span className="hidden sm:inline">Prestations</span>
							<span className="font-semibold">individuelles</span>
						</TabsTrigger>
						<TabsTrigger
							value="groupe"
							className="flex items-center gap-3 px-6 py-4 text-base font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						>
							<Users className="w-5 h-5" aria-hidden="true" />
							<span className="hidden sm:inline">Prestations de</span>
							<span className="font-semibold">groupe</span>
						</TabsTrigger>
					</TabsList>

					<TabsContent
						value="individuelles"
						className="mt-12 focus:outline-none"
					>
						<div className="text-left mb-8">
							<h3
								id="services-individual-title"
								className="text-2xl md:text-3xl font-bold text-foreground mb-4"
							>
								Consultations individuelles de diététique
							</h3>
							<p className="text-lg text-foreground/80 max-w-2xl">
								Optimisation durable de vos choix alimentaires pour atteindre
								vos objectifs : perte, prise ou stabilisation du poids.
							</p>
						</div>

						<div role="list" aria-labelledby="services-individual-title">
							<Stagger
								delay={0.1}
								staggerDelay={0.1}
								className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
							>
								{PRESTATIONS.map((prestation, index) => (
									<div
										key={prestation.title}
										role="listitem"
										itemScope
										itemType="https://schema.org/MedicalProcedure"
									>
										<ServiceItem {...prestation} index={index} />
										<div className="sr-only">
											<span itemProp="name">{prestation.title}</span>
											<span itemProp="description">
												{prestation.description}
											</span>
											<span itemProp="procedureType">
												Consultation individuelle
											</span>
											<span itemProp="category">Diététique et nutrition</span>
										</div>
									</div>
								))}
							</Stagger>
						</div>

						{/* Section Tarifs */}
						<div className="mt-12 bg-background/50 p-8 rounded-lg border border-border/30">
							<h4 className="text-xl font-semibold text-foreground mb-6 text-center">
								Tarifs des consultations individuelles
							</h4>
							<div className="text-center mb-6">
								<p className="text-muted-foreground">
									En consultation à domicile à Nantes ou téléconsultation
								</p>
							</div>

							<div className="overflow-x-auto">
								<table className="w-full max-w-2xl mx-auto">
									<thead>
										<tr className="border-b border-border/30">
											<th className="text-left py-3 px-4 font-medium text-foreground">
												Type de consultation
											</th>
											<th className="text-center py-3 px-4 font-medium text-foreground">
												Tarif plein
											</th>
											<th className="text-center py-3 px-4 font-medium text-foreground">
												Tarif réduit*
											</th>
											<th className="text-center py-3 px-4 font-medium text-foreground">
												Durée
											</th>
										</tr>
									</thead>
									<tbody>
										<tr className="border-b border-border/20">
											<td className="py-3 px-4 text-foreground">
												Bilan initial
											</td>
											<td className="py-3 px-4 text-center text-foreground font-medium">
												50€
											</td>
											<td className="py-3 px-4 text-center text-foreground font-medium">
												40€
											</td>
											<td className="py-3 px-4 text-center text-muted-foreground">
												1 heure
											</td>
										</tr>
										<tr>
											<td className="py-3 px-4 text-foreground">Suivi</td>
											<td className="py-3 px-4 text-center text-foreground font-medium">
												30€
											</td>
											<td className="py-3 px-4 text-center text-foreground font-medium">
												25€
											</td>
											<td className="py-3 px-4 text-center text-muted-foreground">
												30 min
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							<div className="mt-6 text-center">
								<p className="text-sm text-muted-foreground">
									* Étudiants, bénéficiaires CSS, allocataires RSA ou AAH,
									demandeur d&apos;emploi (sur présentation d&apos;un
									justificatif valide)
								</p>
							</div>
						</div>
					</TabsContent>

					<TabsContent value="groupe" className="mt-12 focus:outline-none">
						<div className="text-left mb-8">
							<h3
								id="services-group-title"
								className="text-2xl md:text-3xl font-bold text-foreground mb-4"
							>
								Ateliers collectifs de nutrition à Nantes
							</h3>
							<p className="text-lg text-foreground/80 max-w-2xl">
								Participez à des ateliers collectifs pour apprendre, échanger et
								partager autour de l&apos;alimentation dans une ambiance
								conviviale et éducative.
							</p>
						</div>

						<div role="list" aria-labelledby="services-group-title">
							<Stagger
								delay={0.1}
								staggerDelay={0.1}
								className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
							>
								{PRESTATIONS_GROUPE.map((prestation, index) => (
									<div
										key={prestation.title}
										role="listitem"
										itemScope
										itemType="https://schema.org/EducationalEvent"
									>
										<ServiceItem
											{...prestation}
											index={index + PRESTATIONS.length}
										/>
										<div className="sr-only">
											<span itemProp="name">{prestation.title}</span>
											<span itemProp="description">
												{prestation.description}
											</span>
											<span itemProp="eventType">Atelier collectif</span>
											<span itemProp="category">Éducation nutritionnelle</span>
											<span itemProp="audience">Groupe</span>
										</div>
									</div>
								))}
							</Stagger>
						</div>

						{/* Section Tarifs Groupe */}
						<div className="mt-12 bg-background/50 p-8 rounded-lg border border-border/30 text-center">
							<h4 className="text-xl font-semibold text-foreground mb-4">
								Tarifs des prestations de groupe
							</h4>
							<p className="text-lg text-foreground/80 mb-4">
								Tarifs : sur devis uniquement
							</p>
							<p className="text-muted-foreground">
								Merci de me contacter pour obtenir un devis personnalisé
							</p>
						</div>
					</TabsContent>
				</Tabs>

				{/* Section CTA avec liens internes */}
				<aside className="mt-16 text-center">
					<div className="bg-muted/30 p-8 rounded-lg border border-border/30">
						<h3 className="text-xl font-semibold text-foreground mb-4">
							Prêt(e) à commencer votre accompagnement nutritionnel ?
						</h3>
						<p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
							Que vous souhaitiez perdre du poids, améliorer votre santé ou
							optimiser vos performances sportives, je vous accompagne avec
							bienveillance vers vos objectifs.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								href="#contact"
								className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
								aria-label="Réserver votre première consultation de diététique à Nantes"
							>
								Réserver ma consultation
							</Link>
							<Link
								href="#faq"
								className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground rounded-md font-medium hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
								aria-label="Consulter les questions fréquentes avant votre consultation"
							>
								Questions fréquentes
							</Link>
						</div>
					</div>
				</aside>
			</div>
		</section>
	);
}
