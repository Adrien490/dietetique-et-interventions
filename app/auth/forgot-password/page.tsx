import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
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
						Mot de passe oublié
					</h1>
					<p className="text-muted-foreground">
						Saisissez votre email pour recevoir un lien de récupération
					</p>
				</div>

				{/* Carte de récupération */}
				<Card className="shadow-lg">
					<CardContent className="space-y-6">
						{/* Information */}
						<div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
							<Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
							<div className="text-sm">
								<p className="font-medium text-foreground">
									Instructions de récupération
								</p>
								<p className="text-muted-foreground mt-1">
									Nous vous enverrons un email avec un lien sécurisé pour
									réinitialiser votre mot de passe.
								</p>
							</div>
						</div>

						{/* Formulaire */}
						<form className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email" className="text-sm font-medium">
									Adresse email
								</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="votre.email@exemple.com"
									className="w-full"
									autoComplete="email"
									required
								/>
							</div>

							<Button type="submit" className="w-full">
								Envoyer le lien de récupération
							</Button>
						</form>
					</CardContent>

					<CardFooter className="flex-col space-y-4">
						{/* Lien connexion */}
						<div className="text-center text-sm text-muted-foreground">
							<span>Vous vous souvenez de votre mot de passe ? </span>
							<Link
								href="/auth/signin"
								className="text-primary hover:text-primary/80 transition-colors font-semibold"
							>
								Se connecter
							</Link>
						</div>

						{/* Lien inscription */}
						<div className="text-center text-sm text-muted-foreground">
							<span>Vous n&apos;avez pas de compte ? </span>
							<Link
								href="/auth/signup"
								className="text-primary hover:text-primary/80 transition-colors font-semibold"
							>
								Créer un compte
							</Link>
						</div>
					</CardFooter>
				</Card>

				{/* Footer légal */}
				<div className="text-center text-xs text-muted-foreground">
					<p className="leading-relaxed">
						En utilisant ce service, vous acceptez nos{" "}
						<Link
							href="/legal"
							className="text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
						>
							conditions d&apos;utilisation
						</Link>{" "}
						et notre{" "}
						<Link
							href="/privacy"
							className="text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
						>
							politique de confidentialité
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
