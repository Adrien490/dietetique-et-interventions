"use client";

import { ContactRequest } from "@/app/generated/prisma";
import { useSelectionContext } from "@/shared/contexts";
import { createToastCallbacks, withCallbacks } from "@/shared/utils";
import { useActionState } from "react";
import { toast } from "sonner";
import { archiveMultipleContacts } from "./archive-multiple-contacts";
import { archiveMultipleContactsSchema } from "./archive-multiple-contacts-schema";

export const useArchiveMultipleContacts = () => {
	const { clearSelection } = useSelectionContext();
	const [state, dispatch, isPending] = useActionState(
		withCallbacks(
			archiveMultipleContacts,
			createToastCallbacks<
				ContactRequest[],
				typeof archiveMultipleContactsSchema
			>({
				loadingMessage: "Archivage des contacts en cours...",
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
