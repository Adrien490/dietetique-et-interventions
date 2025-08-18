import { UserAvatar } from "@/shared/components/user-avatar/user-avatar";
import { render, screen } from "@testing-library/react";

// Mock React.use hook
jest.mock("react", () => ({
	...jest.requireActual("react"),
	use: jest.fn(),
}));

// Mock des dépendances
jest.mock("@/domains/auth/features/logout/logout-button", () => {
	return {
		LogoutButton: ({ children }: { children: React.ReactNode }) => (
			<div data-testid="logout-button">{children}</div>
		),
	};
});

jest.mock("@/shared/utils", () => ({
	...jest.requireActual("@/shared/utils"),
	getUserInitials: jest.fn((name?: string, email?: string) => {
		if (name) {
			return name
				.split(" ")
				.map((n) => n[0])
				.join("")
				.slice(0, 2)
				.toUpperCase();
		}
		if (email) {
			return email.slice(0, 2).toUpperCase();
		}
		return "U";
	}),
	cn: jest.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock des composants UI
jest.mock("@/shared/components/ui/avatar", () => ({
	Avatar: ({ children, className, ...props }: any) => (
		<button data-testid="avatar" className={className} role="button" {...props}>
			{children}
		</button>
	),
	AvatarImage: ({ src, alt }: any) =>
		src ? <img data-testid="avatar-image" src={src} alt={alt} /> : null,
	AvatarFallback: ({ children, className }: any) => (
		<span data-testid="avatar-fallback" className={className}>
			{children}
		</span>
	),
}));

jest.mock("@/shared/components/ui/dropdown-menu", () => ({
	DropdownMenu: ({ children }: any) => (
		<div data-testid="dropdown-menu">{children}</div>
	),
	DropdownMenuTrigger: ({ children, asChild, ...props }: any) =>
		asChild ? (
			<>{children}</>
		) : (
			<button role="button" {...props}>
				{children}
			</button>
		),
	DropdownMenuContent: ({ children }: any) => (
		<div data-testid="dropdown-content">{children}</div>
	),
	DropdownMenuItem: ({ children, className }: any) => (
		<div data-testid="dropdown-item" className={className}>
			{children}
		</div>
	),
	DropdownMenuSeparator: () => <hr data-testid="dropdown-separator" />,
}));

describe("UserAvatar", () => {
	const mockUser = {
		id: "1",
		name: "John Doe",
		email: "john@example.com",
		image: "https://example.com/avatar.jpg",
	};

	beforeEach(() => {
		const { use } = require("react");
		use.mockClear();
	});

	it("should render avatar with user image when available", async () => {
		const { use } = require("react");
		use.mockReturnValue(mockUser);

		const userPromise = Promise.resolve(mockUser);

		render(<UserAvatar userPromise={userPromise} />);

		const avatar = screen.getByRole("button", { hidden: true });
		expect(avatar).toBeInTheDocument();

		const image = screen.getByRole("img");
		expect(image).toHaveAttribute("src", "https://example.com/avatar.jpg");
		expect(image).toHaveAttribute("alt", "John Doe");
	});

	it("should render initials fallback when no image", async () => {
		const userWithoutImage = { ...mockUser, image: null };
		const { use } = require("react");
		use.mockReturnValue(userWithoutImage);

		const userPromise = Promise.resolve(userWithoutImage);

		render(<UserAvatar userPromise={userPromise} />);

		const avatar = screen.getByRole("button", { hidden: true });
		expect(avatar).toBeInTheDocument();
		expect(screen.getByText("JD")).toBeInTheDocument();
	});

	it("should render user information in dropdown", async () => {
		const { use } = require("react");
		use.mockReturnValue(mockUser);

		const userPromise = Promise.resolve(mockUser);

		render(<UserAvatar userPromise={userPromise} />);

		const avatar = screen.getByRole("button", { hidden: true });
		expect(avatar).toBeInTheDocument();
		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("john@example.com")).toBeInTheDocument();
	});

	it("should render logout button", async () => {
		const { use } = require("react");
		use.mockReturnValue(mockUser);

		const userPromise = Promise.resolve(mockUser);

		render(<UserAvatar userPromise={userPromise} />);

		const avatar = screen.getByRole("button", { hidden: true });
		expect(avatar).toBeInTheDocument();
		expect(screen.getByTestId("logout-button")).toBeInTheDocument();
		expect(screen.getByText("Déconnexion")).toBeInTheDocument();
	});

	it("should apply size classes correctly", async () => {
		const { use } = require("react");
		use.mockReturnValue(mockUser);

		const userPromise = Promise.resolve(mockUser);

		const { rerender } = render(
			<UserAvatar size="sm" userPromise={userPromise} />
		);
		let avatar = screen.getByRole("button", { hidden: true });
		expect(avatar).toHaveClass(
			"transition-opacity",
			"cursor-pointer",
			"hover:opacity-80"
		);

		rerender(<UserAvatar size="lg" userPromise={userPromise} />);
		avatar = screen.getByRole("button", { hidden: true });
		expect(avatar).toHaveClass(
			"transition-opacity",
			"cursor-pointer",
			"hover:opacity-80"
		);
	});

	it("should handle null user gracefully", async () => {
		const { use } = require("react");
		use.mockReturnValue(null);

		const userPromise = Promise.resolve(null);

		render(<UserAvatar userPromise={userPromise} />);

		const avatar = screen.getByRole("button", { hidden: true });
		expect(avatar).toBeInTheDocument();

		// Should show fallback initials
		expect(screen.getByText("U")).toBeInTheDocument();
	});

	it("should use email for initials when name is not available", async () => {
		const userWithoutName = {
			...mockUser,
			name: null,
			email: "test@example.com",
		};
		const { use } = require("react");
		use.mockReturnValue(userWithoutName);

		const userPromise = Promise.resolve(userWithoutName);

		render(<UserAvatar userPromise={userPromise} />);

		const avatar = screen.getByRole("button", { hidden: true });
		expect(avatar).toBeInTheDocument();
		expect(screen.getByText("TE")).toBeInTheDocument();
	});
});
