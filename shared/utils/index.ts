import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export * from "./create-toast-callbacks";
export * from "./with-callbacks";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getUserInitials(
	name?: string | null,
	email?: string | null
): string {
	if (name) {
		return name
			.split(" ")
			.map((word) => word.charAt(0))
			.join("")
			.toUpperCase()
			.slice(0, 2);
	}

	if (email) {
		return email.charAt(0).toUpperCase();
	}

	return "U";
}
