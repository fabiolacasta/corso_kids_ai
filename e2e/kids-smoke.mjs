// Smoke test of the published kids course (run against the real site).
//   BASE_URL=https://corso-ai-medie.netlify.app node e2e/kids-smoke.mjs
// Checks: every page in the sitemap answers 200 with Italian title, canonical and
// JSON-LD; every level opens in a real browser without JavaScript errors and shows
// its first screen; the accessibility panel works; robots.txt and llms.txt exist.
import { chromium } from "playwright";

const BASE = (process.env.BASE_URL || "https://corso-ai-medie.netlify.app").replace(/\/$/, "");
const failures = [];
const fail = (msg) => { failures.push(msg); console.log("  ✗ " + msg); };
const ok = (msg) => console.log("  ✓ " + msg);

async function get(path) {
  const r = await fetch(BASE + path, { headers: { "Accept-Language": "it-IT" } });
  return { status: r.status, text: await r.text(), type: r.headers.get("content-type") || "" };
}

console.log(`Sito: ${BASE}\n\n1) File per Google e per le AI`);
for (const [path, must] of [["/robots.txt", "Sitemap:"], ["/sitemap.xml", "<urlset"], ["/kids/sitemap.xml", "<urlset"], ["/llms.txt", "# Corso IA"], ["/og-corso.png", ""]]) {
  const r = await get(path);
  if (r.status !== 200 || (must && !r.text.includes(must))) fail(`${path} → ${r.status}`); else ok(path);
}

const sitemap = (await get("/kids/sitemap.xml")).text;
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, ""));
console.log(`\n2) Le ${urls.length} pagine della sitemap (HTML, titolo, canonical, dati strutturati)`);
if (urls.length !== 52) fail(`la sitemap ha ${urls.length} pagine invece di 52`);
for (const u of urls) {
  const r = await get(u);
  const title = r.text.match(/<title>([^<]*)<\/title>/)?.[1] || "";
  const problems = [];
  if (r.status !== 200) problems.push(`HTTP ${r.status}`);
  if (!/<html lang="it"/.test(r.text)) problems.push("lingua non it");
  if (!title) problems.push("senza titolo");
  if (!r.text.includes(`rel="canonical" href="${BASE}${u}"`)) problems.push("canonical errato");
  if (!r.text.includes("application/ld+json")) problems.push("senza JSON-LD");
  if (/noindex/.test(r.text.match(/<meta name="robots"[^>]*>/)?.[0] || "")) problems.push("noindex");
  problems.length ? fail(`${u}: ${problems.join(", ")}`) : ok(`${u}  —  ${title.replace(/&#x27;/g, "'")}`);
}

console.log("\n3) Ogni livello nel browser (errori JavaScript, primo schermo, pulsante Avanti)");
const browser = await chromium.launch();
const ctx = await browser.newContext({ locale: "it-IT", viewport: { width: 1280, height: 800 } });
await ctx.addInitScript(() => { try { localStorage.setItem("kids-music-enabled", "false"); } catch {} });
for (const u of ["/kids", "/kids/map", "/kids/insegnanti", "/kids/glossario", "/kids/attestato", "/kids/insegnanti/schede/6-2-secret-keeper", ...urls.filter((x) => x.startsWith("/kids/level/"))]) {
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  try {
    await page.goto(BASE + u, { waitUntil: "networkidle", timeout: 45000 });
    const text = (await page.locator("main").innerText()).trim();
    if (text.length < 20) errors.push("schermo vuoto");
    if (u.startsWith("/kids/level/")) {
      const next = page.getByRole("button", { name: /Avanti/ }).last();
      if (!(await next.count())) errors.push("manca il pulsante Avanti");
      else { await next.click(); await page.waitForTimeout(300); }
    }
  } catch (e) {
    errors.push(String(e).slice(0, 120));
  }
  errors.length ? fail(`${u}: ${errors.slice(0, 3).join(" | ")}`) : ok(u);
  await page.close();
}

console.log("\n4) Modalità classe");
{
  const page = await ctx.newPage();
  try {
    await page.goto(BASE + "/kids/level/6-2-secret-keeper?classe=1", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /Discutiamone/ }).click();
    (await page.getByRole("dialog", { name: "Discutiamone" }).count()) ? ok("Discutiamone") : fail("Discutiamone non si apre");
    await page.getByRole("button", { name: /Squadre/ }).click();
    await page.getByRole("button", { name: /Aggiungi un punto/ }).first().click();
    ok("Squadre");
    await page.goto(BASE + "/kids/map", { waitUntil: "networkidle" });
    const locked = await page.locator(".cursor-not-allowed").count();
    locked === 0 ? ok("tutti i livelli aperti") : fail(`${locked} livelli ancora chiusi in modalità classe`);
    await page.goto(BASE + "/kids?classe=0", { waitUntil: "networkidle" });
  } catch (e) { fail("modalità classe: " + String(e).slice(0, 120)); }
  await page.close();
}

console.log("\n5) Pannello accessibilità");
{
  const page = await ctx.newPage();
  await page.goto(BASE + "/kids", { waitUntil: "networkidle" });
  try {
    await page.getByRole("button", { name: /Corso accessibile/ }).click();
    for (const [label, attr] of [["Lettura facilitata", "data-kids-dyslexia"], ["concentrazione", "data-kids-focus"], ["Colori sicuri", "data-kids-colors"], ["Testo più grande", "data-kids-bigtext"]]) {
      await page.getByRole("switch", { name: new RegExp(label) }).click();
      const on = await page.evaluate((a) => document.documentElement.hasAttribute(a), attr);
      on ? ok(label) : fail(`${label} non si attiva`);
    }
    await page.reload({ waitUntil: "networkidle" });
    const kept = await page.evaluate(() => document.documentElement.hasAttribute("data-kids-colors"));
    kept ? ok("le scelte restano dopo il ricaricamento") : fail("le scelte non vengono ricordate");
  } catch (e) { fail("pannello: " + String(e).slice(0, 120)); }
  await page.close();
}
await browser.close();

console.log(failures.length ? `\n❌ ${failures.length} problemi trovati` : "\n✅ Tutto a posto");
process.exit(failures.length ? 1 : 0);
