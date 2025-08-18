import { Prisma } from "@/app/generated/prisma";

/**
 * Construit les conditions de recherche textuelle pour les demandes de contact
 * @param search - Terme de recherche
 * @returns Array de conditions OR pour Prisma
 */
export const buildSearchConditions = (
	search: string
): Prisma.ContactRequestWhereInput[] => {
	const searchTerm = search.trim();
	
	if (!searchTerm) {
		return [];
	}

	return [
		// Recherche dans le nom complet
		{
			fullName: {
				contains: searchTerm,
				mode: "insensitive",
			},
		},
		// Recherche dans l'email
		{
			email: {
				contains: searchTerm,
				mode: "insensitive",
			},
		},
		// Recherche dans le sujet
		{
			subject: {
				contains: searchTerm,
				mode: "insensitive",
			},
		},
		// Recherche dans le message
		{
			message: {
				contains: searchTerm,
				mode: "insensitive",
			},
		},
	];
};
