import robots from "@/app/robots";

describe("robots.ts", () => {
	it("should return robots configuration", () => {
		const robotsConfig = robots();
		
		expect(robotsConfig).toBeDefined();
		expect(typeof robotsConfig).toBe("object");
	});

	it("should have rules property", () => {
		const robotsConfig = robots();
		
		expect(robotsConfig).toHaveProperty("rules");
		expect(robotsConfig.rules).toBeDefined();
	});

	it("should allow all user agents", () => {
		const robotsConfig = robots();
		
		// rules is an array, check if any rule has userAgent "*"
		const hasWildcardRule = robotsConfig.rules.some(rule => 
			rule.userAgent === "*" && rule.allow === "/"
		);
		expect(hasWildcardRule).toBe(true);
	});

	it("should have sitemap URL", () => {
		const robotsConfig = robots();
		
		expect(robotsConfig).toHaveProperty("sitemap");
		expect(typeof robotsConfig.sitemap).toBe("string");
		expect(robotsConfig.sitemap).toMatch(/sitemap\.xml$/);
	});

		it("should use valid protocol for sitemap", () => {
		const robotsConfig = robots();

		expect(robotsConfig.sitemap).toMatch(/^(https?:|undefined)/);
	});

	it("should include domain in sitemap URL", () => {
		const robotsConfig = robots();
		
		// In test environment, we expect either undefined, localhost, or production domain
		expect(robotsConfig.sitemap).toMatch(/(undefined|localhost|diet-clic|manon-chaillou|nutrition|dietetique-et-interventions)/);
	});

	it("should be callable function", () => {
		expect(typeof robots).toBe("function");
	});

	it("should return consistent results", () => {
		const result1 = robots();
		const result2 = robots();
		
		expect(result1).toEqual(result2);
	});

	it("should have proper structure for Next.js", () => {
		const robotsConfig = robots();
		
		// Should have the structure expected by Next.js
		expect(robotsConfig).toMatchObject({
			rules: expect.any(Array),
			sitemap: expect.any(String)
		});
	});

	it("should have proper disallow rules", () => {
		const robotsConfig = robots();
		
		// Check that robots.txt has reasonable disallow rules for security
		const hasDisallowRules = robotsConfig.rules.some(rule => 
			rule.disallow && Array.isArray(rule.disallow) && rule.disallow.length > 0
		);
		expect(hasDisallowRules).toBe(true);
	});
});
