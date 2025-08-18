import { z } from "zod";
import { contactStatusSchema } from "./contact-status-schema";

export const contactFiltersSchema = z.object({
	status: z
		.union([contactStatusSchema, z.array(contactStatusSchema)])
		.optional(),
});
