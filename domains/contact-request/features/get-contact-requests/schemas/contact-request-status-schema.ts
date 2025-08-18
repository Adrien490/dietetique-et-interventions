import { ContactStatus } from "@/app/generated/prisma";
import { z } from "zod";

export const contactRequestStatusSchema = z.nativeEnum(ContactStatus);
