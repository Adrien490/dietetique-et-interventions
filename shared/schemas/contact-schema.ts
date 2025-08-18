import { z } from "zod";

export const contactSchema = z.object({
	fullName: z
		.string()
		.min(1, "Le nom et prénom sont requis")
		.min(2, "Le nom et prénom doivent contenir au moins 2 caractères")
		.regex(
			/^[a-zA-ZÀ-ÿ\s-']+$/,
			"Le nom et prénom ne doivent contenir que des lettres"
		),

	email: z
		.string()
		.min(1, "L'email est requis")
		.email("Format d'email invalide (exemple: nom@domaine.com)"),

	subject: z.string().min(1, "Veuillez sélectionner le motif de votre demande"),

	message: z
		.string()
		.min(1, "Le message est requis")
		.min(10, "Le message doit contenir au moins 10 caractères")
		.max(2000, "Le message ne peut pas dépasser 2000 caractères"),

	attachments: z
		.array(
			z.object({
				url: z.string().url("L'URL du fichier doit être valide"),
				name: z.string().min(1, "Le nom du fichier est requis"),
			})
		)
		.max(3, "Maximum 3 pièces jointes autorisées")
		.default([]),
});

export type ContactFormData = z.infer<typeof contactSchema>;
