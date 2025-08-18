import { z } from "zod";
import { contactRequestStatusSchema } from "./contact-request-status-schema";

export const contactRequestFiltersSchema = z.object({
	status: z
		.union([contactRequestStatusSchema, z.array(contactRequestStatusSchema)])
		.optional(),
});
