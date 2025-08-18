"use server";

import { isAdmin } from "@/domains/user/utils/is-admin";
import {
	ActionStatus,
	createErrorResponse,
	createSuccessResponse,
} from "@/shared/types/server-action";
import { revalidateTag } from "next/cache";

/**
 * Action serveur pour rafraîchir les demandes de contact
 * Validations :
 * - L'utilisateur doit être authentifié
 * - L'utilisateur doit être admin
 */
export const refreshContacts = async () => {
	try {
		// 1. Vérification des droits admin
		if (!(await isAdmin())) {
			return createErrorResponse(
				ActionStatus.UNAUTHORIZED,
				"Vous devez être administrateur pour effectuer cette action"
			);
		}

		// 3. Invalidation du cache des contacts
		revalidateTag(`contacts`);
		revalidateTag(`contacts:count`);

		// 4. Retour de la réponse de succès
		return createSuccessResponse(
			null,
			`Les demandes de contact ont été rafraîchies avec succès`
		);
	} catch (error) {
		console.error("[REFRESH_CONTACTS]", error);
		return createErrorResponse(
			ActionStatus.ERROR,
			error instanceof Error
				? error.message
				: "Impossible de rafraîchir les demandes de contact"
		);
	}
};
