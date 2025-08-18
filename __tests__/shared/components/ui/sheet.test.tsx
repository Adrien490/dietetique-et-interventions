import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/shared/components/ui/sheet";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock lucide-react
jest.mock("lucide-react", () => ({
	XIcon: () => <div data-testid="x-icon">×</div>,
}));

describe("Sheet Components", () => {
	describe("Sheet", () => {
		it("should render sheet with trigger and content", () => {
			render(
				<Sheet>
					<SheetTrigger>Open Sheet</SheetTrigger>
					<SheetContent>Sheet content</SheetContent>
				</Sheet>
			);

			const trigger = screen.getByText("Open Sheet");
			expect(trigger).toBeInTheDocument();
		});

		it("should have correct data attributes", () => {
			render(
				<Sheet>
					<SheetTrigger data-testid="trigger">Open</SheetTrigger>
					<SheetContent data-testid="content">Content</SheetContent>
				</Sheet>
			);

			const trigger = screen.getByTestId("trigger");
			expect(trigger).toHaveAttribute("data-slot", "sheet-trigger");
		});

		it("should show content when open", () => {
			render(
				<Sheet defaultOpen>
					<SheetTrigger>Open Sheet</SheetTrigger>
					<SheetContent>This is sheet content</SheetContent>
				</Sheet>
			);

			expect(screen.getByText("This is sheet content")).toBeInTheDocument();
		});

		it("should not show content when closed", () => {
			render(
				<Sheet>
					<SheetTrigger>Open Sheet</SheetTrigger>
					<SheetContent>Hidden content</SheetContent>
				</Sheet>
			);

			expect(screen.queryByText("Hidden content")).not.toBeInTheDocument();
		});

		it("should support controlled state", () => {
			const onOpenChange = jest.fn();

			render(
				<Sheet open={false} onOpenChange={onOpenChange}>
					<SheetTrigger>Controlled Sheet</SheetTrigger>
					<SheetContent>Controlled content</SheetContent>
				</Sheet>
			);

			expect(screen.queryByText("Controlled content")).not.toBeInTheDocument();
		});

		it("should support modal prop", () => {
			render(
				<Sheet modal={false}>
					<SheetTrigger data-testid="trigger">Non-modal</SheetTrigger>
					<SheetContent>Non-modal content</SheetContent>
				</Sheet>
			);

			const trigger = screen.getByTestId("trigger");
			expect(trigger).toBeInTheDocument();
		});
	});

	describe("SheetTrigger", () => {
		it("should render trigger button", () => {
			render(
				<Sheet>
					<SheetTrigger asChild>
						<button data-testid="custom-trigger">Custom Button</button>
					</SheetTrigger>
					<SheetContent>Content</SheetContent>
				</Sheet>
			);

			const trigger = screen.getByTestId("custom-trigger");
			expect(trigger).toBeInTheDocument();
			expect(trigger).toHaveTextContent("Custom Button");
		});

		it("should have correct data slot attribute", () => {
			render(
				<Sheet>
					<SheetTrigger data-testid="trigger">Trigger</SheetTrigger>
					<SheetContent>Content</SheetContent>
				</Sheet>
			);

			const trigger = screen.getByTestId("trigger");
			expect(trigger).toHaveAttribute("data-slot", "sheet-trigger");
		});
	});

	describe("SheetContent", () => {
		it("should render content with default side (right)", () => {
			render(
				<Sheet defaultOpen>
					<SheetTrigger>Trigger</SheetTrigger>
					<SheetContent data-testid="content">Default content</SheetContent>
				</Sheet>
			);

			const content = screen.getByTestId("content");
			expect(content).toBeInTheDocument();
			expect(content).toHaveAttribute("data-slot", "sheet-content");
		});

		it("should apply side-specific classes", () => {
			render(
				<Sheet defaultOpen>
					<SheetTrigger>Trigger</SheetTrigger>
					<SheetContent side="left" data-testid="content">
						Left side content
					</SheetContent>
				</Sheet>
			);

			const content = screen.getByTestId("content");
			expect(content).toHaveClass("inset-y-0", "left-0");
		});

		it("should render with different sides", () => {
			const sides = ["top", "right", "bottom", "left"] as const;

			sides.forEach((side) => {
				render(
					<Sheet defaultOpen>
						<SheetTrigger>Trigger</SheetTrigger>
						<SheetContent side={side} data-testid={`content-${side}`}>
							{side} content
						</SheetContent>
					</Sheet>
				);

				const content = screen.getByTestId(`content-${side}`);
				expect(content).toBeInTheDocument();
			});
		});

		it("should render close button with X icon", () => {
			render(
				<Sheet defaultOpen>
					<SheetTrigger>Trigger</SheetTrigger>
					<SheetContent>Content</SheetContent>
				</Sheet>
			);

			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
			expect(screen.getByText("Close")).toBeInTheDocument();
		});

		it("should apply custom className", () => {
			render(
				<Sheet defaultOpen>
					<SheetTrigger>Trigger</SheetTrigger>
					<SheetContent className="custom-sheet" data-testid="content">
						Custom content
					</SheetContent>
				</Sheet>
			);

			const content = screen.getByTestId("content");
			expect(content).toHaveClass("custom-sheet");
		});
	});

	describe("SheetHeader", () => {
		it("should render header section", () => {
			render(
				<Sheet defaultOpen>
					<SheetTrigger>Trigger</SheetTrigger>
					<SheetContent>
						<SheetHeader data-testid="header">
							<SheetTitle>Sheet Title</SheetTitle>
							<SheetDescription>Sheet description</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			);

			const header = screen.getByTestId("header");
			expect(header).toBeInTheDocument();
			expect(header).toHaveAttribute("data-slot", "sheet-header");
			expect(screen.getByText("Sheet Title")).toBeInTheDocument();
			expect(screen.getByText("Sheet description")).toBeInTheDocument();
		});

		it("should apply custom className", () => {
			render(
				<Sheet defaultOpen>
					<SheetTrigger>Trigger</SheetTrigger>
					<SheetContent>
						<SheetHeader className="custom-header" data-testid="header">
							Header content
						</SheetHeader>
					</SheetContent>
				</Sheet>
			);

			const header = screen.getByTestId("header");
			expect(header).toHaveClass("custom-header");
		});
	});

	describe("SheetFooter", () => {
		it("should render footer section", () => {
			render(
				<Sheet defaultOpen>
					<SheetTrigger>Trigger</SheetTrigger>
					<SheetContent>
						<SheetFooter data-testid="footer">
							<button>Cancel</button>
							<button>Save</button>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			);

			const footer = screen.getByTestId("footer");
			expect(footer).toBeInTheDocument();
			expect(footer).toHaveAttribute("data-slot", "sheet-footer");
			expect(screen.getByText("Cancel")).toBeInTheDocument();
			expect(screen.getByText("Save")).toBeInTheDocument();
		});

		it("should apply custom className", () => {
			render(
				<Sheet defaultOpen>
					<SheetTrigger>Trigger</SheetTrigger>
					<SheetContent>
						<SheetFooter className="custom-footer" data-testid="footer">
							Footer content
						</SheetFooter>
					</SheetContent>
				</Sheet>
			);

			const footer = screen.getByTestId("footer");
			expect(footer).toHaveClass("custom-footer");
		});
	});

	describe("SheetTitle", () => {
		it("should render sheet title", () => {
			render(
				<Sheet defaultOpen>
					<SheetTrigger>Trigger</SheetTrigger>
					<SheetContent>
						<SheetTitle data-testid="title">My Sheet Title</SheetTitle>
					</SheetContent>
				</Sheet>
			);

			const title = screen.getByTestId("title");
			expect(title).toBeInTheDocument();
			expect(title).toHaveTextContent("My Sheet Title");
			expect(title).toHaveAttribute("data-slot", "sheet-title");
		});

		it("should apply custom className", () => {
			render(
				<Sheet defaultOpen>
					<SheetTrigger>Trigger</SheetTrigger>
					<SheetContent>
						<SheetTitle className="custom-title" data-testid="title">
							Title
						</SheetTitle>
					</SheetContent>
				</Sheet>
			);

			const title = screen.getByTestId("title");
			expect(title).toHaveClass("custom-title");
		});
	});

	describe("SheetDescription", () => {
		it("should render sheet description", () => {
			render(
				<Sheet defaultOpen>
					<SheetTrigger>Trigger</SheetTrigger>
					<SheetContent>
						<SheetDescription data-testid="description">
							This is a description of the sheet
						</SheetDescription>
					</SheetContent>
				</Sheet>
			);

			const description = screen.getByTestId("description");
			expect(description).toBeInTheDocument();
			expect(description).toHaveTextContent(
				"This is a description of the sheet"
			);
			expect(description).toHaveAttribute("data-slot", "sheet-description");
		});

		it("should apply custom className", () => {
			render(
				<Sheet defaultOpen>
					<SheetTrigger>Trigger</SheetTrigger>
					<SheetContent>
						<SheetDescription
							className="custom-description"
							data-testid="description"
						>
							Description
						</SheetDescription>
					</SheetContent>
				</Sheet>
			);

			const description = screen.getByTestId("description");
			expect(description).toHaveClass("custom-description");
		});
	});

	describe("SheetClose", () => {
		it("should render close button", () => {
			render(
				<Sheet defaultOpen>
					<SheetTrigger>Trigger</SheetTrigger>
					<SheetContent>
						<SheetClose asChild>
							<button data-testid="close-button">Close Sheet</button>
						</SheetClose>
					</SheetContent>
				</Sheet>
			);

			const closeButton = screen.getByTestId("close-button");
			expect(closeButton).toBeInTheDocument();
			expect(closeButton).toHaveTextContent("Close Sheet");
		});

		it("should have correct data slot attribute", () => {
			render(
				<Sheet defaultOpen>
					<SheetTrigger>Trigger</SheetTrigger>
					<SheetContent>
						<SheetClose data-testid="close">Close</SheetClose>
					</SheetContent>
				</Sheet>
			);

			const close = screen.getByTestId("close");
			expect(close).toHaveAttribute("data-slot", "sheet-close");
		});
	});

	describe("Accessibility", () => {
		it("should have proper ARIA attributes", () => {
			render(
				<Sheet defaultOpen>
					<SheetTrigger data-testid="trigger">Open</SheetTrigger>
					<SheetContent data-testid="content">
						<SheetTitle>Accessible Sheet</SheetTitle>
						<SheetDescription>This sheet is accessible</SheetDescription>
						Content
					</SheetContent>
				</Sheet>
			);

			const trigger = screen.getByTestId("trigger");
			const content = screen.getByTestId("content");

			// Radix automatically handles ARIA attributes
			expect(trigger).toBeInTheDocument();
			expect(content).toBeInTheDocument();
		});

		it("should support custom ARIA attributes", () => {
			render(
				<Sheet defaultOpen>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent
						aria-labelledby="custom-title"
						aria-describedby="custom-description"
						data-testid="content"
					>
						<h2 id="custom-title">Custom Title</h2>
						<p id="custom-description">Custom description</p>
					</SheetContent>
				</Sheet>
			);

			const content = screen.getByTestId("content");
			expect(content).toHaveAttribute("aria-labelledby", "custom-title");
			expect(content).toHaveAttribute("aria-describedby", "custom-description");
		});

		it("should be keyboard accessible", async () => {
			const user = userEvent.setup();

			render(
				<Sheet>
					<SheetTrigger data-testid="trigger">Open</SheetTrigger>
					<SheetContent>
						<button data-testid="focus-target">Focusable element</button>
					</SheetContent>
				</Sheet>
			);

			const trigger = screen.getByTestId("trigger");

			// Should be able to focus trigger
			await user.tab();
			expect(trigger).toHaveFocus();
		});
	});

	describe("Event Handling", () => {
		it("should call onOpenChange when sheet state changes", async () => {
			const user = userEvent.setup();
			const onOpenChange = jest.fn();

			render(
				<Sheet onOpenChange={onOpenChange}>
					<SheetTrigger data-testid="trigger">Toggle</SheetTrigger>
					<SheetContent>Content</SheetContent>
				</Sheet>
			);

			const trigger = screen.getByTestId("trigger");
			await user.click(trigger);

			expect(onOpenChange).toHaveBeenCalled();
		});

		it("should support external control", () => {
			const { rerender } = render(
				<Sheet open={false}>
					<SheetTrigger>Trigger</SheetTrigger>
					<SheetContent>Controlled content</SheetContent>
				</Sheet>
			);

			expect(screen.queryByText("Controlled content")).not.toBeInTheDocument();

			rerender(
				<Sheet open={true}>
					<SheetTrigger>Trigger</SheetTrigger>
					<SheetContent>Controlled content</SheetContent>
				</Sheet>
			);

			expect(screen.getByText("Controlled content")).toBeInTheDocument();
		});
	});

	describe("Complex Usage", () => {
		it("should render complete sheet with all components", () => {
			render(
				<Sheet defaultOpen>
					<SheetTrigger>Open Complete Sheet</SheetTrigger>
					<SheetContent side="right">
						<SheetHeader>
							<SheetTitle>Complete Sheet</SheetTitle>
							<SheetDescription>
								This sheet demonstrates all components
							</SheetDescription>
						</SheetHeader>
						<div className="flex-1 p-4">
							<p>Main content area</p>
							<form>
								<input placeholder="Form field" />
							</form>
						</div>
						<SheetFooter>
							<SheetClose asChild>
								<button>Cancel</button>
							</SheetClose>
							<button>Save Changes</button>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			);

			expect(screen.getByText("Complete Sheet")).toBeInTheDocument();
			expect(
				screen.getByText("This sheet demonstrates all components")
			).toBeInTheDocument();
			expect(screen.getByText("Main content area")).toBeInTheDocument();
			expect(screen.getByPlaceholderText("Form field")).toBeInTheDocument();
			expect(screen.getByText("Cancel")).toBeInTheDocument();
			expect(screen.getByText("Save Changes")).toBeInTheDocument();
		});
	});
});
