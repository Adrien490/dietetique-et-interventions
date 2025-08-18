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
import { ArchiveContactButton } from "./archive-contact-request-button";

interface ArchiveContactRequestAlertDialogProps {
	id: string;
	children?: React.ReactNode;
}

export function ArchiveContactRequestAlertDialog({
	id,
	children,
}: ArchiveContactRequestAlertDialogProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Archiver la demande de contact</AlertDialogTitle>
					<AlertDialogDescription>
						Cette action va archiver la demande de contact.
						<br />
						Vous pourrez la restaurer ultérieurement.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Annuler</AlertDialogCancel>
					<ArchiveContactButton id={id}>
						<AlertDialogAction>Archiver</AlertDialogAction>
					</ArchiveContactButton>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
