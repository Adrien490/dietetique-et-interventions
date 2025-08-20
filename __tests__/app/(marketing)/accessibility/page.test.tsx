import AccessibilityPage from "@/app/(marketing)/accessibility/page";
import { render, screen } from "@testing-library/react";

describe("AccessibilityPage", () => {
	it("should render accessibility page with title", () => {
		render(<AccessibilityPage />);

		expect(screen.getByText("Déclaration d'accessibilité")).toBeInTheDocument();
	});

	it("should render RGAA compliance information", () => {
		render(<AccessibilityPage />);

		expect(screen.getByText("RGAA 4.1")).toBeInTheDocument();
		expect(screen.getByText("WCAG 2.1 AA")).toBeInTheDocument();
		expect(screen.getByText("Conforme")).toBeInTheDocument();
	});

	it("should render test results", () => {
		render(<AccessibilityPage />);

		expect(screen.getByText("Pa11y")).toBeInTheDocument();
		expect(screen.getByText("Lighthouse")).toBeInTheDocument();
		// Les badges 100/100 sont dans les badges, pas dans le texte
		expect(screen.getByText("Aucun problème détecté")).toBeInTheDocument();
		expect(screen.getByText("Score accessibilité parfait")).toBeInTheDocument();
	});

	it("should render accessibility features", () => {
		render(<AccessibilityPage />);

		// Les fonctionnalités sont dans des listes avec des puces
		expect(
			screen.getByText(/Navigation complète au clavier/)
		).toBeInTheDocument();
		expect(screen.getByText(/Alternatives textuelles/)).toBeInTheDocument();
		expect(
			screen.getByText(/Contrastes conformes WCAG AA/)
		).toBeInTheDocument();
	});

	it("should render recourse information", () => {
		render(<AccessibilityPage />);

		expect(screen.getByText("Voies de recours")).toBeInTheDocument();
		expect(
			screen.getByText(/Si vous rencontrez un problème d'accessibilité/)
		).toBeInTheDocument();
		expect(screen.getByText("Autorité de contrôle")).toBeInTheDocument();
	});

	it("should render contact information", () => {
		render(<AccessibilityPage />);

		expect(screen.getByText("Contact direct")).toBeInTheDocument();
		expect(screen.getByText("Formulaire de contact")).toBeInTheDocument();
	});

	it("should render legal authorities", () => {
		render(<AccessibilityPage />);

		// Les textes sont dans des paragraphes avec des éléments strong
		expect(screen.getAllByText(/Défenseur des droits/).length).toBeGreaterThan(
			0
		);
		expect(screen.getAllByText(/CADA/).length).toBeGreaterThan(0);
	});

	it("should render update date", () => {
		render(<AccessibilityPage />);

		expect(screen.getByText(/Dernière mise à jour/)).toBeInTheDocument();
	});

	it("should have proper heading structure", () => {
		render(<AccessibilityPage />);

		const h1 = screen.getByRole("heading", { level: 1 });
		expect(h1).toHaveTextContent("Déclaration d'accessibilité");

		const h3Elements = screen.getAllByRole("heading", { level: 3 });
		expect(h3Elements.length).toBeGreaterThan(0);
	});

	it("should be accessible", () => {
		render(<AccessibilityPage />);

		// Vérifier que la page est navigable
		expect(screen.getByRole("main")).toBeInTheDocument();

		// Vérifier la structure sémantique
		const headings = screen.getAllByRole("heading");
		expect(headings.length).toBeGreaterThan(0);
	});
});
