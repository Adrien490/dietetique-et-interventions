import { z } from "zod";
import { archiveMultipleContactsSchema } from "../archive-multiple-contacts-schema";

export type ArchiveMultipleContactsReturn = {
	number: number;
	shouldClearAll: boolean;
};

export type ArchiveMultipleContactsSchema = z.infer<
	typeof archiveMultipleContactsSchema
>;
