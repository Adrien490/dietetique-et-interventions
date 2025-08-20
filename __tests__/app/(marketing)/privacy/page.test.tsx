import { render, screen } from "@testing-library/react";
import PrivacyPage from "@/app/(marketing)/privacy/page";

describe("PrivacyPage", () => {
  it("should render privacy page with title", () => {
    render(<PrivacyPage />);
    
    expect(screen.getByText("Politique de confidentialité")).toBeInTheDocument();
  });

  it("should render privacy content sections", () => {
    render(<PrivacyPage />);
    
    // Vérifier la présence des sections principales
    expect(screen.getByText("Données personnelles collectées")).toBeInTheDocument();
    expect(screen.getByText("Finalités du traitement")).toBeInTheDocument();
    expect(screen.getByText("Responsable du traitement")).toBeInTheDocument();
  });

  it("should render contact information", () => {
    render(<PrivacyPage />);
    
    expect(screen.getByText("Responsable du traitement")).toBeInTheDocument();
  });

  it("should render with correct heading structure", () => {
    render(<PrivacyPage />);
    
    const mainHeading = screen.getByRole("heading", { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent("Politique de confidentialité");
  });
});

