import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import { render, screen } from "@testing-library/react";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
	ChevronRight: () => <div data-testid="chevron-right-icon">ChevronRight</div>,
	MoreHorizontal: () => (
		<div data-testid="more-horizontal-icon">MoreHorizontal</div>
	),
}));

describe("Breadcrumb Components", () => {
	describe("Breadcrumb", () => {
		it("should render nav element with breadcrumb aria-label", () => {
			render(<Breadcrumb data-testid="breadcrumb-nav" />);

			const nav = screen.getByTestId("breadcrumb-nav");
			expect(nav).toBeInTheDocument();
			expect(nav).toHaveAttribute("aria-label", "breadcrumb");
			expect(nav).toHaveAttribute("data-slot", "breadcrumb");
		});

		it("should accept custom props", () => {
			render(<Breadcrumb className="custom-class" id="custom-id" />);

			const nav = screen.getByRole("navigation");
			expect(nav).toHaveClass("custom-class");
			expect(nav).toHaveAttribute("id", "custom-id");
		});
	});

	describe("BreadcrumbList", () => {
		it("should render ordered list with correct classes", () => {
			render(<BreadcrumbList data-testid="breadcrumb-list" />);

			const list = screen.getByTestId("breadcrumb-list");
			expect(list).toBeInTheDocument();
			expect(list.tagName).toBe("OL");
			expect(list).toHaveAttribute("data-slot", "breadcrumb-list");
			expect(list).toHaveClass(
				"text-muted-foreground",
				"flex",
				"flex-wrap",
				"items-center"
			);
		});

		it("should merge custom className", () => {
			render(<BreadcrumbList className="custom-list-class" />);

			const list = screen.getByRole("list");
			expect(list).toHaveClass("custom-list-class", "text-muted-foreground");
		});
	});

	describe("BreadcrumbItem", () => {
		it("should render list item with correct classes", () => {
			render(
				<BreadcrumbItem data-testid="breadcrumb-item">Item</BreadcrumbItem>
			);

			const item = screen.getByTestId("breadcrumb-item");
			expect(item).toBeInTheDocument();
			expect(item.tagName).toBe("LI");
			expect(item).toHaveAttribute("data-slot", "breadcrumb-item");
			expect(item).toHaveClass("inline-flex", "items-center", "gap-1.5");
		});
	});

	describe("BreadcrumbLink", () => {
		it("should render anchor with correct classes when href provided", () => {
			render(
				<BreadcrumbLink href="/test" data-testid="breadcrumb-link">
					Link
				</BreadcrumbLink>
			);

			const link = screen.getByTestId("breadcrumb-link");
			expect(link).toBeInTheDocument();
			expect(link.tagName).toBe("A");
			expect(link).toHaveAttribute("href", "/test");
			expect(link).toHaveClass("transition-colors", "hover:text-foreground");
		});

		it("should render anchor when no href provided", () => {
			render(
				<BreadcrumbLink data-testid="breadcrumb-span">Span</BreadcrumbLink>
			);

			const link = screen.getByTestId("breadcrumb-span");
			expect(link).toBeInTheDocument();
			expect(link.tagName).toBe("A");
		});

		it("should handle asChild prop", () => {
			render(
				<BreadcrumbLink asChild>
					<button data-testid="custom-button">Custom Button</button>
				</BreadcrumbLink>
			);

			const button = screen.getByTestId("custom-button");
			expect(button).toBeInTheDocument();
			expect(button.tagName).toBe("BUTTON");
		});
	});

	describe("BreadcrumbPage", () => {
		it("should render span with correct classes and aria-current", () => {
			render(
				<BreadcrumbPage data-testid="breadcrumb-page">
					Current Page
				</BreadcrumbPage>
			);

			const page = screen.getByTestId("breadcrumb-page");
			expect(page).toBeInTheDocument();
			expect(page.tagName).toBe("SPAN");
			expect(page).toHaveAttribute("role", "link");
			expect(page).toHaveAttribute("aria-disabled", "true");
			expect(page).toHaveAttribute("aria-current", "page");
			expect(page).toHaveClass("font-normal", "text-foreground");
		});
	});

	describe("BreadcrumbSeparator", () => {
		it("should render separator with default ChevronRight icon", () => {
			render(<BreadcrumbSeparator data-testid="breadcrumb-separator" />);

			const separator = screen.getByTestId("breadcrumb-separator");
			expect(separator).toBeInTheDocument();
			expect(separator).toHaveAttribute("role", "presentation");
			expect(separator).toHaveAttribute("aria-hidden", "true");

			const icon = screen.getByTestId("chevron-right-icon");
			expect(icon).toBeInTheDocument();
		});

		it("should render custom children instead of default icon", () => {
			render(
				<BreadcrumbSeparator data-testid="custom-separator">
					<span>|</span>
				</BreadcrumbSeparator>
			);

			const separator = screen.getByTestId("custom-separator");
			expect(separator).toBeInTheDocument();
			expect(screen.getByText("|")).toBeInTheDocument();
			expect(
				screen.queryByTestId("chevron-right-icon")
			).not.toBeInTheDocument();
		});
	});

	describe("BreadcrumbEllipsis", () => {
		it("should render ellipsis with MoreHorizontal icon", () => {
			render(<BreadcrumbEllipsis data-testid="breadcrumb-ellipsis" />);

			const ellipsis = screen.getByTestId("breadcrumb-ellipsis");
			expect(ellipsis).toBeInTheDocument();
			expect(ellipsis).toHaveAttribute("role", "presentation");
			expect(ellipsis).toHaveAttribute("aria-hidden", "true");
			expect(ellipsis).toHaveClass(
				"flex",
				"size-9",
				"items-center",
				"justify-center"
			);

			const icon = screen.getByTestId("more-horizontal-icon");
			expect(icon).toBeInTheDocument();
		});

		it("should have correct accessibility attributes", () => {
			render(<BreadcrumbEllipsis />);

			const ellipsis = screen.getByRole("presentation", { hidden: true });
			expect(ellipsis).toHaveAttribute("aria-hidden", "true");
		});
	});

	describe("Full Breadcrumb Example", () => {
		it("should render complete breadcrumb navigation", () => {
			render(
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">Home</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href="/products">Products</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Current Product</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			);

			expect(screen.getByRole("navigation")).toBeInTheDocument();
			expect(screen.getByRole("list")).toBeInTheDocument();
			expect(screen.getByText("Home")).toBeInTheDocument();
			expect(screen.getByText("Products")).toBeInTheDocument();
			expect(screen.getByText("Current Product")).toBeInTheDocument();
			expect(screen.getAllByTestId("chevron-right-icon")).toHaveLength(2);
		});
	});
});
