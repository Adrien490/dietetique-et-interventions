import { useSignInEmail } from "@/domains/auth/features/sign-in-email/use-sign-in-email";
import { ActionStatus } from "@/shared/types/server-action";
import { renderHook } from "@testing-library/react";

// Mock du hook useActionState de React
const mockUseActionState = jest.fn();
jest.mock("react", () => ({
	...jest.requireActual("react"),
	useActionState: (action: any, initialState: any) =>
		mockUseActionState(action, initialState),
}));

// Mock de l'action signInEmail
jest.mock("@/domains/auth/features/sign-in-email/sign-in-email", () => ({
	signInEmail: jest.fn(),
}));

describe("useSignInEmail", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should initialize with correct initial state", () => {
		const mockState = {
			status: ActionStatus.INITIAL,
			message: "",
		};
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result } = renderHook(() => useSignInEmail());

		expect(result.current.state).toEqual(mockState);
		expect(result.current.dispatch).toBe(mockDispatch);
		expect(result.current.isPending).toBe(mockIsPending);
	});

	it("should call useActionState with correct parameters", () => {
		const mockState = {
			status: ActionStatus.INITIAL,
			message: "",
		};
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		renderHook(() => useSignInEmail());

		expect(mockUseActionState).toHaveBeenCalledWith(
			expect.any(Function), // signInEmail action
			{
				status: ActionStatus.INITIAL,
				message: "",
			}
		);
	});

	it("should return pending state correctly", () => {
		const mockState = {
			status: ActionStatus.LOADING,
			message: "",
		};
		const mockDispatch = jest.fn();
		const mockIsPending = true;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result } = renderHook(() => useSignInEmail());

		expect(result.current.isPending).toBe(true);
		expect(result.current.state.status).toBe(ActionStatus.LOADING);
	});

	it("should return success state correctly", () => {
		const mockState = {
			status: ActionStatus.SUCCESS,
			message: "Connexion réussie",
		};
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result } = renderHook(() => useSignInEmail());

		expect(result.current.state.status).toBe(ActionStatus.SUCCESS);
		expect(result.current.state.message).toBe("Connexion réussie");
		expect(result.current.isPending).toBe(false);
	});

	it("should return error state correctly", () => {
		const mockState = {
			status: ActionStatus.ERROR,
			message: "Email ou mot de passe incorrect",
		};
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result } = renderHook(() => useSignInEmail());

		expect(result.current.state.status).toBe(ActionStatus.ERROR);
		expect(result.current.state.message).toBe(
			"Email ou mot de passe incorrect"
		);
		expect(result.current.isPending).toBe(false);
	});

	it("should return dispatch function that can be called", () => {
		const mockState = {
			status: ActionStatus.INITIAL,
			message: "",
		};
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result } = renderHook(() => useSignInEmail());

		// Test that dispatch function is callable
		expect(typeof result.current.dispatch).toBe("function");

		// Call the dispatch function
		const formData = new FormData();
		formData.append("email", "test@example.com");
		formData.append("password", "password123");

		result.current.dispatch(formData);

		expect(mockDispatch).toHaveBeenCalledWith(formData);
	});

	it("should handle unauthorized state", () => {
		const mockState = {
			status: ActionStatus.UNAUTHORIZED,
			message: "Vous êtes déjà connecté",
		};
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result } = renderHook(() => useSignInEmail());

		expect(result.current.state.status).toBe(ActionStatus.UNAUTHORIZED);
		expect(result.current.state.message).toBe("Vous êtes déjà connecté");
	});

	it("should handle validation error state", () => {
		const mockState = {
			status: ActionStatus.VALIDATION_ERROR,
			message: "Données invalides",
			fieldErrors: {
				email: ["Format d'email invalide"],
				password: ["Le mot de passe est requis"],
			},
		};
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result } = renderHook(() => useSignInEmail());

		expect(result.current.state.status).toBe(ActionStatus.VALIDATION_ERROR);
		expect(result.current.state.fieldErrors).toBeDefined();
	});

	it("should maintain referential stability", () => {
		const mockState = {
			status: ActionStatus.INITIAL,
			message: "",
		};
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result, rerender } = renderHook(() => useSignInEmail());

		const firstDispatch = result.current.dispatch;

		rerender();

		const secondDispatch = result.current.dispatch;

		// The dispatch function should remain the same reference
		expect(firstDispatch).toBe(secondDispatch);
	});
});
