import { ContactStatus } from "@/app/generated/prisma";
import { z } from "zod";
import { updateMultipleContactRequestStatusSchema } from "../update-multiple-contact-request-status-schema";

export type UpdateMultipleContactRequestStatusReturn = {
	number: number;
	status: ContactStatus;
	shouldClearAll: boolean;
	restoredContactIds: string[];
};

export type UpdateMultipleContactRequestStatusParams = z.infer<
	typeof updateMultipleContactRequestStatusSchema
>;
