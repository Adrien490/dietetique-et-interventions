import { ComponentProps } from "react";
import { Button } from "@/shared/components/ui/button";

export interface ClearFiltersButtonProps extends ComponentProps<typeof Button> {
	filters: string[];
	label?: string;
	prefix?: string;
	onClear?: () => void;
	excludeFilters?: string[];
}

