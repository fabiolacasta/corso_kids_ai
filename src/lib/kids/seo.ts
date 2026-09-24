/**
 * SEO / GEO settings for kids-only deployments (KIDS_ONLY=1),
 * e.g. the Italian middle-school course at corso-ai-medie.netlify.app.
 * Everything here is used only when KIDS_ONLY=1, so the main prompts.chat
 * site is not affected.
 */
import type { Metadata } from "next";
import { worlds, getAllLevels } from "@/lib/kids/levels";
import it from "../../../messages/it.json";

export const KIDS_ONLY = process.env.KIDS_ONLY === "1";
export const SITE_URL = (process.env.NEXTAUTH_URL || "https://corso-ai-medie.netlify.app").replace(/\/$/, "");
export const SITE_NAME = "Corso IA per le medie";
export const OG_IMAGE = "/og-corso.png";

type KidsMessages = {
  worlds: Record<string, { title: string }>;
  levels: Record<string, { title: string; description: string }>;
};
const K = (it as unknown as { kids: KidsMessages }).kids;

export const HOME_TITLE = "Corso gratuito sull'intelligenza artificiale per le medie";
export const HOME_DESCRIPTION =
  "Gioco a livelli per insegnare l'uso consapevole dell'IA ai ragazzi di 11-14 anni: 6 mondi, 24 lezioni da proiettare in classe. Gratis, senza registrazione.";
export const MAP_TITLE = "Mappa del corso IA per ragazzi: 6 mondi e 24 livelli";
export const MAP_DESCRIPTION =
  "Scegli il livello: dal primo prompt alla sicurezza online. Percorso di educazione digitale sull'intelligenza artificiale per la scuola media.";
export const TEACHERS_TITLE = "Guida per insegnanti: l'intelligenza artificiale alle medie";
export const TEACHERS_DESCRIPTION =
  "Come usare in classe il corso gratuito sull'IA per la scuola media: obiettivi dei 24 livelli, rischi (deepfake, privacy, allucinazioni), privacy e domande frequenti.";

