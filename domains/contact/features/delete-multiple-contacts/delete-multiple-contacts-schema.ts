import { z } from "zod";

export const deleteMultipleContactsSchema = z.object({
	ids: z
		.array(z.string())
		.min(1, "Sélectionnez au moins une demande de contact"),
});
