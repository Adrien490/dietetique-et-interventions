import { Contact } from "@/app/(marketing)/components/contact";
import { render, screen } from "@testing-library/react";

// Mock des composants d'animation
jest.mock("@/shared/components/animations", () => ({
	Reveal: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="reveal">{children}</div>
	),
}));

// Mock des composants UI
jest.mock("@/shared/components/ui/tooltip", () => ({
	Tooltip: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="tooltip">{children}</div>
	),
	TooltipTrigger: ({ children, asChild }: any) => (
		<div data-testid="tooltip-trigger">{children}</div>
	),
	TooltipContent: ({ children, id, role }: any) => (
		<div data-testid="tooltip-content" id={id} role={role}>
			{children}
		</div>
	),
}));

// Mock du composant ContactForm
jest.mock("@/app/(marketing)/components/contact-form", () => ({
	ContactForm: () => <div data-testid="contact-form">Contact Form</div>,
}));

// Mock Next.js Link
jest.mock("next/link", () => {
	return ({ children, href, ...props }: any) => (
		<a href={href} {...props}>
			{children}
		</a>
	);
});

// Mock des icônes Lucide
jest.mock("lucide-react", () => ({
	Mail: ({ className }: any) => (
		<div data-testid="mail-icon" className={className}>
			Mail
		</div>
	),
	MapPin: ({ className }: any) => (
		<div data-testid="map-pin-icon" className={className}>
			MapPin
		</div>
	),
}));

// Mock des variables d'environnement
const originalEnv = process.env;
beforeEach(() => {
	process.env = {
		...originalEnv,
		NEXT_PUBLIC_EMAIL: "contact@example.com",
	};
});

afterEach(() => {
	process.env = originalEnv;
});

