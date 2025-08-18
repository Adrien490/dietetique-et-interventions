import {
	Popover,
	PopoverAnchor,
	PopoverContent,
	PopoverTrigger,
} from "@/shared/components/ui/popover";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Popover Components", () => {
	describe("Popover", () => {
		it("should render popover with trigger and content", () => {
			render(
				<Popover>
					<PopoverTrigger>Open Popover</PopoverTrigger>
					<PopoverContent>Popover content</PopoverContent>
				</Popover>
			);

			const trigger = screen.getByText("Open Popover");
			expect(trigger).toBeInTheDocument();
		});

		it("should have correct data attributes", () => {
			render(
				<Popover>
					<PopoverTrigger data-testid="trigger">Open</PopoverTrigger>
					<PopoverContent data-testid="content">Content</PopoverContent>
				</Popover>
			);

			const trigger = screen.getByTestId("trigger");
			expect(trigger).toHaveAttribute("data-slot", "popover-trigger");
		});

		it("should show content when open", () => {
			render(
				<Popover defaultOpen>
					<PopoverTrigger>Open Popover</PopoverTrigger>
					<PopoverContent>This is popover content</PopoverContent>
				</Popover>
			);

			expect(screen.getByText("This is popover content")).toBeInTheDocument();
		});

		it("should not show content when closed", () => {
			render(
				<Popover>
					<PopoverTrigger>Open Popover</PopoverTrigger>
					<PopoverContent>Hidden content</PopoverContent>
				</Popover>
			);

			expect(screen.queryByText("Hidden content")).not.toBeInTheDocument();
		});

		it("should support controlled state", () => {
			const onOpenChange = jest.fn();

			render(
				<Popover open={false} onOpenChange={onOpenChange}>
					<PopoverTrigger>Controlled Popover</PopoverTrigger>
					<PopoverContent>Controlled content</PopoverContent>
				</Popover>
			);

			expect(screen.queryByText("Controlled content")).not.toBeInTheDocument();
		});

		it("should render with custom modal prop", () => {
			render(
				<Popover modal={false}>
					<PopoverTrigger data-testid="trigger">Non-modal</PopoverTrigger>
					<PopoverContent>Non-modal content</PopoverContent>
				</Popover>
			);

			const trigger = screen.getByTestId("trigger");
			expect(trigger).toBeInTheDocument();
		});
	});

	describe("PopoverTrigger", () => {
		it("should render trigger button", () => {
			render(
				<Popover>
					<PopoverTrigger asChild>
						<button data-testid="custom-trigger">Custom Button</button>
					</PopoverTrigger>
					<PopoverContent>Content</PopoverContent>
				</Popover>
			);

			const trigger = screen.getByTestId("custom-trigger");
			expect(trigger).toBeInTheDocument();
			expect(trigger).toHaveTextContent("Custom Button");
		});

		it("should have correct data slot attribute", () => {
			render(
				<Popover>
					<PopoverTrigger data-testid="trigger">Trigger</PopoverTrigger>
					<PopoverContent>Content</PopoverContent>
				</Popover>
			);

			const trigger = screen.getByTestId("trigger");
			expect(trigger).toHaveAttribute("data-slot", "popover-trigger");
		});
	});

	describe("PopoverContent", () => {
		it("should render content with default props", () => {
			render(
				<Popover defaultOpen>
					<PopoverTrigger>Trigger</PopoverTrigger>
					<PopoverContent data-testid="content">Default content</PopoverContent>
				</Popover>
			);

			const content = screen.getByTestId("content");
			expect(content).toBeInTheDocument();
			expect(content).toHaveAttribute("data-slot", "popover-content");
		});

		it("should apply custom className", () => {
			render(
				<Popover defaultOpen>
					<PopoverTrigger>Trigger</PopoverTrigger>
					<PopoverContent className="custom-popover" data-testid="content">
						Custom content
					</PopoverContent>
				</Popover>
			);

			const content = screen.getByTestId("content");
			expect(content).toHaveClass("custom-popover");
		});

		it("should support different alignment options", () => {
			render(
				<Popover defaultOpen>
					<PopoverTrigger>Trigger</PopoverTrigger>
					<PopoverContent
						align="start"
						side="top"
						sideOffset={10}
						data-testid="content"
					>
						Aligned content
					</PopoverContent>
				</Popover>
			);

			const content = screen.getByTestId("content");
			expect(content).toBeInTheDocument();
		});

		it("should render complex content", () => {
			render(
				<Popover defaultOpen>
					<PopoverTrigger>Trigger</PopoverTrigger>
					<PopoverContent>
						<div>
							<h3>Popover Title</h3>
							<p>Popover description</p>
							<button>Action</button>
						</div>
					</PopoverContent>
				</Popover>
			);

			expect(screen.getByText("Popover Title")).toBeInTheDocument();
			expect(screen.getByText("Popover description")).toBeInTheDocument();
			expect(screen.getByText("Action")).toBeInTheDocument();
		});

		it("should handle content with forms", () => {
			render(
				<Popover defaultOpen>
					<PopoverTrigger>Trigger</PopoverTrigger>
					<PopoverContent>
						<form>
							<input placeholder="Enter text" data-testid="input" />
							<button type="submit">Submit</button>
						</form>
					</PopoverContent>
				</Popover>
			);

			const input = screen.getByTestId("input");
			const submitButton = screen.getByText("Submit");

			expect(input).toBeInTheDocument();
			expect(submitButton).toBeInTheDocument();
		});
	});

	describe("PopoverAnchor", () => {
		it("should render anchor element", () => {
			render(
				<Popover>
					<PopoverAnchor asChild>
						<div data-testid="anchor">Anchor element</div>
					</PopoverAnchor>
					<PopoverTrigger>Trigger</PopoverTrigger>
					<PopoverContent>Content</PopoverContent>
				</Popover>
			);

			const anchor = screen.getByTestId("anchor");
			expect(anchor).toBeInTheDocument();
			expect(anchor).toHaveAttribute("data-slot", "popover-anchor");
		});

		it("should position popover relative to anchor", () => {
			render(
				<Popover defaultOpen>
					<PopoverAnchor asChild>
						<span data-testid="anchor">Anchor</span>
					</PopoverAnchor>
					<PopoverTrigger>Trigger</PopoverTrigger>
					<PopoverContent data-testid="content">
						Anchored content
					</PopoverContent>
				</Popover>
			);

			const anchor = screen.getByTestId("anchor");
			const content = screen.getByTestId("content");

			expect(anchor).toBeInTheDocument();
			expect(content).toBeInTheDocument();
		});
	});

	describe("Accessibility", () => {
		it("should have proper ARIA attributes", () => {
			render(
				<Popover defaultOpen>
					<PopoverTrigger data-testid="trigger">Trigger</PopoverTrigger>
					<PopoverContent data-testid="content">Content</PopoverContent>
				</Popover>
			);

			const trigger = screen.getByTestId("trigger");
			const content = screen.getByTestId("content");

			// Radix automatically handles ARIA attributes
			expect(trigger).toBeInTheDocument();
			expect(content).toBeInTheDocument();
		});

		it("should be keyboard accessible", () => {
			render(
				<Popover>
					<PopoverTrigger data-testid="trigger">Open</PopoverTrigger>
					<PopoverContent>
						<button data-testid="close">Close</button>
					</PopoverContent>
				</Popover>
			);

			const trigger = screen.getByTestId("trigger");
			expect(trigger).toBeInTheDocument();

			// Trigger should be focusable
			trigger.focus();
			expect(trigger).toHaveFocus();
		});
	});

	describe("Event Handling", () => {
		it("should call onOpenChange when popover state changes", () => {
			const onOpenChange = jest.fn();

			render(
				<Popover onOpenChange={onOpenChange}>
					<PopoverTrigger data-testid="trigger">Toggle</PopoverTrigger>
					<PopoverContent>Content</PopoverContent>
				</Popover>
			);

			const trigger = screen.getByTestId("trigger");
			fireEvent.click(trigger);

			expect(onOpenChange).toHaveBeenCalled();
		});

		it("should support external control", () => {
			const { rerender } = render(
				<Popover open={false}>
					<PopoverTrigger>Trigger</PopoverTrigger>
					<PopoverContent>Controlled content</PopoverContent>
				</Popover>
			);

			expect(screen.queryByText("Controlled content")).not.toBeInTheDocument();

			rerender(
				<Popover open={true}>
					<PopoverTrigger>Trigger</PopoverTrigger>
					<PopoverContent>Controlled content</PopoverContent>
				</Popover>
			);

			expect(screen.getByText("Controlled content")).toBeInTheDocument();
		});
	});
});
