import { ServiceItem } from "@/app/(marketing)/components/service-item";
import { render, screen } from "@testing-library/react";

// Mock des icônes pour les tests
const MockIcon = () => <div data-testid="mock-icon">Mock Icon</div>;

describe("ServiceItem", () => {
	const defaultProps = {
		title: "Test Service",
		description: "This is a test service description",
		icon: <MockIcon />,
		index: 0,
	};

	it("should render service item with correct structure", () => {
		render(<ServiceItem {...defaultProps} />);

		const article = screen.getByRole("article");
		expect(article).toBeInTheDocument();
		expect(article).toHaveAttribute("data-ai-category", "healthcare-nutrition");
	});

	it("should render title with correct heading", () => {
		render(<ServiceItem {...defaultProps} />);

		const heading = screen.getByRole("heading", { level: 3 });
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent("Test Service");
		expect(heading).toHaveAttribute("id", "prestation-title-0");
	});

	it("should render description with correct content", () => {
		render(<ServiceItem {...defaultProps} />);

		const description = screen.getByText("This is a test service description");
		expect(description).toBeInTheDocument();
		expect(description).toHaveAttribute("id", "prestation-desc-0");
	});

	it("should render icon", () => {
		render(<ServiceItem {...defaultProps} />);

		const icon = screen.getByTestId("mock-icon");
		expect(icon).toBeInTheDocument();
	});

	it("should have correct accessibility attributes", () => {
		render(<ServiceItem {...defaultProps} />);

		const article = screen.getByRole("article");
		expect(article).toHaveAttribute("tabIndex", "0");
	});

	it("should apply correct classes for hover effects", () => {
		render(<ServiceItem {...defaultProps} />);

		const article = screen.getByRole("article");
		expect(article).toHaveClass(
			"flex",
			"flex-col",
			"py-10",
			"relative",
			"group/prestation"
		);
	});

	it("should render gradient from top for first row items (index < 2)", () => {
		render(<ServiceItem {...defaultProps} index={0} />);

		// Check for gradient element with from-top classes
		const gradientElements = screen.getAllByText("", {
			selector: '[class*="bg-gradient-to-t"]',
		});
		expect(gradientElements.length).toBeGreaterThan(0);
	});

	it("should render gradient from bottom for second row items (index >= 2)", () => {
		render(<ServiceItem {...defaultProps} index={2} />);

		// Check for gradient element with from-bottom classes
		const gradientElements = screen.getAllByText("", {
			selector: '[class*="bg-gradient-to-b"]',
		});
		expect(gradientElements.length).toBeGreaterThan(0);
	});

	it("should handle different index values correctly", () => {
		const { rerender } = render(<ServiceItem {...defaultProps} index={1} />);

		let heading = screen.getByRole("heading");
		expect(heading).toHaveAttribute("id", "prestation-title-1");

		rerender(<ServiceItem {...defaultProps} index={5} />);
		heading = screen.getByRole("heading");
		expect(heading).toHaveAttribute("id", "prestation-title-5");
	});

	it("should apply correct performance optimizations", () => {
		render(<ServiceItem {...defaultProps} index={4} />);

		const article = screen.getByRole("article");

		// Check that the article exists (the styles are inline in the component)
		expect(article).toBeInTheDocument();
		expect(article).toHaveAttribute("style");
	});

	it("should set contentVisibility to auto for items with index > 3", () => {
		render(<ServiceItem {...defaultProps} index={4} />);

		const article = screen.getByRole("article");
		expect(article).toHaveStyle({
			contentVisibility: "auto",
		});
	});

	it("should set contentVisibility to visible for items with index <= 3", () => {
		render(<ServiceItem {...defaultProps} index={2} />);

		const article = screen.getByRole("article");
		expect(article).toHaveStyle({
			contentVisibility: "visible",
		});
	});

	it("should render with long title", () => {
		const longTitle =
			"This is a very long service title that might wrap to multiple lines";
		render(<ServiceItem {...defaultProps} title={longTitle} />);

		const heading = screen.getByRole("heading");
		expect(heading).toHaveTextContent(longTitle);
	});

	it("should render with long description", () => {
		const longDescription =
			"This is a very long service description that contains multiple sentences and should test how the component handles longer content gracefully.";
		render(<ServiceItem {...defaultProps} description={longDescription} />);

		const description = screen.getByText(longDescription);
		expect(description).toBeInTheDocument();
		expect(description).toHaveClass("text-sm", "leading-relaxed", "max-w-xs");
	});

	it("should handle empty title gracefully", () => {
		render(<ServiceItem {...defaultProps} title="" />);

		const heading = screen.getByRole("heading");
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent("");
	});

	it("should handle empty description gracefully", () => {
		render(<ServiceItem {...defaultProps} description="" />);

		const description = screen.getByText("", { selector: "p" });
		expect(description).toBeInTheDocument();
	});

	it("should have proper semantic structure", () => {
		render(<ServiceItem {...defaultProps} />);

		const article = screen.getByRole("article");
		const heading = screen.getByRole("heading");
		const description = screen.getByText(defaultProps.description);

		expect(article).toContainElement(heading);
		expect(article).toContainElement(description);
	});

	it("should apply focus styles correctly", () => {
		render(<ServiceItem {...defaultProps} />);

		const article = screen.getByRole("article");
		expect(article).toHaveClass(
			"focus-within:outline-none",
			"focus-within:ring-2",
			"focus-within:ring-primary",
			"focus-within:ring-offset-2"
		);
	});

	it("should apply hover transition classes", () => {
		render(<ServiceItem {...defaultProps} />);

		const article = screen.getByRole("article");
		expect(article).toHaveClass(
			"transition-all",
			"duration-300",
			"hover:shadow-sm"
		);
	});

	it("should render decorative elements with proper aria-hidden", () => {
		render(<ServiceItem {...defaultProps} />);

		// Check that decorative elements have aria-hidden="true"
		const hiddenElements = screen.getAllByText("", {
			selector: '[aria-hidden="true"]',
		});
		expect(hiddenElements.length).toBeGreaterThanOrEqual(2); // At least icon container and gradient
	});
});
