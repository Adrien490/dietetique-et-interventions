import { Footer } from "@/app/(marketing)/components/footer";
import { Navbar } from "@/app/(marketing)/components/navbar";
import { isAdmin } from "@/domains/user/utils/is-admin";

export default async function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const userIsAdmin = await isAdmin();

	return (
		<>
			<Navbar isAdmin={userIsAdmin} />
			<main role="main" className="min-h-screen bg-background">
				{children}
			</main>
			<Footer />
		</>
	);
}
