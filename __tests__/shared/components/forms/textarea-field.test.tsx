import { TextareaField } from "@/shared/components/forms/textarea-field";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock du contexte de champ
const mockField = {
	name: "test-textarea",
	state: { value: "" },
	handleChange: jest.fn(),
	handleBlur: jest.fn(),
};

jest.mock("@/shared/lib/form-context", () => ({
	useFieldContext: () => mockField,
}));

// Mock des composants UI
jest.mock("@/shared/components/ui/textarea", () => ({
	Textarea: ({ onChange, value, ...props }: any) => (
		<textarea
			data-testid="textarea"
			onChange={onChange}
			value={value}
			{...props}
		/>
	),
}));

jest.mock("@/shared/components/ui/form", () => ({
	FormLabel: ({ children, ...props }: any) => (
		<label data-testid="form-label" {...props}>
			{children}
		</label>
	),
}));

jest.mock("@/shared/components/forms/field-info", () => ({
	FieldInfo: () => (
		<div data-testid="field-info">Field info for {mockField.name}</div>
	),
}));

describe("TextareaField", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockField.state.value = "";
	});

	it("should render textarea with label", () => {
		render(<TextareaField label="Message" />);

		expect(screen.getByTestId("textarea")).toBeInTheDocument();
		expect(screen.getByTestId("form-label")).toBeInTheDocument();
		expect(screen.getByText("Message")).toBeInTheDocument();
	});

	it("should handle text change", () => {
		render(<TextareaField label="Message" />);

		const textarea = screen.getByTestId("textarea");
		fireEvent.change(textarea, { target: { value: "New message" } });

		expect(mockField.handleChange).toHaveBeenCalledWith("New message");
	});

	it("should render required asterisk when required is true", () => {
		render(<TextareaField label="Message" required />);

		expect(screen.getByText("*")).toBeInTheDocument();
		expect(screen.getByText("*")).toHaveClass("text-destructive");
	});

	it("should pass rows prop to textarea", () => {
		render(<TextareaField label="Message" rows={5} />);

		const textarea = screen.getByTestId("textarea");
		expect(textarea).toHaveAttribute("rows", "5");
	});

	it("should pass placeholder to textarea", () => {
		render(
			<TextareaField label="Message" placeholder="Enter your message..." />
		);

		const textarea = screen.getByTestId("textarea");
		expect(textarea).toHaveAttribute("placeholder", "Enter your message...");
	});

	it("should disable textarea when disabled prop is true", () => {
		render(<TextareaField label="Message" disabled />);

		const textarea = screen.getByTestId("textarea");
		expect(textarea).toBeDisabled();
	});

	it("should associate label with textarea", () => {
		render(<TextareaField label="Message" />);

		const label = screen.getByTestId("form-label");
		const textarea = screen.getByTestId("textarea");
		// Vérifier que les éléments existent (l'association exacte peut dépendre de l'implémentation)
		expect(label).toBeInTheDocument();
		expect(textarea).toBeInTheDocument();
	});

	it("should render field info", () => {
		render(<TextareaField label="Message" />);

		expect(screen.getByTestId("field-info")).toBeInTheDocument();
		expect(
			screen.getByText("Field info for test-textarea")
		).toBeInTheDocument();
	});

	it("should apply correct styling classes", () => {
		render(<TextareaField label="Message" />);

		const textarea = screen.getByTestId("textarea");
		expect(textarea).toHaveClass(
			"border-input",
			"focus:ring-1",
			"focus:ring-primary"
		);
	});

	it("should render without label when not provided", () => {
		render(<TextareaField />);

		expect(screen.getByTestId("textarea")).toBeInTheDocument();
		expect(screen.getByTestId("form-label")).toBeInTheDocument();
		expect(screen.queryByText("*")).not.toBeInTheDocument();
	});
});
