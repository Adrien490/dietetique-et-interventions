"use client";

import { useSelectionContext } from "@/shared/contexts/selection-context";
import { createToastCallbacks, withCallbacks } from "@/shared/utils";
import { useActionState } from "react";
import { toast } from "sonner";
import { deleteMultipleContacts } from "./delete-multiple-contacts";
import { deleteMultipleContactsSchema } from "./delete-multiple-contacts-schema";

export const useDeleteMultipleContacts = () => {
	const { clearSelection } = useSelectionContext();

	const [state, dispatch, isPending] = useActionState(
		withCallbacks(
			deleteMultipleContacts,
			createToastCallbacks<null, typeof deleteMultipleContactsSchema>({
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
