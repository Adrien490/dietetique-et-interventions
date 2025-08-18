"use client";

import { ContactStatus } from "@/app/generated/prisma";
import { useTransition } from "react";
import { useUpdateMultipleContactRequestStatus } from "./use-update-multiple-contact-request-status";

interface UpdateMultipleContactRequestStatusButtonProps {
	ids: string[];
	status: ContactStatus;
	children: React.ReactNode;
}

export function UpdateMultipleContactRequestStatusButton({
	ids,
	status,
	children,
}: UpdateMultipleContactRequestStatusButtonProps) {
	const { dispatch } = useUpdateMultipleContactRequestStatus();
	const [, startTransition] = useTransition();

	const handleUpdateStatus = () => {
		const formData = new FormData();

		ids.forEach((id) => {
			formData.append("ids", id);
		});

		formData.append("status", status);

		startTransition(() => {
			dispatch(formData);
		});
	};

	return <span onClick={handleUpdateStatus}>{children}</span>;
}
