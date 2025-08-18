import {
	Brain,
	Calculator,
	ChefHat,
	Coffee,
	Megaphone,
	Trophy,
} from "lucide-react";

export const PRESTATIONS_GROUPE = [
	{
		title: "Sensation alimentaire et équilibre",
		description:
			"Comprendre les enjeux de l'alimentation cachés derrière les sensations alimentaires, et s'approprier les recommandations de fréquences et portions avec des repères.",
		icon: <Brain className="w-8 h-8" aria-hidden="true" />,
	},
	{
		title: "Gestion de l'alimentation",
		description:
			"Budget, prévision des menus, lecture d'étiquette, stockage... Mise à jour des stratégies de gestion de l'alimentation au quotidien.",
		icon: <Calculator className="w-8 h-8" aria-hidden="true" />,
	},
	{
		title: "Atelier cuisine",
		description:
			"Atelier ludique de découverte de techniques culinaires de base, avec ou sans thématiques.",
		icon: <ChefHat className="w-8 h-8" aria-hidden="true" />,
	},
	{
		title: "Alimentation et performance",
		description:
			"Sportifs professionnels ou amateurs, équipes de travail ; tout le monde a besoin d'une alimentation adaptée pour rester performant et atteindre les sommets.",
		icon: <Trophy className="w-8 h-8" aria-hidden="true" />,
	},
	{
		title: "Petit-déjeuner de champion",
		description:
			"Particulièrement adapté aux enfants et à leurs parents, atelier interactif pour favoriser la composition d'un petit-déjeuner complet et équilibré.",
		icon: <Coffee className="w-8 h-8" aria-hidden="true" />,
	},
	{
		title: "Campagnes de sensibilisation et prévention",
		description:
			"Semaine de la dénutrition, Semaine du goût, Semaine d'information sur la Santé Mentale, Octobre rose, Journée mondiale du Diabète…",
		icon: <Megaphone className="w-8 h-8" aria-hidden="true" />,
	},
] as const;
