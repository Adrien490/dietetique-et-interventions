import { Slider } from "@/shared/components/ui/slider";
import { render, screen } from "@testing-library/react";

describe("Slider", () => {
	it("should render slider component", () => {
		render(<Slider defaultValue={[50]} max={100} step={1} />);

		const slider = screen.getByRole("slider");
		expect(slider).toBeInTheDocument();
	});

	it("should render with default value", () => {
		render(<Slider defaultValue={[75]} max={100} step={1} />);

		const slider = screen.getByRole("slider");
		expect(slider).toHaveAttribute("aria-valuenow", "75");
	});

	it("should render with correct attributes", () => {
		render(<Slider defaultValue={[25]} max={100} step={1} />);

		const slider = screen.getByRole("slider");
		expect(slider).toHaveAttribute("aria-valuemin", "0");
		expect(slider).toHaveAttribute("aria-valuemax", "100");
	});
});
