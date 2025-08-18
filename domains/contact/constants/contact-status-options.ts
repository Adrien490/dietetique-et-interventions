import { ContactStatus } from "@/app/generated/prisma";

export const CONTACT_STATUS_LABELS = {
	PENDING: "En attente",
	IN_PROGRESS: "En cours",
	COMPLETED: "Terminé",
	ARCHIVED: "Archivé",
} as const;

export const CONTACT_STATUS_COLORS = {
	PENDING: "#f59e0b",
	IN_PROGRESS: "#3b82f6",
	COMPLETED: "#10b981",
	ARCHIVED: "#6b7280",
} as const;

export const CONTACT_STATUS_OPTIONS = [
	{
		label: CONTACT_STATUS_LABELS.PENDING,
		value: ContactStatus.PENDING,
		color: CONTACT_STATUS_COLORS.PENDING,
	},
	{
		label: CONTACT_STATUS_LABELS.IN_PROGRESS,
		value: ContactStatus.IN_PROGRESS,
		color: CONTACT_STATUS_COLORS.IN_PROGRESS,
	},
	{
		label: CONTACT_STATUS_LABELS.COMPLETED,
		value: ContactStatus.COMPLETED,
		color: CONTACT_STATUS_COLORS.COMPLETED,
	},
	{
		label: CONTACT_STATUS_LABELS.ARCHIVED,
		value: ContactStatus.ARCHIVED,
		color: CONTACT_STATUS_COLORS.ARCHIVED,
	},
] as const;
