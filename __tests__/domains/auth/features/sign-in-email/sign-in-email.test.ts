import { signInEmail } from "@/domains/auth/features/sign-in-email/sign-in-email";
import { ActionStatus } from "@/shared/types/server-action";

// Mock des dépendances
jest.mock("@/domains/auth/lib/auth", () => ({
	auth: {
		api: {
			getSession: jest.fn(),
			signInEmail: jest.fn(),
		},
	},
}));

jest.mock("next/headers", () => ({
	headers: jest.fn().mockResolvedValue(new Headers()),
}));

jest.mock("next/navigation", () => ({
	redirect: jest.fn(),
}));

jest.mock("@/domains/auth/features/sign-in-email/schemas/sign-in-email-schema", () => ({
	signInEmailSchema: {
		safeParse: jest.fn(),
	},
}));

const mockAuth = require("@/domains/auth/lib/auth").auth;
const mockRedirect = require("next/navigation").redirect;
const mockSignInEmailSchema = require("@/domains/auth/features/sign-in-email/schemas/sign-in-email-schema").signInEmailSchema;

describe("signInEmail", () => {
	let mockFormData: FormData;

	beforeEach(() => {
		jest.clearAllMocks();
		mockFormData = new FormData();
		mockFormData.append("email", "test@example.com");
		mockFormData.append("password", "password123");
		mockFormData.append("callbackURL", "/dashboard");
	});

	it("should return error if user is already connected", async () => {
		mockAuth.api.getSession.mockResolvedValue({
			user: { id: "user123" },
		});

		const result = await signInEmail(null, mockFormData);

		expect(result.status).toBe(ActionStatus.UNAUTHORIZED);
		expect(result.message).toBe("Vous êtes déjà connecté");
	});

	it("should return validation error for invalid data", async () => {
		mockAuth.api.getSession.mockResolvedValue(null);
		mockSignInEmailSchema.safeParse.mockReturnValue({
			success: false,
			error: {
				flatten: () => ({
					fieldErrors: { email: ["Email invalide"] },
				}),
			},
		});

		const result = await signInEmail(null, mockFormData);

		expect(result.status).toBe(ActionStatus.VALIDATION_ERROR);
		expect(result.validationErrors).toEqual({ email: ["Email invalide"] });
	});

	it("should handle successful sign in", async () => {
		mockAuth.api.getSession.mockResolvedValue(null);
		mockSignInEmailSchema.safeParse.mockReturnValue({
			success: true,
			data: {
				email: "test@example.com",
				password: "password123",
				callbackURL: "/dashboard",
			},
		});
		mockAuth.api.signInEmail.mockResolvedValue({ success: true });

		// Le redirect lance une exception, on vérifie qu'il est appelé
		try {
			await signInEmail(null, mockFormData);
		} catch (error) {
			// Le redirect lance une exception NEXT_REDIRECT, c'est normal
			expect(String(error)).toContain("NEXT_REDIRECT");
		}

		expect(mockAuth.api.signInEmail).toHaveBeenCalledWith({
			body: {
				email: "test@example.com",
				password: "password123",
				callbackURL: "/dashboard",
			},
			headers: expect.any(Headers),
		});
		expect(mockRedirect).toHaveBeenCalledWith("/dashboard");
	});

	it("should handle invalid email or password error", async () => {
		mockAuth.api.getSession.mockResolvedValue(null);
		mockSignInEmailSchema.safeParse.mockReturnValue({
			success: true,
			data: {
				email: "test@example.com",
				password: "wrongpassword",
				callbackURL: "/dashboard",
			},
		});
		mockAuth.api.signInEmail.mockRejectedValue(
			new Error("Invalid email or password")
		);

		const result = await signInEmail(null, mockFormData);

		expect(result.status).toBe(ActionStatus.UNAUTHORIZED);
		expect(result.message).toBe("Email ou mot de passe incorrect");
	});

	it("should handle general authentication error", async () => {
		mockAuth.api.getSession.mockResolvedValue(null);
		mockSignInEmailSchema.safeParse.mockReturnValue({
			success: true,
			data: {
				email: "test@example.com",
				password: "password123",
				callbackURL: "/dashboard",
			},
		});
		mockAuth.api.signInEmail.mockRejectedValue(new Error("Server error"));

		const result = await signInEmail(null, mockFormData);

		expect(result.status).toBe(ActionStatus.ERROR);
		expect(result.message).toBe("Une erreur est survenue lors de la connexion");
	});

	it("should handle no response from auth service", async () => {
		mockAuth.api.getSession.mockResolvedValue(null);
		mockSignInEmailSchema.safeParse.mockReturnValue({
			success: true,
			data: {
				email: "test@example.com",
				password: "password123",
				callbackURL: "/dashboard",
			},
		});
		mockAuth.api.signInEmail.mockResolvedValue(null);

		const result = await signInEmail(null, mockFormData);

		expect(result.status).toBe(ActionStatus.ERROR);
		expect(result.message).toBe(
			"Aucune réponse du service d'authentification"
		);
	});

	it("should extract form data correctly", async () => {
		mockAuth.api.getSession.mockResolvedValue(null);
		mockSignInEmailSchema.safeParse.mockReturnValue({
			success: true,
			data: {
				email: "test@example.com",
				password: "password123",
				callbackURL: "/dashboard",
			},
		});

		mockAuth.api.signInEmail.mockResolvedValue({ success: true });

		try {
			await signInEmail(null, mockFormData);
		} catch (error) {
			// Le redirect lance une exception NEXT_REDIRECT, c'est normal
			expect(String(error)).toContain("NEXT_REDIRECT");
		}

		expect(mockSignInEmailSchema.safeParse).toHaveBeenCalledWith({
			email: "test@example.com",
			password: "password123",
			callbackURL: "/dashboard",
		});
	});

	it("should handle missing form data", async () => {
		const emptyFormData = new FormData();
		mockAuth.api.getSession.mockResolvedValue(null);

		await signInEmail(null, emptyFormData);

		expect(mockSignInEmailSchema.safeParse).toHaveBeenCalledWith({
			email: null,
			password: null,
			callbackURL: null,
		});
	});
});