/** Italian SEO title + description for each level */
export const LEVEL_SEO: Record<string, { title: string; description: string }> = {
  "1-1-meet-promi": { title: "Cos'è l'intelligenza artificiale? Lezione 1 per ragazzi", description: "Prima lezione del corso: con il robot Promi i ragazzi scoprono cos'è l'IA e come funziona un chatbot. Attività interattiva da fare in classe." },
  "1-2-first-words": { title: "Il primo prompt: come si parla a un'IA | Livello 1-2", description: "Cos'è un prompt e come scriverne uno: esercizio guidato per ragazzi delle medie. Si impara a dare istruzioni all'intelligenza artificiale." },
  "1-3-being-clear": { title: "Istruzioni chiare all'IA: perché contano | Livello 1-3", description: "Perché una richiesta vaga dà risposte vaghe: attività sulla chiarezza delle istruzioni ai chatbot, pensata per la scuola secondaria di primo grado." },
  "2-1-missing-details": { title: "I dettagli nei prompt: attività per ragazzi | Livello 2-1", description: "Cosa succede se al prompt mancano i dettagli? Esercizio interattivo per capire come l'IA interpreta le richieste incomplete." },
  "2-2-who-and-what": { title: "Chi e cosa: personaggi e oggetti nel prompt | Livello 2-2", description: "I ragazzi imparano ad aggiungere personaggi e oggetti per ottenere dall'IA risposte più precise. Gioco didattico sull'intelligenza artificiale." },
  "2-3-when-and-where": { title: "Quando e dove: tempo e luogo nel prompt | Livello 2-3", description: "Aggiungere tempo e luogo a una richiesta cambia la risposta dell'IA. Attività pratica per la classe sulla scrittura di prompt efficaci." },
  "2-4-detail-detective": { title: "Detective dei dettagli: sfida sui prompt | Livello 2-4", description: "Sfida finale del Castello della Chiarezza: i ragazzi combinano chi, cosa, quando e dove per scrivere prompt completi e precisi." },
  "3-1-setting-the-scene": { title: "Il contesto nei prompt: perché aiuta l'IA | Livello 3-1", description: "Dare contesto all'intelligenza artificiale migliora le risposte: lezione interattiva per ragazzi delle medie, con esempi e quiz." },
  "3-2-show-dont-tell": { title: "Mostra, non dire: usare esempi con l'IA | Livello 3-2", description: "Come usare esempi per spiegare all'IA cosa vuoi: attività sul prompting con esempi, adatta a studenti di 11-14 anni." },
  "3-3-format-finder": { title: "Liste, poesie, tabelle: il formato giusto | Livello 3-3", description: "I ragazzi imparano a chiedere all'IA risposte in formati diversi: elenchi, storie, poesie. Esercizio pratico da svolgere in classe." },
  "3-4-context-champion": { title: "Campione del contesto: sfida sui prompt | Livello 3-4", description: "Ripasso del mondo 3: contesto, esempi e formato insieme in un'unica sfida. Verifica interattiva delle competenze sul prompting." },
  "4-1-pretend-time": { title: "Gioco di ruolo con l'IA: lezione per ragazzi | Livello 4-1", description: "Cosa sono i prompt di gioco di ruolo e come usarli in modo creativo e responsabile. Attività sull'intelligenza artificiale per la scuola media." },
  "4-2-story-starters": { title: "Scrivere storie con l'IA: attività per la classe | 4-2", description: "Usare l'intelligenza artificiale come spunto per la scrittura creativa, restando autori della propria storia. Lezione interattiva per le medie." },
  "4-3-character-creator": { title: "Creare personaggi con l'IA | Livello 4-3", description: "Dare una personalità all'IA per inventare personaggi: attività creativa che aiuta i ragazzi a capire come il prompt guida le risposte." },
  "4-4-world-builder": { title: "Inventare mondi con l'IA: scrittura creativa | Livello 4-4", description: "Sfida del Canyon Creativo: i ragazzi costruiscono mondi immaginari insieme all'IA, allenando fantasia e precisione nelle istruzioni." },
  "5-1-perfect-prompt": { title: "Il prompt perfetto: chiarezza, dettagli, contesto | 5-1", description: "Come si scrive un buon prompt? Lezione di sintesi che unisce chiarezza, dettagli e contesto. Per ragazzi di 11-14 anni e per la classe." },
  "5-2-fix-it-up": { title: "Correggere un prompt debole: esercizio | Livello 5-2", description: "Trova cosa non funziona in un prompt e miglioralo: esercizio di revisione che sviluppa pensiero critico nell'uso dell'intelligenza artificiale." },
  "5-3-prompt-remix": { title: "Riscrivere un prompt per risultati diversi | Livello 5-3", description: "Stessa richiesta, parole diverse, risultati diversi: attività per capire come la formulazione cambia la risposta dell'IA." },
  "5-4-graduation-day": { title: "Sfida finale sui prompt: diventa Maestro | Livello 5-4", description: "Verifica conclusiva sulla scrittura di prompt: i ragazzi mettono in pratica tutto ciò che hanno imparato nei primi cinque mondi." },
  "6-1-ai-can-be-wrong": { title: "Le allucinazioni dell'IA: anche l'IA sbaglia | Livello 6-1", description: "Perché i chatbot inventano risposte con sicurezza e come verificare le informazioni su altre fonti. Lezione di educazione digitale per le medie." },
  "6-2-secret-keeper": { title: "Privacy e chatbot: cosa non scrivere mai | Livello 6-2", description: "Dati personali, password, foto: cosa non condividere con un'intelligenza artificiale. Lezione sulla privacy online per ragazzi di 11-14 anni." },
  "6-3-real-or-fake": { title: "Deepfake e bufale: vero o falso? | Livello 6-3", description: "Riconoscere immagini e notizie false create con l'IA e capire perché falsificare le foto degli altri è cyberbullismo. Attività per la classe." },
  "6-4-fair-and-honest": { title: "Stereotipi dell'IA e compiti: usarla onestamente | 6-4", description: "L'IA può avere pregiudizi e non deve fare i compiti al posto tuo: lezione su stereotipi, pensiero critico e uso onesto per studiare." },
  "6-5-ai-guardian": { title: "IA e benessere: truffe, regole, adulti di fiducia | 6-5", description: "L'IA è uno strumento, non un amico: truffe online, regole d'uso e quando chiedere aiuto a un adulto. Lezione conclusiva sulla sicurezza." },
};

/** Italian level title as shown in the game */
export function levelTitleIt(slug: string): string {
  const key = slug.replace(/-/g, "_");
  return K.levels[key]?.title || slug;
}
export function levelShortDescIt(slug: string): string {
  const key = slug.replace(/-/g, "_");
  return K.levels[key]?.description || "";
}
export function worldTitleIt(n: number): string {
  return K.worlds[String(n)]?.title || `Mondo ${n}`;
}

function og(title: string, description: string, path: string): Metadata["openGraph"] {
  return {
    type: "website",
    locale: "it_IT",
    siteName: SITE_NAME,
    title,
    description,
    url: `${SITE_URL}${path}`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Corso gratuito sull'intelligenza artificiale per la scuola media" }],
  };
}

/** Build page metadata for a kids page (only used when KIDS_ONLY) */
export function kidsMetadata(title: string, description: string, path: string): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: og(title, description, path),
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
    robots: { index: true, follow: true },
  };
}

