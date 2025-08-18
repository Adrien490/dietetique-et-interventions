import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";

// Types pour la session avec rôles
interface User {
	id: string;
	email: string;
	name: string;
	role?: string;
}

interface Session {
	user: User;
	session: {
		id: string;
		userId: string;
		expiresAt: Date;
	};
}

// Routes protégées nécessitant une authentification
const adminRoutes = ["/dashboard"];
const authRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];

// Routes API publiques (ne nécessitent pas d'authentification)
const publicApiRoutes = ["/api/auth", "/api/uploadthing", "/api/webhooks"];

export async function middleware(request: NextRequest) {
	const { data: session } = await betterFetch<Session>(
		"/api/auth/get-session",
		{
			baseURL: request.nextUrl.origin,
			headers: {
				cookie: request.headers.get("cookie") || "",
			},
		}
	);
	const { nextUrl } = request;
	const isLoggedIn = !!session?.user;
	const userRole = session?.user?.role;

	// Permettre aux routes API publiques de passer
	if (publicApiRoutes.some((route) => nextUrl.pathname.startsWith(route))) {
		return NextResponse.next();
	}

	// === GESTION DES ROUTES D'AUTHENTIFICATION ===
	// Rediriger les utilisateurs connectés depuis les pages d'auth vers leur dashboard
	if (
		isLoggedIn &&
		authRoutes.some((route) => nextUrl.pathname.startsWith(route))
	) {
		if (userRole === "ADMIN") {
			return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
		}

		// Par défaut, rediriger vers l'accueil
		return NextResponse.redirect(new URL("/", nextUrl.origin));
	}

	// === PROTECTION DES ROUTES ADMIN ===
	if (adminRoutes.some((route) => nextUrl.pathname.startsWith(route))) {
		// Pas connecté -> redirection vers login
		if (!isLoggedIn) {
			const redirectUrl = new URL("/login", nextUrl.origin);
			redirectUrl.searchParams.set("callbackUrl", nextUrl.pathname);
			return NextResponse.redirect(redirectUrl);
		}

		// Connecté mais pas admin -> accès refusé
		if (userRole !== "ADMIN") {
			// Si c'est un client, rediriger vers son espace
			if (userRole === "CLIENT") {
				return NextResponse.redirect(new URL("/client", nextUrl.origin));
			}
			// Sinon rediriger vers l'accueil avec message d'erreur
			const redirectUrl = new URL("/", nextUrl.origin);
			redirectUrl.searchParams.set("error", "access-denied");
			return NextResponse.redirect(redirectUrl);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Matcher pour toutes les routes sauf :
		 * - api (gérées séparément)
		 * - _next/static (fichiers statiques)
		 * - _next/image (optimisation d'images)
		 * - favicon.ico, robots.txt, sitemap.xml
		 * - fichiers publics (.png, .jpg, .svg, etc.)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
	],
};
