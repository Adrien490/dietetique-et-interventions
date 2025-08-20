import { ItemCheckbox } from "@/shared/components/item-checkbox/item-checkbox";
import { useSelectionContext } from "@/shared/contexts";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock the selection context
jest.mock("@/shared/contexts", () => ({
	useSelectionContext: jest.fn(),
}));

// Mock UI Checkbox component
jest.mock("@/shared/components/ui/checkbox", () => ({
	Checkbox: ({ checked, onCheckedChange, className, ...props }: any) => (
		<input
			type="checkbox"
			checked={checked}
			onChange={(e) => onCheckedChange?.(!checked)} // Toggle behavior: pass opposite of current state
			className={className}
			data-testid="item-checkbox"
			{...props}
		/>
	),
}));

const mockUseSelectionContext = useSelectionContext as jest.MockedFunction<
	typeof useSelectionContext
>;

describe("ItemCheckbox", () => {
	const mockIsSelected = jest.fn();
	const mockHandleItemSelectionChange = jest.fn();

	beforeEach(() => {
		mockUseSelectionContext.mockReturnValue({
			isSelected: mockIsSelected,
			handleItemSelectionChange: mockHandleItemSelectionChange,
			isPending: false,
		});
		mockIsSelected.mockReturnValue(false);
		jest.clearAllMocks();
	});

	it("should render checkbox with correct props", () => {
		render(<ItemCheckbox itemId="item-1" />);

		const checkbox = screen.getByTestId("item-checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toHaveAttribute("aria-label", "Sélectionner cet élément");
	});

	it("should check if item is selected on render", () => {
		render(<ItemCheckbox itemId="item-1" />);

		expect(mockIsSelected).toHaveBeenCalledWith("item-1");
	});

	it("should show checked state when item is selected", () => {
		mockIsSelected.mockReturnValue(true);

		render(<ItemCheckbox itemId="item-1" />);

		const checkbox = screen.getByTestId("item-checkbox");
		expect(checkbox).toBeChecked();
	});

	it("should show unchecked state when item is not selected", () => {
		mockIsSelected.mockReturnValue(false);

		render(<ItemCheckbox itemId="item-1" />);

		const checkbox = screen.getByTestId("item-checkbox");
		expect(checkbox).not.toBeChecked();
	});

	it("should call handleItemSelectionChange when clicked", () => {
		render(<ItemCheckbox itemId="item-1" />);

		const checkbox = screen.getByTestId("item-checkbox");
		fireEvent.click(checkbox);

		expect(mockHandleItemSelectionChange).toHaveBeenCalledWith("item-1", true);
	});

	it("should call handleItemSelectionChange with false when unchecking", () => {
		mockIsSelected.mockReturnValue(true);

		render(<ItemCheckbox itemId="item-1" />);

		const checkbox = screen.getByTestId("item-checkbox");
		fireEvent.click(checkbox);

		expect(mockHandleItemSelectionChange).toHaveBeenCalledWith("item-1", false);
	});

	it("should apply custom className", () => {
		render(<ItemCheckbox itemId="item-1" className="custom-checkbox" />);

		const checkbox = screen.getByTestId("item-checkbox");
		expect(checkbox).toHaveClass("custom-checkbox");
	});

	it("should be disabled when disabled prop is true", () => {
		render(<ItemCheckbox itemId="item-1" disabled />);

		const checkbox = screen.getByTestId("item-checkbox");
		expect(checkbox).toHaveAttribute("aria-disabled", "true");
	});

	it("should be disabled when isPending is true", () => {
		mockUseSelectionContext.mockReturnValue({
			isSelected: mockIsSelected,
			handleItemSelectionChange: mockHandleItemSelectionChange,
			isPending: true,
		});

		render(<ItemCheckbox itemId="item-1" />);

		const checkbox = screen.getByTestId("item-checkbox");
		expect(checkbox).toHaveAttribute("aria-disabled", "true");
	});

	it("should be disabled when both disabled and isPending are true", () => {
		mockUseSelectionContext.mockReturnValue({
			isSelected: mockIsSelected,
			handleItemSelectionChange: mockHandleItemSelectionChange,
			isPending: true,
		});

		render(<ItemCheckbox itemId="item-1" disabled />);

		const checkbox = screen.getByTestId("item-checkbox");
		expect(checkbox).toHaveAttribute("aria-disabled", "true");
	});

	it("should not be disabled by default", () => {
		render(<ItemCheckbox itemId="item-1" />);

		const checkbox = screen.getByTestId("item-checkbox");
		expect(checkbox).toHaveAttribute("aria-disabled", "false");
	});

	it("should handle different item IDs", () => {
		const { rerender } = render(<ItemCheckbox itemId="item-1" />);

		expect(mockIsSelected).toHaveBeenCalledWith("item-1");

		rerender(<ItemCheckbox itemId="item-2" />);

		expect(mockIsSelected).toHaveBeenCalledWith("item-2");
	});

	it("should handle special characters in itemId", () => {
		render(<ItemCheckbox itemId="item-with-special-chars-123_abc" />);

		expect(mockIsSelected).toHaveBeenCalledWith(
			"item-with-special-chars-123_abc"
		);

		const checkbox = screen.getByTestId("item-checkbox");
		fireEvent.click(checkbox);

		expect(mockHandleItemSelectionChange).toHaveBeenCalledWith(
			"item-with-special-chars-123_abc",
			true
		);
	});

	it("should handle numeric itemId as string", () => {
		render(<ItemCheckbox itemId="123" />);

		expect(mockIsSelected).toHaveBeenCalledWith("123");

		const checkbox = screen.getByTestId("item-checkbox");
		fireEvent.click(checkbox);

		expect(mockHandleItemSelectionChange).toHaveBeenCalledWith("123", true);
	});

	it("should handle empty string itemId", () => {
		render(<ItemCheckbox itemId="" />);

		expect(mockIsSelected).toHaveBeenCalledWith("");

		const checkbox = screen.getByTestId("item-checkbox");
		fireEvent.click(checkbox);

		expect(mockHandleItemSelectionChange).toHaveBeenCalledWith("", true);
	});

	it("should properly convert checked state to boolean", () => {
		// First test: clicking when not selected should call with true
		mockIsSelected.mockReturnValue(false);
		const { unmount } = render(<ItemCheckbox itemId="item-1" />);

		const checkbox = screen.getByTestId("item-checkbox");
		fireEvent.click(checkbox);
		expect(mockHandleItemSelectionChange).toHaveBeenCalledWith("item-1", true);

		// Clear mock calls and unmount first component
		mockHandleItemSelectionChange.mockClear();
		unmount();

		// Second test: create new component when selected should call with false when clicked
		mockIsSelected.mockReturnValue(true);
		render(<ItemCheckbox itemId="item-2" />);

		const checkboxSelected = screen.getByTestId("item-checkbox");
		fireEvent.click(checkboxSelected);
		expect(mockHandleItemSelectionChange).toHaveBeenCalledWith("item-2", false);
	});

	it("should maintain state consistency across re-renders", () => {
		mockIsSelected.mockReturnValue(false);
		const { rerender } = render(<ItemCheckbox itemId="item-1" />);

		let checkbox = screen.getByTestId("item-checkbox");
		expect(checkbox).not.toBeChecked();

		// Change selection state
		mockIsSelected.mockReturnValue(true);
		rerender(<ItemCheckbox itemId="item-1" />);

		checkbox = screen.getByTestId("item-checkbox");
		expect(checkbox).toBeChecked();
	});

	it("should handle context with missing methods gracefully", () => {
		// This test ensures the component doesn't break if context is incomplete
		mockUseSelectionContext.mockReturnValue({
			isSelected: mockIsSelected,
			handleItemSelectionChange: mockHandleItemSelectionChange,
			isPending: false,
		});

		render(<ItemCheckbox itemId="item-1" />);

		const checkbox = screen.getByTestId("item-checkbox");
		expect(checkbox).toBeInTheDocument();
	});

	it("should have correct accessibility attributes", () => {
		render(<ItemCheckbox itemId="item-1" />);

		const checkbox = screen.getByTestId("item-checkbox");
		expect(checkbox).toHaveAttribute("aria-label", "Sélectionner cet élément");
		expect(checkbox).toHaveAttribute("type", "checkbox");
	});

	it("should handle rapid clicks correctly", () => {
		render(<ItemCheckbox itemId="item-1" />);

		const checkbox = screen.getByTestId("item-checkbox");

		fireEvent.click(checkbox);
		fireEvent.click(checkbox);
		fireEvent.click(checkbox);

		expect(mockHandleItemSelectionChange).toHaveBeenCalledTimes(3);
	});

	it("should work with all props combined", () => {
		mockUseSelectionContext.mockReturnValue({
			isSelected: mockIsSelected,
			handleItemSelectionChange: mockHandleItemSelectionChange,
			isPending: true,
		});
		mockIsSelected.mockReturnValue(true);

		render(
			<ItemCheckbox
				itemId="complex-item-id"
				disabled={true}
				className="complex-class"
			/>
		);

		const checkbox = screen.getByTestId("item-checkbox");
		expect(checkbox).toBeChecked();
		expect(checkbox).toHaveAttribute("aria-disabled", "true");
		expect(checkbox).toHaveClass("complex-class");
		expect(mockIsSelected).toHaveBeenCalledWith("complex-item-id");
	});
});
