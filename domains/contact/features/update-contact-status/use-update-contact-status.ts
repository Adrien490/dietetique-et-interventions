"use client";

import { ContactRequest } from "@/app/generated/prisma";
import { createToastCallbacks, withCallbacks } from "@/shared/utils";
import { useActionState } from "react";
import { updateContactStatus } from "./update-contact-status";
import { updateContactStatusSchema } from "./update-contact-status-schema";

export const useUpdateContactStatus = () => {
	const [state, dispatch, isPending] = useActionState(
		withCallbacks(
			updateContactStatus,
			createToastCallbacks<ContactRequest, typeof updateContactStatusSchema>({
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
