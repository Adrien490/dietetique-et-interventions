import { Button } from "@/shared/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/components/ui/dialog";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock lucide-react
jest.mock("lucide-react", () => ({
	XIcon: () => <div data-testid="x-icon">×</div>,
}));

describe("Dialog Components", () => {
	describe("Dialog", () => {
		it("should render dialog trigger", () => {
			render(
				<Dialog>
					<DialogTrigger asChild>
						<Button>Open Dialog</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Test Dialog</DialogTitle>
							<DialogDescription>This is a test dialog</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			);

			const trigger = screen.getByRole("button", { name: "Open Dialog" });
			expect(trigger).toBeInTheDocument();
		});

		it("should open dialog when trigger is clicked", async () => {
			const user = userEvent.setup();

			render(
				<Dialog>
					<DialogTrigger asChild>
						<Button>Open Dialog</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Test Dialog</DialogTitle>
							<DialogDescription>This is a test dialog</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			);

			const trigger = screen.getByRole("button", { name: "Open Dialog" });
			await user.click(trigger);

			expect(screen.getByRole("dialog")).toBeInTheDocument();
			expect(
				screen.getByRole("heading", { name: "Test Dialog" })
			).toBeInTheDocument();
		});

		it("should render dialog content with proper structure", async () => {
			const user = userEvent.setup();

			render(
				<Dialog>
					<DialogTrigger asChild>
						<Button>Open Dialog</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Test Dialog</DialogTitle>
							<DialogDescription>
								This is a test dialog description
							</DialogDescription>
						</DialogHeader>
						<div>Dialog body content</div>
						<DialogFooter>
							<Button>Action</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			);

			await user.click(screen.getByRole("button", { name: "Open Dialog" }));

			expect(screen.getByRole("dialog")).toBeInTheDocument();
			expect(
				screen.getByRole("dialog").querySelector('[data-slot="dialog-header"]')
			).toBeInTheDocument();
			expect(screen.getByRole("heading")).toBeInTheDocument();
			expect(
				screen.getByText("This is a test dialog description")
			).toBeInTheDocument();
			expect(
				screen.getByRole("dialog").querySelector('[data-slot="dialog-footer"]')
			).toBeInTheDocument();
		});

		it("should render close button by default", async () => {
			const user = userEvent.setup();

			render(
				<Dialog>
					<DialogTrigger asChild>
						<Button>Open Dialog</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Test Dialog</DialogTitle>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			);

			await user.click(screen.getByRole("button", { name: "Open Dialog" }));

			const closeButton = screen.getByRole("button", { name: /Close/ });
			expect(closeButton).toBeInTheDocument();
			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("should hide close button when showCloseButton is false", async () => {
			const user = userEvent.setup();

			render(
				<Dialog>
					<DialogTrigger asChild>
						<Button>Open Dialog</Button>
					</DialogTrigger>
					<DialogContent showCloseButton={false}>
						<DialogHeader>
							<DialogTitle>Test Dialog</DialogTitle>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			);

			await user.click(screen.getByRole("button", { name: "Open Dialog" }));

			expect(
				screen.queryByRole("button", { name: "Close" })
			).not.toBeInTheDocument();
			expect(screen.queryByTestId("x-icon")).not.toBeInTheDocument();
		});

		it("should close dialog when close button is clicked", async () => {
			const user = userEvent.setup();

			render(
				<Dialog>
					<DialogTrigger asChild>
						<Button>Open Dialog</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Test Dialog</DialogTitle>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			);

			// Open dialog
			await user.click(screen.getByRole("button", { name: "Open Dialog" }));
			expect(screen.getByRole("dialog")).toBeInTheDocument();

			// Close dialog
			await user.click(screen.getByRole("button", { name: /Close/ }));
			expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		});

		it("should close dialog with DialogClose component", async () => {
			const user = userEvent.setup();

			render(
				<Dialog>
					<DialogTrigger asChild>
						<Button>Open Dialog</Button>
					</DialogTrigger>
					<DialogContent showCloseButton={false}>
						<DialogHeader>
							<DialogTitle>Test Dialog</DialogTitle>
						</DialogHeader>
						<DialogFooter>
							<DialogClose asChild>
								<Button>Cancel</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			);

			// Open dialog
			await user.click(screen.getByRole("button", { name: "Open Dialog" }));
			expect(screen.getByRole("dialog")).toBeInTheDocument();

			// Close dialog with custom close button
			await user.click(screen.getByRole("button", { name: "Cancel" }));
			expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		});

		it("should apply custom className", async () => {
			const user = userEvent.setup();

			render(
				<Dialog>
					<DialogTrigger asChild>
						<Button>Open Dialog</Button>
					</DialogTrigger>
					<DialogContent className="custom-dialog">
						<DialogHeader className="custom-header">
							<DialogTitle className="custom-title">Test Dialog</DialogTitle>
							<DialogDescription className="custom-description">
								Test description
							</DialogDescription>
						</DialogHeader>
						<DialogFooter className="custom-footer">
							<Button>OK</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			);

			await user.click(screen.getByRole("button", { name: "Open Dialog" }));

			expect(screen.getByRole("dialog")).toHaveClass("custom-dialog");
			expect(
				screen.getByRole("dialog").querySelector('[data-slot="dialog-header"]')
			).toHaveClass("custom-header");
			expect(screen.getByRole("heading")).toHaveClass("custom-title");
			expect(screen.getByText("Test description")).toHaveClass(
				"custom-description"
			);
			expect(
				screen.getByRole("dialog").querySelector('[data-slot="dialog-footer"]')
			).toHaveClass("custom-footer");
		});

		it("should handle escape key to close dialog", async () => {
			const user = userEvent.setup();

			render(
				<Dialog>
					<DialogTrigger asChild>
						<Button>Open Dialog</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Test Dialog</DialogTitle>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			);

			// Open dialog
			await user.click(screen.getByRole("button", { name: "Open Dialog" }));
			expect(screen.getByRole("dialog")).toBeInTheDocument();

			// Press Escape to close
			await user.keyboard("{Escape}");
			expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		});

		it("should render overlay", async () => {
			const user = userEvent.setup();

			render(
				<Dialog>
					<DialogTrigger asChild>
						<Button>Open Dialog</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Test Dialog</DialogTitle>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			);

			await user.click(screen.getByRole("button", { name: "Open Dialog" }));

			expect(screen.getByRole("dialog").previousSibling).toHaveAttribute(
				"data-slot",
				"dialog-overlay"
			);
		});
	});
});
