"use client";

import { ContactRequest } from "@/app/generated/prisma";
import { useSelectionContext } from "@/shared/contexts";
import { createToastCallbacks, withCallbacks } from "@/shared/utils";
import { useActionState } from "react";
import { toast } from "sonner";
import { updateMultipleContactStatus } from "./update-multiple-contact-status";
import { updateMultipleContactStatusSchema } from "./update-multiple-contact-status-schema";

export const useUpdateMultipleContactStatus = () => {
	const { clearSelection } = useSelectionContext();
	const [state, dispatch, isPending] = useActionState(
		withCallbacks(
			updateMultipleContactStatus,
			createToastCallbacks<
				ContactRequest[],
				typeof updateMultipleContactStatusSchema
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
