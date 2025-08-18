import { Bounce } from "@/shared/components/animations/bounce";
import { render, screen } from "@testing-library/react";

// Mock framer-motion
jest.mock("motion/react", () => ({
	motion: {
		div: ({ children, className, initial, whileInView, transition, viewport, ...props }: any) => (
			<div 
				className={className}
				data-testid="bounce-animation"
				data-initial={JSON.stringify(initial)}
				data-animate={JSON.stringify(whileInView)}
				data-transition={JSON.stringify(transition)}
				data-viewport={JSON.stringify(viewport)}
				{...props}
			>
				{children}
			</div>
		),
	},
}));

describe("Bounce", () => {
	it("should render children with bounce animation", () => {
		render(
			<Bounce>
				<div>Test content</div>
			</Bounce>
		);

		expect(screen.getByText("Test content")).toBeInTheDocument();
		expect(screen.getByTestId("bounce-animation")).toBeInTheDocument();
	});

	it("should apply default animation properties", () => {
		render(
			<Bounce>
				<div>Test content</div>
			</Bounce>
		);

		const animation = screen.getByTestId("bounce-animation");
		const initial = JSON.parse(animation.getAttribute("data-initial") || "{}");
		const animate = JSON.parse(animation.getAttribute("data-animate") || "{}");
		const transition = JSON.parse(animation.getAttribute("data-transition") || "{}");
		const viewport = JSON.parse(animation.getAttribute("data-viewport") || "{}");

		expect(initial.scale).toBe(0);
		expect(initial.opacity).toBe(0);
		expect(animate.scale).toBe(1);
		expect(animate.opacity).toBe(1);
		expect(transition.duration).toBe(0.8);
		expect(transition.delay).toBe(0);
		expect(transition.bounce).toBe(0.6);
		expect(viewport.once).toBe(false);
		expect(viewport.amount).toBe(0.1);
	});

	it("should accept custom delay", () => {
		render(
			<Bounce delay={0.5}>
				<div>Test content</div>
			</Bounce>
		);

		const animation = screen.getByTestId("bounce-animation");
		const transition = JSON.parse(animation.getAttribute("data-transition") || "{}");
		expect(transition.delay).toBe(0.5);
	});

	it("should accept custom duration", () => {
		render(
			<Bounce duration={1.2}>
				<div>Test content</div>
			</Bounce>
		);

		const animation = screen.getByTestId("bounce-animation");
		const transition = JSON.parse(animation.getAttribute("data-transition") || "{}");
		expect(transition.duration).toBe(1.2);
	});

	it("should accept custom bounce value", () => {
		render(
			<Bounce bounce={0.8}>
				<div>Test content</div>
			</Bounce>
		);

		const animation = screen.getByTestId("bounce-animation");
		const transition = JSON.parse(animation.getAttribute("data-transition") || "{}");
		expect(transition.bounce).toBe(0.8);
	});

	it("should accept custom threshold", () => {
		render(
			<Bounce threshold={0.3}>
				<div>Test content</div>
			</Bounce>
		);

		const animation = screen.getByTestId("bounce-animation");
		const viewport = JSON.parse(animation.getAttribute("data-viewport") || "{}");
		expect(viewport.amount).toBe(0.3);
	});

	it("should accept once prop", () => {
		render(
			<Bounce once={true}>
				<div>Test content</div>
			</Bounce>
		);

		const animation = screen.getByTestId("bounce-animation");
		const viewport = JSON.parse(animation.getAttribute("data-viewport") || "{}");
		expect(viewport.once).toBe(true);
	});

	it("should apply custom className", () => {
		render(
			<Bounce className="custom-bounce">
				<div>Test content</div>
			</Bounce>
		);

		const animation = screen.getByTestId("bounce-animation");
		expect(animation).toHaveClass("custom-bounce");
	});

	it("should handle all props together", () => {
		render(
			<Bounce
				delay={0.3}
				duration={1.0}
				bounce={0.7}
				threshold={0.2}
				once={true}
				className="test-class"
			>
				<div>Test content</div>
			</Bounce>
		);

		const animation = screen.getByTestId("bounce-animation");
		const transition = JSON.parse(animation.getAttribute("data-transition") || "{}");
		const viewport = JSON.parse(animation.getAttribute("data-viewport") || "{}");

		expect(transition.delay).toBe(0.3);
		expect(transition.duration).toBe(1.0);
		expect(transition.bounce).toBe(0.7);
		expect(viewport.amount).toBe(0.2);
		expect(viewport.once).toBe(true);
		expect(animation).toHaveClass("test-class");
	});

	it("should have spring animation type", () => {
		render(
			<Bounce>
				<div>Test content</div>
			</Bounce>
		);

		const animation = screen.getByTestId("bounce-animation");
		const transition = JSON.parse(animation.getAttribute("data-transition") || "{}");
		expect(transition.type).toBe("spring");
		expect(transition.ease).toBe("easeOut");
	});
});

