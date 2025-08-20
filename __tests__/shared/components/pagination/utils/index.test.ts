import { getPaginationItems } from "@/shared/components/pagination/utils";

describe("Pagination Utils Index", () => {
	it("should export getPaginationItems function", () => {
		expect(getPaginationItems).toBeDefined();
		expect(typeof getPaginationItems).toBe("function");
	});

	it("should return correct pagination items for small page count", () => {
		const result = getPaginationItems(3, 1);
		
		expect(result).toEqual([
			{ type: "page", value: 1 },
			{ type: "page", value: 2 },
			{ type: "page", value: 3 },
		]);
	});

	it("should return correct pagination items for large page count", () => {
		const result = getPaginationItems(10, 5);
		
		expect(result).toEqual([
			{ type: "page", value: 1 },
			{ type: "dots", value: "...", id: "dots1" },
			{ type: "page", value: 4 },
			{ type: "page", value: 5 },
			{ type: "page", value: 6 },
			{ type: "dots", value: "...", id: "dots2" },
			{ type: "page", value: 10 },
		]);
	});

	it("should handle edge cases", () => {
		// Single page
		expect(getPaginationItems(1, 1)).toEqual([
			{ type: "page", value: 1 },
		]);

		// Two pages
		expect(getPaginationItems(2, 1)).toEqual([
			{ type: "page", value: 1 },
			{ type: "page", value: 2 },
		]);
	});
});

