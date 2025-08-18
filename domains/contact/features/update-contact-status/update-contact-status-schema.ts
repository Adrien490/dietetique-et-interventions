import { ContactStatus } from "@/app/generated/prisma";
import { z } from "zod";

export const updateContactStatusSchema = z.object({
	id: z.string().min(1, "L'ID est requis"),
	status: z.nativeEnum(ContactStatus, {
		errorMap: () => ({ message: "Statut invalide" }),
	}),
});
