import { getLevelBySlug } from "@/lib/kids/levels";
import { SITE_URL, levelTitleIt, levelShortDescIt, worldTitleIt } from "@/lib/kids/seo";
import { TEACHER_CONTENT } from "@/lib/kids/teacher-content";

/** One printable A4 worksheet for a level (used by the single and the "all" page). */
export function Worksheet({ slug, className = "", headingLevel = 1 }: { slug: string; className?: string; headingLevel?: 1 | 2 }) {
  const HeadingTag = headingLevel === 1 ? "h1" : "h2";
  const level = getLevelBySlug(slug);
  const c = TEACHER_CONTENT[slug];
  if (!level || !c) return null;
  return (
        <article className={`print-area bg-white border-4 border-[#8B4513] p-6 text-[#1F2937] ${className}`} style={{ fontFamily: "var(--font-kids), system-ui, sans-serif" }}>
          <header className="border-b-4 border-[#FFD700] pb-3 mb-4">
            <p className="text-sm font-bold uppercase tracking-wider text-[#B45309] m-0">
              Scheda didattica · Mondo {level.world} – {worldTitleIt(level.world)} · circa {c.minutes} minuti
            </p>
            <HeadingTag className="text-3xl font-bold m-0 mt-1 text-[#2C1810]">
              Livello {level.world}.{level.levelNumber}: {levelTitleIt(slug)}
            </HeadingTag>
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
  );
}
