import { contactSchema } from "@/domains/contact-request/features/create-contact-request/create-contact-request-schema";

describe("contactSchema", () => {
	describe("fullName validation", () => {
		it("should accept valid names", () => {
			const validNames = [
				"Jean Dupont",
				"Marie-Claire Dubois",
				"Jean-Paul O'Connor",
				"Éléonore Château",
				"François-Xavier de La Tour",
			];

			validNames.forEach((name) => {
				const result = contactSchema.shape.fullName.safeParse(name);
				expect(result.success).toBe(true);
			});
		});

		it("should reject invalid names", () => {
			const invalidNames = [
				"", // empty
				"J", // too short
				"Jean123", // contains numbers
				"Jean@Dupont", // contains special chars
			];

			invalidNames.forEach((name) => {
				const result = contactSchema.shape.fullName.safeParse(name);
				expect(result.success).toBe(false);
			});
		});

		it("should accept names with spaces but reject too short names", () => {
			const result = contactSchema.shape.fullName.safeParse(" ");
			expect(result.success).toBe(false); // Un seul espace est trop court

			const result2 = contactSchema.shape.fullName.safeParse("   ");
			expect(result2.success).toBe(true); // 3 espaces sont acceptés par la regex actuelle
		});

		it("should provide appropriate error messages", () => {
			const result = contactSchema.shape.fullName.safeParse("");
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toBe(
					"Le nom et prénom sont requis"
				);
			}
		});
	});

	describe("email validation", () => {
		it("should accept valid emails", () => {
			const validEmails = [
				"test@example.com",
				"user.name@domain.co.uk",
				"user+tag@example.org",
				"user_name@example-domain.com",
			];

			validEmails.forEach((email) => {
				const result = contactSchema.shape.email.safeParse(email);
				expect(result.success).toBe(true);
			});
		});

		it("should reject invalid emails", () => {
			const invalidEmails = [
				"",
				"not-an-email",
				"@example.com",
				"user@",
				"user@.com",
				"user@domain",
				"user space@example.com",
			];

			invalidEmails.forEach((email) => {
				const result = contactSchema.shape.email.safeParse(email);
				expect(result.success).toBe(false);
			});
		});
	});

	describe("subject validation", () => {
		it("should accept non-empty subjects", () => {
			const result = contactSchema.shape.subject.safeParse("consultation");
			expect(result.success).toBe(true);
		});

		it("should reject empty subjects", () => {
			const result = contactSchema.shape.subject.safeParse("");
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toBe(
					"Veuillez sélectionner le motif de votre demande"
				);
			}
		});
	});

	describe("message validation", () => {
		it("should accept valid messages", () => {
			const validMessage =
				"Bonjour, je souhaiterais prendre rendez-vous pour une consultation.";
			const result = contactSchema.shape.message.safeParse(validMessage);
			expect(result.success).toBe(true);
		});

		it("should reject too short messages", () => {
			const result = contactSchema.shape.message.safeParse("Bonjour");
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toBe(
					"Le message doit contenir au moins 10 caractères"
				);
			}
		});

		it("should reject too long messages", () => {
			const longMessage = "a".repeat(2001);
			const result = contactSchema.shape.message.safeParse(longMessage);
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toBe(
					"Le message ne peut pas dépasser 2000 caractères"
				);
			}
		});

		it("should reject empty messages", () => {
			const result = contactSchema.shape.message.safeParse("");
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toBe("Le message est requis");
			}
		});
	});

	describe("attachments validation", () => {
		it("should accept valid attachments", () => {
			const attachments = [
				{ url: "https://example.com/file1.pdf", name: "document1.pdf" },
				{ url: "https://example.com/file2.jpg", name: "image.jpg" },
			];
			const result = contactSchema.shape.attachments.safeParse(attachments);
			expect(result.success).toBe(true);
		});

		it("should accept empty attachments array", () => {
			const result = contactSchema.shape.attachments.safeParse([]);
			expect(result.success).toBe(true);
		});

		it("should reject more than 3 attachments", () => {
			const attachments = [
				{ url: "https://example.com/file1.pdf", name: "file1.pdf" },
				{ url: "https://example.com/file2.pdf", name: "file2.pdf" },
				{ url: "https://example.com/file3.pdf", name: "file3.pdf" },
				{ url: "https://example.com/file4.pdf", name: "file4.pdf" },
			];
			const result = contactSchema.shape.attachments.safeParse(attachments);
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toBe(
					"Maximum 3 pièces jointes autorisées"
				);
			}
		});

		it("should reject invalid attachment URLs", () => {
			const attachments = [{ url: "not-a-url", name: "file.pdf" }];
			const result = contactSchema.shape.attachments.safeParse(attachments);
			expect(result.success).toBe(false);
		});

		it("should reject attachments without name", () => {
			const attachments = [{ url: "https://example.com/file.pdf", name: "" }];
			const result = contactSchema.shape.attachments.safeParse(attachments);
			expect(result.success).toBe(false);
		});
	});

	describe("complete form validation", () => {
		it("should accept a valid complete form", () => {
			const validForm = {
				fullName: "Jean Dupont",
				email: "jean.dupont@example.com",
				subject: "consultation",
				message:
					"Je souhaiterais prendre rendez-vous pour une consultation nutritionnelle.",
				attachments: [
					{ url: "https://example.com/bilan.pdf", name: "bilan-sanguin.pdf" },
				],
			};
			const result = contactSchema.safeParse(validForm);
			expect(result.success).toBe(true);
		});

		it("should accept a valid form without attachments", () => {
			const validForm = {
				fullName: "Marie Martin",
				email: "marie.martin@example.com",
				subject: "information",
				message: "Je voudrais des informations sur vos consultations.",
				attachments: [],
			};
			const result = contactSchema.safeParse(validForm);
			expect(result.success).toBe(true);
		});

		it("should reject form with multiple validation errors", () => {
			const invalidForm = {
				fullName: "J",
				email: "not-an-email",
				subject: "",
				message: "Court",
				attachments: [],
			};
			const result = contactSchema.safeParse(invalidForm);
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues.length).toBeGreaterThan(1);
			}
		});
	});
});
