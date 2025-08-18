import { contact } from "@/shared/actions/contact";
import { sendEmail } from "@/shared/actions/send-email";
import { ActionStatus } from "@/shared/types/server-action";
import { render } from "@react-email/render";

// Mock des dépendances
jest.mock("@/shared/actions/send-email");
jest.mock("@react-email/render");
jest.mock("@/shared/lib/prisma", () => ({
	prisma: {
		contactRequest: {
			create: jest.fn(),
			update: jest.fn(),
		},
	},
}));

const mockSendEmail = sendEmail as jest.MockedFunction<typeof sendEmail>;
const mockRender = render as jest.MockedFunction<typeof render>;

// Import du mock de Prisma
import { prisma } from "@/shared/lib/prisma";
const mockPrisma = prisma as jest.Mocked<typeof prisma>;

describe("contact server action", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockRender.mockResolvedValue("<html>Email content</html>");

		// Mock Prisma contactRequest.create pour retourner un objet avec id
		mockPrisma.contactRequest.create.mockResolvedValue({
			id: "test-contact-id",
			fullName: "Jean Dupont",
			email: "jean.dupont@example.com",
			subject: "premiere-consultation",
			message: "Je souhaiterais prendre rendez-vous pour une consultation.",
			status: "PENDING",
			createdAt: new Date(),
			updatedAt: new Date(),
			attachments: [],
		} as any);

		// Mock Prisma contactRequest.update
		mockPrisma.contactRequest.update.mockResolvedValue({} as any);
	});

	describe("successful contact form submission", () => {
		it("should send email with valid form data", async () => {
			// Arrange
			const formData = new FormData();
			formData.append("fullName", "Jean Dupont");
			formData.append("email", "jean.dupont@example.com");
			formData.append("subject", "premiere-consultation");
			formData.append(
				"message",
				"Je souhaiterais prendre rendez-vous pour une consultation."
			);

			mockSendEmail.mockResolvedValue({ success: true });

			// Act
			const result = await contact(undefined, formData);

			// Assert
			expect(result.status).toBe(ActionStatus.SUCCESS);
			expect(result.message).toBe(
				"Votre message a été envoyé avec succès. Nous vous recontacterons dans les plus brefs délais."
			);
			expect(result.data).toEqual({
				fullName: "Jean Dupont",
				email: "jean.dupont@example.com",
				subject: "premiere-consultation",
				message: "Je souhaiterais prendre rendez-vous pour une consultation.",
				attachments: [],
			});

			expect(mockSendEmail).toHaveBeenCalledWith({
				to: "adrien.poirier49@gmail.com",
				subject: "Jean Dupont - Première consultation diététique",
				html: "<html>Email content</html>",
				replyTo: "jean.dupont@example.com",
			});
		});

		it("should handle form data with attachments", async () => {
			// Arrange
			const formData = new FormData();
			formData.append("fullName", "Marie Martin");
			formData.append("email", "marie@example.com");
			formData.append("subject", "autre");
			formData.append(
				"message",
				"Je voudrais des informations complémentaires."
			);
			formData.append("attachments[0].url", "https://example.com/file1.pdf");
			formData.append("attachments[0].name", "document1.pdf");
			formData.append("attachments[1].url", "https://example.com/file2.jpg");
			formData.append("attachments[1].name", "image.jpg");

			mockSendEmail.mockResolvedValue({ success: true });

			// Act
			const result = await contact(undefined, formData);

			// Assert
			expect(result.status).toBe(ActionStatus.SUCCESS);
			expect(result.data?.attachments).toHaveLength(2);
			expect(result.data?.attachments).toEqual([
				{ url: "https://example.com/file1.pdf", name: "document1.pdf" },
				{ url: "https://example.com/file2.jpg", name: "image.jpg" },
			]);
		});
	});

	describe("validation errors", () => {
		it("should return validation error for empty form", async () => {
			// Arrange
			const formData = new FormData();
			formData.append("fullName", "");
			formData.append("email", "");
			formData.append("subject", "");
			formData.append("message", "");

			// Act
			const result = await contact(undefined, formData);

			// Assert
			expect(result.status).toBe(ActionStatus.VALIDATION_ERROR);
			expect(result.message).toBe(
				"Validation échouée. Veuillez vérifier votre saisie."
			);
			expect(result.validationErrors).toBeDefined();
			expect(result.validationErrors?.fullName).toBeDefined();
			expect(result.validationErrors?.email).toBeDefined();
			expect(result.validationErrors?.subject).toBeDefined();
			expect(result.validationErrors?.message).toBeDefined();
		});

		it("should return validation error for invalid email", async () => {
			// Arrange
			const formData = new FormData();
			formData.append("fullName", "Jean Dupont");
			formData.append("email", "not-an-email");
			formData.append("subject", "premiere-consultation");
			formData.append(
				"message",
				"Message de test valide pour la consultation."
			);

			// Act
			const result = await contact(undefined, formData);

			// Assert
			expect(result.status).toBe(ActionStatus.VALIDATION_ERROR);
			expect(result.validationErrors?.email).toContain(
				"Format d'email invalide (exemple: nom@domaine.com)"
			);
		});

		it("should return validation error for short message", async () => {
			// Arrange
			const formData = new FormData();
			formData.append("fullName", "Jean Dupont");
			formData.append("email", "jean@example.com");
			formData.append("subject", "autre");
			formData.append("message", "Court");

			// Act
			const result = await contact(undefined, formData);

			// Assert
			expect(result.status).toBe(ActionStatus.VALIDATION_ERROR);
			expect(result.validationErrors?.message).toContain(
				"Le message doit contenir au moins 10 caractères"
			);
		});

		it("should return validation error for too many attachments", async () => {
			// Arrange
			const formData = new FormData();
			formData.append("fullName", "Jean Dupont");
			formData.append("email", "jean@example.com");
			formData.append("subject", "premiere-consultation");
			formData.append(
				"message",
				"Message de test avec trop de pièces jointes."
			);

			// Add 4 attachments (max is 3)
			for (let i = 0; i < 4; i++) {
				formData.append(
					`attachments[${i}].url`,
					`https://example.com/file${i}.pdf`
				);
				formData.append(`attachments[${i}].name`, `file${i}.pdf`);
			}

			// Act
			const result = await contact(undefined, formData);

			// Assert
			expect(result.status).toBe(ActionStatus.VALIDATION_ERROR);
			expect(result.validationErrors?.attachments).toContain(
				"Maximum 3 pièces jointes autorisées"
			);
		});
	});

	describe("email sending errors", () => {
		it("should handle email sending failure", async () => {
			// Arrange
			const formData = new FormData();
			formData.append("fullName", "Jean Dupont");
			formData.append("email", "jean@example.com");
			formData.append("subject", "premiere-consultation");
			formData.append("message", "Message de test pour une consultation.");

			mockSendEmail.mockResolvedValue(null!);

			// Act
			const result = await contact(undefined, formData);

			// Assert
			expect(result.status).toBe(ActionStatus.ERROR);
			expect(result.message).toBe(
				"Votre demande a été enregistrée mais l'envoi de l'email a échoué. Nous traiterons votre demande manuellement."
			);
		});

		it("should handle email service exception", async () => {
			// Arrange
			const formData = new FormData();
			formData.append("fullName", "Jean Dupont");
			formData.append("email", "jean@example.com");
			formData.append("subject", "premiere-consultation");
			formData.append("message", "Message de test pour une consultation.");

			mockSendEmail.mockRejectedValue(new Error("Email service error"));

			// Act
			const result = await contact(undefined, formData);

			// Assert
			expect(result.status).toBe(ActionStatus.ERROR);
			expect(result.message).toBe(
				"Votre demande a été enregistrée mais l'envoi de l'email a échoué. Nous traiterons votre demande manuellement."
			);
		});

		it("should handle render template error", async () => {
			// Arrange
			const formData = new FormData();
			formData.append("fullName", "Jean Dupont");
			formData.append("email", "jean@example.com");
			formData.append("subject", "premiere-consultation");
			formData.append("message", "Message de test pour une consultation.");

			mockRender.mockRejectedValue(new Error("Template render error"));

			// Act
			const result = await contact(undefined, formData);

			// Assert
			expect(result.status).toBe(ActionStatus.ERROR);
			expect(result.message).toBe(
				"Votre demande a été enregistrée mais l'envoi de l'email a échoué. Nous traiterons votre demande manuellement."
			);
		});
	});

	describe("edge cases", () => {
		it("should handle special characters in form data", async () => {
			// Arrange
			const formData = new FormData();
			formData.append("fullName", "Jean-François d'Artagnan");
			formData.append("email", "jean-francois@example.com");
			formData.append("subject", "autre");
			formData.append(
				"message",
				"Message avec des caractères spéciaux: é, è, à, ç, ñ, ü"
			);

			mockSendEmail.mockResolvedValue({ success: true });

			// Act
			const result = await contact(undefined, formData);

			// Assert
			expect(result.status).toBe(ActionStatus.SUCCESS);
			expect(result.data?.fullName).toBe("Jean-François d'Artagnan");
			expect(result.data?.message).toContain("é, è, à, ç, ñ, ü");
		});

		it("should handle maximum length message", async () => {
			// Arrange
			const formData = new FormData();
			formData.append("fullName", "Jean Dupont");
			formData.append("email", "jean@example.com");
			formData.append("subject", "autre");
			const longMessage = "a".repeat(2000); // Max length
			formData.append("message", longMessage);

			mockSendEmail.mockResolvedValue({ success: true });

			// Act
			const result = await contact(undefined, formData);

			// Assert
			expect(result.status).toBe(ActionStatus.SUCCESS);
			expect(result.data?.message).toHaveLength(2000);
		});

		it("should handle unexpected errors gracefully", async () => {
			// Arrange
			const formData = new FormData();
			// Simulate an error by not providing required fields in an unexpected way
			formData.append("fullName", "Jean Dupont");
			formData.append("email", "jean@example.com");
			formData.append("subject", "premiere-consultation");
			formData.append("message", "Message valide pour test.");

			// Mock an unexpected error during processing
			mockRender.mockImplementation(() => {
				throw new Error("Unexpected error");
			});

			// Act
			const result = await contact(undefined, formData);

			// Assert
			expect(result.status).toBe(ActionStatus.ERROR);
			expect(result.message).toBe(
				"Votre demande a été enregistrée mais l'envoi de l'email a échoué. Nous traiterons votre demande manuellement."
			);
		});
	});
});
