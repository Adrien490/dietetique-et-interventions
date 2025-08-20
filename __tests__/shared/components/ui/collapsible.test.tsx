import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock Radix UI Collapsible
jest.mock("@radix-ui/react-collapsible", () => ({
	Root: ({ children, open, onOpenChange, ...props }: any) => (
		<div
			data-testid="collapsible-root"
			data-state={open ? "open" : "closed"}
			onClick={() => onOpenChange?.(!open)}
			{...props}
		>
			{children}
		</div>
	),
	CollapsibleTrigger: ({ children, ...props }: any) => (
		<button data-testid="collapsible-trigger" {...props}>
			{children}
		</button>
	),
	CollapsibleContent: ({ children, ...props }: any) => (
		<div data-testid="collapsible-content" {...props}>
			{children}
		</div>
	),
}));

describe("Collapsible Components", () => {
	describe("Collapsible", () => {
		it("should render collapsible root with correct data-slot", () => {
			render(
				<Collapsible>
					<div>Content</div>
				</Collapsible>
			);

			const root = screen.getByTestId("collapsible-root");
			expect(root).toBeInTheDocument();
			expect(root).toHaveAttribute("data-slot", "collapsible");
		});

		it("should handle controlled state", () => {
			const onOpenChange = jest.fn();
			render(
				<Collapsible open={true} onOpenChange={onOpenChange}>
					<div>Content</div>
				</Collapsible>
			);

			const root = screen.getByTestId("collapsible-root");
			expect(root).toHaveAttribute("data-state", "open");
		});

		it("should handle closed state", () => {
			render(
				<Collapsible open={false}>
					<div>Content</div>
				</Collapsible>
			);

			const root = screen.getByTestId("collapsible-root");
			expect(root).toHaveAttribute("data-state", "closed");
		});

		it("should pass through additional props", () => {
			render(
				<Collapsible className="custom-class" id="custom-id">
					<div>Content</div>
				</Collapsible>
			);

			const root = screen.getByTestId("collapsible-root");
			expect(root).toHaveClass("custom-class");
			expect(root).toHaveAttribute("id", "custom-id");
		});
	});

	describe("CollapsibleTrigger", () => {
		it("should render trigger with correct data-slot", () => {
			render(<CollapsibleTrigger>Toggle</CollapsibleTrigger>);

			const trigger = screen.getByTestId("collapsible-trigger");
			expect(trigger).toBeInTheDocument();
			expect(trigger).toHaveAttribute("data-slot", "collapsible-trigger");
			expect(trigger).toHaveTextContent("Toggle");
		});

		it("should pass through additional props", () => {
			render(
				<CollapsibleTrigger className="trigger-class" disabled>
					Toggle
				</CollapsibleTrigger>
			);

			const trigger = screen.getByTestId("collapsible-trigger");
			expect(trigger).toHaveClass("trigger-class");
			expect(trigger).toBeDisabled();
		});
	});

	describe("CollapsibleContent", () => {
		it("should render content with correct data-slot", () => {
			render(
				<CollapsibleContent>
					<div>Collapsible content</div>
				</CollapsibleContent>
			);

			const content = screen.getByTestId("collapsible-content");
			expect(content).toBeInTheDocument();
			expect(content).toHaveAttribute("data-slot", "collapsible-content");
			expect(screen.getByText("Collapsible content")).toBeInTheDocument();
		});

		it("should pass through additional props", () => {
			render(
				<CollapsibleContent className="content-class">
					<div>Content</div>
				</CollapsibleContent>
			);

			const content = screen.getByTestId("collapsible-content");
			expect(content).toHaveClass("content-class");
		});
	});

	describe("Complete Collapsible", () => {
		it("should render complete collapsible component", () => {
			const onOpenChange = jest.fn();

			render(
				<Collapsible open={false} onOpenChange={onOpenChange}>
					<CollapsibleTrigger>Show more</CollapsibleTrigger>
					<CollapsibleContent>
						<div>Hidden content</div>
					</CollapsibleContent>
				</Collapsible>
			);

			expect(screen.getByTestId("collapsible-root")).toBeInTheDocument();
			expect(screen.getByTestId("collapsible-trigger")).toBeInTheDocument();
			expect(screen.getByTestId("collapsible-content")).toBeInTheDocument();
			expect(screen.getByText("Show more")).toBeInTheDocument();
			expect(screen.getByText("Hidden content")).toBeInTheDocument();
		});

		it("should handle state changes", () => {
			const onOpenChange = jest.fn();

			render(
				<Collapsible open={false} onOpenChange={onOpenChange}>
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent>Content</CollapsibleContent>
				</Collapsible>
			);

			const root = screen.getByTestId("collapsible-root");
			fireEvent.click(root);

			expect(onOpenChange).toHaveBeenCalledWith(true);
		});
	});
});
