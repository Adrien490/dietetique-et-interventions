"use server";

import { auth } from "@/domains/auth/lib/auth";
import {
	ActionStatus,
	createErrorResponse,
	createValidationErrorResponse,
	ServerAction,
} from "@/shared/types/server-action";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { signInEmailSchema } from "./schemas/sign-in-email-schema";

export const signInEmail: ServerAction<null, typeof signInEmailSchema> = async (
	_,
	formData
) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (session?.user?.id) {
		return createErrorResponse(
			ActionStatus.UNAUTHORIZED,
			"Vous êtes déjà connecté"
		);
	}

	const rawData = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
		callbackURL: formData.get("callbackURL") as string,
	};

	const validation = signInEmailSchema.safeParse(rawData);
	if (!validation.success) {
		return createValidationErrorResponse(
			validation.error.flatten().fieldErrors,
			""
		);
	}

	const { email, password, callbackURL } = validation.data;

	// Better Auth lance une exception APIError en cas d'erreur d'authentification
	let response;
	try {
		response = await auth.api.signInEmail({
			body: {
				email,
				password,
				callbackURL,
			},
			headers: await headers(),
		});
	} catch (error: unknown) {
		// Capturer les erreurs d'authentification de Better Auth
		if (
			error instanceof Error &&
			error.message.includes("Invalid email or password")
		) {
			return createErrorResponse(
				ActionStatus.UNAUTHORIZED,
				"Email ou mot de passe incorrect"
			);
		}
		return createErrorResponse(
			ActionStatus.ERROR,
			"Une erreur est survenue lors de la connexion"
		);
	}

	// Vérifier si la réponse est valide
	if (!response) {
		return createErrorResponse(
			ActionStatus.ERROR,
			"Aucune réponse du service d'authentification"
		);
	}

	// Si la connexion est réussie, effectuer la redirection
	// Le redirect doit être en dehors du try/catch
	redirect(callbackURL);
};
