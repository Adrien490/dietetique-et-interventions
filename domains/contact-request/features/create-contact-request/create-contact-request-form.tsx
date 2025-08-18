"use client";

import { MiniDotsLoader } from "@/shared/components/loaders";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { subjectOptions } from "@/shared/constants/contact-form-subject-options";
import { cn } from "@/shared/utils";
import { UploadDropzone, useUploadThing } from "@/shared/utils/uploadthing";
import { mergeForm, useForm, useTransform } from "@tanstack/react-form";
import { AnimatePresence, motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { useCreateContactRequestForm } from "./use-create-contact-request-form";

export function CreateContactRequestForm() {
	const { state, dispatch, isPending } = useCreateContactRequestForm({
		onSuccess: (message) => {
			toast.success(message);
			form.reset();
		},
	});
	const { startUpload, isUploading } = useUploadThing("contactAttachment");

	const form = useForm({
		defaultValues: {
			fullName: "",
			email: "",
			subject: "",
			message: "",
			attachments: [] as { url: string; name: string }[],
		},
		transform: useTransform(
			(baseForm) => mergeForm(baseForm, (state as unknown) ?? {}),
			[state]
		),
	});

	console.log(state);

	return (
		<form
			action={dispatch}
			className="space-y-6"
			onSubmit={form.handleSubmit}
			aria-labelledby="contact-form-title"
			data-voice-queries="formulaire contact diététicienne,prendre rendez-vous nantes,consultation nutrition"
			data-content-type="contact-form-healthcare"
			data-ai-category="healthcare-nutrition-booking"
			data-form-purpose="appointment-booking"
			itemScope
			itemType="https://schema.org/ContactPoint"
			noValidate
		>
			<p className="sr-only">
				Formulaire de contact pour prendre rendez-vous avec Manon Chaillou,
				diététicienne nutritionniste à Nantes. Remplissez vos coordonnées et
				décrivez votre demande pour une consultation personnalisée.
			</p>
			{/* Titre du formulaire (caché mais référencé) */}
			<h2 id="contact-form-title" className="sr-only">
				Formulaire de contact
			</h2>

			{/* Champs cachés pour les attachments */}
			<form.Subscribe selector={(state) => [state.values.attachments]}>
				{([attachments]) => (
					<>
						{attachments?.map((attachment, index) => (
							<div key={index}>
								<input
									type="hidden"
									name={`attachments[${index}].url`}
									value={attachment.url}
								/>
								<input
									type="hidden"
									name={`attachments[${index}].name`}
									value={attachment.name}
								/>
							</div>
						))}
					</>
				)}
			</form.Subscribe>

			{/* Grille 2 colonnes */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Colonne de gauche : Champs de base */}
				<div className="space-y-6">
					<fieldset className="space-y-4 border-0 p-0 m-0">
						<legend className="sr-only">Informations de contact</legend>

						<form.Field
							name="fullName"
							validators={{
								onChange: ({ value }) => {
									if (!value?.trim()) {
										return "Le nom et prénom sont requis";
									}
									if (value.trim().length < 2) {
										return "Le nom et prénom doivent contenir au moins 2 caractères";
									}
									return undefined;
								},
								onBlur: ({ value }) => {
									if (value && !/^[a-zA-ZÀ-ÿ\s-']+$/.test(value)) {
										return "Le nom et prénom ne doivent contenir que des lettres";
									}
									return undefined;
								},
							}}
						>
							{(field) => (
								<div className="space-y-2">
									<Label htmlFor={field.name} className="text-sm font-medium">
										Nom et prénom{" "}
										<span
											className="text-destructive"
											aria-label="champ requis"
										>
											*
										</span>
									</Label>
									<Input
										id={field.name}
										name={field.name}
										type="text"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
										placeholder="Votre nom et prénom"
										className={cn(
											"max-w-full",
											!field.state.meta.isValid
												? "border-destructive focus:border-destructive"
												: ""
										)}
										aria-invalid={!field.state.meta.isValid}
										aria-describedby={
											!field.state.meta.isValid
												? `${field.name}-error`
												: field.state.value.length > 0
													? `${field.name}-help`
													: undefined
										}
										aria-required="true"
										autoComplete="name"
										required
									/>
									{!field.state.meta.isValid &&
										field.state.meta.errors.length > 0 && (
											<p
												id={`${field.name}-error`}
												className="text-sm text-destructive"
												role="alert"
												aria-live="polite"
											>
												{field.state.meta.errors.join(", ")}
											</p>
										)}
								</div>
							)}
						</form.Field>

						<form.Field
							name="email"
							validators={{
								onChange: ({ value }) => {
									if (!value?.trim()) {
										return "L'email est requis";
									}
									return undefined;
								},
								onBlur: ({ value }) => {
									if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
										return "Format d'email invalide (exemple: nom@domaine.com)";
									}
									return undefined;
								},
							}}
						>
							{(field) => (
								<div className="space-y-2">
									<Label htmlFor={field.name} className="text-sm font-medium">
										Adresse email{" "}
										<span
											className="text-destructive"
											aria-label="champ requis"
										>
											*
										</span>
									</Label>
									<Input
										id={field.name}
										name={field.name}
										type="email"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
										placeholder="votre.email@exemple.com"
										className={cn(
											"max-w-full",
											!field.state.meta.isValid
												? "border-destructive focus:border-destructive"
												: ""
										)}
										aria-invalid={!field.state.meta.isValid}
										aria-describedby={
											!field.state.meta.isValid
												? `${field.name}-error`
												: `${field.name}-help`
										}
										aria-required="true"
										autoComplete="email"
										inputMode="email"
										required
									/>
									{!field.state.meta.isValid &&
									field.state.meta.errors.length > 0 ? (
										<p
											id={`${field.name}-error`}
											className="text-sm text-destructive"
											role="alert"
											aria-live="polite"
										>
											{field.state.meta.errors.join(", ")}
										</p>
									) : (
										<p
											id={`${field.name}-help`}
											className="text-sm text-muted-foreground"
										>
											Nous utiliserons cet email pour vous recontacter
										</p>
									)}
								</div>
							)}
						</form.Field>

						<form.Field
							name="subject"
							validators={{
								onChange: ({ value }) => {
									if (!value?.trim()) {
										return "Veuillez sélectionner le motif de votre demande";
									}
									return undefined;
								},
							}}
						>
							{(field) => (
								<div className="space-y-2">
									<Label htmlFor={field.name} className="text-sm font-medium">
										Motif{" "}
										<span
											className="text-destructive"
											aria-label="champ requis"
										>
											*
										</span>
									</Label>
									<Select
										name={field.name}
										value={field.state.value}
										onValueChange={(value) => field.handleChange(value)}
									>
										<SelectTrigger
											id={field.name}
											className={cn(
												"w-full max-w-full",
												!field.state.meta.isValid
													? "border-destructive focus:border-destructive"
													: ""
											)}
											aria-invalid={!field.state.meta.isValid}
											aria-describedby={
												!field.state.meta.isValid
													? `${field.name}-error`
													: `${field.name}-help`
											}
											aria-required="true"
										>
											<SelectValue placeholder="Sélectionnez le motif de votre demande" />
										</SelectTrigger>

										<SelectContent className="w-full">
											{Object.entries(subjectOptions).map(([key, value]) => (
												<SelectItem key={key} value={key}>
													{value}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									{!field.state.meta.isValid &&
									field.state.meta.errors.length > 0 ? (
										<p
											id={`${field.name}-error`}
											className="text-sm text-destructive"
											role="alert"
											aria-live="polite"
										>
											{field.state.meta.errors.join(", ")}
										</p>
									) : (
										<p
											id={`${field.name}-help`}
											className="text-sm text-muted-foreground"
										>
											Cela nous aide à mieux vous orienter
										</p>
									)}
								</div>
							)}
						</form.Field>

						<form.Field name="attachments" mode="array">
							{(field) => (
								<div className="space-y-2">
									<Label htmlFor="file-upload" className="text-sm font-medium">
										Pièces jointes{" "}
										<span className="text-muted-foreground">
											(optionnel, max 3)
										</span>
									</Label>
									<div className="space-y-3">
										{/* Liste des fichiers uploadés */}
										<AnimatePresence mode="popLayout">
											{field.state.value.length > 0 && (
												<motion.div
													className="space-y-2"
													initial={{ opacity: 0, height: 0 }}
													animate={{ opacity: 1, height: "auto" }}
													exit={{ opacity: 0, height: 0 }}
													transition={{ duration: 0.3, ease: "easeInOut" }}
												>
													{field.state.value.map((attachment, index) => (
														<motion.div
															key={`${attachment.url}-${index}`}
															className="overflow-hidden"
															initial={{ opacity: 0, y: -10, scale: 0.95 }}
															animate={{ opacity: 1, y: 0, scale: 1 }}
															exit={{ opacity: 0, y: -10, scale: 0.95 }}
															transition={{
																duration: 0.2,
																ease: "easeInOut",
																delay: index * 0.05,
															}}
															layout
														>
															<div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
																<Upload className="h-4 w-4 text-primary flex-shrink-0" />
																<div className="w-0 flex-grow">
																	<p className="text-sm font-medium text-foreground truncate">
																		{attachment.name}
																	</p>
																	<p className="text-xs text-primary">
																		Fichier uploadé avec succès
																	</p>
																</div>
																<Button
																	type="button"
																	variant="ghost"
																	size="sm"
																	onClick={() => {
																		field.removeValue(index);
																	}}
																	className="text-destructive hover:text-destructive/80 hover:bg-destructive/10 h-8 w-8 p-0 flex-shrink-0"
																	aria-label="Supprimer le fichier"
																>
																	<X className="h-4 w-4" />
																</Button>
															</div>
														</motion.div>
													))}
												</motion.div>
											)}
										</AnimatePresence>

										{/* Zone d'upload - affichée seulement si moins de 3 fichiers */}
										{field.state.value.length < 3 && (
											<div className="relative">
												<UploadDropzone
													endpoint="contactAttachment"
													onChange={async (files) => {
														const res = await startUpload(files);
														const attachmentUrl = res?.[0]?.ufsUrl;
														if (attachmentUrl) {
															field.pushValue({
																url: attachmentUrl,
																name: files[0].name,
															});
														}
													}}
													onUploadError={(error) => {
														toast.error(
															`Erreur lors de l'upload: ${error.message}`
														);
													}}
													className="w-full [&>*]:after:!hidden [&>*]:before:!hidden [&>*::after]:!hidden [&>*::before]:!hidden ut-loading-text:!hidden ut-readying:!hidden ut-uploading:after:!hidden"
													appearance={{
														container: ({ isDragActive, isUploading }) => ({
															border: "2px dashed",
															borderColor: isDragActive
																? "hsl(var(--primary))"
																: "hsl(var(--muted-foreground) / 0.25)",
															borderRadius: "0.75rem",
															backgroundColor: isDragActive
																? "hsl(var(--primary) / 0.05)"
																: "hsl(var(--muted) / 0.3)",
															padding: "1.5rem",
															transition: "all 0.2s ease-in-out",
															height: "140px",
															display: "flex",
															flexDirection: "column",
															alignItems: "center",
															justifyContent: "center",
															gap: "0.5rem",
															cursor: isUploading ? "not-allowed" : "pointer",
															opacity: isUploading ? 0.7 : 1,
															position: "relative",
															boxShadow: isDragActive
																? "0 0 0 1px hsl(var(--primary) / 0.2), 0 4px 12px hsl(var(--primary) / 0.1)"
																: "0 1px 3px rgba(0, 0, 0, 0.1)",
														}),
														uploadIcon: ({ isDragActive, isUploading }) => ({
															color: isDragActive
																? "hsl(var(--primary))"
																: "hsl(var(--primary) / 0.7)",
															width: "2.5rem",
															height: "2.5rem",
															transition: "all 0.2s ease-in-out",
															transform: isDragActive
																? "scale(1.1)"
																: "scale(1)",
															opacity: isUploading ? 0.5 : 1,
														}),
														label: ({ isDragActive, isUploading }) => ({
															color: isDragActive
																? "hsl(var(--primary))"
																: "hsl(var(--foreground))",
															fontSize: "1rem",
															fontWeight: "500",
															textAlign: "center",
															transition: "color 0.2s ease-in-out",
															opacity: isUploading ? 0.5 : 1,
														}),
														allowedContent: ({ isUploading }) => ({
															color: "hsl(var(--muted-foreground))",
															fontSize: "0.875rem",
															textAlign: "center",
															marginTop: "0.5rem",
															opacity: isUploading ? 0.5 : 1,
														}),
														button: ({ isUploading }) => ({
															backgroundColor: "hsl(var(--primary))",
															color: "hsl(var(--primary-foreground))",
															border: "none",
															borderRadius: "0.375rem",
															padding: "0.5rem 1rem",
															fontSize: "0.875rem",
															fontWeight: "500",
															cursor: isUploading ? "not-allowed" : "pointer",
															opacity: isUploading ? 0.5 : 1,
															transition: "all 0.2s ease-in-out",
														}),
													}}
													content={{
														uploadIcon: ({
															isDragActive,
															isUploading,
															uploadProgress,
														}) => {
															if (isUploading) {
																return (
																	<div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm rounded-lg z-10">
																		<MiniDotsLoader size="md" color="primary" />
																		<div className="text-center">
																			<p className="text-sm font-medium text-primary">
																				Chargement du fichier...
																			</p>
																			<p className="text-lg font-semibold text-primary mt-1">
																				{uploadProgress}%
																			</p>
																		</div>
																	</div>
																);
															}
															return (
																<Upload
																	className={cn(
																		"h-10 w-10 transition-all duration-200",
																		isDragActive
																			? "text-primary scale-110"
																			: "text-primary/70"
																	)}
																/>
															);
														},
														label: ({ isDragActive, isUploading }) => {
															if (isUploading) {
																return null;
															}

															if (isDragActive) {
																return (
																	<div className="text-center">
																		<p className="text-base font-medium text-primary">
																			Relâchez pour uploader
																		</p>
																		<p className="text-sm text-primary/80 mt-1">
																			{3 - field.state.value.length}
																			fichier(s) restant(s)
																		</p>
																	</div>
																);
															}

															return (
																<div className="text-center">
																	<p className="text-base font-medium">
																		Glissez vos fichiers ici
																	</p>
																	<p className="text-sm text-muted-foreground mt-1">
																		ou cliquez pour sélectionner
																	</p>
																</div>
															);
														},
														allowedContent: () => null,
														button: () => (
															<span className="sr-only">
																Sélectionner des fichiers
															</span>
														),
													}}
													config={{
														mode: "auto",
													}}
													aria-label="Sélectionner des fichiers à joindre"
												/>
											</div>
										)}
									</div>
								</div>
							)}
						</form.Field>
					</fieldset>
				</div>

				{/* Colonne de droite : Message */}
				<div className="space-y-6">
					<form.Field
						name="message"
						validators={{
							onChange: ({ value }) => {
								if (!value?.trim()) {
									return "Le message est requis";
								}
								if (value.trim().length < 10) {
									return "Le message doit contenir au moins 10 caractères";
								}
								if (value.trim().length > 2000) {
									return "Le message ne peut pas dépasser 2000 caractères";
								}
								return undefined;
							},
						}}
					>
						{(field) => (
							<div className="space-y-2 h-full">
								<Label htmlFor={field.name} className="text-sm font-medium">
									Message{" "}
									<span className="text-destructive" aria-label="champ requis">
										*
									</span>
								</Label>
								<Textarea
									id={field.name}
									name={field.name}
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={field.handleBlur}
									placeholder="Décrivez votre demande, vos objectifs nutritionnels, ou toute question que vous souhaitez poser. Plus vous êtes précis, mieux nous pourrons vous accompagner."
									rows={15}
									className={cn(
										"resize-none w-full max-w-full min-w-0 break-words overflow-hidden box-border",
										!field.state.meta.isValid
											? "border-destructive focus:border-destructive"
											: ""
									)}
									aria-invalid={!field.state.meta.isValid}
									aria-describedby={
										!field.state.meta.isValid
											? `${field.name}-error`
											: `${field.name}-help`
									}
									aria-required="true"
									maxLength={2000}
									required
								/>
								{!field.state.meta.isValid &&
								field.state.meta.errors.length > 0 ? (
									<p
										id={`${field.name}-error`}
										className="text-sm text-destructive"
										role="alert"
										aria-live="polite"
									>
										{field.state.meta.errors.join(", ")}
									</p>
								) : (
									<p
										id={`${field.name}-help`}
										className="text-sm text-muted-foreground"
										aria-live="polite"
									>
										{field.state.value.length}/2000 caractères
									</p>
								)}
							</div>
						)}
					</form.Field>
				</div>
			</div>

			{/* Section en bas pour les erreurs et le bouton */}
			<div className="space-y-4 border-t pt-6">
				<div className="text-sm text-muted-foreground">
					<p>
						<span className="text-destructive" aria-hidden="true">
							*
						</span>
						<span className="ml-1">Champs obligatoires</span>
					</p>
				</div>

				<form.Subscribe selector={(state) => [state.errorMap]}>
					{([errorMap]) =>
						errorMap.onSubmit ? (
							<div
								className="p-3 bg-destructive/10 border border-destructive/20 rounded-md"
								role="alert"
								aria-live="assertive"
							>
								<p className="text-sm text-destructive">
									Erreur lors de l&apos;envoi : {errorMap.onSubmit}
								</p>
							</div>
						) : null
					}
				</form.Subscribe>

				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
				>
					{([canSubmit]) => (
						<Button
							type="submit"
							disabled={!canSubmit || isPending || isUploading}
							aria-disabled={!canSubmit || isPending}
							aria-describedby={!canSubmit ? "submit-help" : undefined}
						>
							{isPending ? (
								<>
									<MiniDotsLoader size="sm" color="default" />
									Envoi en cours...
								</>
							) : (
								"Envoyer ma demande"
							)}
						</Button>
					)}
				</form.Subscribe>

				{!form.state.canSubmit &&
					form.state.isTouched &&
					!form.state.isSubmitting && (
						<p id="submit-help" className="text-sm text-muted-foreground">
							Veuillez corriger les erreurs ci-dessus avant d&apos;envoyer le
							formulaire
						</p>
					)}
			</div>
		</form>
	);
}
