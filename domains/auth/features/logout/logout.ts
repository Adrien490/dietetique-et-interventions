"use server";

import { auth } from "@/domains/auth/lib/auth";
import {
	ActionStatus,
	createErrorResponse,
} from "@/shared/types/server-action";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "../../utils/get-session";

export async function logout() {
	const session = await getSession();

	if (!session?.user) {
		return createErrorResponse(
			ActionStatus.UNAUTHORIZED,
			"Vous n'êtes pas connecté"
		);
	}

	await auth.api.signOut({ headers: await headers() });
	redirect("/");
}
