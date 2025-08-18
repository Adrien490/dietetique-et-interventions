import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { render, screen } from "@testing-library/react";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
	CheckIcon: () => <div data-testid="check-icon">✓</div>,
	ChevronRightIcon: () => <div data-testid="chevron-right-icon">›</div>,
	CircleIcon: () => <div data-testid="circle-icon">○</div>,
}));

describe("DropdownMenu Components", () => {
	describe("DropdownMenu", () => {
		it("should render basic dropdown menu", () => {
			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Item 1</DropdownMenuItem>
						<DropdownMenuItem>Item 2</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);

			const trigger = screen.getByText("Open Menu");
			expect(trigger).toBeInTheDocument();
		});

		it("should have correct data attributes", () => {
			render(
				<DropdownMenu>
					<DropdownMenuTrigger data-testid="trigger">Open</DropdownMenuTrigger>
					<DropdownMenuContent data-testid="content">
						<DropdownMenuItem data-testid="item">Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);

			const trigger = screen.getByTestId("trigger");
			expect(trigger).toHaveAttribute("data-slot", "dropdown-menu-trigger");
		});

		it("should render dropdown menu items", () => {
			render(
				<DropdownMenu defaultOpen>
					<DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Edit</DropdownMenuItem>
						<DropdownMenuItem>Delete</DropdownMenuItem>
						<DropdownMenuItem disabled>Disabled Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);

			expect(screen.getByText("Edit")).toBeInTheDocument();
			expect(screen.getByText("Delete")).toBeInTheDocument();
			expect(screen.getByText("Disabled Item")).toBeInTheDocument();
		});

		it("should render dropdown menu with separator", () => {
			render(
				<DropdownMenu defaultOpen>
					<DropdownMenuTrigger>Menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Item 1</DropdownMenuItem>
						<DropdownMenuSeparator data-testid="separator" />
						<DropdownMenuItem>Item 2</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);

			const separator = screen.getByTestId("separator");
			expect(separator).toBeInTheDocument();
			expect(separator).toHaveAttribute("data-slot", "dropdown-menu-separator");
		});

		it("should render dropdown menu with label", () => {
			render(
				<DropdownMenu defaultOpen>
					<DropdownMenuTrigger>Menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem>Edit</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);

			const label = screen.getByText("Actions");
			expect(label).toBeInTheDocument();
			expect(label).toHaveAttribute("data-slot", "dropdown-menu-label");
		});

		it("should render grouped menu items", () => {
			render(
				<DropdownMenu defaultOpen>
					<DropdownMenuTrigger>Menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuGroup data-testid="group">
							<DropdownMenuItem>Group Item 1</DropdownMenuItem>
							<DropdownMenuItem>Group Item 2</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			);

			const group = screen.getByTestId("group");
			expect(group).toBeInTheDocument();
			expect(group).toHaveAttribute("data-slot", "dropdown-menu-group");
		});

		it("should render checkbox items", () => {
			render(
				<DropdownMenu defaultOpen>
					<DropdownMenuTrigger>Menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuCheckboxItem checked={true}>
							Show Toolbar
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem checked={false}>
							Show Sidebar
						</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);

			expect(screen.getByText("Show Toolbar")).toBeInTheDocument();
			expect(screen.getByText("Show Sidebar")).toBeInTheDocument();
			expect(screen.getAllByTestId("check-icon")).toHaveLength(1);
		});

		it("should render radio group items", () => {
			render(
				<DropdownMenu defaultOpen>
					<DropdownMenuTrigger>Menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuRadioGroup value="option1">
							<DropdownMenuRadioItem value="option1">
								Option 1
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="option2">
								Option 2
							</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			);

			expect(screen.getByText("Option 1")).toBeInTheDocument();
			expect(screen.getByText("Option 2")).toBeInTheDocument();
			expect(screen.getByTestId("circle-icon")).toBeInTheDocument();
		});

			it("should render submenu", () => {
		render(
			<DropdownMenu defaultOpen>
				<DropdownMenuTrigger>Menu</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>More options</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							<DropdownMenuItem>Sub Item 1</DropdownMenuItem>
							<DropdownMenuItem>Sub Item 2</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
				</DropdownMenuContent>
			</DropdownMenu>
		);

		// Only test that the sub-trigger is rendered (sub-content may not be visible without interaction)
		expect(screen.getByText("More options")).toBeInTheDocument();
		expect(screen.getByTestId("chevron-right-icon")).toBeInTheDocument();
		
		// Sub items are only visible when the submenu is actually opened via interaction
		// In a real browser, this would require hovering over "More options"
	});

		it("should render shortcuts", () => {
			render(
				<DropdownMenu defaultOpen>
					<DropdownMenuTrigger>Menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>
							Edit
							<DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);

			expect(screen.getByText("Edit")).toBeInTheDocument();
			expect(screen.getByText("⌘E")).toBeInTheDocument();
		});

		it("should handle custom class names", () => {
			render(
				<DropdownMenu defaultOpen>
					<DropdownMenuTrigger className="custom-trigger">
						Menu
					</DropdownMenuTrigger>
					<DropdownMenuContent className="custom-content">
						<DropdownMenuItem className="custom-item">Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);

			const trigger = screen.getByText("Menu");
			expect(trigger).toHaveClass("custom-trigger");
		});

		it("should support controlled state", () => {
			const onOpenChange = jest.fn();

			render(
				<DropdownMenu open={false} onOpenChange={onOpenChange}>
					<DropdownMenuTrigger>Menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);

			// Menu should be closed
			expect(screen.queryByText("Item")).not.toBeInTheDocument();
		});

		it("should support different content positioning", () => {
			render(
				<DropdownMenu defaultOpen>
					<DropdownMenuTrigger>Menu</DropdownMenuTrigger>
					<DropdownMenuContent
						side="top"
						align="start"
						sideOffset={10}
						data-testid="content"
					>
						<DropdownMenuItem>Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);

			const content = screen.getByTestId("content");
			expect(content).toBeInTheDocument();
		});
	});
});
