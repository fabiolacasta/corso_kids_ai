import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { worlds } from "@/lib/kids/levels";
import { AccessibilityBadge } from "@/components/kids/layout/accessibility";
import { ClassroomToggle } from "@/components/kids/layout/classroom-bar";
import {
  KIDS_ONLY,
  SITE_URL,
  kidsMetadata,
  TEACHERS_TITLE,
  TEACHERS_DESCRIPTION,
  FAQ,
  faqJsonLd,
  courseJsonLd,
  jsonLdString,
  levelTitleIt,
  levelShortDescIt,
  worldTitleIt,
} from "@/lib/kids/seo";

/**
 * Teacher guide (Italian). Fully server-rendered so that search engines and
 * AI answer engines can read every level and the FAQ without JavaScript.
 * Only available on kids-only deployments.
 */
export const metadata: Metadata = KIDS_ONLY ? kidsMetadata(TEACHERS_TITLE, TEACHERS_DESCRIPTION, "/kids/insegnanti") : {};

const WORLD_TOPICS: Record<number, string> = {
  1: "Cos'è l'intelligenza artificiale, cos'è un prompt, perché servono istruzioni chiare.",
  2: "I dettagli di una richiesta: chi, cosa, quando, dove.",
  3: "Contesto, esempi e formato della risposta (liste, storie, tabelle).",
  4: "Usi creativi: gioco di ruolo, storie, personaggi, mondi inventati.",
  5: "Ripasso e sfida finale sulla scrittura di prompt efficaci.",
  6: "Rischi e uso responsabile: allucinazioni, privacy, deepfake e cyberbullismo, stereotipi, compiti onesti, benessere e truffe.",
};

const SHARE_TEXT =
  "Ho trovato un corso gratuito per spiegare l'intelligenza artificiale alle medie: 24 livelli in stile videogioco, si proietta sulla LIM e i ragazzi non devono registrarsi. C'è anche una parte su deepfake, privacy e truffe. " +
  `${SITE_URL}/kids/insegnanti`;

const panel = "bg-white/90 border-4 border-[#8B4513] p-4 md:p-6";
const h2 = "text-2xl md:text-3xl font-bold text-[#2C1810] mb-3";
const p = "text-lg text-[#3E2723] leading-relaxed m-0 mb-3";

