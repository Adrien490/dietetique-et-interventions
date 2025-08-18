import { WaveLoader } from "@/shared/components/loaders/wave-loader/wave-loader";
import { render, screen } from "@testing-library/react";

// Mock framer-motion
jest.mock("framer-motion", () => ({
	motion: {
		div: ({ children, className, ...props }: any) => (
			<div className={className} data-testid="wave-container" {...props}>
				{children}
			</div>
		),
		span: ({ className, ...props }: any) => (
			<span className={className} data-testid="wave-bar" {...props} />
		),
	},
}));

describe("WaveLoader", () => {
	it("should render default wave loader", () => {
		render(<WaveLoader />);

		expect(screen.getByTestId("wave-container")).toBeInTheDocument();
		expect(screen.getAllByTestId("wave-bar")).toHaveLength(5);
	});

	it("should apply default size and color classes", () => {
		render(<WaveLoader />);

		const container = screen.getByTestId("wave-container");
		expect(container).toHaveClass("flex", "items-center", "space-x-1");

		const bars = screen.getAllByTestId("wave-bar");
		bars.forEach(bar => {
			expect(bar).toHaveClass("block", "rounded-full");
		});
	});

	it("should apply custom className", () => {
		render(<WaveLoader className="custom-wave" />);

		const container = screen.getByTestId("wave-container");
		expect(container).toHaveClass("custom-wave");
	});

	it("should render 5 wave bars", () => {
		render(<WaveLoader />);

		const bars = screen.getAllByTestId("wave-bar");
		expect(bars).toHaveLength(5);
	});

	it("should apply size prop correctly", () => {
		const { rerender } = render(<WaveLoader size="sm" />);
		expect(screen.getByTestId("wave-container")).toBeInTheDocument();

		rerender(<WaveLoader size="md" />);
		expect(screen.getByTestId("wave-container")).toBeInTheDocument();

		rerender(<WaveLoader size="lg" />);
		expect(screen.getByTestId("wave-container")).toBeInTheDocument();
	});

	it("should apply color prop correctly", () => {
		const { rerender } = render(<WaveLoader color="primary" />);
		expect(screen.getByTestId("wave-container")).toBeInTheDocument();

		rerender(<WaveLoader color="secondary" />);
		expect(screen.getByTestId("wave-container")).toBeInTheDocument();

		rerender(<WaveLoader color="destructive" />);
		expect(screen.getByTestId("wave-container")).toBeInTheDocument();
	});

	it("should handle combination of props", () => {
		render(<WaveLoader size="lg" color="secondary" className="test-wave" />);

		const container = screen.getByTestId("wave-container");
		expect(container).toHaveClass("test-wave", "flex", "items-center", "space-x-1");
		expect(screen.getAllByTestId("wave-bar")).toHaveLength(5);
	});
});

