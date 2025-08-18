import { ActionState, ActionStatus } from "@/shared/types/server-action";
import { createToastCallbacks } from "@/shared/utils/create-toast-callbacks/create-toast-callbacks";
import { toast } from "sonner";

// Mock sonner
jest.mock("sonner", () => ({
	toast: {
		dismiss: jest.fn(),
		success: jest.fn(),
		error: jest.fn(),
		loading: jest.fn().mockReturnValue("toast-id"),
	},
}));

const mockToast = toast as jest.Mocked<typeof toast>;

describe("createToastCallbacks", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should create callbacks with default options", () => {
		const callbacks = createToastCallbacks({});

		expect(callbacks).toHaveProperty("onStart");
		expect(callbacks).toHaveProperty("onEnd");
		expect(callbacks).toHaveProperty("onSuccess");
		expect(callbacks).toHaveProperty("onError");
	});

	describe("onStart callback", () => {
		it("should show loading toast with default message", () => {
			const callbacks = createToastCallbacks({});

			const result = callbacks.onStart();

			expect(mockToast.loading).toHaveBeenCalledWith("Chargement...");
			expect(result).toBe("toast-id");
		});

		it("should show loading toast with custom message", () => {
			const callbacks = createToastCallbacks({
				loadingMessage: "Custom loading message",
			});

			const result = callbacks.onStart();

			expect(mockToast.loading).toHaveBeenCalledWith("Custom loading message");
			expect(result).toBe("toast-id");
		});
	});

	describe("onEnd callback", () => {
		it("should dismiss toast with given reference", () => {
			const callbacks = createToastCallbacks({});

			callbacks.onEnd("toast-id");

			expect(mockToast.dismiss).toHaveBeenCalledWith("toast-id");
		});
	});

	describe("onSuccess callback", () => {
		const successResult: ActionState = {
			status: ActionStatus.SUCCESS,
			data: { id: 1, name: "Test" },
			message: "Success message",
		};

		it("should call custom onSuccess if provided", () => {
			const customOnSuccess = jest.fn();
			const callbacks = createToastCallbacks({ onSuccess: customOnSuccess });

			callbacks.onSuccess(successResult);

			expect(customOnSuccess).toHaveBeenCalledWith(successResult);
			expect(mockToast.dismiss).toHaveBeenCalled();
		});

		it("should show default success toast if no custom callback", () => {
			const callbacks = createToastCallbacks({});

			callbacks.onSuccess(successResult);

			expect(mockToast.dismiss).toHaveBeenCalled();
			expect(mockToast.success).toHaveBeenCalledWith("Success message", {
				action: undefined,
			});
		});

		it("should include action in success toast when provided", () => {
			const mockAction = {
				label: "View",
				onClick: jest.fn(),
			};

			const callbacks = createToastCallbacks({ action: mockAction });

			callbacks.onSuccess(successResult);

			expect(mockToast.success).toHaveBeenCalledWith("Success message", {
				action: {
					label: "View",
					onClick: expect.any(Function),
				},
			});
		});

		it("should not show toast if no message in result", () => {
			const resultWithoutMessage: ActionState = {
				status: ActionStatus.SUCCESS,
				data: { id: 1 },
			};

			const callbacks = createToastCallbacks({});

			callbacks.onSuccess(resultWithoutMessage);

			expect(mockToast.success).not.toHaveBeenCalled();
		});

		it("should handle action click correctly", () => {
			const mockActionClick = jest.fn();
			const mockAction = {
				label: "View",
				onClick: mockActionClick,
			};

			const callbacks = createToastCallbacks({ action: mockAction });

			callbacks.onSuccess(successResult);

			// Get the action function that was passed to toast.success
			const successCall = mockToast.success.mock.calls[0];
			const actionInToast = successCall[1]?.action;

			// Call the action function
			actionInToast?.onClick();

			expect(mockActionClick).toHaveBeenCalledWith(successResult.data);
		});
	});

	describe("onError callback", () => {
		const errorResult: ActionState = {
			status: ActionStatus.ERROR,
			message: "Error message",
		};

		it("should call custom onError if provided", () => {
			const customOnError = jest.fn();
			const callbacks = createToastCallbacks({ onError: customOnError });

			callbacks.onError(errorResult);

			expect(customOnError).toHaveBeenCalledWith(errorResult);
			expect(mockToast.dismiss).toHaveBeenCalled();
		});

		it("should not show error toast by default (commented out)", () => {
			const callbacks = createToastCallbacks({});

			callbacks.onError(errorResult);

			expect(mockToast.error).not.toHaveBeenCalled();
		});

		it("should handle error without message", () => {
			const errorWithoutMessage: ActionState = {
				status: ActionStatus.ERROR,
			};

			const callbacks = createToastCallbacks({});

			expect(() => callbacks.onError(errorWithoutMessage)).not.toThrow();
		});
	});

	describe("integration with validation errors", () => {
		it("should handle validation error results", () => {
			const validationResult: ActionState = {
				status: ActionStatus.VALIDATION_ERROR,
				message: "Validation failed",
				validationErrors: [{ field: "name", message: "Required" }],
			};

			const customOnError = jest.fn();
			const callbacks = createToastCallbacks({ onError: customOnError });

			callbacks.onError(validationResult);

			expect(customOnError).toHaveBeenCalledWith(validationResult);
		});
	});
});
