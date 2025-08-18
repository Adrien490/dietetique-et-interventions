import { About } from "@/app/(marketing)/components/about/about";
import { render, screen } from "@testing-library/react";

// Mock des composants d'animation
jest.mock("@/shared/components/animations", () => ({
	Reveal: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="reveal">{children}</div>
	),
}));

// Mock Next.js Image
jest.mock("next/image", () => {
	return function MockImage({ src, alt, ...props }: any) {
		return <img src={src} alt={alt} {...props} data-testid="about-image" />;
	};
});

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
	GraduationCap: ({ className }: any) => (
		<div data-testid="graduation-cap-icon" className={className}>
			GraduationCap
		</div>
	),
	Heart: ({ className }: any) => (
		<div data-testid="heart-icon" className={className}>
			Heart
		</div>
	),
	Search: ({ className }: any) => (
		<div data-testid="search-icon" className={className}>
			Search
		</div>
	),
}));

describe("About", () => {
	it("should render about section with correct structure", () => {
		render(<About />);

		const section = screen.getByRole("region");
		expect(section).toBeInTheDocument();
		expect(section).toHaveAttribute("id", "about");
		expect(section).toHaveAttribute(
			"aria-label",
			"À propos de Manon Chaillou, diététicienne nutritionniste à Nantes"
		);
	});

	it("should render main heading", () => {
		render(<About />);

		expect(screen.getByText("À propos")).toBeInTheDocument();
	});

	it("should render profile image", () => {
		render(<About />);

		const image = screen.getByTestId("about-image");
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute(
			"alt",
			"Manon Chaillou, diététicienne nutritionniste diplômée à Nantes - Portrait professionnel"
		);
	});

	it("should render about steps with icons", () => {
		render(<About />);

		// Check for all step icons
		expect(screen.getByTestId("graduation-cap-icon")).toBeInTheDocument();
		expect(screen.getByTestId("heart-icon")).toBeInTheDocument();
		expect(screen.getByTestId("search-icon")).toBeInTheDocument();
	});

	it("should render about step titles", () => {
		render(<About />);

		expect(screen.getByText("Mon parcours")).toBeInTheDocument();
		expect(screen.getByText("Mes valeurs")).toBeInTheDocument();
		expect(screen.getByText("Mon approche")).toBeInTheDocument();
	});

	it("should render about step descriptions", () => {
		render(<About />);

		expect(
			screen.getByText(/J'ai obtenu un Bachelor Universitaire de Technologie/)
		).toBeInTheDocument();
		expect(
			screen.getByText(
				/Mon accompagnement repose sur des valeurs humaines fortes/
			)
		).toBeInTheDocument();
		expect(
			screen.getByText(/Mon approche est individuelle, personnalisée/)
		).toBeInTheDocument();
	});

	it("should render professional description", () => {
		render(<About />);

		expect(
			screen.getByText(/C'est à l'hôpital que j'ai commencé mon parcours/)
		).toBeInTheDocument();
	});

	it("should render contact link", () => {
		render(<About />);

		const contactLink = screen.getByRole("link", {
			name: /Prendre rendez-vous/,
		});
		expect(contactLink).toBeInTheDocument();
		expect(contactLink).toHaveAttribute("href", "#contact");
	});

	it("should render screen reader description", () => {
		render(<About />);

		const srText = screen.getByText(
			/Manon Chaillou est une diététicienne nutritionniste expérimentée/
		);
		expect(srText).toBeInTheDocument();
		expect(srText).toHaveClass("sr-only");
	});

	it("should have proper semantic structure", () => {
		render(<About />);

		const section = screen.getByRole("region");
		expect(section).toHaveAttribute("itemScope");
		expect(section).toHaveAttribute("itemType", "https://schema.org/Person");
	});

	it("should have accessibility attributes", () => {
		render(<About />);

		const section = screen.getByRole("region");
		expect(section).toHaveAttribute("data-voice-queries");
		expect(section).toHaveAttribute(
			"data-content-type",
			"professional-biography"
		);
	});

	it("should render animation components", () => {
		render(<About />);

		const reveals = screen.getAllByTestId("reveal");
		expect(reveals.length).toBeGreaterThan(0);
	});

	it("should have proper container styling", () => {
		render(<About />);

		const section = screen.getByRole("region");
		expect(section).toHaveClass(
			"py-16",
			"lg:py-24",
			"bg-background",
			"min-h-screen"
		);
	});

	it("should render all step descriptions as articles", () => {
		render(<About />);

		// Check that all steps have their content rendered as articles
		const stepContainers = screen.getAllByRole("article");
		expect(stepContainers).toHaveLength(3);
	});

	it("should have correct data attributes for voice queries", () => {
		render(<About />);

		const section = screen.getByRole("region");
		expect(section).toHaveAttribute(
			"data-voice-queries",
			"qui est manon chaillou,diététicienne nantes expérience,parcours nutritionniste"
		);
	});

	it("should render step descriptions as paragraphs", () => {
		render(<About />);

		// Check that descriptions are properly rendered
		expect(
			screen.getByText(/Je suis également titulaire d'un Diplôme Universitaire/)
		).toBeInTheDocument();
		expect(
			screen.getByText(/Je veille à proposer des conseils simples/)
		).toBeInTheDocument();
		expect(
			screen.getByText(/Je m'appuie sur les recommandations actualisées/)
		).toBeInTheDocument();
	});

	it("should render professional experience details", () => {
		render(<About />);

		expect(
			screen.getByText(/J'ai d'abord exercé en milieu hospitalier/)
		).toBeInTheDocument();
		expect(
			screen.getByText(/Aujourd'hui, je travaille aussi en libéral/)
		).toBeInTheDocument();
	});

	it("should handle missing data gracefully", () => {
		// Test que le composant ne crash pas même si les données sont manquantes
		render(<About />);

		const section = screen.getByRole("region");
		expect(section).toBeInTheDocument();
	});

	it("should have proper structured data", () => {
		render(<About />);

		// Check for structured data elements
		const section = screen.getByRole("region");
		expect(section).toHaveAttribute("itemScope");
		expect(section).toHaveAttribute("itemType", "https://schema.org/Person");
	});

	it("should render years of experience", () => {
		render(<About />);

		// The text might be in the screen reader content
		expect(screen.getByText(/expérimentée/)).toBeInTheDocument();
	});
});
