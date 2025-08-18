import { z } from "zod";
import { countContactsSchema } from "../schemas";

export type CountContactsParams = z.infer<typeof countContactsSchema>;
