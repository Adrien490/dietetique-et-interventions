import { FAQ } from "@/app/(marketing)/components/faq/faq";
import { render, screen } from "@testing-library/react";

// Mock des composants d'animation
jest.mock("@/shared/components/animations", () => ({
	Reveal: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="reveal">{children}</div>
	),
}));

// Mock des composants UI
jest.mock("@/shared/components/ui/accordion", () => ({
	Accordion: ({ children, ...props }: any) => (
		<div data-testid="accordion" {...props}>
			{children}
		</div>
	),
	AccordionContent: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="accordion-content">{children}</div>
	),
	AccordionItem: ({ children, ...props }: any) => (
		<div data-testid="accordion-item" {...props}>
			{children}
		</div>
	),
	AccordionTrigger: ({ children }: { children: React.ReactNode }) => (
		<button data-testid="accordion-trigger">{children}</button>
	),
}));

// Mock Next.js Link
jest.mock("next/link", () => ({
	__esModule: true,
	default: ({ children, href, ...props }: any) => (
		<a href={href} {...props}>
			{children}
		</a>
	),
}));

// Mock des données FAQ
jest.mock("@/app/(marketing)/components/faq/faq-items", () => ({
	FAQ_ITEMS: [
		{
			id: "1",
			question: "Comment se déroule une consultation ?",
			answer: [
				"Une consultation dure environ 1 heure...",
				"Nous discutons de vos objectifs...",
			],
			category: "consultation",
		},
		{
			id: "2",
			question: "Quels sont les tarifs ?",
			answer: [
				"Les tarifs varient selon le type de consultation...",
				"Des forfaits sont disponibles...",
			],
			category: "tarifs",
		},
		{
			id: "3",
			question: "Est-ce remboursé par la mutuelle ?",
			answer: [
				"Certaines mutuelles remboursent...",
				"Il faut vérifier votre contrat...",
			],
			category: "remboursement",
		},
	],
}));

describe("FAQ", () => {
	it("should render FAQ section with proper structure", () => {
		render(<FAQ />);

		const section = screen.getByRole("region");
		expect(section).toBeInTheDocument();
		expect(section).toHaveAttribute("id", "faq");
		expect(section).toHaveAttribute(
			"aria-label",
			"Questions fréquentes sur la diététique et nutrition"
		);
		expect(section).toHaveAttribute("aria-labelledby", "faq-title");
		expect(section).toHaveAttribute("aria-describedby", "faq-description");
	});

	it("should render structured data attributes", () => {
		render(<FAQ />);

		const section = screen.getByRole("region");
		expect(section).toHaveAttribute("itemScope");
		expect(section).toHaveAttribute("itemType", "https://schema.org/FAQPage");
	});

	it("should render SEO metadata", () => {
		render(<FAQ />);

		const section = screen.getByRole("region");
		expect(section).toHaveAttribute(
			"data-voice-queries",
			"comment consulter diététicienne nantes,tarif consultation nutrition,remboursement diététique mutuelle,combien coûte consultation diététique"
		);
		expect(section).toHaveAttribute("data-content-type", "faq-healthcare");
		expect(section).toHaveAttribute(
			"data-ai-category",
			"healthcare-nutrition-faq"
		);
		expect(section).toHaveAttribute("data-location", "Nantes");
	});

	it("should render screen reader description", () => {
		render(<FAQ />);

		const srDescription = screen.getByText(
			/Questions fréquentes sur les consultations de diététique avec Manon Chaillou à Nantes/
		);
		expect(srDescription).toBeInTheDocument();
		expect(srDescription).toHaveClass("sr-only");
	});

	it("should render main title", () => {
		render(<FAQ />);

		const title = screen.getByText("Questions fréquentes - Diététique");
		expect(title).toBeInTheDocument();
	});

	it("should render subtitle description", () => {
		render(<FAQ />);

		const description = screen.getByText(
			/Retrouvez ici les réponses aux questions les plus courantes/
		);
		expect(description).toBeInTheDocument();
	});

	it("should render accordion with FAQ items", () => {
		render(<FAQ />);

		expect(screen.getByTestId("accordion")).toBeInTheDocument();
		expect(screen.getAllByTestId("accordion-item")).toHaveLength(3);
		expect(screen.getAllByTestId("accordion-trigger")).toHaveLength(3);
		expect(screen.getAllByTestId("accordion-content")).toHaveLength(3);
	});

	it("should render FAQ questions", () => {
		render(<FAQ />);

		expect(
			screen.getByText("Comment se déroule une consultation ?")
		).toBeInTheDocument();
		expect(screen.getByText("Quels sont les tarifs ?")).toBeInTheDocument();
		expect(
			screen.getByText("Est-ce remboursé par la mutuelle ?")
		).toBeInTheDocument();
	});

	it("should render FAQ answers", () => {
		render(<FAQ />);

		expect(
			screen.getByText("Une consultation dure environ 1 heure...")
		).toBeInTheDocument();
		expect(
			screen.getByText("Les tarifs varient selon le type de consultation...")
		).toBeInTheDocument();
		expect(
			screen.getByText("Certaines mutuelles remboursent...")
		).toBeInTheDocument();
	});

	it("should use Reveal animation component", () => {
		render(<FAQ />);

		expect(screen.getByTestId("reveal")).toBeInTheDocument();
	});

	it("should have proper container styling", () => {
		render(<FAQ />);

		const section = screen.getByRole("region");
		expect(section).toHaveClass("py-16", "lg:py-24", "bg-muted/50");
	});

	it("should render contact call-to-action", () => {
		render(<FAQ />);

		const contactText = screen.getByText(/Votre question n'est pas listée/);
		expect(contactText).toBeInTheDocument();

		const contactLink = screen.getByRole("link", { name: /Poser ma question/ });
		expect(contactLink).toBeInTheDocument();
		expect(contactLink).toHaveAttribute("href", "#contact");
	});

	it("should have proper accordion attributes", () => {
		render(<FAQ />);

		const accordion = screen.getByTestId("accordion");
		expect(accordion).toHaveAttribute("type", "single");
		// Note: collapsible est géré par Radix UI et peut ne pas apparaître comme attribut
	});

	it("should render FAQ items with proper structure", () => {
		render(<FAQ />);

		const accordionItems = screen.getAllByTestId("accordion-item");

		accordionItems.forEach((item, index) => {
			expect(item).toHaveAttribute("value", `${index + 1}`);
		});
	});

	it("should contain structured data for each FAQ item", () => {
		render(<FAQ />);

		// Vérifier que chaque item a les attributs de données structurées
		const accordionItems = screen.getAllByTestId("accordion-item");
		accordionItems.forEach((item) => {
			expect(item).toHaveAttribute("itemScope");
			expect(item).toHaveAttribute("itemType", "https://schema.org/Question");
		});
	});

	it("should have proper accessibility features", () => {
		render(<FAQ />);

		const section = screen.getByRole("region");
		expect(section).toHaveAttribute("aria-label");
		expect(section).toHaveAttribute("aria-labelledby");
		expect(section).toHaveAttribute("aria-describedby");
	});

	it("should render with proper SEO query patterns", () => {
		render(<FAQ />);

		const section = screen.getByRole("region");
		expect(section).toHaveAttribute(
			"data-query-patterns",
			"combien coûte,comment se déroule,quand consulter,est-ce remboursé"
		);
		expect(section).toHaveAttribute(
			"data-faq-category",
			"healthcare-nutrition"
		);
		expect(section).toHaveAttribute(
			"data-professional-context",
			"dietitian-consultation"
		);
	});
});
