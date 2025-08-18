import { Prisma } from "@/app/generated/prisma";
import { z } from "zod";
import { getContactsSchema } from "../schemas";
import { buildFilterConditions } from "./build-filter-conditions";
import { buildSearchConditions } from "./build-search-conditions";

/**
 * Construit la clause WHERE pour la requête Prisma
 * @param params - Paramètres validés de la requête
 * @returns Clause WHERE Prisma complète
 */
export const buildWhereClause = (
	params: z.infer<typeof getContactsSchema>
): Prisma.ContactRequestWhereInput => {
	// Condition de base
	const whereClause: Prisma.ContactRequestWhereInput = {};

	// Ajouter les conditions de recherche textuelle
	if (typeof params.search === "string" && params.search.trim()) {
		whereClause.OR = buildSearchConditions(params.search);
	}

	// Ajouter les filtres spécifiques
	if (params.filters && Object.keys(params.filters).length > 0) {
		const filterConditions = buildFilterConditions(params.filters);
		if (filterConditions.length > 0) {
			whereClause.AND = filterConditions;
		}
	}

	return whereClause;
};
