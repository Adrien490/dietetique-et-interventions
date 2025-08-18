import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
	contactAttachment: f({
		image: { maxFileSize: "4MB", maxFileCount: 3 },
		pdf: { maxFileSize: "4MB", maxFileCount: 3 },
		text: { maxFileSize: "4MB", maxFileCount: 3 },
		blob: { maxFileSize: "4MB", maxFileCount: 3 },
	})
		.middleware(async () => {
			// Pas d'authentification requise pour le formulaire de contact
			return { userId: "anonymous" };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			console.log("Upload complete for userId:", metadata.userId);
			console.log("File URL:", file.ufsUrl);
			return { uploadedBy: metadata.userId };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
