"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLevelSlug } from "@/components/kids/providers/level-context";
import { useClassroomMode, setClassroomMode } from "@/lib/kids/classroom";
import { TEACHER_CONTENT } from "@/lib/kids/teacher-content";

/**
 * Teacher toolbar shown in "Modalità classe" (LIM): discussion questions for
 * the current level, a countdown timer and a team scoreboard.
 * Activate with the button on /kids/insegnanti or by opening any page with ?classe=1
 * (?classe=0 turns it off).
 */

type Panel = "discuss" | "timer" | "teams" | null;
const TEAMS_KEY = "kids-classroom-teams";
const TEAM_COLORS = ["#2563EB", "#EA580C", "#9333EA", "#0F766E"];

export function ClassroomBar() {
  const on = useClassroomMode();
  const slug = useLevelSlug();
  const [panel, setPanel] = useState<Panel>(null);

  // ?classe=1 / ?classe=0 in the address turns the mode on/off
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("classe");
    if (v === "1") setClassroomMode(true);
    if (v === "0") setClassroomMode(false);
  }, []);

  if (!on) return null;
  const content = slug ? TEACHER_CONTENT[slug] : undefined;

  const btn = "pixel-btn px-3 py-2 text-base flex items-center gap-1 shadow-lg";
  return (
    <>
      <div className="no-print fixed left-3 bottom-24 z-[60] flex flex-col gap-2 items-start" role="toolbar" aria-label="Strumenti per la classe">
        <span className="hidden md:inline px-2 py-1 text-xs font-bold bg-[#2C1810] text-[#FFD700] border-2 border-[#FFD700] font-pixel">
          MODALITÀ CLASSE
        </span>
        {content && (
          <button className={cn(btn, "pixel-btn-purple")} onClick={() => setPanel(panel === "discuss" ? null : "discuss")} aria-expanded={panel === "discuss"} aria-label="Discutiamone">
            💬 <span className="hidden md:inline">Discutiamone</span>
          </button>
        )}
        <button className={cn(btn, "pixel-btn-amber")} onClick={() => setPanel(panel === "timer" ? null : "timer")} aria-expanded={panel === "timer"} aria-label="Timer">
          ⏱️ <span className="hidden md:inline">Timer</span>
        </button>
        <button className={cn(btn, "pixel-btn-green")} onClick={() => setPanel(panel === "teams" ? null : "teams")} aria-expanded={panel === "teams"} aria-label="Squadre">
          🏆 <span className="hidden md:inline">Squadre</span>
        </button>
        <button className={cn(btn)} onClick={() => { setClassroomMode(false); setPanel(null); }} title="Esci dalla modalità classe" aria-label="Esci dalla modalità classe">
          <X className="w-4 h-4" aria-hidden="true" /> <span className="hidden md:inline">Esci</span>
        </button>
      </div>

      {panel && (
        <div
          className="no-print fixed left-3 right-3 sm:right-auto sm:left-44 bottom-24 z-[61] sm:w-[28rem] max-h-[70vh] overflow-y-auto bg-[#FEF3C7] border-4 border-[#8B4513] p-4 shadow-2xl"
          role="dialog"
          aria-label={panel === "discuss" ? "Discutiamone" : panel === "timer" ? "Timer" : "Squadre"}
        >
          <button onClick={() => setPanel(null)} className="absolute top-2 right-2 p-1 text-[#8B4513]" aria-label="Chiudi">
            <X className="w-5 h-5" />
          </button>
          {panel === "discuss" && content && slug && <Discuss slug={slug} />}
          {panel === "timer" && <Timer />}
          {panel === "teams" && <Teams />}
        </div>
      )}
    </>
  );
}

function Discuss({ slug }: { slug: string }) {
  const c = TEACHER_CONTENT[slug];
  const [shown, setShown] = useState(1);
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#8B4513] m-0 mb-1 pr-6">💬 Discutiamone</h2>
      <p className="text-sm text-[#5D4037] m-0 mb-3"><b>Obiettivo:</b> {c.goal}</p>
      <ol className="m-0 pl-5 list-decimal text-lg text-[#2C1810] flex flex-col gap-2">
        {c.questions.slice(0, shown).map((q) => <li key={q}>{q}</li>)}
      </ol>
      <div className="flex flex-wrap gap-2 mt-3">
        {shown < c.questions.length && (
          <button className="pixel-btn pixel-btn-purple px-3 py-1.5 text-sm" onClick={() => setShown(shown + 1)}>
            Prossima domanda
          </button>
        )}
        <Link href={`/kids/insegnanti/schede/${slug}`} className="pixel-btn pixel-btn-amber px-3 py-1.5 text-sm" target="_blank">
          🖨️ Scheda da stampare
        </Link>
      </div>
    </div>
  );
}

