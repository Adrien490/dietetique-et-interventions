import { PageHeader } from "@/shared/components/page-header";
import { render, screen } from "@testing-library/react";

describe("PageHeader", () => {
	it("should render title", () => {
		render(<PageHeader title="Test Title" />);

		const title = screen.getByRole("heading", { level: 1 });
		expect(title).toBeInTheDocument();
		expect(title).toHaveTextContent("Test Title");
	});

	it("should apply correct title styling", () => {
		render(<PageHeader title="Test Title" />);

		const title = screen.getByRole("heading", { level: 1 });
		expect(title).toHaveClass(
			"text-2xl",
			"font-semibold",
			"tracking-tight",
			"sm:text-3xl"
		);
	});

	it("should render description when provided", () => {
		render(<PageHeader title="Test Title" description="Test description" />);

		const description = screen.getByRole("heading", { level: 2 });
		expect(description).toBeInTheDocument();
		expect(description).toHaveTextContent("Test description");
	});

	it("should apply correct description styling", () => {
		render(<PageHeader title="Test Title" description="Test description" />);

		const description = screen.getByRole("heading", { level: 2 });
		expect(description).toHaveClass(
			"text-sm",
			"text-muted-foreground",
			"sm:text-base",
			"max-w-prose"
		);
	});

	it("should not render description when not provided", () => {
		render(<PageHeader title="Test Title" />);

		const description = screen.queryByRole("heading", { level: 2 });
		expect(description).not.toBeInTheDocument();
	});

	it("should render action when provided", () => {
		const action = <button data-testid="action-button">Action</button>;

		render(<PageHeader title="Test Title" action={action} />);

		expect(screen.getByTestId("action-button")).toBeInTheDocument();
		expect(screen.getByText("Action")).toBeInTheDocument();
	});

	it("should not render action container when action not provided", () => {
		const { container } = render(<PageHeader title="Test Title" />);

		const actionContainer = container.querySelector(".md\\:ml-auto");
		expect(actionContainer).not.toBeInTheDocument();
	});

	it("should apply correct layout classes", () => {
		const { container } = render(<PageHeader title="Test Title" />);

		const mainContainer = container.firstChild;
		expect(mainContainer).toHaveClass("pt-4", "space-y-4", "mb-4");
	});

	it("should handle all props together", () => {
		const action = <button data-testid="action-button">Save</button>;

		render(
			<PageHeader
				title="Page Title"
				description="Page description"
				action={action}
			/>
		);

		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
			"Page Title"
		);
		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			"Page description"
		);
		expect(screen.getByTestId("action-button")).toBeInTheDocument();
	});

	it("should have responsive layout classes", () => {
		const { container } = render(<PageHeader title="Test Title" />);

		const flexContainer = container.querySelector(
			".flex.flex-col.md\\:flex-row"
		);
		expect(flexContainer).toBeInTheDocument();
		expect(flexContainer).toHaveClass("md:items-center", "md:justify-between");
	});

	it("should handle complex action components", () => {
		const complexAction = (
			<div>
				<button data-testid="btn1">Button 1</button>
				<button data-testid="btn2">Button 2</button>
			</div>
		);

		render(<PageHeader title="Test Title" action={complexAction} />);

		expect(screen.getByTestId("btn1")).toBeInTheDocument();
		expect(screen.getByTestId("btn2")).toBeInTheDocument();
	});

	it("should handle empty strings gracefully", () => {
		render(<PageHeader title="" description="" />);

		const title = screen.getByRole("heading", { level: 1 });
		expect(title).toHaveTextContent("");

		// Description should not be rendered when empty string is passed
		const description = screen.queryByRole("heading", { level: 2 });
		expect(description).not.toBeInTheDocument();
	});

	it("should have correct semantic structure", () => {
		render(<PageHeader title="Test Title" description="Test description" />);

		// Should have h1 for title and h2 for description
		expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
		expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();

		// No other headings should be present
		expect(screen.queryByRole("heading", { level: 3 })).not.toBeInTheDocument();
	});
});
