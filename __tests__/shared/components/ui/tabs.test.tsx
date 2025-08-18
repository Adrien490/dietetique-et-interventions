import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/shared/components/ui/tabs";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Tabs Components", () => {
	describe("Tabs", () => {
		it("should render tabs with triggers and content", () => {
			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
						<TabsTrigger value="tab2">Tab 2</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1">Content for Tab 1</TabsContent>
					<TabsContent value="tab2">Content for Tab 2</TabsContent>
				</Tabs>
			);

			expect(screen.getByRole("tablist")).toBeInTheDocument();
			expect(screen.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument();
			expect(screen.getByRole("tab", { name: "Tab 2" })).toBeInTheDocument();
			expect(screen.getByRole("tabpanel")).toBeInTheDocument();
			expect(screen.getByText("Content for Tab 1")).toBeInTheDocument();
		});

		it("should switch tabs when trigger is clicked", async () => {
			const user = userEvent.setup();

			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
						<TabsTrigger value="tab2">Tab 2</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1">Content for Tab 1</TabsContent>
					<TabsContent value="tab2">Content for Tab 2</TabsContent>
				</Tabs>
			);

			// Initially Tab 1 is active
			expect(screen.getByText("Content for Tab 1")).toBeInTheDocument();
			expect(screen.queryByText("Content for Tab 2")).not.toBeInTheDocument();

			// Click Tab 2
			await user.click(screen.getByRole("tab", { name: "Tab 2" }));

			// Now Tab 2 should be active
			expect(screen.getByText("Content for Tab 2")).toBeInTheDocument();
			expect(screen.queryByText("Content for Tab 1")).not.toBeInTheDocument();
		});

		it("should handle keyboard navigation", async () => {
			const user = userEvent.setup();

			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
						<TabsTrigger value="tab2">Tab 2</TabsTrigger>
						<TabsTrigger value="tab3">Tab 3</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1">Content 1</TabsContent>
					<TabsContent value="tab2">Content 2</TabsContent>
					<TabsContent value="tab3">Content 3</TabsContent>
				</Tabs>
			);

			const tab1 = screen.getByRole("tab", { name: "Tab 1" });
			const tab2 = screen.getByRole("tab", { name: "Tab 2" });

			// Focus first tab
			tab1.focus();
			expect(tab1).toHaveFocus();

			// Use arrow key to navigate
			await user.keyboard("{ArrowRight}");
			expect(tab2).toHaveFocus();

			// Use Enter to activate
			await user.keyboard("{Enter}");
			expect(screen.getByText("Content 2")).toBeInTheDocument();
		});

		it("should handle disabled tabs", () => {
			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
						<TabsTrigger value="tab2" disabled>
							Tab 2 (Disabled)
						</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1">Content 1</TabsContent>
					<TabsContent value="tab2">Content 2</TabsContent>
				</Tabs>
			);

			const disabledTab = screen.getByRole("tab", { name: "Tab 2 (Disabled)" });
			expect(disabledTab).toBeDisabled();
			expect(disabledTab).toHaveClass(
				"disabled:pointer-events-none",
				"disabled:opacity-50"
			);
		});

		it("should apply custom className", () => {
			render(
				<Tabs defaultValue="tab1" className="custom-tabs">
					<TabsList className="custom-list">
						<TabsTrigger value="tab1" className="custom-trigger">
							Tab 1
						</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1" className="custom-content">
						Content 1
					</TabsContent>
				</Tabs>
			);

			const tabs = document.querySelector('[data-slot="tabs"]');
			const tabsList = screen.getByRole("tablist");
			const trigger = screen.getByRole("tab");
			const content = screen.getByRole("tabpanel");

			expect(tabs).toHaveClass("custom-tabs");
			expect(tabsList).toHaveClass("custom-list");
			expect(trigger).toHaveClass("custom-trigger");
			expect(content).toHaveClass("custom-content");
		});

		it("should support controlled mode", async () => {
			const onValueChange = jest.fn();
			const user = userEvent.setup();

			render(
				<Tabs value="tab1" onValueChange={onValueChange}>
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
						<TabsTrigger value="tab2">Tab 2</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1">Content 1</TabsContent>
					<TabsContent value="tab2">Content 2</TabsContent>
				</Tabs>
			);

			await user.click(screen.getByRole("tab", { name: "Tab 2" }));
			expect(onValueChange).toHaveBeenCalledWith("tab2");
		});

		it("should render active tab with correct styling", () => {
			render(
				<Tabs defaultValue="tab2">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
						<TabsTrigger value="tab2">Tab 2</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1">Content 1</TabsContent>
					<TabsContent value="tab2">Content 2</TabsContent>
				</Tabs>
			);

			const activeTab = screen.getByRole("tab", { name: "Tab 2" });
			const inactiveTab = screen.getByRole("tab", { name: "Tab 1" });

			// Check that the active tab has the correct state
			expect(activeTab).toHaveAttribute("data-state", "active");
			expect(activeTab).toHaveClass("data-[state=active]:bg-background");

			// Check that the inactive tab has the correct state
			expect(inactiveTab).toHaveAttribute("data-state", "inactive");
			// Note: Both tabs have the same CSS classes, the styling is applied via data-state attribute
		});

		it("should handle multiple tabs with proper ARIA attributes", () => {
			render(
				<Tabs defaultValue="home">
					<TabsList aria-label="Main navigation">
						<TabsTrigger value="home">Home</TabsTrigger>
						<TabsTrigger value="about">About</TabsTrigger>
						<TabsTrigger value="contact">Contact</TabsTrigger>
					</TabsList>
					<TabsContent value="home">Home content</TabsContent>
					<TabsContent value="about">About content</TabsContent>
					<TabsContent value="contact">Contact content</TabsContent>
				</Tabs>
			);

			const tabList = screen.getByRole("tablist");
			const homeTab = screen.getByRole("tab", { name: "Home" });
			const tabPanel = screen.getByRole("tabpanel");

			expect(tabList).toHaveAttribute("aria-label", "Main navigation");
			expect(homeTab).toHaveAttribute("aria-selected", "true");
			expect(tabPanel).toHaveAttribute("aria-labelledby", homeTab.id);
		});

		it("should render tabs with icons and text", () => {
			render(
				<Tabs defaultValue="settings">
					<TabsList>
						<TabsTrigger value="settings">
							<span>⚙️</span>
							Settings
						</TabsTrigger>
						<TabsTrigger value="profile">
							<span>👤</span>
							Profile
						</TabsTrigger>
					</TabsList>
					<TabsContent value="settings">Settings content</TabsContent>
					<TabsContent value="profile">Profile content</TabsContent>
				</Tabs>
			);

			expect(screen.getByText("⚙️")).toBeInTheDocument();
			expect(screen.getByText("👤")).toBeInTheDocument();
			expect(screen.getByText("Settings")).toBeInTheDocument();
			expect(screen.getByText("Profile")).toBeInTheDocument();
		});
	});
});
