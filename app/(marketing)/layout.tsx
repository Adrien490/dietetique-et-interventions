import { Footer } from "@/app/(marketing)/components/footer";
import { Navbar } from "@/app/(marketing)/components/navbar";

export default async function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar />
			<main role="main" className="min-h-screen bg-background">
				{children}
			</main>
			<Footer />
		</>
	);
}
