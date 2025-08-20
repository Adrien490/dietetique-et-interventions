import { SidebarNav } from "@/shared/components/sidebar-nav";
import { SidebarProvider } from "@/shared/components/ui/sidebar";
import { render, screen } from "@testing-library/react";

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock des hooks et composants
jest.mock("@/shared/hooks/use-active-navbar-item", () => ({
	useActiveNavbarItem: () => "dashboard",
}));

jest.mock("@/shared/utils/get-sidebar-nav", () => ({
	getSidebarNav: () => [
		{
			title: "Dashboard",
			href: "/dashboard",
			icon: "dashboard",
		},
		{
			title: "Contacts",
			href: "/dashboard/contacts",
			icon: "contacts",
		},
	],
}));

describe("SidebarNav", () => {
	it("should render sidebar navigation", () => {
		render(
			<SidebarProvider>
				<SidebarNav />
			</SidebarProvider>
		);

		expect(screen.getByText("Dashboard")).toBeInTheDocument();
		expect(screen.getByText("Contacts")).toBeInTheDocument();
	});

	it("should render navigation buttons", () => {
		render(
			<SidebarProvider>
				<SidebarNav />
			</SidebarProvider>
		);

		const dashboardButton = screen.getByRole("button", { name: "Dashboard" });
		const contactsButton = screen.getByRole("button", { name: "Contacts" });

		expect(dashboardButton).toBeInTheDocument();
		expect(contactsButton).toBeInTheDocument();
	});

	it("should render navigation items", () => {
		render(
			<SidebarProvider>
				<SidebarNav />
			</SidebarProvider>
		);

		expect(screen.getByText("Dashboard")).toBeInTheDocument();
		expect(screen.getByText("Contacts")).toBeInTheDocument();
	});
});
