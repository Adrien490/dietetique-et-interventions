import { RadioGroupField } from "@/shared/components/forms/radio-group-field";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock du contexte de champ
const mockField = {
	name: "test-radio-group",
	state: { value: "" },
	handleChange: jest.fn(),
	handleBlur: jest.fn(),
};

jest.mock("@/shared/lib/form-context", () => ({
	useFieldContext: () => mockField,
}));

// Mock des composants UI
jest.mock("@/shared/components/ui/radio-group", () => ({
	RadioGroup: ({ children, onValueChange, value, ...props }: any) => (
		<div
			data-testid="radio-group"
			data-value={value}
			onClick={() => onValueChange && onValueChange("option1")}
			{...props}
		>
			{children}
		</div>
	),
	RadioGroupItem: ({ value, id, ...props }: any) => (
		<input
			type="radio"
			data-testid={`radio-${value}`}
			value={value}
			id={id}
			{...props}
		/>
	),
}));

jest.mock("@/shared/components/ui/label", () => ({
	Label: ({ children, htmlFor, ...props }: any) => (
		<label data-testid="label" htmlFor={htmlFor} {...props}>
			{children}
		</label>
	),
}));

jest.mock("@/shared/components/forms/field-info", () => ({
	FieldInfo: () => (
		<div data-testid="field-info">Field info for {mockField.name}</div>
	),
}));

describe("RadioGroupField", () => {
	const mockOptions = [
		{ value: "option1", label: "Option 1" },
		{ value: "option2", label: "Option 2" },
		{ value: "option3", label: "Option 3" },
	];

	beforeEach(() => {
		jest.clearAllMocks();
		mockField.state.value = "";
	});

	it("should render radio group with options", () => {
		render(<RadioGroupField options={mockOptions} label="Choose option" />);

		expect(screen.getByTestId("radio-group")).toBeInTheDocument();
		expect(screen.getByTestId("radio-option1")).toBeInTheDocument();
		expect(screen.getByTestId("radio-option2")).toBeInTheDocument();
		expect(screen.getByTestId("radio-option3")).toBeInTheDocument();
	});

	it("should render label when provided", () => {
		render(<RadioGroupField options={mockOptions} label="Choose option" />);

		const labels = screen.getAllByTestId("label");
		expect(labels[0]).toHaveTextContent("Choose option");
	});

	it("should render required asterisk when required is true", () => {
		render(
			<RadioGroupField options={mockOptions} label="Choose option" required />
		);

		expect(screen.getByText("*")).toBeInTheDocument();
		expect(screen.getByText("*")).toHaveClass("text-destructive");
	});

	it("should handle value change", () => {
		render(<RadioGroupField options={mockOptions} label="Choose option" />);

		const radioGroup = screen.getByTestId("radio-group");
		fireEvent.click(radioGroup);

		expect(mockField.handleChange).toHaveBeenCalledWith("option1");
	});

	it("should call custom onValueChangeCallback", () => {
		const onValueChangeCallback = jest.fn();
		render(
			<RadioGroupField
				options={mockOptions}
				label="Choose option"
				onValueChangeCallback={onValueChangeCallback}
			/>
		);

		const radioGroup = screen.getByTestId("radio-group");
		fireEvent.click(radioGroup);

		expect(onValueChangeCallback).toHaveBeenCalledWith("option1");
	});

	it("should render all option labels", () => {
		render(<RadioGroupField options={mockOptions} label="Choose option" />);

		expect(screen.getByText("Option 1")).toBeInTheDocument();
		expect(screen.getByText("Option 2")).toBeInTheDocument();
		expect(screen.getByText("Option 3")).toBeInTheDocument();
	});

	it("should render field info", () => {
		render(<RadioGroupField options={mockOptions} label="Choose option" />);

		expect(screen.getByTestId("field-info")).toBeInTheDocument();
		expect(
			screen.getByText("Field info for test-radio-group")
		).toBeInTheDocument();
	});

	it("should handle disabled state", () => {
		render(
			<RadioGroupField options={mockOptions} label="Choose option" disabled />
		);

		const radioGroup = screen.getByTestId("radio-group");
		expect(radioGroup).toHaveAttribute("disabled");
	});

	it("should render without label when not provided", () => {
		render(<RadioGroupField options={mockOptions} />);

		const labels = screen.getAllByTestId("label");
		// Should only have labels for radio items, not main label
		expect(labels).toHaveLength(3); // One for each option
	});

	it("should have correct structure for accessibility", () => {
		render(<RadioGroupField options={mockOptions} label="Choose option" />);

		mockOptions.forEach((option) => {
			const radio = screen.getByTestId(`radio-${option.value}`);
			expect(radio).toHaveAttribute("id", option.value);
			expect(radio).toHaveAttribute("value", option.value);
		});
	});

	it("should handle empty options array", () => {
		render(<RadioGroupField options={[]} label="Choose option" />);

		expect(screen.getByTestId("radio-group")).toBeInTheDocument();
		expect(screen.queryByTestId("radio-option1")).not.toBeInTheDocument();
	});
});
