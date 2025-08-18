"use client";

import { useFilter, UseFilterOptions } from "@/shared/hooks/use-filter";
import { createContext, ReactNode, useContext } from "react";

export interface FilterContextType {
	// État
	values: string[];
	isEmpty: boolean;
	isPending: boolean;

	// Actions
	setFilter: (value: string | null) => void;
	setFilters: (values: string[]) => void;
	toggleFilter: (value: string) => void;
	clearFilter: () => void;

	// Helpers
	isSelected: (value: string) => boolean;
	hasValue: () => boolean;
}

const FilterContext = createContext<FilterContextType | null>(null);

interface FilterProviderProps {
	children: ReactNode;
	filterKey: string;
	options?: UseFilterOptions;
}

export function FilterProvider({
	children,
	filterKey,
	options,
}: FilterProviderProps) {
	const filter = useFilter(filterKey, options);

	return (
		<FilterContext.Provider value={filter}>{children}</FilterContext.Provider>
	);
}

export function useFilterContext() {
	const context = useContext(FilterContext);
	if (!context) {
		throw new Error(
			"useFilterContext doit être utilisé à l'intérieur d'un FilterProvider"
		);
	}
	return context;
}
