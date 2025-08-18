"use client";

import { useSelectionContext } from "@/shared/contexts/selection-context";
import { createToastCallbacks, withCallbacks } from "@/shared/utils";
import { useActionState } from "react";
import { toast } from "sonner";
import { deleteMultipleContactRequests } from "./delete-multiple-contact-requests";
import { deleteMultipleContactRequestsSchema } from "./delete-multiple-contact-requests-schema";

export const useDeleteMultipleContactRequests = () => {
	const { clearSelection } = useSelectionContext();

	const [state, dispatch, isPending] = useActionState(
		withCallbacks(
			deleteMultipleContactRequests,
			createToastCallbacks<null, typeof deleteMultipleContactRequestsSchema>({
				loadingMessage: "Suppression des demandes de contact en cours...",
				onSuccess: (data) => {
					clearSelection();
					toast.success(data?.message);
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
