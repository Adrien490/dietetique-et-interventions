import { Prisma } from "@/app/generated/prisma";

export const GET_CONTACTS_MAX_RESULTS_PER_PAGE = 100;
export const GET_CONTACTS_DEFAULT_PER_PAGE = 10;

/**
 * Sélection par défaut des champs pour les demandes de contact
 * Optimisée pour correspondre exactement au schéma Prisma et aux besoins de l'interface
 */
export const GET_CONTACTS_DEFAULT_SELECT = {
	// Identifiants et informations de base
	id: true,
	fullName: true,
	email: true,
	subject: true,
	message: true,
	status: true,

	// Métadonnées
	createdAt: true,
	updatedAt: true,

	// Relations avec sélections optimisées
	attachments: {
		select: {
			id: true,
			filename: true,
			url: true,
			createdAt: true,
		},
	},

	user: {
		select: {
			id: true,
			name: true,
			email: true,
		},
	},
} as const satisfies Prisma.ContactRequestSelect;

export const GET_CONTACTS_DEFAULT_SORT_BY = "createdAt";

export const GET_CONTACTS_DEFAULT_SORT_ORDER = "desc";

export const GET_CONTACTS_SORT_FIELDS = [
	"createdAt",
	"status",
	"fullName",
	"email",
] as const;
