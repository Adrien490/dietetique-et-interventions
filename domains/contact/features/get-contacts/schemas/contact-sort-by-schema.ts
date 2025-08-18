import { z } from "zod";
import {
	GET_CONTACTS_DEFAULT_SORT_BY,
	GET_CONTACTS_SORT_FIELDS,
} from "../constants";

export const contactSortBySchema = z.preprocess((val) => {
	return typeof val === "string" &&
		GET_CONTACTS_SORT_FIELDS.includes(
			val as (typeof GET_CONTACTS_SORT_FIELDS)[number]
		)
		? val
		: GET_CONTACTS_DEFAULT_SORT_BY;
}, z.enum(GET_CONTACTS_SORT_FIELDS));
