import DashboardPage from "@/app/dashboard/page";
import { render, screen } from "@testing-library/react";

// Mock des composants partagés
jest.mock("@/shared/components/page-container", () => ({
	PageContainer: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="page-container">{children}</div>
	),
}));

jest.mock("@/shared/components/page-header", () => ({
	PageHeader: ({
		title,
		description,
	}: {
		title: string;
		description: string;
	}) => (
		<div data-testid="page-header">
			<h1>{title}</h1>
			<p>{description}</p>
		</div>
	),
}));

describe("Dashboard Page", () => {
	it("should render page container", () => {
		render(<DashboardPage />);
		expect(screen.getByTestId("page-container")).toBeInTheDocument();
	});

	it("should render page header with correct title and description", () => {
		render(<DashboardPage />);

		expect(screen.getByTestId("page-header")).toBeInTheDocument();
		expect(screen.getByText("Dashboard")).toBeInTheDocument();
		expect(
			screen.getByText("Bienvenue sur votre tableau de bord")
		).toBeInTheDocument();
	});

	it("should render admin content", () => {
		render(<DashboardPage />);
		expect(screen.getByText("Admin")).toBeInTheDocument();
	});

	it("should have proper structure", () => {
		render(<DashboardPage />);

		const container = screen.getByTestId("page-container");
		const header = screen.getByTestId("page-header");
		const content = screen.getByText("Admin");

		expect(container).toContainElement(header);
		expect(container).toContainElement(content);
	});

	it("should render without errors", () => {
		expect(() => render(<DashboardPage />)).not.toThrow();
	});
});







