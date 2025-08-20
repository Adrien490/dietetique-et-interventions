import { ContentCard } from "@/shared/components/content-card";
import { render, screen } from "@testing-library/react";

// Mock the utils function
jest.mock("@/shared/utils", () => ({
	cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

// Mock UI Card components
jest.mock("@/shared/components/ui/card", () => ({
	Card: ({ children, className, ...props }: any) => (
		<div className={className} data-testid="card" {...props}>
			{children}
		</div>
	),
	CardContent: ({ children, ...props }: any) => (
		<div data-testid="card-content" {...props}>
			{children}
		</div>
	),
	CardHeader: ({ children, ...props }: any) => (
		<div data-testid="card-header" {...props}>
			{children}
		</div>
	),
	CardTitle: ({ children, className, ...props }: any) => (
		<h3 className={className} data-testid="card-title" {...props}>
			{children}
		</h3>
	),
}));

describe("ContentCard", () => {
	it("should render with title and children", () => {
		render(
			<ContentCard title="Test Title">
				<p>Test content</p>
			</ContentCard>
		);

		expect(screen.getByTestId("card")).toBeInTheDocument();
		expect(screen.getByTestId("card-header")).toBeInTheDocument();
		expect(screen.getByTestId("card-title")).toBeInTheDocument();
		expect(screen.getByTestId("card-content")).toBeInTheDocument();

		expect(screen.getByText("Test Title")).toBeInTheDocument();
		expect(screen.getByText("Test content")).toBeInTheDocument();
	});

	it("should apply correct title styling", () => {
		render(
			<ContentCard title="Styled Title">
				<div>Content</div>
			</ContentCard>
		);

		const title = screen.getByTestId("card-title");
		expect(title).toHaveClass("text-lg", "font-semibold");
	});

	it("should apply custom className to Card", () => {
		render(
			<ContentCard title="Test" className="custom-class">
				<div>Content</div>
			</ContentCard>
		);

		const card = screen.getByTestId("card");
		expect(card).toHaveClass("custom-class");
	});

	it("should render without custom className", () => {
		render(
			<ContentCard title="Test">
				<div>Content</div>
			</ContentCard>
		);

		const card = screen.getByTestId("card");
		// Should not have undefined or null classes
		expect(card.className).not.toContain("undefined");
		expect(card.className).not.toContain("null");
	});

	it("should render complex children content", () => {
		const complexContent = (
			<div>
				<p>Paragraph 1</p>
				<ul>
					<li>Item 1</li>
					<li>Item 2</li>
				</ul>
				<button>Action Button</button>
			</div>
		);

		render(<ContentCard title="Complex Content">{complexContent}</ContentCard>);

		expect(screen.getByText("Complex Content")).toBeInTheDocument();
		expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
		expect(screen.getByText("Item 1")).toBeInTheDocument();
		expect(screen.getByText("Item 2")).toBeInTheDocument();
		expect(screen.getByText("Action Button")).toBeInTheDocument();
	});

	it("should handle empty title", () => {
		render(
			<ContentCard title="">
				<div>Content with empty title</div>
			</ContentCard>
		);

		const title = screen.getByTestId("card-title");
		expect(title).toHaveTextContent("");
		expect(screen.getByText("Content with empty title")).toBeInTheDocument();
	});

	it("should handle multiple className values", () => {
		render(
			<ContentCard title="Test" className="class1 class2 class3">
				<div>Content</div>
			</ContentCard>
		);

		const card = screen.getByTestId("card");
		expect(card).toHaveClass("class1", "class2", "class3");
	});

	it("should maintain proper card structure", () => {
		render(
			<ContentCard title="Structure Test">
				<p>Testing structure</p>
			</ContentCard>
		);

		const card = screen.getByTestId("card");
		const header = screen.getByTestId("card-header");
		const title = screen.getByTestId("card-title");
		const content = screen.getByTestId("card-content");

		// Check that header contains title
		expect(header).toContainElement(title);
		// Check that card contains both header and content
		expect(card).toContainElement(header);
		expect(card).toContainElement(content);
		// Check that content contains the children
		expect(content).toContainElement(screen.getByText("Testing structure"));
	});

	it("should render with React fragments as children", () => {
		render(
			<ContentCard title="Fragment Test">
				<>
					<span>Fragment child 1</span>
					<span>Fragment child 2</span>
				</>
			</ContentCard>
		);

		expect(screen.getByText("Fragment child 1")).toBeInTheDocument();
		expect(screen.getByText("Fragment child 2")).toBeInTheDocument();
	});

	it("should handle special characters in title", () => {
		const specialTitle = "Special chars: !@#$%^&*()_+-={}[]|\\:;\"'<>?,./ àéèù";

		render(
			<ContentCard title={specialTitle}>
				<div>Content</div>
			</ContentCard>
		);

		expect(screen.getByText(specialTitle)).toBeInTheDocument();
	});

	it("should render with zero or falsy children", () => {
		render(<ContentCard title="Empty Content">{null}</ContentCard>);

		expect(screen.getByText("Empty Content")).toBeInTheDocument();
		expect(screen.getByTestId("card-content")).toBeInTheDocument();
	});
});
