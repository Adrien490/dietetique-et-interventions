import { ContactStatus, Prisma } from "@/app/generated/prisma";
import {
	GET_CONTACT_REQUESTS_SORT_FIELDS,
	getContactRequests,
} from "@/domains/contact-request/features/get-contact-requests";

import {
	ContactRequestDataTable,
	ContactRequestDataTableSkeleton,
	ContactRequestFilterSheet,
} from "@/domains/contact-request/features/get-contact-requests/components";
import { RefreshContactRequestsButton } from "@/domains/contact-request/features/refresh-contact-requests";

import { PageContainer } from "@/shared/components/page-container";
import { PageHeader } from "@/shared/components/page-header";
import { SearchForm } from "@/shared/components/search-form";
import { SortingOptionsDropdown } from "@/shared/components/sorting-options-dropdown";
import { Toolbar } from "@/shared/components/toolbar";
import { Button } from "@/shared/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { Trash2, Undo2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

type PageProps = {
	searchParams: Promise<{
		selected?: string[];
		perPage?: string;
		page?: string;
		sortBy?: string;
		sortOrder?: Prisma.SortOrder;
		search?: string;
		status?: ContactStatus | ContactStatus[];
	}>;
};

export default async function ContactsPage({ searchParams }: PageProps) {
	const { perPage, page, sortBy, sortOrder, search, status, selected } =
		await searchParams;

	const selectedContactIds = !Array.isArray(selected)
		? selected
			? [selected]
			: []
		: (selected.filter(Boolean) as string[]);

	// Construire les filtres selon le schéma attendu
	// Par défaut, afficher seulement les contacts non-archivés
	const filters = {
		status:
			status ||
			(Object.values(ContactStatus).filter(
				(s) => s !== ContactStatus.ARCHIVED
			) as ContactStatus[]),
	};

	const activeFiltersCount = status ? 1 : 0;
	const isArchivedView = status === ContactStatus.ARCHIVED;

	return (
		<PageContainer className="group pb-12">
			<PageHeader
				title="Contacts"
				description="Gérez vos demandes de contact et communications"
			/>

			<Toolbar>
				<SearchForm
					paramName="search"
					placeholder="Rechercher..."
					className="flex-1 shrink-0"
				/>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<RefreshContactRequestsButton />
						</TooltipTrigger>
						<TooltipContent>
							<p>Rafraîchir la liste des demandes de contact</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<SortingOptionsDropdown
					sortFields={[
						{
							label: "Date de création",
							value: "createdAt",
						},
						{
							label: "Statut",
							value: "status",
						},
						{
							label: "Nom complet",
							value: "fullName",
						},
						{
							label: "Email",
							value: "email",
						},
					]}
					defaultSortBy="createdAt"
					defaultSortOrder="desc"
					className="w-[200px] shrink-0"
				/>

				{!isArchivedView && (
					<ContactRequestFilterSheet
						activeFiltersCount={activeFiltersCount}
						isArchivedView={isArchivedView}
					/>
				)}

				{isArchivedView ? (
					<Button variant="default" className="shrink-0" asChild>
						<Link href={`/dashboard/contacts`}>
							<Undo2 className="h-4 w-4 mr-2" />
							Voir tous les contacts
						</Link>
					</Button>
				) : (
					<Button variant="outline" className="shrink-0" asChild>
						<Link href={`/dashboard/contacts?status=${ContactStatus.ARCHIVED}`}>
							<Trash2 className="h-4 w-4 mr-2" />
							Voir les contacts archivés
						</Link>
					</Button>
				)}
			</Toolbar>

			<Suspense fallback={<ContactRequestDataTableSkeleton />}>
				<ContactRequestDataTable
					isArchivedView={isArchivedView}
					selectedContactIds={selectedContactIds}
					contactRequestsPromise={getContactRequests({
						perPage: Number(perPage) || 10,
						page: Number(page) || 1,
						sortBy: sortBy as (typeof GET_CONTACT_REQUESTS_SORT_FIELDS)[number],
						sortOrder: sortOrder as Prisma.SortOrder,
						search,
						filters,
					})}
				/>
			</Suspense>
		</PageContainer>
	);
}
