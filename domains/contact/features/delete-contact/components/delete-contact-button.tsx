"use client";

import { useTransition } from "react";
import { useDeleteContact } from "../use-delete-contact";

interface DeleteContactButtonProps {
	id: string;
	children: React.ReactNode;
}

export function DeleteContactButton({
	id,
	children,
}: DeleteContactButtonProps) {
	const { dispatch } = useDeleteContact();
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
