"use client";

import { useTransition } from "react";
import { useArchiveMultipleContacts } from "./use-archive-multiple-contacts";

interface ArchiveMultipleContactsButtonProps {
	ids: string[];
	children: React.ReactNode;
}

export function ArchiveMultipleContactsButton({
	ids,
	children,
}: ArchiveMultipleContactsButtonProps) {
	const { dispatch } = useArchiveMultipleContacts();
	const [, startTransition] = useTransition();

	const handleArchive = () => {
		const formData = new FormData();
		ids.forEach((id) => {
			formData.append("ids", id);
		});

		startTransition(() => {
			dispatch(formData);
		});
	};

	return <span onClick={handleArchive}>{children}</span>;
}
