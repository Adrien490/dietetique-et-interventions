"use client";

import { ContactStatus } from "@/app/generated/prisma";
import { useTransition } from "react";
import { useUpdateMultipleContactStatus } from "./use-update-multiple-contact-status";

interface UpdateMultipleContactStatusButtonProps {
	ids: string[];
	status: ContactStatus;
	children: React.ReactNode;
}

export function UpdateMultipleContactStatusButton({
	ids,
	status,
	children,
}: UpdateMultipleContactStatusButtonProps) {
	const { dispatch } = useUpdateMultipleContactStatus();
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
