import { z } from "zod";
import { archiveMultipleContactRequestsSchema } from "../archive-multiple-contact-requests-schema";

export type ArchiveMultipleContactRequestsReturn = {
	number: number;
	shouldClearAll: boolean;
};

export type ArchiveMultipleContactRequestsSchema = z.infer<
	typeof archiveMultipleContactRequestsSchema
>;
