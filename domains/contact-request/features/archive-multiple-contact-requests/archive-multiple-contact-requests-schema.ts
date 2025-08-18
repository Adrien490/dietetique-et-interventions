import { z } from "zod";

export const archiveMultipleContactRequestsSchema = z.object({
	ids: z.array(z.string()),
});
