import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { render, screen } from "@testing-library/react";

describe("Card Components", () => {
	describe("Card", () => {
		it("should render card with default classes", () => {
			render(<Card>Card content</Card>);

			const card = screen.getByText("Card content");
			expect(card).toBeInTheDocument();
			expect(card).toHaveClass(
				"bg-card",
				"text-card-foreground",
				"flex",
				"flex-col",
				"gap-6",
				"rounded-xl",
				"border",
				"py-6",
				"shadow-sm"
			);
			expect(card).toHaveAttribute("data-slot", "card");
		});

		it("should apply custom className", () => {
			render(<Card className="custom-card">Card content</Card>);

			const card = screen.getByText("Card content");
			expect(card).toHaveClass("custom-card");
		});

		it("should pass through other props", () => {
			render(<Card data-testid="test-card">Card content</Card>);

			const card = screen.getByTestId("test-card");
			expect(card).toBeInTheDocument();
		});
	});

	describe("CardHeader", () => {
		it("should render header with default classes", () => {
			render(<CardHeader>Header content</CardHeader>);

			const header = screen.getByText("Header content");
			expect(header).toBeInTheDocument();
			expect(header).toHaveClass(
				"@container/card-header",
				"grid",
				"auto-rows-min",
				"grid-rows-[auto_auto]",
				"items-start",
				"gap-1.5",
				"px-6"
			);
			expect(header).toHaveAttribute("data-slot", "card-header");
		});

		it("should apply custom className", () => {
			render(<CardHeader className="custom-header">Header content</CardHeader>);

			const header = screen.getByText("Header content");
			expect(header).toHaveClass("custom-header");
		});
	});

	describe("CardTitle", () => {
		it("should render title with default classes", () => {
			render(<CardTitle>Title content</CardTitle>);

			const title = screen.getByText("Title content");
			expect(title).toBeInTheDocument();
			expect(title).toHaveClass("leading-none", "font-semibold");
			expect(title).toHaveAttribute("data-slot", "card-title");
		});

		it("should apply custom className", () => {
			render(<CardTitle className="custom-title">Title content</CardTitle>);

			const title = screen.getByText("Title content");
			expect(title).toHaveClass("custom-title");
		});
	});

	describe("CardDescription", () => {
		it("should render description with default classes", () => {
			render(<CardDescription>Description content</CardDescription>);

			const description = screen.getByText("Description content");
			expect(description).toBeInTheDocument();
			expect(description).toHaveClass("text-muted-foreground", "text-sm");
			expect(description).toHaveAttribute("data-slot", "card-description");
		});

		it("should apply custom className", () => {
			render(<CardDescription className="custom-desc">Description content</CardDescription>);

			const description = screen.getByText("Description content");
			expect(description).toHaveClass("custom-desc");
		});
	});

	describe("CardAction", () => {
		it("should render action with default classes", () => {
			render(<CardAction>Action content</CardAction>);

			const action = screen.getByText("Action content");
			expect(action).toBeInTheDocument();
			expect(action).toHaveClass(
				"col-start-2",
				"row-span-2",
				"row-start-1",
				"self-start",
				"justify-self-end"
			);
			expect(action).toHaveAttribute("data-slot", "card-action");
		});

		it("should apply custom className", () => {
			render(<CardAction className="custom-action">Action content</CardAction>);

			const action = screen.getByText("Action content");
			expect(action).toHaveClass("custom-action");
		});
	});

	describe("CardContent", () => {
		it("should render content with default classes", () => {
			render(<CardContent>Content text</CardContent>);

			const content = screen.getByText("Content text");
			expect(content).toBeInTheDocument();
			expect(content).toHaveClass("px-6");
			expect(content).toHaveAttribute("data-slot", "card-content");
		});

		it("should apply custom className", () => {
			render(<CardContent className="custom-content">Content text</CardContent>);

			const content = screen.getByText("Content text");
			expect(content).toHaveClass("custom-content");
		});
	});

	describe("CardFooter", () => {
		it("should render footer with default classes", () => {
			render(<CardFooter>Footer content</CardFooter>);

			const footer = screen.getByText("Footer content");
			expect(footer).toBeInTheDocument();
			expect(footer).toHaveClass("flex", "items-center", "px-6");
			expect(footer).toHaveAttribute("data-slot", "card-footer");
		});

		it("should apply custom className", () => {
			render(<CardFooter className="custom-footer">Footer content</CardFooter>);

			const footer = screen.getByText("Footer content");
			expect(footer).toHaveClass("custom-footer");
		});
	});

	describe("Complete Card Structure", () => {
		it("should render a complete card with all components", () => {
			render(
				<Card>
					<CardHeader>
						<CardTitle>Test Title</CardTitle>
						<CardDescription>Test Description</CardDescription>
						<CardAction>Action</CardAction>
					</CardHeader>
					<CardContent>Card body content</CardContent>
					<CardFooter>Footer content</CardFooter>
				</Card>
			);

			expect(screen.getByText("Test Title")).toBeInTheDocument();
			expect(screen.getByText("Test Description")).toBeInTheDocument();
			expect(screen.getByText("Action")).toBeInTheDocument();
			expect(screen.getByText("Card body content")).toBeInTheDocument();
			expect(screen.getByText("Footer content")).toBeInTheDocument();

			// Check data-slot attributes
			expect(screen.getByText("Test Title")).toHaveAttribute("data-slot", "card-title");
			expect(screen.getByText("Test Description")).toHaveAttribute("data-slot", "card-description");
			expect(screen.getByText("Action")).toHaveAttribute("data-slot", "card-action");
			expect(screen.getByText("Card body content")).toHaveAttribute("data-slot", "card-content");
			expect(screen.getByText("Footer content")).toHaveAttribute("data-slot", "card-footer");
		});

		it("should maintain proper structure without action", () => {
			render(
				<Card>
					<CardHeader>
						<CardTitle>Title Only</CardTitle>
						<CardDescription>Description Only</CardDescription>
					</CardHeader>
					<CardContent>Content</CardContent>
				</Card>
			);

			expect(screen.getByText("Title Only")).toBeInTheDocument();
			expect(screen.getByText("Description Only")).toBeInTheDocument();
			expect(screen.getByText("Content")).toBeInTheDocument();
		});
	});

	describe("Accessibility", () => {
		it("should be accessible as div elements", () => {
			render(
				<Card>
					<CardHeader>
						<CardTitle>Accessible Title</CardTitle>
					</CardHeader>
				</Card>
			);

			const card = screen.getByText("Accessible Title").closest('[data-slot="card"]');
			expect(card).toBeInTheDocument();
			expect(card?.tagName).toBe("DIV");
		});

		it("should support custom aria attributes", () => {
			render(
				<Card aria-label="Test card">
					<CardTitle>Title</CardTitle>
				</Card>
			);

			const card = screen.getByLabelText("Test card");
			expect(card).toBeInTheDocument();
		});
	});
});
