"use client";
import { useActionState } from "react";
import { refreshContacts } from "./refresh-contacts";

export const useRefreshContacts = () => {
	const [state, dispatch, isPending] = useActionState(
		refreshContacts,
		undefined
	);

	return {
		state,
		dispatch,
		isPending,
	};
};
