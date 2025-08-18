import { Label } from "@/shared/components/ui/label";
import { render, screen } from "@testing-library/react";

describe("Label", () => {
	it("should render label text", () => {
		render(<Label>Test Label</Label>);

		expect(screen.getByText("Test Label")).toBeInTheDocument();
	});

	it("should apply default classes", () => {
		render(<Label data-testid="label">Test Label</Label>);

		const label = screen.getByTestId("label");
		expect(label).toHaveClass(
			"flex",
			"items-center",
			"gap-2",
			"text-sm",
			"leading-none",
			"font-medium",
			"select-none"
		);
	});

	it("should accept custom className", () => {
		render(
			<Label className="custom-label" data-testid="label">
				Test Label
			</Label>
		);

		const label = screen.getByTestId("label");
		expect(label).toHaveClass("custom-label");
	});

	it("should have data-slot attribute", () => {
		render(<Label data-testid="label">Test Label</Label>);

		const label = screen.getByTestId("label");
		expect(label).toHaveAttribute("data-slot", "label");
	});

	it("should handle htmlFor prop", () => {
		render(
			<Label htmlFor="test-input" data-testid="label">
				Test Label
			</Label>
		);

		const label = screen.getByTestId("label");
		expect(label).toHaveAttribute("for", "test-input");
	});

	it("should handle onClick events", () => {
		const handleClick = jest.fn();
		render(
			<Label onClick={handleClick} data-testid="label">
				Test Label
			</Label>
		);

		const label = screen.getByTestId("label");
		label.click();

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("should render children correctly", () => {
		render(
			<Label data-testid="label">
				<span>Icon</span>
				Label Text
			</Label>
		);

		expect(screen.getByText("Icon")).toBeInTheDocument();
		expect(screen.getByText("Label Text")).toBeInTheDocument();
	});

	it("should have disabled state styling classes", () => {
		render(<Label data-testid="label">Test Label</Label>);

		const label = screen.getByTestId("label");
		expect(label).toHaveClass(
			"group-data-[disabled=true]:pointer-events-none",
			"group-data-[disabled=true]:opacity-50",
			"peer-disabled:cursor-not-allowed",
			"peer-disabled:opacity-50"
		);
	});

	it("should handle accessibility attributes", () => {
		render(
			<Label data-testid="label" aria-label="Accessible label" role="label">
				Test Label
			</Label>
		);

		const label = screen.getByTestId("label");
		expect(label).toHaveAttribute("aria-label", "Accessible label");
		expect(label).toHaveAttribute("role", "label");
	});

	it("should combine custom classes with default classes", () => {
		render(
			<Label className="text-red-500 font-bold" data-testid="label">
				Test Label
			</Label>
		);

		const label = screen.getByTestId("label");
		expect(label).toHaveClass(
			"flex",
			"items-center",
			"text-red-500",
			"font-bold"
		);
	});

	it("should work with form association", () => {
		render(
			<div>
				<Label htmlFor="email" data-testid="label">
					Email
				</Label>
				<input id="email" type="email" />
			</div>
		);

		const label = screen.getByTestId("label");
		const input = screen.getByRole("textbox");

		expect(label).toHaveAttribute("for", "email");
		expect(input).toHaveAttribute("id", "email");
	});

	it("should handle complex children structure", () => {
		render(
			<Label data-testid="label">
				<svg data-testid="icon" width="16" height="16">
					<circle cx="8" cy="8" r="4" />
				</svg>
				<span data-testid="text">Label Text</span>
				<span data-testid="required">*</span>
			</Label>
		);

		expect(screen.getByTestId("icon")).toBeInTheDocument();
		expect(screen.getByTestId("text")).toBeInTheDocument();
		expect(screen.getByTestId("required")).toBeInTheDocument();
	});

	it("should handle empty content", () => {
		render(<Label data-testid="label"></Label>);

		const label = screen.getByTestId("label");
		expect(label).toBeInTheDocument();
		expect(label).toBeEmptyDOMElement();
	});
});

