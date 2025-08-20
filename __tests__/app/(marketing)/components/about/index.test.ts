describe("About Index", () => {
	it("should export About component", async () => {
		const aboutModule = await import("@/app/(marketing)/components/about");

		expect(aboutModule).toBeDefined();
		expect(aboutModule.About).toBeDefined();
		expect(typeof aboutModule.About).toBe("function");
	});

	it("should export from about module", async () => {
		const aboutModule = await import("@/app/(marketing)/components/about");

		expect(aboutModule).toBeDefined();
		expect(Object.keys(aboutModule).length).toBeGreaterThan(0);
	});

	it("should be valid React component exports", async () => {
		const { About } = await import("@/app/(marketing)/components/about");

		// Should be functions (React components)
		expect(typeof About).toBe("function");

		// Should have displayName or name property
		expect(About.name || About.displayName).toBeTruthy();
	});

	it("should export all expected members", async () => {
		const aboutModule = await import("@/app/(marketing)/components/about");

		// Should export the About component
		expect("About" in aboutModule).toBe(true);
	});
});
