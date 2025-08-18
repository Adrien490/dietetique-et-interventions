"use client";

import { useTransition } from "react";
import { useArchiveContactRequest } from "../use-archive-contact-request";

interface ArchiveContactRequestButtonProps {
	id: string;
	children: React.ReactNode;
}

export function ArchiveContactButton({
	id,
	children,
}: ArchiveContactRequestButtonProps) {
	const { dispatch } = useArchiveContactRequest();
	const [, startTransition] = useTransition();

	const handleArchive = () => {
		const formData = new FormData();
		formData.append("id", id);

		startTransition(() => {
			dispatch(formData);
		});
	};

	return <span onClick={handleArchive}>{children}</span>;
}
