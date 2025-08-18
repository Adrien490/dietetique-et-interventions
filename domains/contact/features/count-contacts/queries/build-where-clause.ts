import { Prisma } from "@/app/generated/prisma";
import { z } from "zod";
import { countContactsSchema } from "../schemas";
import { buildFilterConditions } from "./build-filter-conditions";

/**
 * Construit la clause WHERE pour la requête Prisma de comptage
 * @param params - Paramètres validés de la requête
 * @returns Clause WHERE Prisma complète
 */
export const buildWhereClause = (
	params: z.infer<typeof countContactsSchema>
): Prisma.ContactRequestWhereInput => {
	// Condition de base
	const whereClause: Prisma.ContactRequestWhereInput = {};

	// Ajouter les filtres spécifiques
	if (params.filters && Object.keys(params.filters).length > 0) {
		const filterConditions = buildFilterConditions(params.filters);
		if (filterConditions.length > 0) {
			whereClause.AND = filterConditions;
		}
	}

	return whereClause;
};
