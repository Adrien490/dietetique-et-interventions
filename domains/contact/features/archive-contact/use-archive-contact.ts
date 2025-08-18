"use client";

import { ContactRequest } from "@/app/generated/prisma";
import { useSelectionContext } from "@/shared/contexts/selection-context";
import { createToastCallbacks, withCallbacks } from "@/shared/utils";
import { useActionState } from "react";
import { toast } from "sonner";
import { archiveContact } from "./archive-contact";
import { archiveContactSchema } from "./archive-contact-schema";

export const useArchiveContact = () => {
	const { clearSelection } = useSelectionContext();
	const [state, dispatch, isPending] = useActionState(
		withCallbacks(
			archiveContact,
			createToastCallbacks<ContactRequest, typeof archiveContactSchema>({
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
