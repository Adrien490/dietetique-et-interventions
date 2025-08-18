"use client";

import { Checkbox } from "@/shared/components/ui/checkbox";
import { useSelectionContext } from "@/shared/contexts";

export interface ItemCheckboxProps {
	itemId: string;
	disabled?: boolean;
	className?: string;
}

export function ItemCheckbox({
	itemId,
	disabled = false,
	className,
}: ItemCheckboxProps) {
	const { isSelected, handleItemSelectionChange, isPending } =
		useSelectionContext();

	return (
		<Checkbox
			checked={isSelected(itemId)}
			onCheckedChange={(checked) =>
				handleItemSelectionChange(itemId, !!checked)
			}
			aria-disabled={disabled || isPending}
			className={className}
			aria-label="Sélectionner cet élément"
		/>
	);
}