export default function TeachersPage() {
  if (!KIDS_ONLY) notFound();

  return (
    <div className="h-full overflow-y-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString([courseJsonLd(), faqJsonLd()]) }} />
      <article className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-5 font-sans">
        <header className={panel}>
          <p className="text-sm font-bold uppercase tracking-wider text-[#B45309] m-0 mb-2">Guida per insegnanti · Scuola secondaria di primo grado</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#2C1810] m-0 mb-3">
            Corso sull&apos;intelligenza artificiale per la scuola media: guida per insegnanti
          </h1>
          <p className={p}>
            Un corso <strong>gratuito</strong> e <strong>open source</strong>, in stile videogioco, per insegnare ai ragazzi di 11-14 anni
            come usare l&apos;intelligenza artificiale in modo corretto e come riconoscerne i rischi. Ci sono <strong>6 mondi</strong> e{" "}
            <strong>24 livelli</strong>, con il robot Promi come guida. L&apos;insegnante lo proietta in classe; i ragazzi non devono registrarsi.
          </p>
          <div className="flex flex-wrap gap-3 mt-2 items-center">
            <AccessibilityBadge />
            <Link href="/kids/map" className="pixel-btn pixel-btn-green px-4 py-2 text-lg">Apri la mappa dei livelli</Link>
            <Link href="/kids/level/6-1-ai-can-be-wrong" className="pixel-btn pixel-btn-amber px-4 py-2 text-lg">Vai alla parte sui rischi</Link>
          </div>
        </header>

        <section className={panel} aria-labelledby="come-si-usa">
          <h2 id="come-si-usa" className={h2}>Come si usa in classe</h2>
          <ol className="text-lg text-[#3E2723] leading-relaxed pl-6 m-0 list-decimal">
            <li>Aprite il livello sulla LIM o sul proiettore: non serve installare nulla.</li>
            <li>Leggete ad alta voce i dialoghi di Promi, oppure fateli leggere a turno ai ragazzi.</li>
            <li>Nelle attività (quiz, frasi da riordinare, &quot;Tu cosa faresti?&quot;) fate discutere e votare la classe prima di rispondere.</li>
            <li>Quando la risposta è sbagliata il gioco spiega il perché: fermatevi lì e chiedete alla classe cosa ha capito.</li>
            <li>Provate il livello da soli prima della lezione, per scegliere dove fermarvi a discutere.</li>
          </ol>
          <p className={`${p} mt-3`}>
            I ragazzi non usano un chatbot vero: le risposte dell&apos;IA negli esercizi sono simulate. Se volete mostrare un&apos;IA reale,
            usatela voi dal vostro account, senza inserire dati dei ragazzi.
          </p>
        </section>

        <section className={panel} aria-labelledby="modalita-classe">
          <h2 id="modalita-classe" className={h2}>Modalità classe per la LIM</h2>
          <p className={p}>
            Attivatela sul computer collegato alla LIM: tutti i livelli e tutte le schermate sono aperti, e in basso a sinistra compaiono
            gli strumenti per la lezione.
          </p>
          <ul className="m-0 pl-5 list-disc text-lg text-[#3E2723] mb-3">
            <li><strong>💬 Discutiamone</strong>: l&apos;obiettivo del livello e le domande da fare alla classe, una alla volta.</li>
            <li><strong>⏱️ Timer</strong>: 1, 2, 3, 5 o 10 minuti per le attività a gruppi.</li>
            <li><strong>🏆 Squadre</strong>: da 2 a 4 squadre con il punteggio, per trasformare i quiz in una sfida.</li>
          </ul>
          <ClassroomToggle />
          <p className="text-base text-[#5D4037] m-0 mt-3">
            Si può attivare anche aprendo il sito con <code>?classe=1</code> alla fine dell&apos;indirizzo (per esempio nei preferiti della LIM),
            e disattivare con <code>?classe=0</code>. La modalità resta solo su quel computer.
          </p>
        </section>

        <section className={panel} aria-labelledby="materiali">
          <h2 id="materiali" className={h2}>Materiali da stampare</h2>
          <ul className="m-0 pl-5 list-disc text-lg text-[#3E2723]">
            <li><strong>Schede didattiche</strong>: una per ogni livello, con obiettivo, parole chiave, domande e un&apos;attività senza computer. Le trovate accanto a ogni livello qui sotto (🖨️ scheda).</li>
            <li><strong><Link href="/kids/glossario" className="underline text-[#1D4ED8]">Glossario dell&apos;IA</Link></strong>: 20 parole spiegate in modo semplice.</li>
            <li><strong><Link href="/kids/attestato" className="underline text-[#1D4ED8]">Attestato</Link></strong>: a fine corso ogni studente scrive il nome e lo stampa. Il nome non viene salvato.</li>
          </ul>
        </section>

        <section className={panel} aria-labelledby="mondi">
          <h2 id="mondi" className={h2}>I 6 mondi e i 24 livelli</h2>
          <div className="flex flex-col gap-4">
            {worlds.map((w) => (
              <div key={w.number} id={`mondo-${w.number}`}>
                <h3 className="text-xl md:text-2xl font-bold text-[#8B4513] m-0 mb-1">
                  Mondo {w.number} – {worldTitleIt(w.number)}
                </h3>
                <p className="text-base text-[#5D4037] m-0 mb-2">{WORLD_TOPICS[w.number]}</p>
                <ul className="m-0 pl-5 list-disc text-lg">
                  {w.levels.map((l) => (
                    <li key={l.slug} className="mb-1">
                      <Link href={`/kids/level/${l.slug}`} className="font-bold text-[#1D4ED8] underline">
                        {w.number}.{l.levelNumber} {levelTitleIt(l.slug)}
                      </Link>
                      {levelShortDescIt(l.slug) && <span className="text-[#5D4037]"> – {levelShortDescIt(l.slug)}</span>}
                      {" "}
                      <Link href={`/kids/insegnanti/schede/${l.slug}`} className="text-sm whitespace-nowrap underline text-[#B45309]">🖨️ scheda</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className={panel} aria-labelledby="sicurezza">
          <h2 id="sicurezza" className={h2}>Il mondo 6: sicurezza, privacy, deepfake, stereotipi e benessere</h2>
          <p className={p}>
            La &quot;Spiaggia della Sicurezza&quot; si può fare anche da sola, senza completare i mondi precedenti. Ecco alcune domande per
            continuare la discussione lontano dallo schermo:
          </p>
          <ul className="m-0 pl-5 list-disc text-lg text-[#3E2723]">
            <li>Vi è mai capitato che un&apos;app o un sito vi dicesse una cosa sbagliata? Come ve ne siete accorti?</li>
            <li>Quali informazioni su di voi non scrivereste mai in una chat? E sui vostri amici?</li>
            <li>Cosa fareste se in un gruppo girasse una foto modificata di un compagno?</li>
            <li>Quando è giusto usare l&apos;IA per i compiti, e quando no?</li>
            <li>Con chi parlereste se qualcosa online vi facesse stare male?</li>
          </ul>
          <p className={`${p} mt-3`}>
            I temi del livello 6.3 (foto modificate, cyberbullismo) e 6.5 (stare male, chiedere aiuto) sono delicati: conviene
            affrontarli insieme alla classe e non lasciarli al solo gioco.
          </p>
        </section>

        <section className={panel} aria-labelledby="accessibilita">
          <h2 id="accessibilita" className={h2}>Accessibilità e inclusione</h2>
          <p className={p}>
            Dal pulsante <strong>Accessibilità</strong> in alto (l&apos;icona con l&apos;omino) ogni studente, o l&apos;insegnante sulla LIM,
            può attivare queste opzioni. Si possono combinare e restano salvate solo sul dispositivo.
          </p>
          <ul className="m-0 pl-5 list-disc text-lg text-[#3E2723]">
            <li><strong>Lettura facilitata (dislessia)</strong>: carattere ad alta leggibilità (Lexend), lettere, parole e righe più distanziate, niente corsivo.</li>
            <li><strong>Modalità concentrazione (ADHD)</strong>: niente animazioni né nuvole in movimento, musica spenta, bordo ben visibile sull&apos;elemento attivo.</li>
            <li><strong>Colori sicuri (daltonismo)</strong>: il verde diventa blu e il rosso arancione; le risposte giuste e sbagliate hanno sempre anche un simbolo (✓ ✗) o una scritta.</li>
            <li><strong>Testo più grande</strong>: utile sulla LIM o per chi vede poco.</li>
          </ul>
          <p className={`${p} mt-3`}>
            Inoltre il sito rispetta l&apos;impostazione &quot;riduci movimento&quot; del computer e si usa anche da tastiera.
            Queste opzioni aiutano, ma non sostituiscono il piano didattico personalizzato (PDP) né gli strumenti compensativi della classe.
          </p>
        </section>

        <section className={panel} aria-labelledby="curricolo">
          <h2 id="curricolo" className={h2}>Collegamenti al curricolo</h2>
          <ul className="m-0 pl-5 list-disc text-lg text-[#3E2723]">
            <li>
              <strong>Educazione civica – cittadinanza digitale</strong>: la Legge 92/2019 ha introdotto l&apos;insegnamento dell&apos;educazione
              civica, con la cittadinanza digitale tra i suoi nuclei. Le nuove Linee guida sono state adottate con il D.M. 183 del 7 settembre 2024.
            </li>
            <li>
              <strong>DigComp 2.2</strong> (Commissione europea, 2022), il quadro europeo delle competenze digitali: aree
              &quot;Alfabetizzazione su informazioni e dati&quot;, &quot;Sicurezza&quot; e &quot;Creazione di contenuti digitali&quot;.
            </li>
            <li>
              <strong>Italiano e scrittura</strong>: i mondi 2-5 lavorano su chiarezza, dettagli, contesto e registro della richiesta.
            </li>
          </ul>
        </section>

        <section className={panel} aria-labelledby="privacy">
          <h2 id="privacy" className={h2}>Privacy e dati</h2>
          <p className={p}>
            Il corso non chiede nomi, email o account. Stelle e livelli completati vengono salvati solo nel browser del dispositivo
            (localStorage) e non vengono inviati a un server. Non ci sono pubblicità.
          </p>
        </section>

        <section className={panel} aria-labelledby="faq">
          <h2 id="faq" className={h2}>Domande frequenti</h2>
          <div className="flex flex-col gap-3">
            {FAQ.map((f) => (
              <div key={f.q}>
                <h3 className="text-xl font-bold text-[#2C1810] m-0 mb-1">{f.q}</h3>
                <p className={p}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={panel} aria-labelledby="condividi">
          <h2 id="condividi" className={h2}>Condividilo con i colleghi</h2>
          <p className={p}>Se il corso vi è utile, potete inoltrare questo messaggio nei gruppi di docenti:</p>
          <p className="text-lg bg-[#FEF3C7] border-2 border-[#D97706] p-3 m-0 select-all">{SHARE_TEXT}</p>
        </section>

        <footer className={panel}>
          <h2 className={h2}>Licenza e crediti</h2>
          <p className={p}>
            Il corso è basato sulla sezione per ragazzi di{" "}
            <a href="https://github.com/f/prompts.chat" className="underline text-[#1D4ED8]" rel="noopener">prompts.chat</a>, progetto
            open source con licenza MIT. Il mondo 6 &quot;Spiaggia della Sicurezza&quot; e l&apos;adattamento per le medie sono stati aggiunti
            in questa versione.
          </p>
        </footer>
      </article>
    </div>
  );
}
