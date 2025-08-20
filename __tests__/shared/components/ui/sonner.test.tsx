import { render, screen } from "@testing-library/react";
import { Toaster } from "@/shared/components/ui/sonner";

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("Sonner Toaster", () => {
  it("should render toaster component", () => {
    render(<Toaster />);
    
    const toaster = screen.getByRole("region", { name: "Notifications alt+T" });
    expect(toaster).toBeInTheDocument();
  });

  it("should render with correct structure", () => {
    render(<Toaster />);
    
    const toaster = screen.getByRole("region", { name: "Notifications alt+T" });
    expect(toaster).toBeInTheDocument();
  });
});

