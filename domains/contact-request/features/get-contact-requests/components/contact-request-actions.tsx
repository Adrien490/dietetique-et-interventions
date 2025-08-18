import { ContactStatus } from "@/app/generated/prisma";
import { LoadingIndicator } from "@/shared/components/loading-indicator";
import { Button } from "@/shared/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { cn } from "@/shared/utils";
import { MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { CONTACT_REQUEST_STATUS_OPTIONS } from "../../../constants";
import { ArchiveContactRequestAlertDialog } from "../../archive-contact-request/components/archive-contact-request-alert-dialog";
import { DeleteContactRequestAlertDialog } from "../../delete-contact-request/components/delete-contact-request-alert-dialog";
import { UpdateContactRequestStatusButton } from "../../update-contact-request-status";
import { GetContactRequestsReturn } from "../types";

interface ContactRequestActionsProps {
	contactRequest: GetContactRequestsReturn["contactRequests"][number];
	isArchived?: boolean;
}

export function ContactRequestActions({
	contactRequest,
	isArchived,
}: ContactRequestActionsProps) {
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className={cn(
						"h-8 w-8 rounded-full hover:bg-muted focus-visible:bg-muted"
					)}
					aria-label="Menu d'actions"
					type="button"
				>
					<MoreVerticalIcon className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				side="bottom"
				sideOffset={4}
				className="w-48"
			>
				<DropdownMenuItem className="p-0">
					<Link
						href={`/dashboard/contacts/${contactRequest.id}`}
						className="flex w-full items-center px-2 py-1.5"
					>
						Voir les détails
						<LoadingIndicator className="ml-auto h-4 w-4 invisible" />
					</Link>
				</DropdownMenuItem>

				{!isArchived && (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>
								<span>Changer le statut</span>
							</DropdownMenuSubTrigger>
							<DropdownMenuSubContent>
								{CONTACT_REQUEST_STATUS_OPTIONS.filter(
									(status) =>
										status.value !== ContactStatus.ARCHIVED &&
										status.value !== contactRequest.status
								).map((status) => (
									<DropdownMenuItem
										key={status.value}
										className="p-0"
										preventDefault
									>
										<UpdateContactRequestStatusButton
											id={contactRequest.id}
											status={status.value}
										>
											<div className="flex items-center gap-2 px-2 py-1.5 cursor-pointer w-full">
												<div
													className="h-2 w-2 rounded-full"
													style={{ backgroundColor: status.color }}
												/>
												<span>{status.label}</span>
											</div>
										</UpdateContactRequestStatusButton>
									</DropdownMenuItem>
								))}
							</DropdownMenuSubContent>
						</DropdownMenuSub>

						<DropdownMenuItem
							preventDefault
							className="text-destructive focus:text-destructive p-0"
						>
							<ArchiveContactRequestAlertDialog id={contactRequest.id}>
								<span className="w-full text-left px-2 py-1.5">Archiver</span>
							</ArchiveContactRequestAlertDialog>
						</DropdownMenuItem>
					</>
				)}

				{isArchived && (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>
								<span>Restaurer</span>
							</DropdownMenuSubTrigger>
							<DropdownMenuSubContent>
								{CONTACT_REQUEST_STATUS_OPTIONS.filter(
									(status) => status.value !== ContactStatus.ARCHIVED
								).map((status) => (
									<DropdownMenuItem
										className="p-0"
										preventDefault
										key={status.value}
									>
										<UpdateContactRequestStatusButton
											id={contactRequest.id}
											status={status.value}
										>
											<div className="flex items-center gap-2 px-2 py-1.5 cursor-pointer w-full">
												<div
													className="h-2 w-2 rounded-full"
													style={{ backgroundColor: status.color }}
												/>
												<span>{status.label}</span>
											</div>
										</UpdateContactRequestStatusButton>
									</DropdownMenuItem>
								))}
							</DropdownMenuSubContent>
						</DropdownMenuSub>

						<DropdownMenuItem
							className="text-destructive focus:text-destructive"
							preventDefault
						>
							<DeleteContactRequestAlertDialog id={contactRequest.id}>
								<span>Supprimer définitivement</span>
							</DeleteContactRequestAlertDialog>
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
