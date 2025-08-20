import { cn, getUserInitials } from "@/shared/utils";

describe("Shared Utils", () => {
	describe("cn function", () => {
		it("should merge class names correctly", () => {
			const result = cn("text-red-500", "bg-blue-500");
			expect(result).toBe("text-red-500 bg-blue-500");
		});

		it("should handle conditional classes", () => {
			const result = cn(
				"base-class",
				true && "conditional-class",
				false && "hidden-class"
			);
			expect(result).toBe("base-class conditional-class");
		});

		it("should handle Tailwind conflicts", () => {
			const result = cn("p-2", "p-4");
			expect(result).toBe("p-4");
		});

		it("should handle arrays", () => {
			const result = cn(["text-sm", "font-bold"], "text-blue-500");
			expect(result).toBe("text-sm font-bold text-blue-500");
		});

		it("should handle empty inputs", () => {
			const result = cn();
			expect(result).toBe("");
		});

		it("should handle undefined and null", () => {
			const result = cn("valid-class", undefined, null, "another-class");
			expect(result).toBe("valid-class another-class");
		});
	});

	describe("getUserInitials function", () => {
		it("should return initials from full name", () => {
			const result = getUserInitials("John Doe");
			expect(result).toBe("JD");
		});

		it("should return initials from single name", () => {
			const result = getUserInitials("John");
			expect(result).toBe("J");
		});

		it("should return initials from multiple names", () => {
			const result = getUserInitials("John Michael Doe");
			expect(result).toBe("JM"); // Only returns first 2 initials
		});

		it("should fallback to email initials when name is not provided", () => {
			const result = getUserInitials(null, "john.doe@example.com");
			expect(result).toBe("J"); // Only returns first character of email
		});

		it("should fallback to email initials when name is empty", () => {
			const result = getUserInitials("", "jane.smith@example.com");
			expect(result).toBe("J"); // Only returns first character of email
		});

		it("should handle email with single character", () => {
			const result = getUserInitials(null, "a@example.com");
			expect(result).toBe("A");
		});

		it("should handle complex email patterns", () => {
			const result = getUserInitials(null, "first.last+tag@domain.co.uk");
			expect(result).toBe("F"); // Only returns first character of email
		});

		it("should return default when both name and email are null", () => {
			const result = getUserInitials(null, null);
			expect(result).toBe("U");
		});

		it("should return default when both name and email are empty", () => {
			const result = getUserInitials("", "");
			expect(result).toBe("U");
		});

		it("should handle names with special characters", () => {
			const result = getUserInitials("Jean-Pierre Müller");
			expect(result).toBe("JM"); // Only returns first 2 initials
		});

		it("should handle lowercase names", () => {
			const result = getUserInitials("john doe");
			expect(result).toBe("JD");
		});

		it("should handle names with extra spaces", () => {
			const result = getUserInitials("  John   Doe  ");
			expect(result).toBe("JD");
		});

		it("should prioritize name over email", () => {
			const result = getUserInitials("John Doe", "jane.smith@example.com");
			expect(result).toBe("JD");
		});
	});

	describe("Module exports", () => {
		it("should export utility functions from submodules", async () => {
			const utilsModule = await import("@/shared/utils");

			// Should export from create-toast-callbacks
			expect(utilsModule.createToastCallbacks).toBeDefined();
			expect(typeof utilsModule.createToastCallbacks).toBe("function");

			// Should export from with-callbacks
			expect(utilsModule.withCallbacks).toBeDefined();
			expect(typeof utilsModule.withCallbacks).toBe("function");
		});

		it("should export main utility functions", async () => {
			const utilsModule = await import("@/shared/utils");

			expect(utilsModule.cn).toBeDefined();
			expect(typeof utilsModule.cn).toBe("function");

			expect(utilsModule.getUserInitials).toBeDefined();
			expect(typeof utilsModule.getUserInitials).toBe("function");
		});
	});
});
