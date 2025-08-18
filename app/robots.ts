import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/", "/admin/", "/_next/", "/dashboard/"],
			},
		],
		sitemap: `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
		host: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
	};
}
