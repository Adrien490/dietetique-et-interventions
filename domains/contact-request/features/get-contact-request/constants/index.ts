import { Prisma } from "@/app/generated/prisma";

/**
 * Sélection par défaut des champs pour une demande de contact
 * Optimisée pour correspondre exactement aux besoins de la vue détail
 */
export const GET_CONTACT_DEFAULT_SELECT = {
	id: true,
	fullName: true,
	email: true,
	subject: true,
	message: true,
	status: true,

	attachments: {
		select: {
			id: true,
			filename: true,
			url: true,
			createdAt: true,
			updatedAt: true,
		},
	},

	user: {
		select: {
			id: true,
			name: true,
			email: true,
		},
	},

	createdAt: true,
	updatedAt: true,
} as const satisfies Prisma.ContactRequestSelect;
