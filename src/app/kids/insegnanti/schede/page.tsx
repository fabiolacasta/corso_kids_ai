import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { worlds } from "@/lib/kids/levels";
import { KIDS_ONLY, SITE_URL, SITE_NAME, kidsMetadata, worldTitleIt, levelTitleIt, jsonLdString } from "@/lib/kids/seo";
import { getAllLevels } from "@/lib/kids/levels";
import { PrintButton } from "@/components/kids/layout/print-button";
import { Worksheet } from "@/components/kids/layout/worksheet";

export const metadata: Metadata = KIDS_ONLY
  ? kidsMetadata(
      "Tutte le schede didattiche sull'intelligenza artificiale per la scuola media",
      "Le 24 schede da stampare del corso sull'IA per le medie: obiettivi, parole chiave, domande per la discussione e attività senza computer, livello per livello.",
      "/kids/insegnanti/schede"
    )
  : {};

/** All 24 worksheets on one page, one per printed sheet. */
export default function AllWorksheetsPage() {
  if (!KIDS_ONLY) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Schede didattiche del corso sull'intelligenza artificiale",
    isPartOf: { "@type": "Course", name: SITE_NAME, url: `${SITE_URL}/kids` },
    itemListElement: getAllLevels().map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Scheda: ${levelTitleIt(l.slug)}`,
      url: `${SITE_URL}/kids/insegnanti/schede/${l.slug}`,
    })),
  };
  return (
    <div className="h-full overflow-y-auto" dir="ltr" lang="it">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="no-print bg-[#FEF3C7] border-4 border-[#8B4513] p-4 mb-4">
          <h1 className="text-3xl font-bold text-[#2C1810] m-0">Tutte le schede didattiche</h1>
          <p className="text-lg text-[#3E2723] m-0 mt-2">
            Le 24 schede, una per pagina. Si possono stampare tutte insieme o salvare come PDF (nella finestra di stampa scegliete &quot;Salva come PDF&quot;).
          </p>
          <nav className="flex flex-wrap gap-2 mt-3" aria-label="Mondi">
            {worlds.map((w) => (
              <a key={w.number} href={`#mondo-${w.number}`} className="text-sm px-2 py-1 bg-white border-2 border-[#D4A574] text-[#5D4037]">
                Mondo {w.number} – {worldTitleIt(w.number)}
              </a>
            ))}
          </nav>
          <div className="flex flex-wrap gap-2 mt-3">
            <PrintButton label="🖨️ Stampa tutte le schede" />
            <Link href="/kids/insegnanti" className="pixel-btn pixel-btn-amber px-4 py-2 text-lg">← Guida insegnanti</Link>
          </div>
        </div>
        {worlds.map((w) => (
          <section key={w.number} id={`mondo-${w.number}`} aria-label={`Mondo ${w.number}`}>
            {w.levels.map((l) => (
              <Worksheet key={l.slug} slug={l.slug} headingLevel={2} className="mb-6 print-break" />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
