import { signInEmailSchema } from "@/domains/auth/features/sign-in-email/schemas/sign-in-email-schema";

describe("signInEmailSchema", () => {
	it("should validate correct sign-in data", () => {
		const validData = {
			email: "test@example.com",
			password: "password123",
			callbackURL: "/dashboard",
		};

		const result = signInEmailSchema.safeParse(validData);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toEqual(validData);
		}
	});

	it("should reject invalid email format", () => {
		const invalidData = {
			email: "invalid-email",
			password: "password123",
			callbackURL: "/dashboard",
		};

		const result = signInEmailSchema.safeParse(invalidData);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].path).toEqual(["email"]);
			expect(result.error.issues[0].message).toBe("Format d'email invalide");
		}
	});

	it("should reject empty email", () => {
		const invalidData = {
			email: "",
			password: "password123",
			callbackURL: "/dashboard",
		};

		const result = signInEmailSchema.safeParse(invalidData);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].path).toEqual(["email"]);
			expect(result.error.issues[0].message).toBe("Format d'email invalide");
		}
	});

	it("should reject empty password", () => {
		const invalidData = {
			email: "test@example.com",
			password: "",
			callbackURL: "/dashboard",
		};

		const result = signInEmailSchema.safeParse(invalidData);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].path).toEqual(["password"]);
			expect(result.error.issues[0].message).toBe("Le mot de passe est requis");
		}
	});

	it("should accept any non-empty password", () => {
		const validData = {
			email: "test@example.com",
			password: "a",
			callbackURL: "/dashboard",
		};

		const result = signInEmailSchema.safeParse(validData);
		expect(result.success).toBe(true);
	});

	it("should require callbackURL field", () => {
		const invalidData = {
			email: "test@example.com",
			password: "password123",
		};

		const result = signInEmailSchema.safeParse(invalidData);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].path).toEqual(["callbackURL"]);
		}
	});

	it("should accept empty callbackURL string", () => {
		const validData = {
			email: "test@example.com",
			password: "password123",
			callbackURL: "",
		};

		const result = signInEmailSchema.safeParse(validData);
		expect(result.success).toBe(true);
	});

	it("should reject missing fields", () => {
		const invalidData = {};

		const result = signInEmailSchema.safeParse(invalidData);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues.length).toBe(3); // email, password, callbackURL
		}
	});

	it("should handle complex email formats", () => {
		const testCases = [
			{ email: "user+test@example.com", shouldPass: true },
			{ email: "user.name@example.co.uk", shouldPass: true },
			{ email: "123@example.com", shouldPass: true },
			{ email: "user@", shouldPass: false },
			{ email: "@example.com", shouldPass: false },
			{ email: "user@.com", shouldPass: false },
		];

		testCases.forEach(({ email, shouldPass }) => {
			const data = {
				email,
				password: "password123",
				callbackURL: "/dashboard",
			};

			const result = signInEmailSchema.safeParse(data);
			expect(result.success).toBe(shouldPass);
		});
	});

	it("should handle different callbackURL formats", () => {
		const testCases = [
			"/dashboard",
			"/",
			"/some/path",
			"https://example.com",
			"http://localhost:3000",
			"",
		];

		testCases.forEach((callbackURL) => {
			const data = {
				email: "test@example.com",
				password: "password123",
				callbackURL,
			};

			const result = signInEmailSchema.safeParse(data);
			expect(result.success).toBe(true);
		});
	});

	it("should strip unknown fields", () => {
		const dataWithExtraFields = {
			email: "test@example.com",
			password: "password123",
			callbackURL: "/dashboard",
			extraField: "should be removed",
			anotherField: 123,
		};

		const result = signInEmailSchema.safeParse(dataWithExtraFields);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toEqual({
				email: "test@example.com",
				password: "password123",
				callbackURL: "/dashboard",
			});
			expect(result.data).not.toHaveProperty("extraField");
			expect(result.data).not.toHaveProperty("anotherField");
		}
	});
});
