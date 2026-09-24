import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KIDS_ONLY, SITE_URL, SITE_NAME, kidsMetadata, jsonLdString, levelTitleIt } from "@/lib/kids/seo";
import { GLOSSARY } from "@/lib/kids/teacher-content";

const TITLE = "Glossario dell'intelligenza artificiale per ragazzi";
const DESCRIPTION =
  "Le parole dell'IA spiegate in modo semplice per la scuola media: prompt, chatbot, allucinazione, deepfake, privacy, phishing e altre, con esempi.";

export const metadata: Metadata = KIDS_ONLY ? kidsMetadata(TITLE, DESCRIPTION, "/kids/glossario") : {};

export default function GlossaryPage() {
  if (!KIDS_ONLY) notFound();
  const sorted = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term, "it"));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${SITE_URL}/kids/glossario`,
    name: TITLE,
    inLanguage: "it",
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}/kids` },
    hasDefinedTerm: sorted.map((g) => ({
      "@type": "DefinedTerm",
      "@id": `${SITE_URL}/kids/glossario#${g.slug}`,
      name: g.term,
      description: g.definition,
    })),
  };

  return (
    <div className="h-full overflow-y-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <article className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-4">
        <header className="bg-white/90 border-4 border-[#8B4513] p-4 md:p-6">
          <p className="text-sm font-bold uppercase tracking-wider text-[#B45309] m-0 mb-2">Glossario</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#2C1810] m-0 mb-3">Le parole dell&apos;intelligenza artificiale</h1>
          <p className="text-lg text-[#3E2723] m-0">
            {GLOSSARY.length} parole spiegate in modo semplice, con un esempio e il livello del corso in cui si incontrano.
          </p>
          <nav className="flex flex-wrap gap-2 mt-3" aria-label="Indice delle parole">
            {sorted.map((g) => (
              <a key={g.slug} href={`#${g.slug}`} className="text-sm px-2 py-1 bg-[#FEF3C7] border-2 border-[#D4A574] text-[#5D4037] hover:border-[#8B4513]">
                {g.term}
              </a>
            ))}
          </nav>
        </header>
        <div className="flex flex-col gap-3">
          {sorted.map((g) => (
            <section key={g.slug} id={g.slug} className="bg-white/90 border-4 border-[#D4A574] p-4 scroll-mt-4" aria-labelledby={`t-${g.slug}`}>
              <h2 id={`t-${g.slug}`} className="m-0 text-2xl font-bold text-[#8B4513]">{g.term}</h2>
              <div className="mt-1 text-lg text-[#2C1810]">
                <p className="m-0">{g.definition}</p>
                {g.example && <p className="m-0 mt-1 text-[#5D4037]"><b>Esempio:</b> {g.example}</p>}
                {g.level && (
                  <p className="m-0 mt-2 text-base">
                    <Link href={`/kids/level/${g.level}`} className="underline text-[#1D4ED8] font-bold">
                      Livello {g.level.slice(0, 3).replace("-", ".")}: {levelTitleIt(g.level)} →
                    </Link>
                  </p>
                )}
              </div>
            </section>
          ))}
        </div>
        <p className="text-center m-0 pb-6">
          <Link href="/kids/insegnanti" className="pixel-btn pixel-btn-amber px-4 py-2 text-lg inline-block">Guida per insegnanti</Link>
        </p>
      </article>
    </div>
  );
}
