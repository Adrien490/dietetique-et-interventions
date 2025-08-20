import { PageContainer } from "@/shared/components/page-container";
import { render, screen } from "@testing-library/react";

// Mock the utils function
jest.mock("@/shared/utils", () => ({
	cn: (...args: string[]) => args.filter(Boolean).join(" "),
}));

describe("PageContainer", () => {
	it("should render children inside container", () => {
		render(
			<PageContainer>
				<div data-testid="child-content">Test content</div>
			</PageContainer>
		);

		const container = screen.getByText("Test content").parentElement;
		expect(container).toBeInTheDocument();
		expect(screen.getByTestId("child-content")).toBeInTheDocument();
	});

	it("should apply default padding classes", () => {
		const { container } = render(
			<PageContainer>
				<div>Content</div>
			</PageContainer>
		);

		const pageContainer = container.firstChild as HTMLElement;
		expect(pageContainer).toHaveClass("px-4", "sm:px-6", "lg:px-8");
	});

	it("should apply custom className along with default classes", () => {
		const { container } = render(
			<PageContainer className="custom-class">
				<div>Content</div>
			</PageContainer>
		);

		const pageContainer = container.firstChild as HTMLElement;
		expect(pageContainer).toHaveClass(
			"px-4",
			"sm:px-6",
			"lg:px-8",
			"custom-class"
		);
	});

	it("should render without custom className", () => {
		const { container } = render(
			<PageContainer>
				<div>Content</div>
			</PageContainer>
		);

		const pageContainer = container.firstChild as HTMLElement;
		expect(pageContainer).toHaveClass("px-4", "sm:px-6", "lg:px-8");
		// Should not have undefined class
		expect(pageContainer.className).not.toContain("undefined");
	});

	it("should render multiple children", () => {
		render(
			<PageContainer>
				<div data-testid="child-1">Child 1</div>
				<div data-testid="child-2">Child 2</div>
				<span data-testid="child-3">Child 3</span>
			</PageContainer>
		);

		expect(screen.getByTestId("child-1")).toBeInTheDocument();
		expect(screen.getByTestId("child-2")).toBeInTheDocument();
		expect(screen.getByTestId("child-3")).toBeInTheDocument();
	});

	it("should render complex nested content", () => {
		render(
			<PageContainer>
				<div>
					<header>Header content</header>
					<main>
						<section>
							<h1>Title</h1>
							<p>Paragraph content</p>
						</section>
					</main>
					<footer>Footer content</footer>
				</div>
			</PageContainer>
		);

		expect(screen.getByText("Header content")).toBeInTheDocument();
		expect(screen.getByText("Title")).toBeInTheDocument();
		expect(screen.getByText("Paragraph content")).toBeInTheDocument();
		expect(screen.getByText("Footer content")).toBeInTheDocument();
	});

	it("should handle React fragments as children", () => {
		render(
			<PageContainer>
				<>
					<div>Fragment child 1</div>
					<div>Fragment child 2</div>
				</>
			</PageContainer>
		);

		expect(screen.getByText("Fragment child 1")).toBeInTheDocument();
		expect(screen.getByText("Fragment child 2")).toBeInTheDocument();
	});

	it("should handle empty or null children", () => {
		const { container } = render(<PageContainer>{null}</PageContainer>);

		const pageContainer = container.firstChild as HTMLElement;
		expect(pageContainer).toBeInTheDocument();
		expect(pageContainer).toHaveClass("px-4", "sm:px-6", "lg:px-8");
	});

	it("should combine multiple custom classes correctly", () => {
		const { container } = render(
			<PageContainer className="custom-1 custom-2 bg-gray-100">
				<div>Content</div>
			</PageContainer>
		);

		const pageContainer = container.firstChild as HTMLElement;
		expect(pageContainer).toHaveClass(
			"px-4",
			"sm:px-6",
			"lg:px-8",
			"custom-1",
			"custom-2",
			"bg-gray-100"
		);
	});

	it("should render as a div element", () => {
		const { container } = render(
			<PageContainer>
				<div>Content</div>
			</PageContainer>
		);

		const pageContainer = container.firstChild as HTMLElement;
		expect(pageContainer.tagName.toLowerCase()).toBe("div");
	});

	it("should handle string children", () => {
		render(<PageContainer>Simple string content</PageContainer>);

		expect(screen.getByText("Simple string content")).toBeInTheDocument();
	});

	it("should maintain responsive design classes", () => {
		const { container } = render(
			<PageContainer>
				<div>Responsive content</div>
			</PageContainer>
		);

		const pageContainer = container.firstChild as HTMLElement;
		// Check that all responsive padding classes are present
		expect(pageContainer.className).toContain("px-4"); // Mobile
		expect(pageContainer.className).toContain("sm:px-6"); // Small screens
		expect(pageContainer.className).toContain("lg:px-8"); // Large screens
	});

	it("should handle conditional className", () => {
		const shouldApplyClass = true;
		const { container } = render(
			<PageContainer className={shouldApplyClass ? "conditional-class" : ""}>
				<div>Content</div>
			</PageContainer>
		);

		const pageContainer = container.firstChild as HTMLElement;
		expect(pageContainer).toHaveClass("conditional-class");
	});

	it("should handle falsy className values", () => {
		const { container } = render(
			<PageContainer className={undefined}>
				<div>Content</div>
			</PageContainer>
		);

		const pageContainer = container.firstChild as HTMLElement;
		expect(pageContainer).toHaveClass("px-4", "sm:px-6", "lg:px-8");
		expect(pageContainer.className).not.toContain("undefined");
	});
});
