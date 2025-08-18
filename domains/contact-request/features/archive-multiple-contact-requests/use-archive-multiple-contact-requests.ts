"use client";

import { ContactRequest } from "@/app/generated/prisma";
import { useSelectionContext } from "@/shared/contexts";
import { createToastCallbacks, withCallbacks } from "@/shared/utils";
import { useActionState } from "react";
import { toast } from "sonner";
import { archiveMultipleContactRequests } from "./archive-multiple-contact-requests";
import { archiveMultipleContactRequestsSchema } from "./archive-multiple-contact-requests-schema";

export const useArchiveMultipleContactRequests = () => {
	const { clearSelection } = useSelectionContext();
	const [state, dispatch, isPending] = useActionState(
		withCallbacks(
			archiveMultipleContactRequests,
			createToastCallbacks<
				ContactRequest[],
				typeof archiveMultipleContactRequestsSchema
			>({
				loadingMessage: "Archivage des demandes de contact en cours...",
				onSuccess: (response) => {
					toast.success(response?.message);
					clearSelection();
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
