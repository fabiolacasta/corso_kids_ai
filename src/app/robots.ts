import { MetadataRoute } from "next";

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL || "https://prompts.chat";

  // Kids-only deployment: only the kids course (and llms.txt) is meant to be crawled
  if (process.env.KIDS_ONLY === "1") {
    const kidsRule = {
      allow: ["/kids", "/llms.txt", "/og-corso.png"],
      disallow: ["/api/", "/admin/", "/settings/", "/login", "/register"],
    };
    return {
      rules: [
        { userAgent: "*", ...kidsRule },
        ...AI_CRAWLERS.map((userAgent) => ({ userAgent, ...kidsRule })),
      ],
      sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/kids/sitemap.xml`],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/settings/",
          "/login",
          "/register",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
