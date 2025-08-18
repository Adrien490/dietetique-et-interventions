import { prisma } from "@/shared/lib/prisma";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { z } from "zod";
import { countContactsSchema } from "../schemas";
import { buildWhereClause } from "./build-where-clause";

/**
 * Fonction interne qui compte les demandes de contact
 */
export async function fetchCount(
	params: z.infer<typeof countContactsSchema>
): Promise<number> {
	"use cache";

	// Tag de base pour toutes les demandes de contact
	cacheTag(`contacts:count`);

	// Tags pour les filtres dynamiques
	if (params.filters && Object.keys(params.filters).length > 0) {
		Object.entries(params.filters).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				// Pour les filtres multivaleurs (comme les tableaux)
				cacheTag(`contacts:filter:${key}:${value.join(",")}:count`);
			} else {
				cacheTag(`contacts:filter:${key}:${value}:count`);
			}
		});
	}

	// Définir la durée de vie du cache
	cacheLife({
		revalidate: 60 * 60, // Revalidate after 1 hour
		stale: 60 * 5, // Stale after 5 minutes
		expire: 60 * 60 * 24, // Expire after 1 day
	});

	try {
		// Validation des paramètres
		const validation = countContactsSchema.safeParse(params);
		if (!validation.success) {
			throw new Error("Invalid parameters");
		}

		const validatedParams = validation.data;
		const where = buildWhereClause(validatedParams);

		// Compter le nombre de demandes de contact
		const count = await prisma.contactRequest.count({ where });

		return count;
	} catch (error) {
		console.error("[COUNT_CONTACTS]", error);
		return 0;
	}
}
