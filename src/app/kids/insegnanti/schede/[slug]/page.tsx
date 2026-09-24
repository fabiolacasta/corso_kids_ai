import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllLevels, getLevelBySlug } from "@/lib/kids/levels";
import { KIDS_ONLY, SITE_URL, SITE_NAME, kidsMetadata, levelTitleIt, levelShortDescIt, worldTitleIt, jsonLdString } from "@/lib/kids/seo";
import { TEACHER_CONTENT } from "@/lib/kids/teacher-content";
import { PrintButton } from "@/components/kids/layout/print-button";

export function generateStaticParams() {
  return getAllLevels().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const level = getLevelBySlug(slug);
  if (!KIDS_ONLY || !level) return {};
  return kidsMetadata(
    `Scheda didattica: ${levelTitleIt(slug)} (livello ${level.world}.${level.levelNumber})`,
    `Scheda da stampare per l'insegnante: obiettivo, parole chiave, domande per la discussione e un'attività senza computer sul livello «${levelTitleIt(slug)}».`,
    `/kids/insegnanti/schede/${slug}`
  );
}

export default async function WorksheetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const level = getLevelBySlug(slug);
  const c = TEACHER_CONTENT[slug];
  if (!KIDS_ONLY || !level || !c) notFound();

  const all = getAllLevels();
  const i = all.findIndex((l) => l.slug === slug);
  const prev = all[i - 1];
  const next = all[i + 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: `Scheda didattica: ${levelTitleIt(slug)}`,
    description: c.goal,
    inLanguage: "it",
    learningResourceType: "Worksheet",
    educationalLevel: "Scuola secondaria di primo grado",
    audience: { "@type": "EducationalAudience", educationalRole: "teacher" },
    timeRequired: `PT${c.minutes}M`,
    keywords: c.keywords.join(", "),
    isAccessibleForFree: true,
    url: `${SITE_URL}/kids/insegnanti/schede/${slug}`,
    isPartOf: { "@type": "Course", name: SITE_NAME, url: `${SITE_URL}/kids` },
  };

  return (
    <div className="h-full overflow-y-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="no-print flex flex-wrap gap-2 justify-between items-center mb-3">
          <Link href="/kids/insegnanti" className="pixel-btn pixel-btn-amber px-3 py-2 text-base">← Guida insegnanti</Link>
          <PrintButton label="🖨️ Stampa la scheda" />
        </div>

        <article className="print-area bg-white border-4 border-[#8B4513] p-6 text-[#1F2937]" style={{ fontFamily: "var(--font-kids), system-ui, sans-serif" }}>
          <header className="border-b-4 border-[#FFD700] pb-3 mb-4">
            <p className="text-sm font-bold uppercase tracking-wider text-[#B45309] m-0">
              Scheda didattica · Mondo {level.world} – {worldTitleIt(level.world)} · circa {c.minutes} minuti
            </p>
            <h1 className="text-3xl font-bold m-0 mt-1 text-[#2C1810]">
              Livello {level.world}.{level.levelNumber}: {levelTitleIt(slug)}
            </h1>
            <p className="text-lg m-0 mt-1 text-[#5D4037]">{levelShortDescIt(slug)}</p>
          </header>

          <section className="mb-4">
            <h2 className="text-xl font-bold m-0 mb-1 text-[#8B4513]">🎯 Obiettivo</h2>
            <p className="text-lg m-0">{c.goal}</p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-bold m-0 mb-1 text-[#8B4513]">🔑 Parole chiave</h2>
            <p className="text-lg m-0">
              {c.keywords.map((k) => (
                <span key={k} className="inline-block mr-2 mb-1 px-2 py-0.5 border-2 border-[#D4A574] bg-[#FEF3C7]">{k}</span>
              ))}
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-bold m-0 mb-1 text-[#8B4513]">💬 Domande per la discussione</h2>
            <ol className="text-lg m-0 pl-6 list-decimal">
              {c.questions.map((q) => <li key={q} className="mb-1">{q}</li>)}
            </ol>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-bold m-0 mb-1 text-[#8B4513]">✂️ Attività senza computer: {c.activity.title}</h2>
            <ol className="text-lg m-0 pl-6 list-decimal">
              {c.activity.steps.map((s) => <li key={s} className="mb-1">{s}</li>)}
            </ol>
          </section>

          <section className="mb-2">
            <h2 className="text-xl font-bold m-0 mb-1 text-[#8B4513]">📝 Per chiudere</h2>
            <p className="text-lg m-0">Ogni studente scrive su un foglietto una cosa che ha imparato e una domanda che gli è rimasta.</p>
            <div className="mt-2 h-24 border-2 border-dashed border-[#D4A574]" aria-hidden="true" />
          </section>

          <footer className="mt-4 pt-2 border-t-2 border-[#E5E7EB] text-sm text-[#6B7280]">
            Livello online: {SITE_URL}/kids/level/{slug} · Corso gratuito e open source (licenza MIT)
          </footer>
        </article>

        <nav className="no-print flex justify-between gap-2 mt-4" aria-label="Altre schede">
          {prev ? <Link href={`/kids/insegnanti/schede/${prev.slug}`} className="pixel-btn px-3 py-2 text-base">← {prev.world}.{prev.levelNumber}</Link> : <span />}
          <Link href={`/kids/level/${slug}`} className="pixel-btn pixel-btn-green px-3 py-2 text-base">Apri il livello</Link>
          {next ? <Link href={`/kids/insegnanti/schede/${next.slug}`} className="pixel-btn px-3 py-2 text-base">{next.world}.{next.levelNumber} →</Link> : <span />}
        </nav>
      </div>
    </div>
  );
}
