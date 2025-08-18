"use client";

import { ContactStatus } from "@/app/generated/prisma";
import { CheckboxFilter } from "@/shared/components/checkbox-filter";
import { ClearFiltersButton } from "@/shared/components/clear-filters-button";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { FormLabel } from "@/shared/components/ui/form";
import { Label } from "@/shared/components/ui/label";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/shared/components/ui/sheet";
import { Filter } from "lucide-react";
import { CONTACT_REQUEST_STATUS_OPTIONS } from "../../../constants";

interface ContactRequestFilterSheetProps {
	activeFiltersCount: number;
	isArchivedView: boolean;
}

export function ContactRequestFilterSheet({
	activeFiltersCount,
	isArchivedView,
}: ContactRequestFilterSheetProps) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" className="relative">
					<Filter className="size-4 mr-2" />
					Filtres
					{activeFiltersCount > 0 && (
						<Badge className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-medium text-primary-foreground">
							{activeFiltersCount}
						</Badge>
					)}
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Filtrer les demandes de contact</SheetTitle>
					<SheetDescription>
						Filtrez les demandes de contact en fonction de vos besoins.
					</SheetDescription>
				</SheetHeader>

				<ScrollArea className="h-[calc(100vh-12rem)] my-4 pr-4">
					<div className="space-y-6 px-4">
						{!isArchivedView && (
							<div className="space-y-4">
								<FormLabel className="text-base font-medium">Statut</FormLabel>
								<div className="space-y-2">
									{CONTACT_REQUEST_STATUS_OPTIONS.filter(
										(status) => status.value !== ContactStatus.ARCHIVED
									).map((status) => (
										<div
											key={status.value}
											className="flex items-center space-x-2"
										>
											<CheckboxFilter
												filterKey="status"
												value={status.value}
												id={`status-${status.value}`}
											/>
											<Label
												htmlFor={`status-${status.value}`}
												className="flex items-center cursor-pointer"
											>
												<span
													className="w-2 h-2 rounded-full mr-2"
													style={{ backgroundColor: status.color }}
												/>
												{status.label}
											</Label>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</ScrollArea>

				<SheetFooter className="mt-6 px-6">
					<ClearFiltersButton
						filters={["status"]}
						label="Réinitialiser les filtres"
						className="w-full"
						excludeFilters={isArchivedView ? ["status"] : []}
					/>
					<SheetClose asChild>
						<Button className="w-full">Fermer</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
