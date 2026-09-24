import { getAllLevels } from "@/lib/kids/levels";

// Copy of the kids sitemap at /kids/sitemap.xml, for Search Console
// properties registered with the /kids/ URL prefix.
export const revalidate = 3600;

export function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || "https://prompts.chat";
  const now = new Date().toISOString();
  const urls: { loc: string; priority: number; freq: string }[] = [
    { loc: `${baseUrl}/kids`, priority: 1, freq: "weekly" },
    { loc: `${baseUrl}/kids/insegnanti`, priority: 0.9, freq: "monthly" },
    { loc: `${baseUrl}/kids/glossario`, priority: 0.8, freq: "monthly" },
    { loc: `${baseUrl}/kids/map`, priority: 0.8, freq: "monthly" },
    ...getAllLevels().map((l) => ({
      loc: `${baseUrl}/kids/level/${l.slug}`,
      priority: l.world === 6 ? 0.8 : 0.7,
      freq: "monthly",
    })),
    ...getAllLevels().map((l) => ({ loc: `${baseUrl}/kids/insegnanti/schede/${l.slug}`, priority: 0.5, freq: "monthly" })),
  ];
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map((u) => `<url><loc>${u.loc}</loc><lastmod>${now}</lastmod><changefreq>${u.freq}</changefreq><priority>${u.priority}</priority></url>`)
      .join("\n") +
    `\n</urlset>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
