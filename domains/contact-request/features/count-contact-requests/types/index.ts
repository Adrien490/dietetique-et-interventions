import { z } from "zod";
import { countContactRequestsSchema } from "../schemas";

export type CountContactRequestsParams = z.infer<
	typeof countContactRequestsSchema
>;
