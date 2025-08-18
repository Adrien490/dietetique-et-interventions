import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Compression gzip/brotli
	compress: true,

	// Optimisations d'images
	images: {
		formats: ["image/avif", "image/webp"],
		minimumCacheTTL: 31536000, // 1 an
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		remotePatterns: [
			{
				protocol: "https",
				hostname: "11m11vcop9.ufs.sh",
			},
			{
				protocol: "https",
				hostname: "*.ufs.sh",
			},
		],
	},

	// Optimisations CSS et JS
	experimental: {
		useCache: true,
		// Optimisation des polices
		optimizePackageImports: ["lucide-react"],
	},

	// Headers pour le SEO et la sécurité
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
				],
			},
			{
				source: "/sitemap.xml",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=86400, stale-while-revalidate=43200",
					},
				],
			},
			{
				source: "/robots.txt",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=86400, stale-while-revalidate=43200",
					},
				],
			},
			{
				source: "/:path*\\.(jpg|jpeg|png|webp|avif|gif|ico|svg)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
		];
	},

	// Optimisations diverses
	output: "standalone",

	// Redirections pour SEO
	async redirects() {
		return [
			{
				source: "/home",
				destination: "/",
				permanent: true,
			},
			{
				source: "/accueil",
				destination: "/",
				permanent: true,
			},
			{
				source: "/contact",
				destination: "/#contact",
				permanent: true,
			},
		];
	},

	// Rewrites pour le SEO
	async rewrites() {
		return [
			{
				source: "/a-propos",
				destination: "/#about",
			},
			{
				source: "/prestations",
				destination: "/#services",
			},
			{
				source: "/questions-frequentes",
				destination: "/#faq",
			},
		];
	},
};

export default withSentryConfig(nextConfig, {
	// For all available options, see:
	// https://www.npmjs.com/package/@sentry/webpack-plugin#options

	org: "adrien-poirier",
	project: "javascript-nextjs",

	// Only print logs for uploading source maps in CI
	silent: !process.env.CI,

	// For all available options, see:
	// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

	// Upload a larger set of source maps for prettier stack traces (increases build time)
	widenClientFileUpload: true,

	// Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
	// This can increase your server load as well as your hosting bill.
	// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
	// side errors will fail.
	tunnelRoute: "/monitoring",

	// Automatically tree-shake Sentry logger statements to reduce bundle size
	disableLogger: true,

	// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
	// See the following for more information:
	// https://docs.sentry.io/product/crons/
	// https://vercel.com/docs/cron-jobs
	automaticVercelMonitors: true,
});
