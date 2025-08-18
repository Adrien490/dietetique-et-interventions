import { auth } from "@/domains/auth/lib/auth";
import { SidebarNav } from "@/shared/components/sidebar-nav";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Separator } from "@/shared/components/ui/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarRail,
	SidebarTrigger,
} from "@/shared/components/ui/sidebar";
import { UserAvatar } from "@/shared/components/user-avatar/user-avatar";
import { SelectionProvider } from "@/shared/contexts";
import { ChevronDown, ExternalLink } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export default async function DashboardLayout({
	children,
}: DashboardLayoutProps) {
	return (
		<SidebarProvider>
			<Sidebar collapsible="icon">
				<SidebarHeader className="border-b border-border/30">
					<SidebarMenu>
						<SidebarMenuItem>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<SidebarMenuButton
										size="lg"
										className="max-w-[240px] data-[state=open]:bg-sidebar-accent"
									>
										<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary transition-all duration-300 shrink-0">
											<span className="text-sm font-bold text-primary-foreground">
												M
											</span>
										</div>
										<div className="grid flex-1 text-left text-sm leading-tight min-w-0">
											<span className="truncate font-semibold">
												Manon Chaillou
											</span>
											<span className="truncate text-xs text-muted-foreground">
												Diététicienne Nutritionniste
											</span>
										</div>
										<ChevronDown className="ml-auto size-4 shrink-0 opacity-50" />
									</SidebarMenuButton>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
									side="bottom"
									align="start"
									sideOffset={4}
								>
									<DropdownMenuItem asChild>
										<Link
											href="/"
											className="flex items-center gap-2 px-2 py-1.5"
										>
											<ExternalLink className="size-4" />
											<span>Retour au site</span>
										</Link>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>

				<SidebarContent className="pt-2">
					<SidebarNav />
				</SidebarContent>

				<SidebarFooter>
					<SidebarMenu>
						<SidebarMenuItem></SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>

				<SidebarRail className="bg-muted/10" />
			</Sidebar>

			<SidebarInset>
				<header className="flex px-2 lg:px-4 h-16 shrink-0 items-center gap-2 bg-background justify-between">
					<div className="flex items-center gap-2 px-3">
						<SidebarTrigger />
						<Separator orientation="vertical" className="mr-2 h-4" />
					</div>
					<div className="flex items-center gap-2 px-3">
						<Suspense
							fallback={
								<div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
							}
						>
							<UserAvatar
								userPromise={auth.api
									.getSession({ headers: await headers() })
									.then((session) => session?.user ?? null)}
							/>
						</Suspense>
					</div>
				</header>
				<SelectionProvider>{children}</SelectionProvider>
			</SidebarInset>
		</SidebarProvider>
	);
}
