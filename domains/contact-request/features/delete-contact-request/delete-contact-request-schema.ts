import { z } from "zod";

export const deleteContactRequestSchema = z.object({
	id: z.string().min(1),
});
