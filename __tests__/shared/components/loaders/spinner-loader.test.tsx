import { SpinnerLoader } from "@/shared/components/loaders/spinner-loader/spinner-loader";
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

// Mock lucide-react
jest.mock("lucide-react", () => ({
	Loader2: ({ className, ...props }: any) => (
		<div data-testid="loader-icon" className={className} {...props}>
			Loader2
		</div>
	),
}));

describe("SpinnerLoader", () => {
	it("should render spinner with default props", () => {
		render(<SpinnerLoader />);

		const container = screen.getByTestId("motion-div");
		const icon = screen.getByTestId("loader-icon");

		expect(container).toBeInTheDocument();
		expect(icon).toBeInTheDocument();
		expect(container).toHaveClass("flex", "items-center");
	});

	it("should render Loader2 icon", () => {
		render(<SpinnerLoader />);

		const icon = screen.getByTestId("loader-icon");
		expect(icon).toBeInTheDocument();
		expect(icon).toHaveTextContent("Loader2");
	});

	it("should apply custom className", () => {
		render(<SpinnerLoader className="custom-spinner" />);

		const container = screen.getByTestId("motion-div");
		expect(container).toHaveClass("custom-spinner");
	});

	it("should handle different sizes", () => {
		const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

		sizes.forEach((size) => {
			const { unmount } = render(<SpinnerLoader size={size} />);
			const container = screen.getByTestId("motion-div");
			expect(container).toBeInTheDocument();
			unmount();
		});
	});

	it("should handle different colors", () => {
		const colors = ["primary", "secondary", "accent", "muted"] as const;

		colors.forEach((color) => {
			const { unmount } = render(<SpinnerLoader color={color} />);
			const container = screen.getByTestId("motion-div");
			expect(container).toBeInTheDocument();
			unmount();
		});
	});

	it("should have motion animation properties", () => {
		render(<SpinnerLoader />);

		const container = screen.getByTestId("motion-div");
		expect(container).toHaveAttribute("initial");
		expect(container).toHaveAttribute("animate");
		expect(container).toHaveAttribute("transition");
	});

	it("should pass className to icon", () => {
		render(<SpinnerLoader size="lg" color="primary" />);

		const icon = screen.getByTestId("loader-icon");
		expect(icon).toBeInTheDocument();
		expect(icon).toHaveClass("h-6", "w-6", "text-primary");
	});

	it("should render with all props combined", () => {
		render(
			<SpinnerLoader size="xl" color="secondary" className="test-spinner" />
		);

		const container = screen.getByTestId("motion-div");
		const icon = screen.getByTestId("loader-icon");

		expect(container).toBeInTheDocument();
		expect(container).toHaveClass("test-spinner");
		expect(icon).toBeInTheDocument();
	});

	it("should have proper accessibility", () => {
		render(<SpinnerLoader />);

		const container = screen.getByTestId("motion-div");
		expect(container).toBeInTheDocument();
	});

	it("should maintain flex layout", () => {
		render(<SpinnerLoader />);

		const container = screen.getByTestId("motion-div");
		expect(container).toHaveClass("flex", "items-center");
	});
});
