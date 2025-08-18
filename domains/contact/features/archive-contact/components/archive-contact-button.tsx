"use client";

import { useTransition } from "react";
import { useArchiveContact } from "../use-archive-contact";

interface ArchiveContactButtonProps {
	id: string;
	children: React.ReactNode;
}

export function ArchiveContactButton({
	id,
	children,
}: ArchiveContactButtonProps) {
	const { dispatch } = useArchiveContact();
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
