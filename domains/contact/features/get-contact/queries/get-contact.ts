"use server";

import { isAdmin } from "@/domains/user/utils/is-admin";
import { z } from "zod";
import { getContactSchema } from "../schemas/get-contact-schema";
import { GetContactReturn } from "../types";
import { fetchContact } from "./fetch-contact";

/**
 * Récupère les détails d'une demande de contact spécifique
 * Gère l'authentification et les accès avant d'appeler la fonction cacheable
 */
export async function getContact(
	params: z.infer<typeof getContactSchema>
): Promise<GetContactReturn> {
	// Vérification des droits admin (seuls les admins peuvent voir les demandes de contact)
	if (!(await isAdmin())) {
		throw new Error("Forbidden - Admin access required");
	}

	// Validation des paramètres
	const validation = getContactSchema.safeParse(params);
	if (!validation.success) {
		throw new Error("Invalid parameters");
	}

	const validatedParams = validation.data;

	// Appel à la fonction cacheable
	return fetchContact(validatedParams);
}
