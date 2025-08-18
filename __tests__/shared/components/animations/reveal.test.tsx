import { Reveal } from "@/shared/components/animations/reveal";
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

describe("Reveal", () => {
	it("should render children inside motion div", () => {
		render(
			<Reveal>
				<p>Test content</p>
			</Reveal>
		);

		expect(screen.getByTestId("motion-div")).toBeInTheDocument();
		expect(screen.getByText("Test content")).toBeInTheDocument();
	});

	it("should accept custom className", () => {
		render(
			<Reveal className="custom-class">
				<p>Test content</p>
			</Reveal>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toHaveClass("custom-class");
	});

	it("should handle delay prop", () => {
		render(
			<Reveal delay={0.5}>
				<p>Test content</p>
			</Reveal>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should handle duration prop", () => {
		render(
			<Reveal duration={1.2}>
				<p>Test content</p>
			</Reveal>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should handle threshold prop", () => {
		render(
			<Reveal threshold={0.3}>
				<p>Test content</p>
			</Reveal>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should handle once prop", () => {
		render(
			<Reveal once={true}>
				<p>Test content</p>
			</Reveal>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should render with default props when none provided", () => {
		render(
			<Reveal>
				<p>Test content</p>
			</Reveal>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should handle multiple children", () => {
		render(
			<Reveal>
				<p>First child</p>
				<span>Second child</span>
			</Reveal>
		);

		expect(screen.getByText("First child")).toBeInTheDocument();
		expect(screen.getByText("Second child")).toBeInTheDocument();
	});
});
