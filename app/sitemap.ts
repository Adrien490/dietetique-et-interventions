import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = process.env.BETTER_AUTH_URL
		? `https://${process.env.BETTER_AUTH_URL}`
		: "https://dietetique-et-interventions.manonchaillou.fr";
	const currentDate = new Date();

	return [
		{
			url: baseUrl,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: `${baseUrl}/#contact`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/legal`,
			lastModified: currentDate,
			changeFrequency: "yearly",
			priority: 0.3,
		},
		{
			url: `${baseUrl}/privacy`,
			lastModified: currentDate,
			changeFrequency: "yearly",
			priority: 0.3,
		},
		// Ancres importantes de la page d'accueil
		{
			url: `${baseUrl}/#about`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/#services`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/#faq`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.7,
		},
	];
}
