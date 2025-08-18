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
import { DeleteContactButton } from "./delete-contact-button";

interface DeleteContactAlertDialogProps {
	id: string;
	children?: React.ReactNode;
}

export function DeleteContactAlertDialog({
	id,
	children,
}: DeleteContactAlertDialogProps) {
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
					<DeleteContactButton id={id}>
						<AlertDialogAction>Supprimer</AlertDialogAction>
					</DeleteContactButton>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
