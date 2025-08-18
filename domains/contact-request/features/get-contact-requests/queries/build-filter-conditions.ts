import { Prisma } from "@/app/generated/prisma";
import { z } from "zod";
import { contactRequestFiltersSchema } from "../schemas/contact-request-filters-schema";

/**
 * Construit les conditions de filtrage pour les demandes de contact
 * @param filters - Filtres validés
 * @returns Array de conditions AND pour Prisma
 */
export const buildFilterConditions = (
	filters: z.infer<typeof contactRequestFiltersSchema>
): Prisma.ContactRequestWhereInput[] => {
	const conditions: Prisma.ContactRequestWhereInput[] = [];

	// Filtre par statut
	if (filters.status) {
		if (Array.isArray(filters.status)) {
			conditions.push({
				status: {
					in: filters.status,
				},
			});
		} else {
			conditions.push({
				status: filters.status,
			});
		}
	}

	return conditions;
};
