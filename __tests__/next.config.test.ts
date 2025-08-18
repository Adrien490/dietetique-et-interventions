import nextConfig from "@/next.config";

describe("next.config.ts", () => {
	it("should export next config", () => {
		expect(nextConfig).toBeDefined();
		expect(typeof nextConfig).toBe("object");
	});

	it("should have experimental features configured", () => {
		expect(nextConfig.experimental).toBeDefined();
	});
});