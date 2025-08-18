"use client";

import { ContactRequest } from "@/app/generated/prisma";
import { useSelectionContext } from "@/shared/contexts";
import { createToastCallbacks, withCallbacks } from "@/shared/utils";
import { useActionState } from "react";
import { toast } from "sonner";
import { deleteContactRequest } from "./delete-contact-request";
import { deleteContactRequestSchema } from "./delete-contact-request-schema";

export const useDeleteContactRequest = () => {
	const { clearItems } = useSelectionContext();
	const [state, dispatch, isPending] = useActionState(
		withCallbacks(
			deleteContactRequest,
			createToastCallbacks<ContactRequest, typeof deleteContactRequestSchema>({
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
