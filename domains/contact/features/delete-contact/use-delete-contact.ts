"use client";

import { ContactRequest } from "@/app/generated/prisma";
import { useSelectionContext } from "@/shared/contexts";
import { createToastCallbacks, withCallbacks } from "@/shared/utils";
import { useActionState } from "react";
import { toast } from "sonner";
import { deleteContact } from "./delete-contact";
import { deleteContactSchema } from "./delete-contact-schema";

export const useDeleteContact = () => {
	const { clearItems } = useSelectionContext();
	const [state, dispatch, isPending] = useActionState(
		withCallbacks(
			deleteContact,
			createToastCallbacks<ContactRequest, typeof deleteContactSchema>({
				loadingMessage: "Suppression de la demande de contact en cours...",
				onSuccess: (response) => {
					if (response?.data) {
						clearItems([response.data.id]);
					}
					toast.success(response.message);
				},
			})
		),
		undefined
	);

	return {
		state,
		dispatch,
		isPending,
	};
};
