"use client";

import { ContactStatus } from "@/app/generated/prisma";
import { useTransition } from "react";
import { useUpdateContactStatus } from "./use-update-contact-status";

interface UpdateContactStatusButtonProps {
	id: string;
	status: ContactStatus;
	children: React.ReactNode;
}

export function UpdateContactStatusButton({
	id,
	status,
	children,
}: UpdateContactStatusButtonProps) {
	const { dispatch } = useUpdateContactStatus();
	const [, startTransition] = useTransition();

	const handleUpdateStatus = () => {
		const formData = new FormData();
		formData.append("id", id);
		formData.append("status", status);

		startTransition(() => {
			dispatch(formData);
		});
	};

	return <span onClick={handleUpdateStatus}>{children}</span>;
}
