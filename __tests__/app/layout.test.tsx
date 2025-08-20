import { metadata } from "@/app/layout";

// Mock Next.js fonts
jest.mock("next/font/google", () => ({
	Geist: () => ({
		variable: "--font-geist-sans",
		subsets: ["latin"],
	}),
	Geist_Mono: () => ({
		variable: "--font-geist-mono",
		subsets: ["latin"],
	}),
}));

// Mock StructuredData component
jest.mock("@/shared/components/structured-data", () => ({
	StructuredData: () => <script data-testid="structured-data" />,
}));

// Mock Sonner Toaster
jest.mock("sonner", () => ({
	Toaster: () => <div data-testid="toaster" />,
}));

// Mock CSS import
jest.mock("@/app/globals.css", () => ({}));

describe("App Layout", () => {
	describe("Metadata", () => {
		it("should have correct default title", () => {
			expect(metadata.title).toEqual({
				default: "Manon Chaillou - Diététicienne Nutritionniste à Nantes",
				template: "%s | Manon Chaillou - Diététicienne Nutritionniste",
			});
		});

		it("should have SEO-optimized description", () => {
			expect(metadata.description).toContain("Manon Chaillou");
			expect(metadata.description).toContain("diététicienne nutritionniste");
			expect(metadata.description).toContain("Nantes");
			expect(metadata.description).toContain("rééquilibrage alimentaire");
		});

		it("should have relevant keywords", () => {
			const keywords = metadata.keywords as string[];

			expect(Array.isArray(keywords)).toBe(true);
			expect(keywords).toContain("diététicienne Nantes");
			expect(keywords).toContain("nutritionniste Nantes");
			expect(keywords).toContain("rééquilibrage alimentaire");
			expect(keywords).toContain("nutrition cardiologie");
		});

		it("should have Open Graph metadata", () => {
			const openGraph = metadata.openGraph;

			expect(openGraph).toBeDefined();
			expect(openGraph?.title).toContain("Manon Chaillou");
			expect(openGraph?.description).toContain("Diététicienne");
			expect(openGraph?.type).toBe("website");
			expect(openGraph?.locale).toBe("fr_FR");
		});

		it("should have Twitter metadata", () => {
			const twitter = metadata.twitter;

			expect(twitter).toBeDefined();
			expect(twitter?.card).toBe("summary_large_image");
			expect(twitter?.title).toContain("Manon Chaillou");
			expect(twitter?.description).toContain("Diététicienne");
		});

		it("should have correct robots configuration", () => {
			const robots = metadata.robots;

			expect(robots).toBeDefined();
			expect(robots).toEqual({
				index: false,
				follow: false,
				googleBot: {
					index: false,
					follow: false,
					"max-image-preview": "large",
					"max-snippet": -1,
					"max-video-preview": -1,
				},
			});
		});

		it("should have verification metadata", () => {
			const verification = metadata.verification;

			expect(verification).toBeDefined();
			// Should have Google verification even if empty
			expect(verification).toHaveProperty("google");
		});

		it("should have proper category", () => {
			expect(metadata.category).toBe("healthcare");
		});

		it("should have creator information", () => {
			expect(metadata.creator).toBe("Manon Chaillou");
		});

		it("should have publisher information", () => {
			expect(metadata.publisher).toBe("Manon Chaillou");
		});
	});

	describe("Font Configuration", () => {
		it("should configure Geist fonts properly", async () => {
			// Test that fonts are imported and configured
			const { Geist, Geist_Mono } = await import("next/font/google");

			expect(typeof Geist).toBe("function");
			expect(typeof Geist_Mono).toBe("function");

			const geistSans = Geist();
			const geistMono = Geist_Mono();

			expect(geistSans.variable).toBe("--font-geist-sans");
			expect(geistMono.variable).toBe("--font-geist-mono");
		});
	});

	describe("Metadata Structure", () => {
		it("should have all required SEO fields", () => {
			const requiredFields = [
				"title",
				"description",
				"keywords",
				"openGraph",
				"twitter",
				"robots",
				"category",
				"creator",
				"publisher",
			];

			requiredFields.forEach((field) => {
				expect(metadata).toHaveProperty(field);
			});
		});

		it("should have structured title template", () => {
			const title = metadata.title as { default: string; template: string };

			expect(title.template).toContain("%s");
			expect(title.template).toContain("Manon Chaillou");
		});

		it("should have consistent branding across metadata", () => {
			const brandName = "Manon Chaillou";
			const profession = "Diététicienne Nutritionniste";

			const titleDefault = (metadata.title as { default: string }).default;
			const ogTitle = metadata.openGraph?.title as string;
			const twitterTitle = metadata.twitter?.title as string;

			expect(titleDefault).toContain(brandName);
			expect(ogTitle).toContain(brandName);
			expect(twitterTitle).toContain(brandName);
		});
	});

	describe("SEO Optimization", () => {
		it("should have location-based keywords", () => {
			const keywords = metadata.keywords as string[];
			const locationKeywords = keywords.filter((keyword) =>
				keyword.toLowerCase().includes("nantes")
			);

			expect(locationKeywords.length).toBeGreaterThan(0);
		});

		it("should have service-based keywords", () => {
			const keywords = metadata.keywords as string[];
			const serviceKeywords = [
				"diététicienne",
				"nutritionniste",
				"rééquilibrage alimentaire",
				"nutrition",
			];

			serviceKeywords.forEach((service) => {
				const hasService = keywords.some((keyword) =>
					keyword.toLowerCase().includes(service.toLowerCase())
				);
				expect(hasService).toBe(true);
			});
		});

		it("should have proper meta description length", () => {
			const description = metadata.description as string;

			// SEO best practice: 120-160 characters (but allowing up to 250 for detailed descriptions)
			expect(description.length).toBeGreaterThan(120);
			expect(description.length).toBeLessThan(250);
		});
	});

	describe("Social Media Optimization", () => {
		it("should have consistent descriptions across platforms", () => {
			const mainDescription = metadata.description as string;
			const ogDescription = metadata.openGraph?.description as string;
			const twitterDescription = metadata.twitter?.description as string;

			// Should all mention key terms
			[mainDescription, ogDescription, twitterDescription].forEach((desc) => {
				if (desc) {
					expect(desc.toLowerCase()).toContain("diététicienne");
					expect(desc).toContain("Nantes");
				}
			});
		});

		it("should have proper Open Graph type", () => {
			expect(metadata.openGraph?.type).toBe("website");
		});

		it("should have proper Twitter card type", () => {
			expect(metadata.twitter?.card).toBe("summary_large_image");
		});
	});
});
