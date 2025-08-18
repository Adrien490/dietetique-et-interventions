import { getSidebarNav } from "@/shared/utils/get-sidebar-nav";

// Mock des icônes
jest.mock("lucide-react", () => ({
	BarChart3: () => "BarChart3",
	FileText: () => "FileText",
	MessageCircle: () => "MessageCircle",
}));

describe("getSidebarNav", () => {
	it("should return navigation configuration array", () => {
		const nav = getSidebarNav();

		expect(Array.isArray(nav)).toBe(true);
		expect(nav.length).toBe(3);
	});

	it("should return tableau de bord as first item", () => {
		const nav = getSidebarNav();

		expect(nav[0]).toEqual({
			title: "Tableau de bord",
			url: "/dashboard",
			icon: expect.any(Function),
		});
	});

	it("should return contacts as second item", () => {
		const nav = getSidebarNav();

		expect(nav[1]).toEqual({
			title: "Contacts",
			url: "/dashboard/contacts",
			icon: expect.any(Function),
		});
	});

	it("should return devis as third item", () => {
		const nav = getSidebarNav();

		expect(nav[2]).toEqual({
			title: "Devis",
			url: "/dashboard/quotes",
			icon: expect.any(Function),
		});
	});

	it("should have all items with correct structure", () => {
		const nav = getSidebarNav();

		nav.forEach((item) => {
			expect(item).toHaveProperty("title");
			expect(item).toHaveProperty("url");
			expect(item).toHaveProperty("icon");
			expect(typeof item.title).toBe("string");
			expect(typeof item.url).toBe("string");
			expect(typeof item.icon).toBe("function");
		});
	});

	it("should have correct URL structure", () => {
		const nav = getSidebarNav();

		nav.forEach((item) => {
			expect(item.url).toMatch(/^\/dashboard/);
		});
	});

	it("should return consistent results", () => {
		const nav1 = getSidebarNav();
		const nav2 = getSidebarNav();

		expect(nav1).toEqual(nav2);
	});

	it("should have correct icons", () => {
		const nav = getSidebarNav();

		// Tableau de bord should use BarChart3
		expect(nav[0].icon.name).toBe("BarChart3");

		// Contacts should use MessageCircle
		expect(nav[1].icon.name).toBe("MessageCircle");

		// Devis should use FileText
		expect(nav[2].icon.name).toBe("FileText");
	});
});