function Timer() {
  const [left, setLeft] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    ref.current = setInterval(() => setLeft((l) => (l === null ? null : Math.max(0, l - 1))), 1000);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running]);

  const done = left === 0;
  if (done && running) setRunning(false);

  const start = (min: number) => { setLeft(min * 60); setRunning(true); };
  const mm = left === null ? "--" : String(Math.floor(left / 60)).padStart(2, "0");
  const ss = left === null ? "--" : String(left % 60).padStart(2, "0");

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#8B4513] m-0 mb-3">⏱️ Timer</h2>
      <p
        className={cn("text-6xl font-bold text-center m-0 my-2 font-pixel tabular-nums", done ? "text-[#C2410C]" : "text-[#2C1810]")}
        role="timer"
        aria-live="polite"
      >
        {done ? "Tempo!" : `${mm}:${ss}`}
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        {[1, 2, 3, 5, 10].map((m) => (
          <button key={m} className="pixel-btn pixel-btn-amber px-3 py-1.5 text-base" onClick={() => start(m)}>{m} min</button>
        ))}
        {left !== null && !done && (
          <button className="pixel-btn px-3 py-1.5 text-base" onClick={() => setRunning(!running)}>{running ? "Pausa" : "Riprendi"}</button>
        )}
      </div>
    </div>
  );
}

function Teams() {
  const [teams, setTeams] = useState<{ name: string; score: number }[]>([
    { name: "Squadra 1", score: 0 },
    { name: "Squadra 2", score: 0 },
  ]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(TEAMS_KEY) || "null");
      if (Array.isArray(saved) && saved.length) setTeams(saved);
    } catch {
      // ignore
    }
  }, []);

  const save = (next: { name: string; score: number }[]) => {
    setTeams(next);
    try { localStorage.setItem(TEAMS_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  };
  const add = (i: number, d: number) => save(teams.map((t, j) => (j === i ? { ...t, score: Math.max(0, t.score + d) } : t)));
  const best = Math.max(...teams.map((t) => t.score));

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#8B4513] m-0 mb-3">🏆 Squadre</h2>
      <div className="flex flex-col gap-2">
        {teams.map((t, i) => (
          <div key={i} className="flex items-center gap-2 bg-white border-2 p-2" style={{ borderColor: TEAM_COLORS[i] }}>
            <span className="w-3 h-8 shrink-0" style={{ background: TEAM_COLORS[i] }} aria-hidden="true" />
            <input
              value={t.name}
              onChange={(e) => save(teams.map((x, j) => (j === i ? { ...x, name: e.target.value.slice(0, 20) } : x)))}
              className="flex-1 min-w-0 bg-transparent text-lg font-bold text-[#2C1810] border-b border-dashed border-[#D4A574] focus:outline-none"
              aria-label={`Nome della squadra ${i + 1}`}
            />
            <span className="text-3xl font-bold font-pixel w-12 text-center tabular-nums" aria-live="polite">
              {t.score}{t.score === best && best > 0 ? "👑" : ""}
            </span>
            <button className="pixel-btn px-2 py-1 text-base" onClick={() => add(i, -1)} aria-label={`Togli un punto a ${t.name}`}>−</button>
            <button className="pixel-btn pixel-btn-green px-2 py-1 text-base" onClick={() => add(i, 1)} aria-label={`Aggiungi un punto a ${t.name}`}>+1</button>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {teams.length < 4 && (
          <button className="pixel-btn px-3 py-1.5 text-sm" onClick={() => save([...teams, { name: `Squadra ${teams.length + 1}`, score: 0 }])}>+ Squadra</button>
        )}
        {teams.length > 2 && (
          <button className="pixel-btn px-3 py-1.5 text-sm" onClick={() => save(teams.slice(0, -1))}>− Squadra</button>
        )}
        <button className="pixel-btn pixel-btn-amber px-3 py-1.5 text-sm" onClick={() => save(teams.map((t) => ({ ...t, score: 0 })))}>Azzera punti</button>
      </div>
    </div>
  );
}

/** Button for the teacher page */
export function ClassroomToggle() {
  const on = useClassroomMode();
  return (
    <button
      onClick={() => setClassroomMode(!on)}
      className={cn("pixel-btn px-4 py-2 text-lg", on ? "pixel-btn-amber" : "pixel-btn-purple")}
      aria-pressed={on}
    >
      {on ? "✅ Modalità classe attiva – disattiva" : "🧑‍🏫 Attiva la modalità classe"}
    </button>
  );
}
