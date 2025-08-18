import { ContactStatus } from "@/app/generated/prisma";
import { z } from "zod";
import { updateMultipleContactStatusSchema } from "../update-multiple-contact-status-schema";

export type UpdateMultipleContactStatusReturn = {
	number: number;
	status: ContactStatus;
	shouldClearAll: boolean;
	restoredContactIds: string[];
};

export type UpdateMultipleContactStatusSchema = z.infer<
	typeof updateMultipleContactStatusSchema
>;
