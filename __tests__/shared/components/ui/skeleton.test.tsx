import { Skeleton } from "@/shared/components/ui/skeleton";
import { render, screen } from "@testing-library/react";

describe("Skeleton", () => {
	it("should render skeleton element", () => {
		render(<Skeleton data-testid="skeleton" />);

		const skeleton = screen.getByTestId("skeleton");
		expect(skeleton).toBeInTheDocument();
	});

	it("should apply default classes", () => {
		render(<Skeleton data-testid="skeleton" />);

		const skeleton = screen.getByTestId("skeleton");
		expect(skeleton).toHaveClass("bg-accent", "animate-pulse", "rounded-md");
	});

	it("should accept custom className", () => {
		render(<Skeleton className="custom-skeleton" data-testid="skeleton" />);

		const skeleton = screen.getByTestId("skeleton");
		expect(skeleton).toHaveClass("custom-skeleton");
		expect(skeleton).toHaveClass("bg-accent", "animate-pulse", "rounded-md");
	});

	it("should have data-slot attribute", () => {
		render(<Skeleton data-testid="skeleton" />);

		const skeleton = screen.getByTestId("skeleton");
		expect(skeleton).toHaveAttribute("data-slot", "skeleton");
	});

	it("should accept standard div props", () => {
		render(
			<Skeleton
				data-testid="skeleton"
				id="test-skeleton"
				role="status"
				aria-label="Loading content"
			/>
		);

		const skeleton = screen.getByTestId("skeleton");
		expect(skeleton).toHaveAttribute("id", "test-skeleton");
		expect(skeleton).toHaveAttribute("role", "status");
		expect(skeleton).toHaveAttribute("aria-label", "Loading content");
	});

	it("should render as div element", () => {
		render(<Skeleton data-testid="skeleton" />);

		const skeleton = screen.getByTestId("skeleton");
		expect(skeleton.tagName).toBe("DIV");
	});

	it("should handle style prop", () => {
		const styles = { width: "100px", height: "20px" };
		render(<Skeleton data-testid="skeleton" style={styles} />);

		const skeleton = screen.getByTestId("skeleton");
		expect(skeleton).toHaveStyle("width: 100px");
		expect(skeleton).toHaveStyle("height: 20px");
	});

	it("should handle onClick and other event handlers", () => {
		const handleClick = jest.fn();
		render(<Skeleton data-testid="skeleton" onClick={handleClick} />);

		const skeleton = screen.getByTestId("skeleton");
		skeleton.click();

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("should handle children content", () => {
		render(
			<Skeleton data-testid="skeleton">
				<span>Loading content</span>
			</Skeleton>
		);

		expect(screen.getByText("Loading content")).toBeInTheDocument();
	});

	it("should combine custom classes with default classes", () => {
		render(<Skeleton className="w-full h-4" data-testid="skeleton" />);

		const skeleton = screen.getByTestId("skeleton");
		expect(skeleton).toHaveClass(
			"bg-accent",
			"animate-pulse",
			"rounded-md",
			"w-full",
			"h-4"
		);
	});

	it("should handle multiple custom classes", () => {
		render(<Skeleton className="w-full h-4 mb-2" data-testid="skeleton" />);

		const skeleton = screen.getByTestId("skeleton");
		expect(skeleton).toHaveClass("w-full", "h-4", "mb-2");
	});

	it("should work with accessibility attributes", () => {
		render(
			<Skeleton
				data-testid="skeleton"
				aria-live="polite"
				aria-busy="true"
				role="status"
			/>
		);

		const skeleton = screen.getByTestId("skeleton");
		expect(skeleton).toHaveAttribute("aria-live", "polite");
		expect(skeleton).toHaveAttribute("aria-busy", "true");
		expect(skeleton).toHaveAttribute("role", "status");
	});
});

