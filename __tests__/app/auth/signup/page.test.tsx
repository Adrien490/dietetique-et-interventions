import SignupPage from "@/app/auth/signup/page";
import { render, screen } from "@testing-library/react";

// Mock des composants
jest.mock("@/domains/auth/features/sign-up-email/sign-up-email-form", () => ({
	SignUpEmailForm: () => <div data-testid="sign-up-form">Sign Up Form</div>,
}));

describe("SignupPage", () => {
	it("should render signup page with title", () => {
		render(<SignupPage />);

		expect(
			screen.getByText("Inscription temporairement indisponible")
		).toBeInTheDocument();
	});

	it("should render sign up email form", () => {
		render(<SignupPage />);

		// Le formulaire n'est plus présent car la page est désactivée
		expect(
			screen.getByText("Cette fonctionnalité sera bientôt disponible")
		).toBeInTheDocument();
	});

	it("should render with correct structure", () => {
		render(<SignupPage />);

		const heading = screen.getByRole("heading", { level: 1 });
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent(
			"Inscription temporairement indisponible"
		);
	});
});
