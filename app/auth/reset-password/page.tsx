import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordPage() {
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
						Nouveau mot de passe
					</h1>
					<p className="text-muted-foreground">
						Choisissez un nouveau mot de passe sécurisé
					</p>
				</div>

				{/* Carte de réinitialisation */}
				<Card className="shadow-lg">
					<CardContent className="space-y-6">
						{/* Information sécurité */}
						<div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
							<Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
							<div className="text-sm">
								<p className="font-medium text-foreground">
									Sécurité renforcée
								</p>
								<p className="text-muted-foreground mt-1">
									Utilisez un mot de passe fort avec au moins 8 caractères,
									incluant majuscules, minuscules et chiffres.
								</p>
							</div>
						</div>

						{/* Formulaire */}
						<form className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="password" className="text-sm font-medium">
									Nouveau mot de passe
								</Label>
								<Input
									id="password"
									name="password"
									type="password"
									placeholder="••••••••"
									className="w-full"
									autoComplete="new-password"
									required
								/>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="confirm-password"
									className="text-sm font-medium"
								>
									Confirmer le mot de passe
								</Label>
								<Input
									id="confirm-password"
									name="confirm-password"
									type="password"
									placeholder="••••••••"
									className="w-full"
									autoComplete="new-password"
									required
								/>
							</div>

							<Button type="submit" className="w-full">
								Réinitialiser le mot de passe
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
