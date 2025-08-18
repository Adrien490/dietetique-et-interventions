import { FadeIn } from "@/shared/components/animations/fade-in";
import { render, screen } from "@testing-library/react";

// Mock framer-motion
jest.mock("framer-motion", () => ({
	motion: {
		div: ({ children, className, ...props }: any) => {
			// Filter out framer-motion specific props to avoid React warnings
			const {
				whileInView,
				initial,
				animate,
				transition,
				viewport,
				...domProps
			} = props;
			return (
				<div data-testid="motion-div" className={className} {...domProps}>
					{children}
				</div>
			);
		},
	},
}));

describe("FadeIn", () => {
	it("should render children inside motion div", () => {
		render(
			<FadeIn>
				<p>Test content</p>
			</FadeIn>
		);

		expect(screen.getByTestId("motion-div")).toBeInTheDocument();
		expect(screen.getByText("Test content")).toBeInTheDocument();
	});

	it("should accept custom className", () => {
		render(
			<FadeIn className="custom-class">
				<p>Test content</p>
			</FadeIn>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toHaveClass("custom-class");
	});

	it("should render with default props when none provided", () => {
		render(
			<FadeIn>
				<p>Test content</p>
			</FadeIn>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should handle multiple children", () => {
		render(
			<FadeIn>
				<p>First child</p>
				<p>Second child</p>
			</FadeIn>
		);

		expect(screen.getByText("First child")).toBeInTheDocument();
		expect(screen.getByText("Second child")).toBeInTheDocument();
	});

	it("should render without className when not provided", () => {
		render(
			<FadeIn>
				<p>Test content</p>
			</FadeIn>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).not.toHaveClass("custom-class");
	});
});
