import { navbarItems } from "@/shared/constants/navbar-items";

describe("navbarItems constants", () => {
	it("should be an array", () => {
		expect(Array.isArray(navbarItems)).toBe(true);
	});

	it("should not be empty", () => {
		expect(navbarItems.length).toBeGreaterThan(0);
	});

	it("should have items with required structure", () => {
		navbarItems.forEach((item) => {
			expect(item).toHaveProperty("href");
			expect(item).toHaveProperty("label");

			// Vérifier les types
			expect(typeof item.href).toBe("string");
			expect(typeof item.label).toBe("string");

			// Vérifier que les champs ne sont pas vides
			expect(item.href.trim()).not.toBe("");
			expect(item.label.trim()).not.toBe("");
		});
	});

	it("should have unique hrefs", () => {
		const hrefs = navbarItems.map((item) => item.href);
		const uniqueHrefs = new Set(hrefs);

		expect(uniqueHrefs.size).toBe(hrefs.length);
	});

	it("should have unique labels", () => {
		const labels = navbarItems.map((item) => item.label);
		const uniqueLabels = new Set(labels);

		expect(uniqueLabels.size).toBe(labels.length);
	});

	it("should have valid hrefs for navigation", () => {
		navbarItems.forEach((item) => {
			// Accept both home page "/" and hash-based navigation
			expect(item.href).toMatch(/^(\/|#|\/#)/);
		});
	});

	it("should have consistent structure", () => {
		const firstItem = navbarItems[0];
		const expectedKeys = Object.keys(firstItem);

		navbarItems.forEach((item) => {
			const itemKeys = Object.keys(item);
			expect(itemKeys.sort()).toEqual(expectedKeys.sort());
		});
	});

	it("should contain expected navigation items", () => {
		const expectedItems = ["about", "services", "faq", "contact"];

		expectedItems.forEach((expectedHref) => {
			const found = navbarItems.some(
				(item) =>
					item.href === `#${expectedHref}` || item.href === `/#${expectedHref}`
			);
			expect(found).toBe(true);
		});
	});

	it("should have meaningful labels", () => {
		navbarItems.forEach((item) => {
			expect(item.label.length).toBeGreaterThanOrEqual(2);
			expect(item.label).toMatch(/^[A-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞ]/); // Should start with capital letter
		});
	});

	it("should be properly typed", () => {
		navbarItems.forEach((item) => {
			expect(item).toMatchObject({
				href: expect.any(String),
				label: expect.any(String),
			});
		});
	});

	it("should have valid href format", () => {
		navbarItems.forEach((item) => {
			// Should be either "/" for home, "#section" or "/#section" for navigation
			expect(item.href).toMatch(/^(\/$|(#|\/#)[a-z-]+)$/);
		});
	});
});
