import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("AlertDialog Components", () => {
	describe("AlertDialog", () => {
		it("should render alert dialog trigger", () => {
			render(
				<AlertDialog>
					<AlertDialogTrigger>Open Alert</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Test Alert</AlertDialogTitle>
						</AlertDialogHeader>
					</AlertDialogContent>
				</AlertDialog>
			);

			expect(
				screen.getByRole("button", { name: "Open Alert" })
			).toBeInTheDocument();
		});

		it("should open alert dialog when trigger is clicked", async () => {
			const user = userEvent.setup();

			render(
				<AlertDialog>
					<AlertDialogTrigger>Open Alert</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Test Alert</AlertDialogTitle>
							<AlertDialogDescription>
								Are you sure you want to continue?
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction>Continue</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			);

			await user.click(screen.getByRole("button", { name: "Open Alert" }));

			expect(screen.getByRole("alertdialog")).toBeInTheDocument();
			expect(
				screen.getByRole("heading", { name: "Test Alert" })
			).toBeInTheDocument();
			expect(
				screen.getByText("Are you sure you want to continue?")
			).toBeInTheDocument();
		});

		it("should render action and cancel buttons", async () => {
			const user = userEvent.setup();

			render(
				<AlertDialog>
					<AlertDialogTrigger>Open Alert</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Test Alert</AlertDialogTitle>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction>Continue</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			);

			await user.click(screen.getByRole("button", { name: "Open Alert" }));

			expect(
				screen.getByRole("button", { name: "Cancel" })
			).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: "Continue" })
			).toBeInTheDocument();
		});

		it("should close dialog when cancel is clicked", async () => {
			const user = userEvent.setup();

			render(
				<AlertDialog>
					<AlertDialogTrigger>Open Alert</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Test Alert</AlertDialogTitle>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction>Continue</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			);

			// Open dialog
			await user.click(screen.getByRole("button", { name: "Open Alert" }));
			expect(screen.getByRole("alertdialog")).toBeInTheDocument();

			// Close dialog
			await user.click(screen.getByRole("button", { name: "Cancel" }));
			expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
		});

		it("should apply custom className", async () => {
			const user = userEvent.setup();

			render(
				<AlertDialog>
					<AlertDialogTrigger>Open Alert</AlertDialogTrigger>
					<AlertDialogContent className="custom-alert">
						<AlertDialogHeader className="custom-header">
							<AlertDialogTitle className="custom-title">
								Test Alert
							</AlertDialogTitle>
							<AlertDialogDescription className="custom-description">
								Test description
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter className="custom-footer">
							<AlertDialogCancel className="custom-cancel">
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction className="custom-action">
								Continue
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			);

			await user.click(screen.getByRole("button", { name: "Open Alert" }));

			expect(screen.getByRole("alertdialog")).toHaveClass("custom-alert");
			expect(
				screen
					.getByRole("alertdialog")
					.querySelector('[data-slot="alert-dialog-header"]')
			).toHaveClass("custom-header");
			expect(screen.getByRole("heading")).toHaveClass("custom-title");
			expect(screen.getByText("Test description")).toHaveClass(
				"custom-description"
			);
			expect(
				screen
					.getByRole("alertdialog")
					.querySelector('[data-slot="alert-dialog-footer"]')
			).toHaveClass("custom-footer");
		});

		it("should handle escape key to close dialog", async () => {
			const user = userEvent.setup();

			render(
				<AlertDialog>
					<AlertDialogTrigger>Open Alert</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Test Alert</AlertDialogTitle>
						</AlertDialogHeader>
					</AlertDialogContent>
				</AlertDialog>
			);

			// Open dialog
			await user.click(screen.getByRole("button", { name: "Open Alert" }));
			expect(screen.getByRole("alertdialog")).toBeInTheDocument();

			// Press escape key
			await user.keyboard("{Escape}");
			expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
		});

		it("should support destructive actions", async () => {
			const user = userEvent.setup();

			render(
				<AlertDialog>
					<AlertDialogTrigger>Delete Item</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Delete Item</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction variant="destructive">
								Delete
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			);

			await user.click(screen.getByRole("button", { name: "Delete Item" }));

			const deleteButton = screen.getByRole("button", { name: "Delete" });
			expect(deleteButton).toBeInTheDocument();
					expect(deleteButton).toHaveClass(
			"bg-destructive",
			"text-white"
		);
		});
	});
});








