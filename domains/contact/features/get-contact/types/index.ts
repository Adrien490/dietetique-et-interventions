import { Prisma } from "@/app/generated/prisma";
import { z } from "zod";
import { GET_CONTACT_DEFAULT_SELECT } from "../constants";
import { getContactSchema } from "../schemas/get-contact-schema";

export type GetContactReturn = Prisma.ContactRequestGetPayload<{
	select: typeof GET_CONTACT_DEFAULT_SELECT;
}> | null;

export type GetContactParams = z.infer<typeof getContactSchema>;
