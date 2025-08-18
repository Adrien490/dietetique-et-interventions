import { GraduationCap, Heart, Search } from "lucide-react";

export interface AboutStep {
	id: number;
	icon: React.ReactNode;
	title: string;
	description: string[];
}

export const ABOUT_STEPS: AboutStep[] = [
	{
		id: 1,
		icon: <GraduationCap className="h-6 w-6" />,
		title: "Mon parcours",
		description: [
			"J'ai obtenu un Bachelor Universitaire de Technologie en Génie Biologique – parcours Diététique et Nutrition à Nancy, une formation reconnue par l'État permettant d'exercer légalement en tant que diététicienne nutritionniste.",
			"Je suis également titulaire d'un Diplôme Universitaire en Éducation Thérapeutique du Patient, qui enrichit ma pratique d'une approche éducative et collaborative.",
			"J'ai d'abord exercé en milieu hospitalier (cardiologie, obésité, gériatrie, pédiatrie, interventions à domicile).",
			"Aujourd'hui, je travaille aussi en libéral, pour accompagner chacun au plus près de son quotidien, avec des changements concrets et durables.",
		],
	},
	{
		id: 2,
		icon: <Heart className="h-6 w-6" />,
		title: "Mes valeurs",
		description: [
			"Mon accompagnement repose sur des valeurs humaines fortes : la bienveillance, l'écoute, l'adaptation. Je propose une approche sans restriction, sans calculs, sans rien d'imposé ou de drastique (hors cas de prescription médicale).",
			"Je veille à proposer des conseils simples, concrets, applicables, qui tiennent compte de votre réalité : des outils qui s'inscrivent dans la durée, et qui peuvent évoluer avec vous.",
		],
	},
	{
		id: 3,
		icon: <Search className="h-6 w-6" />,
		title: "Mon approche",
		description: [
			"Mon approche est individuelle, personnalisée et fondée sur des bases scientifiques solides.",
			"Je m'appuie sur les recommandations actualisées des sociétés savantes et des organismes de référence en nutrition et santé publique : pas de régimes à la mode, ni de croyances alimentaires.",
			"J'intègre également une approche comportementale, centrée sur la relation de confiance et la compréhension de votre histoire alimentaire… Mais aussi de vos valeurs et de vos contraintes.",
			"Chaque suivi est adapté à vos besoins réels et individuels, pour avancer vers une alimentation durable, éclairée et apaisée.",
		],
	},
];
