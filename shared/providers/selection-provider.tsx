"use client";

import { ReactNode } from "react";

export interface SelectionProviderProps {
	children: ReactNode;
	selectionKey?: string;
}

export function SelectionProvider({
	children,
	selectionKey = "selected",
}: SelectionProviderProps) {
	return (
		<SelectionProvider selectionKey={selectionKey}>
			{children}
		</SelectionProvider>
	);
}
