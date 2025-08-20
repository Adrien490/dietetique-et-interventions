import { sortOrderSchema, viewTypeSchema } from "@/shared/schemas";

describe("Shared Schemas", () => {
	describe("sortOrderSchema", () => {
		it("should accept 'asc' value", () => {
			const result = sortOrderSchema.parse("asc");
			expect(result).toBe("asc");
		});

		it("should accept 'desc' value", () => {
			const result = sortOrderSchema.parse("desc");
			expect(result).toBe("desc");
		});

		it("should default to 'asc' when no value provided", () => {
			const result = sortOrderSchema.parse(undefined);
			expect(result).toBe("asc");
		});

		it("should reject invalid values", () => {
			expect(() => sortOrderSchema.parse("invalid")).toThrow();
		});

		it("should reject non-string values", () => {
			expect(() => sortOrderSchema.parse(123)).toThrow();
			expect(() => sortOrderSchema.parse({})).toThrow();
			expect(() => sortOrderSchema.parse(null)).toThrow();
		});
	});

	describe("viewTypeSchema", () => {
		it("should accept 'grid' value", () => {
			const result = viewTypeSchema.parse("grid");
			expect(result).toBe("grid");
		});

		it("should accept 'list' value", () => {
			const result = viewTypeSchema.parse("list");
			expect(result).toBe("list");
		});

		it("should default to 'grid' when no value provided", () => {
			const result = viewTypeSchema.parse(undefined);
			expect(result).toBe("grid");
		});

		it("should reject invalid values", () => {
			expect(() => viewTypeSchema.parse("table")).toThrow();
			expect(() => viewTypeSchema.parse("card")).toThrow();
		});

		it("should reject non-string values", () => {
			expect(() => viewTypeSchema.parse(123)).toThrow();
			expect(() => viewTypeSchema.parse({})).toThrow();
			expect(() => viewTypeSchema.parse(null)).toThrow();
		});
	});

	describe("Schema types", () => {
		it("should have correct TypeScript types", () => {
			type SortOrder = ReturnType<typeof sortOrderSchema.parse>;
			type ViewType = ReturnType<typeof viewTypeSchema.parse>;

			const sortOrder: SortOrder = "asc";
			const viewType: ViewType = "grid";

			expect(sortOrder).toBe("asc");
			expect(viewType).toBe("grid");
		});
	});
});
