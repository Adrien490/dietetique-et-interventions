import { prisma } from "@/shared/lib/prisma";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { z } from "zod";
import { GET_CONTACT_DEFAULT_SELECT } from "../constants";
import { getContactRequestSchema } from "../schemas/get-contact-request-schema";

/**
 * Fonction interne cacheable qui récupère une demande de contact
 */
export async function fetchContactRequest(
	params: z.infer<typeof getContactRequestSchema>
) {
	"use cache";

	// Tag de base pour toutes les demandes de contact
	cacheTag(`contact-requests:${params.id}`);
	cacheLife({
		revalidate: 60 * 60 * 24,
		stale: 60 * 60 * 24,
		expire: 60 * 60 * 24,
	});

	try {
		const contact = await prisma.contactRequest.findFirst({
			where: {
				id: params.id,
			},
			select: GET_CONTACT_DEFAULT_SELECT,
		});

		if (!contact) {
			return null;
		}

		return contact;
	} catch (error) {
		console.error("[FETCH_CONTACT]", error);
		throw new Error("Failed to fetch contact");
	}
}
