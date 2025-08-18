"use client";
import { useActionState } from "react";
import { refreshContactRequests } from "./refresh-contact-requests";

export const useRefreshContactRequests = () => {
	const [state, dispatch, isPending] = useActionState(
		refreshContactRequests,
		undefined
	);

	return {
		state,
		dispatch,
		isPending,
	};
};
