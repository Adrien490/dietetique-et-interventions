describe("FAQ Index", () => {
	it("should export FAQ component", async () => {
		const faqModule = await import("@/app/(marketing)/components/faq");

		expect(faqModule).toBeDefined();
		expect(faqModule.FAQ).toBeDefined();
		expect(typeof faqModule.FAQ).toBe("function");
	});

	it("should be a valid React component export", async () => {
		const { FAQ } = await import("@/app/(marketing)/components/faq");

		// Should be a function (React component)
		expect(typeof FAQ).toBe("function");

		// Should have displayName or name property
		expect(FAQ.name || FAQ.displayName).toBeTruthy();
	});

	it("should export all expected members", async () => {
		const faqModule = await import("@/app/(marketing)/components/faq");

		// Should export the FAQ component
		expect("FAQ" in faqModule).toBe(true);
	});
});
