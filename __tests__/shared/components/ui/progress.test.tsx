import { Progress } from "@/shared/components/ui/progress";
import { render, screen } from "@testing-library/react";

describe("Progress Component", () => {
	it("should render progress component", () => {
		render(<Progress value={50} />);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
		expect(progress).toHaveAttribute("data-slot", "progress");
	});

	it("should render with correct value", () => {
		render(<Progress value={75} />);

		const progress = screen.getByRole("progressbar");
		const indicator = progress.querySelector(
			'[data-slot="progress-indicator"]'
		);
		expect(indicator).toHaveStyle("transform: translateX(-25%)");
	});

	it("should render progress indicator with correct transform", () => {
		render(<Progress value={60} />);

		const progress = screen.getByRole("progressbar");
		const indicator = progress.querySelector(
			'[data-slot="progress-indicator"]'
		);
		expect(indicator).toHaveStyle("transform: translateX(-40%)");
	});

	it("should handle zero value", () => {
		render(<Progress value={0} />);

		const progress = screen.getByRole("progressbar");
		const indicator = progress.querySelector(
			'[data-slot="progress-indicator"]'
		);

		expect(indicator).toHaveStyle("transform: translateX(-100%)");
	});

	it("should handle 100% value", () => {
		render(<Progress value={100} />);

		const progress = screen.getByRole("progressbar");
		const indicator = progress.querySelector(
			'[data-slot="progress-indicator"]'
		);

		expect(indicator).toHaveStyle("transform: translateX(-0%)");
	});

	it("should handle undefined value", () => {
		render(<Progress />);

		const progress = screen.getByRole("progressbar");
		const indicator = progress.querySelector(
			'[data-slot="progress-indicator"]'
		);
		expect(indicator).toHaveStyle("transform: translateX(-100%)");
	});

	it("should apply custom className", () => {
		render(<Progress value={50} className="custom-progress" />);

		const progress = screen.getByRole("progressbar");
		expect(progress).toHaveClass("custom-progress");
	});

	it("should render with default styles", () => {
		render(<Progress value={50} />);

		const progress = screen.getByRole("progressbar");
		const indicator = progress.querySelector(
			'[data-slot="progress-indicator"]'
		);

		expect(progress).toHaveClass(
			"bg-primary/20",
			"relative",
			"h-2",
			"w-full",
			"overflow-hidden",
			"rounded-full"
		);

		expect(indicator).toHaveClass(
			"bg-primary",
			"h-full",
			"w-full",
			"flex-1",
			"transition-all"
		);
	});

	it("should handle max and min values", () => {
		const { rerender } = render(<Progress value={50} max={200} />);

		let progress = screen.getByRole("progressbar");
		expect(progress).toHaveAttribute("aria-valuemax", "200");

		rerender(<Progress value={25} max={50} />);
		progress = screen.getByRole("progressbar");
		expect(progress).toHaveAttribute("aria-valuemax", "50");
	});

	it("should pass through additional props", () => {
		render(
			<Progress
				value={50}
				aria-label="Upload progress"
				data-testid="custom-progress"
			/>
		);

		const progress = screen.getByRole("progressbar");
		expect(progress).toHaveAttribute("aria-label", "Upload progress");
		expect(progress).toHaveAttribute("data-testid", "custom-progress");
	});

	it("should render progress with different values correctly", () => {
		const testValues = [0, 25, 50, 75, 100];

		testValues.forEach((value) => {
			const { unmount } = render(<Progress value={value} />);

			const progress = screen.getByRole("progressbar");
			const indicator = progress.querySelector(
				'[data-slot="progress-indicator"]'
			);

			expect(indicator).toHaveStyle(`transform: translateX(-${100 - value}%)`);

			unmount();
		});
	});
});
