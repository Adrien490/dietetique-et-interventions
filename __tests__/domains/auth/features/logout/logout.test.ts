import { logout } from "@/domains/auth/features/logout/logout";
import { ActionStatus } from "@/shared/types/server-action";

// Mock des dépendances
jest.mock("@/domains/auth/lib/auth", () => ({
	auth: {
		api: {
			signOut: jest.fn(),
		},
	},
}));

jest.mock("@/domains/auth/utils/get-session", () => ({
	getSession: jest.fn(),
}));

jest.mock("next/headers", () => ({
	headers: jest.fn().mockResolvedValue(new Headers()),
}));

jest.mock("next/navigation", () => ({
	redirect: jest.fn(() => {
		throw new Error("NEXT_REDIRECT");
	}),
}));

const mockAuth = require("@/domains/auth/lib/auth").auth;
const mockGetSession = require("@/domains/auth/utils/get-session").getSession;
const mockRedirect = require("next/navigation").redirect;

describe("logout", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should return error if user is not connected", async () => {
		mockGetSession.mockResolvedValue(null);

		const result = await logout();

		expect(result.status).toBe(ActionStatus.UNAUTHORIZED);
		expect(result.message).toBe("Vous n'êtes pas connecté");
		expect(mockAuth.api.signOut).not.toHaveBeenCalled();
		expect(mockRedirect).not.toHaveBeenCalled();
	});

	it("should return error if session has no user", async () => {
		mockGetSession.mockResolvedValue({ user: null });

		const result = await logout();

		expect(result.status).toBe(ActionStatus.UNAUTHORIZED);
		expect(result.message).toBe("Vous n'êtes pas connecté");
		expect(mockAuth.api.signOut).not.toHaveBeenCalled();
		expect(mockRedirect).not.toHaveBeenCalled();
	});

	it("should successfully logout authenticated user", async () => {
		mockGetSession.mockResolvedValue({
			user: { id: "user123", email: "test@example.com" },
		});
		mockAuth.api.signOut.mockResolvedValue(undefined);

		// Le redirect lance une exception, donc on s'attend à ce qu'elle soit propagée
		await expect(logout()).rejects.toThrow();

		expect(mockAuth.api.signOut).toHaveBeenCalledWith({
			headers: expect.any(Headers),
		});
		expect(mockRedirect).toHaveBeenCalledWith("/");
	});

	it("should call signOut with proper headers", async () => {
		const mockHeaders = new Headers();
		require("next/headers").headers.mockResolvedValue(mockHeaders);

		mockGetSession.mockResolvedValue({
			user: { id: "user123" },
		});
		mockAuth.api.signOut.mockResolvedValue(undefined);

		await expect(logout()).rejects.toThrow();

		expect(mockAuth.api.signOut).toHaveBeenCalledWith({
			headers: mockHeaders,
		});
	});

	it("should handle session with undefined user", async () => {
		mockGetSession.mockResolvedValue({
			user: undefined,
		});

		const result = await logout();

		expect(result.status).toBe(ActionStatus.UNAUTHORIZED);
		expect(result.message).toBe("Vous n'êtes pas connecté");
	});

	it("should handle empty session object", async () => {
		mockGetSession.mockResolvedValue({});

		const result = await logout();

		expect(result.status).toBe(ActionStatus.UNAUTHORIZED);
		expect(result.message).toBe("Vous n'êtes pas connecté");
	});
});
