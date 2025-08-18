import { FieldInfo } from "@/shared/components/forms/field-info";
import { render, screen } from "@testing-library/react";

describe("FieldInfo", () => {
	const createMockField = (overrides = {}) => ({
		state: {
			meta: {
				isTouched: false,
				errors: [],
				isValidating: false,
				...overrides.meta,
			},
			...overrides.state,
		},
		...overrides,
	});

	it("should render nothing when field is not touched", () => {
		const field = createMockField();
		const { container } = render(<FieldInfo field={field} />);

		expect(container.firstChild).toBeNull();
	});

	it("should render nothing when field has no errors", () => {
		const field = createMockField({
			meta: { isTouched: true, errors: [] },
		});
		const { container } = render(<FieldInfo field={field} />);

		expect(container.firstChild).toBeNull();
	});

	it("should render error message when field is touched and has errors", () => {
		const field = createMockField({
			meta: {
				isTouched: true,
				errors: ["This field is required"],
			},
		});

		render(<FieldInfo field={field} />);

		const errorMessage = screen.getByText("This field is required");
		expect(errorMessage).toBeInTheDocument();
		expect(errorMessage).toHaveClass("text-xs", "text-destructive");
		expect(errorMessage.tagName).toBe("EM");
	});

	it("should render multiple errors joined by comma", () => {
		const field = createMockField({
			meta: {
				isTouched: true,
				errors: ["This field is required", "Must be at least 3 characters"],
			},
		});

		render(<FieldInfo field={field} />);

		expect(
			screen.getByText("This field is required, Must be at least 3 characters")
		).toBeInTheDocument();
	});

	it("should render additional info when provided", () => {
		const field = createMockField();
		const additionalInfo = <span>Additional help text</span>;

		render(<FieldInfo field={field} additionalInfo={additionalInfo} />);

		expect(screen.getByText("Additional help text")).toBeInTheDocument();
	});

	it("should render both error and additional info", () => {
		const field = createMockField({
			meta: {
				isTouched: true,
				errors: ["This field is required"],
			},
		});
		const additionalInfo = <span>Additional help text</span>;

		render(<FieldInfo field={field} additionalInfo={additionalInfo} />);

		expect(screen.getByText("This field is required")).toBeInTheDocument();
		expect(screen.getByText("Additional help text")).toBeInTheDocument();
	});

	it("should handle field validation state", () => {
		const field = createMockField({
			meta: {
				isTouched: true,
				errors: [],
				isValidating: true,
			},
		});

		const { container } = render(<FieldInfo field={field} />);

		// Should render empty when validating (based on current implementation)
		expect(container.firstChild).toBeNull();
	});

	it("should handle empty error array", () => {
		const field = createMockField({
			meta: {
				isTouched: true,
				errors: [],
			},
		});

		const { container } = render(<FieldInfo field={field} />);

		expect(container.firstChild).toBeNull();
	});

	it("should handle complex additional info", () => {
		const field = createMockField();
		const additionalInfo = (
			<div>
				<span>Help text</span>
				<a href="#" data-testid="help-link">
					Learn more
				</a>
			</div>
		);

		render(<FieldInfo field={field} additionalInfo={additionalInfo} />);

		expect(screen.getByText("Help text")).toBeInTheDocument();
		expect(screen.getByTestId("help-link")).toBeInTheDocument();
	});
});

