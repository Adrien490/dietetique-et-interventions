"use server";

import { isAdmin } from "@/domains/user/utils/is-admin";
import { z } from "zod";
import { getContactRequestSchema } from "../schemas/get-contact-request-schema";
import { GetContactReturn } from "../types";
import { fetchContactRequest } from "./fetch-contact-request";

/**
 * Récupère les détails d'une demande de contact spécifique
 * Gère l'authentification et les accès avant d'appeler la fonction cacheable
 */
export async function getContactRequest(
	params: z.infer<typeof getContactRequestSchema>
): Promise<GetContactReturn> {
	// Vérification des droits admin (seuls les admins peuvent voir les demandes de contact)
	if (!(await isAdmin())) {
		throw new Error("Forbidden - Admin access required");
	}

	// Validation des paramètres
	const validation = getContactRequestSchema.safeParse(params);
	if (!validation.success) {
		throw new Error("Invalid parameters");
	}

	const validatedParams = validation.data;

	// Appel à la fonction cacheable
	return fetchContactRequest(validatedParams);
}
