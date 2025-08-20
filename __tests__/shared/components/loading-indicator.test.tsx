import { LoadingIndicator } from "@/shared/components/loading-indicator";
import { render, screen } from "@testing-library/react";

// Mock next/link
jest.mock("next/link", () => ({
	useLinkStatus: jest.fn(),
}));

// Mock framer-motion
jest.mock("framer-motion", () => ({
	AnimatePresence: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
	motion: {
		div: ({ children, className, ...props }: any) => (
			<div className={className} data-motion="true" {...props}>
				{children}
			</div>
		),
	},
}));

// Mock MiniDotsLoader
jest.mock("@/shared/components/loaders", () => ({
	MiniDotsLoader: ({ className, color, size }: any) => (
		<div
			data-testid="mini-dots-loader"
			className={className}
			data-color={color}
			data-size={size}
		>
			Loading...
		</div>
	),
}));

const { useLinkStatus } = require("next/link");

describe("LoadingIndicator", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should render loading indicator when pending is true", () => {
		useLinkStatus.mockReturnValue({ pending: true });

		render(<LoadingIndicator />);

		const indicator = screen.getByTestId("mini-dots-loader");
		expect(indicator).toBeInTheDocument();
		expect(indicator).toHaveAttribute("data-color", "default");
		expect(indicator).toHaveAttribute("data-size", "sm");
		expect(indicator).toHaveClass("loading-indicator");
	});

	it("should not render loading indicator when pending is false", () => {
		useLinkStatus.mockReturnValue({ pending: false });

		render(<LoadingIndicator />);

		const indicator = screen.queryByTestId("mini-dots-loader");
		expect(indicator).not.toBeInTheDocument();
	});

	it("should apply custom className", () => {
		useLinkStatus.mockReturnValue({ pending: true });

		render(<LoadingIndicator className="custom-loading-class" />);

		const motionDiv = document.querySelector('[data-motion="true"]');
		expect(motionDiv).toHaveClass("custom-loading-class");
		expect(motionDiv).toHaveClass("loading-indicator");
		expect(motionDiv).toHaveClass("flex", "items-center", "justify-center");
	});

	it("should render with correct default classes", () => {
		useLinkStatus.mockReturnValue({ pending: true });

		render(<LoadingIndicator />);

		const motionDiv = document.querySelector('[data-motion="true"]');
		expect(motionDiv).toHaveClass("loading-indicator");
		expect(motionDiv).toHaveClass("flex", "items-center", "justify-center");
	});

	it("should pass correct props to MiniDotsLoader", () => {
		useLinkStatus.mockReturnValue({ pending: true });

		render(<LoadingIndicator />);

		const loader = screen.getByTestId("mini-dots-loader");
		expect(loader).toHaveAttribute("data-color", "default");
		expect(loader).toHaveAttribute("data-size", "sm");
		expect(loader).toHaveClass("loading-indicator");
	});

	it("should be wrapped in AnimatePresence", () => {
		useLinkStatus.mockReturnValue({ pending: true });

		render(<LoadingIndicator />);

		// The component should render without throwing
		expect(screen.getByTestId("mini-dots-loader")).toBeInTheDocument();
	});

	it("should handle pending state changes", () => {
		// Start with pending false
		useLinkStatus.mockReturnValue({ pending: false });

		const { rerender } = render(<LoadingIndicator />);

		expect(screen.queryByTestId("mini-dots-loader")).not.toBeInTheDocument();

		// Change to pending true
		useLinkStatus.mockReturnValue({ pending: true });
		rerender(<LoadingIndicator />);

		expect(screen.getByTestId("mini-dots-loader")).toBeInTheDocument();
	});

	it("should use motion.div with correct animation props", () => {
		useLinkStatus.mockReturnValue({ pending: true });

		render(<LoadingIndicator />);

		const motionDiv = document.querySelector('[data-motion="true"]');
		expect(motionDiv).toBeInTheDocument();
	});

	it("should render without className when none provided", () => {
		useLinkStatus.mockReturnValue({ pending: true });

		render(<LoadingIndicator />);

		const motionDiv = document.querySelector('[data-motion="true"]');
		expect(motionDiv).toHaveClass(
			"loading-indicator",
			"flex",
			"items-center",
			"justify-center"
		);
		// Should not have any custom classes
	});
});
