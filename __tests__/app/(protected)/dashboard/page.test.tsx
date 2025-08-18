import DashboardPage from "@/app/dashboard/page";
import { render, screen } from "@testing-library/react";

// Mock de countContacts pour éviter les problèmes avec better-auth
jest.mock("@/domains/contact/features/count-contacts", () => ({
	countContacts: jest.fn().mockResolvedValue(5),
}));

// Mock de ContactStatus
jest.mock("@/app/generated/prisma", () => ({
	ContactStatus: {
		IN_PROGRESS: "IN_PROGRESS",
		COMPLETED: "COMPLETED",
		PENDING: "PENDING",
		ARCHIVED: "ARCHIVED",
	},
}));

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
	it("should render page container", async () => {
		const { container } = render(await DashboardPage());
		expect(
			container.querySelector('[data-testid="page-container"]')
		).toBeInTheDocument();
	});

	it("should render page header with correct title and description", async () => {
		const { container } = render(await DashboardPage());

		expect(
			container.querySelector('[data-testid="page-header"]')
		).toBeInTheDocument();
		expect(screen.getByText("Tableau de bord")).toBeInTheDocument();
		expect(
			screen.getByText("Vue d'ensemble de votre activité")
		).toBeInTheDocument();
	});

	it("should render statistics cards", async () => {
		render(await DashboardPage());
		expect(screen.getByText("Total des contacts")).toBeInTheDocument();
		expect(screen.getByText("En cours")).toBeInTheDocument();
		expect(screen.getByText("Traités")).toBeInTheDocument();
	});

	it("should render statistics values", async () => {
		render(await DashboardPage());
		// Should render the mocked value (5) multiple times
		const statValues = screen.getAllByText("5");
		expect(statValues.length).toBeGreaterThan(0);
	});

	it("should render quick actions and recent activity", async () => {
		render(await DashboardPage());
		expect(screen.getByText("Actions rapides")).toBeInTheDocument();
		expect(screen.getByText("Activité récente")).toBeInTheDocument();
	});
});
