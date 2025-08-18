"use server";

import { isAdmin } from "@/domains/user/utils/is-admin";
import { prisma } from "@/shared/lib/prisma";
import {
	ActionStatus,
	createErrorResponse,
	createSuccessResponse,
	createValidationErrorResponse,
	ServerAction,
} from "@/shared/types/server-action";
import { revalidateTag } from "next/cache";
import { deleteMultipleContactsSchema } from "./delete-multiple-contacts-schema";

export const deleteMultipleContacts: ServerAction<
	null,
	typeof deleteMultipleContactsSchema
> = async (_, formData) => {
	try {
		// 1. Vérification des droits admin
		if (!(await isAdmin())) {
			return createErrorResponse(
				ActionStatus.UNAUTHORIZED,
				"Vous devez être administrateur pour effectuer cette action"
			);
		}

		// 3. Récupération des données
		const contactIds = formData.getAll("ids") as string[];

		console.log("[DELETE_MULTIPLE_CONTACTS] Form Data:", {
			ids: contactIds,
		});

		// 4. Validation complète des données
		const validation = deleteMultipleContactsSchema.safeParse({
			ids: contactIds,
		});

		if (!validation.success) {
			return createValidationErrorResponse(
				validation.error.flatten().fieldErrors,
				"Validation échouée. Veuillez vérifier votre sélection."
			);
		}

		// 5. Vérification de l'existence des demandes de contact
		const existingContacts = await prisma.contactRequest.findMany({
			where: {
				id: { in: validation.data.ids },
			},
			select: {
				id: true,
			},
		});

		if (existingContacts.length !== validation.data.ids.length) {
			return createErrorResponse(
				ActionStatus.NOT_FOUND,
				"Certaines demandes de contact sont introuvables"
			);
		}

		// 6. Suppression
		await prisma.contactRequest.deleteMany({
			where: {
				id: { in: validation.data.ids },
			},
		});

		// Revalidation du cache
		revalidateTag(`contacts`);
		validation.data.ids.forEach((contactId) => {
			revalidateTag(`contacts:${contactId}`);
		});
		revalidateTag(`contacts:count`);

		return createSuccessResponse(
			null,
			`${validation.data.ids.length} demande(s) de contact supprimée(s) définitivement`
		);
	} catch (error) {
		console.error("[DELETE_MULTIPLE_CONTACTS]", error);
		return createErrorResponse(
			ActionStatus.ERROR,
			"Impossible de supprimer les demandes de contact sélectionnées"
		);
	}
};
