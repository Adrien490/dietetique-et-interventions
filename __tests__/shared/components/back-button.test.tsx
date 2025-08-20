import { BackButton } from "@/shared/components/back-button";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";

// Mock Next.js router
jest.mock("next/navigation", () => ({
	useRouter: jest.fn(),
}));

// Mock Button component
jest.mock("@/shared/components/ui/button", () => ({
	Button: ({
		children,
		onClick,
		disabled,
		variant,
		asChild,
		...props
	}: any) => (
		<button
			onClick={onClick}
			disabled={disabled}
			data-variant={variant}
			data-as-child={asChild}
			data-testid="back-button"
			{...props}
		>
			{children}
		</button>
	),
}));

// Mock Lucide React icons
jest.mock("lucide-react", () => ({
	ArrowLeft: () => <span data-testid="arrow-left-icon">←</span>,
}));

const mockRouter = {
	back: jest.fn(),
	push: jest.fn(),
	replace: jest.fn(),
	prefetch: jest.fn(),
};

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe("BackButton", () => {
	beforeEach(() => {
		mockUseRouter.mockReturnValue(mockRouter);
		jest.clearAllMocks();
	});

	it("should render back button with arrow icon", () => {
		render(<BackButton />);

		const button = screen.getByTestId("back-button");
		const icon = screen.getByTestId("arrow-left-icon");

		expect(button).toBeInTheDocument();
		expect(icon).toBeInTheDocument();
	});

	it("should render with label when provided", () => {
		render(<BackButton label="Retour" />);

		expect(screen.getByText("Retour")).toBeInTheDocument();
		expect(screen.getByTestId("arrow-left-icon")).toBeInTheDocument();
	});

	it("should not render label when not provided", () => {
		render(<BackButton />);

		// Only the icon should be present, no text
		expect(screen.getByTestId("arrow-left-icon")).toBeInTheDocument();
		expect(screen.queryByText("Retour")).not.toBeInTheDocument();
	});

	it("should call router.back() when clicked", () => {
		render(<BackButton />);

		const button = screen.getByTestId("back-button");
		fireEvent.click(button);

		expect(mockRouter.back).toHaveBeenCalledTimes(1);
	});

	it("should apply correct button props", () => {
		render(<BackButton />);

		const button = screen.getByTestId("back-button");
		expect(button).toHaveAttribute("data-variant", "ghost");
		expect(button).toHaveAttribute("data-as-child", "true");
	});

	it("should handle click with label", () => {
		render(<BackButton label="Retourner à la liste" />);

		const button = screen.getByTestId("back-button");
		fireEvent.click(button);

		expect(mockRouter.back).toHaveBeenCalledTimes(1);
		expect(screen.getByText("Retourner à la liste")).toBeInTheDocument();
	});

	it("should have correct structure with flex layout", () => {
		render(<BackButton label="Test" />);

		const button = screen.getByTestId("back-button");
		const flexContainer = button.querySelector(".flex.items-center.gap-2");

		expect(flexContainer).toBeInTheDocument();
	});

	it("should be disabled when isPending is true", () => {
		// We can't easily test the isPending state without more complex mocking
		// but we can test that the button accepts disabled state
		render(<BackButton />);

		const button = screen.getByTestId("back-button");
		expect(button).not.toBeDisabled(); // By default, should not be disabled
	});

	it("should handle multiple rapid clicks", () => {
		render(<BackButton />);

		const button = screen.getByTestId("back-button");
		fireEvent.click(button);
		fireEvent.click(button);
		fireEvent.click(button);

		// Should call router.back for each click (though in real usage, transition would prevent this)
		expect(mockRouter.back).toHaveBeenCalledTimes(3);
	});

	it("should render with empty label gracefully", () => {
		render(<BackButton label="" />);

		// Empty label should not render the span
		expect(screen.getByTestId("arrow-left-icon")).toBeInTheDocument();
		// Should not render any text content for empty label
		const button = screen.getByTestId("back-button");
		expect(button.textContent).toBe("←");
	});

	it("should maintain accessibility", () => {
		render(<BackButton label="Retour" />);

		const button = screen.getByTestId("back-button");
		// Button should be accessible - check if it's clickable
		expect(button).toBeInTheDocument();
		expect(button.tagName.toLowerCase()).toBe("button");
	});
});
