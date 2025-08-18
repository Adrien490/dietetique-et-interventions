"use server";

import { ContactRequest } from "@/app/generated/prisma";
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
import { deleteContactRequestSchema } from "./delete-contact-request-schema";

export const deleteContactRequest: ServerAction<
	ContactRequest,
	typeof deleteContactRequestSchema
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
		const rawData = {
			id: formData.get("id") as string,
		};

		console.log("[DELETE_CONTACT] Form Data:", {
			id: rawData.id,
		});

		// 4. Validation complète des données
		const validation = deleteContactRequestSchema.safeParse(rawData);

		if (!validation.success) {
			console.log(validation.error.flatten().fieldErrors);
			return createValidationErrorResponse(
				validation.error.flatten().fieldErrors,
				"Validation échouée. Veuillez vérifier votre saisie."
			);
		}

		// 5. Vérification de l'existence de la demande de contact
		const existingContact = await prisma.contactRequest.findFirst({
			where: {
				id: validation.data.id,
			},
		});

		if (!existingContact) {
			return createErrorResponse(
				ActionStatus.NOT_FOUND,
				"Demande de contact introuvable"
			);
		}

		// 6. Suppression
		await prisma.contactRequest.delete({
			where: { id: validation.data.id },
		});

		// Revalidation du cache avec les mêmes tags que get-contacts
		revalidateTag(`contacts`);
		revalidateTag(`contacts:count`);

		return createSuccessResponse(
			existingContact,
			`Demande de contact de "${existingContact.fullName}" supprimée définitivement`
		);
	} catch (error) {
		console.error("[DELETE_CONTACT]", error);
		return createErrorResponse(
			ActionStatus.ERROR,
			"Impossible de supprimer définitivement la demande de contact"
		);
	}
};
