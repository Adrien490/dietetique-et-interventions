import { ContactStatus } from "@/app/generated/prisma";
import { CONTACT_STATUS_OPTIONS } from "@/domains/contact/constants";
import { ArchiveContactAlertDialog } from "@/domains/contact/features/archive-contact/components/archive-contact-alert-dialog";
import { DeleteContactAlertDialog } from "@/domains/contact/features/delete-contact/components/delete-contact-alert-dialog";

import { UpdateContactStatusButton } from "@/domains/contact/features/update-contact-status/update-contact-status-button";
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
import { GetContactsReturn } from "../types";

interface ContactActionsProps {
	contact: GetContactsReturn["contacts"][number];
	isArchived?: boolean;
}

export function ContactActions({ contact, isArchived }: ContactActionsProps) {
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
						href={`/dashboard/contacts/${contact.id}`}
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
								{CONTACT_STATUS_OPTIONS.filter(
									(status) =>
										status.value !== ContactStatus.ARCHIVED &&
										status.value !== contact.status
								).map((status) => (
									<DropdownMenuItem
										key={status.value}
										className="p-0"
										preventDefault
									>
										<UpdateContactStatusButton
											id={contact.id}
											status={status.value}
										>
											<div className="flex items-center gap-2 px-2 py-1.5 cursor-pointer w-full">
												<div
													className="h-2 w-2 rounded-full"
													style={{ backgroundColor: status.color }}
												/>
												<span>{status.label}</span>
											</div>
										</UpdateContactStatusButton>
									</DropdownMenuItem>
								))}
							</DropdownMenuSubContent>
						</DropdownMenuSub>

						<DropdownMenuItem
							preventDefault
							className="text-destructive focus:text-destructive p-0"
						>
							<ArchiveContactAlertDialog id={contact.id}>
								<span className="w-full text-left px-2 py-1.5">Archiver</span>
							</ArchiveContactAlertDialog>
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
								{CONTACT_STATUS_OPTIONS.filter(
									(status) => status.value !== ContactStatus.ARCHIVED
								).map((status) => (
									<DropdownMenuItem
										className="p-0"
										preventDefault
										key={status.value}
									>
										<UpdateContactStatusButton
											id={contact.id}
											status={status.value}
										>
											<div className="flex items-center gap-2 px-2 py-1.5 cursor-pointer w-full">
												<div
													className="h-2 w-2 rounded-full"
													style={{ backgroundColor: status.color }}
												/>
												<span>{status.label}</span>
											</div>
										</UpdateContactStatusButton>
									</DropdownMenuItem>
								))}
							</DropdownMenuSubContent>
						</DropdownMenuSub>

						<DropdownMenuItem
							className="text-destructive focus:text-destructive"
							preventDefault
						>
							<DeleteContactAlertDialog id={contact.id}>
								<span>Supprimer définitivement</span>
							</DeleteContactAlertDialog>
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
