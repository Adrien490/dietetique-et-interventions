"use server";

import { auth } from "@/domains/auth/lib/auth";
import {
	ActionStatus,
	createErrorResponse,
	createSuccessResponse,
	createValidationErrorResponse,
	ServerAction,
} from "@/shared/types/server-action";
import { signUpEmailSchema } from "./sign-up-email-schema";

export const signUpEmail: ServerAction<null, typeof signUpEmailSchema> = async (
	_,
	formData
) => {
	try {
		const rawData = {
			email: formData.get("email") as string,
			password: formData.get("password") as string,
			confirmPassword: formData.get("confirmPassword") as string,
			name: formData.get("name") as string,
		};

		const validation = signUpEmailSchema.safeParse(rawData);
		if (!validation.success) {
			console.log(validation.error.flatten().fieldErrors);
			return createValidationErrorResponse(
				validation.error.flatten().fieldErrors,
				"Données invalides"
			);
		}

		const { email, password, name } = validation.data;

		try {
			const response = await auth.api.signUpEmail({
				body: {
					email,
					password,
					name,
				},
			});

			if (!response) {
				return createErrorResponse(
					ActionStatus.ERROR,
					"Une erreur est survenue lors de l'inscription"
				);
			}

			return createSuccessResponse(null, "Inscription réussie");
		} catch (error) {
			// Vérifier si l'erreur est liée à une redirection Next.js

			const errorMessage =
				error instanceof Error
					? error.message
					: "Une erreur est survenue lors de l'inscription";

			return createErrorResponse(ActionStatus.ERROR, errorMessage);
		}
	} catch (error) {
		const errorMessage =
			error instanceof Error
				? error.message
				: "Une erreur inattendue est survenue";

		return createErrorResponse(ActionStatus.ERROR, errorMessage);
	}
};
