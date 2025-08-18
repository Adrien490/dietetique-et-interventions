import { SignUpEmailForm } from "@/domains/auth/features/sign-up-email/sign-up-email-form";
import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
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
					<h1 className="text-3xl font-bold text-foreground">
						Créer un compte
					</h1>
					<p className="text-muted-foreground">
						Rejoignez-nous et accédez à votre espace personnel
					</p>
				</div>

				{/* Carte d'inscription */}
				<Card className="shadow-lg">
					<CardContent className="space-y-6">
						{/* Inscription email */}
						<div>
							<SignUpEmailForm />
						</div>
					</CardContent>

					<CardFooter className="flex-col space-y-4">
						{/* Lien connexion */}
						<div className="text-center text-sm text-muted-foreground">
							<span>Vous avez déjà un compte ? </span>
							<Link
								href="/login"
								className="text-primary hover:text-primary/80 transition-colors font-semibold"
							>
								Se connecter
							</Link>
						</div>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
