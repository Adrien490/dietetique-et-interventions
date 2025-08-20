describe("Loaders Index", () => {
	it("should export all loader components", async () => {
		const loadersModule = await import("@/shared/components/loaders");

		// Check that all loaders are exported
		expect(loadersModule.CircleLoader).toBeDefined();
		expect(loadersModule.DotRingLoader).toBeDefined();
		expect(loadersModule.DotsLoader).toBeDefined();
		expect(loadersModule.GridLoader).toBeDefined();
		expect(loadersModule.MiniDotsLoader).toBeDefined();
		expect(loadersModule.ProgressLoader).toBeDefined();
		expect(loadersModule.PulseLoader).toBeDefined();
		expect(loadersModule.ShimmerLoader).toBeDefined();
		expect(loadersModule.SpinnerLoader).toBeDefined();
		expect(loadersModule.WaveLoader).toBeDefined();
	});

	it("should export valid React components", async () => {
		const { CircleLoader, DotsLoader, SpinnerLoader, PulseLoader } =
			await import("@/shared/components/loaders");

		expect(typeof CircleLoader).toBe("function");
		expect(typeof DotsLoader).toBe("function");
		expect(typeof SpinnerLoader).toBe("function");
		expect(typeof PulseLoader).toBe("function");
	});

	it("should have all loader exports defined", async () => {
		const loadersModule = await import("@/shared/components/loaders");

		const exportedKeys = Object.keys(loadersModule);
		expect(exportedKeys.length).toBe(10);

		// Check that no exports are undefined
		exportedKeys.forEach((key) => {
			expect(loadersModule[key]).toBeDefined();
			expect(typeof loadersModule[key]).toBe("function");
		});
	});

	it("should export loaders with consistent naming", async () => {
		const loadersModule = await import("@/shared/components/loaders");

		const loaderNames = Object.keys(loadersModule);

		// All should end with "Loader"
		loaderNames.forEach((name) => {
			expect(name).toMatch(/Loader$/);
		});
	});
});
