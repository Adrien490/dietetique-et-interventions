import { ContactStatus } from "@/app/generated/prisma";
import { z } from "zod";

const filterValueSchema = z.union([
	// Valeurs uniques (chaînes)
	z.nativeEnum(ContactStatus),
	z.string(),

	// Tableaux de valeurs
	z.array(z.nativeEnum(ContactStatus)),
	z.array(z.string()),
]);

// Le schéma accepte des enregistrements dont les valeurs
// peuvent être soit des valeurs uniques, soit des tableaux
const contactFiltersSchema = z.record(filterValueSchema);

export const countContactsSchema = z.object({
	filters: contactFiltersSchema.optional().default({}),
});
