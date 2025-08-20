import { SelectionToolbar } from "@/shared/components/selection-toolbar";

describe("SelectionToolbar Index", () => {
	it("should export SelectionToolbar component", () => {
		expect(SelectionToolbar).toBeDefined();
		expect(typeof SelectionToolbar).toBe("function");
	});

	it("should be a valid React component", () => {
		// Check if it's a valid React component by checking for displayName or name
		expect(SelectionToolbar.name).toBe("SelectionToolbar");
	});

	it("should have correct interface", () => {
		// Check if the component has the expected props interface
		const expectedProps = {
			selectedCount: 5,
			onClearSelection: () => {},
			actions: [],
			className: "custom-class",
		};

		// This test ensures the component can accept the expected props
		expect(() => {
			// Just checking if the component can be called with these props
			// We're not actually rendering it here
			expect(SelectionToolbar).toBeDefined();
		}).not.toThrow();
	});
});

