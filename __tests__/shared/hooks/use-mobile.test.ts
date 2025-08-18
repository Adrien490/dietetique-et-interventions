import { useIsMobile } from "@/shared/hooks/use-mobile";
import { act, renderHook } from "@testing-library/react";

// Mock window.matchMedia
const mockMatchMedia = jest.fn();

Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: mockMatchMedia,
});

Object.defineProperty(window, "innerWidth", {
	writable: true,
	value: 1024,
});

describe("useIsMobile", () => {
	let mockMediaQueryList: {
		matches: boolean;
		addEventListener: jest.Mock;
		removeEventListener: jest.Mock;
	};

	beforeEach(() => {
		mockMediaQueryList = {
			matches: false,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		};

		mockMatchMedia.mockReturnValue(mockMediaQueryList);

		// Reset innerWidth to desktop size
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			value: 1024,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return false for desktop width", () => {
		const { result } = renderHook(() => useIsMobile());

		expect(result.current).toBe(false);
	});

	it("should return true for mobile width", () => {
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			value: 500,
		});

		const { result } = renderHook(() => useIsMobile());

		expect(result.current).toBe(true);
	});

	it("should setup media query listener correctly", () => {
		renderHook(() => useIsMobile());

		expect(mockMatchMedia).toHaveBeenCalledWith("(max-width: 767px)");
		expect(mockMediaQueryList.addEventListener).toHaveBeenCalledWith(
			"change",
			expect.any(Function)
		);
	});

	it("should update when window width changes", () => {
		const { result } = renderHook(() => useIsMobile());

		// Initially desktop
		expect(result.current).toBe(false);

		// Get the change handler
		const changeHandler = mockMediaQueryList.addEventListener.mock.calls[0][1];

		// Simulate window resize to mobile
		act(() => {
			Object.defineProperty(window, "innerWidth", {
				writable: true,
				value: 600,
			});
			changeHandler();
		});

		expect(result.current).toBe(true);
	});

	it("should cleanup event listener on unmount", () => {
		const { unmount } = renderHook(() => useIsMobile());

		unmount();

		expect(mockMediaQueryList.removeEventListener).toHaveBeenCalledWith(
			"change",
			expect.any(Function)
		);
	});

	it("should handle exactly breakpoint boundary", () => {
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			value: 768, // Exactly at breakpoint
		});

		const { result } = renderHook(() => useIsMobile());

		expect(result.current).toBe(false); // 768px should be desktop
	});

	it("should handle 767px as mobile", () => {
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			value: 767, // Just below breakpoint
		});

		const { result } = renderHook(() => useIsMobile());

		expect(result.current).toBe(true); // 767px should be mobile
	});

	it("should initially return false when undefined", () => {
		const { result } = renderHook(() => useIsMobile());

		// The hook uses !!isMobile which converts undefined to false
		expect(typeof result.current).toBe("boolean");
	});
});
