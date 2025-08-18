"use server";

import { auth } from "@/domains/auth/lib/auth";
import { headers } from "next/headers";

export async function getSession() {
	return auth.api.getSession({
		headers: await headers(),
	});
}
