import { useContactForm } from "@/shared/hooks/use-contact-form";
import { renderHook } from "@testing-library/react";

// Mock du hook useActionState de React
const mockUseActionState = jest.fn();
jest.mock("react", () => ({
	...jest.requireActual("react"),
	useActionState: (action: any, initialState: any) =>
		mockUseActionState(action, initialState),
}));

// Mock de l'action contact
jest.mock("@/shared/actions/contact", () => ({
	contact: jest.fn(),
}));

// Mock des types
jest.mock("@/shared/types/server-action", () => ({
	ActionStatus: {
		INITIAL: "INITIAL",
		LOADING: "LOADING",
		SUCCESS: "SUCCESS",
		ERROR: "ERROR",
		VALIDATION_ERROR: "VALIDATION_ERROR",
	},
}));

describe("useContactForm", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should initialize with correct initial state", () => {
		const mockState = {
			status: "INITIAL",
			message: "",
		};
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result } = renderHook(() =>
			useContactForm({ onSuccess: jest.fn() })
		);

		expect(result.current.state).toEqual(mockState);
		expect(result.current.dispatch).toBe(mockDispatch);
		expect(result.current.isPending).toBe(mockIsPending);
	});

	it("should call useActionState with contact action", () => {
		const mockState = {
			status: "INITIAL",
			message: "",
		};
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		renderHook(() => useContactForm({ onSuccess: jest.fn() }));

		expect(mockUseActionState).toHaveBeenCalledWith(
			expect.any(Function), // contact action
			undefined // initial state peut être undefined
		);
	});

	it("should handle loading state", () => {
		const mockState = {
			status: "LOADING",
			message: "",
		};
		const mockDispatch = jest.fn();
		const mockIsPending = true;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result } = renderHook(() =>
			useContactForm({ onSuccess: jest.fn() })
		);

		expect(result.current.state.status).toBe("LOADING");
		expect(result.current.isPending).toBe(true);
	});

	it("should handle success state", () => {
		const mockState = {
			status: "SUCCESS",
			message: "Message envoyé avec succès",
		};
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result } = renderHook(() =>
			useContactForm({ onSuccess: jest.fn() })
		);

		expect(result.current.state.status).toBe("SUCCESS");
		expect(result.current.state.message).toBe("Message envoyé avec succès");
		expect(result.current.isPending).toBe(false);
	});

	it("should handle error state", () => {
		const mockState = {
			status: "ERROR",
			message: "Erreur lors de l'envoi",
		};
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result } = renderHook(() =>
			useContactForm({ onSuccess: jest.fn() })
		);

		expect(result.current.state.status).toBe("ERROR");
		expect(result.current.state.message).toBe("Erreur lors de l'envoi");
	});

	it("should handle validation error state", () => {
		const mockState = {
			status: "VALIDATION_ERROR",
			message: "Données invalides",
			fieldErrors: {
				email: ["Format d'email invalide"],
				message: ["Le message est requis"],
			},
		};
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result } = renderHook(() =>
			useContactForm({ onSuccess: jest.fn() })
		);

		expect(result.current.state.status).toBe("VALIDATION_ERROR");
		expect(result.current.state.fieldErrors).toBeDefined();
		expect(result.current.state.fieldErrors?.email).toContain(
			"Format d'email invalide"
		);
	});

	it("should provide dispatch function", () => {
		const mockState = {
			status: "INITIAL",
			message: "",
		};
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result } = renderHook(() =>
			useContactForm({ onSuccess: jest.fn() })
		);

		expect(typeof result.current.dispatch).toBe("function");

		// Test dispatch call
		const formData = new FormData();
		formData.append("name", "John Doe");
		formData.append("email", "john@example.com");
		formData.append("message", "Hello");

		result.current.dispatch(formData);

		expect(mockDispatch).toHaveBeenCalledWith(formData);
	});

	it("should maintain referential stability", () => {
		const mockState = {
			status: "INITIAL",
			message: "",
		};
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result, rerender } = renderHook(() =>
			useContactForm({ onSuccess: jest.fn() })
		);

		const firstDispatch = result.current.dispatch;

		rerender();

		const secondDispatch = result.current.dispatch;

		expect(firstDispatch).toBe(secondDispatch);
	});

	it("should handle state transitions", () => {
		const mockDispatch = jest.fn();

		// Initial state
		mockUseActionState.mockReturnValue([
			{ status: "INITIAL", message: "" },
			mockDispatch,
			false,
		]);
		const { result, rerender } = renderHook(() =>
			useContactForm({ onSuccess: jest.fn() })
		);

		expect(result.current.state.status).toBe("INITIAL");
		expect(result.current.isPending).toBe(false);

		// Loading state
		mockUseActionState.mockReturnValue([
			{ status: "LOADING", message: "" },
			mockDispatch,
			true,
		]);
		rerender();

		expect(result.current.state.status).toBe("LOADING");
		expect(result.current.isPending).toBe(true);

		// Success state
		mockUseActionState.mockReturnValue([
			{ status: "SUCCESS", message: "Envoyé!" },
			mockDispatch,
			false,
		]);
		rerender();

		expect(result.current.state.status).toBe("SUCCESS");
		expect(result.current.state.message).toBe("Envoyé!");
		expect(result.current.isPending).toBe(false);
	});

	it("should handle complex validation errors", () => {
		const mockState = {
			status: "VALIDATION_ERROR",
			message: "Validation failed",
			fieldErrors: {
				name: ["Le nom est requis", "Le nom doit faire au moins 2 caractères"],
				email: ["Format d'email invalide"],
				phone: ["Numéro de téléphone invalide"],
				subject: ["Le sujet est requis"],
				message: [
					"Le message est requis",
					"Le message doit faire au moins 10 caractères",
				],
			},
		};
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result } = renderHook(() =>
			useContactForm({ onSuccess: jest.fn() })
		);

		expect(result.current.state.fieldErrors?.name).toHaveLength(2);
		expect(result.current.state.fieldErrors?.email).toHaveLength(1);
		expect(result.current.state.fieldErrors?.message).toHaveLength(2);
	});

	it("should handle empty form submission", () => {
		const mockState = {
			status: "INITIAL",
			message: "",
		};
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result } = renderHook(() =>
			useContactForm({ onSuccess: jest.fn() })
		);

		// Submit empty form
		const emptyFormData = new FormData();
		result.current.dispatch(emptyFormData);

		expect(mockDispatch).toHaveBeenCalledWith(emptyFormData);
	});

	it("should handle form reset", () => {
		const mockDispatch = jest.fn();

		// Success state
		mockUseActionState.mockReturnValue([
			{ status: "SUCCESS", message: "Envoyé!" },
			mockDispatch,
			false,
		]);
		const { result, rerender } = renderHook(() =>
			useContactForm({ onSuccess: jest.fn() })
		);

		expect(result.current.state.status).toBe("SUCCESS");

		// Reset to initial
		mockUseActionState.mockReturnValue([
			{ status: "INITIAL", message: "" },
			mockDispatch,
			false,
		]);
		rerender();

		expect(result.current.state.status).toBe("INITIAL");
		expect(result.current.state.message).toBe("");
	});
});
