import { StructuredData } from "@/shared/components/structured-data";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "Manon Chaillou - Diététicienne Nutritionniste à Nantes",
		template: "%s | Manon Chaillou - Diététicienne Nutritionniste",
	},
	description:
		"Manon Chaillou, diététicienne nutritionniste diplômée à Nantes. Spécialisée en rééquilibrage alimentaire, nutrition cardiologie, accompagnement obésité et nutrition clinique. Consultation personnalisée.",
	keywords: [
		"diététicienne Nantes",
		"nutritionniste Nantes",
		"rééquilibrage alimentaire",
		"nutrition cardiologie",
		"accompagnement obésité",
		"nutrition clinique",
		"diététique Loire-Atlantique",
		"consultation nutritionnelle",
		"perte de poids Nantes",
		"nutrition thérapeutique",
	],
	authors: [{ name: "Manon Chaillou", url: "https://manon-dietetique.fr" }],
	creator: "Manon Chaillou",
	publisher: "Manon Chaillou",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL("https://manon-dietetique.fr"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		locale: "fr_FR",
		url: "https://manon-dietetique.fr",
		title: "Manon Chaillou - Diététicienne Nutritionniste à Nantes",
		description:
			"Diététicienne nutritionniste diplômée à Nantes, spécialisée en rééquilibrage alimentaire, nutrition cardiologie et accompagnement personnalisé.",
		siteName: "Manon Diététique",
		images: [
			{
				url: "/manon.png",
				width: 1200,
				height: 630,
				alt: "Manon Chaillou - Diététicienne Nutritionniste à Nantes",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Manon Chaillou - Diététicienne Nutritionniste à Nantes",
		description:
			"Diététicienne nutritionniste diplômée à Nantes, spécialisée en rééquilibrage alimentaire, nutrition cardiologie et accompagnement personnalisé.",
		images: ["/manon.png"],
	},
	robots: {
		index: false,
		follow: false,
		googleBot: {
			index: false,
			follow: false,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	verification: {
		google: "your-google-site-verification-code",
	},
	category: "healthcare",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr">
			<head>
				<StructuredData />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Toaster position="top-right" richColors />
				{children}
			</body>
		</html>
	);
}
