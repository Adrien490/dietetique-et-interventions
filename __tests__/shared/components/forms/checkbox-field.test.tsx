import { CheckboxField } from "@/shared/components/forms/checkbox-field";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock du contexte de champ
const mockField = {
	name: "test-checkbox",
	state: { value: false },
	handleChange: jest.fn(),
	handleBlur: jest.fn(),
};

jest.mock("@/shared/lib/form-context", () => ({
	useFieldContext: () => mockField,
}));

// Mock des composants UI
jest.mock("@/shared/components/ui/checkbox", () => ({
	Checkbox: ({
		onCheckedChange,
		checked,
		name,
		id,
		className,
		...props
	}: any) => (
		<input
			type="checkbox"
			data-testid="checkbox"
			name={name}
			id={id}
			className={className}
			checked={checked}
			onChange={(e) => onCheckedChange && onCheckedChange(e.target.checked)}
			{...props}
		/>
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

describe("CheckboxField", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockField.state.value = false;
	});

	it("should render checkbox with label", () => {
		render(<CheckboxField label="Accept terms" />);

		expect(screen.getByTestId("checkbox")).toBeInTheDocument();
		expect(screen.getByTestId("form-label")).toBeInTheDocument();
		expect(screen.getByText("Accept terms")).toBeInTheDocument();
	});

	it("should render required asterisk when required is true", () => {
		render(<CheckboxField label="Accept terms" required />);

		expect(screen.getByText("*")).toBeInTheDocument();
		expect(screen.getByText("*")).toHaveClass("text-destructive");
	});

	it("should handle checkbox change", () => {
		render(<CheckboxField label="Accept terms" />);

		const checkbox = screen.getByRole("checkbox");
		fireEvent.click(checkbox);

		expect(mockField.handleChange).toHaveBeenCalledWith(true);
	});

	it("should call custom onCheckedChange callback", () => {
		const onCheckedChange = jest.fn();
		render(
			<CheckboxField label="Accept terms" onCheckedChange={onCheckedChange} />
		);

		const checkbox = screen.getByRole("checkbox");
		fireEvent.click(checkbox);

		expect(onCheckedChange).toHaveBeenCalledWith(true);
	});

	it("should render hidden input with correct value", () => {
		render(<CheckboxField label="Accept terms" />);

		const hiddenInput = screen.getByDisplayValue("false");
		expect(hiddenInput).toBeInTheDocument();
		expect(hiddenInput).toHaveAttribute("type", "hidden");
		expect(hiddenInput).toHaveAttribute("name", "test-checkbox");
	});

	it("should use checked prop when provided", () => {
		render(<CheckboxField label="Accept terms" checked={true} />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toHaveAttribute("checked");
	});

	it("should use field state value when checked prop not provided", () => {
		mockField.state.value = true;
		render(<CheckboxField label="Accept terms" />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toHaveAttribute("checked");
	});

	it("should disable checkbox when disabled prop is true", () => {
		render(<CheckboxField label="Accept terms" disabled />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toHaveAttribute("disabled");
	});

	it("should render FieldInfo component", () => {
		render(<CheckboxField label="Accept terms" />);

		expect(screen.getByTestId("field-info")).toBeInTheDocument();
		expect(
			screen.getByText("Field info for test-checkbox")
		).toBeInTheDocument();
	});

	it("should have correct layout classes", () => {
		render(<CheckboxField label="Accept terms" />);

		const container = screen.getByTestId("checkbox").closest("div");
		expect(container).toHaveClass("flex", "items-center", "space-x-2");
	});

	it("should associate label with checkbox", () => {
		render(<CheckboxField label="Accept terms" />);

		const label = screen.getByTestId("form-label");
		expect(label).toHaveAttribute("for", "test-checkbox");
	});

	it("should handle boolean conversion properly", () => {
		const onCheckedChange = jest.fn();
		render(
			<CheckboxField label="Accept terms" onCheckedChange={onCheckedChange} />
		);

		const checkbox = screen.getByRole("checkbox");
		fireEvent.click(checkbox);

		expect(mockField.handleChange).toHaveBeenCalledWith(true);
		expect(onCheckedChange).toHaveBeenCalledWith(true);
	});

	it("should render without label when not provided", () => {
		render(<CheckboxField />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
	});

	it("should have correct checkbox styling", () => {
		render(<CheckboxField label="Accept terms" />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toHaveClass("mt-1");
	});
});
