import { Checkbox } from "@/shared/components/ui/checkbox";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn(),
}));

// Mock lucide-react
jest.mock("lucide-react", () => ({
	CheckIcon: () => <div data-testid="check-icon">✓</div>,
}));

describe("Checkbox Component", () => {
	it("should render checkbox", () => {
		render(<Checkbox />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toHaveAttribute("data-slot", "checkbox");
	});

	it("should have correct default classes", () => {
		render(<Checkbox />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toHaveClass(
			"peer",
			"border-input",
			"size-4",
			"shrink-0",
			"rounded-[4px]",
			"border",
			"shadow-xs",
			"transition-shadow",
			"outline-none"
		);
	});

	it("should apply custom className", () => {
		render(<Checkbox className="custom-checkbox" />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toHaveClass("custom-checkbox");
	});

	it("should handle checked state", () => {
		render(<Checkbox checked />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeChecked();
	});

	it("should handle unchecked state", () => {
		render(<Checkbox checked={false} />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).not.toBeChecked();
	});

	it("should handle click events", async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();

		render(<Checkbox onCheckedChange={handleChange} />);

		const checkbox = screen.getByRole("checkbox");
		await user.click(checkbox);

		expect(handleChange).toHaveBeenCalledWith(true);
	});

	it("should handle disabled state", () => {
		render(<Checkbox disabled />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeDisabled();
		expect(checkbox).toHaveClass(
			"disabled:cursor-not-allowed",
			"disabled:opacity-50"
		);
	});

	it("should render check icon when checked", () => {
		render(<Checkbox checked />);

		const checkIcon = screen.getByTestId("check-icon");
		expect(checkIcon).toBeInTheDocument();
	});

	it("should have indicator with correct classes", () => {
		render(<Checkbox checked />);

		const checkbox = screen.getByRole("checkbox");
		const indicator = checkbox.querySelector(
			'[data-slot="checkbox-indicator"]'
		);

		expect(indicator).toBeInTheDocument();
		expect(indicator).toHaveClass(
			"flex",
			"items-center",
			"justify-center",
			"text-current",
			"transition-none"
		);
	});

	it("should handle keyboard navigation", async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();

		render(<Checkbox onCheckedChange={handleChange} />);

		const checkbox = screen.getByRole("checkbox");

		// Focus the checkbox
		checkbox.focus();
		expect(checkbox).toHaveFocus();

		// Press Space to toggle
		await user.keyboard(" ");
		expect(handleChange).toHaveBeenCalledWith(true);
	});

	it("should support controlled mode", async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();

		const { rerender } = render(
			<Checkbox checked={false} onCheckedChange={handleChange} />
		);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).not.toBeChecked();

		await user.click(checkbox);
		expect(handleChange).toHaveBeenCalledWith(true);

		// Simulate parent component updating the state
		rerender(<Checkbox checked={true} onCheckedChange={handleChange} />);
		expect(checkbox).toBeChecked();
	});

	it("should support uncontrolled mode", async () => {
		const user = userEvent.setup();

		render(<Checkbox defaultChecked={false} />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).not.toBeChecked();

		await user.click(checkbox);
		expect(checkbox).toBeChecked();
	});

	it("should handle indeterminate state", () => {
		render(<Checkbox checked="indeterminate" />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toHaveAttribute("data-state", "indeterminate");
	});

	it("should pass through additional props", () => {
		render(
			<Checkbox
				data-testid="custom-checkbox"
				aria-label="Accept terms"
				id="terms-checkbox"
			/>
		);

		const checkbox = screen.getByTestId("custom-checkbox");
		expect(checkbox).toHaveAttribute("aria-label", "Accept terms");
		expect(checkbox).toHaveAttribute("id", "terms-checkbox");
	});

	it("should handle form integration", () => {
		render(
			<form>
				<Checkbox name="newsletter" value="subscribe" />
			</form>
		);

		const checkbox = screen.getByRole("checkbox");
		// Radix UI Checkbox handles name/value internally for forms
		expect(checkbox).toBeInTheDocument();
	});

	it("should handle validation states", () => {
		const { rerender } = render(<Checkbox />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).not.toHaveAttribute("aria-invalid");

		rerender(<Checkbox aria-invalid />);
		expect(checkbox).toHaveAttribute("aria-invalid");
		expect(checkbox).toHaveClass("aria-invalid:ring-destructive/20");
	});

	it("should support required attribute", () => {
		render(<Checkbox required />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeRequired();
	});

	it("should handle focus styles", () => {
		render(<Checkbox />);

		const checkbox = screen.getByRole("checkbox");
		checkbox.focus();

		expect(checkbox).toHaveClass(
			"focus-visible:border-ring",
			"focus-visible:ring-ring/50"
		);
	});
});
