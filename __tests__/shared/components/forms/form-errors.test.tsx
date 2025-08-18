import { FormErrors } from "@/shared/components/forms/form-errors";
import { render, screen } from "@testing-library/react";

describe("FormErrors", () => {
	it("should render nothing when errors array is empty", () => {
		const { container } = render(<FormErrors errors={[]} />);

		expect(container.firstChild).toBeNull();
	});

	it("should render nothing when errors is null", () => {
		const { container } = render(<FormErrors errors={null as any} />);

		expect(container.firstChild).toBeNull();
	});

	it("should render nothing when errors is undefined", () => {
		const { container } = render(<FormErrors errors={undefined as any} />);

		expect(container.firstChild).toBeNull();
	});

	it("should render single error message", () => {
		const errors = ["This field is required"];

		render(<FormErrors errors={errors} />);

		expect(screen.getByText("This field is required")).toBeInTheDocument();
	});

	it("should render multiple error messages", () => {
		const errors = [
			"This field is required",
			"Must be at least 3 characters",
			"Invalid email format",
		];

		render(<FormErrors errors={errors} />);

		expect(screen.getByText("This field is required")).toBeInTheDocument();
		expect(
			screen.getByText("Must be at least 3 characters")
		).toBeInTheDocument();
		expect(screen.getByText("Invalid email format")).toBeInTheDocument();
	});

	it("should apply default styling classes", () => {
		const errors = ["Error message"];

		render(<FormErrors errors={errors} />);

		const container = screen.getByText("Error message").parentElement;
		expect(container).toHaveClass(
			"bg-destructive/15",
			"p-3",
			"rounded-md",
			"space-y-1"
		);
	});

	it("should apply custom className", () => {
		const errors = ["Error message"];

		render(<FormErrors errors={errors} className="custom-error-class" />);

		const container = screen.getByText("Error message").parentElement;
		expect(container).toHaveClass("custom-error-class");
	});

	it("should apply text styling to error messages", () => {
		const errors = ["Error message"];

		render(<FormErrors errors={errors} />);

		const errorElement = screen.getByText("Error message");
		expect(errorElement).toHaveClass("text-destructive", "text-sm");
		expect(errorElement.tagName).toBe("P");
	});

	it("should handle non-string error types", () => {
		const errors = [42, { message: "Object error" }, null, undefined, true];

		render(<FormErrors errors={errors} />);

		expect(screen.getByText("42")).toBeInTheDocument();
		expect(screen.getByText("[object Object]")).toBeInTheDocument();
		expect(screen.getByText("null")).toBeInTheDocument();
		expect(screen.getByText("undefined")).toBeInTheDocument();
		expect(screen.getByText("true")).toBeInTheDocument();
	});

	it("should generate unique keys for error messages", () => {
		const errors = ["Error 1", "Error 2", "Error 3"];

		const { container } = render(<FormErrors errors={errors} />);

		const errorElements = container.querySelectorAll("p");
		expect(errorElements).toHaveLength(3);

		// Verify each element has content
		expect(errorElements[0]).toHaveTextContent("Error 1");
		expect(errorElements[1]).toHaveTextContent("Error 2");
		expect(errorElements[2]).toHaveTextContent("Error 3");
	});

	it("should handle empty string errors", () => {
		const errors = ["", "Valid error", ""];

		render(<FormErrors errors={errors} />);

		const errorElements = screen.getAllByText((content, element) => {
			return element?.tagName === "P";
		});
		expect(errorElements).toHaveLength(3);
		expect(screen.getByText("Valid error")).toBeInTheDocument();
	});

	it("should handle mixed error types", () => {
		const errors = [
			"String error",
			123,
			{ toString: () => "Custom toString" },
			new Error("Error object"),
		];

		render(<FormErrors errors={errors} />);

		expect(screen.getByText("String error")).toBeInTheDocument();
		expect(screen.getByText("123")).toBeInTheDocument();
		expect(screen.getByText("Custom toString")).toBeInTheDocument();
		expect(screen.getByText("Error: Error object")).toBeInTheDocument();
	});
});

