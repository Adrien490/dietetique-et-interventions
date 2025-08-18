"use client";

import { useTransition } from "react";
import { useArchiveMultipleContactRequests } from "./use-archive-multiple-contact-requests";

interface ArchiveMultipleContactRequestsButtonProps {
	ids: string[];
	children: React.ReactNode;
}

export function ArchiveMultipleContactRequestsButton({
	ids,
	children,
}: ArchiveMultipleContactRequestsButtonProps) {
	const { dispatch } = useArchiveMultipleContactRequests();
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
