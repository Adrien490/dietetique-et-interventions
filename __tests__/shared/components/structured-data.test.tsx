import { StructuredData } from "@/shared/components/structured-data";
import { render } from "@testing-library/react";

// Mock Next.js Script component
jest.mock("next/script", () => {
	return function MockScript({
		id,
		type,
		dangerouslySetInnerHTML,
		...props
	}: any) {
		return (
			<script
				id={id}
				type={type}
				data-testid="structured-data-script"
				dangerouslySetInnerHTML={dangerouslySetInnerHTML}
				{...props}
			/>
		);
	};
});

// Mock environment variables
const originalEnv = process.env;

describe("StructuredData", () => {
	beforeEach(() => {
		process.env = {
			...originalEnv,
			NEXT_PUBLIC_URL: "https://test-manon-dietetique.fr",
			NEXT_PUBLIC_PHONE: "+33123456789",
			NEXT_PUBLIC_EMAIL: "test@manon-dietetique.fr",
		};
	});

	afterEach(() => {
		process.env = originalEnv;
	});

	it("should render structured data script", () => {
		const { container } = render(<StructuredData />);

		const script = container.querySelector(
			'[data-testid="structured-data-script"]'
		);
		expect(script).toBeInTheDocument();
		expect(script).toHaveAttribute("id", "structured-data");
		expect(script).toHaveAttribute("type", "application/ld+json");
	});

	it("should contain valid JSON-LD structured data", () => {
		const { container } = render(<StructuredData />);

		const script = container.querySelector(
			'[data-testid="structured-data-script"]'
		);
		const jsonContent = script?.innerHTML;

		expect(jsonContent).toBeDefined();

		// Parse JSON to ensure it's valid
		let parsedData;
		expect(() => {
			parsedData = JSON.parse(jsonContent!);
		}).not.toThrow();

		expect(parsedData).toBeDefined();
	});

	it("should include correct schema.org context and types", () => {
		const { container } = render(<StructuredData />);

		const script = container.querySelector(
			'[data-testid="structured-data-script"]'
		);
		const jsonContent = script?.innerHTML;
		const parsedData = JSON.parse(jsonContent!);

		expect(parsedData["@context"]).toBe("https://schema.org");
		expect(parsedData["@type"]).toEqual([
			"MedicalBusiness",
			"Dietitian",
			"LocalBusiness",
		]);
		expect(parsedData["@id"]).toBe("https://manon-dietetique.fr");
	});

	it("should include business information", () => {
		const { container } = render(<StructuredData />);

		const script = container.querySelector(
			'[data-testid="structured-data-script"]'
		);
		const jsonContent = script?.innerHTML;
		const parsedData = JSON.parse(jsonContent!);

		expect(parsedData.name).toBe(
			"Manon Chaillou - Diététicienne Nutritionniste"
		);
		expect(parsedData.alternateName).toBe("Manon Chaillou Diététicienne");
		expect(parsedData.description).toContain(
			"Diététicienne nutritionniste diplômée à Nantes"
		);
		expect(parsedData.url).toBe(process.env.NEXT_PUBLIC_URL);
		expect(parsedData.telephone).toBe(process.env.NEXT_PUBLIC_PHONE);
		expect(parsedData.email).toBe(process.env.NEXT_PUBLIC_EMAIL);
	});

	it("should include address information", () => {
		const { container } = render(<StructuredData />);

		const script = container.querySelector(
			'[data-testid="structured-data-script"]'
		);
		const jsonContent = script?.innerHTML;
		const parsedData = JSON.parse(jsonContent!);

		expect(parsedData.address).toEqual({
			"@type": "PostalAddress",
			streetAddress: "15 Rue de la Paix",
			addressLocality: "Nantes",
			addressRegion: "Loire-Atlantique",
			postalCode: "44000",
			addressCountry: "FR",
		});
	});

	it("should include geo coordinates", () => {
		const { container } = render(<StructuredData />);

		const script = container.querySelector(
			'[data-testid="structured-data-script"]'
		);
		const jsonContent = script?.innerHTML;
		const parsedData = JSON.parse(jsonContent!);

		expect(parsedData.geo).toEqual({
			"@type": "GeoCoordinates",
			latitude: 47.2184,
			longitude: -1.5536,
		});
	});

	it("should include opening hours", () => {
		const { container } = render(<StructuredData />);

		const script = container.querySelector(
			'[data-testid="structured-data-script"]'
		);
		const jsonContent = script?.innerHTML;
		const parsedData = JSON.parse(jsonContent!);

		expect(parsedData.openingHoursSpecification).toHaveLength(2);
		expect(parsedData.openingHoursSpecification[0]).toEqual({
			"@type": "OpeningHoursSpecification",
			dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
			opens: "09:00",
			closes: "18:00",
		});
		expect(parsedData.openingHoursSpecification[1]).toEqual({
			"@type": "OpeningHoursSpecification",
			dayOfWeek: "Saturday",
			opens: "09:00",
			closes: "13:00",
		});
	});

	it("should include founder information", () => {
		const { container } = render(<StructuredData />);

		const script = container.querySelector(
			'[data-testid="structured-data-script"]'
		);
		const jsonContent = script?.innerHTML;
		const parsedData = JSON.parse(jsonContent!);

		expect(parsedData.founder["@type"]).toBe("Person");
		expect(parsedData.founder.name).toBe("Manon Chaillou");
		expect(parsedData.founder.jobTitle).toBe("Diététicienne Nutritionniste");
		expect(parsedData.founder.hasCredential).toHaveLength(2);
		expect(parsedData.founder.knowsAbout).toContain(
			"Rééquilibrage alimentaire"
		);
		expect(parsedData.founder.knowsAbout).toContain("Nutrition cardiologie");
	});

	it("should include served areas", () => {
		const { container } = render(<StructuredData />);

		const script = container.querySelector(
			'[data-testid="structured-data-script"]'
		);
		const jsonContent = script?.innerHTML;
		const parsedData = JSON.parse(jsonContent!);

		expect(parsedData.areaServed).toHaveLength(7);
		expect(parsedData.areaServed[0].name).toBe("Nantes");
		expect(parsedData.areaServed).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ name: "Nantes" }),
				expect.objectContaining({ name: "Rezé" }),
				expect.objectContaining({ name: "Saint-Herblain" }),
			])
		);
	});

	it("should include offer catalog", () => {
		const { container } = render(<StructuredData />);

		const script = container.querySelector(
			'[data-testid="structured-data-script"]'
		);
		const jsonContent = script?.innerHTML;
		const parsedData = JSON.parse(jsonContent!);

		expect(parsedData.hasOfferCatalog["@type"]).toBe("OfferCatalog");
		expect(parsedData.hasOfferCatalog.itemListElement).toHaveLength(4);

		const offers = parsedData.hasOfferCatalog.itemListElement;
		expect(offers[0].itemOffered.name).toBe(
			"Consultation Diététique Individuelle"
		);
		expect(offers[1].itemOffered.name).toBe("Nutrition Cardiologie");
		expect(offers[2].itemOffered.name).toBe("Accompagnement Obésité");
		expect(offers[3].itemOffered.name).toBe("Ateliers Collectifs de Nutrition");
	});

	it("should include image and logo", () => {
		const { container } = render(<StructuredData />);

		const script = container.querySelector(
			'[data-testid="structured-data-script"]'
		);
		const jsonContent = script?.innerHTML;
		const parsedData = JSON.parse(jsonContent!);

		expect(parsedData.image).toEqual({
			"@type": "ImageObject",
			url: "https://manon-dietetique.fr/manon.png",
			height: 630,
			width: 1200,
		});

		expect(parsedData.logo).toEqual({
			"@type": "ImageObject",
			url: "https://manon-dietetique.fr/manon.png",
			height: 630,
			width: 1200,
		});
	});

	it("should include medical and business metadata", () => {
		const { container } = render(<StructuredData />);

		const script = container.querySelector(
			'[data-testid="structured-data-script"]'
		);
		const jsonContent = script?.innerHTML;
		const parsedData = JSON.parse(jsonContent!);

		expect(parsedData.priceRange).toBe("€€");
		expect(parsedData.paymentAccepted).toEqual([
			"Cash",
			"Credit Card",
			"Bank Transfer",
		]);
		expect(parsedData.currenciesAccepted).toBe("EUR");
		expect(parsedData.medicalSpecialty).toBe("Nutrition");
		expect(parsedData.acceptsHealthInsurance).toBe(true);
		expect(parsedData.foundingDate).toBe("2020");
	});

	it("should include ADELI identifier", () => {
		const { container } = render(<StructuredData />);

		const script = container.querySelector(
			'[data-testid="structured-data-script"]'
		);
		const jsonContent = script?.innerHTML;
		const parsedData = JSON.parse(jsonContent!);

		expect(parsedData.identifier).toEqual({
			"@type": "PropertyValue",
			name: "ADELI",
			value: "449901234",
		});
	});

	it("should handle missing environment variables gracefully", () => {
		// Remove environment variables
		delete process.env.NEXT_PUBLIC_URL;
		delete process.env.NEXT_PUBLIC_PHONE;
		delete process.env.NEXT_PUBLIC_EMAIL;

		const { container } = render(<StructuredData />);

		const script = container.querySelector(
			'[data-testid="structured-data-script"]'
		);
		const jsonContent = script?.innerHTML;
		const parsedData = JSON.parse(jsonContent!);

		expect(parsedData.url).toBeUndefined();
		expect(parsedData.telephone).toBeUndefined();
		expect(parsedData.email).toBeUndefined();

		// Other properties should still be present
		expect(parsedData.name).toBe(
			"Manon Chaillou - Diététicienne Nutritionniste"
		);
	});

	it("should produce valid JSON without syntax errors", () => {
		const { container } = render(<StructuredData />);

		const script = container.querySelector(
			'[data-testid="structured-data-script"]'
		);
		const jsonContent = script?.innerHTML;

		// Should not contain any undefined values in the JSON string
		expect(jsonContent).not.toContain("undefined");

		// Should be properly formatted JSON
		expect(() => JSON.parse(jsonContent!)).not.toThrow();
	});
});
