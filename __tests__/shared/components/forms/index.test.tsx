import { useAppForm } from "@/shared/components/forms";
import { renderHook } from "@testing-library/react";

// Mock des composants de formulaire
jest.mock("@/shared/components/forms/checkbox-field", () => ({
	CheckboxField: () => <div data-testid="checkbox-field">CheckboxField</div>,
}));

jest.mock("@/shared/components/forms/input-field", () => ({
	InputField: () => <div data-testid="input-field">InputField</div>,
}));

jest.mock("@/shared/components/forms/radio-group-field", () => ({
	RadioGroupField: () => (
		<div data-testid="radio-group-field">RadioGroupField</div>
	),
}));

jest.mock("@/shared/components/forms/select-field", () => ({
	SelectField: () => <div data-testid="select-field">SelectField</div>,
}));

jest.mock("@/shared/components/forms/textarea-field", () => ({
	TextareaField: () => <div data-testid="textarea-field">TextareaField</div>,
}));

// Mock du contexte de formulaire
jest.mock("@/shared/lib/form-context", () => ({
	fieldContext: {
		name: "mock-field-context",
	},
	formContext: {
		name: "mock-form-context",
	},
}));

// Mock de Tanstack React Form
jest.mock("@tanstack/react-form", () => ({
	createFormHook: jest.fn((config) => ({
		useAppForm: jest.fn(() => ({
			config,
			fieldComponents: config.fieldComponents,
			formComponents: config.formComponents,
		})),
	})),
}));

describe("Forms Index", () => {
	it("should export useAppForm hook", () => {
		expect(useAppForm).toBeDefined();
		expect(typeof useAppForm).toBe("function");
	});

	it("should create form hook with field components", () => {
		const { result } = renderHook(() => useAppForm());

		expect(result.current).toBeDefined();
		expect(result.current.config).toBeDefined();
		expect(result.current.fieldComponents).toBeDefined();
	});

	it("should include all field components", () => {
		const { result } = renderHook(() => useAppForm());

		const fieldComponents = result.current.fieldComponents;

		expect(fieldComponents.InputField).toBeDefined();
		expect(fieldComponents.SelectField).toBeDefined();
		expect(fieldComponents.CheckboxField).toBeDefined();
		expect(fieldComponents.TextareaField).toBeDefined();
		expect(fieldComponents.RadioGroupField).toBeDefined();
	});

	it("should include form components object", () => {
		const { result } = renderHook(() => useAppForm());

		expect(result.current.formComponents).toBeDefined();
		expect(typeof result.current.formComponents).toBe("object");
	});

	it("should use correct field and form contexts", () => {
		const { result } = renderHook(() => useAppForm());

		expect(result.current.config.fieldContext).toEqual({
			name: "mock-field-context",
		});
		expect(result.current.config.formContext).toEqual({
			name: "mock-form-context",
		});
	});
});

// Test des exports nommés
describe("Named Exports", () => {
	it("should export FieldInfo", async () => {
		const module = await import("@/shared/components/forms");
		expect(module.FieldInfo).toBeDefined();
	});

	it("should export FormErrors", async () => {
		const module = await import("@/shared/components/forms");
		expect(module.FormErrors).toBeDefined();
	});

	it("should export FormFooter", async () => {
		const module = await import("@/shared/components/forms");
		expect(module.FormFooter).toBeDefined();
	});

	it("should export useAppForm", async () => {
		const module = await import("@/shared/components/forms");
		expect(module.useAppForm).toBeDefined();
	});
});











