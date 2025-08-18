"use client";

import { Checkbox } from "@/shared/components/ui/checkbox";
import { useSelectionContext } from "@/shared/contexts";

export interface SelectAllCheckboxProps {
	itemIds: string[];
	disabled?: boolean;
	className?: string;
}

export function SelectAllCheckbox({
	itemIds,
	disabled = false,
	className,
}: SelectAllCheckboxProps) {
	const { areAllSelected, handleSelectionChange, isPending } =
		useSelectionContext();
	const allSelected = areAllSelected(itemIds);

	return (
		<Checkbox
			checked={allSelected}
			onCheckedChange={(checked) => handleSelectionChange(itemIds, !!checked)}
			aria-disabled={disabled || isPending}
			className={className}
			aria-label={allSelected ? "Tout désélectionner" : "Tout sélectionner"}
		/>
	);
}
