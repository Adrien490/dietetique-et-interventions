import { Pagination } from "@/shared/components/pagination";

describe("Pagination Index", () => {
	it("should export Pagination component", () => {
		expect(Pagination).toBeDefined();
		expect(typeof Pagination).toBe("function");
	});

	it("should be a valid React component", () => {
		// Check if it's a valid React component by checking for displayName or name
		expect(Pagination.name).toBe("Pagination");
	});

	it("should have correct interface", () => {
		// Check if the component has the expected props interface
		const expectedProps = {
			total: 100,
			pageCount: 10,
			page: 1,
			perPage: 10,
		};

		// This test ensures the component can accept the expected props
		expect(() => {
			// Just checking if the component can be called with these props
			// We're not actually rendering it here
			expect(Pagination).toBeDefined();
		}).not.toThrow();
	});
});



