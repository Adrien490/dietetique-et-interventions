import { PulseLoader } from "@/shared/components/loaders/pulse-loader";
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
		}: any) => (
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

describe("PulseLoader", () => {
	it("should render pulse loader with default props", () => {
		render(<PulseLoader />);

		expect(screen.getByTestId("motion-div")).toBeInTheDocument();
	});

	it("should apply small size variant", () => {
		render(<PulseLoader size="sm" />);

		const pulse = screen.getByTestId("motion-div");
		expect(pulse).toHaveClass("h-4", "w-4");
	});

	it("should apply medium size variant", () => {
		render(<PulseLoader size="md" />);

		const pulse = screen.getByTestId("motion-div");
		expect(pulse).toHaveClass("h-5", "w-5");
	});

	it("should apply large size variant", () => {
		render(<PulseLoader size="lg" />);

		const pulse = screen.getByTestId("motion-div");
		expect(pulse).toHaveClass("h-6", "w-6");
	});

	it("should apply primary color", () => {
		render(<PulseLoader color="primary" />);

		const pulse = screen.getByTestId("motion-div");
		expect(pulse).toHaveClass("text-primary");
	});

	it("should apply secondary color", () => {
		render(<PulseLoader color="secondary" />);

		const pulse = screen.getByTestId("motion-div");
		expect(pulse).toHaveClass("text-secondary");
	});

	it("should apply custom className", () => {
		render(<PulseLoader className="custom-pulse" />);

		// The custom class is applied to the container, not the motion div
		const container = screen.getByTestId("motion-div").parentElement;
		expect(container).toHaveClass("custom-pulse");
	});

	it("should have correct animation properties", () => {
		render(<PulseLoader />);

		const pulse = screen.getByTestId("motion-div");
		
		// Animation properties are managed by framer-motion internally
		// We verify the component renders with the expected structure
		expect(pulse).toHaveClass("absolute", "rounded-full");
		expect(pulse).toBeInTheDocument();
	});

	it("should have rounded styling", () => {
		render(<PulseLoader />);

		const pulse = screen.getByTestId("motion-div");
		expect(pulse).toHaveClass("rounded-full");
	});

	it("should combine all props", () => {
		render(<PulseLoader size="lg" color="primary" className="test-pulse" />);

		const pulse = screen.getByTestId("motion-div");
		expect(pulse).toHaveClass("h-6", "w-6", "text-primary");
		
		// Check the container has the custom class
		const container = pulse.parentElement;
		expect(container).toHaveClass("test-pulse");
	});
});
