import { useIsScrolled } from "@/shared/hooks/use-is-scrolled";
import { act, renderHook } from "@testing-library/react";

// Mock window.scrollY
Object.defineProperty(window, "scrollY", {
	writable: true,
	value: 0,
});

describe("useIsScrolled", () => {
	beforeEach(() => {
		// Reset scroll position
		Object.defineProperty(window, "scrollY", {
			writable: true,
			value: 0,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return false when not scrolled", () => {
		const { result } = renderHook(() => useIsScrolled());

		expect(result.current).toBe(false);
	});

	it("should return false when scrolled less than default threshold", () => {
		Object.defineProperty(window, "scrollY", {
			writable: true,
			value: 5,
		});

		const { result } = renderHook(() => useIsScrolled());

		expect(result.current).toBe(false);
	});

	it("should return true when scrolled past default threshold", () => {
		Object.defineProperty(window, "scrollY", {
			writable: true,
			value: 15,
		});

		const { result } = renderHook(() => useIsScrolled());

		expect(result.current).toBe(true);
	});

	it("should use custom threshold", () => {
		Object.defineProperty(window, "scrollY", {
			writable: true,
			value: 25,
		});

		const { result } = renderHook(() => useIsScrolled(30));

		expect(result.current).toBe(false);

		act(() => {
			Object.defineProperty(window, "scrollY", {
				writable: true,
				value: 35,
			});

			// Trigger scroll event
			const scrollEvent = new Event("scroll");
			window.dispatchEvent(scrollEvent);
		});

		expect(result.current).toBe(true);
	});

	it("should update when scrolling", () => {
		const { result } = renderHook(() => useIsScrolled());

		// Initially not scrolled
		expect(result.current).toBe(false);

		// Simulate scroll event
		act(() => {
			Object.defineProperty(window, "scrollY", {
				writable: true,
				value: 20,
			});

			// Trigger scroll event
			const scrollEvent = new Event("scroll");
			window.dispatchEvent(scrollEvent);
		});

		expect(result.current).toBe(true);
	});

	it("should handle exactly threshold boundary", () => {
		Object.defineProperty(window, "scrollY", {
			writable: true,
			value: 10, // Exactly at default threshold
		});

		const { result } = renderHook(() => useIsScrolled());

		expect(result.current).toBe(false); // Should be false when equal to threshold
	});

	it("should cleanup scroll listener on unmount", () => {
		const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

		const { unmount } = renderHook(() => useIsScrolled());

		unmount();

		expect(removeEventListenerSpy).toHaveBeenCalledWith(
			"scroll",
			expect.any(Function)
		);

		removeEventListenerSpy.mockRestore();
	});

	it("should setup scroll listener with passive option", () => {
		const addEventListenerSpy = jest.spyOn(window, "addEventListener");

		renderHook(() => useIsScrolled());

		expect(addEventListenerSpy).toHaveBeenCalledWith(
			"scroll",
			expect.any(Function),
			{ passive: true }
		);

		addEventListenerSpy.mockRestore();
	});
});
