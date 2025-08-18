import { Prisma } from "@/app/generated/prisma";
import { z } from "zod";
import { GET_CONTACTS_DEFAULT_SELECT } from "../constants";
import { getContactsSchema } from "../schemas";

export type GetContactsReturn = {
	contacts: Array<
		Prisma.ContactRequestGetPayload<{ select: typeof GET_CONTACTS_DEFAULT_SELECT }>
	>;
	pagination: {
		page: number;
		perPage: number;
		total: number;
		pageCount: number;
	};
};

export type GetContactsParams = z.infer<typeof getContactsSchema>;
