import { render, screen } from "@testing-library/react";
import QuotesPage from "@/app/dashboard/quotes/page";

describe("QuotesPage", () => {
  it("should render quotes page with title", () => {
    render(<QuotesPage />);
    
    expect(screen.getByText("Devis")).toBeInTheDocument();
  });

  it("should render with correct structure", () => {
    render(<QuotesPage />);
    
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Devis");
  });

  it("should render quotes content", () => {
    render(<QuotesPage />);
    
    expect(screen.getByText(/Gestion des devis/)).toBeInTheDocument();
  });
});

