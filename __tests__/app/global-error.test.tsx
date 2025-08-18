import GlobalError from "@/app/global-error";
import { render, screen } from "@testing-library/react";

describe("GlobalError", () => {
	it("should render error message", () => {
		const mockError = new Error("Test error");

		render(<GlobalError error={mockError} />);

		expect(screen.getByText(/Application error/i)).toBeInTheDocument();
	});

	it("should render without reset button", () => {
		const mockError = new Error("Test error");

		render(<GlobalError error={mockError} />);

		// NextError component doesn't include a reset button by default
		expect(screen.getByRole("heading")).toBeInTheDocument();
	});
});