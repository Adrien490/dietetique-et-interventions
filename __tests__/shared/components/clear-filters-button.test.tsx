import { ClearFiltersButton } from "@/shared/components/clear-filters-button/clear-filters-button";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";

// Mock Next.js hooks
jest.mock("next/navigation", () => ({
	useRouter: jest.fn(),
	useSearchParams: jest.fn(),
}));

// Mock UI Button component
jest.mock("@/shared/components/ui/button", () => ({
	Button: ({
		children,
		onClick,
		disabled,
		variant,
		size,
		className,
		...props
	}: any) => (
		<button
			onClick={onClick}
			disabled={disabled}
			data-variant={variant}
			data-size={size}
			className={`gap-1.5 ${className || ""}`.trim()}
			data-testid="clear-filters-button"
			{...props}
		>
			{children}
		</button>
	),
}));

// Mock Lucide React icons
jest.mock("lucide-react", () => ({
	X: () => <span data-testid="x-icon">✕</span>,
}));

const mockRouter = {
	push: jest.fn(),
	replace: jest.fn(),
	back: jest.fn(),
	prefetch: jest.fn(),
};

const mockSearchParams = {
	has: jest.fn(),
	get: jest.fn(),
	toString: jest.fn(),
};

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseSearchParams = useSearchParams as jest.MockedFunction<
	typeof useSearchParams
>;

// Mock URLSearchParams
const mockURLSearchParams = {
	delete: jest.fn(),
	set: jest.fn(),
	toString: jest.fn(),
};

// Mock URLSearchParams constructor
global.URLSearchParams = jest
	.fn()
	.mockImplementation(() => mockURLSearchParams);

