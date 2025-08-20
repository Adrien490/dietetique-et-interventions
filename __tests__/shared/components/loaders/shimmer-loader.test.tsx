import { ShimmerLoader } from "@/shared/components/loaders/shimmer-loader";
import { render, screen } from "@testing-library/react";

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

describe("ShimmerLoader", () => {
	it("should render with default props", () => {
		const { container } = render(<ShimmerLoader />);

		const shimmerContainer = container.querySelector(
			".relative.overflow-hidden.rounded-md"
		);
		expect(shimmerContainer).toBeInTheDocument();
		expect(shimmerContainer).toHaveClass("h-2", "w-20");
	});

	it("should render with text", () => {
		const { container } = render(<ShimmerLoader text="Loading content..." />);

		const text = screen.getByText("Loading content...");
		expect(text).toBeInTheDocument();

		const shimmerContainer = container.querySelector(
			".relative.overflow-hidden.rounded-md"
		);
		expect(shimmerContainer).toBeInTheDocument();
	});

	it("should apply custom className", () => {
		const { container } = render(<ShimmerLoader className="custom-class" />);

		const shimmerContainer = container.querySelector(".custom-class");
		expect(shimmerContainer).toBeInTheDocument();
		expect(shimmerContainer).toHaveClass("custom-class");
	});

	it("should handle different sizes", () => {
		const { rerender, container } = render(<ShimmerLoader size="sm" />);
		let shimmerContainer = container.querySelector(
			".relative.overflow-hidden.rounded-md"
		);
		expect(shimmerContainer).toBeInTheDocument();

		rerender(<ShimmerLoader size="md" />);
		shimmerContainer = container.querySelector(
			".relative.overflow-hidden.rounded-md"
		);
		expect(shimmerContainer).toBeInTheDocument();

		rerender(<ShimmerLoader size="lg" />);
		shimmerContainer = container.querySelector(
			".relative.overflow-hidden.rounded-md"
		);
		expect(shimmerContainer).toBeInTheDocument();
	});

	it("should handle different colors", () => {
		const { rerender, container } = render(<ShimmerLoader color="primary" />);
		let shimmerContainer = container.querySelector(
			".relative.overflow-hidden.rounded-md"
		);
		expect(shimmerContainer).toBeInTheDocument();

		rerender(<ShimmerLoader color="secondary" />);
		shimmerContainer = container.querySelector(
			".relative.overflow-hidden.rounded-md"
		);
		expect(shimmerContainer).toBeInTheDocument();

		rerender(<ShimmerLoader color="success" />);
		shimmerContainer = container.querySelector(
			".relative.overflow-hidden.rounded-md"
		);
		expect(shimmerContainer).toBeInTheDocument();
	});

	it("should handle custom width", () => {
		const { container } = render(<ShimmerLoader width="w-32" />);

		const shimmerContainer = container.querySelector(
			".relative.overflow-hidden.rounded-md"
		);
		expect(shimmerContainer).toBeInTheDocument();
		expect(shimmerContainer).toHaveClass("w-32");
	});

	it("should render motion div for animation", () => {
		const { container } = render(<ShimmerLoader />);

		const motionDiv = container.querySelector('[data-motion="true"]');
		expect(motionDiv).toBeInTheDocument();
		expect(motionDiv).toHaveAttribute("data-motion", "true");
	});

	it("should handle all prop combinations", () => {
		const { container } = render(
			<ShimmerLoader
				size="lg"
				color="success"
				width="w-40"
				text="Custom loading text"
				className="test-class"
			/>
		);

		const text = screen.getByText("Custom loading text");
		expect(text).toBeInTheDocument();

		const shimmerContainer = container.querySelector(".test-class");
		expect(shimmerContainer).toBeInTheDocument();
	});

	it("should render different layout with text", () => {
		const { rerender, container } = render(<ShimmerLoader />);

		// Without text - single loader
		let shimmerContainer = container.querySelector(
			".relative.overflow-hidden.rounded-md"
		);
		expect(shimmerContainer).toBeInTheDocument();

		// With text - different layout
		rerender(<ShimmerLoader text="Loading..." />);
		const text = screen.getByText("Loading...");
		expect(text).toBeInTheDocument();

		shimmerContainer = container.querySelector(
			".relative.overflow-hidden.rounded-md"
		);
		expect(shimmerContainer).toBeInTheDocument();
	});
});
