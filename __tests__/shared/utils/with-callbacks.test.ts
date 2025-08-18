import { ActionState, ActionStatus } from "@/shared/types/server-action";
import { withCallbacks } from "@/shared/utils/with-callbacks/with-callbacks";
import { z } from "zod";

describe("withCallbacks", () => {
	const mockSchema = z.object({
		name: z.string(),
	});

	type MockData = { id: number; name: string };
	type MockResult = ActionState<MockData, typeof mockSchema>;

	const mockSuccessResult: MockResult = {
		status: ActionStatus.SUCCESS,
		data: { id: 1, name: "Test" },
		message: "Success",
	};

	const mockErrorResult: MockResult = {
		status: ActionStatus.ERROR,
		message: "Error occurred",
	};

	it("should call onStart callback when function begins", async () => {
		const mockFn = jest.fn().mockResolvedValue(mockSuccessResult);
		const onStart = jest.fn().mockReturnValue("toast-ref");
		const onEnd = jest.fn();

		const wrappedFn = withCallbacks(mockFn, { onStart, onEnd });

		await wrappedFn("arg1", "arg2");

		expect(onStart).toHaveBeenCalledTimes(1);
		expect(mockFn).toHaveBeenCalledWith("arg1", "arg2");
	});

	it("should call onEnd with reference from onStart", async () => {
		const mockFn = jest.fn().mockResolvedValue(mockSuccessResult);
		const onStart = jest.fn().mockReturnValue("toast-ref");
		const onEnd = jest.fn();

		const wrappedFn = withCallbacks(mockFn, { onStart, onEnd });

		await wrappedFn();

		expect(onEnd).toHaveBeenCalledWith("toast-ref");
	});

	it("should not call onEnd if onStart returns no reference", async () => {
		const mockFn = jest.fn().mockResolvedValue(mockSuccessResult);
		const onStart = jest.fn().mockReturnValue(undefined);
		const onEnd = jest.fn();

		const wrappedFn = withCallbacks(mockFn, { onStart, onEnd });

		await wrappedFn();

		expect(onEnd).not.toHaveBeenCalled();
	});

	it("should call onSuccess callback when action succeeds", async () => {
		const mockFn = jest.fn().mockResolvedValue(mockSuccessResult);
		const onSuccess = jest.fn();
		const onError = jest.fn();

		const wrappedFn = withCallbacks(mockFn, { onSuccess, onError });

		const result = await wrappedFn();

		expect(onSuccess).toHaveBeenCalledWith(mockSuccessResult);
		expect(onError).not.toHaveBeenCalled();
		expect(result).toBe(mockSuccessResult);
	});

	it("should call onError callback when action fails", async () => {
		const mockFn = jest.fn().mockResolvedValue(mockErrorResult);
		const onSuccess = jest.fn();
		const onError = jest.fn();

		const wrappedFn = withCallbacks(mockFn, { onSuccess, onError });

		const result = await wrappedFn();

		expect(onError).toHaveBeenCalledWith(mockErrorResult);
		expect(onSuccess).not.toHaveBeenCalled();
		expect(result).toBe(mockErrorResult);
	});

	it("should handle VALIDATION_ERROR status as error", async () => {
		const validationErrorResult: MockResult = {
			status: ActionStatus.VALIDATION_ERROR,
			message: "Validation failed",
			validationErrors: [{ field: "name", message: "Required" }],
		};

		const mockFn = jest.fn().mockResolvedValue(validationErrorResult);
		const onSuccess = jest.fn();
		const onError = jest.fn();

		const wrappedFn = withCallbacks(mockFn, { onSuccess, onError });

		await wrappedFn();

		expect(onError).toHaveBeenCalledWith(validationErrorResult);
		expect(onSuccess).not.toHaveBeenCalled();
	});

	it("should work without any callbacks", async () => {
		const mockFn = jest.fn().mockResolvedValue(mockSuccessResult);

		const wrappedFn = withCallbacks(mockFn, {});

		const result = await wrappedFn();

		expect(result).toBe(mockSuccessResult);
		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it("should preserve function arguments", async () => {
		const mockFn = jest.fn().mockResolvedValue(mockSuccessResult);
		const wrappedFn = withCallbacks(mockFn, {});

		await wrappedFn("arg1", 42, { key: "value" });

		expect(mockFn).toHaveBeenCalledWith("arg1", 42, { key: "value" });
	});

	it("should handle function rejection", async () => {
		const error = new Error("Function failed");
		const mockFn = jest.fn().mockRejectedValue(error);
		const onError = jest.fn();

		const wrappedFn = withCallbacks(mockFn, { onError });

		await expect(wrappedFn()).rejects.toThrow("Function failed");
		expect(onError).not.toHaveBeenCalled(); // onError only called for resolved error states
	});
});
