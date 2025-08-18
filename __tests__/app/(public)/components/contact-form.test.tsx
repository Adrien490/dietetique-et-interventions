import { ContactForm } from "@/domains/contact-request/features/create-contact-request/create-contact-request-form";
import { render, screen } from "@testing-library/react";

// Mock all external dependencies
jest.mock("@tanstack/react-form", () => ({
	useForm: jest.fn(() => ({
		handleSubmit: jest.fn(),
		reset: jest.fn(),
		state: {
			canSubmit: true,
			isSubmitting: false,
			isTouched: false,
			errorMap: {},
		},
		Field: ({ name, children, validators }: any) => {
			const mockField = {
				name,
				state: {
					value: "",
					meta: {
						isValid: true,
						errors: [],
					},
				},
				handleChange: jest.fn(),
				handleBlur: jest.fn(),
				pushValue: jest.fn(),
				removeValue: jest.fn(),
			};
			return children(mockField);
		},
		Subscribe: ({ children }: any) => {
			return children([[], []]);
		},
	})),
	useTransform: jest.fn(() => ({})),
	mergeForm: jest.fn(() => ({})),
}));

jest.mock("framer-motion", () => ({
	motion: {
		div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
	},
	AnimatePresence: ({ children }: any) => <>{children}</>,
}));

jest.mock("lucide-react", () => ({
	Upload: () => <div data-testid="upload-icon">📤</div>,
	X: () => <div data-testid="x-icon">✕</div>,
}));

jest.mock("sonner", () => ({
	toast: {
		success: jest.fn(),
		error: jest.fn(),
	},
}));

jest.mock("@/shared/components/loaders", () => ({
	MiniDotsLoader: ({ size, color }: { size: string; color: string }) => (
		<div data-testid="mini-dots-loader" data-size={size} data-color={color}>
			...
		</div>
	),
}));

jest.mock("@/shared/components/ui/button", () => ({
	Button: ({ children, disabled, type, ...props }: any) => (
		<button type={type} disabled={disabled} data-testid="button" {...props}>
			{children}
		</button>
	),
}));

jest.mock("@/shared/components/ui/input", () => ({
	Input: ({ className, ...props }: any) => (
		<input data-testid="input" className={className} {...props} />
	),
}));

jest.mock("@/shared/components/ui/label", () => ({
	Label: ({ children, ...props }: any) => (
		<label data-testid="label" {...props}>
			{children}
		</label>
	),
}));

jest.mock("@/shared/components/ui/select", () => ({
	Select: ({ children, onValueChange }: any) => (
		<div data-testid="select" data-onvaluechange={onValueChange}>
			{children}
		</div>
	),
	SelectContent: ({ children }: any) => (
		<div data-testid="select-content">{children}</div>
	),
	SelectItem: ({ children, value }: any) => (
		<div data-testid="select-item" data-value={value}>
			{children}
		</div>
	),
	SelectTrigger: ({ children, ...props }: any) => (
		<div data-testid="select-trigger" {...props}>
			{children}
		</div>
	),
	SelectValue: ({ placeholder }: any) => (
		<span data-testid="select-value" data-placeholder={placeholder} />
	),
}));

jest.mock("@/shared/components/ui/textarea", () => ({
	Textarea: ({ ...props }: any) => (
		<textarea data-testid="textarea" {...props} />
	),
}));

jest.mock("@/shared/constants/contact-form-subject-options", () => ({
	subjectOptions: {
		consultation: "Première consultation",
		suivi: "Suivi nutritionnel",
		urgence: "Question urgente",
	},
}));

jest.mock("@/shared/hooks/use-contact-form", () => ({
	useContactForm: jest.fn(() => ({
		state: {},
		dispatch: jest.fn(),
		isPending: false,
	})),
}));

jest.mock("@/shared/utils/uploadthing", () => ({
	UploadDropzone: ({ children, ...props }: any) => (
		<div data-testid="upload-dropzone" {...props}>
			Upload Zone
		</div>
	),
	useUploadThing: jest.fn(() => ({
		startUpload: jest.fn(),
		isUploading: false,
	})),
}));

// Mock environment
Object.defineProperty(process, "env", {
	value: {
		NEXT_PUBLIC_EMAIL: "test@example.com",
	},
});

