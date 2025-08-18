import { ActionStatus } from "@/shared/types/server-action";
import { useActionState } from "react";
import { signInEmail } from "./sign-in-email";

export function useSignInEmail() {
	const [state, dispatch, isPending] = useActionState(signInEmail, {
		status: ActionStatus.INITIAL,
		message: "",
	});

	return {
		state,
		dispatch,
		isPending,
	};
}
