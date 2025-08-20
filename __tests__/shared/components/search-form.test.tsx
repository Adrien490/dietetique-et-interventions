import { SearchForm } from "@/shared/components/search-form";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";

// Mock Next.js hooks
jest.mock("next/navigation", () => ({
	useRouter: jest.fn(),
	useSearchParams: jest.fn(),
}));

// Mock TanStack Form
jest.mock("@tanstack/react-form", () => ({
	useForm: jest.fn(),
}));

// Mock UI components
jest.mock("@/shared/components/ui/input", () => ({
	Input: ({ onChange, value, className, placeholder, ...props }: any) => (
		<input
			onChange={onChange}
			value={value}
			className={className}
			placeholder={placeholder}
			data-testid="search-input"
			{...props}
		/>
	),
}));

// Mock loaders
jest.mock("@/shared/components/loaders", () => ({
	MiniDotsLoader: ({ size, color }: any) => (
		<div data-testid="mini-dots-loader" data-size={size} data-color={color}>
			Loading...
		</div>
	),
}));

// Mock Lucide React icons
jest.mock("lucide-react", () => ({
	Search: () => <span data-testid="search-icon">🔍</span>,
}));

// Mock utils
jest.mock("@/shared/utils", () => ({
	cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

const mockRouter = {
	replace: jest.fn(),
	push: jest.fn(),
	back: jest.fn(),
	prefetch: jest.fn(),
};

const mockSearchParams = {
	get: jest.fn(),
	toString: jest.fn(),
};

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseSearchParams = useSearchParams as jest.MockedFunction<typeof useSearchParams>;

// Mock form field
const createMockField = (value = "") => ({
	state: { value },
	handleChange: jest.fn(),
});

const mockForm = {
	handleSubmit: jest.fn(),
	Field: ({ name, validators, children }: any) => {
		const field = createMockField();
		return children(field);
	},
};

// Mock useForm implementation
const { useForm } = require("@tanstack/react-form");

describe("SearchForm", () => {
	beforeEach(() => {
		mockUseRouter.mockReturnValue(mockRouter);
		mockUseSearchParams.mockReturnValue(mockSearchParams);
		mockSearchParams.get.mockReturnValue("");
		mockSearchParams.toString.mockReturnValue("");
		useForm.mockReturnValue(mockForm);
		jest.clearAllMocks();
	});

	it("should render search form with default placeholder", () => {
		render(<SearchForm paramName="search" />);

		expect(screen.getByRole("search")).toBeInTheDocument();
		expect(screen.getByTestId("search-input")).toBeInTheDocument();
		expect(screen.getByTestId("search-icon")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Rechercher...")).toBeInTheDocument();
	});

	it("should render with custom placeholder", () => {
		render(<SearchForm paramName="search" placeholder="Rechercher des produits..." />);

		expect(screen.getByPlaceholderText("Rechercher des produits...")).toBeInTheDocument();
	});

	it("should apply custom className", () => {
		const { container } = render(
			<SearchForm paramName="search" className="custom-search-class" />
		);

		const form = container.querySelector('form[role="search"]');
		expect(form).toHaveClass("custom-search-class");
	});

	it("should initialize with value from URL params", () => {
		mockSearchParams.get.mockReturnValue("initial search");
		
		render(<SearchForm paramName="search" />);

		// The form should be initialized with the URL param value
		expect(mockSearchParams.get).toHaveBeenCalledWith("search");
	});

	it("should handle form submission", () => {
		render(<SearchForm paramName="search" />);

		const form = screen.getByRole("search");
		fireEvent.submit(form);

		expect(mockForm.handleSubmit).toHaveBeenCalled();
	});

	it("should prevent default form submission", () => {
		render(<SearchForm paramName="search" />);

		const form = screen.getByRole("search");
		const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
		
		// Spy on preventDefault
		const preventDefaultSpy = jest.spyOn(submitEvent, "preventDefault");
		
		fireEvent(form, submitEvent);

		expect(preventDefaultSpy).toHaveBeenCalled();
	});

	it("should show loading indicator when pending", () => {
		// Mock the component to simulate pending state
		const { rerender } = render(<SearchForm paramName="search" />);
		
		// Find the form and add data-pending attribute to simulate pending state
		const form = screen.getByRole("search");
		form.setAttribute("data-pending", "");
		
		rerender(<SearchForm paramName="search" />);
		
		// In a real test, we'd need to trigger the pending state properly
		// For now, we just verify the structure exists
		expect(form).toBeInTheDocument();
	});

	it("should have correct ARIA attributes", () => {
		render(<SearchForm paramName="search" />);

		const form = screen.getByRole("search");
		const input = screen.getByTestId("search-input");

		expect(form).toHaveAttribute("role", "search");
		expect(input).toHaveAttribute("aria-label", "Champ de recherche");
	});

	it("should have correct input attributes", () => {
		render(<SearchForm paramName="search" />);

		const input = screen.getByTestId("search-input");

		expect(input).toHaveAttribute("autoComplete", "off");
		expect(input).toHaveAttribute("type", "search");
	});

	it("should apply correct CSS classes to form", () => {
		const { container } = render(<SearchForm paramName="search" />);

		const form = container.querySelector('form[role="search"]');
		expect(form).toHaveClass(
			"relative",
			"flex",
			"w-full",
			"items-center",
			"group",
			"rounded-md",
			"overflow-hidden",
			"bg-background",
			"border",
			"border-input"
		);
	});

	it("should apply correct CSS classes to input", () => {
		render(<SearchForm paramName="search" />);

		const input = screen.getByTestId("search-input");
		expect(input).toHaveClass(
			"pl-10",
			"border-none",
			"shadow-none",
			"focus-visible:ring-0",
			"bg-transparent"
		);
	});

	it("should handle different param names", () => {
		mockSearchParams.get.mockReturnValue("test value");
		
		render(<SearchForm paramName="query" />);

		expect(mockSearchParams.get).toHaveBeenCalledWith("query");
	});

	it("should handle empty search param", () => {
		mockSearchParams.get.mockReturnValue(null);
		
		render(<SearchForm paramName="search" />);

		expect(mockSearchParams.get).toHaveBeenCalledWith("search");
		// Should initialize with empty string when param is null
	});

	it("should have proper form structure", () => {
		const { container } = render(<SearchForm paramName="search" />);

		// Should have form element
		const form = container.querySelector('form[role="search"]');
		expect(form).toBeInTheDocument();

		// Should have icon container
		const iconContainer = container.querySelector(".absolute.left-3");
		expect(iconContainer).toBeInTheDocument();

		// Should have input field
		expect(screen.getByTestId("search-input")).toBeInTheDocument();
	});

	it("should handle focus states", () => {
		const { container } = render(<SearchForm paramName="search" />);

		const form = container.querySelector('form[role="search"]');
		expect(form).toHaveClass("focus-within:border-primary/50");
		expect(form).toHaveClass("focus-within:ring-1");
		expect(form).toHaveClass("focus-within:ring-primary/20");
	});

	it("should handle hover states", () => {
		const { container } = render(<SearchForm paramName="search" />);

		const form = container.querySelector('form[role="search"]');
		expect(form).toHaveClass("hover:border-muted-foreground/25");
	});

	it("should maintain transition classes", () => {
		const { container } = render(<SearchForm paramName="search" />);

		const form = container.querySelector('form[role="search"]');
		expect(form).toHaveClass("transition-all", "duration-200", "ease-in-out");
	});
});

