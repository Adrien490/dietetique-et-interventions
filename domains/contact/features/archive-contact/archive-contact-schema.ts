import { z } from "zod";

/**
 * Schéma de validation pour l'archivage d'une demande de contact
 */
export const archiveContactSchema = z.object({
	// Identifiants
	id: z.string().min(1, "L'ID de la demande de contact est requis"),
});
