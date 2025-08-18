import { signUpEmail } from "@/domains/auth/features/sign-up-email/sign-up-email";
import { ActionStatus } from "@/shared/types/server-action";

// Mock des dépendances
jest.mock("@/domains/auth/lib/auth", () => ({
	auth: {
		api: {
			getSession: jest.fn(),
			signUpEmail: jest.fn(),
		},
	},
}));

jest.mock("next/headers", () => ({
	headers: jest.fn().mockResolvedValue(new Headers()),
}));

jest.mock("@/domains/auth/features/sign-up-email/sign-up-email-schema", () => ({
	signUpEmailSchema: {
		safeParse: jest.fn(),
	},
}));

const mockAuth = require("@/domains/auth/lib/auth").auth;
const mockSignUpEmailSchema = require("@/domains/auth/features/sign-up-email/sign-up-email-schema").signUpEmailSchema;

describe("signUpEmail", () => {
	let mockFormData: FormData;

	beforeEach(() => {
		jest.clearAllMocks();
		mockFormData = new FormData();
		mockFormData.append("email", "test@example.com");
		mockFormData.append("password", "password123");
		mockFormData.append("confirmPassword", "password123");
		mockFormData.append("name", "Test User");
	});

	it("should return error if user is already connected", async () => {
		mockAuth.api.getSession.mockResolvedValue({
			user: { id: "user123" },
		});

		const result = await signUpEmail(null, mockFormData);

		expect(result.status).toBe(ActionStatus.UNAUTHORIZED);
		expect(result.message).toBe("Vous êtes déjà connecté");
	});

	it("should return validation error for invalid data", async () => {
		mockAuth.api.getSession.mockResolvedValue(null);
		mockSignUpEmailSchema.safeParse.mockReturnValue({
			success: false,
			error: {
				flatten: () => ({
					fieldErrors: { 
						email: ["Email invalide"],
						password: ["Mot de passe trop court"] 
					},
				}),
			},
		});

		const result = await signUpEmail(null, mockFormData);

		expect(result.status).toBe(ActionStatus.VALIDATION_ERROR);
		expect(result.validationErrors).toEqual({ 
			email: ["Email invalide"],
			password: ["Mot de passe trop court"] 
		});
		expect(result.message).toBe("Données invalides");
	});

	it("should handle successful sign up", async () => {
		mockAuth.api.getSession.mockResolvedValue(null);
		mockSignUpEmailSchema.safeParse.mockReturnValue({
			success: true,
			data: {
				email: "test@example.com",
				password: "password123",
				name: "Test User",
			},
		});
		mockAuth.api.signUpEmail.mockResolvedValue({ success: true });

		const result = await signUpEmail(null, mockFormData);

		expect(result.status).toBe(ActionStatus.SUCCESS);
		expect(result.message).toBe("Inscription réussie");
		expect(mockAuth.api.signUpEmail).toHaveBeenCalledWith({
			body: {
				email: "test@example.com",
				password: "password123",
				name: "Test User",
			},
		});
	});

	it("should handle no response from auth service", async () => {
		mockAuth.api.getSession.mockResolvedValue(null);
		mockSignUpEmailSchema.safeParse.mockReturnValue({
			success: true,
			data: {
				email: "test@example.com",
				password: "password123",
				name: "Test User",
			},
		});
		mockAuth.api.signUpEmail.mockResolvedValue(null);

		const result = await signUpEmail(null, mockFormData);

		expect(result.status).toBe(ActionStatus.ERROR);
		expect(result.message).toBe("Une erreur est survenue lors de l'inscription");
	});

	it("should handle auth service error", async () => {
		mockAuth.api.getSession.mockResolvedValue(null);
		mockSignUpEmailSchema.safeParse.mockReturnValue({
			success: true,
			data: {
				email: "test@example.com",
				password: "password123",
				name: "Test User",
			},
		});
		mockAuth.api.signUpEmail.mockRejectedValue(new Error("Email already exists"));

		const result = await signUpEmail(null, mockFormData);

		expect(result.status).toBe(ActionStatus.ERROR);
		expect(result.message).toBe("Email already exists");
	});

	it("should handle unexpected errors", async () => {
		mockAuth.api.getSession.mockRejectedValue(new Error("Unexpected error"));

		const result = await signUpEmail(null, mockFormData);

		expect(result.status).toBe(ActionStatus.ERROR);
		expect(result.message).toBe("Unexpected error");
	});

	it("should extract form data correctly", async () => {
		mockAuth.api.getSession.mockResolvedValue(null);
		mockSignUpEmailSchema.safeParse.mockReturnValue({
			success: true,
			data: {
				email: "test@example.com",
				password: "password123",
				name: "Test User",
			},
		});
		mockAuth.api.signUpEmail.mockResolvedValue({ success: true });

		await signUpEmail(null, mockFormData);

		expect(mockSignUpEmailSchema.safeParse).toHaveBeenCalledWith({
			email: "test@example.com",
			password: "password123",
			confirmPassword: "password123",
			name: "Test User",
		});
	});

	it("should handle missing form data", async () => {
		const emptyFormData = new FormData();
		mockAuth.api.getSession.mockResolvedValue(null);

		await signUpEmail(null, emptyFormData);

		expect(mockSignUpEmailSchema.safeParse).toHaveBeenCalledWith({
			email: null,
			password: null,
			confirmPassword: null,
			name: null,
		});
	});

	it("should handle non-Error exceptions", async () => {
		mockAuth.api.getSession.mockResolvedValue(null);
		mockSignUpEmailSchema.safeParse.mockReturnValue({
			success: true,
			data: {
				email: "test@example.com",
				password: "password123",
				name: "Test User",
			},
		});
		mockAuth.api.signUpEmail.mockRejectedValue("String error");

		const result = await signUpEmail(null, mockFormData);

		expect(result.status).toBe(ActionStatus.ERROR);
		expect(result.message).toBe("Une erreur est survenue lors de l'inscription");
	});

	it("should handle global unexpected non-Error exceptions", async () => {
		mockAuth.api.getSession.mockRejectedValue("Global string error");

		const result = await signUpEmail(null, mockFormData);

		expect(result.status).toBe(ActionStatus.ERROR);
		expect(result.message).toBe("Une erreur inattendue est survenue");
	});

	it("should log validation errors", async () => {
		const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
		
		mockAuth.api.getSession.mockResolvedValue(null);
		mockSignUpEmailSchema.safeParse.mockReturnValue({
			success: false,
			error: {
				flatten: () => ({
					fieldErrors: { email: ["Email invalide"] },
				}),
			},
		});

		await signUpEmail(null, mockFormData);

		expect(consoleSpy).toHaveBeenCalledWith({ email: ["Email invalide"] });
		
		consoleSpy.mockRestore();
	});
});
