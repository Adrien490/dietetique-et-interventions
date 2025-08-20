import ResetPasswordPage from "@/app/auth/reset-password/page";
import { render, screen } from "@testing-library/react";

describe("ResetPasswordPage", () => {
	it("should render reset password page with title", () => {
		render(<ResetPasswordPage />);

		expect(
			screen.getByRole("heading", { level: 1 })
		).toHaveTextContent("Nouveau mot de passe");
	});

	it("should render with correct structure", () => {
		render(<ResetPasswordPage />);

		const heading = screen.getByRole("heading", { level: 1 });
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent("Nouveau mot de passe");
	});

	it("should render description text", () => {
		render(<ResetPasswordPage />);

		expect(
			screen.getByText(/Choisissez un nouveau mot de passe sécurisé/)
		).toBeInTheDocument();
	});
});
