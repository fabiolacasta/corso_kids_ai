"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { QUIZ_BANK, type QuizQuestion } from "@/lib/kids/quiz-bank";
import { PixelRobot } from "@/components/kids/elements/pixel-art";

/**
 * "Sfida di classe": a quiz show for the interactive whiteboard. The teacher
 * reads the question, the class (or teams) answer, then the teacher reveals
 * the answer and gives the point. Teams are shared with the classroom toolbar.
 */

type Team = { name: string; score: number };
const TEAMS_KEY = "kids-classroom-teams";
const TEAM_COLORS = ["#2563EB", "#EA580C", "#9333EA", "#0F766E"];
const LETTERS = ["A", "B", "C", "D"];
const CONFETTI = ["#FFD700", "#3B82F6", "#F97316", "#A855F7", "#22C55E", "#EC4899"];

function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function loadTeams(): Team[] {
  try {
    const saved = JSON.parse(localStorage.getItem(TEAMS_KEY) || "null");
    if (Array.isArray(saved) && saved.length >= 2) return saved.map((t: Team) => ({ name: String(t.name).slice(0, 20), score: 0 }));
  } catch {
    // ignore
  }
  return [{ name: "Squadra 1", score: 0 }, { name: "Squadra 2", score: 0 }];
}

function saveTeams(teams: Team[]) {
  try { localStorage.setItem(TEAMS_KEY, JSON.stringify(teams)); } catch { /* ignore */ }
}

