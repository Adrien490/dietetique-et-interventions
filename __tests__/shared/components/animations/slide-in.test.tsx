import { SlideIn } from "@/shared/components/animations/slide-in";
import { render, screen } from "@testing-library/react";

// Mock framer-motion
jest.mock("framer-motion", () => ({
	motion: {
		div: ({ children, ...props }: any) => (
			<div data-testid="motion-div" {...props}>
				{children}
			</div>
		),
	},
}));

describe("SlideIn", () => {
	it("should render children inside motion div", () => {
		render(
			<SlideIn>
				<p>Test content</p>
			</SlideIn>
		);

		expect(screen.getByTestId("motion-div")).toBeInTheDocument();
		expect(screen.getByText("Test content")).toBeInTheDocument();
	});

	it("should accept custom className", () => {
		render(
			<SlideIn className="custom-class">
				<p>Test content</p>
			</SlideIn>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toHaveClass("custom-class");
	});

	it("should render with default direction prop", () => {
		render(
			<SlideIn>
				<p>Test content</p>
			</SlideIn>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should accept different direction props", () => {
		const directions = ["up", "down", "left", "right"] as const;

		directions.forEach((direction) => {
			render(
				<SlideIn direction={direction}>
					<p>Test content for {direction}</p>
				</SlideIn>
			);

			expect(
				screen.getByText(`Test content for ${direction}`)
			).toBeInTheDocument();
		});
	});

	it("should handle delay and duration props", () => {
		render(
			<SlideIn delay={0.5} duration={1.2}>
				<p>Test content</p>
			</SlideIn>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should handle distance and threshold props", () => {
		render(
			<SlideIn distance={100} threshold={0.3}>
				<p>Test content</p>
			</SlideIn>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should handle once prop", () => {
		render(
			<SlideIn once={true}>
				<p>Test content</p>
			</SlideIn>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should render without props when none provided", () => {
		render(
			<SlideIn>
				<p>Test content</p>
			</SlideIn>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});
});
