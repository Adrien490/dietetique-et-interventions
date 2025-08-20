import { render, screen } from "@testing-library/react";
import LoginPage from "@/app/(auth)/login/page";

// Mock des composants
jest.mock("@/domains/auth/features/sign-in-email/sign-in-email-form", () => ({
  SignInEmailForm: () => <div data-testid="sign-in-form">Sign In Form</div>,
}));

jest.mock("@/domains/auth/features/sign-in-social", () => ({
  SignInSocialForm: () => <div data-testid="sign-in-social">Social Sign In</div>,
}));

describe("LoginPage", () => {
  it("should render login page with title", () => {
    render(<LoginPage />);
    
    expect(screen.getByText("Connexion")).toBeInTheDocument();
  });

  it("should render sign in email form", () => {
    render(<LoginPage />);
    
    expect(screen.getByTestId("sign-in-form")).toBeInTheDocument();
  });



  it("should render with correct structure", () => {
    render(<LoginPage />);
    
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Connexion");
  });
});