export function ClassChallenge() {
  const [phase, setPhase] = useState<"setup" | "play" | "end">("setup");
  const [teams, setTeams] = useState<Team[]>([{ name: "Squadra 1", score: 0 }, { name: "Squadra 2", score: 0 }]);
  const [count, setCount] = useState(10);
  const [scope, setScope] = useState<"all" | "safety">("all");
  const [seed, setSeed] = useState(1);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [awarded, setAwarded] = useState<number | null>(null);

  useEffect(() => setTeams(loadTeams()), []);

  const questions: QuizQuestion[] = useMemo(() => {
    const pool = scope === "safety" ? QUIZ_BANK.filter((q) => q.world === 6) : QUIZ_BANK;
    // Shuffle the questions and also the order of the options, so the right
    // answer is not always in the same position
    return shuffle(pool, seed).slice(0, Math.min(count, pool.length)).map((q, k) => {
      const order = shuffle(q.options.map((_, i) => i), seed + k * 7919);
      return { ...q, options: order.map((i) => q.options[i]), correct: order.indexOf(q.correct) };
    });
  }, [scope, count, seed]);

  const start = () => {
    setSeed(Date.now() % 233280);
    const fresh = teams.map((t) => ({ ...t, score: 0 }));
    setTeams(fresh);
    saveTeams(fresh);
    setIndex(0);
    setRevealed(false);
    setAwarded(null);
    setPhase("play");
  };

  const award = (i: number) => {
    if (awarded !== null) return;
    const next = teams.map((t, j) => (j === i ? { ...t, score: t.score + 1 } : t));
    setTeams(next);
    saveTeams(next);
    setAwarded(i);
  };

  const nextQuestion = () => {
    if (index + 1 >= questions.length) { setPhase("end"); return; }
    setIndex(index + 1);
    setRevealed(false);
    setAwarded(null);
  };

  const panel = "bg-[#FEF3C7] border-4 border-[#8B4513] p-4 md:p-6";

  if (phase === "setup") {
    const pool = scope === "safety" ? QUIZ_BANK.filter((q) => q.world === 6).length : QUIZ_BANK.length;
    return (
      <div className="h-full overflow-y-auto" dir="ltr" lang="it">
        <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">
          <header className={cn(panel, "text-center")}>
            <div className="flex justify-center mb-2"><PixelRobot className="w-14 h-16" /></div>
            <h1 className="text-4xl font-bold text-[#2C1810] m-0 kids-title-glow">Sfida di classe</h1>
            <p className="text-lg text-[#5D4037] m-0 mt-2">
              Un quiz a squadre da proiettare sulla LIM. L&apos;insegnante legge la domanda, le squadre rispondono, poi si svela la risposta.
            </p>
          </header>

          <section className={panel} aria-labelledby="sf-teams">
            <h2 id="sf-teams" className="text-2xl font-bold text-[#8B4513] m-0 mb-3">Squadre</h2>
            <div className="flex flex-col gap-2">
              {teams.map((t, i) => (
                <div key={i} className="flex items-center gap-2 bg-white border-2 p-2" style={{ borderColor: TEAM_COLORS[i] }}>
                  <span className="w-3 h-8 shrink-0" style={{ background: TEAM_COLORS[i] }} aria-hidden="true" />
                  <input
                    value={t.name}
                    onChange={(e) => { const n = teams.map((x, j) => (j === i ? { ...x, name: e.target.value.slice(0, 20) } : x)); setTeams(n); saveTeams(n); }}
                    className="flex-1 min-w-0 bg-transparent text-xl font-bold text-[#2C1810] border-b border-dashed border-[#D4A574] focus:outline-none"
                    aria-label={`Nome della squadra ${i + 1}`}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              {teams.length < 4 && <button className="pixel-btn px-3 py-1.5 text-base" onClick={() => { const n = [...teams, { name: `Squadra ${teams.length + 1}`, score: 0 }]; setTeams(n); saveTeams(n); }}>+ Squadra</button>}
              {teams.length > 2 && <button className="pixel-btn px-3 py-1.5 text-base" onClick={() => { const n = teams.slice(0, -1); setTeams(n); saveTeams(n); }}>− Squadra</button>}
            </div>
          </section>

          <section className={panel} aria-labelledby="sf-opts">
            <h2 id="sf-opts" className="text-2xl font-bold text-[#8B4513] m-0 mb-3">Domande</h2>
            <div className="flex flex-wrap gap-2 mb-3" role="group" aria-label="Argomento">
              {([["all", "Tutto il corso"], ["safety", "Solo sicurezza (mondo 6)"]] as const).map(([v, l]) => (
                <button key={v} onClick={() => setScope(v)} aria-pressed={scope === v} className={cn("pixel-btn px-3 py-1.5 text-base", scope === v ? "pixel-btn-purple" : "")}>{l}</button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Numero di domande">
              {[5, 10, 15].map((n) => (
                <button key={n} onClick={() => setCount(n)} aria-pressed={count === n} disabled={n > pool} className={cn("pixel-btn px-3 py-1.5 text-base", count === n ? "pixel-btn-purple" : "", n > pool && "opacity-40")}>{n} domande</button>
              ))}
            </div>
          </section>

          <div className="text-center">
            <button onClick={start} className="pixel-btn pixel-btn-green px-8 py-3 text-2xl">▶ Inizia la sfida</button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "end") {
    const best = Math.max(...teams.map((t) => t.score));
    const winners = teams.filter((t) => t.score === best);
    const ranking = [...teams].map((t, i) => ({ ...t, i })).sort((a, b) => b.score - a.score);
    return (
      <div className="h-full overflow-y-auto" dir="ltr" lang="it">
        <div aria-hidden="true">
          {Array.from({ length: 30 }).map((_, i) => (
            <span key={i} className="kids-confetti" style={{ left: `${(i * 37) % 100}%`, background: CONFETTI[i % CONFETTI.length], animationDuration: `${2.2 + (i % 5) * 0.35}s`, animationDelay: `${(i % 9) * 0.12}s` }} />
          ))}
        </div>
        <div className="max-w-2xl mx-auto px-4 py-6">
          <section className={cn(panel, "text-center")}>
            <h1 className="text-4xl font-bold text-[#2C1810] m-0 kids-pop">🏆 {winners.length > 1 ? "Pareggio!" : `Vince ${winners[0].name}!`}</h1>
            <ol className="m-0 mt-4 p-0 list-none flex flex-col gap-2">
              {ranking.map((t, pos) => (
                <li key={t.i} className="flex items-center gap-3 bg-white border-4 p-3 text-2xl font-bold" style={{ borderColor: TEAM_COLORS[t.i] }}>
                  <span className="w-10 text-center">{pos === 0 ? "🥇" : pos === 1 ? "🥈" : pos === 2 ? "🥉" : pos + 1}</span>
                  <span className="flex-1 text-left">{t.name}</span>
                  <span className="tabular-nums">{t.score}</span>
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap gap-2 justify-center mt-5">
              <button onClick={start} className="pixel-btn pixel-btn-green px-5 py-2 text-lg">🔁 Nuova sfida</button>
              <button onClick={() => setPhase("setup")} className="pixel-btn px-5 py-2 text-lg">Impostazioni</button>
              <Link href="/kids/map" className="pixel-btn pixel-btn-amber px-5 py-2 text-lg">Mappa</Link>
            </div>
          </section>
        </div>
      </div>
    );
  }

  const q = questions[index];
  return (
    <div className="h-full overflow-y-auto" dir="ltr" lang="it">
      <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 bg-[#2C1810] text-[#FFD700] border-2 border-[#FFD700] font-pixel text-lg" aria-live="polite">
            Domanda {index + 1} / {questions.length}
          </span>
          <div className="flex flex-wrap gap-2" aria-label="Punteggio">
            {teams.map((t, i) => (
              <span key={i} className="px-3 py-1 bg-white border-4 text-lg font-bold" style={{ borderColor: TEAM_COLORS[i] }}>
                {t.name}: <span className="tabular-nums">{t.score}</span>
              </span>
            ))}
          </div>
        </div>

        <section className={panel} aria-labelledby="sf-q">
          <p className="text-sm font-bold uppercase tracking-wider text-[#B45309] m-0">Mondo {q.world}</p>
          <h1 id="sf-q" className="text-3xl md:text-4xl font-bold text-[#2C1810] m-0 mt-1 leading-tight">{q.question}</h1>
          <ul className="m-0 mt-4 p-0 list-none grid gap-2 md:grid-cols-2">
            {q.options.map((o, i) => {
              const right = revealed && i === q.correct;
              const wrong = revealed && i !== q.correct;
              return (
                <li
                  key={i}
                  className={cn(
                    "flex items-start gap-3 p-3 border-4 bg-white text-xl md:text-2xl text-[#2C1810]",
                    right ? "border-[#16A34A] bg-[#F0FDF4]" : wrong ? "border-[#E5E7EB] opacity-60" : "border-[#D97706]"
                  )}
                >
                  <span className={cn("w-9 h-9 shrink-0 flex items-center justify-center font-bold text-white", right ? "bg-[#16A34A]" : "bg-[#D97706]")}>
                    {right ? "✓" : LETTERS[i]}
                  </span>
                  <span>{o}</span>
                </li>
              );
            })}
          </ul>

          {revealed && (
            <div className="mt-4 p-3 bg-white border-4 border-[#16A34A] kids-pop" role="status">
              <p className="m-0 text-xl font-bold text-[#166534]">✓ Risposta giusta: {LETTERS[q.correct]}</p>
              <p className="m-0 mt-1 text-lg text-[#2C1810]">{q.explanation}</p>
              <p className="m-0 mt-2 text-base">
                <Link href={`/kids/level/${q.level}`} className="underline text-[#1D4ED8]" target="_blank">Ripassa il livello</Link>
              </p>
            </div>
          )}
        </section>

        <div className="flex flex-wrap gap-2 justify-center">
          {!revealed ? (
            <button onClick={() => setRevealed(true)} className="pixel-btn pixel-btn-purple px-6 py-3 text-xl">👀 Mostra la risposta</button>
          ) : (
            <>
              {teams.map((t, i) => (
                <button
                  key={i}
                  onClick={() => award(i)}
                  disabled={awarded !== null}
                  className={cn("pixel-btn px-4 py-2 text-lg", awarded === i ? "pixel-btn-green" : "", awarded !== null && awarded !== i && "opacity-40")}
                  aria-label={`Punto a ${t.name}`}
                >
                  +1 {t.name}
                </button>
              ))}
              <button onClick={nextQuestion} className="pixel-btn pixel-btn-amber px-6 py-2 text-lg">
                {index + 1 >= questions.length ? "🏁 Classifica" : "Prossima →"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
