import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock lucide-react
jest.mock("lucide-react", () => ({
	ChevronDownIcon: ({
		className,
		"aria-hidden": ariaHidden,
	}: {
		className?: string;
		"aria-hidden"?: boolean;
	}) => (
		<div
			data-testid="chevron-icon"
			className={className}
			aria-hidden={ariaHidden}
		>
			▼
		</div>
	),
}));

describe("Accordion Components", () => {
	describe("Accordion", () => {
		it("should render accordion with proper attributes", () => {
			render(
				<Accordion type="single" collapsible>
					<AccordionItem value="item-1">
						<AccordionTrigger>Test Title</AccordionTrigger>
						<AccordionContent>Test Content</AccordionContent>
					</AccordionItem>
				</Accordion>
			);

			const accordion = document.querySelector('[data-slot="accordion"]');
			expect(accordion).toBeInTheDocument();
		});

		it("should render accordion item", () => {
			render(
				<Accordion type="single" collapsible>
					<AccordionItem value="item-1">
						<AccordionTrigger>Test Title</AccordionTrigger>
						<AccordionContent>Test Content</AccordionContent>
					</AccordionItem>
				</Accordion>
			);

			const item = screen
				.getByRole("button")
				.closest('[data-slot="accordion-item"]');
			expect(item).toBeInTheDocument();
			expect(item).toHaveClass("border-b", "last:border-b-0");
		});

		it("should render accordion trigger with chevron", () => {
			render(
				<Accordion type="single" collapsible>
					<AccordionItem value="item-1">
						<AccordionTrigger>Test Title</AccordionTrigger>
						<AccordionContent>Test Content</AccordionContent>
					</AccordionItem>
				</Accordion>
			);

			const trigger = screen.getByRole("button", { name: "Test Title" });
			expect(trigger).toBeInTheDocument();
			expect(trigger).toHaveAttribute("data-slot", "accordion-trigger");

			const chevron = screen.getByTestId("chevron-icon");
			expect(chevron).toBeInTheDocument();
			expect(chevron).toHaveAttribute("aria-hidden", "true");
		});

		it("should expand and collapse accordion item", async () => {
			const user = userEvent.setup();

			render(
				<Accordion type="single" collapsible>
					<AccordionItem value="item-1">
						<AccordionTrigger>Test Title</AccordionTrigger>
						<AccordionContent>Test Content</AccordionContent>
					</AccordionItem>
				</Accordion>
			);

			const trigger = screen.getByRole("button", { name: "Test Title" });

			// Initially collapsed
			expect(trigger).toHaveAttribute("aria-expanded", "false");

			// Click to expand
			await user.click(trigger);
			expect(trigger).toHaveAttribute("aria-expanded", "true");

			// Click to collapse
			await user.click(trigger);
			expect(trigger).toHaveAttribute("aria-expanded", "false");
		});

		it("should render accordion content", () => {
			render(
				<Accordion type="single" collapsible defaultValue="item-1">
					<AccordionItem value="item-1">
						<AccordionTrigger>Test Title</AccordionTrigger>
						<AccordionContent>Test Content</AccordionContent>
					</AccordionItem>
				</Accordion>
			);

			const content = screen.getByRole("region");
			expect(content).toBeInTheDocument();
			expect(content).toHaveTextContent("Test Content");
		});

		it("should handle multiple accordion items", () => {
			render(
				<Accordion type="single" collapsible>
					<AccordionItem value="item-1">
						<AccordionTrigger>First Item</AccordionTrigger>
						<AccordionContent>First Content</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>Second Item</AccordionTrigger>
						<AccordionContent>Second Content</AccordionContent>
					</AccordionItem>
				</Accordion>
			);

			expect(
				screen.getByRole("button", { name: "First Item" })
			).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: "Second Item" })
			).toBeInTheDocument();
			expect(screen.getAllByRole("button")).toHaveLength(2);
		});

		it("should apply custom className", () => {
			render(
				<Accordion type="single" collapsible>
					<AccordionItem value="item-1" className="custom-item">
						<AccordionTrigger className="custom-trigger">
							Test Title
						</AccordionTrigger>
						<AccordionContent className="custom-content">
							Test Content
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			);

			const item = screen
				.getByRole("button")
				.closest('[data-slot="accordion-item"]');
			const trigger = screen.getByRole("button");

			expect(item).toHaveClass("custom-item");
			expect(trigger).toHaveClass("custom-trigger");
		});

		it("should handle keyboard navigation", async () => {
			const user = userEvent.setup();

			render(
				<Accordion type="single" collapsible>
					<AccordionItem value="item-1">
						<AccordionTrigger>Test Title</AccordionTrigger>
						<AccordionContent>Test Content</AccordionContent>
					</AccordionItem>
				</Accordion>
			);

			const trigger = screen.getByRole("button", { name: "Test Title" });

			// Focus the trigger
			trigger.focus();
			expect(trigger).toHaveFocus();

			// Press Enter to toggle
			await user.keyboard("{Enter}");
			expect(trigger).toHaveAttribute("aria-expanded", "true");

			// Press Space to toggle
			await user.keyboard(" ");
			expect(trigger).toHaveAttribute("aria-expanded", "false");
		});
	});
});
