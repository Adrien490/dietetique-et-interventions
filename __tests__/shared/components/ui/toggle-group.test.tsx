import {
	ToggleGroup,
	ToggleGroupItem,
} from "@/shared/components/ui/toggle-group";
import { render, screen } from "@testing-library/react";

describe("ToggleGroup", () => {
	it("should render toggle group component", () => {
		render(
			<ToggleGroup type="single">
				<ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
				<ToggleGroupItem value="item2">Item 2</ToggleGroupItem>
			</ToggleGroup>
		);

		expect(screen.getByText("Item 1")).toBeInTheDocument();
		expect(screen.getByText("Item 2")).toBeInTheDocument();
	});

	it("should render with correct structure", () => {
		render(
			<ToggleGroup type="single">
				<ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
			</ToggleGroup>
		);

		const toggleGroup = screen.getByRole("group");
		expect(toggleGroup).toBeInTheDocument();
	});

	it("should render toggle group items", () => {
		render(
			<ToggleGroup type="single">
				<ToggleGroupItem value="item1">Item 1</ToggleGroupItem>
				<ToggleGroupItem value="item2">Item 2</ToggleGroupItem>
			</ToggleGroup>
		);

		const items = screen.getAllByRole("radio");
		expect(items).toHaveLength(2);
	});
});
