import { signUpEmailSchema } from "@/domains/auth/features/sign-up-email/sign-up-email-schema";

describe("signUpEmailSchema", () => {
	it("should validate correct sign-up data", () => {
		const validData = {
			email: "test@example.com",
			password: "password123",
			confirmPassword: "password123",
			name: "John Doe",
			callbackURL: "/dashboard",
		};

		const result = signUpEmailSchema.safeParse(validData);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toEqual(validData);
		}
	});

	it("should validate data without optional callbackURL", () => {
		const validData = {
			email: "test@example.com",
			password: "password123",
			confirmPassword: "password123",
			name: "John Doe",
		};

		const result = signUpEmailSchema.safeParse(validData);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.callbackURL).toBeUndefined();
		}
	});

	it("should reject invalid email format", () => {
		const invalidData = {
			email: "invalid-email",
			password: "password123",
			confirmPassword: "password123",
			name: "John Doe",
		};

		const result = signUpEmailSchema.safeParse(invalidData);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].path).toEqual(["email"]);
			expect(result.error.issues[0].message).toBe("Format d'email invalide");
		}
	});

	it("should reject password shorter than 8 characters", () => {
		const invalidData = {
			email: "test@example.com",
			password: "short",
			confirmPassword: "short",
			name: "John Doe",
		};

		const result = signUpEmailSchema.safeParse(invalidData);
		expect(result.success).toBe(false);
		if (!result.success) {
			const passwordError = result.error.issues.find(
				(issue) => issue.path[0] === "password"
			);
			expect(passwordError?.message).toBe(
				"Le mot de passe doit contenir au moins 8 caractères"
			);
		}
	});

	it("should reject password longer than 32 characters", () => {
		const longPassword = "a".repeat(33);
		const invalidData = {
			email: "test@example.com",
			password: longPassword,
			confirmPassword: longPassword,
			name: "John Doe",
		};

		const result = signUpEmailSchema.safeParse(invalidData);
		expect(result.success).toBe(false);
		if (!result.success) {
			const passwordError = result.error.issues.find(
				(issue) => issue.path[0] === "password"
			);
			expect(passwordError?.message).toBe(
				"Le mot de passe ne doit pas dépasser 32 caractères"
			);
		}
	});

	it("should reject mismatched passwords", () => {
		const invalidData = {
			email: "test@example.com",
			password: "password123",
			confirmPassword: "differentpassword",
			name: "John Doe",
		};

		const result = signUpEmailSchema.safeParse(invalidData);
		expect(result.success).toBe(false);
		if (!result.success) {
			const mismatchError = result.error.issues.find(
				(issue) => issue.path[0] === "confirmPassword"
			);
			expect(mismatchError?.message).toBe("Les mots de passe ne correspondent pas");
		}
	});

	it("should reject empty name", () => {
		const invalidData = {
			email: "test@example.com",
			password: "password123",
			confirmPassword: "password123",
			name: "",
		};

		const result = signUpEmailSchema.safeParse(invalidData);
		expect(result.success).toBe(false);
		if (!result.success) {
			const nameError = result.error.issues.find(
				(issue) => issue.path[0] === "name"
			);
			expect(nameError?.message).toBe("Le nom est requis");
		}
	});

	it("should accept valid password lengths", () => {
		const testCases = [
			"12345678", // 8 characters (minimum)
			"a".repeat(32), // 32 characters (maximum)
			"averagepassword", // typical length
		];

		testCases.forEach((password) => {
			const data = {
				email: "test@example.com",
				password,
				confirmPassword: password,
				name: "John Doe",
			};

			const result = signUpEmailSchema.safeParse(data);
			expect(result.success).toBe(true);
		});
	});

	it("should validate confirmPassword length independently", () => {
		const invalidData = {
			email: "test@example.com",
			password: "validpassword",
			confirmPassword: "short",
			name: "John Doe",
		};

		const result = signUpEmailSchema.safeParse(invalidData);
		expect(result.success).toBe(false);
		if (!result.success) {
			const confirmError = result.error.issues.find(
				(issue) => issue.path[0] === "confirmPassword"
			);
			expect(confirmError?.message).toBe(
				"Le mot de passe doit contenir au moins 8 caractères"
			);
		}
	});

	it("should handle multiple validation errors", () => {
		const invalidData = {
			email: "invalid-email",
			password: "short",
			confirmPassword: "different",
			name: "",
		};

		const result = signUpEmailSchema.safeParse(invalidData);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues.length).toBeGreaterThan(1);
			
			const errorPaths = result.error.issues.map((issue) => issue.path[0]);
			expect(errorPaths).toContain("email");
			expect(errorPaths).toContain("password");
			expect(errorPaths).toContain("name");
		}
	});

	it("should accept various name formats", () => {
		const testCases = [
			"John",
			"John Doe",
			"Jean-Pierre",
			"Marie-Claire Dupont",
			"李小明",
			"José María",
		];

		testCases.forEach((name) => {
			const data = {
				email: "test@example.com",
				password: "password123",
				confirmPassword: "password123",
				name,
			};

			const result = signUpEmailSchema.safeParse(data);
			expect(result.success).toBe(true);
		});
	});

	it("should handle edge case emails", () => {
		const testCases = [
			{ email: "user+tag@example.com", shouldPass: true },
			{ email: "user.name@subdomain.example.com", shouldPass: true },
			{ email: "123@example.com", shouldPass: true },
			{ email: "user@", shouldPass: false },
			{ email: "@example.com", shouldPass: false },
		];

		testCases.forEach(({ email, shouldPass }) => {
			const data = {
				email,
				password: "password123",
				confirmPassword: "password123",
				name: "John Doe",
			};

			const result = signUpEmailSchema.safeParse(data);
			expect(result.success).toBe(shouldPass);
		});
	});

	it("should strip unknown fields", () => {
		const dataWithExtraFields = {
			email: "test@example.com",
			password: "password123",
			confirmPassword: "password123",
			name: "John Doe",
			extraField: "should be removed",
			anotherField: 123,
		};

		const result = signUpEmailSchema.safeParse(dataWithExtraFields);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).not.toHaveProperty("extraField");
			expect(result.data).not.toHaveProperty("anotherField");
		}
	});

	it("should handle whitespace in name", () => {
		const validData = {
			email: "test@example.com",
			password: "password123",
			confirmPassword: "password123",
			name: "  John Doe  ", // whitespace around name
		};

		const result = signUpEmailSchema.safeParse(validData);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.name).toBe("  John Doe  "); // Zod doesn't trim by default
		}
	});

	it("should handle optional callbackURL correctly", () => {
		const testCases = [
			{ callbackURL: "/dashboard", shouldInclude: true },
			{ callbackURL: "", shouldInclude: true },
			{ shouldInclude: false }, // no callbackURL property
		];

		testCases.forEach(({ callbackURL, shouldInclude }) => {
			const data: any = {
				email: "test@example.com",
				password: "password123",
				confirmPassword: "password123",
				name: "John Doe",
			};

			if (shouldInclude) {
				data.callbackURL = callbackURL;
			}

			const result = signUpEmailSchema.safeParse(data);
			expect(result.success).toBe(true);
		});
	});
});
