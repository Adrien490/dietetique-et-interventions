import { z } from "zod";

export const archiveMultipleContactsSchema = z.object({
	ids: z.array(z.string()),
});
