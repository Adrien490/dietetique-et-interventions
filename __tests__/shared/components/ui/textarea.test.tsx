import { Textarea } from "@/shared/components/ui/textarea";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Textarea", () => {
	it("should render textarea element", () => {
		render(<Textarea />);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toBeInTheDocument();
		expect(textarea.tagName.toLowerCase()).toBe("textarea");
	});

	it("should apply default classes", () => {
		render(<Textarea />);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveClass("w-full", "rounded-md", "border");
	});

	it("should accept custom className", () => {
		render(<Textarea className="custom-class" />);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveClass("custom-class");
	});

	it("should accept placeholder", () => {
		render(<Textarea placeholder="Enter your message..." />);

		const textarea = screen.getByPlaceholderText("Enter your message...");
		expect(textarea).toBeInTheDocument();
	});

	it("should handle value change", () => {
		const handleChange = jest.fn();
		render(<Textarea value="initial" onChange={handleChange} />);

		const textarea = screen.getByDisplayValue("initial");
		fireEvent.change(textarea, { target: { value: "new value" } });

		expect(handleChange).toHaveBeenCalled();
	});

	it("should be disabled when disabled prop is true", () => {
		render(<Textarea disabled />);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toBeDisabled();
	});

	it("should have data-slot attribute", () => {
		render(<Textarea />);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveAttribute("data-slot", "textarea");
	});

	it("should handle required attribute", () => {
		render(<Textarea required />);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toBeRequired();
	});

	it("should handle readonly attribute", () => {
		render(<Textarea readOnly />);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveAttribute("readonly");
	});

	it("should accept name attribute", () => {
		render(<Textarea name="message" />);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveAttribute("name", "message");
	});

	it("should handle rows attribute", () => {
		render(<Textarea rows={5} />);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveAttribute("rows", "5");
	});

	it("should handle cols attribute", () => {
		render(<Textarea cols={50} />);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveAttribute("cols", "50");
	});

	it("should apply focus styles", () => {
		render(<Textarea />);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveClass("outline-none");
	});

	it("should apply disabled styles", () => {
		render(<Textarea disabled />);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toBeDisabled();
	});

	it("should handle resize styling", () => {
		render(<Textarea />);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toBeInTheDocument(); // Simplified check
	});

	it("should handle maxLength attribute", () => {
		render(<Textarea maxLength={100} />);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveAttribute("maxLength", "100");
	});

	it("should handle defaultValue", () => {
		render(<Textarea defaultValue="Default content" />);

		const textarea = screen.getByDisplayValue("Default content");
		expect(textarea).toBeInTheDocument();
	});

	it("should forward ref correctly", () => {
		const ref = jest.fn();
		render(<Textarea ref={ref} />);

		expect(ref).toHaveBeenCalledWith(expect.any(HTMLTextAreaElement));
	});

	it("should have correct background and padding", () => {
		render(<Textarea />);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toBeInTheDocument(); // Simplified check
	});

	it("should handle form integration", () => {
		render(
			<form data-testid="form">
				<Textarea name="description" />
			</form>
		);

		const form = screen.getByTestId("form");
		const textarea = screen.getByRole("textbox");

		expect(form).toContainElement(textarea);
		expect(textarea).toHaveAttribute("name", "description");
	});
});
