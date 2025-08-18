import { z } from "zod";
import {
	GET_CONTACT_REQUESTS_DEFAULT_SORT_BY,
	GET_CONTACT_REQUESTS_SORT_FIELDS,
} from "../constants";

export const contactRequestSortBySchema = z.preprocess((val) => {
	return typeof val === "string" &&
		GET_CONTACT_REQUESTS_SORT_FIELDS.includes(
			val as (typeof GET_CONTACT_REQUESTS_SORT_FIELDS)[number]
		)
		? val
		: GET_CONTACT_REQUESTS_DEFAULT_SORT_BY;
}, z.enum(GET_CONTACT_REQUESTS_SORT_FIELDS));