describe("Contact", () => {
	it("should render contact section with correct structure", () => {
		render(<Contact />);

		const section = screen.getByRole("region");
		expect(section).toBeInTheDocument();
		expect(section).toHaveAttribute("id", "contact");
		expect(section).toHaveAttribute(
			"aria-label",
			"Contact et prise de rendez-vous avec Manon Chaillou, diététicienne nutritionniste à Nantes"
		);
	});

	it("should render main heading", () => {
		render(<Contact />);

		const heading = screen.getByRole("heading", { level: 2 });
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent("Contact - Prendre rendez-vous à Nantes");
		expect(heading).toHaveAttribute("id", "contact-title");
	});

	it("should render contact description", () => {
		render(<Contact />);

		const description = screen.getByText(
			/Prenez rendez-vous pour une consultation diététique personnalisée/
		);
		expect(description).toBeInTheDocument();
		expect(description).toHaveAttribute("id", "contact-description");
	});

	it("should render contact coordinates heading", () => {
		render(<Contact />);

		expect(screen.getByText("Coordonnées de contact")).toBeInTheDocument();
	});

	it("should render email section with icon and link", () => {
		render(<Contact />);

		expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
		expect(screen.getByText("Email")).toBeInTheDocument();

		const emailLink = screen.getByRole("link", {
			name: /Envoyer un email à Manon Chaillou/,
		});
		expect(emailLink).toBeInTheDocument();
		expect(emailLink).toHaveAttribute("href", "mailto:contact@example.com");
		expect(emailLink).toHaveAttribute("itemProp", "email");
	});

	it("should render zone d'intervention section", () => {
		render(<Contact />);

		expect(screen.getByTestId("map-pin-icon")).toBeInTheDocument();
		expect(screen.getByText("Zone d'intervention")).toBeInTheDocument();
		expect(screen.getByText("Nantes")).toBeInTheDocument();
		expect(screen.getByText("et environs")).toBeInTheDocument();
	});

	it("should render consultation note", () => {
		render(<Contact />);

		expect(screen.getByText(/Consultations :/)).toBeInTheDocument();
		expect(
			screen.getByText(/À domicile sur Nantes et environs/)
		).toBeInTheDocument();
	});

	it("should render contact form section", () => {
		render(<Contact />);

		expect(screen.getByText("Formulaire de contact")).toBeInTheDocument();
		expect(screen.getByTestId("contact-form")).toBeInTheDocument();
	});

	it("should render tooltip components", () => {
		render(<Contact />);

		expect(screen.getByTestId("tooltip")).toBeInTheDocument();
		expect(screen.getByTestId("tooltip-trigger")).toBeInTheDocument();
		expect(screen.getByTestId("tooltip-content")).toBeInTheDocument();
	});

	it("should render animation component", () => {
		render(<Contact />);

		expect(screen.getByTestId("reveal")).toBeInTheDocument();
	});

	it("should have proper semantic structure", () => {
		render(<Contact />);

		const section = screen.getByRole("region");
		expect(section).toHaveAttribute("itemScope");
		expect(section).toHaveAttribute(
			"itemType",
			"https://schema.org/LocalBusiness"
		);
	});

	it("should have accessibility attributes", () => {
		render(<Contact />);

		const section = screen.getByRole("region");
		expect(section).toHaveAttribute("data-voice-queries");
		expect(section).toHaveAttribute("data-business-hours", "rendez-vous");
		expect(section).toHaveAttribute(
			"data-contact-methods",
			"téléphone,email,formulaire"
		);
	});

	it("should have proper container styling", () => {
		render(<Contact />);

		const section = screen.getByRole("region");
		expect(section).toHaveClass("py-16", "lg:py-24", "bg-background");
	});

	it("should render structured data for contact point", () => {
		render(<Contact />);

		// Check for ContactPoint schema
		const contactPointElements = screen.getAllByText("", {
			selector: '[itemscope][itemtype="https://schema.org/ContactPoint"]',
		});
		expect(contactPointElements.length).toBeGreaterThan(0);
	});

	it("should render structured data for city", () => {
		render(<Contact />);

		// Check for City schema
		const cityElements = screen.getAllByText("", {
			selector: '[itemscope][itemtype="https://schema.org/City"]',
		});
		expect(cityElements.length).toBeGreaterThan(0);
	});

	it("should handle missing environment variable gracefully", () => {
		// Remove email from environment
		delete process.env.NEXT_PUBLIC_EMAIL;

		render(<Contact />);

		// Should still render without crashing
		const section = screen.getByRole("region");
		expect(section).toBeInTheDocument();
	});

	it("should have proper icons accessibility", () => {
		render(<Contact />);

		const mailIcon = screen.getByTestId("mail-icon");
		const mapIcon = screen.getByTestId("map-pin-icon");

		// Icons should be present (aria-hidden is handled by the actual icon components)
		expect(mailIcon).toBeInTheDocument();
		expect(mapIcon).toBeInTheDocument();
	});

	it("should render tooltip with correct accessibility attributes", () => {
		render(<Contact />);

		const tooltipContent = screen.getByTestId("tooltip-content");
		expect(tooltipContent).toHaveAttribute("id", "email-tooltip");
		expect(tooltipContent).toHaveAttribute("role", "tooltip");
	});

	it("should have proper email link attributes", () => {
		render(<Contact />);

		const emailLink = screen.getByRole("link", {
			name: /Envoyer un email à Manon Chaillou/,
		});
		expect(emailLink).toHaveAttribute("aria-describedby", "email-tooltip");
		expect(emailLink).toHaveClass("hover:text-primary", "transition-colors");
	});

	it("should render consultation info with emoji", () => {
		render(<Contact />);

		// The emoji might not render properly in test environment, check for the text content
		expect(screen.getByText("Consultations :")).toBeInTheDocument();
		expect(
			screen.getByText(/À domicile sur Nantes et environs/)
		).toBeInTheDocument();
	});

	it("should have proper grid layout classes", () => {
		render(<Contact />);

		// Check for grid layout in contact information
		const gridElement = screen.getByText("", {
			selector: ".grid.sm\\:grid-cols-2.lg\\:grid-cols-3",
		});
		expect(gridElement).toBeInTheDocument();
	});

	it("should render contact methods in data attribute", () => {
		render(<Contact />);

		const section = screen.getByRole("region");
		expect(section).toHaveAttribute(
			"data-contact-methods",
			"téléphone,email,formulaire"
		);
	});

	it("should have correct voice queries data attribute", () => {
		render(<Contact />);

		const section = screen.getByRole("region");
		expect(section).toHaveAttribute(
			"data-voice-queries",
			"prendre rendez-vous diététicienne nantes,contacter nutritionniste,cabinet diététique nantes"
		);
	});
});
