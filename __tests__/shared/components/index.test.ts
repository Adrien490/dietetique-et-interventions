describe("Shared Components Index", () => {
	it("should export UI components", async () => {
		const componentsModule = await import("@/shared/components");

		// UI Components
		expect(componentsModule.Badge).toBeDefined();
		expect(componentsModule.Button).toBeDefined();
		expect(componentsModule.Form).toBeDefined();
		expect(componentsModule.Label).toBeDefined();
		expect(componentsModule.Separator).toBeDefined();
		expect(componentsModule.Sheet).toBeDefined();
	});

	it("should export custom components", async () => {
		const componentsModule = await import("@/shared/components");

		// Custom Components
		expect(componentsModule.CheckboxFilter).toBeDefined();
		expect(componentsModule.ClearFiltersButton).toBeDefined();
		expect(componentsModule.PageContainer).toBeDefined();
		expect(componentsModule.PageHeader).toBeDefined();
		expect(componentsModule.SearchForm).toBeDefined();
		expect(componentsModule.Toolbar).toBeDefined();
		expect(componentsModule.SortingOptionsDropdown).toBeDefined();
	});

	it("should export valid React components", async () => {
		const { Button, Badge, PageContainer } = await import(
			"@/shared/components"
		);

		expect(typeof Button).toBe("function");
		expect(typeof Badge).toBe("function");
		expect(typeof PageContainer).toBe("function");
	});

	it("should have all exports defined", async () => {
		const componentsModule = await import("@/shared/components");

		const exportedKeys = Object.keys(componentsModule);
		expect(exportedKeys.length).toBeGreaterThan(10);

		// Check that no exports are undefined
		exportedKeys.forEach((key) => {
			expect(componentsModule[key]).toBeDefined();
		});
	});
});