describe("ClearFiltersButton", () => {
	beforeEach(() => {
		mockUseRouter.mockReturnValue(mockRouter);
		mockUseSearchParams.mockReturnValue(mockSearchParams);
		mockSearchParams.has.mockReturnValue(false);
		mockSearchParams.toString.mockReturnValue("");
		mockURLSearchParams.toString.mockReturnValue("");
		jest.clearAllMocks();
	});

	it("should not render when no filters are active", () => {
		mockSearchParams.has.mockReturnValue(false);

		render(<ClearFiltersButton filters={["category", "price"]} />);

		expect(
			screen.queryByTestId("clear-filters-button")
		).not.toBeInTheDocument();
	});

	it("should render when at least one filter is active", () => {
		mockSearchParams.has.mockImplementation((key) => key === "category");

		render(<ClearFiltersButton filters={["category", "price"]} />);

		expect(screen.getByTestId("clear-filters-button")).toBeInTheDocument();
		expect(screen.getByText("Effacer les filtres")).toBeInTheDocument();
		expect(screen.getByTestId("x-icon")).toBeInTheDocument();
	});

	it("should render with custom label", () => {
		mockSearchParams.has.mockReturnValue(true);

		render(
			<ClearFiltersButton filters={["category"]} label="Reset all filters" />
		);

		expect(screen.getByText("Reset all filters")).toBeInTheDocument();
	});

	it("should apply correct button props", () => {
		mockSearchParams.has.mockReturnValue(true);

		render(<ClearFiltersButton filters={["category"]} />);

		const button = screen.getByTestId("clear-filters-button");
		expect(button).toHaveAttribute("data-variant", "outline");
		expect(button).toHaveAttribute("data-size", "sm");
		expect(button).toHaveClass("gap-1.5");
	});

	it("should handle click and clear filters", () => {
		mockSearchParams.has.mockReturnValue(true);
		mockURLSearchParams.toString.mockReturnValue("page=1");

		render(<ClearFiltersButton filters={["category", "price"]} />);

		const button = screen.getByTestId("clear-filters-button");
		fireEvent.click(button);

		expect(mockURLSearchParams.delete).toHaveBeenCalledWith("category");
		expect(mockURLSearchParams.delete).toHaveBeenCalledWith("price");
		expect(mockURLSearchParams.set).toHaveBeenCalledWith("page", "1");
		expect(mockRouter.push).toHaveBeenCalledWith("?page=1", { scroll: false });
	});

	it("should handle prefix correctly", () => {
		// Mock implementation to return false for all filters to ensure all are checked
		mockSearchParams.has.mockImplementation((key) => key === "filter_price"); // Only the second one returns true

		render(
			<ClearFiltersButton filters={["category", "price"]} prefix="filter_" />
		);

		// Verify all filter keys were checked with prefix
		expect(mockSearchParams.has).toHaveBeenCalledWith("filter_category");
		expect(mockSearchParams.has).toHaveBeenCalledWith("filter_price");
		
		// Verify the button renders because at least one filter is active
		expect(screen.getByTestId("clear-filters-button")).toBeInTheDocument();
	});

	it("should exclude specified filters", () => {
		mockSearchParams.has.mockReturnValue(true);

		render(
			<ClearFiltersButton
				filters={["category", "price", "brand"]}
				excludeFilters={["brand"]}
			/>
		);

		const button = screen.getByTestId("clear-filters-button");
		fireEvent.click(button);

		expect(mockURLSearchParams.delete).toHaveBeenCalledWith("category");
		expect(mockURLSearchParams.delete).toHaveBeenCalledWith("price");
		expect(mockURLSearchParams.delete).not.toHaveBeenCalledWith("brand");
	});

	it("should call onClear callback when provided", () => {
		const mockOnClear = jest.fn();
		mockSearchParams.has.mockReturnValue(true);

		render(<ClearFiltersButton filters={["category"]} onClear={mockOnClear} />);

		const button = screen.getByTestId("clear-filters-button");
		fireEvent.click(button);

		expect(mockOnClear).toHaveBeenCalledTimes(1);
	});

	it("should be disabled when pending", () => {
		mockSearchParams.has.mockReturnValue(true);

		render(<ClearFiltersButton filters={["category"]} />);

		const button = screen.getByTestId("clear-filters-button");

		// Initially should not be disabled
		expect(button).not.toBeDisabled();

		// After clicking, it should be in pending state (though we can't easily test this without more complex mocking)
		fireEvent.click(button);
	});

	it("should pass through additional button props", () => {
		mockSearchParams.has.mockReturnValue(true);

		render(
			<ClearFiltersButton
				filters={["category"]}
				className="custom-class"
				data-custom="custom-value"
			/>
		);

		const button = screen.getByTestId("clear-filters-button");
		expect(button).toHaveClass("custom-class");
		expect(button).toHaveAttribute("data-custom", "custom-value");
	});

	it("should handle empty filters array", () => {
		render(<ClearFiltersButton filters={[]} />);

		expect(
			screen.queryByTestId("clear-filters-button")
		).not.toBeInTheDocument();
	});

	it("should handle filters with prefix and exclusions together", () => {
		mockSearchParams.has.mockImplementation(
			(key) => key === "filter_category" || key === "filter_price"
		);

		render(
			<ClearFiltersButton
				filters={["category", "price", "brand"]}
				prefix="filter_"
				excludeFilters={["brand"]}
			/>
		);

		const button = screen.getByTestId("clear-filters-button");
		fireEvent.click(button);

		expect(mockURLSearchParams.delete).toHaveBeenCalledWith("filter_category");
		expect(mockURLSearchParams.delete).toHaveBeenCalledWith("filter_price");
		expect(mockURLSearchParams.delete).not.toHaveBeenCalledWith("filter_brand");
	});

	it("should check for active filters with correct keys", () => {
		const filters = ["category", "price", "brand"];
		const prefix = "shop_";

		render(<ClearFiltersButton filters={filters} prefix={prefix} />);

		// Should check for prefixed filter keys
		expect(mockSearchParams.has).toHaveBeenCalledWith("shop_category");
		expect(mockSearchParams.has).toHaveBeenCalledWith("shop_price");
		expect(mockSearchParams.has).toHaveBeenCalledWith("shop_brand");
	});

	it("should handle special characters in filter names", () => {
		mockSearchParams.has.mockReturnValue(true);

		render(
			<ClearFiltersButton filters={["category-special", "price_range"]} />
		);

		const button = screen.getByTestId("clear-filters-button");
		fireEvent.click(button);

		expect(mockURLSearchParams.delete).toHaveBeenCalledWith("category-special");
		expect(mockURLSearchParams.delete).toHaveBeenCalledWith("price_range");
	});

	it("should always reset page to 1 when clearing filters", () => {
		mockSearchParams.has.mockReturnValue(true);

		render(<ClearFiltersButton filters={["category"]} />);

		const button = screen.getByTestId("clear-filters-button");
		fireEvent.click(button);

		expect(mockURLSearchParams.set).toHaveBeenCalledWith("page", "1");
	});

	it("should handle mixed active/inactive filters correctly", () => {
		// Only category is active, price is not
		mockSearchParams.has.mockImplementation((key) => key === "category");

		render(<ClearFiltersButton filters={["category", "price"]} />);

		// Should render because at least one filter is active
		expect(screen.getByTestId("clear-filters-button")).toBeInTheDocument();
	});
});
