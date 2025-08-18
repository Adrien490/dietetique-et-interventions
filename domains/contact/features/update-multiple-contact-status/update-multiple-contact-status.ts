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
import { updateMultipleContactStatusSchema } from "./update-multiple-contact-status-schema";

export const updateMultipleContactStatus: ServerAction<
	ContactRequest[],
	typeof updateMultipleContactStatusSchema
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
		const ids = formData.getAll("ids") as string[];
		const status = formData.get("status") as ContactStatus;

		// 3. Validation des données
		const validation = updateMultipleContactStatusSchema.safeParse({
			ids,
			status,
		});
		if (!validation.success) {
			return createValidationErrorResponse(
				validation.error.flatten().fieldErrors,
				"Validation échouée. Veuillez vérifier votre sélection."
			);
		}

		// 4. Vérification de l'existence des contacts
		const existingContacts = await prisma.contactRequest.findMany({
			where: {
				id: {
					in: validation.data.ids,
				},
			},
			select: {
				id: true,
				status: true,
				fullName: true,
			},
		});

		if (existingContacts.length !== validation.data.ids.length) {
			return createErrorResponse(
				ActionStatus.NOT_FOUND,
				"Un ou plusieurs contacts n'ont pas été trouvés"
			);
		}

		// 5. Filtrer les contacts qui ont déjà le bon statut
		const contactsToUpdate = existingContacts.filter(
			(contact) => contact.status !== validation.data.status
		);

		if (contactsToUpdate.length === 0) {
			return createErrorResponse(
				ActionStatus.ERROR,
				`Tous les contacts sélectionnés ont déjà le statut "${validation.data.status}"`
			);
		}

		// 6. Mise à jour des contacts
		await prisma.contactRequest.updateMany({
			where: {
				id: {
					in: contactsToUpdate.map((contact) => contact.id),
				},
			},
			data: {
				status: validation.data.status,
			},
		});

		// 7. Récupération des contacts mis à jour
		const updatedContacts = await prisma.contactRequest.findMany({
			where: {
				id: {
					in: validation.data.ids,
				},
			},
		});

		// 8. Invalidation du cache
		for (const id of validation.data.ids) {
			revalidateTag(`contacts:${id}`);
		}
		revalidateTag(`contacts`);
		revalidateTag(`contacts:count`);

		// 9. Message de succès personnalisé
		const statusLabels: Record<ContactStatus, string> = {
			[ContactStatus.PENDING]: "en attente",
			[ContactStatus.IN_PROGRESS]: "en cours",
			[ContactStatus.COMPLETED]: "traités",
			[ContactStatus.ARCHIVED]: "archivés",
		};

		const statusText = statusLabels[validation.data.status];
		const message = `${contactsToUpdate.length} contact(s) ont été marqués comme ${statusText} avec succès`;

		return createSuccessResponse(updatedContacts, message);
	} catch (error) {
		console.error("[UPDATE_MULTIPLE_CONTACT_STATUS]", error);
		return createErrorResponse(
			ActionStatus.ERROR,
			"Une erreur est survenue lors de la mise à jour du statut"
		);
	}
};
