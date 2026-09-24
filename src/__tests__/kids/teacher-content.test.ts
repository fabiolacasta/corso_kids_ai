/**
 * Teacher material: every level has a worksheet with questions and an activity,
 * and every glossary entry points to an existing level.
 */
import { describe, it, expect } from "vitest";
import { getAllLevels } from "@/lib/kids/levels";
import { TEACHER_CONTENT, GLOSSARY } from "@/lib/kids/teacher-content";

const slugs = getAllLevels().map((l) => l.slug);

describe("teacher content", () => {
  it("covers exactly the 24 levels", () => {
    expect(Object.keys(TEACHER_CONTENT).sort()).toEqual([...slugs].sort());
  });

  it.each(slugs)("%s has goal, keywords, 3 questions and an activity", (slug) => {
    const c = TEACHER_CONTENT[slug];
    expect(c.goal.length).toBeGreaterThan(20);
    expect(c.keywords.length).toBeGreaterThanOrEqual(2);
    expect(c.questions).toHaveLength(3);
    expect(c.questions.every((q) => /\?(\s*\(.*\))?$/.test(q.trim()))).toBe(true);
    expect(c.activity.steps.length).toBeGreaterThanOrEqual(3);
    expect(c.minutes).toBeGreaterThanOrEqual(20);
    expect(c.minutes).toBeLessThanOrEqual(60);
  });
});

describe("glossary", () => {
  it("has unique slugs and terms", () => {
    expect(new Set(GLOSSARY.map((g) => g.slug)).size).toBe(GLOSSARY.length);
    expect(new Set(GLOSSARY.map((g) => g.term)).size).toBe(GLOSSARY.length);
  });

  it("links only to existing levels", () => {
    expect(GLOSSARY.filter((g) => g.level && !slugs.includes(g.level)).map((g) => g.term)).toEqual([]);
  });

  it("covers the key words of the safety world", () => {
    const terms = GLOSSARY.map((g) => g.slug);
    for (const t of ["allucinazione", "deepfake", "dati-personali", "phishing", "stereotipo"]) expect(terms).toContain(t);
  });
});
