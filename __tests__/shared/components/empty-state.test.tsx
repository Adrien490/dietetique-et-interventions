import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { render, screen } from "@testing-library/react";

// Mock the utils function
jest.mock("@/shared/utils", () => ({
	cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

// Mock UI Card component
jest.mock("@/shared/components/ui/card", () => ({
	Card: ({ children, className, ...props }: any) => (
		<div className={className} data-testid="empty-state-card" {...props}>
			{children}
		</div>
	),
}));

describe("EmptyState", () => {
	it("should render basic empty state with title", () => {
		render(<EmptyState title="No items found" />);

		expect(screen.getByTestId("empty-state-card")).toBeInTheDocument();
		expect(screen.getByText("No items found")).toBeInTheDocument();
	});

	it("should render with title and description", () => {
		render(
			<EmptyState
				title="No results"
				description="Try adjusting your search or filter to find what you're looking for."
			/>
		);

		expect(screen.getByText("No results")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Try adjusting your search or filter to find what you're looking for."
			)
		).toBeInTheDocument();
	});

	it("should render with icon", () => {
		const TestIcon = <span data-testid="test-icon">📦</span>;

		render(<EmptyState title="Empty" icon={TestIcon} />);

		expect(screen.getByTestId("test-icon")).toBeInTheDocument();
		expect(screen.getByText("Empty")).toBeInTheDocument();
	});

	it("should render with custom illustration instead of icon", () => {
		const TestIcon = <span data-testid="test-icon">📦</span>;
		const TestIllustration = (
			<div data-testid="test-illustration">Custom SVG</div>
		);

		render(
			<EmptyState
				title="Empty"
				icon={TestIcon}
				illustration={TestIllustration}
			/>
		);

		// Should render illustration instead of icon
		expect(screen.getByTestId("test-illustration")).toBeInTheDocument();
		expect(screen.queryByTestId("test-icon")).not.toBeInTheDocument();
	});

	it("should render with action button", () => {
		const action = <button data-testid="action-button">Add Item</button>;

		render(<EmptyState title="Empty" action={action} />);

		expect(screen.getByTestId("action-button")).toBeInTheDocument();
		expect(screen.getByText("Add Item")).toBeInTheDocument();
	});

	it("should render with children content", () => {
		render(
			<EmptyState title="Empty">
				<div data-testid="custom-content">Custom content here</div>
			</EmptyState>
		);

		expect(screen.getByTestId("custom-content")).toBeInTheDocument();
		expect(screen.getByText("Custom content here")).toBeInTheDocument();
	});

	it("should apply custom className", () => {
		render(<EmptyState title="Empty" className="custom-empty-state" />);

		const card = screen.getByTestId("empty-state-card");
		expect(card).toHaveClass("custom-empty-state");
	});

	it("should apply default styling classes", () => {
		render(<EmptyState title="Empty" />);

		const card = screen.getByTestId("empty-state-card");
		expect(card).toHaveClass(
			"flex",
			"flex-col",
			"items-center",
			"justify-center",
			"text-center",
			"w-full",
			"p-6"
		);
	});

	it("should render complete empty state with all props", () => {
		const icon = <span data-testid="icon">🔍</span>;
		const action = <button data-testid="action">Search Again</button>;

		render(
			<EmptyState
				title="No search results"
				description="We couldn't find any items matching your search criteria."
				icon={icon}
				action={action}
				className="custom-class"
			>
				<div data-testid="extra-content">Additional help content</div>
			</EmptyState>
		);

		expect(screen.getByText("No search results")).toBeInTheDocument();
		expect(
			screen.getByText(
				"We couldn't find any items matching your search criteria."
			)
		).toBeInTheDocument();
		expect(screen.getByTestId("icon")).toBeInTheDocument();
		expect(screen.getByTestId("action")).toBeInTheDocument();
		expect(screen.getByTestId("extra-content")).toBeInTheDocument();
	});

	it("should not render title when not provided", () => {
		render(<EmptyState description="Only description" />);

		// Should not have any heading elements
		expect(screen.queryByRole("heading")).not.toBeInTheDocument();
		expect(screen.getByText("Only description")).toBeInTheDocument();
	});

	it("should not render description when not provided", () => {
		render(<EmptyState title="Only title" />);

		expect(screen.getByText("Only title")).toBeInTheDocument();
		// Should not render description text
		expect(
			screen
				.getByTestId("empty-state-card")
				.querySelector(".text-muted-foreground")
		).not.toBeInTheDocument();
	});

	it("should not render icon container when no icon provided", () => {
		render(<EmptyState title="No icon" />);

		const card = screen.getByTestId("empty-state-card");
		expect(
			card.querySelector(".rounded-full.bg-muted\\/30")
		).not.toBeInTheDocument();
	});

	it("should not render action container when no action provided", () => {
		render(<EmptyState title="No action" />);

		const card = screen.getByTestId("empty-state-card");
		expect(
			card.querySelector(".mt-6.w-full.flex.justify-center")
		).not.toBeInTheDocument();
	});

	it("should not render children container when no children provided", () => {
		render(<EmptyState title="No children" />);

		const card = screen.getByTestId("empty-state-card");
		// Should not have the children wrapper div
		const childrenContainer = Array.from(
			card.querySelectorAll(".mt-6.w-full")
		).find((el) => !el.classList.contains("flex"));
		expect(childrenContainer).toBeUndefined();
	});

	it("should handle empty strings gracefully", () => {
		render(<EmptyState title="" description="" />);

		const card = screen.getByTestId("empty-state-card");
		expect(card).toBeInTheDocument();

		// Empty title should not render
		expect(card.querySelector(".text-lg.font-medium")).not.toBeInTheDocument();
		// Empty description should not render
		expect(
			card.querySelector(".text-muted-foreground")
		).not.toBeInTheDocument();
	});

	it("should pass through additional props to Card", () => {
		render(
			<EmptyState title="Test" data-custom="custom-value" id="empty-state-id" />
		);

		const card = screen.getByTestId("empty-state-card");
		expect(card).toHaveAttribute("data-custom", "custom-value");
		expect(card).toHaveAttribute("id", "empty-state-id");
	});

	it("should handle complex JSX in title and description", () => {
		const complexTitle = (
			<span>
				Complex <strong>title</strong> with <em>formatting</em>
			</span>
		);
		const complexDescription = (
			<span>
				Description with <a href="#">link</a> and formatting
			</span>
		);

		render(
			<EmptyState title={complexTitle} description={complexDescription} />
		);

		// Check if the complex title structure is rendered correctly
		expect(screen.getByText(/Complex/)).toBeInTheDocument();
		expect(screen.getByText("title")).toBeInTheDocument();
		expect(screen.getByText("formatting")).toBeInTheDocument();
		expect(screen.getByText("link")).toBeInTheDocument();
	});

	it("should maintain proper spacing between elements", () => {
		const icon = <span>🔍</span>;
		const action = <button>Action</button>;

		render(
			<EmptyState
				title="Title"
				description="Description"
				icon={icon}
				action={action}
			>
				<div>Children</div>
			</EmptyState>
		);

		const card = screen.getByTestId("empty-state-card");

		// Check for proper spacing classes
		expect(card.querySelector(".mb-4")).toBeInTheDocument(); // Icon margin
		expect(card.querySelector(".mt-2")).toBeInTheDocument(); // Description margin
		expect(card.querySelector(".mt-6")).toBeInTheDocument(); // Action margin
	});
});
