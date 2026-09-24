/**
 * Translations and SEO of the kids course.
 */
import fs from "fs";
import path from "path";
import { describe, it, expect, beforeAll, vi } from "vitest";
import { getAllLevels } from "@/lib/kids/levels";

const MSG_DIR = path.join(process.cwd(), "messages");
const load = (f: string) => JSON.parse(fs.readFileSync(path.join(MSG_DIR, f), "utf8"));

function keys(obj: unknown, prefix = ""): string[] {
  if (obj === null || typeof obj !== "object") return [prefix];
  return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k));
}

describe("translations (kids)", () => {
  const en = keys(load("en.json").kids, "kids");
  for (const f of fs.readdirSync(MSG_DIR).filter((f) => f.endsWith(".json") && f !== "en.json")) {
    it(`${f} has every kids key of en.json`, () => {
      const have = new Set(keys(load(f).kids, "kids"));
      expect(en.filter((k) => !have.has(k))).toEqual([]);
    });
  }

  it("Italian texts for the safety world and accessibility are really in Italian", () => {
    const it = load("it.json").kids;
    expect(it.safety.check).toBe("Controlla");
    expect(it.a11y.badge).toBe("Corso accessibile");
  });
});

describe("SEO (kids-only site)", () => {
  // seo.ts, sitemap and robots read these at import time
  beforeAll(() => {
    process.env.KIDS_ONLY = "1";
    process.env.NEXTAUTH_URL = "https://corso-ai-medie.netlify.app";
    vi.resetModules();
  });

  it("every level has an Italian title and description of a good length", async () => {
    const { LEVEL_SEO } = await import("@/lib/kids/seo");
    const problems: string[] = [];
    for (const l of getAllLevels()) {
      const s = LEVEL_SEO[l.slug];
      if (!s) { problems.push(`${l.slug}: missing`); continue; }
      if (s.title.length > 65) problems.push(`${l.slug}: title ${s.title.length} chars`);
      if (s.description.length < 70 || s.description.length > 165) problems.push(`${l.slug}: description ${s.description.length} chars`);
    }
    expect(problems).toEqual([]);
  });

  it("sitemaps list the 52 course pages and nothing else", async () => {
    const sitemap = (await import("@/app/sitemap")).default;
    const urls = (await sitemap()).map((u) => u.url);
    expect(urls).toHaveLength(52); // home, guide, glossary, map, 24 levels, 24 worksheets
    expect(urls.every((u) => u.startsWith("https://corso-ai-medie.netlify.app/kids"))).toBe(true);
    const kidsSitemap = await (await import("@/app/kids/sitemap.xml/route")).GET().text();
    expect(kidsSitemap.match(/<url>/g)).toHaveLength(52);
  });

  it("robots allows Google and AI answer engines on the course", async () => {
    const robots = (await import("@/app/robots")).default();
    const rules = Array.isArray(robots.rules) ? robots.rules : [robots.rules];
    for (const bot of ["*", "GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"]) {
      const r = rules.find((x) => x.userAgent === bot);
      expect(r, bot).toBeDefined();
      expect([r!.allow].flat()).toContain("/kids");
    }
    expect([robots.sitemap].flat()).toContain("https://corso-ai-medie.netlify.app/kids/sitemap.xml");
  });

  it("FAQ and structured data are valid JSON-LD", async () => {
    const { FAQ, faqJsonLd, courseJsonLd, levelJsonLd, jsonLdString } = await import("@/lib/kids/seo");
    expect(FAQ.length).toBeGreaterThanOrEqual(8);
    const parsed = JSON.parse(jsonLdString([courseJsonLd(), faqJsonLd(), levelJsonLd("6-2-secret-keeper")]));
    expect(parsed[0]["@type"]).toBe("Course");
    expect(parsed[1]["@type"]).toBe("FAQPage");
    expect(jsonLdString({ a: "</script>" })).not.toContain("</script>");
  });
});
