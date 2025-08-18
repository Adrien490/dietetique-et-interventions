"use server";

import { auth } from "@/domains/auth/lib/auth";
import {
	ActionStatus,
	createErrorResponse,
	createValidationErrorResponse,
	ServerAction,
} from "@/shared/types/server-action";
import console from "console";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { signInSocialSchema } from "./schemas";
import { ResponseState } from "./types";

// Interface pour typer l'erreur de redirection Next.js
interface NextRedirectError extends Error {
	digest?: string;
}

export const signInSocial: ServerAction<
	ResponseState,
	typeof signInSocialSchema
> = async (_, formData) => {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});
		if (session?.user?.id) {
			console.log("⚠️ Utilisateur déjà connecté:", session.user.id);
			return createErrorResponse(
				ActionStatus.UNAUTHORIZED,
				"Vous êtes déjà connecté"
			);
		}

		const rawData = {
			provider: formData.get("provider") as string,
			callbackURL: (formData.get("callbackURL") as string) || "/dashboard",
		};

		const validation = signInSocialSchema.safeParse(rawData);
		if (!validation.success) {
			return createValidationErrorResponse(
				validation.error.flatten().fieldErrors,
				"Données invalides"
			);
		}

		const { provider, callbackURL } = validation.data;

		try {
			const response = await auth.api.signInSocial({
				body: {
					provider,
					callbackURL,
				},
			});

			if (!response) {
				return createErrorResponse(
					ActionStatus.ERROR,
					"Aucune réponse du service d'authentification"
				);
			}
			if (!response.url) {
				return createErrorResponse(
					ActionStatus.ERROR,
					"URL de redirection manquante"
				);
			}

			console.log("✅ Redirection vers:", response.url);

			// La redirection va lancer une erreur NEXT_REDIRECT, c'est normal
			// Next.js utilise cette erreur en interne pour gérer les redirections
			redirect(response.url);
		} catch (error) {
			// Vérifier si l'erreur est liée à une redirection Next.js
			if (
				error instanceof Error &&
				(error.message === "NEXT_REDIRECT" ||
					(error as NextRedirectError).digest?.startsWith("NEXT_REDIRECT"))
			) {
				// Laisser l'erreur de redirection se propager
				throw error;
			}

			const errorMessage =
				error instanceof Error
					? error.message
					: "Une erreur est survenue lors de la connexion";

			console.error("❌ Erreur signInSocial:", error);
			return createErrorResponse(ActionStatus.ERROR, errorMessage);
		}
	} catch (error) {
		// Vérifier si l'erreur est liée à une redirection Next.js
		if (
			error instanceof Error &&
			(error.message === "NEXT_REDIRECT" ||
				(error as NextRedirectError).digest?.startsWith("NEXT_REDIRECT"))
		) {
			// Laisser l'erreur de redirection se propager
			throw error;
		}

		const errorMessage =
			error instanceof Error
				? error.message
				: "Une erreur inattendue est survenue";

		console.error("❌ Erreur globale:", error);
		return createErrorResponse(ActionStatus.ERROR, errorMessage);
	}
};
