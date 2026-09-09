import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/saved", "/*/saved", "/grok-4-7", "/*/grok-4-7"],
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.domain,
  };
}
