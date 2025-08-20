import { Callbacks } from "@/shared/utils/with-callbacks/types";

describe("WithCallbacks Types", () => {
	describe("Callbacks", () => {
		it("should have optional onStart callback", () => {
			const mockOnStart = jest.fn(() => "reference");
			const callbacks: Callbacks<string> = {
				onStart: mockOnStart,
			};

			expect(callbacks.onStart).toBe(mockOnStart);
			expect(callbacks.onEnd).toBeUndefined();
			expect(callbacks.onSuccess).toBeUndefined();
			expect(callbacks.onError).toBeUndefined();
		});

		it("should have optional onEnd callback", () => {
			const mockOnEnd = jest.fn();
			const callbacks: Callbacks<string> = {
				onEnd: mockOnEnd,
			};

			expect(callbacks.onEnd).toBe(mockOnEnd);
			expect(callbacks.onStart).toBeUndefined();
			expect(callbacks.onSuccess).toBeUndefined();
			expect(callbacks.onError).toBeUndefined();
		});

		it("should have optional onSuccess callback", () => {
			const mockOnSuccess = jest.fn();
			const callbacks: Callbacks<string> = {
				onSuccess: mockOnSuccess,
			};

			expect(callbacks.onSuccess).toBe(mockOnSuccess);
			expect(callbacks.onStart).toBeUndefined();
			expect(callbacks.onEnd).toBeUndefined();
			expect(callbacks.onError).toBeUndefined();
		});

		it("should have optional onError callback", () => {
			const mockOnError = jest.fn();
			const callbacks: Callbacks<string> = {
				onError: mockOnError,
			};

			expect(callbacks.onError).toBe(mockOnError);
			expect(callbacks.onStart).toBeUndefined();
			expect(callbacks.onEnd).toBeUndefined();
			expect(callbacks.onSuccess).toBeUndefined();
		});

		it("should have all callbacks", () => {
			const mockOnStart = jest.fn(() => "reference");
			const mockOnEnd = jest.fn();
			const mockOnSuccess = jest.fn();
			const mockOnError = jest.fn();

			const callbacks: Callbacks<string> = {
				onStart: mockOnStart,
				onEnd: mockOnEnd,
				onSuccess: mockOnSuccess,
				onError: mockOnError,
			};

			expect(callbacks.onStart).toBe(mockOnStart);
			expect(callbacks.onEnd).toBe(mockOnEnd);
			expect(callbacks.onSuccess).toBe(mockOnSuccess);
			expect(callbacks.onError).toBe(mockOnError);
		});

		it("should have empty object as valid", () => {
			const callbacks: Callbacks<string> = {};

			expect(callbacks.onStart).toBeUndefined();
			expect(callbacks.onEnd).toBeUndefined();
			expect(callbacks.onSuccess).toBeUndefined();
			expect(callbacks.onError).toBeUndefined();
		});

		it("should work with different generic types", () => {
			const mockOnStart = jest.fn(() => 123);
			const mockOnEnd = jest.fn();
			const mockOnSuccess = jest.fn();
			const mockOnError = jest.fn();

			const callbacks: Callbacks<number, number> = {
				onStart: mockOnStart,
				onEnd: mockOnEnd,
				onSuccess: mockOnSuccess,
				onError: mockOnError,
			};

			expect(callbacks.onStart).toBe(mockOnStart);
			expect(callbacks.onEnd).toBe(mockOnEnd);
			expect(callbacks.onSuccess).toBe(mockOnSuccess);
			expect(callbacks.onError).toBe(mockOnError);
		});

		it("should work with complex types", () => {
			interface User {
				id: string;
				name: string;
			}

			const mockOnStart = jest.fn(() => ({ id: "ref-123" }));
			const mockOnEnd = jest.fn();
			const mockOnSuccess = jest.fn();
			const mockOnError = jest.fn();

			const callbacks: Callbacks<User, { id: string }> = {
				onStart: mockOnStart,
				onEnd: mockOnEnd,
				onSuccess: mockOnSuccess,
				onError: mockOnError,
			};

			expect(callbacks.onStart).toBe(mockOnStart);
			expect(callbacks.onEnd).toBe(mockOnEnd);
			expect(callbacks.onSuccess).toBe(mockOnSuccess);
			expect(callbacks.onError).toBe(mockOnError);
		});

		it("should accept functions with correct signatures", () => {
			const mockOnStart = jest.fn(() => "reference");
			const mockOnEnd = jest.fn((reference: string) => {
				console.log("End with reference:", reference);
			});
			const mockOnSuccess = jest.fn((result: string) => {
				console.log("Success with result:", result);
			});
			const mockOnError = jest.fn((result: string) => {
				console.log("Error with result:", result);
			});

			const callbacks: Callbacks<string> = {
				onStart: mockOnStart,
				onEnd: mockOnEnd,
				onSuccess: mockOnSuccess,
				onError: mockOnError,
			};

			// Test that functions can be called with correct parameters
			const reference = callbacks.onStart?.();
			callbacks.onEnd?.(reference as string);
			callbacks.onSuccess?.("success result");
			callbacks.onError?.("error result");

			expect(mockOnStart).toHaveBeenCalled();
			expect(mockOnEnd).toHaveBeenCalledWith("reference");
			expect(mockOnSuccess).toHaveBeenCalledWith("success result");
			expect(mockOnError).toHaveBeenCalledWith("error result");
		});
	});
});

