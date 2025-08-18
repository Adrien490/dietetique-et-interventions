"use client";

import { ContactStatus } from "@/app/generated/prisma";
import {
	CONTACT_REQUEST_STATUS_COLORS,
	CONTACT_REQUEST_STATUS_LABELS,
} from "@/domains/contact-request/constants";
import { EmptyState } from "@/shared/components/empty-state";
import { ItemCheckbox } from "@/shared/components/item-checkbox";
import { Pagination } from "@/shared/components/pagination";
import { SelectAllCheckbox } from "@/shared/components/select-all-checkbox";
import { SelectionToolbar } from "@/shared/components/selection-toolbar";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/components/ui/table";
import { Calendar, Mail, Paperclip, User } from "lucide-react";
import { use } from "react";
import { GetContactRequestsReturn } from "../types";
import { ContactRequestActions } from "./contact-request-actions";
import { ContactRequestSelectionActions } from "./contact-request-selection-actions";

export interface ContactRequestDataTableProps {
	contactRequestsPromise: Promise<GetContactRequestsReturn>;
	selectedContactIds: string[];
	isArchivedView: boolean;
}

export function ContactRequestDataTable({
	contactRequestsPromise,
	selectedContactIds,
	isArchivedView,
}: ContactRequestDataTableProps) {
	const response = use(contactRequestsPromise);
	const { contactRequests, pagination } = response;
	const contactIds = contactRequests.map((contactRequest) => contactRequest.id);

	if (contactRequests.length === 0) {
		return (
			<EmptyState
				title="Aucune demande de contact trouvée"
				description="Aucune demande de contact n'a été trouvée."
				className="group-has-[[data-pending]]:animate-pulse py-12"
			/>
		);
	}

	return (
		<Card>
			<CardContent>
				<SelectionToolbar>
					<ContactRequestSelectionActions
						isArchived={isArchivedView}
						selectedContactIds={selectedContactIds}
					/>
				</SelectionToolbar>
				<div className="overflow-x-auto">
					<Table className="group-has-[[data-pending]]:animate-pulse min-w-full">
						<TableHeader>
							<TableRow>
								<TableHead key="select" role="columnheader">
									<SelectAllCheckbox itemIds={contactIds} />
								</TableHead>
								<TableHead key="fullName" role="columnheader">
									Nom complet
								</TableHead>
								<TableHead
									key="email"
									role="columnheader"
									className="hidden md:table-cell"
								>
									Email
								</TableHead>
								<TableHead
									key="subject"
									role="columnheader"
									className="hidden md:table-cell"
								>
									Sujet
								</TableHead>
								<TableHead
									key="status"
									role="columnheader"
									className="hidden md:table-cell"
								>
									Statut
								</TableHead>
								<TableHead
									key="attachments"
									role="columnheader"
									className="hidden lg:table-cell"
								>
									Pièces jointes
								</TableHead>
								<TableHead
									key="createdAt"
									role="columnheader"
									className="hidden lg:table-cell"
								>
									Date de contact
								</TableHead>
								<TableHead key="actions" role="columnheader" className="">
									<></>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{contactRequests.map((contactRequest) => {
								const isArchived =
									contactRequest.status === ContactStatus.ARCHIVED;

								return (
									<TableRow key={contactRequest.id} role="row" tabIndex={0}>
										<TableCell role="gridcell">
											<ItemCheckbox itemId={contactRequest.id} />
										</TableCell>
										<TableCell role="gridcell">
											<div className="min-w-[150px] max-w-[200px] flex flex-col space-y-1">
												<div className="flex items-center gap-2">
													<User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
													<div className="font-medium truncate">
														{contactRequest.fullName}
													</div>
												</div>
											</div>
										</TableCell>
										<TableCell role="gridcell" className="hidden md:table-cell">
											<div className="flex items-center gap-2 min-w-[180px] max-w-[250px]">
												<Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
												<a
													href={`mailto:${contactRequest.email}`}
													className="text-blue-600 hover:underline truncate"
													title={contactRequest.email}
												>
													{contactRequest.email}
												</a>
											</div>
										</TableCell>
										<TableCell role="gridcell" className="hidden md:table-cell">
											<div
												className="min-w-[150px] max-w-[200px] truncate"
												title={contactRequest.subject}
											>
												{contactRequest.subject}
											</div>
										</TableCell>
										<TableCell role="gridcell" className="hidden md:table-cell">
											<Badge
												variant="outline"
												style={{
													backgroundColor: `${
														CONTACT_REQUEST_STATUS_COLORS[
															contactRequest.status as ContactStatus
														]
													}20`,
													color:
														CONTACT_REQUEST_STATUS_COLORS[
															contactRequest.status as ContactStatus
														],
													borderColor: `${
														CONTACT_REQUEST_STATUS_COLORS[
															contactRequest.status as ContactStatus
														]
													}40`,
												}}
											>
												{
													CONTACT_REQUEST_STATUS_LABELS[
														contactRequest.status as ContactStatus
													]
												}
											</Badge>
										</TableCell>
										<TableCell role="gridcell" className="hidden lg:table-cell">
											{contactRequest.attachments.length > 0 ? (
												<div className="flex items-center gap-1">
													<Paperclip className="h-4 w-4 text-muted-foreground" />
													<span className="text-sm">
														{contactRequest.attachments.length}
													</span>
												</div>
											) : (
												<span className="text-sm text-muted-foreground italic">
													Aucune
												</span>
											)}
										</TableCell>
										<TableCell role="gridcell" className="hidden lg:table-cell">
											<div className="flex items-center gap-2 min-w-[100px]">
												<Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
												<span className="text-sm whitespace-nowrap">
													{new Date(
														contactRequest.createdAt
													).toLocaleDateString("fr-FR", {
														day: "2-digit",
														month: "2-digit",
														year: "numeric",
													})}
												</span>
											</div>
										</TableCell>
										<TableCell role="gridcell">
											<div className="flex justify-end">
												<ContactRequestActions
													contactRequest={contactRequest}
													isArchived={isArchived}
												/>
											</div>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TableCell colSpan={8}>
									<Pagination
										total={pagination.total}
										pageCount={pagination.pageCount}
										page={pagination.page}
										perPage={pagination.perPage}
									/>
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
}
