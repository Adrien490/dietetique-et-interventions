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
import { updateContactStatusSchema } from "./update-contact-status-schema";

export const updateContactStatus: ServerAction<
	ContactRequest,
	typeof updateContactStatusSchema
> = async (_, formData) => {
	try {
		// 1. Vérification des droits admin
		if (!(await isAdmin())) {
			return createErrorResponse(
				ActionStatus.UNAUTHORIZED,
				"Vous devez être administrateur pour effectuer cette action"
			);
		}

		// 2. Récupération des données
		const id = formData.get("id") as string;
		const status = formData.get("status") as ContactStatus;

		// 3. Validation des données
		const validation = updateContactStatusSchema.safeParse({
			id,
			status,
		});
		if (!validation.success) {
			return createValidationErrorResponse(
				validation.error.flatten().fieldErrors,
				"Validation échouée. Veuillez vérifier votre sélection."
			);
		}

		// 4. Vérification de l'existence du contact
		const existingContact = await prisma.contactRequest.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				status: true,
				fullName: true,
				email: true,
			},
		});

		if (!existingContact) {
			return createErrorResponse(
				ActionStatus.NOT_FOUND,
				"Le contact n'a pas été trouvé"
			);
		}

		// 5. Vérification que le statut est différent
		if (existingContact.status === validation.data.status) {
			return createErrorResponse(
				ActionStatus.ERROR,
				`Le contact a déjà le statut "${validation.data.status}"`
			);
		}

		// 6. Mise à jour du contact
		const updatedContact = await prisma.contactRequest.update({
			where: {
				id,
			},
			data: {
				status: validation.data.status,
			},
		});

		// 7. Invalidation du cache
		revalidateTag(`contacts:${id}`);
		revalidateTag(`contacts`);
		revalidateTag(`contacts:count`);

		// 8. Message de succès personnalisé
		const statusLabels: Record<ContactStatus, string> = {
			[ContactStatus.PENDING]: "en attente",
			[ContactStatus.IN_PROGRESS]: "en cours",
			[ContactStatus.COMPLETED]: "traité",
			[ContactStatus.ARCHIVED]: "archivé",
		};

		const statusText = statusLabels[validation.data.status];
		const message = `Le contact de "${existingContact.fullName}" a été marqué comme ${statusText} avec succès`;

		return createSuccessResponse(updatedContact, message);
	} catch (error) {
		console.error("[UPDATE_CONTACT_STATUS]", error);
		return createErrorResponse(
			ActionStatus.ERROR,
			"Une erreur est survenue lors de la mise à jour du statut"
		);
	}
};
