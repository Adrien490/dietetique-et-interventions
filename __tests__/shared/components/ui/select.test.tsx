import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock lucide-react
jest.mock("lucide-react", () => ({
	ChevronDownIcon: () => <div data-testid="chevron-down-icon">▼</div>,
	CheckIcon: () => <div data-testid="check-icon">✓</div>,
}));

// Mock scrollIntoView for jsdom
Object.defineProperty(window.HTMLElement.prototype, "scrollIntoView", {
	value: jest.fn(),
	writable: true,
});

describe("Select Components", () => {
	describe("Select", () => {
		it("should render select trigger", () => {
			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
						<SelectItem value="option2">Option 2</SelectItem>
					</SelectContent>
				</Select>
			);

			expect(screen.getByRole("combobox")).toBeInTheDocument();
			expect(screen.getByText("Select an option")).toBeInTheDocument();
		});

		it("should open select when trigger is clicked", async () => {
			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
						<SelectItem value="option2">Option 2</SelectItem>
					</SelectContent>
				</Select>
			);

			fireEvent.click(screen.getByRole("combobox"));

			await waitFor(() => {
				expect(
					screen.getByRole("option", { name: "Option 1" })
				).toBeInTheDocument();
				expect(
					screen.getByRole("option", { name: "Option 2" })
				).toBeInTheDocument();
			});
		});

		it("should select option when clicked", async () => {
			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
						<SelectItem value="option2">Option 2</SelectItem>
					</SelectContent>
				</Select>
			);

			fireEvent.click(screen.getByRole("combobox"));

			await waitFor(() => {
				expect(
					screen.getByRole("option", { name: "Option 1" })
				).toBeInTheDocument();
			});

			fireEvent.click(screen.getByRole("option", { name: "Option 1" }));

			await waitFor(() => {
				expect(screen.getByText("Option 1")).toBeInTheDocument();
			});
		});

		it("should handle disabled state", () => {
			render(
				<Select disabled>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>
			);

			const trigger = screen.getByRole("combobox");
			expect(trigger).toBeDisabled();
			expect(trigger).toHaveClass(
				"disabled:cursor-not-allowed",
				"disabled:opacity-50"
			);
		});

		it("should apply custom className", () => {
			render(
				<Select>
					<SelectTrigger className="custom-trigger">
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent className="custom-content">
						<SelectItem value="option1" className="custom-item">
							Option 1
						</SelectItem>
					</SelectContent>
				</Select>
			);

			expect(screen.getByRole("combobox")).toHaveClass("custom-trigger");
		});

		it("should render chevron icon", () => {
			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>
			);

			expect(screen.getByTestId("chevron-down-icon")).toBeInTheDocument();
		});

		it("should handle keyboard navigation", async () => {
			const user = userEvent.setup();

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
						<SelectItem value="option2">Option 2</SelectItem>
						<SelectItem value="option3">Option 3</SelectItem>
					</SelectContent>
				</Select>
			);

			const trigger = screen.getByRole("combobox");

			// Focus trigger
			trigger.focus();
			expect(trigger).toHaveFocus();

			// Open with Enter key
			await user.keyboard("{Enter}");
			expect(
				screen.getByRole("option", { name: "Option 1" })
			).toBeInTheDocument();

			// Navigate with arrow keys
			await user.keyboard("{ArrowDown}");
			await user.keyboard("{Enter}");

			// Should close and select option
			expect(screen.queryByRole("option")).not.toBeInTheDocument();
		});

		it("should support default value", () => {
			render(
				<Select defaultValue="option2">
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
						<SelectItem value="option2">Option 2</SelectItem>
					</SelectContent>
				</Select>
			);

			expect(screen.getByText("Option 2")).toBeInTheDocument();
		});

		it("should support controlled mode", async () => {
			const onValueChange = jest.fn();

			render(
				<Select value="option1" onValueChange={onValueChange}>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
						<SelectItem value="option2">Option 2</SelectItem>
					</SelectContent>
				</Select>
			);

			fireEvent.click(screen.getByRole("combobox"));

			await waitFor(() => {
				expect(
					screen.getByRole("option", { name: "Option 2" })
				).toBeInTheDocument();
			});

			fireEvent.click(screen.getByRole("option", { name: "Option 2" }));

			expect(onValueChange).toHaveBeenCalledWith("option2");
		});

		it("should render with multiple groups", async () => {
			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="fruit1">Apple</SelectItem>
						<SelectItem value="fruit2">Banana</SelectItem>
						<SelectItem value="vegetable1">Carrot</SelectItem>
						<SelectItem value="vegetable2">Lettuce</SelectItem>
					</SelectContent>
				</Select>
			);

			fireEvent.click(screen.getByRole("combobox"));

			await waitFor(() => {
				expect(
					screen.getByRole("option", { name: "Apple" })
				).toBeInTheDocument();
				expect(
					screen.getByRole("option", { name: "Banana" })
				).toBeInTheDocument();
				expect(
					screen.getByRole("option", { name: "Carrot" })
				).toBeInTheDocument();
				expect(
					screen.getByRole("option", { name: "Lettuce" })
				).toBeInTheDocument();
			});
		});
	});
});