export const FAQ: { q: string; a: string }[] = [
  { q: "Come posso insegnare l'intelligenza artificiale alle medie?", a: "Con attività guidate da proiettare in classe. Questo corso gratuito ha 24 livelli in 6 mondi: si parte da cos'è l'IA e come si scrive un prompt, e si arriva ai rischi (allucinazioni, privacy, deepfake, stereotipi, truffe)." },
  { q: "Il corso è gratuito?", a: "Sì, è completamente gratuito, senza pubblicità, ed è open source con licenza MIT." },
  { q: "I ragazzi devono creare un account?", a: "No. Non serve nessuna registrazione né un indirizzo email per giocare." },
  { q: "Dove vengono salvati i progressi?", a: "Solo nel browser del dispositivo che si sta usando. Se si cancellano i dati del browser o si cambia computer, i progressi ripartono da zero." },
  { q: "I ragazzi usano un chatbot vero?", a: "No. Le risposte dell'IA dentro gli esercizi sono simulate, quindi i ragazzi non inviano nulla a un servizio di intelligenza artificiale." },
  { q: "Il corso è accessibile a studenti con dislessia, ADHD o daltonismo?", a: "Sì. Dal pulsante Accessibilità si attivano la lettura facilitata per la dislessia (carattere ad alta leggibilità e testo più spaziato), la modalità concentrazione per l'ADHD (niente animazioni e musica), i colori sicuri per il daltonismo (blu e arancione al posto di verde e rosso, sempre con simboli ✓ ✗) e il testo più grande." },
  { q: "Posso fare solo la parte sui rischi dell'IA?", a: "Sì. Il mondo 6, \"Spiaggia della Sicurezza\" (5 livelli), si può giocare subito, senza aver completato i mondi precedenti." },
  { q: "Come si usa in classe?", a: "L'insegnante proietta il livello sulla LIM, legge i dialoghi con Promi e fa scegliere o votare la classe nelle attività. Conviene provare il livello prima della lezione." },
  { q: "A che età è adatto?", a: "È pensato per ragazzi di 11-14 anni, cioè la scuola secondaria di primo grado, con l'insegnante che guida l'attività." },
];

export function courseJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${SITE_URL}/kids#corso`,
    name: SITE_NAME + " – La Scuola di Prompt di Promi",
    description: HOME_DESCRIPTION,
    url: `${SITE_URL}/kids`,
    inLanguage: "it",
    isAccessibleForFree: true,
    license: "https://opensource.org/licenses/MIT",
    isBasedOn: "https://github.com/f/prompts.chat",
    educationalLevel: "Scuola secondaria di primo grado",
    typicalAgeRange: "11-14",
    learningResourceType: "Interactive resource",
    audience: [
      { "@type": "EducationalAudience", educationalRole: "teacher" },
      { "@type": "EducationalAudience", educationalRole: "student" },
      { "@type": "EducationalAudience", educationalRole: "parent" },
    ],
    teaches: [
      "Cos'è l'intelligenza artificiale",
      "Scrivere prompt chiari",
      "Allucinazioni e verifica delle fonti",
      "Privacy e dati personali",
      "Deepfake e cyberbullismo",
      "Stereotipi nell'intelligenza artificiale",
      "Uso onesto dell'IA per studiare",
      "Benessere digitale e truffe online",
    ],
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR", category: "Free" },
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", inLanguage: "it" },
    hasPart: worlds.map((w) => ({
      "@type": "LearningResource",
      name: `Mondo ${w.number} – ${worldTitleIt(w.number)}`,
      hasPart: w.levels.map((l) => ({
        "@type": "LearningResource",
        name: levelTitleIt(l.slug),
        url: `${SITE_URL}/kids/level/${l.slug}`,
      })),
    })),
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function levelJsonLd(slug: string) {
  const level = getAllLevels().find((l) => l.slug === slug);
  if (!level) return null;
  const seo = LEVEL_SEO[slug];
  const url = `${SITE_URL}/kids/level/${slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      name: levelTitleIt(slug),
      description: seo?.description,
      url,
      inLanguage: "it",
      isAccessibleForFree: true,
      educationalLevel: "Scuola secondaria di primo grado",
      typicalAgeRange: "11-14",
      learningResourceType: "Interactive resource",
      isPartOf: { "@id": `${SITE_URL}/kids#corso` },
      position: `${level.world}.${level.levelNumber}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/kids` },
        { "@type": "ListItem", position: 2, name: `Mondo ${level.world} – ${worldTitleIt(level.world)}`, item: `${SITE_URL}/kids/insegnanti#mondo-${level.world}` },
        { "@type": "ListItem", position: 3, name: levelTitleIt(slug), item: url },
      ],
    },
  ];
}

/** Safely serialise JSON-LD for a <script> tag */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
