"use server";

import { ContactRequest, ContactStatus } from "@/app/generated/prisma";
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
import { archiveContactRequestSchema } from "./archive-contact-request-schema";

export const archiveContactRequest: ServerAction<
	ContactRequest,
	typeof archiveContactRequestSchema
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
		const id = formData.get("id") as string;

		// 4. Validation des données
		const validation = archiveContactRequestSchema.safeParse({
			id,
		});
		if (!validation.success) {
			return createValidationErrorResponse(
				validation.error.flatten().fieldErrors,
				"Validation échouée. Veuillez vérifier votre sélection."
			);
		}

		// 5. Vérification de l'existence de la demande de contact
		const existingContact = await prisma.contactRequest.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				status: true,
				fullName: true,
			},
		});

		if (!existingContact) {
			return createErrorResponse(
				ActionStatus.NOT_FOUND,
				"La demande de contact n'a pas été trouvée"
			);
		}

		// 6. Vérification que la demande n'est pas déjà archivée
		if (existingContact.status === ContactStatus.ARCHIVED) {
			return createErrorResponse(
				ActionStatus.ERROR,
				"Cette demande de contact est déjà archivée"
			);
		}

		// 7. Mise à jour de la demande de contact
		const updatedContact = await prisma.contactRequest.update({
			where: {
				id,
			},
			data: {
				status: ContactStatus.ARCHIVED,
			},
		});

		// 8. Invalidation du cache
		revalidateTag(`contacts:${id}`);
		revalidateTag(`contacts`);
		revalidateTag(`contacts:count`);

		return createSuccessResponse(
			updatedContact,
			`La demande de contact de "${existingContact.fullName}" a été archivée avec succès`
		);
	} catch (error) {
		console.error("[ARCHIVE_CONTACT]", error);
		return createErrorResponse(
			ActionStatus.ERROR,
			"Une erreur est survenue lors de l'archivage de la demande de contact"
		);
	}
};
