"use server";

import { render } from "@react-email/render";
import z from "zod";

import { sendEmail } from "@/shared/actions/send-email";
import { ContactEmailTemplate } from "@/shared/components/emails/contact-email-template";
import { subjectOptions } from "@/shared/constants/contact-form-subject-options";
import { prisma } from "@/shared/lib/prisma";
import {
	ActionStatus,
	ServerAction,
	createErrorResponse,
	createSuccessResponse,
	createValidationErrorResponse,
} from "@/shared/types/server-action";
import { createContactRequestSchema } from "./create-contact-request-schema";

const EMAIL = "adrien.poirier49@gmail.com"; // Email de test Resend

export const createContactRequest: ServerAction<
	z.infer<typeof createContactRequestSchema>,
	typeof createContactRequestSchema
> = async (_, formData) => {
	try {
		// Récupération des attachments avec url et name
		const attachments: { url: string; name: string }[] = [];
		let index = 0;

		// Récupérer tous les attachments indexés
		while (true) {
			const url = formData.get(`attachments[${index}].url`) as string;
			const name = formData.get(`attachments[${index}].name`) as string;

			if (!url || !name) break;

			attachments.push({ url, name });
			index++;
		}

		const rawData = {
			fullName: formData.get("fullName") as string,
			email: formData.get("email") as string,
			subject: formData.get("subject") as string,
			message: formData.get("message") as string,
			attachments: attachments,
		};

		// 2. Validation des données avec Zod
		const validation = createContactRequestSchema.safeParse(rawData);
		if (!validation.success) {
			return createValidationErrorResponse(
				validation.error.flatten().fieldErrors,
				"Validation échouée. Veuillez vérifier votre saisie.",
				rawData
			);
		}

		const validatedData = validation.data;
		const subject =
			subjectOptions[validatedData.subject as keyof typeof subjectOptions];

		// 3. Sauvegarde de la demande de contact en base de données
		let contactRequest;
		try {
			contactRequest = await prisma.contactRequest.create({
				data: {
					fullName: validatedData.fullName,
					email: validatedData.email,
					subject: validatedData.subject,
					message: validatedData.message,
					status: "PENDING",
					attachments: {
						create:
							validatedData.attachments?.map((attachment) => ({
								id: crypto.randomUUID(),
								filename: attachment.name,
								url: attachment.url,
							})) || [],
					},
				},
				include: {
					attachments: true,
				},
			});
		} catch (dbError) {
			console.error("Erreur lors de la sauvegarde en base:", dbError);
			return createErrorResponse(
				ActionStatus.ERROR,
				"Erreur lors de l'enregistrement de votre demande. Veuillez réessayer."
			);
		}

		// 4. Envoi de l'email de notification avec le template React
		try {
			if (!EMAIL) {
				return createErrorResponse(
					ActionStatus.ERROR,
					"Erreur lors de l'envoi de votre message. Veuillez réessayer."
				);
			}

			const emailHtml = await render(ContactEmailTemplate(validatedData));

			const email = await sendEmail({
				to: EMAIL,
				subject: `${validatedData.fullName} - ${subject}`,
				html: emailHtml,
				replyTo: validatedData.email,
			});

			if (!email) {
				// En cas d'échec de l'email, on met à jour le statut mais on garde la demande
				await prisma.contactRequest.update({
					where: { id: contactRequest.id },
					data: { status: "PENDING" },
				});

				return createErrorResponse(
					ActionStatus.ERROR,
					"Votre demande a été enregistrée mais l'envoi de l'email a échoué. Nous traiterons votre demande manuellement."
				);
			}

			// Succès complet : email envoyé et demande enregistrée
			await prisma.contactRequest.update({
				where: { id: contactRequest.id },
				data: { status: "PENDING" },
			});

			return createSuccessResponse(
				validatedData,
				"Votre message a été envoyé avec succès. Nous vous recontacterons dans les plus brefs délais."
			);
		} catch (emailError) {
			console.error("Erreur lors de l'envoi de l'email:", emailError);

			// En cas d'erreur email, on garde quand même la demande en base
			await prisma.contactRequest
				.update({
					where: { id: contactRequest.id },
					data: { status: "PENDING" },
				})
				.catch(() => {});

			return createErrorResponse(
				ActionStatus.ERROR,
				"Votre demande a été enregistrée mais l'envoi de l'email a échoué. Nous traiterons votre demande manuellement."
			);
		}
	} catch (error) {
		console.error("[SUBMIT_CONTACT_FORM]", error);
		return createErrorResponse(
			ActionStatus.ERROR,
			"Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer."
		);
	}
};
