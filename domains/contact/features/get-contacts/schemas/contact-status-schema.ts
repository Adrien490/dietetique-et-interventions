import { ContactStatus } from "@/app/generated/prisma";
import { z } from "zod";

export const contactStatusSchema = z.nativeEnum(ContactStatus);
