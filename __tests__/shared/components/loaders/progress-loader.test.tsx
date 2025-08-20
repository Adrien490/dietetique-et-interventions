import { ProgressLoader } from "@/shared/components/loaders/progress-loader";
import { render } from "@testing-library/react";

// Mock framer-motion
jest.mock("framer-motion", () => ({
	motion: {
		div: ({ children, className, ...props }: any) => (
			<div className={className} data-motion="true" {...props}>
				{children}
			</div>
		),
	},
}));

describe("ProgressLoader", () => {
	it("should render with default props", () => {
		const { container } = render(<ProgressLoader />);

		const progressContainer = container.querySelector(
			".relative.w-full.overflow-hidden.rounded-full"
		);
		expect(progressContainer).toBeInTheDocument();
		expect(progressContainer).toHaveClass("bg-muted/50");
	});

	it("should apply custom className", () => {
		const { container } = render(<ProgressLoader className="custom-class" />);

		const progressContainer = container.querySelector(".custom-class");
		expect(progressContainer).toBeInTheDocument();
		expect(progressContainer).toHaveClass("custom-class");
	});

	it("should handle different sizes", () => {
		const { rerender, container } = render(<ProgressLoader size="sm" />);
		let progressContainer = container.querySelector(
			".relative.w-full.overflow-hidden.rounded-full"
		);
		expect(progressContainer).toBeInTheDocument();

		rerender(<ProgressLoader size="md" />);
		progressContainer = container.querySelector(
			".relative.w-full.overflow-hidden.rounded-full"
		);
		expect(progressContainer).toBeInTheDocument();

		rerender(<ProgressLoader size="lg" />);
		progressContainer = container.querySelector(
			".relative.w-full.overflow-hidden.rounded-full"
		);
		expect(progressContainer).toBeInTheDocument();
	});

	it("should handle different colors", () => {
		const { rerender, container } = render(<ProgressLoader color="primary" />);
		let progressContainer = container.querySelector(
			".relative.w-full.overflow-hidden.rounded-full"
		);
		expect(progressContainer).toBeInTheDocument();

		rerender(<ProgressLoader color="secondary" />);
		progressContainer = container.querySelector(
			".relative.w-full.overflow-hidden.rounded-full"
		);
		expect(progressContainer).toBeInTheDocument();

		rerender(<ProgressLoader color="success" />);
		progressContainer = container.querySelector(
			".relative.w-full.overflow-hidden.rounded-full"
		);
		expect(progressContainer).toBeInTheDocument();
	});

	it("should render motion div for animation", () => {
		const { container } = render(<ProgressLoader />);

		const motionDiv = container.querySelector('[data-motion="true"]');
		expect(motionDiv).toBeInTheDocument();
		expect(motionDiv).toHaveAttribute("data-motion", "true");
	});

	it("should handle all prop combinations", () => {
		const { container } = render(
			<ProgressLoader size="lg" color="success" className="test-class" />
		);

		const progressContainer = container.querySelector(".test-class");
		expect(progressContainer).toBeInTheDocument();
		expect(progressContainer).toHaveClass("test-class");
	});
});
