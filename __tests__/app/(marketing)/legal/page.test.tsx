import { render, screen } from "@testing-library/react";
import LegalPage from "@/app/(marketing)/legal/page";

describe("LegalPage", () => {
  it("should render legal page with title", () => {
    render(<LegalPage />);
    
    expect(screen.getByText("Mentions légales")).toBeInTheDocument();
  });

  it("should render legal content sections", () => {
    render(<LegalPage />);
    
    // Vérifier la présence des sections principales
    expect(screen.getByText("Éditeur du site")).toBeInTheDocument();
    expect(screen.getByText("Hébergement")).toBeInTheDocument();
    expect(screen.getByText("Propriété intellectuelle")).toBeInTheDocument();
  });

  it("should render contact information", () => {
    render(<LegalPage />);
    
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("should render with correct heading structure", () => {
    render(<LegalPage />);
    
    const mainHeading = screen.getByRole("heading", { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent("Mentions légales");
  });
});

