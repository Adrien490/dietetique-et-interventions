import { sendEmail } from "@/shared/actions/send-email";
import { ContactFormData } from "@/shared/schemas/contact-schema";

// Mock de Resend
jest.mock("resend", () => ({
	Resend: jest.fn().mockImplementation(() => ({
		emails: {
			send: jest.fn(),
		},
	})),
}));

// Mock React
jest.mock("react", () => ({
	...jest.requireActual("react"),
	createElement: jest.fn((component, props, ...children) => ({
		type: component,
		props: { ...props, children },
	})),
}));

describe("sendEmail", () => {
	const mockEmailData = {
		to: "contact@example.com",
		subject: "Test Subject",
		html: "<p>Test message</p>",
		from: "test@example.com"
	};

	beforeEach(() => {
		jest.clearAllMocks();
		// Reset environment variables
		process.env.RESEND_API_KEY = "test-api-key";
	});

	it("should export sendEmail function", () => {
		expect(typeof sendEmail).toBe("function");
	});

	it("should handle missing API key", async () => {
		delete process.env.RESEND_API_KEY;

		await expect(sendEmail(mockEmailData)).rejects.toThrow("RESEND_API_KEY n'est pas défini");
	});

	it("should handle missing to email", async () => {
		await expect(sendEmail({
			...mockEmailData,
			to: ""
		})).rejects.toThrow("Destinataire et sujet sont requis");
	});

	it("should handle missing subject", async () => {
		await expect(sendEmail({
			...mockEmailData,
			subject: ""
		})).rejects.toThrow("Destinataire et sujet sont requis");
	});

	it("should handle email sending success", async () => {
		const { Resend } = require("resend");
		const mockSend = jest.fn().mockResolvedValue({ data: { id: "email-id-123" } });
		Resend.mockImplementation(() => ({
			emails: { send: mockSend },
		}));

		const result = await sendEmail(mockEmailData);

		expect(result.success).toBe(true);
		expect(mockSend).toHaveBeenCalledWith(expect.objectContaining({
			from: "test@example.com",
			to: ["contact@example.com"],
			subject: "Test Subject",
			html: "<p>Test message</p>",
		}));
	});

	it("should handle email sending failure", async () => {
		const { Resend } = require("resend");
		const mockSend = jest.fn().mockResolvedValue({ error: { message: "Send failed" } });
		Resend.mockImplementation(() => ({
			emails: { send: mockSend },
		}));

		await expect(sendEmail(mockEmailData)).rejects.toThrow("Send failed");
	});

	it("should handle missing content", async () => {
		await expect(sendEmail({
			to: "test@example.com",
			subject: "Test Subject"
			// no html or react content
		})).rejects.toThrow("Contenu HTML ou template React requis");
	});

	it("should use default from email when not provided", async () => {
		const { Resend } = require("resend");
		const mockSend = jest.fn().mockResolvedValue({ data: { id: "email-id" } });
		Resend.mockImplementation(() => ({
			emails: { send: mockSend },
		}));

		const emailDataWithoutFrom = {
			to: "test@example.com",
			subject: "Test Subject",
			html: "<p>Test</p>"
		};

		const result = await sendEmail(emailDataWithoutFrom);

		expect(result.success).toBe(true);
		expect(mockSend).toHaveBeenCalledWith(
			expect.objectContaining({
				from: "onboarding@resend.dev", // default from
			})
		);
	});
});
