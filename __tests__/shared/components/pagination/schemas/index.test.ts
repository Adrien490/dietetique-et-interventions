import { paginationSchema, PaginationParams } from "@/shared/components/pagination/schemas";

describe("Pagination Schemas", () => {
	describe("paginationSchema", () => {
		it("should create a valid schema", () => {
			const schema = paginationSchema();
			expect(schema).toBeDefined();
			expect(typeof schema.parse).toBe("function");
		});

		it("should validate correct pagination params", () => {
			const schema = paginationSchema();
			const validParams = {
				page: 1,
				perPage: 10,
			};

			const result = schema.parse(validParams);
			expect(result).toEqual(validParams);
		});

		it("should use default values when not provided", () => {
			const schema = paginationSchema();
			const result = schema.parse({});

			expect(result.page).toBe(1);
			expect(result.perPage).toBe(10);
		});

		it("should validate page minimum value", () => {
			const schema = paginationSchema();
			const invalidParams = {
				page: 0,
				perPage: 10,
			};

			expect(() => schema.parse(invalidParams)).toThrow();
		});

		it("should validate perPage minimum value", () => {
			const schema = paginationSchema();
			const invalidParams = {
				page: 1,
				perPage: 0,
			};

			expect(() => schema.parse(invalidParams)).toThrow();
		});

		it("should validate perPage maximum value", () => {
			const schema = paginationSchema();
			const invalidParams = {
				page: 1,
				perPage: 101,
			};

			expect(() => schema.parse(invalidParams)).toThrow();
		});

		it("should accept valid page values", () => {
			const schema = paginationSchema();
			const validPages = [1, 5, 10, 100];

			validPages.forEach(page => {
				const result = schema.parse({ page, perPage: 10 });
				expect(result.page).toBe(page);
			});
		});

		it("should accept valid perPage values", () => {
			const schema = paginationSchema();
			const validPerPages = [1, 5, 10, 50, 100];

			validPerPages.forEach(perPage => {
				const result = schema.parse({ page: 1, perPage });
				expect(result.perPage).toBe(perPage);
			});
		});

		it("should handle partial params with defaults", () => {
			const schema = paginationSchema();
			
			// Only page provided
			const result1 = schema.parse({ page: 5 });
			expect(result1.page).toBe(5);
			expect(result1.perPage).toBe(10);

			// Only perPage provided
			const result2 = schema.parse({ perPage: 25 });
			expect(result2.page).toBe(1);
			expect(result2.perPage).toBe(25);
		});
	});

	describe("PaginationParams type", () => {
		it("should have correct type structure", () => {
			const params: PaginationParams = {
				page: 1,
				perPage: 10,
			};

			expect(params.page).toBe(1);
			expect(params.perPage).toBe(10);
		});

		it("should accept valid page numbers", () => {
			const validPages: PaginationParams[] = [
				{ page: 1, perPage: 10 },
				{ page: 5, perPage: 20 },
				{ page: 100, perPage: 50 },
			];

			validPages.forEach(params => {
				expect(params.page).toBeGreaterThan(0);
				expect(params.perPage).toBeGreaterThan(0);
				expect(params.perPage).toBeLessThanOrEqual(100);
			});
		});
	});
});

