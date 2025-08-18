import { MiniDotsLoader } from "@/shared/components/loaders/mini-dots-loader";
import { render, screen } from "@testing-library/react";

// Mock de framer-motion
jest.mock("framer-motion", () => ({
	motion: {
		div: ({ children, className, variants, initial, animate, ...props }: any) => (
			<div
				data-testid="motion-container"
				className={className}
				data-variants={JSON.stringify(variants)}
				data-initial={initial}
				data-animate={animate}
				{...props}
			>
				{children}
			</div>
		),
		span: ({ className, variants, transition, ...props }: any) => (
			<span
				data-testid="motion-dot"
				className={className}
				data-variants={JSON.stringify(variants)}
				data-transition={JSON.stringify(transition)}
				{...props}
			/>
		),
	},
}));

// Mock des constantes
jest.mock("@/shared/components/loaders/mini-dots-loader/constants", () => ({
	sizeClasses: {
		dots: {
			sm: "w-1 h-1",
			md: "w-2 h-2",
			lg: "w-3 h-3",
		},
	},
	bgColorClass: {
		primary: "bg-primary",
		secondary: "bg-secondary",
		muted: "bg-muted-foreground",
	},
	loaderAnimations: {
		container: {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
		},
		dot: {
			initial: { scale: 0 },
			animate: { scale: 1 },
		},
	},
}));

// Mock du cn utility
jest.mock("@/shared/utils", () => ({
	cn: (...classes: any[]) => classes.filter(Boolean).join(" "),
}));

describe("MiniDotsLoader", () => {
	it("should render mini dots loader", () => {
		render(<MiniDotsLoader />);

		expect(screen.getByTestId("motion-container")).toBeInTheDocument();
		expect(screen.getAllByTestId("motion-dot")).toHaveLength(3);
	});

	it("should apply default props", () => {
		render(<MiniDotsLoader />);

		const container = screen.getByTestId("motion-container");
		expect(container).toHaveClass("inline-flex", "gap-0.5");

		const dots = screen.getAllByTestId("motion-dot");
		dots.forEach(dot => {
			expect(dot).toHaveClass("inline-block", "rounded-full", "w-1", "h-1", "bg-primary");
		});
	});

	it("should apply small size variant", () => {
		render(<MiniDotsLoader size="sm" />);

		const dots = screen.getAllByTestId("motion-dot");
		dots.forEach(dot => {
			expect(dot).toHaveClass("w-1", "h-1");
		});
	});

	it("should apply medium size variant", () => {
		render(<MiniDotsLoader size="md" />);

		const dots = screen.getAllByTestId("motion-dot");
		dots.forEach(dot => {
			expect(dot).toHaveClass("w-2", "h-2");
		});
	});

	it("should apply large size variant", () => {
		render(<MiniDotsLoader size="lg" />);

		const dots = screen.getAllByTestId("motion-dot");
		dots.forEach(dot => {
			expect(dot).toHaveClass("w-3", "h-3");
		});
	});

	it("should apply primary color variant", () => {
		render(<MiniDotsLoader color="primary" />);

		const dots = screen.getAllByTestId("motion-dot");
		dots.forEach(dot => {
			expect(dot).toHaveClass("bg-primary");
		});
	});

	it("should apply secondary color variant", () => {
		render(<MiniDotsLoader color="secondary" />);

		const dots = screen.getAllByTestId("motion-dot");
		dots.forEach(dot => {
			expect(dot).toHaveClass("bg-secondary");
		});
	});

	it("should apply muted color variant", () => {
		render(<MiniDotsLoader color="muted" />);

		const dots = screen.getAllByTestId("motion-dot");
		dots.forEach(dot => {
			expect(dot).toHaveClass("bg-muted-foreground");
		});
	});

	it("should apply custom className", () => {
		render(<MiniDotsLoader className="custom-loader" />);

		const container = screen.getByTestId("motion-container");
		expect(container).toHaveClass("custom-loader");
	});

	it("should combine size and color variants", () => {
		render(<MiniDotsLoader size="lg" color="secondary" />);

		const dots = screen.getAllByTestId("motion-dot");
		dots.forEach(dot => {
			expect(dot).toHaveClass("w-3", "h-3", "bg-secondary");
		});
	});

	it("should have correct animation properties", () => {
		render(<MiniDotsLoader />);

		const dots = screen.getAllByTestId("motion-dot");
		
		dots.forEach((dot, index) => {
			const transition = JSON.parse(dot.getAttribute("data-transition") || "{}");
			
			expect(transition.duration).toBe(0.6);
			// Framer Motion may serialize Infinity as null in tests
			expect(transition.repeat === Infinity || transition.repeat === null).toBe(true);
			expect(transition.ease).toBe("easeInOut");
			expect(transition.delay).toBe(index * 0.1);
			expect(transition.repeatDelay).toBe(0.1);
		});
	});

	it("should have staggered delays", () => {
		render(<MiniDotsLoader />);

		const dots = screen.getAllByTestId("motion-dot");
		
		dots.forEach((dot, index) => {
			const transition = JSON.parse(dot.getAttribute("data-transition") || "{}");
			expect(transition.delay).toBe(index * 0.1);
		});
	});

	it("should render exactly 3 dots", () => {
		render(<MiniDotsLoader />);

		expect(screen.getAllByTestId("motion-dot")).toHaveLength(3);
	});

	it("should have inline layout", () => {
		render(<MiniDotsLoader />);

		const container = screen.getByTestId("motion-container");
		expect(container).toHaveClass("inline-flex");
	});

	it("should apply rounded style to dots", () => {
		render(<MiniDotsLoader />);

		const dots = screen.getAllByTestId("motion-dot");
		dots.forEach(dot => {
			expect(dot).toHaveClass("rounded-full");
		});
	});

	it("should have proper container animation", () => {
		render(<MiniDotsLoader />);

		const container = screen.getByTestId("motion-container");
		expect(container).toHaveAttribute("data-initial", "initial");
		expect(container).toHaveAttribute("data-animate", "animate");
	});

	it("should handle all prop combinations", () => {
		render(
			<MiniDotsLoader
				size="md"
				color="secondary"
				className="test-class"
			/>
		);

		const container = screen.getByTestId("motion-container");
		expect(container).toHaveClass("test-class");

		const dots = screen.getAllByTestId("motion-dot");
		dots.forEach(dot => {
			expect(dot).toHaveClass("w-2", "h-2", "bg-secondary");
		});
	});

	it("should maintain consistent structure", () => {
		render(<MiniDotsLoader />);

		const container = screen.getByTestId("motion-container");
		const dots = screen.getAllByTestId("motion-dot");

		expect(container).toBeInTheDocument();
		expect(dots).toHaveLength(3);
		
		dots.forEach(dot => {
			expect(dot.tagName).toBe("SPAN");
		});
	});

	it("should have correct gap between dots", () => {
		render(<MiniDotsLoader />);

		const container = screen.getByTestId("motion-container");
		expect(container).toHaveClass("gap-0.5");
	});
});
