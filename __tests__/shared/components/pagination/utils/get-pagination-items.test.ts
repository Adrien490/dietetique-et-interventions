import { getPaginationItems } from "@/shared/components/pagination/utils/get-pagination-items";

describe("getPaginationItems", () => {
	it("should return all pages for small page count (≤5)", () => {
		const result = getPaginationItems(3, 1);
		
		expect(result).toEqual([
			{ type: "page", value: 1 },
			{ type: "page", value: 2 },
			{ type: "page", value: 3 },
		]);
	});

	it("should handle page count of 5", () => {
		const result = getPaginationItems(5, 3);
		
		expect(result).toEqual([
			{ type: "page", value: 1 },
			{ type: "page", value: 2 },
			{ type: "page", value: 3 },
			{ type: "page", value: 4 },
			{ type: "page", value: 5 },
		]);
	});

	it("should handle page near beginning (page ≤ 3)", () => {
		const result = getPaginationItems(10, 2);
		
		expect(result).toEqual([
			{ type: "page", value: 1 },
			{ type: "page", value: 2 },
			{ type: "page", value: 3 },
			{ type: "page", value: 4 },
			{ type: "dots", value: "...", id: "dots1" },
			{ type: "page", value: 10 },
		]);
	});

	it("should handle first page with large page count", () => {
		const result = getPaginationItems(20, 1);
		
		expect(result).toEqual([
			{ type: "page", value: 1 },
			{ type: "page", value: 2 },
			{ type: "page", value: 3 },
			{ type: "page", value: 4 },
			{ type: "dots", value: "...", id: "dots1" },
			{ type: "page", value: 20 },
		]);
	});

	it("should handle page near end (page ≥ pageCount - 3)", () => {
		const result = getPaginationItems(10, 8);
		
		expect(result).toEqual([
			{ type: "page", value: 1 },
			{ type: "dots", value: "...", id: "dots1" },
			{ type: "page", value: 7 },
			{ type: "page", value: 8 },
			{ type: "page", value: 9 },
			{ type: "page", value: 10 },
		]);
	});

	it("should handle last page with large page count", () => {
		const result = getPaginationItems(20, 20);
		
		expect(result).toEqual([
			{ type: "page", value: 1 },
			{ type: "dots", value: "...", id: "dots1" },
			{ type: "page", value: 17 },
			{ type: "page", value: 18 },
			{ type: "page", value: 19 },
			{ type: "page", value: 20 },
		]);
	});

	it("should handle page in middle", () => {
		const result = getPaginationItems(20, 10);
		
		expect(result).toEqual([
			{ type: "page", value: 1 },
			{ type: "dots", value: "...", id: "dots1" },
			{ type: "page", value: 9 },
			{ type: "page", value: 10 },
			{ type: "page", value: 11 },
			{ type: "dots", value: "...", id: "dots2" },
			{ type: "page", value: 20 },
		]);
	});

	it("should handle page in middle with boundary conditions", () => {
		const result = getPaginationItems(20, 2);
		
		expect(result).toEqual([
			{ type: "page", value: 1 },
			{ type: "page", value: 2 },
			{ type: "page", value: 3 },
			{ type: "page", value: 4 },
			{ type: "dots", value: "...", id: "dots1" },
			{ type: "page", value: 20 },
		]);
	});

	it("should handle page in middle near end", () => {
		const result = getPaginationItems(20, 18);
		
		expect(result).toEqual([
			{ type: "page", value: 1 },
			{ type: "dots", value: "...", id: "dots1" },
			{ type: "page", value: 17 },
			{ type: "page", value: 18 },
			{ type: "page", value: 19 },
			{ type: "page", value: 20 },
		]);
	});

	it("should handle edge case with page count of 6", () => {
		const result = getPaginationItems(6, 3);
		
		expect(result).toEqual([
			{ type: "page", value: 1 },
			{ type: "page", value: 2 },
			{ type: "page", value: 3 },
			{ type: "page", value: 4 },
			{ type: "dots", value: "...", id: "dots1" },
			{ type: "page", value: 6 },
		]);
	});

	it("should handle edge case with page count of 6 and page 5", () => {
		const result = getPaginationItems(6, 5);
		
		expect(result).toEqual([
			{ type: "page", value: 1 },
			{ type: "dots", value: "...", id: "dots1" },
			{ type: "page", value: 3 },
			{ type: "page", value: 4 },
			{ type: "page", value: 5 },
			{ type: "page", value: 6 },
		]);
	});

	it("should handle very large page count", () => {
		const result = getPaginationItems(100, 50);
		
		expect(result).toEqual([
			{ type: "page", value: 1 },
			{ type: "dots", value: "...", id: "dots1" },
			{ type: "page", value: 49 },
			{ type: "page", value: 50 },
			{ type: "page", value: 51 },
			{ type: "dots", value: "...", id: "dots2" },
			{ type: "page", value: 100 },
		]);
	});

	it("should handle page count of 1", () => {
		const result = getPaginationItems(1, 1);
		
		expect(result).toEqual([
			{ type: "page", value: 1 },
		]);
	});

	it("should handle page count of 2", () => {
		const result = getPaginationItems(2, 1);
		
		expect(result).toEqual([
			{ type: "page", value: 1 },
			{ type: "page", value: 2 },
		]);
	});

	it("should handle page count of 4", () => {
		const result = getPaginationItems(4, 2);
		
		expect(result).toEqual([
			{ type: "page", value: 1 },
			{ type: "page", value: 2 },
			{ type: "page", value: 3 },
			{ type: "page", value: 4 },
		]);
	});

	it("should handle page count of 5 with page 5", () => {
		const result = getPaginationItems(5, 5);
		
		expect(result).toEqual([
			{ type: "page", value: 1 },
			{ type: "page", value: 2 },
			{ type: "page", value: 3 },
			{ type: "page", value: 4 },
			{ type: "page", value: 5 },
		]);
	});
});

