import { prisma } from "@/shared/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";

export const auth = betterAuth({
	emailAndPassword: {
		requireEmailVerification: false,
		enabled: true,
	},
	secret: process.env.BETTER_AUTH_SECRET!,
	baseUrl: process.env.BETTER_AUTH_URL!,
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	plugins: [
		nextCookies(),
		passkey(),
		customSession(async ({ user, session }) => {
			// Récupérer les informations utilisateur complètes depuis la base de données
			const userData = await prisma.user.findUnique({
				where: { id: session.userId },
				select: { role: true },
			});

			return {
				user: {
					...user,
					role: userData?.role || "CLIENT",
				},
				session,
			};
		}),
	],
	pages: {
		error: "/error",
		signIn: "/login",
		signUp: "/signup",
	},
	session: {
		updateAge: 24 * 60 * 60, // 24 heures
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60 * 1000, // 5 minutes
		},
	},
});

export type Session = typeof auth.$Infer.Session;
