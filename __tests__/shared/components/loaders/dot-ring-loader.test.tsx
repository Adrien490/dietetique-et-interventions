import { DotRingLoader } from "@/shared/components/loaders/dot-ring-loader/dot-ring-loader";
import { render } from "@testing-library/react";

// Mock the utils function
jest.mock("@/shared/utils", () => ({
	cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

// Mock framer-motion
jest.mock("framer-motion", () => ({
	motion: {
		div: ({
			children,
			className,
			variants,
			initial,
			animate,
			transition,
			...props
		}: any) => (
			<div
				className={className}
				data-variants={JSON.stringify(variants)}
				data-initial={initial}
				data-animate={animate}
				data-transition={JSON.stringify(transition)}
				{...props}
			>
				{children}
			</div>
		),
	},
}));

// Mock constants
jest.mock("@/shared/components/loaders/dot-ring-loader/constants", () => ({
	colorClass: {
		primary: "text-primary",
		secondary: "text-secondary",
		accent: "text-accent",
		muted: "text-muted-foreground",
	},
	sizeClasses: {
		rings: {
			xs: "w-4 h-4",
			sm: "w-5 h-5",
			md: "w-6 h-6",
			lg: "w-8 h-8",
			xl: "w-10 h-10",
		},
		dots: {
			xs: "w-1 h-1",
			sm: "w-1.5 h-1.5",
			md: "w-2 h-2",
			lg: "w-2.5 h-2.5",
			xl: "w-3 h-3",
		},
	},
	loaderAnimations: {
		ring: {
			initial: { rotate: 0, scale: 1, opacity: 1 },
			animate: { rotate: 360, scale: [1, 1.1, 1], opacity: [1, 0.8, 1] },
		},
		dot: {
			initial: { scale: 1, opacity: 1 },
			animate: { scale: [1, 0.8, 1], opacity: [1, 0.6, 1] },
		},
	},
}));

describe("DotRingLoader", () => {
	it("should render with default props", () => {
		const { container } = render(<DotRingLoader />);

		const wrapper = container.firstChild as HTMLElement;
		expect(wrapper).toHaveClass(
			"relative",
			"flex",
			"items-center",
			"justify-center"
		);

		// Should have ring and dot elements
		const motionDivs = container.querySelectorAll("[data-variants]");
		expect(motionDivs).toHaveLength(2);
	});

	it("should apply correct size classes for small size", () => {
		const { container } = render(<DotRingLoader size="sm" />);

		const motionDivs = container.querySelectorAll("[data-variants]");
		const ring = motionDivs[0];
		const dot = motionDivs[1];

		expect(ring).toHaveClass("w-5", "h-5");
		expect(dot).toHaveClass("w-1.5", "h-1.5");
	});

	it("should apply correct size classes for different sizes", () => {
		const { container: xsContainer } = render(<DotRingLoader size="xs" />);
		const { container: mdContainer } = render(<DotRingLoader size="md" />);
		const { container: lgContainer } = render(<DotRingLoader size="lg" />);
		const { container: xlContainer } = render(<DotRingLoader size="xl" />);

		// XS
		const xsRing = xsContainer.querySelectorAll("[data-variants]")[0];
		const xsDot = xsContainer.querySelectorAll("[data-variants]")[1];
		expect(xsRing).toHaveClass("w-4", "h-4");
		expect(xsDot).toHaveClass("w-1", "h-1");

		// MD
		const mdRing = mdContainer.querySelectorAll("[data-variants]")[0];
		const mdDot = mdContainer.querySelectorAll("[data-variants]")[1];
		expect(mdRing).toHaveClass("w-6", "h-6");
		expect(mdDot).toHaveClass("w-2", "h-2");

		// LG
		const lgRing = lgContainer.querySelectorAll("[data-variants]")[0];
		const lgDot = lgContainer.querySelectorAll("[data-variants]")[1];
		expect(lgRing).toHaveClass("w-8", "h-8");
		expect(lgDot).toHaveClass("w-2.5", "h-2.5");

		// XL
		const xlRing = xlContainer.querySelectorAll("[data-variants]")[0];
		const xlDot = xlContainer.querySelectorAll("[data-variants]")[1];
		expect(xlRing).toHaveClass("w-10", "h-10");
		expect(xlDot).toHaveClass("w-3", "h-3");
	});

	it("should apply correct color classes", () => {
		const { container: primaryContainer } = render(
			<DotRingLoader color="primary" />
		);
		const { container: secondaryContainer } = render(
			<DotRingLoader color="secondary" />
		);
		const { container: accentContainer } = render(
			<DotRingLoader color="accent" />
		);
		const { container: mutedContainer } = render(
			<DotRingLoader color="muted" />
		);

		// Primary
		const primaryRing = primaryContainer.querySelectorAll("[data-variants]")[0];
		const primaryDot = primaryContainer.querySelectorAll("[data-variants]")[1];
		expect(primaryRing).toHaveClass("text-primary");
		expect(primaryDot).toHaveClass("text-primary");

		// Secondary
		const secondaryRing =
			secondaryContainer.querySelectorAll("[data-variants]")[0];
		const secondaryDot =
			secondaryContainer.querySelectorAll("[data-variants]")[1];
		expect(secondaryRing).toHaveClass("text-secondary");
		expect(secondaryDot).toHaveClass("text-secondary");

		// Accent
		const accentRing = accentContainer.querySelectorAll("[data-variants]")[0];
		const accentDot = accentContainer.querySelectorAll("[data-variants]")[1];
		expect(accentRing).toHaveClass("text-accent");
		expect(accentDot).toHaveClass("text-accent");

		// Muted
		const mutedRing = mutedContainer.querySelectorAll("[data-variants]")[0];
		const mutedDot = mutedContainer.querySelectorAll("[data-variants]")[1];
		expect(mutedRing).toHaveClass("text-muted-foreground");
		expect(mutedDot).toHaveClass("text-muted-foreground");
	});

	it("should apply custom className to wrapper", () => {
		const { container } = render(
			<DotRingLoader className="custom-loader-class" />
		);

		const wrapper = container.firstChild as HTMLElement;
		expect(wrapper).toHaveClass("custom-loader-class");
	});

	it("should have correct ring styling", () => {
		const { container } = render(<DotRingLoader />);

		const ring = container.querySelectorAll("[data-variants]")[0];
		expect(ring).toHaveClass(
			"absolute",
			"rounded-full",
			"border-2",
			"border-transparent",
			"border-t-current",
			"border-r-current"
		);
	});

	it("should have correct dot styling", () => {
		const { container } = render(<DotRingLoader />);

		const dot = container.querySelectorAll("[data-variants]")[1];
		expect(dot).toHaveClass("rounded-full", "bg-current");
	});

	it("should have correct animation variants", () => {
		const { container } = render(<DotRingLoader />);

		const motionDivs = container.querySelectorAll("[data-variants]");
		const ring = motionDivs[0];
		const dot = motionDivs[1];

		// Check ring animation
		const ringVariants = JSON.parse(ring.getAttribute("data-variants") || "{}");
		expect(ringVariants.initial).toEqual({ rotate: 0, scale: 1, opacity: 1 });
		expect(ringVariants.animate).toEqual({
			rotate: 360,
			scale: [1, 1.1, 1],
			opacity: [1, 0.8, 1],
		});

		// Check dot animation
		const dotVariants = JSON.parse(dot.getAttribute("data-variants") || "{}");
		expect(dotVariants.initial).toEqual({ scale: 1, opacity: 1 });
		expect(dotVariants.animate).toEqual({
			scale: [1, 0.8, 1],
			opacity: [1, 0.6, 1],
		});
	});

	it("should have correct animation states", () => {
		const { container } = render(<DotRingLoader />);

		const motionDivs = container.querySelectorAll("[data-variants]");
		const ring = motionDivs[0];
		const dot = motionDivs[1];

		expect(ring).toHaveAttribute("data-initial", "initial");
		expect(ring).toHaveAttribute("data-animate", "animate");
		expect(dot).toHaveAttribute("data-initial", "initial");
		expect(dot).toHaveAttribute("data-animate", "animate");
	});

	it("should have correct transition settings", () => {
		const { container } = render(<DotRingLoader />);

		const motionDivs = container.querySelectorAll("[data-variants]");
		const ring = motionDivs[0];
		const dot = motionDivs[1];

		// Check ring transition
		const ringTransition = JSON.parse(
			ring.getAttribute("data-transition") || "{}"
		);
		expect(ringTransition.rotate.duration).toBe(1.2);
		expect(ringTransition.rotate.repeat).toBe(null); // JSON.stringify converts Infinity to null
		expect(ringTransition.rotate.ease).toBe("linear");
		expect(ringTransition.scale.duration).toBe(2);
		expect(ringTransition.opacity.duration).toBe(2);

		// Check dot transition
		const dotTransition = JSON.parse(
			dot.getAttribute("data-transition") || "{}"
		);
		expect(dotTransition.duration).toBe(2);
		expect(dotTransition.repeat).toBe(null); // JSON.stringify converts Infinity to null
		expect(dotTransition.ease).toBe("easeInOut");
	});

	it("should render with all props combined", () => {
		const { container } = render(
			<DotRingLoader size="lg" color="accent" className="combined-class" />
		);

		const wrapper = container.firstChild as HTMLElement;
		const ring = container.querySelectorAll("[data-variants]")[0];
		const dot = container.querySelectorAll("[data-variants]")[1];

		expect(wrapper).toHaveClass("combined-class");
		expect(ring).toHaveClass("w-8", "h-8", "text-accent");
		expect(dot).toHaveClass("w-2.5", "h-2.5", "text-accent");
	});

	it("should maintain consistent structure", () => {
		const { container } = render(<DotRingLoader />);

		// Should have wrapper div with two motion divs inside
		expect(container.children).toHaveLength(1);
		expect(container.firstChild?.childNodes).toHaveLength(2);
	});

	it("should handle edge case props", () => {
		const { container } = render(
			<DotRingLoader size="xs" color="muted" className="" />
		);

		const wrapper = container.firstChild as HTMLElement;
		const ring = container.querySelectorAll("[data-variants]")[0];
		const dot = container.querySelectorAll("[data-variants]")[1];

		expect(wrapper).toHaveClass(
			"relative",
			"flex",
			"items-center",
			"justify-center"
		);
		expect(ring).toHaveClass("w-4", "h-4", "text-muted-foreground");
		expect(dot).toHaveClass("w-1", "h-1", "text-muted-foreground");
	});
});
