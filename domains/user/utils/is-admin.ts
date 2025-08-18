"use server";

import { UserRole } from "@/app/generated/prisma";
import { getSession } from "@/domains/auth/utils/get-session";

export async function isAdmin() {
	const session = await getSession();

	return session?.user?.role === UserRole.ADMIN;
}
