"use client";

import { withCallbacks } from "@/shared/utils";
import { useActionState } from "react";
import { toast } from "sonner";
import { contact } from "../actions/contact";

interface UseContactFormProps {
	onSuccess?: (message: string) => void;
}

export function useContactForm({ onSuccess }: UseContactFormProps) {
	const [state, dispatch, isPending] = useActionState(
		withCallbacks(contact, {
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
