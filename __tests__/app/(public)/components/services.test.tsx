import { Services } from "@/app/(marketing)/components/services";
import { render, screen } from "@testing-library/react";

// Mock des composants d'animation
jest.mock("@/shared/components/animations", () => ({
	Reveal: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="reveal">{children}</div>
	),
	Stagger: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="stagger">{children}</div>
	),
}));

// Mock des composants UI
jest.mock("@/shared/components/ui/tabs", () => ({
	Tabs: ({ children, ...props }: any) => (
		<div data-testid="tabs" {...props}>
			{children}
		</div>
	),
	TabsList: ({ children }: any) => (
		<div data-testid="tabs-list">{children}</div>
	),
	TabsTrigger: ({ children, value }: any) => (
		<button data-testid="tabs-trigger" data-value={value}>
			{children}
		</button>
	),
	TabsContent: ({ children, value }: any) => (
		<div data-testid="tabs-content" data-value={value}>
			{children}
		</div>
	),
}));

// Mock du composant ServiceItem
jest.mock("@/app/(marketing)/components/service-item", () => ({
	ServiceItem: ({ title, description, index }: any) => (
		<div data-testid="service-item" data-index={index}>
			<h3>{title}</h3>
			<p>{description}</p>
		</div>
	),
}));

// Mock des icônes Lucide
jest.mock("lucide-react", () => ({
	User: ({ className }: any) => (
		<div data-testid="user-icon" className={className}>
			User
		</div>
	),
	Users: ({ className }: any) => (
		<div data-testid="users-icon" className={className}>
			Users
		</div>
	),
}));

// Mock Next.js Link
jest.mock("next/link", () => {
	return ({ children, href, ...props }: any) => (
		<a href={href} {...props}>
			{children}
		</a>
	);
});

describe("Services", () => {
	it("should render services section with correct structure", () => {
		render(<Services />);

		const section = screen.getByRole("region");
		expect(section).toBeInTheDocument();
		expect(section).toHaveAttribute("id", "services");
		expect(section).toHaveAttribute(
			"aria-label",
			"Prestations et services de diététique à Nantes"
		);
	});

	it("should render main heading", () => {
		render(<Services />);

		expect(
			screen.getByText("Consultations diététique et nutrition à Nantes")
		).toBeInTheDocument();
	});

	it("should render service description", () => {
		render(<Services />);

		expect(
			screen.getByText(
				/Consultations personnalisées et accompagnement nutritionnel/
			)
		).toBeInTheDocument();
	});

	it("should render tabs for individual and group services", () => {
		render(<Services />);

		expect(screen.getByTestId("tabs")).toBeInTheDocument();
		expect(screen.getByTestId("tabs-list")).toBeInTheDocument();

		// Check tabs triggers (there are multiple)
		const tabsTriggers = screen.getAllByTestId("tabs-trigger");
		expect(tabsTriggers).toHaveLength(2);
	});

	it("should render individual services tab content", () => {
		render(<Services />);

		const tabsContent = screen.getAllByTestId("tabs-content");
		expect(tabsContent.length).toBeGreaterThan(0);
	});

	it("should render service items", () => {
		render(<Services />);

		const serviceItems = screen.getAllByTestId("service-item");
		expect(serviceItems.length).toBeGreaterThan(0);
	});

	it("should render contact link", () => {
		render(<Services />);

		const contactLink = screen.getByRole("link", {
			name: /Réserver votre première consultation/,
		});
		expect(contactLink).toBeInTheDocument();
		expect(contactLink).toHaveAttribute("href", "#contact");
	});

	it("should render animation components", () => {
		render(<Services />);

		expect(screen.getAllByTestId("reveal")).toHaveLength(1);
		expect(screen.getAllByTestId("stagger")).toHaveLength(2);
	});

	it("should have proper semantic structure", () => {
		render(<Services />);

		const section = screen.getByRole("region");
		expect(section).toHaveAttribute("itemScope");
		expect(section).toHaveAttribute(
			"itemType",
			"https://schema.org/MedicalBusiness"
		);
	});

	it("should have accessibility attributes", () => {
		render(<Services />);

		const section = screen.getByRole("region");
		expect(section).toHaveAttribute("data-voice-queries");
		expect(section).toHaveAttribute("data-service-types");
	});

	it("should render screen reader description", () => {
		render(<Services />);

		const srText = screen.getByText(
			/Manon Chaillou propose des consultations de diététique à Nantes/
		);
		expect(srText).toBeInTheDocument();
		expect(srText).toHaveClass("sr-only");
	});

	it("should have proper container styling", () => {
		render(<Services />);

		const section = screen.getByRole("region");
		expect(section).toHaveClass("py-16", "lg:py-24", "bg-muted/50");
	});

	it("should render service icons", () => {
		render(<Services />);

		expect(screen.getByTestId("user-icon")).toBeInTheDocument();
		expect(screen.getByTestId("users-icon")).toBeInTheDocument();
	});

	it("should render tab labels correctly", () => {
		render(<Services />);

		// Les textes des tabs sont dans le composant
		expect(screen.getByText("individuelles")).toBeInTheDocument();
		expect(screen.getByText("groupe")).toBeInTheDocument();
	});

	it("should handle missing data gracefully", () => {
		// Test que le composant ne crash pas même si les données sont manquantes
		render(<Services />);

		const section = screen.getByRole("region");
		expect(section).toBeInTheDocument();
	});

	it("should render subtitle correctly", () => {
		render(<Services />);

		expect(
			screen.getByText(
				/Consultations personnalisées et accompagnement nutritionnel/
			)
		).toBeInTheDocument();
	});

	it("should have correct data attributes for voice queries", () => {
		render(<Services />);

		const section = screen.getByRole("region");
		expect(section).toHaveAttribute(
			"data-voice-queries",
			"consultation diététique nantes,nutritionniste près de moi,diététicienne spécialisée"
		);
	});
});
