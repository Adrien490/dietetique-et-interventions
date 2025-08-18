"use client";

import { LogoutButton } from "@/domains/auth/features/logout/logout-button";
import { Session } from "@/domains/auth/lib/auth";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import { Button } from "@/shared/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/shared/components/ui/sheet";
import { navbarItems } from "@/shared/constants/navbar-items";
import { useActiveNavbarItem } from "@/shared/hooks/use-active-navbar-item";
import { useIsScrolled } from "@/shared/hooks/use-is-scrolled";
import { cn } from "@/shared/utils";
import { Home, LogOut, Menu, Settings, User as UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useIsMobile } from "../../../shared/hooks/use-mobile";

interface NavbarProps {
	user?: Session["user"] | null;
}

export function Navbar({ user = null }: NavbarProps) {
	const isMobile = useIsMobile();
	const threshold = isMobile ? 25 : 100;
	const isScrolled = useIsScrolled(threshold);
	const { isMenuItemActive, activeSection } = useActiveNavbarItem();

	// Vérifier si l'utilisateur est admin
	const isAdmin = user?.role === "ADMIN";

	// Generate breadcrumb items based on active section
	const getBreadcrumbItems = () => {
		const items = [
			{
				href: "/",
				label: "Accueil",
				isActive: activeSection === "home",
			},
		];

		if (activeSection !== "home") {
			const activeItem = navbarItems.find(
				(item) => item.href === `/#${activeSection}`
			);
			if (activeItem) {
				items.push({
					href: activeItem.href,
					label: activeItem.label,
					isActive: true,
				});
			}
		}

		return items;
	};

	const breadcrumbItems = getBreadcrumbItems();

	return (
		<header role="banner" className="sticky top-0 z-50 w-full">
			{/* Skip link pour l'accessibilité */}
			<Link
				href="#main-content"
				className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
			>
				Aller au contenu principal
			</Link>

			<nav
				role="navigation"
				aria-label="Navigation principale - Manon Chaillou Diététicienne Nantes"
				data-voice-commands="navigation,menu,aller à, retour à"
				data-business-type="nutrition-healthcare"
				className={cn(
					"transition-all duration-300 ease-in-out will-change-transform",
					isScrolled &&
						"shadow-md bg-background backdrop-blur-md transform translate3d(0,0,0)"
				)}
			>
				<div id="nav-description" className="sr-only">
					Navigation du site de Manon Chaillou, diététicienne nutritionniste à
					Nantes. Accédez aux consultations, conseils et prises de rendez-vous.
				</div>
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
					<div className="flex h-16 items-center justify-between">
						<Link
							itemProp="logo"
							href="/"
							className="group flex items-center space-x-3 rounded-lg p-2 -m-2 transition-all duration-200 hover:bg-accent focus-visible:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring relative z-30"
							aria-label="Retour à l'accueil - Manon Chaillou, Diététicienne Nutritionniste"
						>
							<div
								className="flex h-9 w-9 items-center justify-center rounded-full bg-primary transition-all duration-300"
								style={{
									containIntrinsicSize: "36px 36px", // Réserve l'espace
									contentVisibility: "auto", // Optimisation rendering
								}}
							>
								<span
									className={cn(
										"text-sm font-bold text-primary-foreground transition-transform duration-300",
										isScrolled && "transform scale-90" // Pas de CLS !
									)}
								>
									M
								</span>
							</div>
							<div className="hidden sm:block">
								<div className="text-base font-semibold text-foreground transition-colors">
									Manon Chaillou
								</div>
								<div className="text-xs text-foreground/70">
									Diététicienne Nutritionniste • Nantes
								</div>
							</div>
						</Link>

						{/* Navigation desktop */}
						<nav
							className="hidden md:block relative z-30"
							aria-label="Menu principal"
						>
							<ul className="flex items-center space-x-1">
								{navbarItems.map((item) => {
									const isActive = isMenuItemActive(item.href);
									return (
										<li key={item.href}>
											<Link
												href={item.href}
												className={cn(
													"relative rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
													isActive
														? "text-primary-foreground bg-primary font-semibold hover:bg-primary/90"
														: "text-foreground/90 hover:bg-accent hover:text-accent-foreground"
												)}
												aria-current={isActive ? "page" : undefined}
											>
												{item.label}
											</Link>
										</li>
									);
								})}
							</ul>
						</nav>

						{/* Boutons CTA desktop */}
						<div className="hidden md:flex items-center space-x-3 relative z-30">
							{user ? (
								<>
									{isAdmin && (
										<Button
											asChild
											variant="ghost"
											size="sm"
											className="text-muted-foreground hover:text-foreground transition-colors duration-200"
										>
											<Link
												href="/dashboard"
												aria-label="Accéder au tableau de bord administrateur"
											>
												<Settings className="h-4 w-4" aria-hidden="true" />
											</Link>
										</Button>
									)}
									{/* User Dropdown */}
									<div className="flex items-center">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="ghost"
													size="sm"
													className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
													aria-label={`Menu utilisateur - ${user.name}`}
												>
													<div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
														{user.image ? (
															<Image
																src={user.image}
																alt={user.name || "User"}
																width={24}
																height={24}
																className="h-6 w-6 rounded-full object-cover"
															/>
														) : (
															<UserIcon className="h-3 w-3" />
														)}
													</div>
													<span className="text-sm font-medium truncate max-w-20">
														{user.name}
													</span>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end" className="w-48">
												<DropdownMenuItem asChild>
													<LogoutButton className="flex w-full items-center gap-2 px-2 py-1.5 cursor-pointer text-muted-foreground hover:text-foreground">
														<LogOut className="h-4 w-4" />
														<span>Déconnexion</span>
													</LogoutButton>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</>
							) : (
								<>
									{isAdmin && (
										<Button
											asChild
											variant="ghost"
											size="sm"
											className="text-muted-foreground hover:text-foreground transition-colors duration-200"
										>
											<Link
												href="/dashboard"
												aria-label="Accéder au tableau de bord administrateur"
											>
												<Settings className="h-4 w-4" aria-hidden="true" />
											</Link>
										</Button>
									)}
									<Button
										asChild
										variant="outline"
										size="sm"
										className="transition-all duration-200"
									>
										<Link href="/login" aria-label="Se connecter">
											Connexion
										</Link>
									</Button>
								</>
							)}
							<Button
								asChild
								className="shadow-sm transition-shadow duration-200"
							>
								<Link
									href="#contact"
									aria-label="Prendre rendez-vous avec Manon Chaillou, diététicienne nutritionniste"
								>
									Prendre rendez-vous
								</Link>
							</Button>
						</div>

						{/* Menu mobile */}
						<Sheet>
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="md:hidden hover:bg-accent focus-visible:bg-accent relative z-30"
									aria-label="Ouvrir le menu de navigation"
									aria-expanded="false"
								>
									<Menu className="h-5 w-5" aria-hidden="true" />
								</Button>
							</SheetTrigger>
							<SheetContent side="right" className="w-80 p-0">
								<SheetHeader className="border-b p-6">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-3">
											<div
												className="flex h-8 w-8 items-center justify-center rounded-full bg-primary"
												aria-hidden="true"
											>
												<span className="text-sm font-bold text-primary-foreground">
													M
												</span>
											</div>
											<div>
												<div className="font-semibold text-foreground">
													Manon
												</div>
												<div className="text-xs text-foreground/70">
													Diététicienne
												</div>
											</div>
										</div>
									</div>
									<SheetTitle className="sr-only">
										Menu de navigation
									</SheetTitle>
								</SheetHeader>

								<nav className="flex-1 p-6" aria-label="Menu mobile">
									<ul className="space-y-2">
										{navbarItems.map((item) => {
											const isActive = isMenuItemActive(item.href);
											return (
												<li key={item.href}>
													<SheetClose asChild>
														<Link
															href={item.href}
															className={cn(
																"flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200 w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
																isActive
																	? "text-primary-foreground bg-primary font-semibold hover:bg-primary/90"
																	: "text-foreground hover:bg-accent hover:text-accent-foreground"
															)}
															aria-current={isActive ? "page" : undefined}
														>
															{item.label}
														</Link>
													</SheetClose>
												</li>
											);
										})}
									</ul>
								</nav>

								<div className="border-t p-6 space-y-3">
									{user ? (
										<>
											{isAdmin && (
												<SheetClose asChild>
													<Button
														asChild
														variant="ghost"
														className="w-full text-muted-foreground hover:text-foreground justify-start"
													>
														<Link
															href="/dashboard"
															aria-label="Accéder au tableau de bord administrateur"
														>
															<Settings
																className="h-4 w-4 mr-2"
																aria-hidden="true"
															/>
															Tableau de bord
														</Link>
													</Button>
												</SheetClose>
											)}
											{/* User info mobile */}
											<div className="flex items-center gap-3 p-3 border rounded-lg">
												<div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
													{user.image ? (
														<Image
															src={user.image}
															alt={user.name || "User"}
															width={32}
															height={32}
															className="h-8 w-8 rounded-full object-cover"
														/>
													) : (
														<UserIcon className="h-4 w-4" />
													)}
												</div>
												<div className="flex-1 min-w-0">
													<p className="text-sm font-medium truncate">
														{user.name}
													</p>
													<p className="text-xs text-muted-foreground truncate">
														{user.email}
													</p>
												</div>
											</div>
											<SheetClose asChild>
												<LogoutButton className="w-full">
													<Button
														variant="outline"
														className="w-full justify-start text-muted-foreground hover:text-foreground"
													>
														<LogOut className="h-4 w-4 mr-2" />
														Déconnexion
													</Button>
												</LogoutButton>
											</SheetClose>
										</>
									) : (
										<>
											{isAdmin && (
												<SheetClose asChild>
													<Button
														asChild
														variant="ghost"
														className="w-full text-muted-foreground hover:text-foreground justify-start"
													>
														<Link
															href="/dashboard"
															aria-label="Accéder au tableau de bord administrateur"
														>
															<Settings
																className="h-4 w-4 mr-2"
																aria-hidden="true"
															/>
															Tableau de bord
														</Link>
													</Button>
												</SheetClose>
											)}
											<SheetClose asChild>
												<Button asChild variant="outline" className="w-full">
													<Link href="/login" aria-label="Se connecter">
														Connexion
													</Link>
												</Button>
											</SheetClose>
										</>
									)}
									<SheetClose asChild>
										<Button asChild className="w-full">
											<Link
												href="#contact"
												aria-label="Prendre rendez-vous avec Manon Chaillou, diététicienne nutritionniste"
											>
												Prendre rendez-vous
											</Link>
										</Button>
									</SheetClose>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>

				{/* Breadcrumb */}
				<nav aria-label="Fil d'Ariane" className="sr-only">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
						<Breadcrumb className="py-2">
							<BreadcrumbList
								itemScope
								itemType="https://schema.org/BreadcrumbList"
							>
								{breadcrumbItems.map((item, index) => (
									<BreadcrumbItem
										key={item.href}
										itemProp="itemListElement"
										itemScope
										itemType="https://schema.org/ListItem"
										className="flex items-center"
									>
										<meta itemProp="position" content={String(index + 1)} />
										{index > 0 && <BreadcrumbSeparator />}
										{item.isActive && index === breadcrumbItems.length - 1 ? (
											<BreadcrumbPage
												itemProp="item"
												itemScope
												itemType="https://schema.org/WebPage"
											>
												<span itemProp="name">{item.label}</span>
												<meta itemProp="url" content={item.href} />
											</BreadcrumbPage>
										) : (
											<BreadcrumbLink
												asChild
												itemProp="item"
												itemScope
												itemType="https://schema.org/WebPage"
											>
												<Link href={item.href}>
													{index === 0 && (
														<Home className="h-4 w-4 mr-1" aria-hidden="true" />
													)}
													<span itemProp="name">{item.label}</span>
													<meta itemProp="url" content={item.href} />
												</Link>
											</BreadcrumbLink>
										)}
									</BreadcrumbItem>
								))}
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</nav>
			</nav>
		</header>
	);
}
