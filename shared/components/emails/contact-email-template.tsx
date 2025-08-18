import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Section,
	Text,
} from "@react-email/components";
import { subjectOptions } from "../../constants/contact-form-subject-options";

interface ContactEmailTemplateProps {
	fullName: string;
	email: string;
	subject: string;
	message: string;
	attachments?: { url: string; name: string }[];
}

export function ContactEmailTemplate({
	fullName,
	email,
	subject,
	message,
	attachments = [],
}: ContactEmailTemplateProps) {
	return (
		<Html lang="fr">
			<Head />
			<Preview>Nouvelle demande de contact de {fullName}</Preview>
			<Body style={main}>
				<Container style={container}>
					{/* En-tête */}
					<Section style={header}>
						<Heading style={title}>Nouvelle demande de contact</Heading>
					</Section>

					{/* Informations du contact */}
					<Section style={section}>
						<Heading style={sectionTitle}>Informations du contact</Heading>
						<Text style={text}>
							<strong>Nom :</strong> {fullName}
						</Text>
						<Text style={text}>
							<strong>Email :</strong>{" "}
							<Link href={`mailto:${email}`} style={link}>
								{email}
							</Link>
						</Text>
						<Text style={text}>
							<strong>Motif :</strong>{" "}
							{subjectOptions[subject as keyof typeof subjectOptions] ||
								subject}
						</Text>
					</Section>

					<Hr style={separator} />

					{/* Message */}
					<Section style={section}>
						<Heading style={sectionTitle}>Message</Heading>
						<Text style={messageText}>{message}</Text>
					</Section>

					{/* Fichiers attachés */}
					{attachments.length > 0 && (
						<>
							<Hr style={separator} />
							<Section style={section}>
								<Heading style={sectionTitle}>
									Fichier{attachments.length > 1 ? "s" : ""} attaché
									{attachments.length > 1 ? "s" : ""}
								</Heading>
								{attachments.map((attachment, index) => (
									<Text key={index} style={text}>
										<Link href={attachment.url} target="_blank" style={link}>
											{attachment.name}
										</Link>
									</Text>
								))}
							</Section>
						</>
					)}

					<Hr style={separator} />

					{/* Footer */}
					<Section style={footer}>
						<Text style={footerText}>Manon Diététique - Email automatique</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

// Styles simples et professionnels
const main = {
	backgroundColor: "#ffffff",
	fontFamily: "Arial, sans-serif",
	padding: "20px",
};

const container = {
	maxWidth: "600px",
	margin: "0 auto",
	backgroundColor: "#ffffff",
	border: "1px solid #e0e0e0",
	borderRadius: "4px",
};

const header = {
	backgroundColor: "#f8f9fa",
	padding: "20px",
	borderBottom: "1px solid #e0e0e0",
};

const title = {
	color: "#333333",
	fontSize: "24px",
	fontWeight: "600",
	margin: "0",
};

const section = {
	padding: "20px",
};

const sectionTitle = {
	color: "#333333",
	fontSize: "18px",
	fontWeight: "600",
	margin: "0 0 15px 0",
};

const text = {
	color: "#555555",
	fontSize: "16px",
	lineHeight: "1.5",
	margin: "0 0 10px 0",
};

const messageText = {
	color: "#555555",
	fontSize: "16px",
	lineHeight: "1.6",
	whiteSpace: "pre-wrap" as const,
	margin: "0",
	padding: "15px",
	backgroundColor: "#f8f9fa",
	border: "1px solid #e0e0e0",
	borderRadius: "4px",
};

const link = {
	color: "#0066cc",
	textDecoration: "underline",
};

const separator = {
	borderTop: "1px solid #e0e0e0",
	margin: "0",
};

const footer = {
	backgroundColor: "#f8f9fa",
	padding: "15px 20px",
	borderTop: "1px solid #e0e0e0",
	textAlign: "center" as const,
};

const footerText = {
	color: "#999999",
	fontSize: "14px",
	margin: "0",
};
