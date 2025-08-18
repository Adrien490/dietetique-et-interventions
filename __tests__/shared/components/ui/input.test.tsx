import { Input } from "@/shared/components/ui/input";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Input", () => {
	it("should render input element", () => {
		render(<Input />);

		const input = screen.getByRole("textbox");
		expect(input).toBeInTheDocument();
	});

	it("should apply default classes", () => {
		render(<Input />);

		const input = screen.getByRole("textbox");
		expect(input).toHaveClass("flex", "h-9", "w-full", "rounded-md", "border");
	});

	it("should accept custom className", () => {
		render(<Input className="custom-class" />);

		const input = screen.getByRole("textbox");
		expect(input).toHaveClass("custom-class");
	});

	it("should set input type", () => {
		render(<Input type="email" />);

		const input = screen.getByRole("textbox");
		expect(input).toHaveAttribute("type", "email");
	});

	it("should handle password type", () => {
		render(<Input type="password" data-testid="password-input" />);

		const input = screen.getByTestId("password-input");
		expect(input).toHaveAttribute("type", "password");
	});

	it("should accept placeholder", () => {
		render(<Input placeholder="Enter text..." />);

		const input = screen.getByPlaceholderText("Enter text...");
		expect(input).toBeInTheDocument();
	});

	it("should handle value and onChange", () => {
		const handleChange = jest.fn();
		render(<Input value="test" onChange={handleChange} />);

		const input = screen.getByDisplayValue("test");
		fireEvent.change(input, { target: { value: "new value" } });

		expect(handleChange).toHaveBeenCalled();
	});

	it("should be disabled when disabled prop is true", () => {
		render(<Input disabled />);

		const input = screen.getByRole("textbox");
		expect(input).toBeDisabled();
		expect(input).toHaveClass("disabled:opacity-50");
	});

	it("should have data-slot attribute", () => {
		render(<Input />);

		const input = screen.getByRole("textbox");
		expect(input).toHaveAttribute("data-slot", "input");
	});

	it("should handle required attribute", () => {
		render(<Input required />);

		const input = screen.getByRole("textbox");
		expect(input).toBeRequired();
	});

	it("should handle readonly attribute", () => {
		render(<Input readOnly />);

		const input = screen.getByRole("textbox");
		expect(input).toHaveAttribute("readonly");
	});

	it("should accept name attribute", () => {
		render(<Input name="test-input" />);

		const input = screen.getByRole("textbox");
		expect(input).toHaveAttribute("name", "test-input");
	});

	it("should handle file input type", () => {
		render(<Input type="file" data-testid="file-input" />);

		const input = screen.getByTestId("file-input");
		expect(input).toHaveAttribute("type", "file");
	});

	it("should apply focus styles", () => {
		render(<Input />);

		const input = screen.getByRole("textbox");
		expect(input).toHaveClass(
			"focus-visible:border-ring",
			"focus-visible:ring-ring/50"
		);
	});

	it("should apply invalid styles", () => {
		render(<Input aria-invalid="true" />);

		const input = screen.getByRole("textbox");
		expect(input).toHaveClass("aria-invalid:border-destructive");
	});
});
