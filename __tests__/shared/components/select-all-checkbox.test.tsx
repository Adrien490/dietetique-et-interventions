import { render, screen, fireEvent } from "@testing-library/react";
import { SelectAllCheckbox } from "@/shared/components/select-all-checkbox";

// Mock the selection context
jest.mock("@/shared/contexts", () => ({
	useSelectionContext: jest.fn(),
}));

// Mock the Checkbox component
jest.mock("@/shared/components/ui/checkbox", () => ({
	Checkbox: ({ checked, onCheckedChange, "aria-disabled": disabled, "aria-label": label, className }: any) => (
		<input
			type="checkbox"
			checked={checked}
			onChange={(e) => onCheckedChange?.(e.target.checked)}
			disabled={disabled}
			aria-label={label}
			className={className}
			data-testid="select-all-checkbox"
		/>
	),
}));

const mockUseSelectionContext = require("@/shared/contexts").useSelectionContext;

describe("SelectAllCheckbox", () => {
	const defaultProps = {
		itemIds: ["item1", "item2", "item3"],
	};

	const mockSelectionContext = {
		areAllSelected: jest.fn(),
		handleSelectionChange: jest.fn(),
		isPending: false,
	};

	beforeEach(() => {
		jest.clearAllMocks();
		mockUseSelectionContext.mockReturnValue(mockSelectionContext);
	});

	it("should render checkbox with correct props", () => {
		mockSelectionContext.areAllSelected.mockReturnValue(false);
		
		render(<SelectAllCheckbox {...defaultProps} />);
		
		const checkbox = screen.getByTestId("select-all-checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).not.toBeChecked();
		expect(checkbox).toHaveAttribute("aria-label", "Tout sélectionner");
	});

	it("should show checked state when all items are selected", () => {
		mockSelectionContext.areAllSelected.mockReturnValue(true);
		
		render(<SelectAllCheckbox {...defaultProps} />);
		
		const checkbox = screen.getByTestId("select-all-checkbox");
		expect(checkbox).toBeChecked();
		expect(checkbox).toHaveAttribute("aria-label", "Tout désélectionner");
	});

	it("should handle checkbox change", () => {
		mockSelectionContext.areAllSelected.mockReturnValue(false);
		
		render(<SelectAllCheckbox {...defaultProps} />);
		
		const checkbox = screen.getByTestId("select-all-checkbox");
		fireEvent.click(checkbox);
		
		expect(mockSelectionContext.handleSelectionChange).toHaveBeenCalledWith(
			["item1", "item2", "item3"],
			true
		);
	});

	it("should handle unchecking when all items are selected", () => {
		mockSelectionContext.areAllSelected.mockReturnValue(true);
		
		render(<SelectAllCheckbox {...defaultProps} />);
		
		const checkbox = screen.getByTestId("select-all-checkbox");
		fireEvent.click(checkbox);
		
		expect(mockSelectionContext.handleSelectionChange).toHaveBeenCalledWith(
			["item1", "item2", "item3"],
			false
		);
	});

	it("should be disabled when disabled prop is true", () => {
		mockSelectionContext.areAllSelected.mockReturnValue(false);
		
		render(<SelectAllCheckbox {...defaultProps} disabled={true} />);
		
		const checkbox = screen.getByTestId("select-all-checkbox");
		expect(checkbox).toBeDisabled();
	});

	it("should be disabled when context is pending", () => {
		mockSelectionContext.areAllSelected.mockReturnValue(false);
		mockSelectionContext.isPending = true;
		
		render(<SelectAllCheckbox {...defaultProps} />);
		
		const checkbox = screen.getByTestId("select-all-checkbox");
		expect(checkbox).toBeDisabled();
	});

	it("should be disabled when both disabled prop and pending are true", () => {
		mockSelectionContext.areAllSelected.mockReturnValue(false);
		mockSelectionContext.isPending = true;
		
		render(<SelectAllCheckbox {...defaultProps} disabled={true} />);
		
		const checkbox = screen.getByTestId("select-all-checkbox");
		expect(checkbox).toBeDisabled();
	});

	it("should apply custom className", () => {
		mockSelectionContext.areAllSelected.mockReturnValue(false);
		
		render(<SelectAllCheckbox {...defaultProps} className="custom-class" />);
		
		const checkbox = screen.getByTestId("select-all-checkbox");
		expect(checkbox).toHaveClass("custom-class");
	});

	it("should call areAllSelected with correct itemIds", () => {
		mockSelectionContext.areAllSelected.mockReturnValue(false);
		
		render(<SelectAllCheckbox {...defaultProps} />);
		
		expect(mockSelectionContext.areAllSelected).toHaveBeenCalledWith([
			"item1",
			"item2",
			"item3",
		]);
	});

	it("should handle empty itemIds array", () => {
		mockSelectionContext.areAllSelected.mockReturnValue(false);
		
		render(<SelectAllCheckbox itemIds={[]} />);
		
		expect(mockSelectionContext.areAllSelected).toHaveBeenCalledWith([]);
	});

	it("should handle single item", () => {
		mockSelectionContext.areAllSelected.mockReturnValue(false);
		
		render(<SelectAllCheckbox itemIds={["single-item"]} />);
		
		expect(mockSelectionContext.areAllSelected).toHaveBeenCalledWith([
			"single-item",
		]);
	});

	it("should update aria-label based on selection state", () => {
		// Test unselected state
		mockSelectionContext.areAllSelected.mockReturnValue(false);
		const { rerender } = render(<SelectAllCheckbox {...defaultProps} />);
		
		let checkbox = screen.getByTestId("select-all-checkbox");
		expect(checkbox).toHaveAttribute("aria-label", "Tout sélectionner");
		
		// Test selected state
		mockSelectionContext.areAllSelected.mockReturnValue(true);
		rerender(<SelectAllCheckbox {...defaultProps} />);
		
		checkbox = screen.getByTestId("select-all-checkbox");
		expect(checkbox).toHaveAttribute("aria-label", "Tout désélectionner");
	});
});

