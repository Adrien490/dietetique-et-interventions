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
import { DeleteContactRequestButton } from "./delete-contact-request-button";

interface DeleteContactRequestAlertDialogProps {
	id: string;
	children?: React.ReactNode;
}

export function DeleteContactRequestAlertDialog({
	id,
	children,
}: DeleteContactRequestAlertDialogProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-destructive">
						Êtes-vous sûr de vouloir supprimer définitivement cette demande de
						contact ?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Cette action va supprimer définitivement la demande de contact.
						<br />
						Cette action est irréversible.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Annuler</AlertDialogCancel>
					<DeleteContactRequestButton id={id}>
						<AlertDialogAction>Supprimer</AlertDialogAction>
					</DeleteContactRequestButton>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
