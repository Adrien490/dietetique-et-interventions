import { InputField } from "@/shared/components/forms/input-field";
import { useFieldContext } from "@/shared/lib/form-context";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock the form context
jest.mock("@/shared/lib/form-context", () => ({
	useFieldContext: jest.fn(),
}));

// Mock the UI components
jest.mock("@/shared/components/ui/input", () => ({
	Input: ({ onChange, ...props }: any) => (
		<input {...props} onChange={onChange} data-testid="input-field" />
	),
}));

jest.mock("@/shared/components/ui/form", () => ({
	FormLabel: ({ children, ...props }: any) => (
		<label {...props} data-testid="form-label">
			{children}
		</label>
	),
}));

jest.mock("@/shared/components/forms/field-info", () => ({
	FieldInfo: ({ field }: any) => (
		<div data-testid="field-info">{field.state.meta.errors?.join(", ")}</div>
	),
}));

const mockUseFieldContext = useFieldContext as jest.MockedFunction<
	typeof useFieldContext
>;

describe("InputField", () => {
	const mockField = {
		name: "test-field",
		state: {
			value: "",
			meta: {
				errors: [],
				isValidating: false,
				isTouched: false,
			},
		},
		handleChange: jest.fn(),
	};

	beforeEach(() => {
		mockUseFieldContext.mockReturnValue(mockField);
		jest.clearAllMocks();
	});

	it("should render input field with label", () => {
		render(<InputField label="Test Label" />);

		expect(screen.getByTestId("form-label")).toBeInTheDocument();
		expect(screen.getByText("Test Label")).toBeInTheDocument();
		expect(screen.getByTestId("input-field")).toBeInTheDocument();
	});

	it("should show required asterisk when required prop is true", () => {
		render(<InputField label="Required Field" required />);

		expect(screen.getByText("*")).toBeInTheDocument();
		expect(screen.getByText("*")).toHaveClass("text-destructive");
	});

	it("should not show asterisk when not required", () => {
		render(<InputField label="Optional Field" />);

		expect(screen.queryByText("*")).not.toBeInTheDocument();
	});

	it("should pass input props correctly", () => {
		render(
			<InputField
				label="Test"
				type="email"
				placeholder="Enter email"
				disabled
				min="0"
				step="1"
			/>
		);

		const input = screen.getByTestId("input-field");
		expect(input).toHaveAttribute("type", "email");
		expect(input).toHaveAttribute("placeholder", "Enter email");
		expect(input).toBeDisabled();
		expect(input).toHaveAttribute("min", "0");
		expect(input).toHaveAttribute("step", "1");
	});

	it("should use field name from context", () => {
		render(<InputField label="Test" />);

		const input = screen.getByTestId("input-field");
		expect(input).toHaveAttribute("name", "test-field");
	});

	it("should use field value from context by default", () => {
		mockUseFieldContext.mockReturnValue({
			...mockField,
			state: {
				...mockField.state,
				value: "context value",
			},
		});

		render(<InputField label="Test" />);

		const input = screen.getByTestId("input-field");
		expect(input).toHaveValue("context value");
	});

	it("should override field value with explicit value prop", () => {
		mockUseFieldContext.mockReturnValue({
			...mockField,
			state: {
				...mockField.state,
				value: "context value",
			},
		});

		render(<InputField label="Test" value="override value" />);

		const input = screen.getByTestId("input-field");
		expect(input).toHaveValue("override value");
	});

	it("should handle empty string value prop", () => {
		mockUseFieldContext.mockReturnValue({
			...mockField,
			state: {
				...mockField.state,
				value: "context value",
			},
		});

		render(<InputField label="Test" value="" />);

		const input = screen.getByTestId("input-field");
		expect(input).toHaveValue("");
	});

	it("should call field handleChange on input change", () => {
		render(<InputField label="Test" />);

		const input = screen.getByTestId("input-field");
		fireEvent.change(input, { target: { value: "new value" } });

		expect(mockField.handleChange).toHaveBeenCalledWith("new value");
	});

	it("should render FieldInfo component", () => {
		render(<InputField label="Test" />);

		expect(screen.getByTestId("field-info")).toBeInTheDocument();
	});

	it("should display field errors through FieldInfo", () => {
		mockUseFieldContext.mockReturnValue({
			...mockField,
			state: {
				...mockField.state,
				meta: {
					...mockField.state.meta,
					errors: ["This field is required"],
				},
			},
		});

		render(<InputField label="Test" />);

		expect(screen.getByText("This field is required")).toBeInTheDocument();
	});

	it("should apply correct CSS classes", () => {
		render(<InputField label="Test" />);

		const input = screen.getByTestId("input-field");
		expect(input).toHaveClass(
			"border-input",
			"focus:ring-1",
			"focus:ring-primary"
		);
	});

	it("should handle numeric input types", () => {
		render(<InputField label="Number" type="number" min="0" step="0.1" />);

		const input = screen.getByTestId("input-field");
		expect(input).toHaveAttribute("type", "number");
		expect(input).toHaveAttribute("min", "0");
		expect(input).toHaveAttribute("step", "0.1");
	});
});
