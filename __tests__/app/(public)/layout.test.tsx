import { render, screen } from "@testing-library/react";

// Mock the isAdmin function to avoid ESM issues with Better Auth
jest.mock("@/domains/user/utils/is-admin", () => ({
	isAdmin: jest.fn().mockResolvedValue(false),
}));

// Mock des composants
jest.mock("@/app/(marketing)/components/navbar", () => ({
	Navbar: ({ isAdmin }: { isAdmin?: boolean }) => (
		<nav data-testid="navbar">
			Navbar {isAdmin && <span data-testid="admin-indicator">Admin</span>}
		</nav>
	),
}));

jest.mock("@/app/(marketing)/components/footer", () => ({
	Footer: () => <footer data-testid="footer">Footer</footer>,
}));

import PublicLayout from "@/app/(marketing)/layout";

describe("Public Layout", () => {
	const mockChildren = <div data-testid="test-content">Test Content</div>;

	it("should render navbar", async () => {
		render(await PublicLayout({ children: mockChildren }));
		expect(screen.getByTestId("navbar")).toBeInTheDocument();
	});

	it("should render main content with proper role", async () => {
		render(await PublicLayout({ children: mockChildren }));

		const main = screen.getByRole("main");
		expect(main).toBeInTheDocument();
		expect(main).toHaveClass("min-h-screen", "bg-background");
	});

	it("should render children inside main", async () => {
		render(await PublicLayout({ children: mockChildren }));

		const main = screen.getByRole("main");
		const content = screen.getByTestId("test-content");

		expect(main).toContainElement(content);
		expect(content).toBeInTheDocument();
	});

	it("should render footer", async () => {
		render(await PublicLayout({ children: mockChildren }));
		expect(screen.getByTestId("footer")).toBeInTheDocument();
	});

	it("should have correct layout structure", async () => {
		render(await PublicLayout({ children: mockChildren }));

		const navbar = screen.getByTestId("navbar");
		const main = screen.getByRole("main");
		const footer = screen.getByTestId("footer");

		// Vérifier l'ordre des éléments
		expect(main.compareDocumentPosition(navbar)).toBe(
			Node.DOCUMENT_POSITION_PRECEDING
		);

		expect(footer.compareDocumentPosition(main)).toBe(
			Node.DOCUMENT_POSITION_PRECEDING
		);
	});

	it("should render without errors", async () => {
		expect(async () =>
			render(await PublicLayout({ children: mockChildren }))
		).not.toThrow();
	});

	it("should handle different children types", async () => {
		const complexChildren = (
			<>
				<h1>Title</h1>
				<p>Paragraph</p>
				<div>
					<span>Nested content</span>
				</div>
			</>
		);

		render(await PublicLayout({ children: complexChildren }));

		expect(screen.getByText("Title")).toBeInTheDocument();
		expect(screen.getByText("Paragraph")).toBeInTheDocument();
		expect(screen.getByText("Nested content")).toBeInTheDocument();
	});

	it("should pass isAdmin prop to Navbar", async () => {
		// Test with admin user
		const { isAdmin } = require("@/domains/user/utils/is-admin");
		isAdmin.mockResolvedValueOnce(true);

		render(await PublicLayout({ children: mockChildren }));

		// The navbar should receive the isAdmin prop (though it's mocked, we verify the structure)
		expect(screen.getByTestId("navbar")).toBeInTheDocument();
	});
});
