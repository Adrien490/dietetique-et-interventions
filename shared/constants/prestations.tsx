import { Heart, Scale, Stethoscope, Users } from "lucide-react";

export const PRESTATIONS = [
	{
		title: "Équilibre alimentaire & poids",
		description:
			"Optimisation de vos choix alimentaires durablement pour atteindre vos objectifs : perte, prise, stabilisation du poids.",
		icon: <Scale className="w-8 h-8" aria-hidden="true" />,
	},
	{
		title: "Alimentation de la femme",
		description:
			"Grossesse, allaitement, ménopause, troubles hormonaux… Conseils alimentaires personnalisés pour vivre sereinement ces périodes de vie.",
		icon: <Heart className="w-8 h-8" aria-hidden="true" />,
	},
	{
		title: "Dénutrition & perte d'appétit",
		description:
			"Solutions simples, concrètes et adaptées pour prévenir et lutter contre la perte de poids involontaire.",
		icon: <Users className="w-8 h-8" aria-hidden="true" />,
	},
	{
		title: "Alimentation & pathologies",
		description:
			"Recommandations fiables pour conjuguer maladie et plaisir de manger (diabète, troubles digestifs et cardiaques, MICI, intolérances, allergies…)",
		icon: <Stethoscope className="w-8 h-8" aria-hidden="true" />,
	},
];
