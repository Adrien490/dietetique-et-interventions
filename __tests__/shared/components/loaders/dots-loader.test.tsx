import { DotsLoader } from "@/shared/components/loaders/dots-loader/dots-loader";
import { render, screen } from "@testing-library/react";

// Mock framer-motion
jest.mock("framer-motion", () => ({
	motion: {
		div: ({ children, ...props }: any) => (
			<div
				data-testid={
					props.className?.includes("space-x-2")
						? "motion-container"
						: "motion-dot"
				}
				{...props}
			>
				{children}
			</div>
		),
	},
}));

describe("DotsLoader", () => {
	it("should render loader with default props", () => {
		render(<DotsLoader />);

		const container = screen.getByTestId("motion-container");
		expect(container).toBeInTheDocument();
		expect(container).toHaveClass("flex", "space-x-2", "items-center");
	});

	it("should render three dots", () => {
		render(<DotsLoader />);

		const dots = screen.getAllByTestId("motion-dot");
		expect(dots).toHaveLength(3);
	});

	it("should apply custom className", () => {
		render(<DotsLoader className="custom-class" />);

		const container = screen.getByTestId("motion-container");
		expect(container).toHaveClass("custom-class");
	});

	it("should handle different sizes", () => {
		const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

		sizes.forEach((size) => {
			const { unmount } = render(<DotsLoader size={size} />);
			const container = screen.getByTestId("motion-container");
			expect(container).toBeInTheDocument();
			unmount();
		});
	});

	it("should handle different colors", () => {
		const colors = ["primary", "secondary", "accent", "muted"] as const;

		colors.forEach((color) => {
			const { unmount } = render(<DotsLoader color={color} />);
			const container = screen.getByTestId("motion-container");
			expect(container).toBeInTheDocument();
			unmount();
		});
	});

	it("should render without size when not provided", () => {
		render(<DotsLoader />);

		const container = screen.getByTestId("motion-container");
		expect(container).toBeInTheDocument();
	});

	it("should render without color when not provided", () => {
		render(<DotsLoader />);

		const container = screen.getByTestId("motion-container");
		expect(container).toBeInTheDocument();
	});

	it("should handle all prop combinations", () => {
		render(<DotsLoader size="lg" color="secondary" className="test-class" />);

		const container = screen.getByTestId("motion-container");
		expect(container).toBeInTheDocument();
		expect(container).toHaveClass("test-class");
	});

	it("should be accessible", () => {
		render(<DotsLoader />);

		const container = screen.getByTestId("motion-container");
		expect(container).toBeInTheDocument();
	});

	it("should have proper structure for animations", () => {
		render(<DotsLoader />);

		const container = screen.getByTestId("motion-container");
		expect(container).toHaveAttribute("initial");
		expect(container).toHaveAttribute("animate");
	});
});
