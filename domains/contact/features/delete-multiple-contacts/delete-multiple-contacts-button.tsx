"use client";

import { useTransition } from "react";
import { useDeleteMultipleContacts } from "./use-delete-multiple-contacts";

interface DeleteMultipleContactsButtonProps {
	ids: string[];
	children: React.ReactNode;
}

export function DeleteMultipleContactsButton({
	ids,
	children,
}: DeleteMultipleContactsButtonProps) {
	const { dispatch } = useDeleteMultipleContacts();

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
