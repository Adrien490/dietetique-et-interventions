export interface FAQItem {
	id: string;
	question: string;
	answer: string[];
}

export const FAQ_ITEMS: FAQItem[] = [
	{
		id: "item-1",
		question:
			"Quelle est la différence entre une diététicienne et une nutritionniste ?",
		answer: [
			"Le titre de diététicien(ne) nutritionniste est un titre protégé et reconnu par l'État, accessible après un diplôme spécifique (BTS ou BUT en diététique).",
			"Le terme « nutritionniste » n'est pas réglementé : tout professionnel de santé peut l'utiliser.",
			"Je suis diététicienne-nutritionniste diplômée, avec un numéro RPPS et une formation reconnue.",
		],
	},
	{
		id: "item-2",
		question:
			"Quelle est la différence entre un(e) diététicien(ne) et un médecin nutritionniste ?",
		answer: [
			"Un médecin nutritionniste est un médecin ayant suivi une formation complémentaire en nutrition (DIU ou DU).",
			"Il peut poser un diagnostic médical et prescrire un traitement, ce qui n'est pas le rôle d'un diététicien.",
			"En revanche, le diététicien est le professionnel de référence en éducation nutritionnelle et accompagnement alimentaire.",
			"Les deux professions sont complémentaires.",
		],
	},
	{
		id: "item-3",
		question: "Ai-je besoin d'une prescription médicale pour consulter ?",
		answer: [
			"Non, il est tout à fait possible de consulter une diététicienne sans ordonnance.",
			"Certaines mutuelles peuvent cependant en demander une pour le remboursement éventuel.",
			"N'hésitez pas à vérifier auprès de votre complémentaire santé.",
		],
	},
	{
		id: "item-4",
		question: "Est-ce que les consultations sont remboursées ?",
		answer: [
			"Les consultations diététiques ne sont pas remboursées par la Sécurité Sociale.",
			"Cependant, de nombreuses mutuelles prennent en charge plusieurs séances par an, partiellement ou en totalité.",
			"Une facture vous sera remise pour vos démarches.",
		],
	},
	{
		id: "item-5",
		question: "Combien de séances sont nécessaires ?",
		answer: [
			"Tout dépend de votre objectif, de votre parcours et de votre rythme.",
			"Certaines personnes souhaitent une seule consultation, d'autres un suivi régulier.",
			"Nous choisissons ensemble ce qui vous conviendra le mieux.",
		],
	},
	{
		id: "item-6",
		question:
			"Mon suivi est-il adapté à mon profil particulier ? (sport, végétarisme, troubles digestifs, etc.)",
		answer: [
			"Oui, chaque accompagnement est personnalisé selon vos besoins, vos préférences, votre état de santé et votre mode de vie.",
			"Je m'adapte à votre situation, quel que soit votre profil.",
		],
	},
	{
		id: "item-7",
		question: "Comment se déroule une consultation diététique ?",
		answer: [
			"Lors du bilan initial, nous échangeons sur votre santé, vos habitudes et vos besoins pour définir ensemble des objectifs concrets.",
			"Je vous prodigue des conseils personnalisés, et un compte-rendu écrit vous est envoyé sous 5 jours.",
			"Les consultations de suivi servent à faire le point, ajuster les conseils, et s'adapter à votre évolution.",
		],
	},
];
