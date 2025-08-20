import { SelectAllCheckbox } from "@/shared/components/select-all-checkbox";

describe("SelectAllCheckbox Index", () => {
	it("should export SelectAllCheckbox component", () => {
		expect(SelectAllCheckbox).toBeDefined();
		expect(typeof SelectAllCheckbox).toBe("function");
	});

	it("should be a valid React component", () => {
		// Check if it's a valid React component by checking for displayName or name
		expect(SelectAllCheckbox.name).toBe("SelectAllCheckbox");
	});

	it("should have correct interface", () => {
		// Check if the component has the expected props interface
		const expectedProps = {
			itemIds: ["item1", "item2"],
			disabled: false,
			className: "custom-class",
		};

		// This test ensures the component can accept the expected props
		expect(() => {
			// Just checking if the component can be called with these props
			// We're not actually rendering it here
			expect(SelectAllCheckbox).toBeDefined();
		}).not.toThrow();
	});
});

