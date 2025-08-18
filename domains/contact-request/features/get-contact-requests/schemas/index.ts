import { sortOrderSchema } from "@/shared/schemas";
import { z } from "zod";
import {
	GET_CONTACT_REQUESTS_DEFAULT_SORT_BY,
	GET_CONTACT_REQUESTS_DEFAULT_SORT_ORDER,
} from "../constants";
import { contactRequestFiltersSchema } from "./contact-request-filters-schema";
import { contactRequestSortBySchema } from "./contact-request-sort-by-schema";

export const getContactRequestsSchema = z.object({
	search: z.string().optional(),
	filters: contactRequestFiltersSchema.default({}),
	page: z.number().default(1),
	perPage: z.number().default(10),
	sortBy: contactRequestSortBySchema.default(
		GET_CONTACT_REQUESTS_DEFAULT_SORT_BY
	),
	sortOrder: sortOrderSchema.default(GET_CONTACT_REQUESTS_DEFAULT_SORT_ORDER),
});
