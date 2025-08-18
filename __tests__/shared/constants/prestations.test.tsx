import { PRESTATIONS } from "@/shared/constants/prestations";

describe("PRESTATIONS constants", () => {
	it("should be an array", () => {
		expect(Array.isArray(PRESTATIONS)).toBe(true);
	});

	it("should not be empty", () => {
		expect(PRESTATIONS.length).toBeGreaterThan(0);
	});

	it("should have items with required fields", () => {
		PRESTATIONS.forEach((prestation, index) => {
			expect(prestation).toHaveProperty("title");
			expect(prestation).toHaveProperty("description");
			expect(prestation).toHaveProperty("icon");

			// Vérifier les types
			expect(typeof prestation.title).toBe("string");
			expect(typeof prestation.description).toBe("string");

			// Vérifier que les champs ne sont pas vides
			expect(prestation.title.trim()).not.toBe("");
			expect(prestation.description.trim()).not.toBe("");
		});
	});

	it("should have unique titles", () => {
		const titles = PRESTATIONS.map((prestation) => prestation.title);
		const uniqueTitles = new Set(titles);

		expect(uniqueTitles.size).toBe(titles.length);
	});

	it("should have meaningful descriptions", () => {
		PRESTATIONS.forEach((prestation) => {
			// Description doit faire au moins 10 caractères
			expect(prestation.description.length).toBeGreaterThanOrEqual(10);
		});
	});

	it("should have consistent structure across all items", () => {
		const firstItem = PRESTATIONS[0];
		const expectedKeys = Object.keys(firstItem);

		PRESTATIONS.forEach((prestation) => {
			const itemKeys = Object.keys(prestation);
			expect(itemKeys.sort()).toEqual(expectedKeys.sort());
		});
	});

	it("should have meaningful descriptions", () => {
		PRESTATIONS.forEach((prestation) => {
			// Description doit faire au moins 10 caractères
			expect(prestation.description.length).toBeGreaterThanOrEqual(10);
		});
	});

	it("should have meaningful titles", () => {
		PRESTATIONS.forEach((prestation) => {
			// Titre doit faire au moins 3 caractères
			expect(prestation.title.length).toBeGreaterThanOrEqual(3);
		});
	});

	it("should be properly typed", () => {
		PRESTATIONS.forEach((prestation) => {
			expect(prestation).toMatchObject({
				title: expect.any(String),
				description: expect.any(String),
			});
		});
	});
});
