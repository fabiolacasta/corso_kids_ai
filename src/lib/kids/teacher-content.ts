/**
 * Teacher material for each level (Italian): learning goal, key words,
 * discussion questions ("Discutiamone" in classroom mode, printable worksheets)
 * and an unplugged activity to do without a computer.
 */

export interface LevelTeacherContent {
  goal: string;
  keywords: string[];
  questions: string[];
  activity: { title: string; steps: string[] };
  minutes: number;
}

export const TEACHER_CONTENT: Record<string, LevelTeacherContent> = {
  "1-1-meet-promi": {
    goal: "Capire che cos'è un'intelligenza artificiale che genera testo e che cosa sa fare (e non fare).",
    keywords: ["intelligenza artificiale", "chatbot", "prompt"],
    questions: [
      "Dove avete già incontrato l'intelligenza artificiale (telefono, videogiochi, traduttori, social)?",
      "Secondo voi un chatbot \"capisce\" davvero quello che scrivete? Perché?",
      "Che differenza c'è tra un'IA e un motore di ricerca?",
    ],
    activity: {
      title: "IA o non IA?",
      steps: [
        "Scrivete alla lavagna 8 oggetti o servizi (calcolatrice, correttore automatico, navigatore, assistente vocale, sveglia, filtro dei social, lavatrice, traduttore).",
        "A coppie, i ragazzi decidono quali usano l'IA e perché.",
        "Confrontate le risposte: dove non siete d'accordo, discutete che cosa rende \"intelligente\" una macchina.",
      ],
    },
    minutes: 45,
  },
  "1-2-first-words": {
    goal: "Scrivere il primo prompt e capire che la richiesta determina la risposta.",
    keywords: ["prompt", "istruzione", "risposta"],
    questions: [
      "Che cos'è un prompt, con parole vostre?",
      "Perché la stessa domanda scritta in due modi può dare risposte diverse?",
      "Vi è mai capitato di non essere capiti in un messaggio? Cosa avete cambiato?",
    ],
    activity: {
      title: "Il robot che esegue alla lettera",
      steps: [
        "Un volontario fa il \"robot\": esegue solo le istruzioni esattamente come vengono dette.",
        "La classe gli dà istruzioni per disegnare una casa alla lavagna, senza gesti.",
        "Riflettete: quali istruzioni erano troppo vaghe? Come le avreste scritte meglio?",
      ],
    },
    minutes: 45,
  },
  "1-3-being-clear": {
    goal: "Riconoscere la differenza tra una richiesta vaga e una chiara.",
    keywords: ["chiarezza", "richiesta vaga", "obiettivo"],
    questions: [
      "\"Scrivi qualcosa sui cani\": che cosa manca in questa richiesta?",
      "Come fate a capire se una vostra richiesta è chiara?",
      "Chiarezza vuol dire scrivere tanto? Perché no?",
    ],
    activity: {
      title: "Da vago a chiaro",
      steps: [
        "Distribuite 5 richieste vaghe (\"fammi una ricerca\", \"dimmi un film\", ...).",
        "In gruppo i ragazzi le riscrivono dicendo cosa, per chi e a che scopo.",
        "Ogni gruppo legge la versione migliore e la classe vota la più chiara.",
      ],
    },
    minutes: 40,
  },
  "2-1-missing-details": {
    goal: "Capire che i dettagli rendono la risposta più utile e vicina a ciò che si vuole.",
    keywords: ["dettagli", "precisione", "risultato"],
    questions: [
      "Quali dettagli aggiungereste a \"Racconta una storia\"?",
      "Troppi dettagli possono essere un problema? Quando?",
      "Che dettagli servono a un compagno per disegnare il vostro animale preferito?",
    ],
    activity: {
      title: "Il disegno a occhi chiusi",
      steps: [
        "Un ragazzo descrive un'immagine semplice che solo lui vede.",
        "Gli altri la disegnano senza fare domande.",
        "Confrontate i disegni: quali dettagli mancavano? Rifate con una descrizione migliore.",
      ],
    },
    minutes: 40,
  },
  "2-2-who-and-what": {
    goal: "Aggiungere al prompt personaggi (chi) e azioni od oggetti (cosa).",
    keywords: ["chi", "cosa", "personaggi"],
    questions: [
      "Perché è utile dire all'IA chi sono i protagonisti?",
      "Che differenza fa scrivere \"un cane\" o \"un vecchio cane pigro\"?",
      "Quali \"chi\" e \"cosa\" servirebbero per un problema di matematica?",
    ],
    activity: {
      title: "Carte chi-cosa",
      steps: [
        "Preparate due mazzi di bigliettini: personaggi e azioni.",
        "Ogni gruppo pesca una carta per mazzo e scrive un prompt completo.",
        "Scambiate i prompt: l'altro gruppo racconta la storia che si immagina.",
      ],
    },
    minutes: 40,
  },
  "2-3-when-and-where": {
    goal: "Aggiungere tempo e luogo per dare contesto alla richiesta.",
    keywords: ["quando", "dove", "ambientazione"],
    questions: [
      "Come cambia una storia se è ambientata nel 1800 o nel 2100?",
      "In una richiesta di studio, che cosa corrisponde al \"quando\" e al \"dove\"?",
      "Quale informazione avete dimenticato più spesso?",
    ],
    activity: {
      title: "Stessa storia, altro mondo",
      steps: [
        "Scegliete una trama semplice (qualcuno perde una cosa importante).",
        "Ogni gruppo riceve un tempo e un luogo diversi.",
        "I gruppi raccontano in 3 frasi come cambia la storia.",
      ],
    },
    minutes: 35,
  },
  "2-4-detail-detective": {
    goal: "Combinare chi, cosa, quando, dove e stile in un unico prompt.",
    keywords: ["prompt completo", "stile", "revisione"],
    questions: [
      "Quali sono le 5 domande che un buon prompt risponde?",
      "Come controllate se un prompt è completo prima di inviarlo?",
      "Qual è il dettaglio che fa la differenza più grande?",
    ],
    activity: {
      title: "La checklist del detective",
      steps: [
        "Costruite insieme una checklist: chi, cosa, quando, dove, stile.",
        "A coppie, ognuno scrive un prompt e l'altro lo controlla con la checklist.",
        "Riscrivete il prompt aggiungendo ciò che manca.",
      ],
    },
    minutes: 40,
  },
  "3-1-setting-the-scene": {
    goal: "Dare contesto: chi sono, a cosa mi serve, per chi è la risposta.",
    keywords: ["contesto", "scopo", "destinatario"],
    questions: [
      "Perché \"spiegami la fotosintesi\" dà risposte diverse se dite che avete 12 anni?",
      "Quali informazioni su di voi è utile dare, e quali no? (collegamento con la privacy)",
      "Come spieghereste una cosa a un bambino di 6 anni o a un professore?",
    ],
    activity: {
      title: "Spiegalo a…",
      steps: [
        "Scegliete un argomento (il ciclo dell'acqua).",
        "Ogni gruppo lo spiega a un destinatario diverso: bambino, nonno, alieno, compagno.",
        "Discutete: che cosa cambia quando cambia il destinatario?",
      ],
    },
    minutes: 40,
  },
  "3-2-show-dont-tell": {
    goal: "Usare esempi per mostrare all'IA che cosa si vuole.",
    keywords: ["esempi", "modello", "imitazione"],
    questions: [
      "Perché un esempio a volte spiega meglio di una descrizione?",
      "Un esempio sbagliato che effetto ha sulla risposta?",
      "Quando in classe vi è servito un esempio per capire un esercizio?",
    ],
    activity: {
      title: "Indovina la regola",
      steps: [
        "Scrivete alla lavagna 3 esempi che seguono una regola nascosta (es. parole con doppie).",
        "La classe indovina la regola e propone un quarto esempio.",
        "Riflettete: così funzionano gli esempi nei prompt.",
      ],
    },
    minutes: 30,
  },
  "3-3-format-finder": {
    goal: "Chiedere il formato giusto: lista, tabella, poesia, riassunto.",
    keywords: ["formato", "tabella", "elenco"],
    questions: [
      "Per studiare le date di storia è meglio un testo o una tabella? Perché?",
      "Quali formati conoscete per presentare un'informazione?",
      "Chi decide il formato: voi o l'IA?",
    ],
    activity: {
      title: "Una notizia, cinque formati",
      steps: [
        "Prendete un breve articolo di giornale.",
        "Ogni gruppo lo trasforma in un formato: elenco puntato, tabella, fumetto, tweet, titolo.",
        "Confrontate: quale formato è più adatto a quale uso?",
      ],
    },
    minutes: 45,
  },
  "3-4-context-champion": {
    goal: "Mettere insieme contesto, esempi e formato.",
    keywords: ["contesto", "esempi", "formato"],
    questions: [
      "Quale dei tre (contesto, esempio, formato) usate di più? E quale dimenticate?",
      "Scrivete un prompt per un ripasso di scienze: che contesto date?",
      "Come vi accorgete che la risposta non è quella che volevate?",
    ],
    activity: {
      title: "Il prompt da campioni",
      steps: [
        "Ogni gruppo sceglie un compito reale (preparare un'interrogazione, organizzare una festa di classe).",
        "Scrive un prompt con contesto, un esempio e il formato richiesto.",
        "Un altro gruppo lo valuta con 3 stelle: una per ogni elemento presente.",
      ],
    },
    minutes: 45,
  },
  "4-1-pretend-time": {
    goal: "Capire il gioco di ruolo: chiedere all'IA di rispondere \"come se fosse\" qualcuno.",
    keywords: ["gioco di ruolo", "personaggio", "finzione"],
    questions: [
      "Se l'IA \"fa finta\" di essere uno scienziato, diventa uno scienziato? Cosa cambia?",
      "A che cosa può servire far parlare l'IA come un personaggio storico?",
      "Quali rischi ci sono se si dimentica che è una finzione?",
    ],
    activity: {
      title: "Intervista impossibile",
      steps: [
        "Scegliete un personaggio storico che state studiando.",
        "Un ragazzo lo interpreta, la classe prepara 5 domande.",
        "Alla fine controllate sul libro quali risposte erano corrette e quali inventate.",
      ],
    },
    minutes: 45,
  },
  "4-2-story-starters": {
    goal: "Usare l'IA per iniziare una storia, restando autori delle proprie idee.",
    keywords: ["scrittura creativa", "incipit", "autore"],
    questions: [
      "Se l'IA scrive l'inizio, di chi è la storia?",
      "Come si può usare l'IA per avere idee senza farle fare tutto il lavoro?",
      "Cosa rende un inizio di storia interessante?",
    ],
    activity: {
      title: "Incipit a catena",
      steps: [
        "Scrivete alla lavagna la prima frase di una storia.",
        "Ogni ragazzo aggiunge una frase, a turno.",
        "Alla fine discutete: quali scelte hanno reso la storia vostra?",
      ],
    },
    minutes: 35,
  },
  "4-3-character-creator": {
    goal: "Descrivere un personaggio con carattere, aspetto e modo di parlare.",
    keywords: ["personaggio", "carattere", "descrizione"],
    questions: [
      "Quali caratteristiche rendono un personaggio memorabile?",
      "Se chiedete \"un eroe\" all'IA, che aspetto avrà? Perché proprio quello? (collegamento con gli stereotipi)",
      "Come evitate personaggi tutti uguali?",
    ],
    activity: {
      title: "Carta d'identità del personaggio",
      steps: [
        "Ogni ragazzo compila una scheda: nome, età, cosa ama, di cosa ha paura, come parla.",
        "Scambiate le schede e fate recitare una battuta al personaggio del compagno.",
        "Notate: quali personaggi uscivano dagli stereotipi?",
      ],
    },
    minutes: 40,
  },
  "4-4-world-builder": {
    goal: "Inventare un mondo con regole, luoghi e abitanti.",
    keywords: ["mondo immaginario", "regole", "coerenza"],
    questions: [
      "Perché un mondo inventato ha bisogno di regole?",
      "Se l'IA inventa un dettaglio che contraddice le vostre regole, cosa fate?",
      "Che differenza c'è tra inventare per gioco e inventare fatti falsi?",
    ],
    activity: {
      title: "Il mondo di classe",
      steps: [
        "In gruppi, inventate un pianeta: clima, abitanti, 3 regole.",
        "Ogni gruppo presenta il pianeta; gli altri cercano contraddizioni.",
        "Riflettete su come controllare la coerenza, anche nelle risposte dell'IA.",
      ],
    },
    minutes: 45,
  },
  "5-1-perfect-prompt": {
    goal: "Ripassare tutti gli elementi di un buon prompt.",
    keywords: ["chiarezza", "dettagli", "contesto", "formato"],
    questions: [
      "Qual è la regola più importante che avete imparato finora?",
      "Esiste davvero il prompt \"perfetto\"?",
      "Come spieghereste a un genitore come si scrive un buon prompt?",
    ],
    activity: {
      title: "Il manifesto del buon prompt",
      steps: [
        "In gruppo scrivete le 5 regole del buon prompt con parole vostre.",
        "Unite le regole dei gruppi in un unico cartellone.",
        "Appendetelo in classe: servirà nei prossimi lavori.",
      ],
    },
    minutes: 40,
  },
  "5-2-fix-it-up": {
    goal: "Trovare i punti deboli di un prompt e migliorarlo.",
    keywords: ["revisione", "errori", "miglioramento"],
    questions: [
      "Quali sono i difetti più comuni di un prompt?",
      "Quando una risposta non va bene, conviene riscrivere tutto o aggiungere qualcosa?",
      "Che cosa vi ha insegnato correggere i prompt degli altri?",
    ],
    activity: {
      title: "Il pronto soccorso dei prompt",
      steps: [
        "Distribuite 4 prompt \"malati\" (vaghi, senza contesto, senza formato, contraddittori).",
        "Ogni gruppo fa la diagnosi e scrive la cura.",
        "Presentate le cure: la classe vota la più efficace.",
      ],
    },
    minutes: 40,
  },
  "5-3-prompt-remix": {
    goal: "Riscrivere lo stesso prompt per ottenere risultati diversi.",
    keywords: ["variazioni", "tono", "pubblico"],
    questions: [
      "Come cambiereste un prompt per avere una risposta più breve? E più divertente?",
      "Perché è utile provare più versioni?",
      "Quando conviene fermarsi e usare la propria testa invece di chiedere ancora?",
    ],
    activity: {
      title: "Remix del tono",
      steps: [
        "Partite da una frase neutra (\"Domani c'è la verifica di matematica\").",
        "Ogni gruppo la riscrive con un tono: entusiasta, preoccupato, da telegiornale, da poesia.",
        "Discutete quali parole cambiano il tono.",
      ],
    },
    minutes: 30,
  },
  "5-4-graduation-day": {
    goal: "Sfida finale: dimostrare di saper scrivere prompt efficaci.",
    keywords: ["sfida", "valutazione", "autonomia"],
    questions: [
      "Che cosa sapete fare adesso che all'inizio non sapevate?",
      "Qual è stato il livello più difficile? Perché?",
      "Come userete l'IA a scuola in modo corretto?",
    ],
    activity: {
      title: "Gara di prompt a squadre",
      steps: [
        "Date lo stesso compito a tutte le squadre (es. preparare un quiz su un argomento studiato).",
        "Ogni squadra scrive il suo prompt in 10 minuti.",
        "Valutate con la checklist del livello 2.4 e del livello 3.4.",
      ],
    },
    minutes: 50,
  },
  "6-1-ai-can-be-wrong": {
    goal: "Sapere che l'IA può inventare informazioni (allucinazioni) e imparare a verificarle.",
    keywords: ["allucinazione", "verifica", "fonte"],
    questions: [
      "Perché l'IA a volte scrive cose false con tanta sicurezza?",
      "Dove controllereste una data o un nome che vi ha dato l'IA?",
      "Vi è mai capitato di credere a un'informazione sbagliata trovata online?",
    ],
    activity: {
      title: "Caccia all'errore con il libro",
      steps: [
        "Preparate un breve testo su un argomento studiato con 2 errori nascosti.",
        "I gruppi li cercano usando il libro di testo.",
        "Discutete: come si fa a controllare quando non c'è il libro?",
      ],
    },
    minutes: 40,
  },
  "6-2-secret-keeper": {
    goal: "Riconoscere i dati personali e cosa non si scrive mai a un chatbot.",
    keywords: ["privacy", "dati personali", "password"],
    questions: [
      "Quali informazioni su di voi non scrivereste mai in una chat? E sui vostri amici?",
      "Perché anche una foto di classe è un dato personale?",
      "Che cosa fate se qualcuno online vi chiede dove abitate?",
    ],
    activity: {
      title: "Il semaforo della privacy",
      steps: [
        "Scrivete 12 informazioni su bigliettini (nome del gatto, indirizzo, password, gioco preferito, voto di matematica…).",
        "La classe le mette nelle tre colonne: ✅ Sì, ⚠️ Attenzione, ⛔ Mai.",
        "Discutete i casi in cui non siete d'accordo.",
      ],
    },
    minutes: 40,
  },
  "6-3-real-or-fake": {
    goal: "Riconoscere deepfake e bufale e capire perché non si falsificano le immagini degli altri.",
    keywords: ["deepfake", "bufala", "cyberbullismo"],
    questions: [
      "Come capite se una foto o un video sono veri?",
      "Cosa fareste se in un gruppo girasse una foto modificata di un compagno?",
      "Perché modificare la foto di qualcuno senza permesso può fare molto male?",
    ],
    activity: {
      title: "Le tre domande del detective",
      steps: [
        "Mostrate 4 titoli di notizie (2 veri, 2 inventati).",
        "Per ciascuno la classe risponde: chi lo dice? da dove viene? altri lo confermano?",
        "Concludete con le regole di classe su foto e video dei compagni.",
      ],
    },
    minutes: 45,
  },
  "6-4-fair-and-honest": {
    goal: "Riconoscere gli stereotipi nelle risposte dell'IA e usarla per studiare senza copiare.",
    keywords: ["stereotipi", "onestà", "studio"],
    questions: [
      "Se chiedete all'IA di disegnare \"uno scienziato\", chi disegna? Perché?",
      "Qual è la differenza tra farsi aiutare dall'IA e farle fare il compito?",
      "Come dire all'insegnante che avete usato l'IA?",
    ],
    activity: {
      title: "Aiuto o scorciatoia?",
      steps: [
        "Leggete 6 situazioni (farsi spiegare un esercizio, copiare un tema, farsi fare domande per ripassare…).",
        "La classe si sposta a destra (aiuto) o a sinistra (scorciatoia).",
        "Per i casi dubbi, scrivete insieme una regola di classe.",
      ],
    },
    minutes: 40,
  },
  "6-5-ai-guardian": {
    goal: "Capire che l'IA è uno strumento e non un amico; riconoscere truffe e sapere a chi chiedere aiuto.",
    keywords: ["benessere", "truffe", "adulto di fiducia"],
    questions: [
      "Che differenza c'è tra parlare con un chatbot e parlare con un amico?",
      "Quali segnali fanno capire che un messaggio è una truffa?",
      "Chi sono i vostri adulti di fiducia se qualcosa online vi fa stare male?",
    ],
    activity: {
      title: "La mappa degli aiuti",
      steps: [
        "Ogni ragazzo disegna una mappa con sé al centro e intorno le persone a cui può chiedere aiuto.",
        "Chi vuole condivide (senza obbligo).",
        "Ricordate insieme i servizi di aiuto per i ragazzi (verificate prima i numeri aggiornati).",
      ],
    },
    minutes: 40,
  },
};

