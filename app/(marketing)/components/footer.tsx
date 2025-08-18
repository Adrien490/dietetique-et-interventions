import { navbarItems } from "@/shared/constants/navbar-items";
import { cn } from "@/shared/utils";
import { ArrowUp, Heart, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "../../../shared/components/ui/tooltip";

const legalLinks = [
	{ label: "Mentions légales", href: "/legal" },
	{ label: "Confidentialité", href: "/privacy" },
];

// SEO links removed - not user-facing content

export function Footer() {
	return (
		<footer
			className="relative"
			role="contentinfo"
			data-voice-queries="contact diététicienne nantes,coordonnées nutritionniste,sources nutrition officielles"
			data-content-type="footer-business"
			data-ai-category="healthcare-nutrition-footer"
			itemScope
			itemType="https://schema.org/Organization"
		>
			{/* Contenu sr-only pour voice search */}
			<p className="sr-only">
				Footer du site de Manon Chaillou, diététicienne nutritionniste à Nantes.
				Retrouvez les coordonnées de contact, mentions légales et sources
				officielles de nutrition.
			</p>

			{/* Grille de fond subtile */}
			<div className={cn("absolute inset-0 opacity-50")} aria-hidden="true" />

			{/* Dégradé radial pour effet de focus */}
			<div
				className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
				aria-hidden="true"
			/>

			<div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
				{/* Navigation principale */}
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{/* Logo */}
					<div>
						<Link
							href="/"
							className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md p-1 -m-1"
							aria-label="Manon Chaillou - Diététicienne Nutritionniste - Retour à l'accueil"
						>
							<Heart className="h-6 w-6 text-primary" aria-hidden="true" />
							<span className="text-lg font-bold text-foreground">
								Manon Chaillou
							</span>
						</Link>

						<p className="text-sm text-foreground/70">
							Diététicienne Nutritionniste à Nantes
						</p>
					</div>

					{/* Navigation */}
					<nav aria-labelledby="footer-nav-title">
						<h3
							id="footer-nav-title"
							className="font-medium text-foreground mb-3 text-sm"
						>
							Navigation
						</h3>
						<ul className="space-y-2" role="list">
							{navbarItems.map((item, index) => (
								<li key={index} role="listitem">
									<Link
										href={item.href}
										className="text-sm text-foreground/70 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					{/* Section Contact */}
					<div>
						<h3 className="font-medium text-foreground mb-3 text-sm">
							Contact
						</h3>
						<div
							itemProp="contactPoint"
							itemScope
							itemType="https://schema.org/ContactPoint"
							className="space-y-2"
						>
							<div className="flex items-center gap-2 min-w-0 overflow-hidden">
								<Mail
									className="h-3 w-3 text-primary flex-shrink-0"
									aria-hidden="true"
								/>
								<div className="min-w-0 flex-1 overflow-hidden">
									<Tooltip>
										<TooltipTrigger asChild>
											<a
												href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
												itemProp="email"
												className="text-sm text-foreground/70 hover:text-foreground transition-colors block truncate max-w-full"
												aria-label="Envoyer un email à Manon Chaillou"
												aria-describedby="footer-email-tooltip"
											>
												{process.env.NEXT_PUBLIC_EMAIL}
											</a>
										</TooltipTrigger>
										<TooltipContent id="footer-email-tooltip" role="tooltip">
											<p>{process.env.NEXT_PUBLIC_EMAIL}</p>
										</TooltipContent>
									</Tooltip>
								</div>
							</div>

							<div
								itemProp="areaServed"
								itemScope
								itemType="https://schema.org/City"
								className="flex items-center gap-2"
							>
								<MapPin
									className="h-3 w-3 text-primary flex-shrink-0"
									aria-hidden="true"
								/>
								<span className="text-sm text-foreground/70">
									<span itemProp="name">Nantes</span> et environs
								</span>
							</div>
						</div>
					</div>

					{/* Informations légales */}
					<nav aria-labelledby="footer-legal-title">
						<h3
							id="footer-legal-title"
							className="font-medium text-foreground mb-3 text-sm"
						>
							Informations légales
						</h3>
						<ul className="space-y-2" role="list">
							{legalLinks.map((link, index) => (
								<li key={index} role="listitem">
									<Link
										href={link.href}
										className="text-sm text-foreground/70 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>

				{/* Copyright et retour en haut */}
				<div className="pt-6 border-t border-border/30">
					<div className="flex flex-col sm:flex-row justify-between items-center gap-4">
						<p className="text-sm text-foreground/70 text-center sm:text-left">
							© 2025 Manon Diététique. Tous droits réservés.
						</p>
						<Link
							href="#"
							className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm px-2 py-1 -m-1"
							aria-label="Retour en haut de la page"
						>
							<ArrowUp className="h-4 w-4" aria-hidden="true" />
							Retour en haut
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
