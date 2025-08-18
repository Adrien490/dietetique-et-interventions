import sitemap from "@/app/sitemap";

describe("sitemap.ts", () => {
	it("should return sitemap array", async () => {
		const sitemapData = sitemap();

		expect(Array.isArray(sitemapData)).toBe(true);
		expect(sitemapData.length).toBeGreaterThan(0);
	});

	it("should include homepage", async () => {
		const sitemapData = sitemap();

		// Homepage is the base URL without specific path
		const homePage = sitemapData.find(
			(entry) =>
				entry.url === "http://localhost:3000" || entry.url.endsWith("/")
		);
		expect(homePage).toBeDefined();
		expect(homePage?.priority).toBe(1);
	});

	it("should have valid URL structure", async () => {
		const sitemapData = sitemap();

		sitemapData.forEach((entry) => {
			expect(entry).toHaveProperty("url");
			expect(entry).toHaveProperty("lastModified");
			expect(entry).toHaveProperty("changeFrequency");
			expect(entry).toHaveProperty("priority");

			expect(typeof entry.url).toBe("string");
			expect(entry.url).toMatch(/^https?:/);
		});
	});

	it("should include main pages", async () => {
		const sitemapData = sitemap();
		const urls = sitemapData.map((entry) => entry.url);

		// Should include main pages
		expect(urls.some((url) => url.includes("/#about"))).toBe(true);
		expect(urls.some((url) => url.includes("/#services"))).toBe(true);
		expect(urls.some((url) => url.includes("/#contact"))).toBe(true);
	});

	it("should have valid priorities", async () => {
		const sitemapData = sitemap();

		sitemapData.forEach((entry) => {
			expect(entry.priority).toBeGreaterThanOrEqual(0);
			expect(entry.priority).toBeLessThanOrEqual(1);
		});
	});

	it("should have valid change frequencies", async () => {
		const sitemapData = sitemap();
		const validFrequencies = [
			"always",
			"hourly",
			"daily",
			"weekly",
			"monthly",
			"yearly",
			"never",
		];

		sitemapData.forEach((entry) => {
			expect(validFrequencies).toContain(entry.changeFrequency);
		});
	});

	it("should have recent lastModified dates", async () => {
		const sitemapData = sitemap();
		const now = new Date();
		const oneYearAgo = new Date();
		oneYearAgo.setFullYear(now.getFullYear() - 1);

		sitemapData.forEach((entry) => {
			const lastMod = new Date(entry.lastModified ?? "");
			expect(lastMod).toBeInstanceOf(Date);
			expect(lastMod.getTime()).toBeGreaterThan(oneYearAgo.getTime());
		});
	});

	it("should use valid URL protocol", async () => {
		const sitemapData = sitemap();

		sitemapData.forEach((entry) => {
			expect(entry.url).toMatch(/^https?:/);
		});
	});

	it("should be callable function", () => {
		expect(typeof sitemap).toBe("function");
	});

	it("should return unique URLs", async () => {
		const sitemapData = sitemap();
		const urls = sitemapData.map((entry) => entry.url);
		const uniqueUrls = [...new Set(urls)];

		expect(urls.length).toBe(uniqueUrls.length);
	});

	it("should include legal pages", async () => {
		const sitemapData = sitemap();
		const urls = sitemapData.map((entry) => entry.url);

		expect(urls.some((url) => url.includes("/legal"))).toBe(true);
		expect(urls.some((url) => url.includes("/privacy"))).toBe(true);
	});

	it("should have proper priority hierarchy", async () => {
		const sitemapData = sitemap();

		const homePage = sitemapData.find((entry) => entry.url.endsWith("/"));
		const otherPages = sitemapData.filter((entry) => !entry.url.endsWith("/"));

		if (homePage && otherPages.length > 0) {
			const maxOtherPriority = Math.max(
				...otherPages.map((page) => page.priority ?? 0)
			);
			expect(homePage.priority).toBeGreaterThanOrEqual(maxOtherPriority);
		}
	});
});
