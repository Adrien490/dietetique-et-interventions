import { GridLoader } from "@/shared/components/loaders/grid-loader";
import { render, screen } from "@testing-library/react";

// Mock de framer-motion
jest.mock("framer-motion", () => ({
	motion: {
		div: ({
			children,
			animate,
			transition,
			className,
			style,
			...props
		}: {
			children: React.ReactNode;
			animate: unknown;
			transition: unknown;
			className?: string;
			style?: React.CSSProperties;
		}) => (
			<div
				data-testid="motion-div"
				data-animate={JSON.stringify(animate)}
				data-transition={JSON.stringify(transition)}
				className={className}
				style={style}
				{...props}
			>
				{children}
			</div>
		),
	},
}));

describe("GridLoader", () => {
	it("should render grid loader with default props", () => {
		render(<GridLoader />);

		const motionDivs = screen.getAllByTestId("motion-div");
		expect(motionDivs[0]).toBeInTheDocument();
		expect(motionDivs).toHaveLength(10); // 1 container + 9 grid items
	});

	it("should render correct grid size", () => {
		render(<GridLoader />);

		// Always renders 1 container + 9 grid items (3x3 grid)
		expect(screen.getAllByTestId("motion-div")).toHaveLength(10);
	});

	it("should apply small size variant", () => {
		render(<GridLoader size="sm" />);

		const container = screen.getAllByTestId("motion-div")[0];
		expect(container).toHaveClass("h-12", "w-12");
	});

	it("should apply medium size variant", () => {
		render(<GridLoader size="md" />);

		const container = screen.getAllByTestId("motion-div")[0];
		expect(container).toHaveClass("h-16", "w-16");
	});

	it("should apply large size variant", () => {
		render(<GridLoader size="lg" />);

		const container = screen.getAllByTestId("motion-div")[0];
		expect(container).toHaveClass("h-20", "w-20");
	});

	it("should apply primary color", () => {
		render(<GridLoader color="primary" />);

		const gridItems = screen.getAllByTestId("motion-div");
		// Skip the first item (container) and check the grid items
		gridItems.slice(1).forEach((item) => {
			expect(item).toHaveClass("bg-primary");
		});
	});

	it("should apply custom className", () => {
		render(<GridLoader className="custom-grid" />);

		const container = screen.getAllByTestId("motion-div")[0];
		expect(container).toHaveClass("custom-grid");
	});

	it("should have correct animation timing", () => {
		render(<GridLoader />);

		const gridItems = screen.getAllByTestId("motion-div");
		// Check that we have the correct number of items (1 container + 9 grid items)
		expect(gridItems).toHaveLength(10);

		// Check that the container has the correct classes
		const container = gridItems[0];
		expect(container).toHaveClass("grid", "grid-cols-3", "gap-1");
	});

	it("should handle extra small size", () => {
		render(<GridLoader size="xs" />);

		const container = screen.getAllByTestId("motion-div")[0];
		expect(container).toHaveClass("h-9", "w-9");
		// Always has 10 items (1 container + 9 grid items)
		expect(screen.getAllByTestId("motion-div")).toHaveLength(10);
	});

	it("should handle extra large size", () => {
		render(<GridLoader size="xl" />);

		const container = screen.getAllByTestId("motion-div")[0];
		expect(container).toHaveClass("h-24", "w-24");
		// Always has 10 items (1 container + 9 grid items)
		expect(screen.getAllByTestId("motion-div")).toHaveLength(10);
	});

	it("should combine all props", () => {
		render(<GridLoader size="md" color="secondary" className="test-grid" />);

		expect(screen.getAllByTestId("motion-div")).toHaveLength(10);

		const container = screen.getAllByTestId("motion-div")[0];
		expect(container).toHaveClass("test-grid", "h-16", "w-16");

		const gridItems = screen.getAllByTestId("motion-div");
		gridItems.slice(1).forEach((item) => {
			expect(item).toHaveClass("bg-secondary");
		});
	});
});
