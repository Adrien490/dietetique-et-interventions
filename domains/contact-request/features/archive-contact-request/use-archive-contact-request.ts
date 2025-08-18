"use client";

import { ContactRequest } from "@/app/generated/prisma";
import { useSelectionContext } from "@/shared/contexts/selection-context";
import { createToastCallbacks, withCallbacks } from "@/shared/utils";
import { useActionState } from "react";
import { toast } from "sonner";
import { archiveContactRequest } from "./archive-contact-request";
import { archiveContactRequestSchema } from "./archive-contact-request-schema";

export const useArchiveContactRequest = () => {
	const { clearSelection } = useSelectionContext();
	const [state, dispatch, isPending] = useActionState(
		withCallbacks(
			archiveContactRequest,
			createToastCallbacks<ContactRequest, typeof archiveContactRequestSchema>({
				loadingMessage: "Archivage de la demande de contact en cours...",
				onSuccess: (response) => {
					clearSelection();
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
