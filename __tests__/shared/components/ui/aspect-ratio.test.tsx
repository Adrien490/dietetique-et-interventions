import { AspectRatio } from "@/shared/components/ui/aspect-ratio";
import { render, screen } from "@testing-library/react";

// Mock Radix AspectRatio
jest.mock("@radix-ui/react-aspect-ratio", () => ({
	Root: ({ children, ratio, ...props }: any) => (
		<div data-testid="aspect-ratio" data-ratio={ratio} {...props}>
			{children}
		</div>
	),
}));

describe("AspectRatio", () => {
	it("should render with default props", () => {
		render(
			<AspectRatio>
				<div data-testid="content">Content</div>
			</AspectRatio>
		);

		const aspectRatio = screen.getByTestId("aspect-ratio");
		expect(aspectRatio).toBeInTheDocument();
		expect(aspectRatio).toHaveAttribute("data-slot", "aspect-ratio");
		expect(screen.getByTestId("content")).toBeInTheDocument();
	});

	it("should render with specified ratio", () => {
		render(
			<AspectRatio ratio={16 / 9}>
				<img src="/test.jpg" alt="Test" />
			</AspectRatio>
		);

		const aspectRatio = screen.getByTestId("aspect-ratio");
		expect(aspectRatio).toHaveAttribute("data-ratio", String(16 / 9));
	});

	it("should render with different aspect ratios", () => {
		const { rerender } = render(
			<AspectRatio ratio={1}>
				<div>Square</div>
			</AspectRatio>
		);

		let aspectRatio = screen.getByTestId("aspect-ratio");
		expect(aspectRatio).toHaveAttribute("data-ratio", "1");

		rerender(
			<AspectRatio ratio={4 / 3}>
				<div>4:3</div>
			</AspectRatio>
		);

		aspectRatio = screen.getByTestId("aspect-ratio");
		expect(aspectRatio).toHaveAttribute("data-ratio", String(4 / 3));
	});

	it("should pass through additional props", () => {
		render(
			<AspectRatio className="custom-class" id="aspect-ratio-id" ratio={2}>
				<div>Content</div>
			</AspectRatio>
		);

		const aspectRatio = screen.getByTestId("aspect-ratio");
		expect(aspectRatio).toHaveAttribute("class", "custom-class");
		expect(aspectRatio).toHaveAttribute("id", "aspect-ratio-id");
		expect(aspectRatio).toHaveAttribute("data-ratio", "2");
	});

	it("should render children correctly", () => {
		render(
			<AspectRatio ratio={16 / 9}>
				<img src="/image.jpg" alt="Test image" />
				<div className="overlay">Overlay content</div>
			</AspectRatio>
		);

		expect(screen.getByAltText("Test image")).toBeInTheDocument();
		expect(screen.getByText("Overlay content")).toBeInTheDocument();
	});

	it("should handle complex children", () => {
		render(
			<AspectRatio ratio={1}>
				<div className="container">
					<header>Header</header>
					<main>
						<p>Main content</p>
						<button>Action</button>
					</main>
					<footer>Footer</footer>
				</div>
			</AspectRatio>
		);

		expect(screen.getByText("Header")).toBeInTheDocument();
		expect(screen.getByText("Main content")).toBeInTheDocument();
		expect(screen.getByText("Action")).toBeInTheDocument();
		expect(screen.getByText("Footer")).toBeInTheDocument();
	});

	it("should render without ratio prop", () => {
		render(
			<AspectRatio>
				<div>No ratio specified</div>
			</AspectRatio>
		);

		const aspectRatio = screen.getByTestId("aspect-ratio");
		expect(aspectRatio).toBeInTheDocument();
		expect(aspectRatio).not.toHaveAttribute("data-ratio");
		expect(screen.getByText("No ratio specified")).toBeInTheDocument();
	});

	it("should handle string children", () => {
		render(<AspectRatio ratio={1}>Simple text content</AspectRatio>);

		expect(screen.getByText("Simple text content")).toBeInTheDocument();
	});

	it("should handle null/undefined children", () => {
		render(<AspectRatio ratio={1}>{null}</AspectRatio>);

		const aspectRatio = screen.getByTestId("aspect-ratio");
		expect(aspectRatio).toBeInTheDocument();
		expect(aspectRatio).toBeEmptyDOMElement();
	});

	it("should maintain data-slot attribute", () => {
		render(
			<AspectRatio ratio={16 / 9} data-custom="value">
				<div>Content</div>
			</AspectRatio>
		);

		const aspectRatio = screen.getByTestId("aspect-ratio");
		expect(aspectRatio).toHaveAttribute("data-slot", "aspect-ratio");
		expect(aspectRatio).toHaveAttribute("data-custom", "value");
	});

	it("should work with common aspect ratios", () => {
		const commonRatios = [
			{ ratio: 1, name: "Square" },
			{ ratio: 4 / 3, name: "4:3" },
			{ ratio: 16 / 9, name: "16:9" },
			{ ratio: 21 / 9, name: "Ultrawide" },
			{ ratio: 3 / 4, name: "Portrait 3:4" },
		];

		commonRatios.forEach(({ ratio, name }) => {
			const { unmount } = render(
				<AspectRatio ratio={ratio}>
					<div>{name}</div>
				</AspectRatio>
			);

			const aspectRatio = screen.getByTestId("aspect-ratio");
			expect(aspectRatio).toHaveAttribute("data-ratio", String(ratio));
			expect(screen.getByText(name)).toBeInTheDocument();
			
			unmount();
		});
	});

	it("should handle decimal ratios correctly", () => {
		const decimalRatio = 1.777777777777778; // 16/9 with floating point precision

		render(
			<AspectRatio ratio={decimalRatio}>
				<div>Decimal ratio</div>
			</AspectRatio>
		);

		const aspectRatio = screen.getByTestId("aspect-ratio");
		expect(aspectRatio).toHaveAttribute("data-ratio", String(decimalRatio));
	});

	it("should be accessible", () => {
		render(
			<AspectRatio ratio={16 / 9} role="img" aria-label="Video container">
				<video controls>
					<source src="/video.mp4" type="video/mp4" />
				</video>
			</AspectRatio>
		);

		const aspectRatio = screen.getByTestId("aspect-ratio");
		expect(aspectRatio).toHaveAttribute("role", "img");
		expect(aspectRatio).toHaveAttribute("aria-label", "Video container");
	});
});