describe("ContactForm Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should render contact form with proper structure", () => {
		render(<ContactForm />);

		const form = screen.getByRole("form");
		expect(form).toBeInTheDocument();
		expect(form).toHaveAttribute("itemScope");
		expect(form).toHaveAttribute("itemType", "https://schema.org/ContactPoint");
		expect(form).toHaveAttribute("noValidate");
	});

	it("should render form title for screen readers", () => {
		render(<ContactForm />);

		const title = screen.getByRole("heading", {
			name: /Formulaire de contact/i,
		});
		expect(title).toBeInTheDocument();
		expect(title).toHaveClass("sr-only");
	});

	it("should render all required form fields", () => {
		render(<ContactForm />);

		// Check for form labels
		expect(screen.getByText(/Nom et prénom/)).toBeInTheDocument();
		expect(screen.getByText(/Adresse email/)).toBeInTheDocument();
		expect(screen.getByText(/Motif/)).toBeInTheDocument();
		expect(screen.getByText(/Message/)).toBeInTheDocument();
		expect(screen.getByText(/Pièces jointes/)).toBeInTheDocument();

		// Check for required field indicators
		const requiredIndicators = screen.getAllByText("*");
		expect(requiredIndicators.length).toBeGreaterThanOrEqual(4); // Name, email, subject, message
	});

	it("should render form inputs", () => {
		render(<ContactForm />);

		const inputs = screen.getAllByTestId("input");
		expect(inputs.length).toBeGreaterThanOrEqual(2); // Name and email

		const textarea = screen.getByTestId("textarea");
		expect(textarea).toBeInTheDocument();

		const select = screen.getByTestId("select");
		expect(select).toBeInTheDocument();
	});

	it("should render submit button", () => {
		render(<ContactForm />);

		const submitButton = screen.getByRole("button", {
			name: /Envoyer ma demande/i,
		});
		expect(submitButton).toBeInTheDocument();
		expect(submitButton).toHaveAttribute("type", "submit");
	});

	it("should render file upload section", () => {
		render(<ContactForm />);

		const uploadDropzone = screen.getByTestId("upload-dropzone");
		expect(uploadDropzone).toBeInTheDocument();

		const uploadLabel = screen.getByText(/Pièces jointes/);
		expect(uploadLabel).toBeInTheDocument();
		expect(screen.getByText(/max 3/)).toBeInTheDocument();
	});

	it("should render subject options", () => {
		render(<ContactForm />);

		// Check that select items are rendered
		const selectItems = screen.getAllByTestId("select-item");
		expect(selectItems.length).toBe(3); // Based on mocked subjectOptions

		expect(screen.getByText("Première consultation")).toBeInTheDocument();
		expect(screen.getByText("Suivi nutritionnel")).toBeInTheDocument();
		expect(screen.getByText("Question urgente")).toBeInTheDocument();
	});

	it("should have proper accessibility attributes", () => {
		render(<ContactForm />);

		// Check form has proper aria attributes
		const form = screen.getByRole("form");
		expect(form).toHaveAttribute("aria-labelledby", "contact-form-title");

		// Check fieldset
		const fieldset = form.querySelector("fieldset");
		expect(fieldset).toBeInTheDocument();

		// Screen reader description
		const srDescription = screen.getByText(
			/Formulaire de contact pour prendre rendez-vous/
		);
		expect(srDescription).toHaveClass("sr-only");
	});

	it("should render data attributes for voice commands and AI", () => {
		render(<ContactForm />);

		const form = screen.getByRole("form");
		expect(form).toHaveAttribute(
			"data-voice-queries",
			"formulaire contact diététicienne,prendre rendez-vous nantes,consultation nutrition"
		);
		expect(form).toHaveAttribute(
			"data-content-type",
			"contact-form-healthcare"
		);
		expect(form).toHaveAttribute(
			"data-ai-category",
			"healthcare-nutrition-booking"
		);
		expect(form).toHaveAttribute("data-form-purpose", "appointment-booking");
	});

	it("should render required fields indicator", () => {
		render(<ContactForm />);

		const requiredText = screen.getByText("Champs obligatoires");
		expect(requiredText).toBeInTheDocument();
	});

	it("should handle form layout", () => {
		render(<ContactForm />);

		// Check grid layout
		const form = screen.getByRole("form");
		const gridElement = form.querySelector(".grid");
		expect(gridElement).toBeInTheDocument();
		expect(gridElement).toHaveClass("grid-cols-1", "lg:grid-cols-2");
	});

	it("should render character counter for message field", () => {
		render(<ContactForm />);

		// The character counter should be present
		const characterCounter = screen.getByText(/\/2000 caractères/);
		expect(characterCounter).toBeInTheDocument();
	});

	it("should have proper form validation structure", () => {
		render(<ContactForm />);

		// Check that inputs have proper validation attributes
		const nameInput = screen.getAllByTestId("input")[0];
		expect(nameInput).toHaveAttribute("required");
		expect(nameInput).toHaveAttribute("aria-required", "true");

		const textarea = screen.getByTestId("textarea");
		expect(textarea).toHaveAttribute("required");
		expect(textarea).toHaveAttribute("aria-required", "true");
		expect(textarea).toHaveAttribute("maxLength", "2000");
	});
});
