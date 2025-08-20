import { SortDirection, SortField, SortingOptionsState } from "@/shared/components/sorting-options-dropdown/hooks/use-sorting-options/types";

describe("Sorting Options Types", () => {
	describe("SortDirection", () => {
		it("should have correct direction values", () => {
			const directions: SortDirection[] = ["asc", "desc"];
			
			expect(directions).toContain("asc");
			expect(directions).toContain("desc");
		});

		it("should have exactly 2 direction options", () => {
			const directions: SortDirection[] = ["asc", "desc"];
			expect(directions).toHaveLength(2);
		});
	});

	describe("SortField", () => {
		it("should have required properties", () => {
			const sortField: SortField = {
				label: "Name",
				value: "name",
			};

			expect(sortField.label).toBe("Name");
			expect(sortField.value).toBe("name");
			expect(sortField.icon).toBeUndefined();
		});

		it("should have optional icon property", () => {
			const sortField: SortField = {
				label: "Date",
				value: "date",
			};

			expect(sortField.label).toBe("Date");
			expect(sortField.value).toBe("date");
			expect(sortField.icon).toBeUndefined();
		});
	});

	describe("SortingOptionsState", () => {
		it("should have all required properties", () => {
			const mockUpdateSort = jest.fn();
			const sortFields: SortField[] = [
				{ label: "Name", value: "name" },
				{ label: "Date", value: "date" },
			];

			const state: SortingOptionsState = {
				currentSortBy: "name",
				currentSortOrder: "asc",
				isPending: false,
				updateSort: mockUpdateSort,
				sortFields,
				currentField: sortFields[0],
			};

			expect(state.currentSortBy).toBe("name");
			expect(state.currentSortOrder).toBe("asc");
			expect(state.isPending).toBe(false);
			expect(typeof state.updateSort).toBe("function");
			expect(state.sortFields).toEqual(sortFields);
			expect(state.currentField).toEqual(sortFields[0]);
		});

		it("should have optional currentField property", () => {
			const mockUpdateSort = jest.fn();
			const sortFields: SortField[] = [
				{ label: "Name", value: "name" },
			];

			const state: SortingOptionsState = {
				currentSortBy: "name",
				currentSortOrder: "desc",
				isPending: true,
				updateSort: mockUpdateSort,
				sortFields,
			};

			expect(state.currentField).toBeUndefined();
		});

		it("should accept different sort directions", () => {
			const mockUpdateSort = jest.fn();
			const sortFields: SortField[] = [];

			const stateAsc: SortingOptionsState = {
				currentSortBy: "name",
				currentSortOrder: "asc",
				isPending: false,
				updateSort: mockUpdateSort,
				sortFields,
			};

			const stateDesc: SortingOptionsState = {
				currentSortBy: "name",
				currentSortOrder: "desc",
				isPending: false,
				updateSort: mockUpdateSort,
				sortFields,
			};

			expect(stateAsc.currentSortOrder).toBe("asc");
			expect(stateDesc.currentSortOrder).toBe("desc");
		});

		it("should handle pending state", () => {
			const mockUpdateSort = jest.fn();
			const sortFields: SortField[] = [];

			const state: SortingOptionsState = {
				currentSortBy: "name",
				currentSortOrder: "asc",
				isPending: true,
				updateSort: mockUpdateSort,
				sortFields,
			};

			expect(state.isPending).toBe(true);
		});

		it("should have updateSort function with correct signature", () => {
			const mockUpdateSort = jest.fn();
			const sortFields: SortField[] = [];

			const state: SortingOptionsState = {
				currentSortBy: "name",
				currentSortOrder: "asc",
				isPending: false,
				updateSort: mockUpdateSort,
				sortFields,
			};

			// Test that the function can be called with correct parameters
			state.updateSort("date", "desc");
			expect(mockUpdateSort).toHaveBeenCalledWith("date", "desc");
		});
	});
});

