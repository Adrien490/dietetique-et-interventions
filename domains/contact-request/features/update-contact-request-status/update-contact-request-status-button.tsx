"use client";

import { ContactStatus } from "@/app/generated/prisma";
import { useTransition } from "react";
import { useUpdateContactRequestStatus } from "./use-update-contact-request-status";

interface UpdateContactRequestStatusButtonProps {
	id: string;
	status: ContactStatus;
	children: React.ReactNode;
}

export function UpdateContactRequestStatusButton({
	id,
	status,
	children,
}: UpdateContactRequestStatusButtonProps) {
	const { dispatch } = useUpdateContactRequestStatus();
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
