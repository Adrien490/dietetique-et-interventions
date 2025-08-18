import { withCallbacks } from "@/shared/utils";
import { useActionState } from "react";
import { toast } from "sonner";
import { signUpEmail } from "./sign-up-email";

export function useSignUpEmail() {
	const [state, dispatch, isPending] = useActionState(
		withCallbacks(signUpEmail, {
			onSuccess: (data) => {
				toast.success(data?.message, {
					duration: 3000,
				});
			},
		}),
		undefined
	);

	return {
		state,
		dispatch,
		isPending,
	};
}
