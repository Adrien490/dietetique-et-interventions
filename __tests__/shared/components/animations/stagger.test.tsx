import { Stagger } from "@/shared/components/animations/stagger";
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

describe("Stagger Animation Component", () => {
	it("should render children within motion div", () => {
		render(
			<Stagger>
				<div>First Item</div>
				<div>Second Item</div>
			</Stagger>
		);

		const motionDivs = screen.getAllByTestId("motion-div");
		expect(motionDivs.length).toBeGreaterThan(0);
		expect(screen.getByText("First Item")).toBeInTheDocument();
		expect(screen.getByText("Second Item")).toBeInTheDocument();
	});

	it("should apply custom className to container", () => {
		render(
			<Stagger className="custom-stagger">
				<div>Test Content</div>
			</Stagger>
		);

		const containerDiv = screen.getAllByTestId("motion-div")[0];
		expect(containerDiv).toHaveClass("custom-stagger");
	});

	it("should handle single child", () => {
		render(
			<Stagger>
				<div>Single Child</div>
			</Stagger>
		);

		expect(screen.getByText("Single Child")).toBeInTheDocument();
		const motionDivs = screen.getAllByTestId("motion-div");
		expect(motionDivs.length).toBeGreaterThanOrEqual(1);
	});

	it("should handle multiple children", () => {
		render(
			<Stagger>
				<div>First</div>
				<div>Second</div>
				<div>Third</div>
				<div>Fourth</div>
			</Stagger>
		);

		expect(screen.getByText("First")).toBeInTheDocument();
		expect(screen.getByText("Second")).toBeInTheDocument();
		expect(screen.getByText("Third")).toBeInTheDocument();
		expect(screen.getByText("Fourth")).toBeInTheDocument();
	});

	it("should handle custom delay", () => {
		render(
			<Stagger delay={0.5}>
				<div>Test Content</div>
			</Stagger>
		);

		const containerDiv = screen.getAllByTestId("motion-div")[0];
		expect(containerDiv).toBeInTheDocument();
	});

	it("should handle custom stagger delay", () => {
		render(
			<Stagger staggerDelay={0.2}>
				<div>First</div>
				<div>Second</div>
			</Stagger>
		);

		expect(screen.getByText("First")).toBeInTheDocument();
		expect(screen.getByText("Second")).toBeInTheDocument();
	});

	it("should handle custom duration", () => {
		render(
			<Stagger duration={1.0}>
				<div>Test Content</div>
			</Stagger>
		);

		expect(screen.getByText("Test Content")).toBeInTheDocument();
	});

	it("should handle custom threshold", () => {
		render(
			<Stagger threshold={0.3}>
				<div>Test Content</div>
			</Stagger>
		);

		expect(screen.getByText("Test Content")).toBeInTheDocument();
	});

	it("should handle once prop", () => {
		render(
			<Stagger once={true}>
				<div>Test Content</div>
			</Stagger>
		);

		expect(screen.getByText("Test Content")).toBeInTheDocument();
	});

	it("should work with all props combined", () => {
		render(
			<Stagger
				delay={0.2}
				staggerDelay={0.15}
				duration={0.8}
				threshold={0.3}
				once={true}
				className="stagger-animation"
			>
				<div>First Item</div>
				<div>Second Item</div>
				<div>Third Item</div>
			</Stagger>
		);

		const containerDiv = screen.getAllByTestId("motion-div")[0];
		expect(containerDiv).toHaveClass("stagger-animation");
		expect(screen.getByText("First Item")).toBeInTheDocument();
		expect(screen.getByText("Second Item")).toBeInTheDocument();
		expect(screen.getByText("Third Item")).toBeInTheDocument();
	});

	it("should handle complex children", () => {
		render(
			<Stagger>
				<div>
					<h1>Title 1</h1>
					<p>Description 1</p>
				</div>
				<div>
					<h2>Title 2</h2>
					<span>Content 2</span>
				</div>
			</Stagger>
		);

		expect(screen.getByText("Title 1")).toBeInTheDocument();
		expect(screen.getByText("Description 1")).toBeInTheDocument();
		expect(screen.getByText("Title 2")).toBeInTheDocument();
		expect(screen.getByText("Content 2")).toBeInTheDocument();
	});

	it("should handle empty className", () => {
		render(
			<Stagger className="">
				<div>Test Content</div>
			</Stagger>
		);

		const containerDiv = screen.getAllByTestId("motion-div")[0];
		expect(containerDiv).not.toHaveClass("custom-class");
		// Vérifier que l'élément existe et n'a pas de className personnalisée
		expect(containerDiv.className).not.toContain("custom");
	});

	it("should handle different child types", () => {
		render(
			<Stagger>
				<div>Div Element</div>
				<span>Span Element</span>
				<p>Paragraph Element</p>
				<button>Button Element</button>
			</Stagger>
		);

		expect(screen.getByText("Div Element")).toBeInTheDocument();
		expect(screen.getByText("Span Element")).toBeInTheDocument();
		expect(screen.getByText("Paragraph Element")).toBeInTheDocument();
		expect(screen.getByText("Button Element")).toBeInTheDocument();
	});

	it("should handle zero delays", () => {
		render(
			<Stagger delay={0} staggerDelay={0}>
				<div>First</div>
				<div>Second</div>
			</Stagger>
		);

		expect(screen.getByText("First")).toBeInTheDocument();
		expect(screen.getByText("Second")).toBeInTheDocument();
	});

	it("should handle string children", () => {
		render(
			<Stagger>
				Simple text
				<div>Mixed content</div>
			</Stagger>
		);

		expect(screen.getByText("Simple text")).toBeInTheDocument();
		expect(screen.getByText("Mixed content")).toBeInTheDocument();
	});

	it("should wrap each child in its own motion div", () => {
		render(
			<Stagger>
				<div data-testid="first-child">First</div>
				<div data-testid="second-child">Second</div>
			</Stagger>
		);

		// Should have container + 2 child motion divs
		const motionDivs = screen.getAllByTestId("motion-div");
		expect(motionDivs.length).toBe(3); // 1 container + 2 children

		expect(screen.getByTestId("first-child")).toBeInTheDocument();
		expect(screen.getByTestId("second-child")).toBeInTheDocument();
	});

	it("should handle large numbers of children", () => {
		const children = Array.from({ length: 10 }, (_, i) => (
			<div key={i}>Item {i + 1}</div>
		));

		render(<Stagger>{children}</Stagger>);

		for (let i = 1; i <= 10; i++) {
			expect(screen.getByText(`Item ${i}`)).toBeInTheDocument();
		}
	});
});
