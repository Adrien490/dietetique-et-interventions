"use client";

import { ContactRequest } from "@/app/generated/prisma";
import { useSelectionContext } from "@/shared/contexts";
import { createToastCallbacks, withCallbacks } from "@/shared/utils";
import { useActionState } from "react";
import { toast } from "sonner";
import { updateMultipleContactRequestStatus } from "./update-multiple-contact-request-status";
import { updateMultipleContactRequestStatusSchema } from "./update-multiple-contact-request-status-schema";

export const useUpdateMultipleContactRequestStatus = () => {
	const { clearSelection } = useSelectionContext();
	const [state, dispatch, isPending] = useActionState(
		withCallbacks(
			updateMultipleContactRequestStatus,
			createToastCallbacks<
				ContactRequest[],
				typeof updateMultipleContactRequestStatusSchema
			>({
				loadingMessage: "Mise à jour du statut en cours...",
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
