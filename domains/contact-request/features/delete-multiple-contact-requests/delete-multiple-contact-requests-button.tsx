"use client";

import { useTransition } from "react";
import { useDeleteMultipleContactRequests } from "./use-delete-multiple-contact-requests";

interface DeleteMultipleContactRequestsButtonProps {
	ids: string[];
	children: React.ReactNode;
}

export function DeleteMultipleContactsButton({
	ids,
	children,
}: DeleteMultipleContactRequestsButtonProps) {
	const { dispatch } = useDeleteMultipleContactRequests();

	const [, startTransition] = useTransition();

	const handleDelete = () => {
		const formData = new FormData();
		ids.forEach((id) => {
			formData.append("ids", id);
		});

		startTransition(() => {
			dispatch(formData);
		});
	};

	return <span onClick={handleDelete}>{children}</span>;
}
