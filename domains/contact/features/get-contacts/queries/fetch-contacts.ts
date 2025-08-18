import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/shared/lib/prisma";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { z } from "zod";
import {
	GET_CONTACTS_DEFAULT_PER_PAGE,
	GET_CONTACTS_DEFAULT_SELECT,
	GET_CONTACTS_MAX_RESULTS_PER_PAGE,
} from "../constants";
import { getContactsSchema } from "../schemas";
import { GetContactsReturn } from "../types";
import { buildWhereClause } from "./build-where-clause";

/**
 * Fonction interne qui récupère les demandes de contact
 */
export async function fetchContacts(
	params: z.infer<typeof getContactsSchema>
): Promise<GetContactsReturn> {
	"use cache";

	// Tag de base pour toutes les demandes de contact
	cacheTag(`contacts`);

	// Tag pour la recherche textuelle
	if (params.search) {
		cacheTag(`contacts:search:${params.search}`);
	}

	// Tag pour le tri
	cacheTag(`contacts:sort:${params.sortBy}:${params.sortOrder}`);
	cacheLife({
		revalidate: 60 * 60 * 24,
		stale: 60 * 60 * 24,
		expire: 60 * 60 * 24,
	});

	// Tag pour la pagination
	const page = Math.max(1, Number(params.page) || 1);
	const perPage = Math.min(
		Math.max(1, Number(params.perPage) || GET_CONTACTS_DEFAULT_PER_PAGE),
		GET_CONTACTS_MAX_RESULTS_PER_PAGE
	);
	cacheTag(`contacts:page:${page}:perPage:${perPage}`);

	// Tags pour les filtres dynamiques
	if (params.filters && Object.keys(params.filters).length > 0) {
		Object.entries(params.filters).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				// Pour les filtres multivaleurs (comme les tableaux)
				cacheTag(`contacts:filter:${key}:${value.join(",")}`);
			} else {
				cacheTag(`contacts:filter:${key}:${value}`);
			}
		});
	}

	try {
		// Normalize pagination parameters
		const where = buildWhereClause(params);

		// Get total count with performance tracking
		const total = await prisma.contactRequest.count({ where });

		// Calculate pagination parameters
		const totalPages = Math.ceil(total / perPage);
		const currentPage = Math.min(page, totalPages || 1);
		const skip = (currentPage - 1) * perPage;

		// Ensure sort order is valid
		const sortOrder = params.sortOrder as Prisma.SortOrder;

		// Get data with performance tracking
		const contacts = await prisma.contactRequest.findMany({
			where,
			select: GET_CONTACTS_DEFAULT_SELECT,
			take: perPage,
			skip,
			orderBy: [{ [params.sortBy as string]: sortOrder }],
		});

		// Transforming contacts to match expected return type
		return {
			contacts,
			pagination: {
				page: currentPage,
				perPage,
				total,
				pageCount: totalPages,
			},
		};
	} catch {
		return {
			contacts: [],
			pagination: {
				page: 1,
				perPage: GET_CONTACTS_DEFAULT_PER_PAGE,
				total: 0,
				pageCount: 0,
			},
		};
	}
}
