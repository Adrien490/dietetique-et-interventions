import { CheckboxFilter } from "@/shared/components/checkbox-filter/checkbox-filter";
import { useFilter } from "@/shared/hooks/use-filter";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock the useFilter hook
jest.mock("@/shared/hooks/use-filter", () => ({
	useFilter: jest.fn(),
}));

// Mock UI Checkbox component
jest.mock("@/shared/components/ui/checkbox", () => ({
	Checkbox: ({ id, checked, onCheckedChange, className, ...props }: any) => (
		<input
			type="checkbox"
			id={id}
			checked={checked}
			onChange={onCheckedChange}
			className={className}
			data-testid="checkbox-filter"
			{...props}
		/>
	),
}));

const mockUseFilter = useFilter as jest.MockedFunction<typeof useFilter>;

describe("CheckboxFilter", () => {
	const mockToggleFilter = jest.fn();
	const mockIsSelected = jest.fn();

	beforeEach(() => {
		mockUseFilter.mockReturnValue({
			toggleFilter: mockToggleFilter,
			isSelected: mockIsSelected,
			isPending: false,
		});
		mockIsSelected.mockReturnValue(false);
		jest.clearAllMocks();
	});

	it("should render checkbox with correct props", () => {
		render(<CheckboxFilter filterKey="category" value="electronics" />);

		const checkbox = screen.getByTestId("checkbox-filter");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toHaveAttribute("id", "category-electronics");
	});

	it("should use custom id when provided", () => {
		render(
			<CheckboxFilter
				filterKey="category"
				value="electronics"
				id="custom-checkbox-id"
			/>
		);

		const checkbox = screen.getByTestId("checkbox-filter");
		expect(checkbox).toHaveAttribute("id", "custom-checkbox-id");
	});

	it("should generate id from filterKey and value when no id provided", () => {
		render(<CheckboxFilter filterKey="brand" value="apple" />);

		const checkbox = screen.getByTestId("checkbox-filter");
		expect(checkbox).toHaveAttribute("id", "brand-apple");
	});

	it("should call useFilter with correct filterKey", () => {
		render(<CheckboxFilter filterKey="category" value="electronics" />);

		expect(mockUseFilter).toHaveBeenCalledWith("category");
	});

	it("should show checked state when item is selected", () => {
		mockIsSelected.mockReturnValue(true);

		render(<CheckboxFilter filterKey="category" value="electronics" />);

		const checkbox = screen.getByTestId("checkbox-filter");
		expect(checkbox).toBeChecked();
		expect(mockIsSelected).toHaveBeenCalledWith("electronics");
	});

	it("should show unchecked state when item is not selected", () => {
		mockIsSelected.mockReturnValue(false);

		render(<CheckboxFilter filterKey="category" value="electronics" />);

		const checkbox = screen.getByTestId("checkbox-filter");
		expect(checkbox).not.toBeChecked();
		expect(mockIsSelected).toHaveBeenCalledWith("electronics");
	});

	it("should call toggleFilter when checkbox is clicked", () => {
		render(<CheckboxFilter filterKey="category" value="electronics" />);

		const checkbox = screen.getByTestId("checkbox-filter");
		fireEvent.click(checkbox);

		expect(mockToggleFilter).toHaveBeenCalledWith("electronics");
	});

	it("should apply custom className", () => {
		render(
			<CheckboxFilter
				filterKey="category"
				value="electronics"
				className="custom-checkbox-class"
			/>
		);

		const checkbox = screen.getByTestId("checkbox-filter");
		expect(checkbox).toHaveClass("custom-checkbox-class");
	});

	it("should show pending state when isPending is true", () => {
		mockUseFilter.mockReturnValue({
			toggleFilter: mockToggleFilter,
			isSelected: mockIsSelected,
			isPending: true,
		});

		render(<CheckboxFilter filterKey="category" value="electronics" />);

		const checkbox = screen.getByTestId("checkbox-filter");
		expect(checkbox).toHaveAttribute("data-pending", "");
	});

	it("should not show pending state when isPending is false", () => {
		mockUseFilter.mockReturnValue({
			toggleFilter: mockToggleFilter,
			isSelected: mockIsSelected,
			isPending: false,
		});

		render(<CheckboxFilter filterKey="category" value="electronics" />);

		const checkbox = screen.getByTestId("checkbox-filter");
		expect(checkbox).not.toHaveAttribute("data-pending");
	});

	it("should handle special characters in filterKey and value", () => {
		render(
			<CheckboxFilter filterKey="special-filter" value="value with spaces" />
		);

		const checkbox = screen.getByTestId("checkbox-filter");
		expect(checkbox).toHaveAttribute("id", "special-filter-value with spaces");
		expect(mockUseFilter).toHaveBeenCalledWith("special-filter");
		expect(mockIsSelected).toHaveBeenCalledWith("value with spaces");
	});

	it("should handle multiple clicks correctly", () => {
		render(<CheckboxFilter filterKey="category" value="electronics" />);

		const checkbox = screen.getByTestId("checkbox-filter");
		
		fireEvent.click(checkbox);
		fireEvent.click(checkbox);
		fireEvent.click(checkbox);

		expect(mockToggleFilter).toHaveBeenCalledTimes(3);
		expect(mockToggleFilter).toHaveBeenCalledWith("electronics");
	});

	it("should work with different filter types", () => {
		const { rerender } = render(
			<CheckboxFilter filterKey="price" value="0-100" />
		);

		expect(mockUseFilter).toHaveBeenCalledWith("price");
		expect(mockIsSelected).toHaveBeenCalledWith("0-100");

		rerender(<CheckboxFilter filterKey="rating" value="5-stars" />);

		expect(mockUseFilter).toHaveBeenCalledWith("rating");
		expect(mockIsSelected).toHaveBeenCalledWith("5-stars");
	});

	it("should handle empty string values", () => {
		render(<CheckboxFilter filterKey="category" value="" />);

		const checkbox = screen.getByTestId("checkbox-filter");
		expect(checkbox).toHaveAttribute("id", "category-");
		expect(mockIsSelected).toHaveBeenCalledWith("");
	});

	it("should maintain state consistency", () => {
		// First render - not selected
		mockIsSelected.mockReturnValue(false);
		const { rerender } = render(
			<CheckboxFilter filterKey="category" value="electronics" />
		);

		let checkbox = screen.getByTestId("checkbox-filter");
		expect(checkbox).not.toBeChecked();

		// Second render - selected
		mockIsSelected.mockReturnValue(true);
		rerender(<CheckboxFilter filterKey="category" value="electronics" />);

		checkbox = screen.getByTestId("checkbox-filter");
		expect(checkbox).toBeChecked();
	});

	it("should handle numeric values as strings", () => {
		render(<CheckboxFilter filterKey="quantity" value="123" />);

		const checkbox = screen.getByTestId("checkbox-filter");
		expect(checkbox).toHaveAttribute("id", "quantity-123");
		expect(mockIsSelected).toHaveBeenCalledWith("123");
	});
});



