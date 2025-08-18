"use client";

import { useTransition } from "react";
import { useDeleteContactRequest } from "../use-delete-contact-request";

interface DeleteContactRequestButtonProps {
	id: string;
	children: React.ReactNode;
}

export function DeleteContactRequestButton({
	id,
	children,
}: DeleteContactRequestButtonProps) {
	const { dispatch } = useDeleteContactRequest();
	const [, startTransition] = useTransition();

	const handleDelete = () => {
		const formData = new FormData();
		formData.append("id", id);

		startTransition(() => {
			dispatch(formData);
		});
	};

	return <span onClick={handleDelete}>{children}</span>;
}
