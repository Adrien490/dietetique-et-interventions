import { Rotate } from "@/shared/components/animations/rotate";
import { render, screen } from "@testing-library/react";

// Mock motion/react
jest.mock("motion/react", () => ({
	motion: {
		div: ({
			children,
			className,
			...props
		}: {
			children: React.ReactNode;
			className: string;
			[key: string]: unknown;
		}) => (
			<div
				data-testid="motion-div"
				className={className}
				data-motion-props={JSON.stringify(props)}
			>
				{children}
			</div>
		),
	},
}));

describe("Rotate Animation Component", () => {
	it("should render children within motion div", () => {
		render(
			<Rotate>
				<div>Test Content</div>
			</Rotate>
		);

		expect(screen.getByTestId("motion-div")).toBeInTheDocument();
		expect(screen.getByText("Test Content")).toBeInTheDocument();
	});

	it("should apply custom className", () => {
		render(
			<Rotate className="custom-rotate">
				<div>Test Content</div>
			</Rotate>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toHaveClass("custom-rotate");
	});

	it("should use default props when not specified", () => {
		render(
			<Rotate>
				<div>Test Content</div>
			</Rotate>
		);

		const motionDiv = screen.getByTestId("motion-div");
		const motionProps = JSON.parse(
			motionDiv.getAttribute("data-motion-props") || "{}"
		);

		// Check that motion props are passed correctly
		expect(motionProps).toHaveProperty("initial");
		expect(motionProps).toHaveProperty("whileInView");
		expect(motionProps).toHaveProperty("exit");
		expect(motionProps).toHaveProperty("transition");
		expect(motionProps).toHaveProperty("viewport");
	});

	it("should accept custom delay", () => {
		render(
			<Rotate delay={0.5}>
				<div>Test Content</div>
			</Rotate>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should accept custom duration", () => {
		render(
			<Rotate duration={1.2}>
				<div>Test Content</div>
			</Rotate>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should accept custom initial rotation", () => {
		render(
			<Rotate initialRotation={90}>
				<div>Test Content</div>
			</Rotate>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should accept custom threshold", () => {
		render(
			<Rotate threshold={0.5}>
				<div>Test Content</div>
			</Rotate>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should handle once prop", () => {
		render(
			<Rotate once={true}>
				<div>Test Content</div>
			</Rotate>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should render multiple children", () => {
		render(
			<Rotate>
				<div>First Child</div>
				<span>Second Child</span>
			</Rotate>
		);

		expect(screen.getByText("First Child")).toBeInTheDocument();
		expect(screen.getByText("Second Child")).toBeInTheDocument();
	});

	it("should handle empty className", () => {
		render(
			<Rotate className="">
				<div>Test Content</div>
			</Rotate>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should work with all props combined", () => {
		render(
			<Rotate
				delay={0.2}
				duration={0.8}
				initialRotation={45}
				threshold={0.3}
				once={true}
				className="rotate-animation"
			>
				<div>Animated Content</div>
			</Rotate>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
		expect(motionDiv).toHaveClass("rotate-animation");
		expect(screen.getByText("Animated Content")).toBeInTheDocument();
	});

	it("should handle complex children", () => {
		render(
			<Rotate>
				<div>
					<h1>Title</h1>
					<p>Description</p>
					<button>Action</button>
				</div>
			</Rotate>
		);

		expect(screen.getByText("Title")).toBeInTheDocument();
		expect(screen.getByText("Description")).toBeInTheDocument();
		expect(screen.getByText("Action")).toBeInTheDocument();
	});

	it("should handle negative initial rotation", () => {
		render(
			<Rotate initialRotation={-90}>
				<div>Test Content</div>
			</Rotate>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should handle zero delay", () => {
		render(
			<Rotate delay={0}>
				<div>Test Content</div>
			</Rotate>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});
});
