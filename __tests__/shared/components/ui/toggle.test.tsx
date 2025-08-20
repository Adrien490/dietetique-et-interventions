import { Toggle } from "@/shared/components/ui/toggle";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock Radix UI Toggle
jest.mock("@radix-ui/react-toggle", () => ({
	Root: ({ children, pressed, onPressedChange, className, ...props }: any) => (
		<button
			data-testid="toggle-button"
			data-state={pressed ? "on" : "off"}
			className={className}
			onClick={() => onPressedChange?.(!pressed)}
			aria-pressed={pressed}
			{...props}
		>
			{children}
		</button>
	),
}));

describe("Toggle", () => {
	it("should render toggle button with default props", () => {
		render(<Toggle>Toggle me</Toggle>);

		const toggle = screen.getByTestId("toggle-button");
		expect(toggle).toBeInTheDocument();
		expect(toggle).toHaveAttribute("data-slot", "toggle");
		expect(toggle).toHaveTextContent("Toggle me");
	});

	it("should handle pressed state", () => {
		render(<Toggle pressed={true}>Pressed</Toggle>);

		const toggle = screen.getByTestId("toggle-button");
		expect(toggle).toHaveAttribute("data-state", "on");
		expect(toggle).toHaveAttribute("aria-pressed", "true");
	});

	it("should handle unpressed state", () => {
		render(<Toggle pressed={false}>Not pressed</Toggle>);

		const toggle = screen.getByTestId("toggle-button");
		expect(toggle).toHaveAttribute("data-state", "off");
		expect(toggle).toHaveAttribute("aria-pressed", "false");
	});

	it("should handle press changes", () => {
		const onPressedChange = jest.fn();
		render(
			<Toggle pressed={false} onPressedChange={onPressedChange}>
				Toggle
			</Toggle>
		);

		const toggle = screen.getByTestId("toggle-button");
		fireEvent.click(toggle);

		expect(onPressedChange).toHaveBeenCalledWith(true);
	});

	it("should apply default variant classes", () => {
		render(<Toggle>Default</Toggle>);

		const toggle = screen.getByTestId("toggle-button");
		expect(toggle).toHaveClass("bg-transparent");
		expect(toggle).toHaveClass("inline-flex", "items-center", "justify-center");
	});

	it("should apply outline variant classes", () => {
		render(<Toggle variant="outline">Outline</Toggle>);

		const toggle = screen.getByTestId("toggle-button");
		expect(toggle).toHaveClass("border", "border-input", "shadow-xs");
	});

	it("should apply different sizes", () => {
		const { rerender } = render(<Toggle size="sm">Small</Toggle>);
		let toggle = screen.getByTestId("toggle-button");
		expect(toggle).toHaveClass("h-8", "px-1.5", "min-w-8");

		rerender(<Toggle size="default">Default</Toggle>);
		toggle = screen.getByTestId("toggle-button");
		expect(toggle).toHaveClass("h-9", "px-2", "min-w-9");

		rerender(<Toggle size="lg">Large</Toggle>);
		toggle = screen.getByTestId("toggle-button");
		expect(toggle).toHaveClass("h-10", "px-2.5", "min-w-10");
	});

	it("should merge custom className", () => {
		render(<Toggle className="custom-toggle-class">Custom</Toggle>);

		const toggle = screen.getByTestId("toggle-button");
		expect(toggle).toHaveClass("custom-toggle-class");
		expect(toggle).toHaveClass("inline-flex"); // Still has default classes
	});

	it("should handle disabled state", () => {
		render(<Toggle disabled>Disabled</Toggle>);

		const toggle = screen.getByTestId("toggle-button");
		expect(toggle).toBeDisabled();
	});

	it("should pass through additional props", () => {
		render(
			<Toggle id="custom-id" aria-label="Custom toggle">
				Custom
			</Toggle>
		);

		const toggle = screen.getByTestId("toggle-button");
		expect(toggle).toHaveAttribute("id", "custom-id");
		expect(toggle).toHaveAttribute("aria-label", "Custom toggle");
	});

	it("should handle controlled component", () => {
		const onPressedChange = jest.fn();
		const { rerender } = render(
			<Toggle pressed={false} onPressedChange={onPressedChange}>
				Controlled
			</Toggle>
		);

		let toggle = screen.getByTestId("toggle-button");
		expect(toggle).toHaveAttribute("data-state", "off");

		rerender(
			<Toggle pressed={true} onPressedChange={onPressedChange}>
				Controlled
			</Toggle>
		);

		toggle = screen.getByTestId("toggle-button");
		expect(toggle).toHaveAttribute("data-state", "on");
	});

	it("should handle uncontrolled component", () => {
		render(<Toggle defaultPressed={true}>Uncontrolled</Toggle>);

		const toggle = screen.getByTestId("toggle-button");
		expect(toggle).toBeInTheDocument();
	});

	it("should render with icon content", () => {
		render(
			<Toggle>
				<span data-testid="icon">🔄</span>
				Toggle with icon
			</Toggle>
		);

		expect(screen.getByTestId("icon")).toBeInTheDocument();
		expect(screen.getByText("Toggle with icon")).toBeInTheDocument();
	});
});
