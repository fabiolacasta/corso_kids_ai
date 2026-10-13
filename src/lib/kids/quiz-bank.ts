/**
 * Question bank for "Sfida di classe" (team quiz on the interactive whiteboard).
 * Italian only. `correct` is the index of the right option.
 * Wrong options are meant to be believable: a middle-schooler should have to think.
 */

export interface QuizQuestion {
  id: string;
  world: number;
  level: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const QUIZ_BANK: QuizQuestion[] = [
  {
    id: "q1", world: 1, level: "1-1-meet-promi",
    question: "Come produce una risposta un chatbot come IAco?",
    options: ["Cerca la frase giusta in un archivio di risposte già scritte", "Sceglie una parola dopo l'altra, in base a quelle più probabili", "Copia il primo risultato che trova su Internet", "Segue una lista di regole scritte a mano dai programmatori"],
    correct: 1,
    explanation: "Un modello linguistico ha imparato da moltissimi testi e genera la risposta parola per parola. Non ha un archivio di risposte pronte: per questo a volte sbaglia con grande sicurezza.",
  },
  {
    id: "q2", world: 1, level: "1-1-meet-promi",
    question: "Quale di queste NON è una cosa che un chatbot sa fare da solo?",
    options: ["Riassumere un testo che gli incolli", "Riscrivere una frase in modo più formale", "Sapere se quello che dice è vero", "Proporre idee per un titolo"],
    correct: 2,
    explanation: "Il chatbot produce testo che suona bene, ma non ha un modo sicuro per controllare se è vero. La verifica tocca a noi.",
  },
  {
    id: "q3", world: 1, level: "1-3-being-clear",
    question: "Devi ripassare per la verifica sul Risorgimento. Quale richiesta è scritta meglio?",
    options: ["Parlami del Risorgimento in modo chiaro e completo", "Fammi 5 domande sul Risorgimento con le risposte, per una verifica di terza media", "Dimmi tutto quello che sai sul Risorgimento", "Risorgimento: date, personaggi, battaglie, cause, conseguenze, tutto"],
    correct: 1,
    explanation: "Dice cosa vuoi (5 domande con risposta), su cosa e per chi. «Chiaro e completo» sembra preciso ma non dice che cosa ti serve.",
  },
  {
    id: "q4", world: 2, level: "2-1-missing-details",
    question: "«Scrivi un messaggio per la chat di classe.» Che cosa manca di più importante?",
    options: ["Il numero di parole esatto", "Lo scopo del messaggio e il tono", "Il nome dell'app", "Niente, è già chiaro"],
    correct: 1,
    explanation: "Senza scopo (avvisare? organizzare? scusarsi?) e tono (serio, scherzoso) l'IA deve tirare a indovinare. La lunghezza aiuta, ma viene dopo.",
  },
  {
    id: "q5", world: 2, level: "2-4-detail-detective",
    question: "Quale dettaglio cambia di più il risultato di «Scrivi un racconto horror»?",
    options: ["Aggiungere «per favore»", "Dire per chi è: «da leggere ad alta voce in seconda media, senza scene violente»", "Scriverlo tutto in maiuscolo", "Aggiungere «fallo bene»"],
    correct: 1,
    explanation: "Pubblico e limiti guidano davvero la risposta. «Per favore» e «fallo bene» non danno informazioni utili.",
  },
  {
    id: "q6", world: 3, level: "3-1-setting-the-scene",
    question: "Quale frase dà contesto all'IA senza dare dati personali?",
    options: ["Sono Luca Bianchi, 3B della scuola Manzoni di Lecco", "Sono in terza media e devo presentare la ricerca in 3 minuti alla classe", "Abito in via Roma 12 e domani ho l'interrogazione", "Ti mando la foto della pagella così capisci il mio livello"],
    correct: 1,
    explanation: "Classe, scopo e tempo bastano a far capire la situazione. Nome, scuola, indirizzo e pagella sono dati personali.",
  },
  {
    id: "q7", world: 3, level: "3-2-show-dont-tell",
    question: "Vuoi che l'IA scriva le didascalie per i post del giornalino scolastico nel vostro stile. Cosa funziona meglio?",
    options: ["Scrivere «usa uno stile simpatico ma serio»", "Incollare due didascalie che avete già scritto come esempio", "Chiedere «fai come fanno gli influencer»", "Ripetere la richiesta finché ti piace"],
    correct: 1,
    explanation: "Un esempio concreto spiega lo stile meglio di qualsiasi aggettivo: l'IA imita il modello che vede.",
  },
  {
    id: "q8", world: 3, level: "3-3-format-finder",
    question: "Devi confrontare tre videogiochi per una recensione sul blog di classe. Che formato chiedi?",
    options: ["Un paragrafo unico e lungo", "Una tabella con gioco, genere, punti forti e punti deboli", "Un elenco puntato con un videogioco per riga", "Un riassunto di 3 righe"],
    correct: 1,
    explanation: "Per confrontare più cose sugli stessi aspetti, una tabella è il formato più leggibile.",
  },
  {
    id: "q9", world: 4, level: "4-1-pretend-time",
    question: "Chiedi all'IA di rispondere «come se fosse Galileo». Cosa è vero?",
    options: ["Le risposte sono citazioni originali di Galileo", "È una simulazione: il tono può essere credibile ma le informazioni vanno controllate", "L'IA usa solo i libri scritti da Galileo", "Le risposte sono più affidabili del libro di scienze"],
    correct: 1,
    explanation: "Il gioco di ruolo imita uno stile, non dà accesso alla persona vera. Può inventare frasi mai dette.",
  },
  {
    id: "q10", world: 4, level: "4-2-story-starters",
    question: "La prof ha assegnato un racconto. Quale uso dell'IA è corretto?",
    options: ["Farle scrivere il racconto e cambiare qualche parola", "Chiederle 5 possibili colpi di scena, sceglierne uno e scrivere il racconto da solo, dicendolo alla prof", "Farle scrivere solo il finale, tanto è corto", "Usarla senza dirlo, se il racconto viene bene"],
    correct: 1,
    explanation: "Usare l'IA per trovare idee va bene se il lavoro resta tuo e sei trasparente con l'insegnante.",
  },
  {
    id: "q11", world: 5, level: "5-2-fix-it-up",
    question: "L'IA ti ha dato una spiegazione troppo difficile. Qual è la mossa migliore?",
    options: ["Riscrivere la stessa domanda identica", "Dire: «Rispiegalo con un esempio di calcio, in 5 righe, per un ragazzo di prima media»", "Scrivere «non ho capito niente»", "Chiedere una spiegazione più lunga e completa"],
    correct: 1,
    explanation: "Migliorare il prompt (esempio, lunghezza, pubblico) è più efficace che ripetere o lamentarsi in modo generico. Più lunga non vuol dire più chiara.",
  },
  {
    id: "q12", world: 6, level: "6-1-ai-can-be-wrong",
    question: "Che cos'è un'«allucinazione» di un'IA?",
    options: ["Un errore di connessione", "Un'informazione inventata presentata come vera", "Una risposta volutamente scherzosa", "Una risposta che si ferma a metà"],
    correct: 1,
    explanation: "L'IA può inventare date, nomi, libri o citazioni con grande sicurezza. Per questo le cose importanti si controllano.",
  },
  {
    id: "q13", world: 6, level: "6-1-ai-can-be-wrong",
    question: "L'IA ti dà una data e un nome per la ricerca di storia. Come controlli?",
    options: ["Chiedo all'IA se è sicura", "Confronto con il libro di testo o un sito affidabile", "Chiedo la stessa cosa a un'altra IA", "Se è scritta bene, è giusta"],
    correct: 1,
    explanation: "L'IA può confermare un errore con sicurezza, e due IA possono sbagliare allo stesso modo. Serve una fonte affidabile.",
  },
  {
    id: "q14", world: 6, level: "6-2-secret-keeper",
    question: "Quale di queste informazioni è più rischioso scrivere a un chatbot?",
    options: ["Che sei in seconda media", "Che ti piace il basket", "Il nome della tua scuola e a che ora esci", "Che hai una verifica di inglese"],
    correct: 2,
    explanation: "Scuola e orari, messi insieme, permettono di sapere dove trovarti. Le altre informazioni non identificano una persona.",
  },
  {
    id: "q15", world: 6, level: "6-2-secret-keeper",
    question: "Posso caricare in un'app di IA la foto di classe per farla «in stile anime»?",
    options: ["Sì, se poi non la pubblico", "No: ci sono i volti dei compagni e serve il loro permesso", "Sì, se la foto è già nel gruppo della classe", "Sì, se l'app è famosa"],
    correct: 1,
    explanation: "Caricando la foto mandi a un'azienda i volti di altre persone. Servono il loro permesso e quello dei genitori.",
  },
  {
    id: "q16", world: 6, level: "6-3-real-or-fake",
    question: "Gira un video di un calciatore famoso che pubblicizza un sito di scommesse. Cosa pensi per prima cosa?",
    options: ["È vero, si vede la sua faccia", "Potrebbe essere un deepfake: controllo se lo ha pubblicato sui suoi canali ufficiali", "È vero se ha molte visualizzazioni", "È vero se la voce è identica"],
    correct: 1,
    explanation: "Volto e voce si possono falsificare con l'IA. Si controlla la fonte: il canale ufficiale o testate affidabili.",
  },
  {
    id: "q17", world: 6, level: "6-3-real-or-fake",
    question: "Nel gruppo gira una foto modificata con l'IA di un compagno, per prenderlo in giro. Qual è la scelta giusta?",
    options: ["Non la inoltro, ma non dico niente", "Non la inoltro e lo dico a un adulto di fiducia", "La inoltro solo al mio migliore amico", "Scrivo che è falsa ma la lascio girare"],
    correct: 1,
    explanation: "È cyberbullismo. Non basta non inoltrarla: serve fermarla, e un adulto può farlo.",
  },
  {
    id: "q18", world: 6, level: "6-3-real-or-fake",
    question: "Prima di condividere una notizia sorprendente, quale controllo è il più utile?",
    options: ["Guardo quanti like ha", "Cerco se fonti diverse e affidabili riportano la stessa notizia", "Controllo che non ci siano errori di grammatica", "Chiedo nel gruppo se ci credono"],
    correct: 1,
    explanation: "Like e grammatica perfetta non dicono nulla sulla verità (l'IA scrive senza errori). Contano le fonti.",
  },
  {
    id: "q19", world: 6, level: "6-4-fair-and-honest",
    question: "Chiedi all'IA l'immagine di «un ingegnere» e ottieni sempre uomini. Perché?",
    options: ["Perché l'IA ha deciso che le donne non fanno ingegneria", "Perché ripete gli squilibri presenti nelle immagini con cui è stata allenata", "Perché il prompt era scritto male", "Per un errore casuale"],
    correct: 1,
    explanation: "L'IA impara dai dati, compresi gli stereotipi. Accorgersene permette di chiedere risposte più varie.",
  },
  {
    id: "q20", world: 6, level: "6-4-fair-and-honest",
    question: "Quale uso dell'IA per i compiti di matematica ti fa imparare davvero?",
    options: ["Farle risolvere l'esercizio e copiare i passaggi", "Farti spiegare il primo passaggio e provare il resto da solo", "Farle controllare solo il risultato finale", "Leggere la soluzione completa prima di provare"],
    correct: 1,
    explanation: "Se fai tu il ragionamento, alla verifica lo saprai fare. Leggere o copiare i passaggi dà l'illusione di aver capito.",
  },
  {
    id: "q21", world: 6, level: "6-5-ai-guardian",
    question: "Un messaggio senza errori dice: «Il tuo account verrà chiuso tra 1 ora. Verifica qui la tua identità.» Che cos'è probabilmente?",
    options: ["Un avviso ufficiale, perché è scritto bene", "Phishing: fretta + link + richiesta di dati", "Un messaggio automatico normale", "Uno scherzo innocuo"],
    correct: 1,
    explanation: "Con l'IA le truffe sono scritte benissimo. Il segnale non sono gli errori, ma la fretta e la richiesta di dati.",
  },
  {
    id: "q22", world: 6, level: "6-5-ai-guardian",
    question: "Un chatbot ti risponde sempre in modo gentile e ti dà sempre ragione. Cosa significa?",
    options: ["Che ti capisce meglio degli amici", "Che è progettato per essere piacevole, non che ti conosce o ti vuole bene", "Che hai sempre ragione", "Che si è affezionato a te"],
    correct: 1,
    explanation: "Il chatbot non prova emozioni e tende a darti ragione. Per le cose importanti servono persone vere.",
  },
  {
    id: "q23", world: 6, level: "6-5-ai-guardian",
    question: "Qualcosa che hai visto online ti ha fatto stare male per giorni. Cosa fai?",
    options: ["Aspetto che passi da solo", "Ne parlo con un adulto di fiducia", "Ne parlo solo con un chatbot", "Cerco altri video simili per capire"],
    correct: 1,
    explanation: "Parlarne con un adulto di fiducia (genitore, insegnante) è la cosa più utile. Esiste anche Telefono Azzurro, 19696.",
  },
  {
    id: "q24", world: 6, level: "6-5-ai-guardian",
    question: "Perché molte app di IA hanno un'età minima?",
    options: ["Per vendere abbonamenti agli adulti", "Per proteggere i più giovani e i loro dati", "Perché i ragazzi non sanno scrivere prompt", "Per motivi di copyright"],
    correct: 1,
    explanation: "I limiti di età servono a proteggere i minori e i loro dati. Sotto quell'età si usano con un adulto o non si usano.",
  },
  {
    id: "q25", world: 7, level: "7-1-free-skins",
    question: "Su YouTube uno streamer famoso dice: «Skin gratis per tutti, entra nel sito e collega il tuo account». Cosa fai?",
    options: ["Ci provo, l'ha detto lui", "Non collego niente: potrebbe essere un video falso fatto con l'IA o un canale rubato", "Ci entro ma non metto la password", "Lo mando agli amici per vedere se funziona"],
    correct: 1,
    explanation: "Video di streamer veri vengono rubati o imitati con l'IA. Nessun regalo vero chiede di collegare l'account a un sito esterno.",
  },
  {
    id: "q26", world: 7, level: "7-2-cloned-voice",
    question: "Quale password è più sicura?",
    options: ["Calcio2012!", "Mario#99", "pizza-nuvola-trapano-azzurro", "Qwerty123456"],
    correct: 2,
    explanation: "Contano soprattutto lunghezza e imprevedibilità: quattro parole a caso sono lunghissime e difficili da indovinare. Le altre contengono nomi, date o sequenze facili.",
  },
  {
    id: "q27", world: 7, level: "7-2-cloned-voice",
    question: "Ti arriva un vocale con la voce di tua cugina: «Ti è arrivato un codice di 6 cifre? Mandamelo, è per un gioco.» Cosa fai?",
    options: ["Lo mando, è la sua voce", "Non lo mando e la chiamo io sul suo numero per controllare", "Lo mando solo se mi richiama", "Le chiedo di mandarmi prima un altro vocale"],
    correct: 1,
    explanation: "Con l'IA una voce si può copiare. Si verifica per un'altra strada (chiamata, domanda che sa solo lei) e il codice non si dà mai.",
  },
  {
    id: "q28", world: 7, level: "7-3-photo-detective",
    question: "Pubblichi una storia davanti a scuola con la tuta della tua squadra. Cosa può capire uno sconosciuto?",
    options: ["Niente, è solo una foto", "Dove vai a scuola, che sport fai e forse a che ora esci", "Solo che ti piace lo sport", "Solo il tuo nome"],
    correct: 1,
    explanation: "Scritte, divise, insegne e orari si combinano. Un'IA che analizza foto lo fa in pochi secondi.",
  },
  {
    id: "q29", world: 7, level: "7-4-the-feed",
    question: "Come decide il feed quali video mostrarti?",
    options: ["A caso", "In base a quanto a lungo guardi, cosa salti, cosa rivedi e commenti", "Solo in base agli account che segui", "Solo in base ai video più popolari del momento"],
    correct: 1,
    explanation: "L'algoritmo di raccomandazione impara dal tuo comportamento, anche da quanti secondi resti su un video, per tenerti nell'app.",
  },
  {
    id: "q30", world: 7, level: "7-5-fake-friends",
    question: "Un nuovo «amico» conosciuto in un gioco ti fa regali e poi scrive: «Passiamo su un'altra app e non dirlo ai tuoi». Cosa fai?",
    options: ["Accetto, mi ha fatto dei regali", "Non passo su un'altra app e ne parlo con un adulto di fiducia", "Accetto ma non gli do il mio nome", "Gli chiedo prima una foto per vedere chi è"],
    correct: 1,
    explanation: "Regali, richiesta di segreto e cambio di app sono segnali d'allarme insieme. Una foto non prova niente: si può creare con l'IA.",
  },
];
