import { SignInEmailForm } from "@/domains/auth/features/sign-in-email/sign-in-email-form";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function SignInPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4 relative">
			{/* Bouton de retour */}
			<Link
				href="/"
				className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors z-10"
			>
				<ArrowLeft className="w-4 h-4" />
				Retour au site
			</Link>

			<div className="w-full max-w-md mx-auto space-y-8">
				{/* Header */}
				<div className="text-center space-y-2">
					<h1 className="text-3xl font-bold text-foreground">Connexion</h1>
					<p className="text-muted-foreground">
						Accédez à votre espace professionnel
					</p>
				</div>

				{/* Carte de connexion */}
				<Card className="shadow-lg">
					<CardContent className="space-y-6">
						{/* Connexion email */}
						<div>
							<Suspense
								fallback={
									<div className="h-32 animate-pulse bg-muted rounded" />
								}
							>
								<SignInEmailForm />
							</Suspense>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
