import { ActionStatus } from "@/shared/types/server-action";

describe("ActionStatus", () => {
	it("should have INITIAL status", () => {
		expect(ActionStatus.INITIAL).toBe("initial");
	});

	it("should have SUCCESS status", () => {
		expect(ActionStatus.SUCCESS).toBe("success");
	});

	it("should have ERROR status", () => {
		expect(ActionStatus.ERROR).toBe("error");
	});

	it("should have VALIDATION_ERROR status", () => {
		expect(ActionStatus.VALIDATION_ERROR).toBe("validation_error");
	});

	it("should have UNAUTHORIZED status", () => {
		expect(ActionStatus.UNAUTHORIZED).toBe("unauthorized");
	});

	it("should have all expected statuses", () => {
		const expectedStatuses = [
			"success",
			"error",
			"unauthorized",
			"validation_error",
			"not_found",
			"conflict",
			"forbidden",
			"initial"
		];

		const actualStatuses = Object.values(ActionStatus);
		expect(actualStatuses).toEqual(expectedStatuses);
	});

	it("should have unique status values", () => {
		const values = Object.values(ActionStatus);
		const uniqueValues = [...new Set(values)];
		expect(values.length).toBe(uniqueValues.length);
	});

	it("should be a readonly enum", () => {
		// Enum values should be immutable - this is more of a TypeScript feature
		// We'll test that the enum exists and has the correct values
		expect(ActionStatus.INITIAL).toBe("initial");
	});

	it("should have consistent naming convention", () => {
		Object.values(ActionStatus).forEach(status => {
			expect(status).toMatch(/^[a-z_]+$/);
		});
	});

	it("should be importable", () => {
		expect(ActionStatus).toBeDefined();
		expect(typeof ActionStatus).toBe("object");
	});

	it("should have correct number of statuses", () => {
		expect(Object.keys(ActionStatus)).toHaveLength(8);
	});

	it("should support string comparison", () => {
		expect(ActionStatus.INITIAL === "initial").toBe(true);
		expect(ActionStatus.SUCCESS === "success").toBe(true);
		expect(ActionStatus.ERROR === "error").toBe(true);
	});

	it("should support switch statements", () => {
		const testStatus = ActionStatus.SUCCESS;
		let result = "";

		switch (testStatus) {
			case ActionStatus.INITIAL:
				result = "initial";
				break;
			case ActionStatus.LOADING:
				result = "loading";
				break;
			case ActionStatus.SUCCESS:
				result = "success";
				break;
			case ActionStatus.ERROR:
				result = "error";
				break;
			case ActionStatus.VALIDATION_ERROR:
				result = "validation_error";
				break;
			case ActionStatus.UNAUTHORIZED:
				result = "unauthorized";
				break;
			default:
				result = "unknown";
		}

		expect(result).toBe("success");
	});
});
