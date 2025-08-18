import { ContactStatus, Prisma } from "@/app/generated/prisma";
import { z } from "zod";
import { countContactRequestsSchema } from "../schemas";

/**
 * Construit les conditions de filtrage pour les demandes de contact
 * @param filters - Filtres validés
 * @returns Array de conditions AND pour Prisma
 */
export const buildFilterConditions = (
	filters: z.infer<typeof countContactRequestsSchema>["filters"]
): Prisma.ContactRequestWhereInput[] => {
	const conditions: Prisma.ContactRequestWhereInput[] = [];

	if (!filters) return conditions;

	Object.entries(filters).forEach(([key, value]) => {
		if (key === "status" && value) {
			if (Array.isArray(value)) {
				conditions.push({
					status: {
						in: value as ContactStatus[],
					},
				});
			} else {
				conditions.push({
					status: value as ContactStatus,
				});
			}
		}
	});

	return conditions;
};
