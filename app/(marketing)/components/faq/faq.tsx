import { Reveal } from "@/shared/components/animations";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/shared/components/ui/accordion";
import Link from "next/link";
import { FAQ_ITEMS, type FAQItem } from "./faq-items";

export function FAQ() {
	return (
		<section
			id="faq"
			itemScope
			itemType="https://schema.org/FAQPage"
			className="py-16 lg:py-24 bg-muted/50"
			aria-label="Questions fréquentes sur la diététique et nutrition"
			role="region"
			aria-labelledby="faq-title"
			aria-describedby="faq-description"
			data-voice-queries="comment consulter diététicienne nantes,tarif consultation nutrition,remboursement diététique mutuelle,combien coûte consultation diététique"
			data-content-type="faq-healthcare"
			data-ai-category="healthcare-nutrition-faq"
			data-ai-intent="healthcare-information-seeking"
			data-query-patterns="combien coûte,comment se déroule,quand consulter,est-ce remboursé"
			data-faq-category="healthcare-nutrition"
			data-location="Nantes"
			data-professional-context="dietitian-consultation"
		>
			<p className="sr-only">
				Questions fréquentes sur les consultations de diététique avec Manon
				Chaillou à Nantes. Informations sur les tarifs, déroulement des
				consultations, spécialisations nutritionnelles. Diététicienne diplômée
				avec 8 ans&apos; expérience au CHU de Nantes.
			</p>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
				<Reveal threshold={0.2} delay={0} duration={0.4}>
					<div className="text-left mb-12">
						<h2
							id="faq-title"
							className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
						>
							Questions fréquentes - Diététique
						</h2>
						<p
							id="faq-description"
							className="text-lg text-foreground/80 max-w-2xl mb-6"
						>
							Retrouvez ici les réponses aux questions les plus courantes
							concernant les consultations diététiques.
						</p>
					</div>
				</Reveal>

				<div className="max-w-4xl">
					<Accordion
						type="single"
						collapsible
						className="w-full"
						defaultValue="item-1"
					>
						{FAQ_ITEMS.map((item: FAQItem, index: number) => (
							<AccordionItem
								key={item.id}
								value={item.id}
								itemScope
								itemType="https://schema.org/Question"
								data-faq-item={item.id}
								id={`faq-${item.id}`}
								className="scroll-mt-20 mb-4 rounded-lg overflow-hidden"
							>
								<AccordionTrigger
									className="text-left justify-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md py-6 px-4 bg-background/60 hover:bg-background/80 border border-border/30 hover:border-border/50 transition-all duration-200 shadow-sm hover:shadow-md group"
									aria-describedby={`faq-${item.id}-description`}
								>
									<span
										itemProp="name"
										className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-200 leading-relaxed"
									>
										{item.question}
									</span>
								</AccordionTrigger>
								<AccordionContent
									className="text-left will-change-auto contain-layout bg-background/30 border border-border/20 rounded-b-md"
									itemScope
									itemType="https://schema.org/Answer"
									itemProp="acceptedAnswer"
									style={{
										containIntrinsicSize: "auto 200px", // Prévient CLS
										contentVisibility: index > 2 ? "auto" : "visible", // Lazy render
									}}
								>
									<div id={`faq-${item.id}-description`} className="sr-only">
										Réponse à la question {index + 1} : {item.question}
									</div>
									<div itemProp="text" className="px-4 py-6 space-y-4">
										{item.answer.map(
											(paragraph: string, paragraphIndex: number) => (
												<p
													key={paragraphIndex}
													className="text-foreground/90 leading-relaxed text-sm md:text-base"
												>
													{paragraph}
												</p>
											)
										)}
									</div>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>

				{/* Section bottom CTA */}
				<div className="mt-12 text-center bg-background/50 p-8 rounded-lg border border-border/30">
					<h3 className="text-xl font-semibold text-foreground mb-4">
						❓ Votre question n&apos;est pas listée ?
					</h3>
					<p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
						Contactez-moi directement afin que je réponde à vos interrogations
						sur la diététique et la nutrition.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							href="#contact"
							className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
						>
							Poser ma question
						</Link>
						<Link
							href="tel:+33781515310"
							className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground rounded-md font-medium hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
						>
							📞 Appeler directement
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
