import { Slide } from "@/shared/components/animations/slide";
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

describe("Slide Animation Component", () => {
	it("should render children within motion div", () => {
		render(
			<Slide>
				<div>Sliding Content</div>
			</Slide>
		);

		expect(screen.getByTestId("motion-div")).toBeInTheDocument();
		expect(screen.getByText("Sliding Content")).toBeInTheDocument();
	});

	it("should apply custom className", () => {
		render(
			<Slide className="custom-slide">
				<div>Test Content</div>
			</Slide>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toHaveClass("custom-slide");
	});

	it("should use default horizontal direction", () => {
		render(
			<Slide>
				<div>Test Content</div>
			</Slide>
		);

		const motionDiv = screen.getByTestId("motion-div");
		const motionProps = JSON.parse(
			motionDiv.getAttribute("data-motion-props") || "{}"
		);

		expect(motionProps).toHaveProperty("animate");
		expect(motionProps).toHaveProperty("transition");
	});

	it("should handle horizontal direction", () => {
		render(
			<Slide direction="horizontal">
				<div>Test Content</div>
			</Slide>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should handle vertical direction", () => {
		render(
			<Slide direction="vertical">
				<div>Test Content</div>
			</Slide>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should handle custom speed", () => {
		render(
			<Slide speed={30}>
				<div>Test Content</div>
			</Slide>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should handle reverse direction", () => {
		render(
			<Slide reverse={true}>
				<div>Test Content</div>
			</Slide>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should handle reverse with vertical direction", () => {
		render(
			<Slide direction="vertical" reverse={true}>
				<div>Test Content</div>
			</Slide>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should handle empty className", () => {
		render(
			<Slide className="">
				<div>Test Content</div>
			</Slide>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).not.toHaveClass("custom-class");
		// Vérifier que l'élément existe et n'a pas de className personnalisée
		expect(motionDiv.className).not.toContain("custom");
	});

	it("should work with all props combined", () => {
		render(
			<Slide
				direction="vertical"
				speed={15}
				reverse={true}
				className="slide-animation"
			>
				<div>Animated Content</div>
			</Slide>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
		expect(motionDiv).toHaveClass("slide-animation");
		expect(screen.getByText("Animated Content")).toBeInTheDocument();
	});

	it("should render multiple children", () => {
		render(
			<Slide>
				<div>First Child</div>
				<span>Second Child</span>
			</Slide>
		);

		expect(screen.getByText("First Child")).toBeInTheDocument();
		expect(screen.getByText("Second Child")).toBeInTheDocument();
	});

	it("should handle complex children", () => {
		render(
			<Slide>
				<div>
					<h1>Sliding Title</h1>
					<p>Sliding Description</p>
					<button>Sliding Button</button>
				</div>
			</Slide>
		);

		expect(screen.getByText("Sliding Title")).toBeInTheDocument();
		expect(screen.getByText("Sliding Description")).toBeInTheDocument();
		expect(screen.getByText("Sliding Button")).toBeInTheDocument();
	});

	it("should handle zero speed", () => {
		render(
			<Slide speed={0}>
				<div>Test Content</div>
			</Slide>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should handle large speed values", () => {
		render(
			<Slide speed={100}>
				<div>Test Content</div>
			</Slide>
		);

		const motionDiv = screen.getByTestId("motion-div");
		expect(motionDiv).toBeInTheDocument();
	});

	it("should handle different direction and reverse combinations", () => {
		const { rerender } = render(
			<Slide direction="horizontal" reverse={false}>
				<div>Test Content</div>
			</Slide>
		);

		expect(screen.getByTestId("motion-div")).toBeInTheDocument();

		rerender(
			<Slide direction="horizontal" reverse={true}>
				<div>Test Content</div>
			</Slide>
		);

		expect(screen.getByTestId("motion-div")).toBeInTheDocument();

		rerender(
			<Slide direction="vertical" reverse={false}>
				<div>Test Content</div>
			</Slide>
		);

		expect(screen.getByTestId("motion-div")).toBeInTheDocument();

		rerender(
			<Slide direction="vertical" reverse={true}>
				<div>Test Content</div>
			</Slide>
		);

		expect(screen.getByTestId("motion-div")).toBeInTheDocument();
	});

	it("should handle string children", () => {
		render(<Slide>Simple text content</Slide>);

		expect(screen.getByText("Simple text content")).toBeInTheDocument();
	});
});
