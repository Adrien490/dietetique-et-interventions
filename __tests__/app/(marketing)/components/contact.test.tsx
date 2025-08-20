import { Contact } from "@/app/(marketing)/components/contact";
import { render, screen } from "@testing-library/react";

// Mock the CreateContactRequestForm component
jest.mock(
	"@/domains/contact-request/features/create-contact-request/create-contact-request-form",
	() => ({
		CreateContactRequestForm: () => (
			<div data-testid="create-contact-request-form">Contact Form</div>
		),
	})
);

// Mock the Reveal animation component
jest.mock("@/shared/components/animations", () => ({
	Reveal: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
}));

// Mock the Tooltip components
jest.mock("@/shared/components/ui/tooltip", () => ({
	Tooltip: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
	TooltipContent: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
	TooltipTrigger: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
}));

// Mock Lucide icons
jest.mock("lucide-react", () => ({
	Mail: () => <svg data-testid="mail-icon">Mail Icon</svg>,
	MapPin: () => <svg data-testid="mappin-icon">MapPin Icon</svg>,
}));

describe("Contact Component", () => {
	beforeEach(() => {
		render(<Contact />);
	});

	describe("Structure and Layout", () => {
		it("should render contact section with proper attributes", () => {
			const section = screen.getByRole("region");

			expect(section).toBeInTheDocument();
			expect(section).toHaveAttribute("id", "contact");
			expect(section).toHaveAttribute(
				"aria-label",
				expect.stringContaining("Manon Chaillou")
			);
			expect(section).toHaveAttribute("itemScope");
			expect(section).toHaveAttribute(
				"itemType",
				"https://schema.org/LocalBusiness"
			);
		});

		it("should render main heading", () => {
			const heading = screen.getByRole("heading", { level: 2 });

			expect(heading).toBeInTheDocument();
			expect(heading).toHaveTextContent(
				"Contact - Prendre rendez-vous à Nantes"
			);
			expect(heading).toHaveAttribute("id", "contact-title");
		});

		it("should render contact description", () => {
			const description = screen.getByText(
				/Prenez rendez-vous pour une consultation diététique personnalisée/
			);

			expect(description).toBeInTheDocument();
			expect(description).toHaveAttribute("id", "contact-description");
		});
	});

	describe("Contact Information", () => {
		it("should render contact coordinates section", () => {
			const coordinatesHeading = screen.getByRole("heading", {
				level: 3,
				name: "Coordonnées de contact",
			});

			expect(coordinatesHeading).toBeInTheDocument();
		});

		it("should render email contact information", () => {
			const emailLink = screen.getByRole("link", {
				name: /Envoyer un email à Manon Chaillou/,
			});

			expect(emailLink).toBeInTheDocument();
			expect(emailLink).toHaveAttribute(
				"href",
				"mailto:manonchaillou.dietetiqueetintervention@protonmail.com"
			);
		});

		it("should render location information", () => {
			const locationText = screen.getByText(/Zone d'intervention/);

			expect(locationText).toBeInTheDocument();
		});

		it("should render icons for contact methods", () => {
			const mailIcon = screen.getByTestId("mail-icon");
			const mapIcon = screen.getByTestId("mappin-icon");

			expect(mailIcon).toBeInTheDocument();
			expect(mapIcon).toBeInTheDocument();
		});
	});

	describe("Contact Form", () => {
		it("should render contact request form", () => {
			const form = screen.getByTestId("create-contact-request-form");

			expect(form).toBeInTheDocument();
		});

		it("should render form section heading", () => {
			const formHeading = screen.getByRole("heading", {
				level: 3,
				name: "Formulaire de contact",
			});

			expect(formHeading).toBeInTheDocument();
		});
	});

	describe("Accessibility", () => {
		it("should have proper semantic structure", () => {
			const section = screen.getByRole("region");
			const headings = screen.getAllByRole("heading");

			expect(section).toBeInTheDocument();
			expect(headings.length).toBeGreaterThanOrEqual(2);
		});

		it("should have structured data attributes", () => {
			const section = screen.getByRole("region");

			expect(section).toHaveAttribute("data-voice-queries");
			expect(section).toHaveAttribute("data-business-hours");
			expect(section).toHaveAttribute("data-contact-methods");
		});

		it("should have proper ARIA labels", () => {
			const section = screen.getByRole("region");

			expect(section).toHaveAttribute(
				"aria-label",
				expect.stringContaining("diététicienne nutritionniste")
			);
		});
	});

	describe("SEO and Schema", () => {
		it("should have Schema.org markup for LocalBusiness", () => {
			const section = screen.getByRole("region");

			expect(section).toHaveAttribute("itemScope");
			expect(section).toHaveAttribute(
				"itemType",
				"https://schema.org/LocalBusiness"
			);
		});

		it("should have data attributes for voice queries", () => {
			const section = screen.getByRole("region");

			expect(section).toHaveAttribute(
				"data-voice-queries",
				expect.stringContaining("diététicienne nantes")
			);
		});
	});

	describe("Links and Navigation", () => {
		it("should have working email link", () => {
			const emailLink = screen.getByRole("link", { name: /Envoyer un email/ });

			expect(emailLink).toHaveAttribute(
				"href",
				"mailto:manonchaillou.dietetiqueetintervention@protonmail.com"
			);
		});

		it("should have external links with proper attributes", () => {
			const emailLink = screen.getByRole("link", { name: /Envoyer un email/ });

			// Email links should not have target="_blank" but should be accessible
			expect(emailLink).toBeInTheDocument();
		});
	});

	describe("Responsive Design", () => {
		it("should have responsive container classes", () => {
			const section = screen.getByRole("region");

			expect(section).toHaveClass("py-16", "lg:py-24");
		});

		it("should have responsive text classes", () => {
			const heading = screen.getByRole("heading", { level: 2 });

			expect(heading).toHaveClass("text-3xl", "lg:text-4xl");
		});
	});

	describe("Business Information", () => {
		it("should display business location", () => {
			const nantesText = screen.getAllByText(/Nantes/)[0];

			expect(nantesText).toBeInTheDocument();
		});

		it("should have contact email displayed", () => {
			const email = screen.getAllByText(
				/manonchaillou.dietetiqueetintervention@protonmail.com/
			)[0];

			expect(email).toBeInTheDocument();
		});
	});
});
