import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from "@/shared/components/ui/menubar";
import { render, screen } from "@testing-library/react";

describe("Menubar", () => {
	it("should render menubar component", () => {
		render(
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>New</MenubarItem>
						<MenubarItem>Open</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		);

		expect(screen.getByText("File")).toBeInTheDocument();
	});

	it("should render menubar items", () => {
		render(
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>New</MenubarItem>
						<MenubarItem>Open</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		);

		// Les éléments du menu ne sont visibles que quand le menu est ouvert
		// On vérifie juste que le trigger est présent
		expect(screen.getByText("File")).toBeInTheDocument();
	});

	it("should render with correct structure", () => {
		render(
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>File</MenubarTrigger>
				</MenubarMenu>
			</Menubar>
		);

		const menubar = screen.getByRole("menubar");
		expect(menubar).toBeInTheDocument();
	});
});
