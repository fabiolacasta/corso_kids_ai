import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllLevels, getLevelBySlug } from "@/lib/kids/levels";
import { KIDS_ONLY, SITE_URL, SITE_NAME, kidsMetadata, levelTitleIt, jsonLdString } from "@/lib/kids/seo";
import { TEACHER_CONTENT } from "@/lib/kids/teacher-content";
import { PrintButton } from "@/components/kids/layout/print-button";
import { Worksheet } from "@/components/kids/layout/worksheet";

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
    <div className="adult-page h-full overflow-y-auto" dir="ltr" lang="it">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="no-print flex flex-wrap gap-2 justify-between items-center mb-3">
          <Link href="/kids/insegnanti" className="pixel-btn pixel-btn-amber px-3 py-2 text-base">← Guida insegnanti</Link>
          <PrintButton label="🖨️ Stampa la scheda" />
        </div>

        <Worksheet slug={slug} />

        <nav className="no-print flex justify-between gap-2 mt-4" aria-label="Altre schede">
          {prev ? <Link href={`/kids/insegnanti/schede/${prev.slug}`} className="pixel-btn px-3 py-2 text-base">← {prev.world}.{prev.levelNumber}</Link> : <span />}
          <Link href={`/kids/level/${slug}`} className="pixel-btn pixel-btn-green px-3 py-2 text-base">Apri il livello</Link>
          {next ? <Link href={`/kids/insegnanti/schede/${next.slug}`} className="pixel-btn px-3 py-2 text-base">{next.world}.{next.levelNumber} →</Link> : <span />}
        </nav>
      </div>
    </div>
  );
}
