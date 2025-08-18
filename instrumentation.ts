import * as Sentry from "@sentry/nextjs";

export async function register() {
	if (process.env.NEXT_RUNTIME === "nodejs") {
		// Configuration pour le serveur Node.js
		Sentry.init({
			dsn: "https://7deafeb8af39556dbbfe18f4c7ad69f6@o4509773479280640.ingest.de.sentry.io/4509773480263760",
			tracesSampleRate: 1,
			enableLogs: true,
			debug: false,
		});
	}

	if (process.env.NEXT_RUNTIME === "edge") {
		// Configuration pour l'Edge Runtime
		Sentry.init({
			dsn: "https://7deafeb8af39556dbbfe18f4c7ad69f6@o4509773479280640.ingest.de.sentry.io/4509773480263760",
			tracesSampleRate: 1,
			enableLogs: true,
			debug: false,
		});
	}
}

export const onRequestError = Sentry.captureRequestError;
