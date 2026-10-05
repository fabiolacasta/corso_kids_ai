/**
 * Question bank for "Sfida di classe" (team quiz on the interactive whiteboard).
 * Italian only. `correct` is the index of the right option.
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
    question: "Come scrive le sue risposte un chatbot come Promi?",
    options: ["Le copia da un libro segreto", "Sceglie una parola dopo l'altra, quelle che sembrano più adatte", "Le chiede a una persona collegata", "Le inventa a caso"],
    correct: 1,
    explanation: "Un modello linguistico ha letto moltissimi testi e sceglie, una dopo l'altra, le parole più probabili. Per questo può anche sbagliare.",
  },
  {
    id: "q2", world: 1, level: "1-2-first-words",
    question: "Che cos'è un prompt?",
    options: ["Un virus del computer", "La richiesta o istruzione che scriviamo all'IA", "Il nome del robot", "Un tipo di videogioco"],
    correct: 1,
    explanation: "Il prompt è quello che scriviamo all'IA: una domanda, una richiesta, un'istruzione.",
  },
  {
    id: "q3", world: 1, level: "1-3-being-clear",
    question: "Quale richiesta è più chiara?",
    options: ["Scrivi qualcosa", "Parlami di animali", "Scrivi 3 curiosità sui delfini per un ragazzo di prima media", "Dimmi tutto"],
    correct: 2,
    explanation: "Dice cosa vogliamo (3 curiosità), su cosa (i delfini) e per chi (un ragazzo di prima media).",
  },
  {
    id: "q4", world: 2, level: "2-1-missing-details",
    question: "Perché i dettagli migliorano un prompt?",
    options: ["Perché l'IA si annoia meno", "Perché la risposta diventa più vicina a quello che vogliamo", "Perché il prompt diventa più lungo", "Non servono a niente"],
    correct: 1,
    explanation: "Con i dettagli l'IA deve indovinare di meno, quindi la risposta è più utile.",
  },
  {
    id: "q5", world: 2, level: "2-4-detail-detective",
    question: "Quali domande aiutano a completare un prompt per una storia?",
    options: ["Chi, cosa, quando, dove, che stile", "Quanto costa, chi paga", "Che ore sono", "Nessuna, basta scrivere \"storia\""],
    correct: 0,
    explanation: "Personaggi, azione, tempo, luogo e stile: sono gli ingredienti di un prompt completo.",
  },
  {
    id: "q6", world: 3, level: "3-1-setting-the-scene",
    question: "Che cosa vuol dire dare contesto all'IA?",
    options: ["Scrivere in maiuscolo", "Spiegare la situazione: a cosa serve la risposta e per chi è", "Dare la propria password", "Scrivere in inglese"],
    correct: 1,
    explanation: "Il contesto è la situazione. Attenzione: si spiega la situazione senza dare dati personali.",
  },
  {
    id: "q7", world: 3, level: "3-2-show-dont-tell",
    question: "A che cosa serve mettere un esempio nel prompt?",
    options: ["A mostrare all'IA che tipo di risposta vogliamo", "A confonderla", "A far finire prima la risposta", "A niente"],
    correct: 0,
    explanation: "Un esempio spesso spiega meglio di una descrizione: l'IA imita il modello che le mostriamo.",
  },
  {
    id: "q8", world: 3, level: "3-3-format-finder",
    question: "Devi ripassare le date della storia romana. Che formato chiedi all'IA?",
    options: ["Una poesia", "Una tabella con data ed evento", "Una barzelletta", "Un disegno"],
    correct: 1,
    explanation: "Per le date una tabella è il formato più chiaro da studiare.",
  },
  {
    id: "q9", world: 4, level: "4-1-pretend-time",
    question: "Chiedi all'IA di rispondere \"come se fosse Galileo\". Che cosa succede davvero?",
    options: ["Parla proprio Galileo", "È una finzione: le risposte possono contenere errori", "L'IA diventa uno scienziato", "Si collega a un museo"],
    correct: 1,
    explanation: "Il gioco di ruolo è una finzione. Le informazioni vanno controllate sul libro.",
  },
  {
    id: "q10", world: 4, level: "4-2-story-starters",
    question: "Qual è un modo onesto di usare l'IA per un tema?",
    options: ["Farle scrivere il tema e consegnarlo", "Chiederle idee e poi scrivere il tema con parole proprie", "Copiare e cambiare due parole", "Usarla senza dirlo a nessuno"],
    correct: 1,
    explanation: "L'IA può aiutare a trovare idee, ma il lavoro deve essere nostro. Se l'abbiamo usata, lo diciamo all'insegnante.",
  },
  {
    id: "q11", world: 5, level: "5-2-fix-it-up",
    question: "La risposta dell'IA non è quella che volevi. Che cosa fai?",
    options: ["Mi arrabbio e chiudo tutto", "Riscrivo il prompt aggiungendo dettagli, contesto o formato", "Accetto la risposta anche se è sbagliata", "Scrivo la stessa cosa in maiuscolo"],
    correct: 1,
    explanation: "Si migliora il prompt: spesso manca un dettaglio, il contesto o il formato.",
  },
  {
    id: "q12", world: 6, level: "6-1-ai-can-be-wrong",
    question: "Che cos'è un'allucinazione dell'IA?",
    options: ["Quando l'IA vede i fantasmi", "Quando l'IA inventa un'informazione falsa e la presenta come vera", "Quando il computer si spegne", "Quando l'IA risponde in ritardo"],
    correct: 1,
    explanation: "L'IA può inventare date, nomi o citazioni con grande sicurezza. Per questo si controlla sempre.",
  },
  {
    id: "q13", world: 6, level: "6-1-ai-can-be-wrong",
    question: "L'IA ti dà una data per la ricerca di storia. Cosa fai?",
    options: ["La copio subito", "La controllo sul libro o su un sito affidabile", "La chiedo di nuovo all'IA finché mi piace", "Non serve controllare"],
    correct: 1,
    explanation: "Le informazioni importanti si controllano su una fonte affidabile, come il libro di testo.",
  },
  {
    id: "q14", world: 6, level: "6-2-secret-keeper",
    question: "Quale di queste informazioni NON va mai scritta a un chatbot?",
    options: ["Il mio gioco preferito", "La mia password", "Il titolo di un libro", "Una domanda di matematica"],
    correct: 1,
    explanation: "La password non si dà a nessuno: né all'IA, né a un amico.",
  },
  {
    id: "q15", world: 6, level: "6-2-secret-keeper",
    question: "Posso caricare in un'app di IA la foto di classe con i miei compagni?",
    options: ["Sì, sempre", "No: sono dati personali degli altri e serve il loro permesso", "Sì, se la foto è bella", "Sì, se nessuno lo sa"],
    correct: 1,
    explanation: "Le foto degli altri sono dati personali: servono il loro permesso e quello dei genitori.",
  },
  {
    id: "q16", world: 6, level: "6-3-real-or-fake",
    question: "Che cos'è un deepfake?",
    options: ["Un video o una foto falsi creati con l'IA, che sembrano veri", "Un videogioco subacqueo", "Un tipo di password", "Un filtro per i selfie autorizzato"],
    correct: 0,
    explanation: "I deepfake sono contenuti falsi molto realistici: per questo è importante chiedersi da dove vengono.",
  },
  {
    id: "q17", world: 6, level: "6-3-real-or-fake",
    question: "In un gruppo gira una foto modificata di un compagno che lo prende in giro. Cosa fai?",
    options: ["La inoltro, tanto è uno scherzo", "Non la condivido e lo dico a un adulto di fiducia", "Metto un like", "La modifico ancora"],
    correct: 1,
    explanation: "Diffondere foto modificate per prendere in giro qualcuno è cyberbullismo. Non si condivide e si chiede aiuto a un adulto.",
  },
  {
    id: "q18", world: 6, level: "6-3-real-or-fake",
    question: "Prima di condividere una notizia sorprendente, quali domande ti fai?",
    options: ["Chi lo dice? Da dove viene? Altri lo confermano?", "Quanti like ha?", "È divertente?", "È scritta in maiuscolo?"],
    correct: 0,
    explanation: "Sono le tre domande del detective: fonte, provenienza, conferme.",
  },
  {
    id: "q19", world: 6, level: "6-4-fair-and-honest",
    question: "Chiedi all'IA di disegnare \"un ingegnere\" e disegna sempre un uomo. Perché?",
    options: ["Perché solo gli uomini fanno gli ingegneri", "Perché l'IA ripete gli stereotipi presenti nei testi e nelle immagini con cui è stata allenata", "Perché l'IA è arrabbiata", "Per caso"],
    correct: 1,
    explanation: "L'IA impara da quello che trova, compresi gli stereotipi. Possiamo accorgercene e chiedere risposte più varie.",
  },
  {
    id: "q20", world: 6, level: "6-4-fair-and-honest",
    question: "Quale uso dell'IA per i compiti è corretto?",
    options: ["Farmi fare tutti gli esercizi", "Farmi spiegare un passaggio che non ho capito e poi fare l'esercizio da solo", "Copiare la risposta senza leggerla", "Farle scrivere la verifica"],
    correct: 1,
    explanation: "Usare l'IA per capire va bene; farle fare il lavoro al posto nostro no.",
  },
  {
    id: "q21", world: 6, level: "6-5-ai-guardian",
    question: "Un messaggio dice: \"Hai vinto un telefono! Clicca e inserisci la password\". Che cos'è?",
    options: ["Un premio vero", "Probabilmente una truffa (phishing)", "Un messaggio della scuola", "Un regalo dell'IA"],
    correct: 1,
    explanation: "Premi improvvisi e richieste di password sono i segnali tipici del phishing.",
  },
  {
    id: "q22", world: 6, level: "6-5-ai-guardian",
    question: "Un chatbot è come un migliore amico?",
    options: ["Sì, mi conosce meglio di tutti", "No: è uno strumento, non prova sentimenti e non sostituisce le persone", "Sì, se ci parlo ogni giorno", "Dipende dal colore"],
    correct: 1,
    explanation: "Il chatbot è uno strumento. Per le cose importanti si parla con amici e adulti di fiducia.",
  },
  {
    id: "q23", world: 6, level: "6-5-ai-guardian",
    question: "Qualcosa che hai visto online ti fa stare male. Cosa fai?",
    options: ["Tengo tutto per me", "Ne parlo con un adulto di fiducia", "Lo chiedo solo al chatbot", "Lo condivido con tutti"],
    correct: 1,
    explanation: "Parlarne con un adulto di fiducia (genitore, insegnante) è la cosa più importante.",
  },
  {
    id: "q24", world: 6, level: "6-5-ai-guardian",
    question: "Molte app di IA hanno un'età minima per usarle. Perché?",
    options: ["Per far arrabbiare i ragazzi", "Per proteggere i più giovani e i loro dati", "Perché sono a pagamento", "Non c'è un motivo"],
    correct: 1,
    explanation: "I limiti di età servono a proteggere i minori. Sotto quell'età si usano con un adulto o non si usano.",
  },
];
