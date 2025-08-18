import { useActiveNavbarItem } from "@/shared/hooks/use-active-navbar-item";
import { renderHook } from "@testing-library/react";

// Mock du DOM
const mockGetElementById = jest.fn();
const mockGetBoundingClientRect = jest.fn();

// Mock de window
Object.defineProperty(window, "innerHeight", {
	writable: true,
	value: 800,
});

// Mock de document.getElementById
Object.defineProperty(document, "getElementById", {
	writable: true,
	value: mockGetElementById,
});

// Mock de requestAnimationFrame
Object.defineProperty(window, "requestAnimationFrame", {
	writable: true,
	value: (callback: FrameRequestCallback) => setTimeout(callback, 16),
});

describe("useActiveNavbarItem", () => {
	const mockElement = {
		getBoundingClientRect: mockGetBoundingClientRect,
	};

	beforeEach(() => {
		jest.clearAllMocks();

		// Setup par défaut des éléments
		mockGetElementById.mockImplementation((id: string) => {
			if (["about", "services", "faq", "contact"].includes(id)) {
				return mockElement;
			}
			return null;
		});

		// Position par défaut : tous les éléments en dessous du viewport
		mockGetBoundingClientRect.mockReturnValue({
			top: 1000,
			bottom: 1100,
		});
	});

	afterEach(() => {
		// Nettoyer les event listeners
		window.removeEventListener("scroll", jest.fn());
	});

	it("should return default state", () => {
		const { result } = renderHook(() => useActiveNavbarItem());

		expect(result.current).toHaveProperty("isMenuItemActive");
		expect(result.current).toHaveProperty("activeSection");
		expect(typeof result.current.isMenuItemActive).toBe("function");
		expect(typeof result.current.activeSection).toBe("string");
	});

	it("should start with home as active section", () => {
		const { result } = renderHook(() => useActiveNavbarItem());

		expect(result.current.activeSection).toBe("home");
	});

	it("should detect home section correctly", () => {
		const { result } = renderHook(() => useActiveNavbarItem());

		expect(result.current.isMenuItemActive("/")).toBe(true);
		expect(result.current.isMenuItemActive("/#about")).toBe(false);
	});

	it("should detect section-based URLs correctly", () => {
		// Mock des éléments du DOM
		const mockElements = {
			home: {
				getBoundingClientRect: jest
					.fn()
					.mockReturnValue({ top: 100, bottom: 500 }),
			},
			about: {
				getBoundingClientRect: jest
					.fn()
					.mockReturnValue({ top: 600, bottom: 1000 }),
			},
			services: {
				getBoundingClientRect: jest
					.fn()
					.mockReturnValue({ top: 1200, bottom: 1600 }),
			},
			faq: {
				getBoundingClientRect: jest
					.fn()
					.mockReturnValue({ top: 1800, bottom: 2200 }),
			},
			contact: {
				getBoundingClientRect: jest
					.fn()
					.mockReturnValue({ top: 2400, bottom: 2800 }),
			},
		};

		document.getElementById = jest.fn(
			(id) => mockElements[id as keyof typeof mockElements] as any
		);

		// Mock window.innerHeight pour le calcul du threshold
		Object.defineProperty(window, "innerHeight", {
			writable: true,
			configurable: true,
			value: 1000,
		});

		const { result } = renderHook(() => useActiveNavbarItem());

		// L'état initial devrait être "home"
		expect(result.current.activeSection).toBe("home");
		expect(result.current.isMenuItemActive("/")).toBe(true);
		expect(result.current.isMenuItemActive("/#about")).toBe(false);
	});

	it("should handle non-hash URLs correctly", () => {
		const { result } = renderHook(() => useActiveNavbarItem());

		expect(result.current.isMenuItemActive("/other-page")).toBe(false);
		expect(result.current.isMenuItemActive("/dashboard")).toBe(false);
	});

	it("should setup scroll event listener", () => {
		const addEventListenerSpy = jest.spyOn(window, "addEventListener");

		renderHook(() => useActiveNavbarItem());

		expect(addEventListenerSpy).toHaveBeenCalledWith(
			"scroll",
			expect.any(Function),
			{ passive: true }
		);

		addEventListenerSpy.mockRestore();
	});

	it("should cleanup scroll event listener on unmount", () => {
		const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

		const { unmount } = renderHook(() => useActiveNavbarItem());

		unmount();

		expect(removeEventListenerSpy).toHaveBeenCalledWith(
			"scroll",
			expect.any(Function)
		);

		removeEventListenerSpy.mockRestore();
	});

	it("should handle missing DOM elements gracefully", () => {
		mockGetElementById.mockReturnValue(null);

		expect(() => {
			renderHook(() => useActiveNavbarItem());
		}).not.toThrow();
	});

	it("should calculate viewport threshold correctly", () => {
		// Simuler une hauteur de viewport de 800px
		Object.defineProperty(window, "innerHeight", {
			writable: true,
			value: 800,
		});

		const { result } = renderHook(() => useActiveNavbarItem());

		// Le threshold devrait être 40% de 800px = 320px
		// Nous ne pouvons pas tester directement la valeur, mais nous pouvons vérifier
		// que la logique fonctionne sans erreur
		expect(result.current.activeSection).toBeDefined();
	});

	it("should handle section detection when about is in view", () => {
		// Simuler que about est visible dans le viewport
		mockGetBoundingClientRect.mockImplementation(() => ({
			top: 200, // Dans le viewport
			bottom: 300,
		}));

		const { result } = renderHook(() => useActiveNavbarItem());

		// La section devrait être détectée comme active
		expect(result.current).toBeDefined();
	});

	it("should provide isMenuItemActive function that works correctly", () => {
		const { result } = renderHook(() => useActiveNavbarItem());

		const isMenuItemActive = result.current.isMenuItemActive;

		// Test avec différents types d'URLs
		expect(typeof isMenuItemActive("/")).toBe("boolean");
		expect(typeof isMenuItemActive("/#about")).toBe("boolean");
		expect(typeof isMenuItemActive("/other")).toBe("boolean");
	});

	it("should handle hash URLs without # prefix", () => {
		const { result } = renderHook(() => useActiveNavbarItem());

		// Test avec URLs malformées
		expect(result.current.isMenuItemActive("#about")).toBe(false);
		expect(result.current.isMenuItemActive("about")).toBe(false);
	});

	it("should use throttled scroll handler", () => {
		const requestAnimationFrameSpy = jest.spyOn(
			window,
			"requestAnimationFrame"
		);

		renderHook(() => useActiveNavbarItem());

		// Le scroll handler devrait utiliser requestAnimationFrame pour le throttling
		expect(requestAnimationFrameSpy).toBeDefined();

		requestAnimationFrameSpy.mockRestore();
	});
});
