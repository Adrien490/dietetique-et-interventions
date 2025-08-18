import { Button } from "@/shared/components/ui/button";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock the utils function
jest.mock("@/shared/utils", () => ({
	cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

// Mock Radix Slot
jest.mock("@radix-ui/react-slot", () => ({
	Slot: ({ children, ...props }: any) => {
		// Return the child element with props spread on it
		if (children && children.type) {
			const ChildElement = children.type;
			return <ChildElement {...props} {...children.props} />;
		}
		return <div {...props}>{children}</div>;
	},
}));

describe("Button", () => {
	it("should render button with default props", () => {
		render(<Button>Click me</Button>);

		const button = screen.getByRole("button", { name: "Click me" });
		expect(button).toBeInTheDocument();
		expect(button).toHaveAttribute("data-slot", "button");
	});

	it("should handle click events", () => {
		const handleClick = jest.fn();
		render(<Button onClick={handleClick}>Click me</Button>);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("should apply default variant classes", () => {
		render(<Button>Default</Button>);

		const button = screen.getByRole("button");
		expect(button.className).toContain("bg-primary");
		expect(button.className).toContain("text-primary-foreground");
	});

	it("should apply destructive variant classes", () => {
		render(<Button variant="destructive">Delete</Button>);

		const button = screen.getByRole("button");
		expect(button.className).toContain("bg-destructive");
		expect(button.className).toContain("text-white");
	});

	it("should apply outline variant classes", () => {
		render(<Button variant="outline">Outline</Button>);

		const button = screen.getByRole("button");
		expect(button.className).toContain("border");
		expect(button.className).toContain("bg-background");
	});

	it("should apply secondary variant classes", () => {
		render(<Button variant="secondary">Secondary</Button>);

		const button = screen.getByRole("button");
		expect(button.className).toContain("bg-secondary");
		expect(button.className).toContain("text-secondary-foreground");
	});

	it("should apply ghost variant classes", () => {
		render(<Button variant="ghost">Ghost</Button>);

		const button = screen.getByRole("button");
		expect(button.className).toContain("hover:bg-accent");
	});

	it("should apply link variant classes", () => {
		render(<Button variant="link">Link</Button>);

		const button = screen.getByRole("button");
		expect(button.className).toContain("text-primary");
		expect(button.className).toContain("underline-offset-4");
	});

	it("should apply default size classes", () => {
		render(<Button>Default Size</Button>);

		const button = screen.getByRole("button");
		expect(button.className).toContain("h-9");
		expect(button.className).toContain("px-4");
	});

	it("should apply small size classes", () => {
		render(<Button size="sm">Small</Button>);

		const button = screen.getByRole("button");
		expect(button.className).toContain("h-8");
		expect(button.className).toContain("px-3");
	});

	it("should apply large size classes", () => {
		render(<Button size="lg">Large</Button>);

		const button = screen.getByRole("button");
		expect(button.className).toContain("h-10");
		expect(button.className).toContain("px-6");
	});

	it("should apply icon size classes", () => {
		render(
			<Button size="icon" aria-label="Icon button">
				Icon
			</Button>
		);

		const button = screen.getByRole("button");
		expect(button.className).toContain("size-9");
	});

	it("should be disabled when disabled prop is true", () => {
		render(<Button disabled>Disabled</Button>);

		const button = screen.getByRole("button");
		expect(button).toBeDisabled();
		expect(button.className).toContain("disabled:pointer-events-none");
		expect(button.className).toContain("disabled:opacity-50");
	});

	it("should accept custom className", () => {
		render(<Button className="custom-class">Custom</Button>);

		const button = screen.getByRole("button");
		expect(button.className).toContain("custom-class");
	});

	it("should pass through other button props", () => {
		render(
			<Button type="submit" id="submit-btn" aria-label="Submit form">
				Submit
			</Button>
		);

		const button = screen.getByRole("button");
		expect(button).toHaveAttribute("type", "submit");
		expect(button).toHaveAttribute("id", "submit-btn");
		expect(button).toHaveAttribute("aria-label", "Submit form");
	});

	it("should render as Slot when asChild is true", () => {
		render(
			<Button asChild>
				<a href="/test">Link Button</a>
			</Button>
		);

		// When asChild is true, it should render the child element
		const link = screen.getByRole("link", { name: "Link Button" });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/test");
		expect(link).toHaveAttribute("data-slot", "button");
	});

	it("should combine multiple variant and size classes correctly", () => {
		render(
			<Button variant="outline" size="lg" className="additional-class">
				Combined
			</Button>
		);

		const button = screen.getByRole("button");
		expect(button.className).toContain("border"); // outline variant
		expect(button.className).toContain("h-10"); // lg size
		expect(button.className).toContain("additional-class"); // custom class
	});

	it("should include focus and accessibility classes", () => {
		render(<Button>Accessible</Button>);

		const button = screen.getByRole("button");
		expect(button.className).toContain("outline-none");
		expect(button.className).toContain("focus-visible:border-ring");
		expect(button.className).toContain("focus-visible:ring-ring/50");
	});
});
