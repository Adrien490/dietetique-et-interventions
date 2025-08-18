import { Footer } from "@/app/(marketing)/components/footer";
import { render, screen } from "@testing-library/react";

// Mock lucide-react
jest.mock("lucide-react", () => ({
	Heart: () => <div data-testid="heart-icon">♥</div>,
	Mail: () => <div data-testid="mail-icon">✉</div>,
	MapPin: () => <div data-testid="map-pin-icon">📍</div>,
	ArrowUp: () => <div data-testid="arrow-up-icon">↑</div>,
}));

// Mock Next.js Link
jest.mock("next/link", () => {
	const MockedLink = ({
		children,
		href,
		className,
		...props
	}: {
		children: React.ReactNode;
		href: string;
		className?: string;
		[key: string]: unknown;
	}) => (
		<a data-testid="link" href={href} className={className} {...props}>
			{children}
		</a>
	);
	MockedLink.displayName = "MockedLink";
	return MockedLink;
});

// Mock Tooltip components
jest.mock("@/shared/components/ui/tooltip", () => ({
	Tooltip: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
	TooltipTrigger: ({
		children,
		asChild,
	}: {
		children: React.ReactNode;
		asChild?: boolean;
	}) => (asChild ? children : <div>{children}</div>),
	TooltipContent: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="tooltip-content">{children}</div>
	),
}));

// Mock navbar items
jest.mock("@/shared/constants/navbar-items", () => ({
	navbarItems: [
		{ href: "#services", label: "Services" },
		{ href: "#about", label: "À propos" },
		{ href: "#contact", label: "Contact" },
	],
}));

// Mock environment variables
const originalEnv = process.env;

beforeEach(() => {
	jest.resetModules();
	process.env = {
		...originalEnv,
		NEXT_PUBLIC_EMAIL: "manon@example.com",
	};
});

afterEach(() => {
	process.env = originalEnv;
});

describe("Footer Component", () => {
	it("should render footer with proper semantic structure", () => {
		render(<Footer />);

		const footer = screen.getByRole("contentinfo");
		expect(footer).toBeInTheDocument();
		expect(footer).toHaveAttribute("itemScope");
		expect(footer).toHaveAttribute(
			"itemType",
			"https://schema.org/Organization"
		);
	});

	it("should render brand logo and name", () => {
		render(<Footer />);

		const brandLink = screen.getByRole("link", {
			name: /Manon Chaillou - Diététicienne Nutritionniste - Retour à l'accueil/i,
		});
		expect(brandLink).toBeInTheDocument();
		expect(brandLink).toHaveAttribute("href", "/");

		expect(screen.getByTestId("heart-icon")).toBeInTheDocument();
		expect(screen.getByText("Manon Chaillou")).toBeInTheDocument();
		expect(
			screen.getByText("Diététicienne Nutritionniste à Nantes")
		).toBeInTheDocument();
	});

	it("should render navigation section", () => {
		render(<Footer />);

		const navTitle = screen.getByText("Navigation");
		expect(navTitle).toBeInTheDocument();
		expect(navTitle).toHaveAttribute("id", "footer-nav-title");

		// Check navigation items
		expect(screen.getByRole("link", { name: "Services" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "À propos" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
	});

	it("should render contact information", () => {
		render(<Footer />);

		const contactTitle = screen.getByRole("heading", { name: "Contact" });
		expect(contactTitle).toBeInTheDocument();

		// Email
		const emailLink = screen.getByRole("link", {
			name: /Envoyer un email à Manon Chaillou/i,
		});
		expect(emailLink).toBeInTheDocument();
		expect(emailLink).toHaveAttribute("href", "mailto:manon@example.com");
		expect(screen.getByTestId("mail-icon")).toBeInTheDocument();

		// Location
		expect(screen.getByText("Nantes")).toBeInTheDocument();
		expect(screen.getByText("et environs")).toBeInTheDocument();
		expect(screen.getByTestId("map-pin-icon")).toBeInTheDocument();
	});

	it("should render legal information section", () => {
		render(<Footer />);

		const legalTitle = screen.getByText("Informations légales");
		expect(legalTitle).toBeInTheDocument();
		expect(legalTitle).toHaveAttribute("id", "footer-legal-title");

		// Legal links
		expect(
			screen.getByRole("link", { name: "Mentions légales" })
		).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: "Confidentialité" })
		).toBeInTheDocument();
	});

	it("should render copyright and back to top link", () => {
		render(<Footer />);

		const copyright = screen.getByText(
			"© 2025 Manon Diététique. Tous droits réservés."
		);
		expect(copyright).toBeInTheDocument();

		const backToTopLink = screen.getByRole("link", {
			name: /Retour en haut de la page/i,
		});
		expect(backToTopLink).toBeInTheDocument();
		expect(backToTopLink).toHaveAttribute("href", "#");
		expect(screen.getByTestId("arrow-up-icon")).toBeInTheDocument();
	});

	it("should have proper accessibility attributes", () => {
		render(<Footer />);

		// Screen reader content
		const srText = screen.getByText(/Footer du site de Manon Chaillou/);
		expect(srText).toHaveClass("sr-only");

		// Navigation sections with proper labelling
		const navSection = screen.getByRole("navigation", { name: /Navigation/i });
		expect(navSection).toBeInTheDocument();

		const legalSection = screen.getByRole("navigation", {
			name: /Informations légales/i,
		});
		expect(legalSection).toBeInTheDocument();

		// Lists with proper roles
		const lists = screen.getAllByRole("list");
		expect(lists.length).toBeGreaterThan(0);
	});

	it("should have proper structured data", () => {
		render(<Footer />);

		const footer = screen.getByRole("contentinfo");
		expect(footer).toHaveAttribute("itemScope");
		expect(footer).toHaveAttribute(
			"itemType",
			"https://schema.org/Organization"
		);

		// Contact point structured data
		const contactElement = footer.querySelector('[itemProp="contactPoint"]');
		expect(contactElement).toBeInTheDocument();

		// Area served structured data
		const areaServedElement = footer.querySelector('[itemProp="areaServed"]');
		expect(areaServedElement).toBeInTheDocument();
	});

	it("should handle missing email environment variable", () => {
		process.env.NEXT_PUBLIC_EMAIL = undefined;

		render(<Footer />);

		// Should still render email section even if env var is missing
		const mailIcon = screen.getByTestId("mail-icon");
		expect(mailIcon).toBeInTheDocument();
	});

	it("should have proper focus management", () => {
		render(<Footer />);

		// Navigation links should have focus-visible classes
		const navLinks = screen.getAllByRole("link");
		// Check that at least some links have proper focus management
		const linksWithFocus = navLinks.filter((link) =>
			link.className.includes("focus-visible:outline-none")
		);
		expect(linksWithFocus.length).toBeGreaterThan(0);

		// All links should be accessible
		navLinks.forEach((link) => {
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute("href");
		});
	});

	it("should render data attributes for voice commands and AI", () => {
		render(<Footer />);

		const footer = screen.getByRole("contentinfo");
		expect(footer).toHaveAttribute(
			"data-voice-queries",
			"contact diététicienne nantes,coordonnées nutritionniste,sources nutrition officielles"
		);
		expect(footer).toHaveAttribute("data-content-type", "footer-business");
		expect(footer).toHaveAttribute(
			"data-ai-category",
			"healthcare-nutrition-footer"
		);
	});
});
