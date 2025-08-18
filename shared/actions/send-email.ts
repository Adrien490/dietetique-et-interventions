"use server";

import { ReactElement } from "react";
import { Resend } from "resend";

interface SendEmailOptions {
	to: string | string[];
	subject: string;
	html?: string;
	react?: ReactElement;
	from?: string;
	replyTo?: string;
	attachmentUrl?: string;
}

export async function sendEmail(options: SendEmailOptions) {
	try {
		const { to, subject, html, react, from, replyTo, attachmentUrl } = options;

		// Validation des données requises
		if (!to || !subject) {
			throw new Error("Destinataire et sujet sont requis");
		}

		if (!html && !react) {
			throw new Error("Contenu HTML ou template React requis");
		}

		// Vérification des variables d'environnement
		const resendApiKey = process.env.RESEND_API_KEY;
		if (!resendApiKey) {
			throw new Error(
				"RESEND_API_KEY n'est pas défini dans les variables d'environnement"
			);
		}

		// Configuration de l'expéditeur
		let fromEmail = from;
		if (!fromEmail) {
			// Si pas de domaine Resend configuré, utiliser l'email par défaut
			const customDomain = process.env.RESEND_DOMAIN;
			if (customDomain) {
				fromEmail = `noreply@${customDomain}`;
			} else {
				// Email par défaut Resend (fonctionne sans domaine vérifié)
				fromEmail = "onboarding@resend.dev";
			}
		}

		// Initialisation de Resend
		const resend = new Resend(resendApiKey);

		// Préparation des données d'envoi
		const emailData = {
			from: fromEmail,
			to: Array.isArray(to) ? to : [to],
			subject,
			text: "Veuillez afficher ce message dans un client email qui supporte le HTML.", // Fallback texte requis
			replyTo,
			attachmentUrl,
		} as const;

		// Ajout du contenu (HTML ou React)
		const finalEmailData = react
			? { ...emailData, react }
			: { ...emailData, html };

		// Envoi de l'email
		const { error } = await resend.emails.send(finalEmailData);

		if (error) {
			console.error("Erreur Resend:", error);
			throw new Error(
				`Erreur lors de l'envoi de l'email: ${error.message || error}`
			);
		}

		return {
			success: true,
		};
	} catch (error) {
		console.error("Erreur server action send-email:", error);
		throw error;
	}
}
