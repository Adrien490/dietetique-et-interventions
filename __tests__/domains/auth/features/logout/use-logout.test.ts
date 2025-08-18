import { useLogout } from "@/domains/auth/features/logout/use-logout";
import { renderHook } from "@testing-library/react";

// Mock du hook useActionState de React
const mockUseActionState = jest.fn();
jest.mock("react", () => ({
	...jest.requireActual("react"),
	useActionState: (action: any, initialState: any) =>
		mockUseActionState(action, initialState),
}));

// Mock de l'action logout
jest.mock("@/domains/auth/features/logout/logout", () => ({
	logout: jest.fn(),
}));

describe("useLogout", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should initialize with null state", () => {
		const mockState = null;
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result } = renderHook(() => useLogout());

		expect(result.current.state).toBeNull();
		expect(result.current.dispatch).toBe(mockDispatch);
		expect(result.current.isPending).toBe(mockIsPending);
	});

	it("should call useActionState with correct parameters", () => {
		const mockState = null;
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		renderHook(() => useLogout());

		expect(mockUseActionState).toHaveBeenCalledWith(
			expect.any(Function), // logout action
			null
		);
	});

	it("should return pending state correctly", () => {
		const mockState = null;
		const mockDispatch = jest.fn();
		const mockIsPending = true;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result } = renderHook(() => useLogout());

		expect(result.current.isPending).toBe(true);
	});

	it("should return dispatch function that can be called", () => {
		const mockState = null;
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result } = renderHook(() => useLogout());

		// Test that dispatch function is callable
		expect(typeof result.current.dispatch).toBe("function");

		// Call the dispatch function
		result.current.dispatch();

		expect(mockDispatch).toHaveBeenCalled();
	});

	it("should handle error state", () => {
		const mockState = {
			status: "ERROR",
			message: "Vous n'êtes pas connecté",
		};
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result } = renderHook(() => useLogout());

		expect(result.current.state).toEqual(mockState);
		expect(result.current.isPending).toBe(false);
	});

	it("should maintain referential stability", () => {
		const mockState = null;
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result, rerender } = renderHook(() => useLogout());

		const firstDispatch = result.current.dispatch;

		rerender();

		const secondDispatch = result.current.dispatch;

		// The dispatch function should remain the same reference
		expect(firstDispatch).toBe(secondDispatch);
	});

	it("should handle successful logout", () => {
		const mockState = null; // Successful logout typically redirects, so state remains null
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result } = renderHook(() => useLogout());

		expect(result.current.state).toBeNull();
		expect(result.current.isPending).toBe(false);
	});

	it("should handle logout with form data", () => {
		const mockState = null;
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result } = renderHook(() => useLogout());

		// Test dispatch with form data (even though logout doesn't need it)
		const formData = new FormData();
		result.current.dispatch(formData);

		expect(mockDispatch).toHaveBeenCalledWith(formData);
	});

	it("should work without form data", () => {
		const mockState = null;
		const mockDispatch = jest.fn();
		const mockIsPending = false;

		mockUseActionState.mockReturnValue([
			mockState,
			mockDispatch,
			mockIsPending,
		]);

		const { result } = renderHook(() => useLogout());

		// Test dispatch without form data
		result.current.dispatch();

		expect(mockDispatch).toHaveBeenCalledWith();
	});

	it("should handle state transitions", () => {
		const mockDispatch = jest.fn();

		// Initial state
		mockUseActionState.mockReturnValue([null, mockDispatch, false]);
		const { result, rerender } = renderHook(() => useLogout());

		expect(result.current.state).toBeNull();
		expect(result.current.isPending).toBe(false);

		// Pending state
		mockUseActionState.mockReturnValue([null, mockDispatch, true]);
		rerender();

		expect(result.current.isPending).toBe(true);

		// Back to idle state (successful logout)
		mockUseActionState.mockReturnValue([null, mockDispatch, false]);
		rerender();

		expect(result.current.state).toBeNull();
		expect(result.current.isPending).toBe(false);
	});
});
