"use client";

import { ContactRequest } from "@/app/generated/prisma";
import { createToastCallbacks, withCallbacks } from "@/shared/utils";
import { useActionState } from "react";
import { updateContactRequestStatus } from "./update-contact-request-status";
import { updateContactRequestStatusSchema } from "./update-contact-request-status-schema";

export const useUpdateContactRequestStatus = () => {
	const [state, dispatch, isPending] = useActionState(
		withCallbacks(
			updateContactRequestStatus,
			createToastCallbacks<
				ContactRequest,
				typeof updateContactRequestStatusSchema
			>({
				loadingMessage: "Mise à jour du statut du contact en cours...",
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
