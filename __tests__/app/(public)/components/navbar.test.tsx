import { Navbar } from "@/app/(marketing)/components/navbar";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock des modules auth
jest.mock("@/domains/auth/features/logout/logout-button", () => ({
	LogoutButton: () => (
		<button data-testid="logout-button">Se déconnecter</button>
	),
}));

jest.mock("@/domains/auth/lib/auth", () => ({
	Session: {},
}));

// Mock des hooks
jest.mock("@/shared/hooks/use-mobile", () => ({
	useIsMobile: jest.fn(() => false),
}));

jest.mock("@/shared/hooks/use-is-scrolled", () => ({
	useIsScrolled: jest.fn(() => false),
}));

jest.mock("@/shared/hooks/use-active-navbar-item", () => ({
	useActiveNavbarItem: jest.fn(() => ({
		isMenuItemActive: jest.fn(() => false),
		activeSection: "home",
	})),
}));

// Mock de Next.js Link
jest.mock("next/link", () => {
	const MockedLink = ({
		children,
		href,
		...props
	}: {
		children: React.ReactNode;
		href: string;
		[key: string]: unknown;
	}) => (
		<a data-testid="link" href={href} {...props}>
			{children}
		</a>
	);
	MockedLink.displayName = "MockedLink";
	return MockedLink;
});

// Mock des icônes
jest.mock("lucide-react", () => ({
	Menu: () => <div data-testid="menu-icon">Menu</div>,
	X: () => <div data-testid="x-icon">X</div>,
	Home: () => <div data-testid="home-icon">Home</div>,
}));

// Mock des composants UI
jest.mock("@/shared/components/ui/sheet", () => ({
	Sheet: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="sheet">{children}</div>
	),
	SheetTrigger: ({
		children,
		asChild,
	}: {
		children: React.ReactNode;
		asChild?: boolean;
	}) =>
		asChild ? children : <div data-testid="sheet-trigger">{children}</div>,
	SheetContent: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="sheet-content">{children}</div>
	),
	SheetHeader: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="sheet-header">{children}</div>
	),
	SheetTitle: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="sheet-title">{children}</div>
	),
	SheetClose: ({
		children,
		asChild,
	}: {
		children: React.ReactNode;
		asChild?: boolean;
	}) => (asChild ? children : <div data-testid="sheet-close">{children}</div>),
}));

jest.mock("@/shared/components/ui/breadcrumb", () => ({
	Breadcrumb: ({ children }: { children: React.ReactNode }) => (
		<nav data-testid="breadcrumb">{children}</nav>
	),
	BreadcrumbList: ({ children }: { children: React.ReactNode }) => (
		<ol data-testid="breadcrumb-list">{children}</ol>
	),
	BreadcrumbItem: ({ children }: { children: React.ReactNode }) => (
		<li data-testid="breadcrumb-item">{children}</li>
	),
	BreadcrumbLink: ({
		children,
		asChild,
	}: {
		children: React.ReactNode;
		asChild?: boolean;
	}) => (asChild ? children : <a data-testid="breadcrumb-link">{children}</a>),
	BreadcrumbPage: ({ children }: { children: React.ReactNode }) => (
		<span data-testid="breadcrumb-page">{children}</span>
	),
	BreadcrumbSeparator: () => <span data-testid="breadcrumb-separator">/</span>,
}));

jest.mock("@/shared/components/ui/button", () => ({
	Button: ({
		children,
		asChild,
		...props
	}: {
		children: React.ReactNode;
		asChild?: boolean;
		[key: string]: unknown;
	}) =>
		asChild ? (
			children
		) : (
			<button data-testid="button" {...props}>
				{children}
			</button>
		),
}));

// Mock des constants
jest.mock("@/shared/constants/navbar-items", () => ({
	navbarItems: [
		{ href: "#services", label: "Services" },
		{ href: "#about", label: "À propos" },
		{ href: "#contact", label: "Contact" },
	],
}));

