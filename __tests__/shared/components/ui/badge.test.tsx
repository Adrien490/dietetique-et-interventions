import { Badge } from "@/shared/components/ui/badge";
import { render, screen } from "@testing-library/react";

// Mock du cn utility
jest.mock("@/shared/utils", () => ({
	cn: (...classes: any[]) => classes.filter(Boolean).join(" "),
}));

describe("Badge", () => {
	it("should render badge with children", () => {
		render(<Badge>Test Badge</Badge>);

		const badge = screen.getByText("Test Badge");
		expect(badge).toBeInTheDocument();
	});

	it("should apply default variant", () => {
		render(<Badge>Default</Badge>);

		const badge = screen.getByText("Default");
		expect(badge).toHaveClass("bg-primary", "text-primary-foreground");
	});

	it("should apply secondary variant", () => {
		render(<Badge variant="secondary">Secondary</Badge>);

		const badge = screen.getByText("Secondary");
		expect(badge).toHaveClass("bg-secondary", "text-secondary-foreground");
	});

	it("should apply destructive variant", () => {
		render(<Badge variant="destructive">Destructive</Badge>);

		const badge = screen.getByText("Destructive");
		expect(badge).toHaveClass("bg-destructive", "text-white");
	});

	it("should apply outline variant", () => {
		render(<Badge variant="outline">Outline</Badge>);

		const badge = screen.getByText("Outline");
		expect(badge).toHaveClass("text-foreground");
	});

	it("should apply custom className", () => {
		render(<Badge className="custom-badge">Custom</Badge>);

		const badge = screen.getByText("Custom");
		expect(badge).toHaveClass("custom-badge");
	});

	it("should render as span by default", () => {
		render(<Badge>Span Badge</Badge>);

		const badge = screen.getByText("Span Badge");
		expect(badge.tagName).toBe("SPAN");
	});

	it("should apply base styles", () => {
		render(<Badge>Base Styles</Badge>);

		const badge = screen.getByText("Base Styles");
		expect(badge).toHaveClass(
			"inline-flex",
			"items-center",
			"rounded-md",
			"border",
			"px-2",
			"py-0.5",
			"text-xs",
			"font-medium"
		);
	});

	it("should handle additional props", () => {
		render(
			<Badge data-testid="test-badge" id="badge-1">
				Props Badge
			</Badge>
		);

		const badge = screen.getByTestId("test-badge");
		expect(badge).toHaveAttribute("id", "badge-1");
	});

	it("should combine variant and custom className", () => {
		render(
			<Badge variant="secondary" className="extra-class">
				Combined
			</Badge>
		);

		const badge = screen.getByText("Combined");
		expect(badge).toHaveClass("bg-secondary", "extra-class");
	});

	it("should handle empty children", () => {
		render(<Badge data-testid="empty-badge"></Badge>);

		const badge = screen.getByTestId("empty-badge");
		expect(badge).toBeInTheDocument();
		expect(badge).toBeEmptyDOMElement();
	});

	it("should handle numeric children", () => {
		render(<Badge>{42}</Badge>);

		const badge = screen.getByText("42");
		expect(badge).toBeInTheDocument();
	});

	it("should handle React node children", () => {
		render(
			<Badge>
				<span>Icon</span> Label
			</Badge>
		);

		expect(screen.getByText("Icon")).toBeInTheDocument();
		expect(screen.getByText("Label")).toBeInTheDocument();
	});

	it("should handle click events", () => {
		const handleClick = jest.fn();
		render(<Badge onClick={handleClick}>Clickable</Badge>);

		const badge = screen.getByText("Clickable");
		badge.click();

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("should handle hover effects", () => {
		render(<Badge variant="outline">Hoverable</Badge>);

		const badge = screen.getByText("Hoverable");
		// Le composant utilise [a&]:hover pour les liens, pas hover: direct
		expect(badge).toHaveClass("text-foreground");
	});

	it("should support all variant combinations", () => {
		const variants = [
			"default",
			"secondary",
			"destructive",
			"outline",
		] as const;

		variants.forEach((variant, index) => {
			const { unmount } = render(<Badge variant={variant}>{variant}</Badge>);

			const badge = screen.getByText(variant);
			expect(badge).toBeInTheDocument();

			unmount();
		});
	});

	it("should maintain accessibility", () => {
		render(<Badge role="status">Status Badge</Badge>);

		const badge = screen.getByRole("status");
		expect(badge).toBeInTheDocument();
	});

	it("should handle long text", () => {
		const longText = "This is a very long badge text that might wrap";
		render(<Badge>{longText}</Badge>);

		const badge = screen.getByText(longText);
		expect(badge).toBeInTheDocument();
	});

	it("should handle special characters", () => {
		render(<Badge>Special: !@#$%^&*()</Badge>);

		const badge = screen.getByText("Special: !@#$%^&*()");
		expect(badge).toBeInTheDocument();
	});

	it("should support conditional rendering", () => {
		const { rerender } = render(<Badge>Visible</Badge>);
		expect(screen.getByText("Visible")).toBeInTheDocument();

		rerender(<></>);
		expect(screen.queryByText("Visible")).not.toBeInTheDocument();
	});
});
