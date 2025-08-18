import { Alert, AlertTitle, AlertDescription } from "@/shared/components/ui/alert";
import { render, screen } from "@testing-library/react";

describe("Alert", () => {
	it("should render alert with default variant", () => {
		render(<Alert>Test alert</Alert>);
		
		const alert = screen.getByRole("alert");
		expect(alert).toBeInTheDocument();
		expect(alert).toHaveClass("bg-card", "text-card-foreground");
	});

	it("should render alert with destructive variant", () => {
		render(<Alert variant="destructive">Error alert</Alert>);
		
		const alert = screen.getByRole("alert");
		expect(alert).toHaveClass("text-destructive");
	});

	it("should accept custom className", () => {
		render(<Alert className="custom-class">Test alert</Alert>);
		
		const alert = screen.getByRole("alert");
		expect(alert).toHaveClass("custom-class");
	});

	it("should have correct data-slot attribute", () => {
		render(<Alert>Test alert</Alert>);
		
		const alert = screen.getByRole("alert");
		expect(alert).toHaveAttribute("data-slot", "alert");
	});

	it("should render alert content", () => {
		render(<Alert>This is an alert message</Alert>);
		
		expect(screen.getByText("This is an alert message")).toBeInTheDocument();
	});
});

describe("AlertTitle", () => {
	it("should render alert title", () => {
		render(<AlertTitle>Alert Title</AlertTitle>);
		
		const title = screen.getByText("Alert Title");
		expect(title).toBeInTheDocument();
		expect(title).toHaveClass("font-medium", "tracking-tight");
	});

	it("should accept custom className", () => {
		render(<AlertTitle className="custom-title">Title</AlertTitle>);
		
		const title = screen.getByText("Title");
		expect(title).toHaveClass("custom-title");
	});

	it("should have correct data-slot attribute", () => {
		render(<AlertTitle>Title</AlertTitle>);
		
		const title = screen.getByText("Title");
		expect(title).toHaveAttribute("data-slot", "alert-title");
	});

	it("should have grid positioning classes", () => {
		render(<AlertTitle>Title</AlertTitle>);
		
		const title = screen.getByText("Title");
		expect(title).toHaveClass("col-start-2");
	});
});

describe("AlertDescription", () => {
	it("should render alert description", () => {
		render(<AlertDescription>Alert description text</AlertDescription>);
		
		const description = screen.getByText("Alert description text");
		expect(description).toBeInTheDocument();
		expect(description).toHaveClass("text-muted-foreground");
	});

	it("should accept custom className", () => {
		render(<AlertDescription className="custom-desc">Description</AlertDescription>);
		
		const description = screen.getByText("Description");
		expect(description).toHaveClass("custom-desc");
	});

	it("should have correct data-slot attribute", () => {
		render(<AlertDescription>Description</AlertDescription>);
		
		const description = screen.getByText("Description");
		expect(description).toHaveAttribute("data-slot", "alert-description");
	});

	it("should have grid positioning classes", () => {
		render(<AlertDescription>Description</AlertDescription>);
		
		const description = screen.getByText("Description");
		expect(description).toHaveClass("col-start-2");
	});
});

describe("Alert composition", () => {
	it("should render complete alert with title and description", () => {
		render(
			<Alert>
				<AlertTitle>Warning</AlertTitle>
				<AlertDescription>This is a warning message</AlertDescription>
			</Alert>
		);
		
		expect(screen.getByRole("alert")).toBeInTheDocument();
		expect(screen.getByText("Warning")).toBeInTheDocument();
		expect(screen.getByText("This is a warning message")).toBeInTheDocument();
	});

	it("should handle destructive alert with all components", () => {
		render(
			<Alert variant="destructive">
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>Something went wrong</AlertDescription>
			</Alert>
		);
		
		const alert = screen.getByRole("alert");
		expect(alert).toHaveClass("text-destructive");
		expect(screen.getByText("Error")).toBeInTheDocument();
		expect(screen.getByText("Something went wrong")).toBeInTheDocument();
	});
});