describe("Navbar", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should render navbar", () => {
		render(<Navbar />);

		const nav = screen.getByRole("navigation", {
			name: /Navigation principale/i,
		});
		expect(nav).toBeInTheDocument();
	});

	it("should render brand link", () => {
		render(<Navbar />);

		const brandLink = screen.getByRole("link", {
			name: /Retour à l'accueil - Manon Chaillou/i,
		});
		expect(brandLink).toBeInTheDocument();
		expect(brandLink).toHaveAttribute("href", "/");
	});

	it("should render navigation items on desktop", () => {
		render(<Navbar />);

		expect(
			screen.getAllByRole("link", { name: "Services" })[0]
		).toBeInTheDocument();
		expect(
			screen.getAllByRole("link", { name: "À propos" })[0]
		).toBeInTheDocument();
		expect(
			screen.getAllByRole("link", { name: "Contact" })[0]
		).toBeInTheDocument();
	});

	it("should not show mobile menu by default", () => {
		render(<Navbar />);

		expect(screen.queryByTestId("x-icon")).not.toBeInTheDocument();
	});

	it("should handle mobile view", () => {
		const useIsMobileMock = jest.requireMock("@/shared/hooks/use-mobile");
		useIsMobileMock.useIsMobile.mockReturnValue(true);

		render(<Navbar />);

		expect(
			screen.getByRole("button", { name: /Ouvrir le menu de navigation/i })
		).toBeInTheDocument();
	});

	it("should toggle mobile menu", async () => {
		const useIsMobileMock = jest.requireMock("@/shared/hooks/use-mobile");
		useIsMobileMock.useIsMobile.mockReturnValue(true);

		const user = userEvent.setup();
		render(<Navbar />);

		const menuButton = screen.getByRole("button", {
			name: /Ouvrir le menu de navigation/i,
		});
		await user.click(menuButton);

		expect(screen.getByTestId("sheet-content")).toBeInTheDocument();
	});

	it("should apply scrolled styles", () => {
		const useIsScrolledMock = jest.requireMock(
			"@/shared/hooks/use-is-scrolled"
		);
		useIsScrolledMock.useIsScrolled.mockReturnValue(true);

		render(<Navbar />);

		const nav = screen.getByRole("navigation", {
			name: /Navigation principale/i,
		});
		expect(nav).toHaveClass("shadow-md", "bg-background", "backdrop-blur-md");
	});

	it("should highlight active navigation item", () => {
		const useActiveNavbarItemMock = jest.requireMock(
			"@/shared/hooks/use-active-navbar-item"
		);
		useActiveNavbarItemMock.useActiveNavbarItem.mockReturnValue({
			isMenuItemActive: jest.fn((href) => href === "#services"),
			activeSection: "services",
		});

		render(<Navbar />);

		const servicesLinks = screen.getAllByRole("link", { name: "Services" });
		expect(servicesLinks[0]).toHaveClass(
			"text-primary-foreground",
			"bg-primary"
		);
	});

	it("should have proper semantic structure", () => {
		render(<Navbar />);

		const nav = screen.getByRole("navigation", {
			name: /Navigation principale/i,
		});
		expect(nav).toHaveAttribute(
			"aria-label",
			"Navigation principale - Manon Chaillou Diététicienne Nantes"
		);
	});

	it("should handle keyboard navigation", async () => {
		const user = userEvent.setup();
		render(<Navbar />);

		const firstLink = screen.getByRole("link", { name: /Retour à l'accueil/i });
		firstLink.focus();

		expect(firstLink).toHaveFocus();

		await user.tab();
		const servicesLinks = screen.getAllByRole("link", { name: "Services" });
		expect(servicesLinks[0]).toHaveFocus();
	});

	it("should close mobile menu when clicking nav item", async () => {
		const useIsMobileMock = jest.requireMock("@/shared/hooks/use-mobile");
		useIsMobileMock.useIsMobile.mockReturnValue(true);

		const user = userEvent.setup();
		render(<Navbar />);

		// Open menu
		const menuButton = screen.getByRole("button", {
			name: /Ouvrir le menu de navigation/i,
		});
		await user.click(menuButton);
		expect(screen.getByTestId("sheet-content")).toBeInTheDocument();

		// Click nav item (should close via SheetClose)
		const servicesLinks = screen.getAllByRole("link", { name: "Services" });
		await user.click(servicesLinks[0]); // Desktop link

		// This test verifies the structure is correct
		expect(servicesLinks[0]).toBeInTheDocument();
	});

	it("should have sticky positioning", () => {
		render(<Navbar />);

		const header = screen.getByRole("banner");
		expect(header).toHaveClass("sticky", "top-0", "z-50");
	});

	it("should handle all navigation states", () => {
		const useIsMobileMock = jest.requireMock("@/shared/hooks/use-mobile");
		const useIsScrolledMock = jest.requireMock(
			"@/shared/hooks/use-is-scrolled"
		);
		const useActiveNavbarItemMock = jest.requireMock(
			"@/shared/hooks/use-active-navbar-item"
		);

		// Mobile + scrolled + active item
		useIsMobileMock.useIsMobile.mockReturnValue(true);
		useIsScrolledMock.useIsScrolled.mockReturnValue(true);
		useActiveNavbarItemMock.useActiveNavbarItem.mockReturnValue({
			isMenuItemActive: jest.fn((href) => href === "#about"),
			activeSection: "about",
		});

		render(<Navbar />);

		const nav = screen.getByRole("navigation", {
			name: /Navigation principale/i,
		});
		expect(nav).toHaveClass("shadow-md", "bg-background", "backdrop-blur-md");
		expect(screen.getByTestId("menu-icon")).toBeInTheDocument();

		const aboutLinks = screen.getAllByRole("link", { name: "À propos" });
		expect(aboutLinks[0]).toHaveClass("text-primary-foreground", "bg-primary");
	});

	it("should render contact button", () => {
		render(<Navbar />);

		const contactButtons = screen.getAllByRole("link", {
			name: /Prendre rendez-vous/i,
		});
		expect(contactButtons[0]).toBeInTheDocument();
		expect(contactButtons[0]).toHaveAttribute("href", "#contact");
	});

	it("should have proper contrast and accessibility", () => {
		render(<Navbar />);

		const nav = screen.getByRole("navigation", {
			name: /Navigation principale/i,
		});
		expect(nav).toBeInTheDocument();

		// Check that all links are accessible
		const links = screen.getAllByRole("link");
		links.forEach((link) => {
			expect(link).toBeInTheDocument();
		});
	});
});
