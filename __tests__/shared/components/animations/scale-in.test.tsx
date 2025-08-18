import { ScaleIn } from "@/shared/components/animations/scale-in";
import { render, screen } from "@testing-library/react";

// Mock framer-motion
jest.mock("motion/react", () => ({
	motion: {
		div: ({
			children,
			className,
			initial,
			whileInView,
			exit,
			transition,
			viewport,
			...props
		}: any) => (
			<div
				className={className}
				data-testid="scale-in-animation"
				data-initial={JSON.stringify(initial)}
				data-animate={JSON.stringify(whileInView)}
				data-exit={JSON.stringify(exit)}
				data-transition={JSON.stringify(transition)}
				data-viewport={JSON.stringify(viewport)}
				{...props}
			>
				{children}
			</div>
		),
	},
}));

describe("ScaleIn", () => {
	it("should render children with scale animation", () => {
		render(
			<ScaleIn>
				<div>Test content</div>
			</ScaleIn>
		);

		expect(screen.getByText("Test content")).toBeInTheDocument();
		expect(screen.getByTestId("scale-in-animation")).toBeInTheDocument();
	});

	it("should apply default animation properties", () => {
		render(
			<ScaleIn>
				<div>Test content</div>
			</ScaleIn>
		);

		const animation = screen.getByTestId("scale-in-animation");
		const initial = JSON.parse(animation.getAttribute("data-initial") || "{}");
		const animate = JSON.parse(animation.getAttribute("data-animate") || "{}");
		const exit = JSON.parse(animation.getAttribute("data-exit") || "{}");
		const transition = JSON.parse(
			animation.getAttribute("data-transition") || "{}"
		);
		const viewport = JSON.parse(
			animation.getAttribute("data-viewport") || "{}"
		);

		expect(initial.scale).toBe(0.8);
		expect(initial.opacity).toBe(0);
		expect(animate.scale).toBe(1);
		expect(animate.opacity).toBe(1);
		expect(exit.scale).toBe(0.8);
		expect(exit.opacity).toBe(0);
		expect(transition.duration).toBe(0.6);
		expect(transition.delay).toBe(0);
		expect(transition.ease).toBe("easeOut");
		expect(viewport.once).toBe(false);
		expect(viewport.amount).toBe(0.1);
	});

	it("should accept custom delay", () => {
		render(
			<ScaleIn delay={0.3}>
				<div>Test content</div>
			</ScaleIn>
		);

		const animation = screen.getByTestId("scale-in-animation");
		const transition = JSON.parse(
			animation.getAttribute("data-transition") || "{}"
		);
		expect(transition.delay).toBe(0.3);
	});

	it("should accept custom duration", () => {
		render(
			<ScaleIn duration={1.0}>
				<div>Test content</div>
			</ScaleIn>
		);

		const animation = screen.getByTestId("scale-in-animation");
		const transition = JSON.parse(
			animation.getAttribute("data-transition") || "{}"
		);
		expect(transition.duration).toBe(1.0);
	});

	it("should accept custom initialScale", () => {
		render(
			<ScaleIn initialScale={0.5}>
				<div>Test content</div>
			</ScaleIn>
		);

		const animation = screen.getByTestId("scale-in-animation");
		const initial = JSON.parse(animation.getAttribute("data-initial") || "{}");
		const exit = JSON.parse(animation.getAttribute("data-exit") || "{}");

		expect(initial.scale).toBe(0.5);
		expect(exit.scale).toBe(0.5);
	});

	it("should accept custom threshold", () => {
		render(
			<ScaleIn threshold={0.3}>
				<div>Test content</div>
			</ScaleIn>
		);

		const animation = screen.getByTestId("scale-in-animation");
		const viewport = JSON.parse(
			animation.getAttribute("data-viewport") || "{}"
		);
		expect(viewport.amount).toBe(0.3);
	});

	it("should accept once prop", () => {
		render(
			<ScaleIn once={true}>
				<div>Test content</div>
			</ScaleIn>
		);

		const animation = screen.getByTestId("scale-in-animation");
		const viewport = JSON.parse(
			animation.getAttribute("data-viewport") || "{}"
		);
		expect(viewport.once).toBe(true);
	});

	it("should apply custom className", () => {
		render(
			<ScaleIn className="custom-scale">
				<div>Test content</div>
			</ScaleIn>
		);

		const animation = screen.getByTestId("scale-in-animation");
		expect(animation).toHaveClass("custom-scale");
	});

	it("should handle all props together", () => {
		render(
			<ScaleIn
				delay={0.2}
				duration={0.9}
				initialScale={0.7}
				threshold={0.25}
				once={true}
				className="test-class"
			>
				<div>Test content</div>
			</ScaleIn>
		);

		const animation = screen.getByTestId("scale-in-animation");
		const initial = JSON.parse(animation.getAttribute("data-initial") || "{}");
		const transition = JSON.parse(
			animation.getAttribute("data-transition") || "{}"
		);
		const viewport = JSON.parse(
			animation.getAttribute("data-viewport") || "{}"
		);

		expect(initial.scale).toBe(0.7);
		expect(transition.delay).toBe(0.2);
		expect(transition.duration).toBe(0.9);
		expect(viewport.amount).toBe(0.25);
		expect(viewport.once).toBe(true);
		expect(animation).toHaveClass("test-class");
	});

	it("should maintain opacity animation", () => {
		render(
			<ScaleIn>
				<div>Test content</div>
			</ScaleIn>
		);

		const animation = screen.getByTestId("scale-in-animation");
		const initial = JSON.parse(animation.getAttribute("data-initial") || "{}");
		const animate = JSON.parse(animation.getAttribute("data-animate") || "{}");
		const exit = JSON.parse(animation.getAttribute("data-exit") || "{}");

		expect(initial.opacity).toBe(0);
		expect(animate.opacity).toBe(1);
		expect(exit.opacity).toBe(0);
	});

	it("should have easeOut transition", () => {
		render(
			<ScaleIn>
				<div>Test content</div>
			</ScaleIn>
		);

		const animation = screen.getByTestId("scale-in-animation");
		const transition = JSON.parse(
			animation.getAttribute("data-transition") || "{}"
		);
		expect(transition.ease).toBe("easeOut");
	});

	it("should handle complex children", () => {
		render(
			<ScaleIn>
				<div>
					<h1>Title</h1>
					<p>Description</p>
					<button>Action</button>
				</div>
			</ScaleIn>
		);

		expect(screen.getByText("Title")).toBeInTheDocument();
		expect(screen.getByText("Description")).toBeInTheDocument();
		expect(screen.getByText("Action")).toBeInTheDocument();
	});
});

