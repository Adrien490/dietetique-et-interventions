import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
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
import { CONTACT_STATUS_OPTIONS } from "../../../constants";
import { ArchiveMultipleContactsButton } from "../../archive-multiple-contacts";
import { DeleteMultipleContactsButton } from "../../delete-multiple-contacts";
import { UpdateMultipleContactStatusButton } from "../../update-multiple-contact-status";

interface ContactSelectionActionsProps {
	selectedContactIds: string[];
	isArchived?: boolean;
}

export function ContactSelectionActions({
	selectedContactIds,
	isArchived,
}: ContactSelectionActionsProps) {
	return (
		<DropdownMenu>
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
				{!isArchived ? (
					<>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>
								<span>Changer le statut</span>
							</DropdownMenuSubTrigger>
							<DropdownMenuSubContent>
								{CONTACT_STATUS_OPTIONS.filter(
									(status) => status.value !== "ARCHIVED"
								).map((status) => (
									<AlertDialog key={status.value}>
										<AlertDialogTrigger asChild>
											<DropdownMenuItem preventDefault>
												<div className="flex items-center gap-2">
													<div
														className="h-2 w-2 rounded-full"
														style={{ backgroundColor: status.color }}
													/>
													<span>{status.label}</span>
												</div>
											</DropdownMenuItem>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>
													Changer le statut de {selectedContactIds.length}{" "}
													contact(s)
												</AlertDialogTitle>
												<AlertDialogDescription>
													Vous êtes sur le point de changer le statut de{" "}
													{selectedContactIds.length} contact(s) en &apos;
													{status.label}
													&apos;.
													<br />
													Cette action est réversible.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Annuler</AlertDialogCancel>
												<UpdateMultipleContactStatusButton
													ids={selectedContactIds}
													status={status.value}
												>
													<AlertDialogAction>Confirmer</AlertDialogAction>
												</UpdateMultipleContactStatusButton>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								))}
							</DropdownMenuSubContent>
						</DropdownMenuSub>
						<DropdownMenuSeparator />
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<DropdownMenuItem
									preventDefault
									className="text-destructive focus:text-destructive"
								>
									<span>Archiver</span>
								</DropdownMenuItem>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle className="text-destructive">
										Êtes-vous sûr de vouloir archiver ces contacts ?
									</AlertDialogTitle>
									<AlertDialogDescription>
										Cette action va archiver {selectedContactIds.length}{" "}
										contact(s).
										<br />
										Vous pourrez les restaurer ultérieurement.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Annuler</AlertDialogCancel>
									<ArchiveMultipleContactsButton ids={selectedContactIds}>
										<AlertDialogAction>Archiver</AlertDialogAction>
									</ArchiveMultipleContactsButton>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</>
				) : (
					<>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>
								<span>Restaurer</span>
							</DropdownMenuSubTrigger>
							<DropdownMenuSubContent>
								{CONTACT_STATUS_OPTIONS.filter(
									(status) => status.value !== "ARCHIVED"
								).map((status) => (
									<AlertDialog key={status.value}>
										<AlertDialogTrigger asChild>
											<DropdownMenuItem preventDefault>
												<div className="flex items-center gap-2">
													<div
														className="h-2 w-2 rounded-full"
														style={{ backgroundColor: status.color }}
													/>
													<span>{status.label}</span>
												</div>
											</DropdownMenuItem>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>
													Restaurer {selectedContactIds.length} contact(s)
												</AlertDialogTitle>
												<AlertDialogDescription>
													Vous êtes sur le point de restaurer{" "}
													{selectedContactIds.length} contact(s) archivé(s) en
													&apos;
													{status.label}&apos;.
													<br />
													Cette action est réversible.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Annuler</AlertDialogCancel>
												<UpdateMultipleContactStatusButton
													ids={selectedContactIds}
													status={status.value}
												>
													<AlertDialogAction>Restaurer</AlertDialogAction>
												</UpdateMultipleContactStatusButton>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								))}
							</DropdownMenuSubContent>
						</DropdownMenuSub>
						<DropdownMenuSeparator />
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<DropdownMenuItem
									preventDefault
									className="text-destructive focus:text-destructive"
								>
									<span>Supprimer définitivement</span>
								</DropdownMenuItem>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle className="text-destructive">
										Êtes-vous sûr de vouloir supprimer définitivement ces
										contacts ?
									</AlertDialogTitle>
									<AlertDialogDescription>
										Cette action va supprimer définitivement{" "}
										{selectedContactIds.length} contact(s) archivé(s).
										<br />
										Cette action est irréversible.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Annuler</AlertDialogCancel>
									<DeleteMultipleContactsButton ids={selectedContactIds}>
										<AlertDialogAction>Supprimer</AlertDialogAction>
									</DeleteMultipleContactsButton>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
