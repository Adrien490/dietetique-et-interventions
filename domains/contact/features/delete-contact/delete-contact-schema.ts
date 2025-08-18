import { z } from "zod";

export const deleteContactSchema = z.object({
	id: z.string().min(1),
});
