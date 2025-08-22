import { CreateToastCallbacksOptions } from "@/shared/utils/create-toast-callbacks/types";

describe("CreateToastCallbacks Types", () => {
	describe("CreateToastCallbacksOptions", () => {
		it("should have optional loadingMessage property", () => {
			const options: CreateToastCallbacksOptions = {
				loadingMessage: "Loading...",
			};

			expect(options.loadingMessage).toBe("Loading...");
			expect(options.action).toBeUndefined();
		});

		it("should have optional action property", () => {
			const mockOnClick = jest.fn();
			const options: CreateToastCallbacksOptions = {
				action: {
					label: "Retry",
					onClick: mockOnClick,
				},
			};

			expect(options.action).toBeDefined();
			expect(options.action?.label).toBe("Retry");
			expect(options.action?.onClick).toBe(mockOnClick);
			expect(options.loadingMessage).toBeUndefined();
		});

		it("should have both properties", () => {
			const mockOnClick = jest.fn();
			const options: CreateToastCallbacksOptions = {
				loadingMessage: "Processing...",
				action: {
					label: "Cancel",
					onClick: mockOnClick,
				},
			};

			expect(options.loadingMessage).toBe("Processing...");
			expect(options.action).toBeDefined();
			expect(options.action?.label).toBe("Cancel");
			expect(options.action?.onClick).toBe(mockOnClick);
		});

		it("should have empty object as valid", () => {
			const options: CreateToastCallbacksOptions = {};

			expect(options.loadingMessage).toBeUndefined();
			expect(options.action).toBeUndefined();
		});

		it("should accept different loading messages", () => {
			const messages = [
				"Loading...",
				"Processing...",
				"Please wait...",
				"Saving...",
				"Updating...",
			];

			messages.forEach(message => {
				const options: CreateToastCallbacksOptions = {
					loadingMessage: message,
				};

				expect(options.loadingMessage).toBe(message);
			});
		});

		it("should accept different action labels", () => {
			const labels = ["Retry", "Cancel", "Dismiss", "Close", "OK"];

			labels.forEach(label => {
				const mockOnClick = jest.fn();
				const options: CreateToastCallbacksOptions = {
					action: {
						label,
						onClick: mockOnClick,
					},
				};

				expect(options.action?.label).toBe(label);
				expect(options.action?.onClick).toBe(mockOnClick);
			});
		});

		it("should accept different onClick functions", () => {
			const mockOnClick1 = jest.fn();
			const mockOnClick2 = jest.fn();
			const mockOnClick3 = jest.fn();

			const options1: CreateToastCallbacksOptions = {
				action: {
					label: "Action 1",
					onClick: mockOnClick1,
				},
			};

			const options2: CreateToastCallbacksOptions = {
				action: {
					label: "Action 2",
					onClick: mockOnClick2,
				},
			};

			const options3: CreateToastCallbacksOptions = {
				action: {
					label: "Action 3",
					onClick: mockOnClick3,
				},
			};

			expect(options1.action?.onClick).toBe(mockOnClick1);
			expect(options2.action?.onClick).toBe(mockOnClick2);
			expect(options3.action?.onClick).toBe(mockOnClick3);
		});
	});
});



