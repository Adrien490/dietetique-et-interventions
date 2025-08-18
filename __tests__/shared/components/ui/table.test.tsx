import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/components/ui/table";
import { render, screen } from "@testing-library/react";

describe("Table Components", () => {
	describe("Table", () => {
		it("should render table with container", () => {
			render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>Test</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);

			const container = document.querySelector('[data-slot="table-container"]');
			const table = document.querySelector('[data-slot="table"]');

			expect(container).toBeInTheDocument();
			expect(table).toBeInTheDocument();
		});

		it("should have correct container classes", () => {
			render(<Table />);

			const container = document.querySelector('[data-slot="table-container"]');
			expect(container).toHaveClass("relative", "w-full", "overflow-x-auto");
		});

		it("should have correct table classes", () => {
			render(<Table />);

			const table = document.querySelector('[data-slot="table"]');
			expect(table).toHaveClass("w-full", "caption-bottom", "text-sm");
		});

		it("should apply custom className to table", () => {
			render(<Table className="custom-table" />);

			const table = document.querySelector('[data-slot="table"]');
			expect(table).toHaveClass("custom-table");
		});
	});

	describe("TableHeader", () => {
		it("should render table header", () => {
			render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
						</TableRow>
					</TableHeader>
				</Table>
			);

			const header = document.querySelector('[data-slot="table-header"]');
			expect(header).toBeInTheDocument();
		});

		it("should have correct default classes", () => {
			render(
				<Table>
					<TableHeader />
				</Table>
			);

			const header = document.querySelector('[data-slot="table-header"]');
			expect(header).toHaveClass("[&_tr]:border-b");
		});

		it("should apply custom className", () => {
			render(
				<Table>
					<TableHeader className="custom-header" />
				</Table>
			);

			const header = document.querySelector('[data-slot="table-header"]');
			expect(header).toHaveClass("custom-header");
		});
	});

	describe("TableBody", () => {
		it("should render table body", () => {
			render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>Content</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);

			const body = document.querySelector('[data-slot="table-body"]');
			expect(body).toBeInTheDocument();
		});

		it("should have correct default classes", () => {
			render(
				<Table>
					<TableBody />
				</Table>
			);

			const body = document.querySelector('[data-slot="table-body"]');
			expect(body).toHaveClass("[&_tr:last-child]:border-0");
		});

		it("should apply custom className", () => {
			render(
				<Table>
					<TableBody className="custom-body" />
				</Table>
			);

			const body = document.querySelector('[data-slot="table-body"]');
			expect(body).toHaveClass("custom-body");
		});
	});

	describe("TableFooter", () => {
		it("should render table footer", () => {
			render(
				<Table>
					<TableFooter>
						<TableRow>
							<TableCell>Footer</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			);

			const footer = document.querySelector('[data-slot="table-footer"]');
			expect(footer).toBeInTheDocument();
		});

		it("should have correct default classes", () => {
			render(
				<Table>
					<TableFooter />
				</Table>
			);

			const footer = document.querySelector('[data-slot="table-footer"]');
			expect(footer).toHaveClass(
				"bg-muted/50",
				"border-t",
				"font-medium",
				"[&>tr]:last:border-b-0"
			);
		});

		it("should apply custom className", () => {
			render(
				<Table>
					<TableFooter className="custom-footer" />
				</Table>
			);

			const footer = document.querySelector('[data-slot="table-footer"]');
			expect(footer).toHaveClass("custom-footer");
		});
	});

	describe("TableRow", () => {
		it("should render table row", () => {
			render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>Cell</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);

			const row = document.querySelector('[data-slot="table-row"]');
			expect(row).toBeInTheDocument();
		});

		it("should have correct default classes", () => {
			render(
				<Table>
					<TableBody>
						<TableRow />
					</TableBody>
				</Table>
			);

			const row = document.querySelector('[data-slot="table-row"]');
			expect(row).toHaveClass(
				"hover:bg-muted/50",
				"data-[state=selected]:bg-muted",
				"border-b",
				"transition-colors"
			);
		});

		it("should apply custom className", () => {
			render(
				<Table>
					<TableBody>
						<TableRow className="custom-row" />
					</TableBody>
				</Table>
			);

			const row = document.querySelector('[data-slot="table-row"]');
			expect(row).toHaveClass("custom-row");
		});

		it("should handle selected state", () => {
			render(
				<Table>
					<TableBody>
						<TableRow data-state="selected" />
					</TableBody>
				</Table>
			);

			const row = document.querySelector('[data-slot="table-row"]');
			expect(row).toHaveAttribute("data-state", "selected");
		});
	});

	describe("TableHead", () => {
		it("should render table head", () => {
			render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Header</TableHead>
						</TableRow>
					</TableHeader>
				</Table>
			);

			const head = document.querySelector('[data-slot="table-head"]');
			expect(head).toBeInTheDocument();
			expect(head).toHaveTextContent("Header");
		});

		it("should have correct default classes", () => {
			render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Header</TableHead>
						</TableRow>
					</TableHeader>
				</Table>
			);

			const head = document.querySelector('[data-slot="table-head"]');
			expect(head).toHaveClass(
				"text-foreground",
				"h-10",
				"px-2",
				"text-left",
				"align-middle",
				"font-medium",
				"whitespace-nowrap"
			);
		});

		it("should apply custom className", () => {
			render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="custom-head">Header</TableHead>
						</TableRow>
					</TableHeader>
				</Table>
			);

			const head = document.querySelector('[data-slot="table-head"]');
			expect(head).toHaveClass("custom-head");
		});

		it("should support sorting attributes", () => {
			render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead aria-sort="ascending">Sortable Header</TableHead>
						</TableRow>
					</TableHeader>
				</Table>
			);

			const head = document.querySelector('[data-slot="table-head"]');
			expect(head).toHaveAttribute("aria-sort", "ascending");
		});
	});

	describe("TableCell", () => {
		it("should render table cell", () => {
			render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>Cell Content</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);

			const cell = document.querySelector('[data-slot="table-cell"]');
			expect(cell).toBeInTheDocument();
			expect(cell).toHaveTextContent("Cell Content");
		});

		it("should have correct default classes", () => {
			render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>Content</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);

			const cell = document.querySelector('[data-slot="table-cell"]');
			expect(cell).toHaveClass("p-2", "align-middle", "whitespace-nowrap");
		});

		it("should apply custom className", () => {
			render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell className="custom-cell">Content</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);

			const cell = document.querySelector('[data-slot="table-cell"]');
			expect(cell).toHaveClass("custom-cell");
		});
	});

	describe("TableCaption", () => {
		it("should render table caption", () => {
			render(
				<Table>
					<TableCaption>Table Caption</TableCaption>
					<TableBody>
						<TableRow>
							<TableCell>Content</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);

			const caption = document.querySelector('[data-slot="table-caption"]');
			expect(caption).toBeInTheDocument();
			expect(caption).toHaveTextContent("Table Caption");
		});

		it("should have correct default classes", () => {
			render(
				<Table>
					<TableCaption>Caption</TableCaption>
				</Table>
			);

			const caption = document.querySelector('[data-slot="table-caption"]');
			expect(caption).toHaveClass("text-muted-foreground", "mt-4", "text-sm");
		});

		it("should apply custom className", () => {
			render(
				<Table>
					<TableCaption className="custom-caption">Caption</TableCaption>
				</Table>
			);

			const caption = document.querySelector('[data-slot="table-caption"]');
			expect(caption).toHaveClass("custom-caption");
		});
	});

	describe("Table Integration", () => {
		it("should render complete table structure", () => {
			render(
				<Table>
					<TableCaption>User List</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Role</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>John Doe</TableCell>
							<TableCell>john@example.com</TableCell>
							<TableCell>Admin</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Jane Smith</TableCell>
							<TableCell>jane@example.com</TableCell>
							<TableCell>User</TableCell>
						</TableRow>
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={3}>Total: 2 users</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			);

			expect(
				document.querySelector('[data-slot="table-caption"]')
			).toHaveTextContent("User List");
			expect(
				document.querySelector('[data-slot="table-header"]')
			).toBeInTheDocument();
			expect(
				document.querySelector('[data-slot="table-body"]')
			).toBeInTheDocument();
			expect(
				document.querySelector('[data-slot="table-footer"]')
			).toBeInTheDocument();

			expect(screen.getByText("John Doe")).toBeInTheDocument();
			expect(screen.getByText("jane@example.com")).toBeInTheDocument();
			expect(screen.getByText("Total: 2 users")).toBeInTheDocument();
		});

		it("should handle responsive layout", () => {
			render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>Very long content that might overflow</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);

			const container = document.querySelector('[data-slot="table-container"]');
			expect(container).toHaveClass("overflow-x-auto");
		});

		it("should support accessibility features", () => {
			render(
				<Table role="table" aria-label="User data">
					<TableHeader>
						<TableRow role="row">
							<TableHead role="columnheader">Name</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow role="row">
							<TableCell role="cell">John</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);

			const table = document.querySelector('[data-slot="table"]');
			expect(table).toHaveAttribute("role", "table");
			expect(table).toHaveAttribute("aria-label", "User data");
		});
	});
});
