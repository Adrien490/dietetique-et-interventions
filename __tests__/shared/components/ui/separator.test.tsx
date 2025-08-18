import { Separator } from "@/shared/components/ui/separator";
import { render, screen } from "@testing-library/react";

describe("Separator Component", () => {
	it("should render separator with default props", () => {
		render(<Separator data-testid="separator" />);

		const separator = screen.getByTestId("separator");
		expect(separator).toBeInTheDocument();
		expect(separator).toHaveAttribute("data-orientation", "horizontal");
		// Decorative separators may not have aria-orientation
	});

	it("should render horizontal separator by default", () => {
		render(<Separator data-testid="separator" />);

		const separator = screen.getByTestId("separator");
		expect(separator).toHaveAttribute("data-orientation", "horizontal");
		expect(separator).toHaveClass(
			"data-[orientation=horizontal]:h-px",
			"data-[orientation=horizontal]:w-full"
		);
	});

	it("should render vertical separator when specified", () => {
		render(<Separator orientation="vertical" data-testid="separator" />);

		const separator = screen.getByTestId("separator");
		expect(separator).toHaveAttribute("data-orientation", "vertical");
		// Decorative separators may not have aria-orientation
		expect(separator).toHaveClass(
			"data-[orientation=vertical]:h-full",
			"data-[orientation=vertical]:w-px"
		);
	});

	it("should be decorative by default", () => {
		render(<Separator data-testid="separator" />);

		const separator = screen.getByTestId("separator");
		expect(separator).toHaveAttribute("role", "none");
	});

	it("should not be decorative when specified", () => {
		render(<Separator decorative={false} data-testid="separator" />);

		const separator = screen.getByTestId("separator");
		expect(separator).toHaveAttribute("role", "separator");
		expect(separator).toHaveAttribute("data-orientation", "horizontal");
	});

	it("should apply custom className", () => {
		render(<Separator className="custom-separator" data-testid="separator" />);

		const separator = screen.getByTestId("separator");
		expect(separator).toHaveClass("custom-separator");
	});

	it("should have default separator styling", () => {
		render(<Separator data-testid="separator" />);

		const separator = screen.getByTestId("separator");
		expect(separator).toHaveClass("bg-border", "shrink-0");
	});

	it("should have data-slot attribute", () => {
		render(<Separator data-testid="separator" />);

		const separator = screen.getByTestId("separator");
		expect(separator).toHaveAttribute("data-slot", "separator");
	});

	it("should forward additional props", () => {
		render(<Separator data-testid="separator" id="my-separator" />);

		const separator = screen.getByTestId("separator");
		expect(separator).toHaveAttribute("id", "my-separator");
	});

	it("should handle both orientations correctly", () => {
		const { rerender } = render(<Separator data-testid="separator" />);

		let separator = screen.getByTestId("separator");
		expect(separator).toHaveAttribute("data-orientation", "horizontal");

		rerender(<Separator orientation="vertical" data-testid="separator" />);

		separator = screen.getByTestId("separator");
		expect(separator).toHaveAttribute("data-orientation", "vertical");
	});
});
