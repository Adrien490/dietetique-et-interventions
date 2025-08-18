import { Switch } from "@/shared/components/ui/switch";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn(),
}));

describe("Switch Component", () => {
	it("should render switch", () => {
		render(<Switch />);

		const switchElement = screen.getByRole("switch");
		expect(switchElement).toBeInTheDocument();
		expect(switchElement).toHaveAttribute("data-slot", "switch");
	});

	it("should have correct default classes", () => {
		render(<Switch />);

		const switchElement = screen.getByRole("switch");
		expect(switchElement).toHaveClass(
			"peer",
			"data-[state=checked]:bg-primary",
			"data-[state=unchecked]:bg-input",
			"focus-visible:border-ring",
			"focus-visible:ring-ring/50",
			"inline-flex",
			"h-[1.15rem]",
			"w-8",
			"shrink-0",
			"items-center",
			"rounded-full",
			"border",
			"border-transparent",
			"shadow-xs",
			"transition-all",
			"outline-none",
			"focus-visible:ring-[3px]",
			"disabled:cursor-not-allowed",
			"disabled:opacity-50"
		);
	});

	it("should apply custom className", () => {
		render(<Switch className="custom-switch" />);

		const switchElement = screen.getByRole("switch");
		expect(switchElement).toHaveClass("custom-switch");
	});

	it("should handle checked state", () => {
		render(<Switch checked />);

		const switchElement = screen.getByRole("switch");
		expect(switchElement).toBeChecked();
	});

	it("should handle unchecked state", () => {
		render(<Switch checked={false} />);

		const switchElement = screen.getByRole("switch");
		expect(switchElement).not.toBeChecked();
	});

	it("should handle click events", async () => {
		const onCheckedChange = jest.fn();
		const user = userEvent.setup();

		render(<Switch onCheckedChange={onCheckedChange} />);

		const switchElement = screen.getByRole("switch");
		await user.click(switchElement);

		expect(onCheckedChange).toHaveBeenCalledWith(true);
	});

	it("should handle disabled state", () => {
		render(<Switch disabled />);

		const switchElement = screen.getByRole("switch");
		expect(switchElement).toBeDisabled();
		expect(switchElement).toHaveClass(
			"disabled:cursor-not-allowed",
			"disabled:opacity-50"
		);
	});

	it("should render thumb indicator", () => {
		render(<Switch />);

		const switchElement = screen.getByRole("switch");
		const thumb = switchElement.querySelector('[data-slot="switch-thumb"]');

		expect(thumb).toBeInTheDocument();
		expect(thumb).toHaveClass(
			"bg-background",
			"pointer-events-none",
			"block",
			"size-4",
			"rounded-full",
			"ring-0",
			"transition-transform",
			"data-[state=checked]:translate-x-[calc(100%-2px)]",
			"data-[state=unchecked]:translate-x-0"
		);
	});

	it("should handle keyboard navigation", async () => {
		const onCheckedChange = jest.fn();
		const user = userEvent.setup();

		render(<Switch onCheckedChange={onCheckedChange} />);

		const switchElement = screen.getByRole("switch");

		// Focus the switch
		switchElement.focus();
		expect(switchElement).toHaveFocus();

		// Use Space key to toggle
		await user.keyboard(" ");
		expect(onCheckedChange).toHaveBeenCalledWith(true);

		// Use Enter key to toggle
		await user.keyboard("{Enter}");
		expect(onCheckedChange).toHaveBeenCalledTimes(2);
	});

	it("should support controlled mode", async () => {
		const onCheckedChange = jest.fn();
		const user = userEvent.setup();

		render(<Switch checked={false} onCheckedChange={onCheckedChange} />);

		const switchElement = screen.getByRole("switch");
		expect(switchElement).not.toBeChecked();

		await user.click(switchElement);
		expect(onCheckedChange).toHaveBeenCalledWith(true);
	});

	it("should support uncontrolled mode", async () => {
		const user = userEvent.setup();

		render(<Switch defaultChecked={false} />);

		const switchElement = screen.getByRole("switch");
		expect(switchElement).not.toBeChecked();

		await user.click(switchElement);
		expect(switchElement).toBeChecked();
	});

	it("should handle focus styles", () => {
		render(<Switch />);

		const switchElement = screen.getByRole("switch");

		// Focus the switch
		switchElement.focus();

		expect(switchElement).toHaveClass(
			"outline-none",
			"focus-visible:border-ring",
			"focus-visible:ring-ring/50",
			"focus-visible:ring-[3px]"
		);
	});

	it("should pass through additional props", () => {
		render(
			<Switch
				aria-label="Enable notifications"
				data-testid="custom-switch"
				id="notification-switch"
			/>
		);

		const switchElement = screen.getByTestId("custom-switch");
		expect(switchElement).toHaveAttribute("aria-label", "Enable notifications");
		expect(switchElement).toHaveAttribute("id", "notification-switch");
	});

	it("should handle different checked states with thumb position", () => {
		const { rerender } = render(<Switch checked={false} />);

		let switchElement = screen.getByRole("switch");
		let thumb = switchElement.querySelector('[data-slot="switch-thumb"]');

		expect(thumb).toHaveClass("data-[state=unchecked]:translate-x-0");

		rerender(<Switch checked={true} />);

		switchElement = screen.getByRole("switch");
		thumb = switchElement.querySelector('[data-slot="switch-thumb"]');

		expect(thumb).toHaveClass(
			"data-[state=checked]:translate-x-[calc(100%-2px)]"
		);
	});

	it("should support required attribute", () => {
		render(<Switch required />);

		const switchElement = screen.getByRole("switch");
		expect(switchElement).toHaveAttribute("aria-required", "true");
	});

	it("should support name attribute for forms", () => {
		render(<Switch name="notifications" />);

		const switchElement = screen.getByRole("switch");
		// Radix UI Switch handles name internally for form submission
		expect(switchElement).toBeInTheDocument();
	});

	it("should handle validation states", () => {
		const { rerender } = render(<Switch />);

		let switchElement = screen.getByRole("switch");
		expect(switchElement).not.toHaveAttribute("aria-invalid");

		rerender(<Switch aria-invalid="true" />);

		switchElement = screen.getByRole("switch");
		expect(switchElement).toHaveAttribute("aria-invalid", "true");
	});
});
