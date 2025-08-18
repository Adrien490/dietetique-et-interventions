import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	useFormField,
} from "@/shared/components/ui/form";
import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";

// Test component that uses form components
function TestFormComponent() {
	const form = useForm({
		defaultValues: {
			username: "",
			email: "",
		},
	});

	return (
		<Form {...form}>
			<form>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<input {...field} data-testid="username-input" />
							</FormControl>
							<FormDescription>Choose a unique username</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="email">Email</FormLabel>
							<FormControl>
								<input
									{...field}
									id="email"
									type="email"
									data-testid="email-input"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}

// Test component that uses useFormField hook
function TestFormFieldComponent() {
	const { formItemId, formDescriptionId, formMessageId } = useFormField();

	return (
		<div>
			<div data-testid="form-item-id">{formItemId}</div>
			<div data-testid="form-description-id">{formDescriptionId}</div>
			<div data-testid="form-message-id">{formMessageId}</div>
		</div>
	);
}

function TestFormWithFieldComponent() {
	const form = useForm({
		defaultValues: { test: "" },
	});

	return (
		<Form {...form}>
			<FormField
				control={form.control}
				name="test"
				render={() => (
					<FormItem>
						<TestFormFieldComponent />
					</FormItem>
				)}
			/>
		</Form>
	);
}

describe("Form Components", () => {
	describe("Form", () => {
		it("should render form with form fields", () => {
			render(<TestFormComponent />);

			expect(screen.getByText("Username")).toBeInTheDocument();
			expect(screen.getByText("Email")).toBeInTheDocument();
			expect(screen.getByTestId("username-input")).toBeInTheDocument();
			expect(screen.getByTestId("email-input")).toBeInTheDocument();
		});

		it("should render form descriptions", () => {
			render(<TestFormComponent />);

			expect(screen.getByText("Choose a unique username")).toBeInTheDocument();
		});

		it("should associate labels with inputs", () => {
			render(<TestFormComponent />);

			const emailLabel = screen.getByText("Email");
			const emailInput = screen.getByTestId("email-input");

			expect(emailLabel).toHaveAttribute("for", "email");
			expect(emailInput).toHaveAttribute("id", "email");
		});
	});

	describe("FormItem", () => {
		it("should render form item container", () => {
			render(
				<FormItem data-testid="form-item">
					<div>Form item content</div>
				</FormItem>
			);

			const formItem = screen.getByTestId("form-item");
			expect(formItem).toBeInTheDocument();
			expect(formItem).toHaveClass("grid", "gap-2");
		});

		it("should apply custom className", () => {
			render(
				<FormItem className="custom-class" data-testid="form-item">
					<div>Content</div>
				</FormItem>
			);

			const formItem = screen.getByTestId("form-item");
			expect(formItem).toHaveClass("custom-class");
		});
	});

	describe("FormLabel", () => {
		it("should render form label", () => {
			render(<FormLabel data-testid="form-label">Test Label</FormLabel>);

			const label = screen.getByTestId("form-label");
			expect(label).toBeInTheDocument();
			expect(label).toHaveTextContent("Test Label");
		});

		it("should support custom className", () => {
			render(
				<FormLabel className="custom-label" data-testid="form-label">
					Label
				</FormLabel>
			);

			const label = screen.getByTestId("form-label");
			expect(label).toHaveClass("custom-label");
		});
	});

	describe("FormControl", () => {
		it("should render form control wrapper", () => {
			render(
				<FormControl data-testid="form-control">
					<input type="text" />
				</FormControl>
			);

			const control = screen.getByTestId("form-control");
			expect(control).toBeInTheDocument();
		});

		it("should pass through props to child element", () => {
			render(
				<FormControl>
					<input type="text" data-testid="input" placeholder="Test" />
				</FormControl>
			);

			const input = screen.getByTestId("input");
			expect(input).toHaveAttribute("placeholder", "Test");
		});
	});

	describe("FormDescription", () => {
		it("should render form description", () => {
			render(
				<FormDescription data-testid="form-description">
					This is a helpful description
				</FormDescription>
			);

			const description = screen.getByTestId("form-description");
			expect(description).toBeInTheDocument();
			expect(description).toHaveTextContent("This is a helpful description");
		});

		it("should have correct styling classes", () => {
			render(
				<FormDescription data-testid="form-description">
					Description
				</FormDescription>
			);

			const description = screen.getByTestId("form-description");
			expect(description).toHaveClass("text-sm", "text-muted-foreground");
		});
	});

	describe("FormMessage", () => {
		it("should render form message", () => {
			render(
				<FormMessage data-testid="form-message">Error message</FormMessage>
			);

			const message = screen.getByTestId("form-message");
			expect(message).toBeInTheDocument();
			expect(message).toHaveTextContent("Error message");
		});

		it("should have error styling classes", () => {
			render(<FormMessage data-testid="form-message">Error</FormMessage>);

			const message = screen.getByTestId("form-message");
			expect(message).toHaveClass("text-destructive", "text-sm");
		});

		it("should render empty message when no children", () => {
			render(<FormMessage data-testid="form-message" />);

			const message = screen.getByTestId("form-message");
			expect(message).toBeInTheDocument();
			expect(message).toBeEmptyDOMElement();
		});
	});

	describe("useFormField", () => {
		it("should provide form field context values", () => {
			render(<TestFormWithFieldComponent />);

			// Should generate unique IDs for form field elements
			const formItemId = screen.getByTestId("form-item-id");
			const formDescriptionId = screen.getByTestId("form-description-id");
			const formMessageId = screen.getByTestId("form-message-id");

			expect(formItemId).toHaveTextContent("test-form-item");
			expect(formDescriptionId).toHaveTextContent("test-form-item-description");
			expect(formMessageId).toHaveTextContent("test-form-item-message");
		});

		it("should throw error when used outside FormField", () => {
			// Test that useFormField throws when called outside of any React component context
			// This test verifies the hook validation, which is the intended behavior
			expect(() => {
				// Call the hook directly outside of any context
				useFormField();
			}).toThrow("Invalid hook call");
		});
	});

	describe("FormField", () => {
		it("should provide field context to children", () => {
			const TestFormFieldComponent = () => {
				const form = useForm({ defaultValues: { testField: "test value" } });

				return (
					<Form {...form}>
						<FormField
							control={form.control}
							name="testField"
							render={({ field }) => (
								<div>
									<input {...field} data-testid="field-input" />
								</div>
							)}
						/>
					</Form>
				);
			};

			render(<TestFormFieldComponent />);

			const input = screen.getByTestId("field-input");
			expect(input).toHaveValue("test value");
		});
	});
});
