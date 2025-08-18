import { Prisma } from "@/app/generated/prisma";
import { z } from "zod";
import { GET_CONTACT_DEFAULT_SELECT } from "../constants";
import { getContactRequestSchema } from "../schemas/get-contact-request-schema";

export type GetContactReturn = Prisma.ContactRequestGetPayload<{
	select: typeof GET_CONTACT_DEFAULT_SELECT;
}> | null;

export type GetContactParams = z.infer<typeof getContactRequestSchema>;
