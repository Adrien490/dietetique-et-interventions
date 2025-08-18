"use server";

import { isAdmin } from "@/domains/user/utils/is-admin";
import { z } from "zod";
import { countContactsSchema } from "../schemas";
import { fetchCount } from "./fetch-count";

/**
 * Compte le nombre de demandes de contact selon les critères de filtrage
 * @param params - Paramètres validés par countContactsSchema
 * @returns Nombre de demandes de contact
 */
export async function countContacts(
	params: z.infer<typeof countContactsSchema>
): Promise<number> {
	try {
		// Vérification des droits admin (seuls les admins peuvent voir les demandes de contact)
		if (!(await isAdmin())) {
			return 0;
		}

		// Appel à la fonction
		return await fetchCount(params);
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error("Invalid parameters");
		}

		throw error;
	}
}
