/**
 * Course content checks: every level's MDX compiles and every game inside it
 * can actually be solved (right answers exist, ids match, orders are valid).
 */
import fs from "fs";
import path from "path";
import { describe, it, expect } from "vitest";
import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement, Fragment, type ReactNode } from "react";
import { getAllLevels } from "@/lib/kids/levels";
import * as KidsElements from "@/components/kids/elements";

const CONTENT_DIR = path.join(process.cwd(), "src/content/kids");
const FULL_LOCALES = ["it", "en"]; // must contain every level (other locales fall back to English)
const levels = getAllLevels();

type Call = { name: string; props: Record<string, unknown> };

async function collectCalls(file: string): Promise<Call[]> {
  const source = fs.readFileSync(file, "utf8");
  const calls: Call[] = [];
  const names = new Set([...source.matchAll(/<([A-Z][A-Za-z]+)/g)].map((m) => m[1]));
  const components: Record<string, (p: Record<string, unknown> & { children?: ReactNode }) => ReactNode> = {};
  for (const name of names) {
    components[name] = (props) => {
      calls.push({ name, props });
      return createElement(Fragment, null, props.children);
    };
  }
  const { default: Content } = await evaluate(source, { ...runtime, remarkPlugins: [remarkGfm] } as never);
  renderToStaticMarkup(createElement(Content, { components }));
  return calls;
}

const files: { locale: string; slug: string; file: string }[] = [];
for (const locale of fs.readdirSync(CONTENT_DIR)) {
  for (const f of fs.readdirSync(path.join(CONTENT_DIR, locale))) {
    if (f.endsWith(".mdx")) files.push({ locale, slug: f.replace(/\.mdx$/, ""), file: path.join(CONTENT_DIR, locale, f) });
  }
}

describe("levels", () => {
  it("has 24 levels with unique slugs", () => {
    expect(levels.length).toBe(24);
    expect(new Set(levels.map((l) => l.slug)).size).toBe(levels.length);
  });

  for (const locale of FULL_LOCALES) {
    it(`every level has a ${locale} MDX file`, () => {
      const missing = levels.filter((l) => !fs.existsSync(path.join(CONTENT_DIR, locale, `${l.slug}.mdx`)));
      expect(missing.map((l) => l.slug)).toEqual([]);
    });
  }

  it("no MDX file belongs to an unknown level", () => {
    const slugs = new Set(levels.map((l) => l.slug));
    expect(files.filter((f) => !slugs.has(f.slug)).map((f) => `${f.locale}/${f.slug}`)).toEqual([]);
  });
});

describe.each(files)("$locale/$slug", ({ slug, file }) => {
  it("compiles and every game is solvable", async () => {
    const calls = await collectCalls(file);
    const problems: string[] = [];
    const known = new Set(Object.keys(KidsElements));

    for (const { name, props: p } of calls) {
      if (!known.has(name)) problems.push(`unknown component <${name}>`);
      switch (name) {
        case "LevelComplete":
          if (p.levelSlug !== slug) problems.push(`LevelComplete levelSlug "${p.levelSlug}" should be "${slug}"`);
          break;
        case "PromptVsMistake":
          if (!p.question || !p.good || !p.bad) problems.push("PromptVsMistake needs question, good and bad");
          if (p.good === p.bad) problems.push("PromptVsMistake good and bad are identical");
          break;
        case "DragDropPrompt": {
          const pieces = p.pieces as string[];
          const order = [...(p.correctOrder as number[])].sort((a, b) => a - b);
          if (order.join() !== pieces.map((_, i) => i).join()) problems.push("DragDropPrompt correctOrder is not a permutation of pieces");
          break;
        }
        case "MagicWords": {
          const blanks = (p.sentence as string).match(/_+|\{\{[^}]+\}\}/g) || [];
          const cfg = p.blanks as { answers: string[] }[];
          if (blanks.length !== cfg.length) problems.push(`MagicWords has ${blanks.length} blanks but ${cfg.length} configs`);
          if (cfg.some((b) => !b.answers?.length)) problems.push("MagicWords blank without answers");
          break;
        }
        case "WordPredictor":
        case "ExampleMatcher":
          if (!(p.options as string[]).includes(p.correctAnswer as string)) problems.push(`${name} correctAnswer is not among options`);
          break;
        case "WhatWouldYouDo": {
          const choices = p.choices as { correct?: boolean; feedback?: string }[];
          if (!choices.some((c) => c.correct)) problems.push("WhatWouldYouDo has no correct choice");
          if (choices.some((c) => !c.feedback)) problems.push("WhatWouldYouDo choice without feedback");
          break;
        }
        case "SafetySorter": {
          const ids = (p.buckets as { id: string }[]).map((b) => b.id);
          if (new Set(ids).size !== ids.length) problems.push("SafetySorter duplicate bucket ids");
          for (const it of p.items as { text: string; bucket: string; why?: string }[]) {
            if (!ids.includes(it.bucket)) problems.push(`SafetySorter item "${it.text}" uses unknown bucket "${it.bucket}"`);
            if (!it.why) problems.push(`SafetySorter item "${it.text}" has no explanation (why)`);
          }
          break;
        }
        case "SpotTheFake": {
          const s = p.sentences as { fake?: boolean; why?: string }[];
          const fakes = s.filter((x) => x.fake).length;
          if (fakes !== 1) problems.push(`SpotTheFake must have exactly 1 fake sentence, found ${fakes}`);
          if (s.some((x) => !x.fake && !x.why)) problems.push("SpotTheFake true sentence without why");
          break;
        }
        case "PromptDoctor":
          if (!(p.problems as unknown[]).length) problems.push("PromptDoctor without problems");
          break;
        case "PromptLab":
          if (!(p.improvements as unknown[]).length) problems.push("PromptLab without improvements");
          break;
      }
    }

    const completes = calls.filter((c) => c.name === "LevelComplete").length;
    if (completes !== 1) problems.push(`expected 1 <LevelComplete>, found ${completes}`);
    if (!calls.some((c) => c.name === "Section")) problems.push("no <Section>");

    expect(problems).toEqual([]);
  });
});
