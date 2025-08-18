import { BarChart3, FileText, MessageCircle } from "lucide-react";

export function getSidebarNav() {
	return [
		{
			title: "Tableau de bord",
			url: "/dashboard",
			icon: BarChart3,
		},
		{
			title: "Contacts",
			url: "/dashboard/contacts",
			icon: MessageCircle,
		},
		{
			title: "Devis",
			url: "/dashboard/quotes",
			icon: FileText,
		},
	];
}