export interface GlossaryTerm {
  term: string;
  slug: string;
  definition: string;
  example?: string;
  level?: string;
}

export const GLOSSARY: GlossaryTerm[] = [
  { term: "Intelligenza artificiale (IA)", slug: "intelligenza-artificiale", definition: "Programmi che svolgono compiti che di solito richiedono l'intelligenza umana, come capire una frase, riconoscere un'immagine o scrivere un testo.", example: "Il traduttore del telefono e l'assistente vocale usano l'IA.", level: "1-1-meet-promi" },
  { term: "Chatbot", slug: "chatbot", definition: "Un programma con cui si \"chiacchiera\" scrivendo o parlando. Quelli basati sull'IA generano le risposte parola per parola.", example: "ChatGPT, Gemini e Claude sono chatbot.", level: "1-1-meet-promi" },
  { term: "Prompt", slug: "prompt", definition: "La richiesta o istruzione che si scrive a un'IA. Più è chiara e completa, più la risposta è utile.", example: "\"Spiegami la fotosintesi in 5 righe per un ragazzo di prima media.\"", level: "1-2-first-words" },
  { term: "Modello linguistico", slug: "modello-linguistico", definition: "Il \"cervello\" di un chatbot: un programma allenato su moltissimi testi che sceglie, una dopo l'altra, le parole più probabili.", level: "6-1-ai-can-be-wrong" },
  { term: "Contesto", slug: "contesto", definition: "Le informazioni che aiutano l'IA a capire la situazione: chi sei, a cosa ti serve la risposta, per chi è.", example: "\"Sono in seconda media e devo preparare un'esposizione di 3 minuti.\"", level: "3-1-setting-the-scene" },
  { term: "Formato", slug: "formato", definition: "La forma della risposta: elenco, tabella, riassunto, poesia, dialogo…", example: "\"Rispondi con una tabella a due colonne.\"", level: "3-3-format-finder" },
  { term: "Esempio (nel prompt)", slug: "esempio", definition: "Un modello che mostra all'IA che tipo di risposta si vuole. Spesso spiega meglio di una descrizione.", level: "3-2-show-dont-tell" },
  { term: "Gioco di ruolo", slug: "gioco-di-ruolo", definition: "Chiedere all'IA di rispondere come se fosse un personaggio. È una finzione: il personaggio non diventa reale.", level: "4-1-pretend-time" },
  { term: "Allucinazione", slug: "allucinazione", definition: "Quando l'IA inventa un'informazione falsa (una data, un nome, una citazione) e la presenta come vera.", example: "Un chatbot cita un libro che non esiste.", level: "6-1-ai-can-be-wrong" },
  { term: "Fonte", slug: "fonte", definition: "Da dove viene un'informazione. Per controllare una risposta dell'IA si confronta con fonti affidabili: libro di testo, enciclopedie, siti ufficiali.", level: "6-1-ai-can-be-wrong" },
  { term: "Dati personali", slug: "dati-personali", definition: "Informazioni che permettono di riconoscere una persona: nome e cognome, indirizzo, telefono, foto, scuola. Non si scrivono a un chatbot.", level: "6-2-secret-keeper" },
  { term: "Privacy", slug: "privacy", definition: "Il diritto di decidere chi può conoscere le informazioni su di noi. Vale anche per le foto e i segreti degli altri.", level: "6-2-secret-keeper" },
  { term: "Password", slug: "password", definition: "La chiave segreta di un account. Non si dà a nessuno, nemmeno all'IA o a un amico.", level: "6-2-secret-keeper" },
  { term: "Deepfake", slug: "deepfake", definition: "Foto, video o audio falsi creati o modificati con l'IA, così realistici da sembrare veri.", example: "Un video in cui una persona sembra dire cose che non ha mai detto.", level: "6-3-real-or-fake" },
  { term: "Bufala (fake news)", slug: "bufala", definition: "Una notizia falsa diffusa come se fosse vera. Prima di condividere: chi lo dice, da dove viene, altri lo confermano?", level: "6-3-real-or-fake" },
  { term: "Cyberbullismo", slug: "cyberbullismo", definition: "Offendere, prendere in giro o escludere qualcuno online, per esempio diffondendo foto modificate. È grave e va detto a un adulto.", level: "6-3-real-or-fake" },
  { term: "Stereotipo", slug: "stereotipo", definition: "Un'idea semplificata e spesso sbagliata su un gruppo di persone. L'IA può ripeterli perché li ha trovati nei testi con cui è stata allenata.", example: "Disegnare sempre gli scienziati come uomini anziani.", level: "6-4-fair-and-honest" },
  { term: "Plagio", slug: "plagio", definition: "Presentare come proprio un lavoro fatto da altri, anche da un'IA. Usarla per capire va bene; farle fare il compito no.", level: "6-4-fair-and-honest" },
  { term: "Phishing", slug: "phishing", definition: "Una truffa che cerca di farti dare password o dati con messaggi falsi che sembrano arrivare da siti o persone fidate.", example: "\"Hai vinto un premio! Clicca qui e inserisci la password.\"", level: "6-5-ai-guardian" },
  { term: "Adulto di fiducia", slug: "adulto-di-fiducia", definition: "Una persona grande a cui puoi raccontare quello che ti succede online: un genitore, un insegnante, un allenatore.", level: "6-5-ai-guardian" },
];
