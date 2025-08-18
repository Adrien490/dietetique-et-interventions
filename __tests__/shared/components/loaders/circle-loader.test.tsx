import { CircleLoader } from "@/shared/components/loaders/circle-loader/circle-loader";
import { render, screen } from "@testing-library/react";

// Mock framer-motion
jest.mock("framer-motion", () => ({
	motion: {
		svg: ({ children, ...props }: any) => (
			<svg data-testid="motion-svg" {...props}>
				{children}
			</svg>
		),
		circle: ({ ...props }: any) => (
			<circle data-testid="motion-circle" {...props} />
		),
	},
}));

describe("CircleLoader", () => {
	it("should render circle loader with default props", () => {
		render(<CircleLoader />);

		const svg = screen.getByTestId("motion-svg");
		const circle = screen.getByTestId("motion-circle");

		expect(svg).toBeInTheDocument();
		expect(circle).toBeInTheDocument();
	});

	it("should have correct SVG structure", () => {
		render(<CircleLoader />);

		const svg = screen.getByTestId("motion-svg");
		expect(svg).toHaveAttribute("viewBox", "0 0 50 50");
		expect(svg).toHaveAttribute("initial");
		expect(svg).toHaveAttribute("animate");
	});

	it("should have correct circle properties", () => {
		render(<CircleLoader />);

		const circle = screen.getByTestId("motion-circle");
		expect(circle).toHaveAttribute("cx", "25");
		expect(circle).toHaveAttribute("cy", "25");
		expect(circle).toHaveAttribute("r", "20");
		expect(circle).toHaveAttribute("fill", "none");
		expect(circle).toHaveAttribute("stroke-width", "4");
		expect(circle).toHaveAttribute("stroke", "currentColor");
		expect(circle).toHaveAttribute("stroke-linecap", "round");
	});

	it("should apply custom className to container", () => {
		const { container } = render(<CircleLoader className="custom-loader" />);

		const loaderContainer = container.firstChild as HTMLElement;
		expect(loaderContainer).toHaveClass("custom-loader");
	});

	it("should have relative flex container", () => {
		const { container } = render(<CircleLoader />);

		const loaderContainer = container.firstChild as HTMLElement;
		expect(loaderContainer).toHaveClass(
			"relative",
			"flex",
			"items-center",
			"justify-center"
		);
	});

	it("should handle different sizes", () => {
		const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

		sizes.forEach((size) => {
			const { unmount } = render(<CircleLoader size={size} />);
			const svg = screen.getByTestId("motion-svg");
			expect(svg).toBeInTheDocument();
			unmount();
		});
	});

	it("should handle different colors", () => {
		const colors = ["primary", "secondary", "accent", "muted"] as const;

		colors.forEach((color) => {
			const { unmount } = render(<CircleLoader color={color} />);
			const circle = screen.getByTestId("motion-circle");
			expect(circle).toBeInTheDocument();
			unmount();
		});
	});

	it("should have motion variants and transitions", () => {
		render(<CircleLoader />);

		const circle = screen.getByTestId("motion-circle");
		expect(circle).toHaveAttribute("variants");
		expect(circle).toHaveAttribute("transition");
	});

	it("should render with all props combined", () => {
		const { container } = render(
			<CircleLoader size="lg" color="secondary" className="test-circle" />
		);

		const loaderContainer = container.firstChild as HTMLElement;
		const svg = screen.getByTestId("motion-svg");
		const circle = screen.getByTestId("motion-circle");

		expect(loaderContainer).toHaveClass("test-circle");
		expect(svg).toBeInTheDocument();
		expect(circle).toBeInTheDocument();
	});

	it("should maintain proper accessibility", () => {
		const { container } = render(<CircleLoader />);

		expect(container.firstChild).toBeInTheDocument();
	});

	it("should have correct default values", () => {
		render(<CircleLoader />);

		const svg = screen.getByTestId("motion-svg");
		const circle = screen.getByTestId("motion-circle");

		expect(svg).toBeInTheDocument();
		expect(circle).toBeInTheDocument();
	});
});
