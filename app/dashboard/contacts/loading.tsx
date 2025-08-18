import { ContactRequestDataTableSkeleton } from "@/domains/contact-request/features/get-contact-requests/components";
import { PageContainer } from "@/shared/components/page-container";
import { PageHeader } from "@/shared/components/page-header";
import { Toolbar } from "@/shared/components/toolbar";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function ContactsLoading() {
	return (
		<PageContainer className="group pb-12">
			<PageHeader
				title="Contacts"
				description="Gérez vos demandes de contact et communications"
			/>

			<Toolbar>
				{/* SearchForm skeleton */}
				<Skeleton className="h-9 w-64 flex-1 shrink-0" />

				{/* RefreshContactsButton skeleton */}
				<Skeleton className="h-9 w-9 shrink-0" />

				{/* SortingOptionsDropdown skeleton */}
				<Skeleton className="h-9 w-[200px] shrink-0" />

				{/* ContactFilterSheet skeleton */}
				<Skeleton className="h-9 w-20 shrink-0" />

				{/* Archive/Unarchive button skeleton */}
				<Skeleton className="h-9 w-40 shrink-0" />
			</Toolbar>

			<ContactRequestDataTableSkeleton />
		</PageContainer>
	);
}
