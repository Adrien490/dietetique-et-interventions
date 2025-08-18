"use client";

import { withCallbacks } from "@/shared/utils";
import { useActionState } from "react";
import { toast } from "sonner";
import { createContactRequest } from "./create-contact-request";

interface UseCreateContactRequestFormProps {
	onSuccess?: (message: string) => void;
}

export function useCreateContactRequestForm({
	onSuccess,
}: UseCreateContactRequestFormProps) {
	const [state, dispatch, isPending] = useActionState(
		withCallbacks(createContactRequest, {
			onStart: () => Date.now(),
			onEnd: () => {},
			onSuccess: (data) => {
				if (onSuccess && data.message) {
					onSuccess(data.message);
				} else {
					toast.success(data.message);
				}
			},
			onError: () => {},
		}),
		undefined
	);

	return {
		state,
		dispatch,
		isPending,
	};
}
