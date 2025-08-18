import { Prisma } from "@/app/generated/prisma";
import { z } from "zod";
import { GET_CONTACT_REQUESTS_DEFAULT_SELECT } from "../constants";
import { getContactRequestsSchema } from "../schemas";

export type GetContactRequestsReturn = {
	contactRequests: Array<
		Prisma.ContactRequestGetPayload<{
			select: typeof GET_CONTACT_REQUESTS_DEFAULT_SELECT;
		}>
	>;
	pagination: {
		page: number;
		perPage: number;
		total: number;
		pageCount: number;
	};
};

export type GetContactRequestsParams = z.infer<typeof getContactRequestsSchema>;
