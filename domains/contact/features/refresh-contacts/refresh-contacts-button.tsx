"use client";

import { Button } from "@/shared/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { RefreshCw } from "lucide-react";
import { useRefreshContacts } from "./use-refresh-contacts";

export function RefreshContactsButton() {
	const { dispatch, isPending } = useRefreshContacts();

	return (
		<form action={dispatch}>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button type="submit" variant="outline" disabled={isPending}>
							<RefreshCw className="h-4 w-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Rafraîchir la liste des demandes de contact</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</form>
	);
}
