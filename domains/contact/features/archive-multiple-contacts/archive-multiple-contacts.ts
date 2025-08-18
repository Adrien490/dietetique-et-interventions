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
import { archiveMultipleContactsSchema } from "./archive-multiple-contacts-schema";

export const archiveMultipleContacts: ServerAction<
	ContactRequest[],
	typeof archiveMultipleContactsSchema
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
		const ids = formData.getAll("ids") as string[];

		// 4. Validation des données
		const validation = archiveMultipleContactsSchema.safeParse({
			ids,
		});
		if (!validation.success) {
			return createValidationErrorResponse(
				validation.error.flatten().fieldErrors,
				"Validation échouée. Veuillez vérifier votre sélection."
			);
		}

		// 5. Vérification de l'existence des contacts
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
				email: true,
			},
		});

		if (existingContacts.length !== validation.data.ids.length) {
			return createErrorResponse(
				ActionStatus.NOT_FOUND,
				"Un ou plusieurs contacts n'ont pas été trouvés"
			);
		}

		// 6. Filtrer les contacts qui ne sont pas déjà archivés
		const contactsToArchive = existingContacts.filter(
			(contact) => contact.status !== ContactStatus.ARCHIVED
		);

		if (contactsToArchive.length === 0) {
			return createErrorResponse(
				ActionStatus.ERROR,
				"Tous les contacts sélectionnés sont déjà archivés"
			);
		}

		// 7. Mise à jour des contacts
		await prisma.contactRequest.updateMany({
			where: {
				id: {
					in: contactsToArchive.map((contact) => contact.id),
				},
			},
			data: {
				status: ContactStatus.ARCHIVED,
			},
		});

		// 8. Récupération des contacts mis à jour
		const updatedContacts = await prisma.contactRequest.findMany({
			where: {
				id: {
					in: contactsToArchive.map((contact) => contact.id),
				},
			},
		});

		// 9. Invalidation du cache
		for (const id of validation.data.ids) {
			revalidateTag(`contacts:${id}`);
		}
		revalidateTag(`contacts`);

		// 10. Message de succès personnalisé
		const message = `${contactsToArchive.length} contact(s) ont été archivé(s) avec succès`;

		return createSuccessResponse(updatedContacts, message);
	} catch (error) {
		console.error("[ARCHIVE_MULTIPLE_CONTACTS]", error);
		return createErrorResponse(
			ActionStatus.ERROR,
			"Une erreur est survenue lors de l'archivage des contacts"
		);
	}
};
