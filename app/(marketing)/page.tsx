import { Metadata } from "next";
import { About } from "./components/about";
import { Contact } from "./components/contact";
import { FAQ } from "./components/faq";
import { Hero } from "./components/hero";
import { Services } from "./components/services";

export const metadata: Metadata = {
	title: "Diététicienne Nutritionniste à Nantes - Manon Chaillou",
	description:
		"Manon Chaillou, diététicienne nutritionniste diplômée à Nantes. Consultation personnalisée, rééquilibrage alimentaire, nutrition cardiologie. Prise de rendez-vous en ligne.",
	keywords: [
		"diététicienne Nantes",
		"nutritionniste Nantes",
		"consultation diététique Nantes",
		"rééquilibrage alimentaire Nantes",
		"nutrition cardiologie Nantes",
		"accompagnement obésité Nantes",
		"perte de poids Nantes",
		"nutrition thérapeutique",
		"diététique Loire-Atlantique",
		"rendez-vous nutritionniste Nantes",
		"consultation nutritionnelle personnalisée",
		"diététicienne diplômée Nantes",
		"cabinet diététique Nantes",
		"nutrition clinique Nantes",
		"suivi nutritionnel Nantes",
		"régime alimentaire personnalisé",
		"consultation diététique en ligne",
		"prise en charge nutritionnelle",
	],
};

export default function Home() {
	return (
		<>
			<Hero />
			<About />
			<Services />
			<Contact />
			<FAQ />
		</>
	);
}
