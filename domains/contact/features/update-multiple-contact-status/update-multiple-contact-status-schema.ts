import { ContactStatus } from "@/app/generated/prisma";
import { z } from "zod";

export const updateMultipleContactStatusSchema = z.object({
	ids: z.array(z.string().min(1, "ID du contact requis")),
	status: z.nativeEnum(ContactStatus, {
		required_error: "Le statut est requis",
		invalid_type_error: "Statut invalide",
	}),
});
