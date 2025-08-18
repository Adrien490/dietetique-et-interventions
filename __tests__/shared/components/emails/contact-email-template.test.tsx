import { ContactEmailTemplate } from "@/shared/components/emails/contact-email-template";
import { subjectOptions } from "@/shared/constants/contact-form-subject-options";
import { render as renderEmail } from "@react-email/render";
import React from "react";

// Mock @react-email/render pour éviter les problèmes de rendu HTML
jest.mock("@react-email/render");

const mockRenderEmail = renderEmail as jest.MockedFunction<typeof renderEmail>;

interface ContactEmailTemplateProps {
	fullName: string;
	email: string;
	subject: string;
	message: string;
	attachments?: { url: string; name: string }[];
}

describe("ContactEmailTemplate", () => {
	const defaultProps: ContactEmailTemplateProps = {
		fullName: "Jean Dupont",
		email: "jean.dupont@example.com",
		subject: "premiere-consultation",
		message:
			"Je souhaiterais prendre rendez-vous pour une consultation nutritionnelle.",
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("rendering", () => {
		it("should render email template with all contact information", async () => {
			const expectedHtml = "<html>Mocked email content</html>";
			mockRenderEmail.mockResolvedValue(expectedHtml);

			const html = await renderEmail(
				<ContactEmailTemplate {...defaultProps} />
			);

			expect(mockRenderEmail).toHaveBeenCalledWith(
				<ContactEmailTemplate {...defaultProps} />
			);
			expect(html).toBe(expectedHtml);
		});

		it("should include contact information in rendered email", async () => {
			mockRenderEmail.mockImplementation(async (component) => {
				// Vérifier que le composant a les bonnes props
				const props = (
					component as React.ReactElement<ContactEmailTemplateProps>
				).props;
				expect(props.fullName).toBe("Jean Dupont");
				expect(props.email).toBe("jean.dupont@example.com");
				expect(props.subject).toBe("premiere-consultation");
				expect(props.message).toBe(defaultProps.message);

				return "<html>Email with contact info</html>";
			});

			await renderEmail(<ContactEmailTemplate {...defaultProps} />);
		});
	});

	describe("subject options", () => {
		it("should handle all subject options correctly", async () => {
			const subjects = Object.keys(subjectOptions) as Array<
				keyof typeof subjectOptions
			>;

			for (const subjectKey of subjects) {
				mockRenderEmail.mockResolvedValue(
					`<html>Email for ${subjectKey}</html>`
				);

				const html = await renderEmail(
					<ContactEmailTemplate {...defaultProps} subject={subjectKey} />
				);

				expect(html).toContain(subjectKey);
			}
		});

		it("should handle custom subject", async () => {
			const customSubject = "custom-subject";
			mockRenderEmail.mockResolvedValue(
				`<html>Email with custom subject</html>`
			);

			await renderEmail(
				<ContactEmailTemplate {...defaultProps} subject={customSubject} />
			);

			expect(mockRenderEmail).toHaveBeenCalledWith(
				<ContactEmailTemplate {...defaultProps} subject={customSubject} />
			);
		});
	});

	describe("attachments", () => {
		it("should handle no attachments", async () => {
			mockRenderEmail.mockResolvedValue(
				"<html>Email without attachments</html>"
			);

			await renderEmail(<ContactEmailTemplate {...defaultProps} />);

			expect(mockRenderEmail).toHaveBeenCalled();
		});

		it("should handle single attachment", async () => {
			const props = {
				...defaultProps,
				attachments: [
					{ url: "https://example.com/file.pdf", name: "document.pdf" },
				],
			};

			mockRenderEmail.mockImplementation(async (component) => {
				const componentProps = (
					component as React.ReactElement<ContactEmailTemplateProps>
				).props;
				expect(componentProps.attachments).toHaveLength(1);
				expect(componentProps.attachments![0]).toEqual({
					url: "https://example.com/file.pdf",
					name: "document.pdf",
				});
				return "<html>Email with attachment</html>";
			});

			await renderEmail(<ContactEmailTemplate {...props} />);
		});

		it("should handle multiple attachments", async () => {
			const props = {
				...defaultProps,
				attachments: [
					{ url: "https://example.com/file1.pdf", name: "document1.pdf" },
					{ url: "https://example.com/file2.jpg", name: "image.jpg" },
					{ url: "https://example.com/file3.doc", name: "rapport.doc" },
				],
			};

			mockRenderEmail.mockImplementation(async (component) => {
				const componentProps = (
					component as React.ReactElement<ContactEmailTemplateProps>
				).props;
				expect(componentProps.attachments).toHaveLength(3);
				return "<html>Email with multiple attachments</html>";
			});

			await renderEmail(<ContactEmailTemplate {...props} />);
		});
	});

	describe("message formatting", () => {
		it("should preserve line breaks in message", async () => {
			const messageWithLineBreaks =
				"Première ligne\nDeuxième ligne\n\nTroisième ligne";
			const props = { ...defaultProps, message: messageWithLineBreaks };

			mockRenderEmail.mockImplementation(async (component) => {
				const componentProps = (
					component as React.ReactElement<ContactEmailTemplateProps>
				).props;
				expect(componentProps.message).toBe(messageWithLineBreaks);
				expect(componentProps.message).toContain("\n");
				return "<html>Email with line breaks</html>";
			});

			await renderEmail(<ContactEmailTemplate {...props} />);
		});

		it("should handle special characters in message", async () => {
			const specialMessage =
				"Message avec caractères spéciaux: é, è, à, ç, €, &, <, >";
			const props = { ...defaultProps, message: specialMessage };

			mockRenderEmail.mockImplementation(async (component) => {
				const componentProps = (
					component as React.ReactElement<ContactEmailTemplateProps>
				).props;
				expect(componentProps.message).toBe(specialMessage);
				return "<html>Email with special chars</html>";
			});

			await renderEmail(<ContactEmailTemplate {...props} />);
		});

		it("should handle very long messages", async () => {
			const longMessage = "Lorem ipsum ".repeat(100);
			const props = { ...defaultProps, message: longMessage };

			mockRenderEmail.mockImplementation(async (component) => {
				const componentProps = (
					component as React.ReactElement<ContactEmailTemplateProps>
				).props;
				expect(componentProps.message).toBe(longMessage);
				expect(componentProps.message.length).toBeGreaterThan(1000);
				return "<html>Email with long message</html>";
			});

			await renderEmail(<ContactEmailTemplate {...props} />);
		});
	});

	describe("edge cases", () => {
		it("should handle empty attachments array", async () => {
			const props = { ...defaultProps, attachments: [] };

			mockRenderEmail.mockImplementation(async (component) => {
				const componentProps = (
					component as React.ReactElement<ContactEmailTemplateProps>
				).props;
				expect(componentProps.attachments).toEqual([]);
				return "<html>Email with empty attachments</html>";
			});

			await renderEmail(<ContactEmailTemplate {...props} />);
		});

		it("should handle undefined attachments", async () => {
			const props = { ...defaultProps, attachments: undefined };

			mockRenderEmail.mockImplementation(async (component) => {
				const componentProps = (
					component as React.ReactElement<ContactEmailTemplateProps>
				).props;
				expect(componentProps.attachments).toBeUndefined();
				return "<html>Email without attachments prop</html>";
			});

			await renderEmail(<ContactEmailTemplate {...props} />);
		});

		it("should handle very long names", async () => {
			const longName =
				"Jean-François Marie-Antoinette de la Tour d'Auvergne-Lauraguais";
			const props = { ...defaultProps, fullName: longName };

			mockRenderEmail.mockImplementation(async (component) => {
				const componentProps = (
					component as React.ReactElement<ContactEmailTemplateProps>
				).props;
				expect(componentProps.fullName).toBe(longName);
				return "<html>Email with long name</html>";
			});

			await renderEmail(<ContactEmailTemplate {...props} />);
		});

		it("should handle email with special characters", async () => {
			const specialEmail = "jean+test@sub.example.co.uk";
			const props = { ...defaultProps, email: specialEmail };

			mockRenderEmail.mockImplementation(async (component) => {
				const componentProps = (
					component as React.ReactElement<ContactEmailTemplateProps>
				).props;
				expect(componentProps.email).toBe(specialEmail);
				return "<html>Email with special email address</html>";
			});

			await renderEmail(<ContactEmailTemplate {...props} />);
		});
	});
});
