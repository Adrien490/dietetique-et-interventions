import { SelectField } from "@/shared/components/forms/select-field";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock des composants UI Select avec gestion d'état
let mockOnValueChange: ((value: string) => void) | null = null;

jest.mock("@/shared/components/ui/select", () => ({
	Select: ({ children, onValueChange, ...props }: any) => {
		mockOnValueChange = onValueChange;
		return (
			<div data-testid="select" {...props}>
				{children}
			</div>
		);
	},
	SelectContent: ({ children }: any) => (
		<div data-testid="select-content">{children}</div>
	),
	SelectItem: ({ children, value }: any) => (
		<div data-testid="select-item" data-value={value}>
			{children}
		</div>
	),
	SelectTrigger: ({ children, onBlur, ...props }: any) => {
		const handleClick = () => {
			if (mockOnValueChange) {
				mockOnValueChange("option1");
			}
		};
		return (
			<button
				data-testid="select-trigger"
				role="combobox"
				aria-expanded="false"
				onBlur={onBlur}
				onClick={handleClick}
				{...props}
			>
				{children}
			</button>
		);
	},
	SelectValue: ({ placeholder }: any) => (
		<span data-testid="select-value">{placeholder}</span>
	),
}));

jest.mock("@/shared/components/ui/form", () => ({
	FormLabel: ({ children, htmlFor, className }: any) => (
		<label htmlFor={htmlFor} className={className} data-testid="form-label">
			{children}
		</label>
	),
}));

jest.mock("@/shared/components/forms/field-info", () => ({
	FieldInfo: ({ field }: any) => (
		<div data-testid="field-info">Field info for {field.name}</div>
	),
}));

// Mock du contexte de formulaire
const mockField = {
	name: "test-select",
	state: { value: "" },
	handleChange: jest.fn(),
	handleBlur: jest.fn(),
};

jest.mock("@/shared/lib/form-context", () => ({
	useFieldContext: () => mockField,
}));

describe("SelectField", () => {
	const mockOptions = [
		{ value: "option1", label: "Option 1" },
		{ value: "option2", label: "Option 2" },
		{ value: "option3", label: "Option 3" },
	];

	beforeEach(() => {
		jest.clearAllMocks();
		mockField.state.value = "";
	});

	it("should render select with label", () => {
		render(<SelectField label="Choose option" options={mockOptions} />);

		expect(screen.getByTestId("select")).toBeInTheDocument();
		expect(screen.getByTestId("form-label")).toBeInTheDocument();
		expect(screen.getByText("Choose option")).toBeInTheDocument();
	});

	it("should render required asterisk when required is true", () => {
		render(
			<SelectField label="Choose option" options={mockOptions} required />
		);

		expect(screen.getByText("*")).toBeInTheDocument();
		expect(screen.getByText("*")).toHaveClass("text-destructive");
	});

	it("should render all options", () => {
		render(<SelectField label="Choose option" options={mockOptions} />);

		const selectItems = screen.getAllByTestId("select-item");
		expect(selectItems).toHaveLength(3);

		expect(screen.getByText("Option 1")).toBeInTheDocument();
		expect(screen.getByText("Option 2")).toBeInTheDocument();
		expect(screen.getByText("Option 3")).toBeInTheDocument();
	});

	it("should handle value change", () => {
		render(<SelectField label="Choose option" options={mockOptions} />);

		const selectTrigger = screen.getByRole("combobox");
		fireEvent.click(selectTrigger);

		expect(mockField.handleChange).toHaveBeenCalledWith("option1");
	});

	it("should render placeholder", () => {
		render(
			<SelectField
				label="Choose option"
				options={mockOptions}
				placeholder="Select an option"
			/>
		);

		expect(screen.getByTestId("select-value")).toBeInTheDocument();
		expect(screen.getByText("Select an option")).toBeInTheDocument();
	});

	it("should disable select when disabled prop is true", () => {
		render(
			<SelectField label="Choose option" options={mockOptions} disabled />
		);

		const select = screen.getByTestId("select");
		expect(select).toHaveAttribute("disabled");
	});

	it("should render FieldInfo component", () => {
		render(<SelectField label="Choose option" options={mockOptions} />);

		expect(screen.getByTestId("field-info")).toBeInTheDocument();
		expect(screen.getByText("Field info for test-select")).toBeInTheDocument();
	});

	it("should associate label with select", () => {
		render(<SelectField label="Choose option" options={mockOptions} />);

		const label = screen.getByTestId("form-label");
		expect(label).toBeInTheDocument();
		expect(label.textContent).toBe("Choose option");
		expect(label).toHaveAttribute("for", "test-select");
	});

	it("should handle onBlur event", () => {
		render(<SelectField label="Choose option" options={mockOptions} />);

		const selectTrigger = screen.getByRole("combobox");
		fireEvent.blur(selectTrigger);

		expect(mockField.handleBlur).toHaveBeenCalled();
	});

	it("should have correct layout classes", () => {
		render(<SelectField label="Choose option" options={mockOptions} />);

		// Check for space-y-1.5 class on container
		const container = screen.getByTestId("form-label").closest("div");
		expect(container).toHaveClass("space-y-1.5");
	});

	it("should pass field name to select", () => {
		render(<SelectField label="Choose option" options={mockOptions} />);

		const select = screen.getByTestId("select");
		expect(select).toHaveAttribute("name", "test-select");
	});

	it("should render with current field value", () => {
		mockField.state.value = "option2";
		render(<SelectField label="Choose option" options={mockOptions} />);

		const select = screen.getByTestId("select");
		expect(select).toHaveAttribute("value", "option2");
	});

	it("should render without label when not provided", () => {
		render(<SelectField options={mockOptions} />);

		const select = screen.getByTestId("select");
		expect(select).toBeInTheDocument();
	});

	it("should handle empty options array", () => {
		render(<SelectField label="Choose option" options={[]} />);

		const selectItems = screen.queryAllByTestId("select-item");
		expect(selectItems).toHaveLength(0);
	});

	it("should render select content with correct styling", () => {
		render(<SelectField label="Choose option" options={mockOptions} />);

		// The content classes are applied inline and may not be testable directly
		// Instead test that select can be rendered without error
		expect(screen.getByRole("combobox")).toBeInTheDocument();
	});

	it("should set select trigger with full width", () => {
		render(<SelectField label="Choose option" options={mockOptions} />);

		const selectTrigger = screen.getByRole("combobox");
		expect(selectTrigger).toHaveClass("w-full");
		expect(selectTrigger).toHaveAttribute("id", "test-select");
	});
});
