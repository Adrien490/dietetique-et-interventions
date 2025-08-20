import { SelectionToolbar } from "@/shared/components/selection-toolbar";
import { render, screen } from "@testing-library/react";

// Mock du contexte de sélection
jest.mock("@/shared/contexts/selection-context", () => ({
	useSelectionContext: () => ({
		selectedItems: ["item1", "item2"],
		clearSelection: jest.fn(),
	}),
}));

describe("SelectionToolbar", () => {
	it("should render selection toolbar when items are selected", () => {
		render(<SelectionToolbar />);

		expect(screen.getByText("2 élément(s) sélectionné(s)")).toBeInTheDocument();
	});

	it("should render clear selection button", () => {
		render(<SelectionToolbar />);

		const clearButton = screen.getByRole("button", { name: /effacer/i });
		expect(clearButton).toBeInTheDocument();
	});

	it("should render with correct structure", () => {
		render(<SelectionToolbar />);

		const toolbar = screen.getByRole("region");
		expect(toolbar).toBeInTheDocument();
	});
});
