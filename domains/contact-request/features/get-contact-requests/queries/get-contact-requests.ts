"use server";

import { isAdmin } from "@/domains/user/utils/is-admin";
import { z } from "zod";
import { getContactRequestsSchema } from "../schemas";
import { GetContactRequestsReturn } from "../types";
import { fetchContactRequests } from "./fetch-contact-requests";

/**
 * Récupère la liste des demandes de contact avec pagination, filtrage et recherche
 * @param params - Paramètres validés par getContactsSchema
 * @returns Liste des demandes de contact et informations de pagination
 */
export async function getContactRequests(
	params: z.infer<typeof getContactRequestsSchema>
): Promise<GetContactRequestsReturn> {
	try {
		// Vérification des droits admin (seuls les admins peuvent voir les demandes de contact)
		if (!(await isAdmin())) {
			return {
				contactRequests: [],
				pagination: {
					total: 0,
					page: 1,
					perPage: 10,
					pageCount: 0,
				},
			};
		}

		const validation = getContactRequestsSchema.safeParse(params);

		if (!validation.success) {
			throw new Error("Invalid parameters");
		}

		const validatedParams = validation.data;

		return await fetchContactRequests(validatedParams);
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error("Invalid parameters");
		}

		throw error;
	}
}
