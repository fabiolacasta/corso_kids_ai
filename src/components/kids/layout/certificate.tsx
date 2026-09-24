"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllLevels, worlds } from "@/lib/kids/levels";
import { getProgress } from "@/lib/kids/progress";
import { PixelRobot, PixelStar } from "@/components/kids/elements/pixel-art";

/**
 * Printable certificate. The name is typed here and printed, but never saved
 * or sent anywhere (it only lives in this page while it is open).
 */
export function Certificate() {
  const [name, setName] = useState("");
  const [stats, setStats] = useState({ done: 0, stars: 0, worldsDone: 0 });
  const total = getAllLevels().length;
  const today = new Date().toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });

  useEffect(() => {
    const p = getProgress();
    const levels = getAllLevels();
    setStats({
      done: levels.filter((l) => p.levels[l.slug]?.completed).length,
      stars: levels.reduce((n, l) => n + (p.levels[l.slug]?.stars || 0), 0),
      worldsDone: worlds.filter((w) => w.levels.every((l) => p.levels[l.slug]?.completed)).length,
    });
  }, []);

  const complete = stats.done === total;

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="no-print bg-[#FEF3C7] border-4 border-[#8B4513] p-4 mb-4">
          <h1 className="text-2xl font-bold text-[#8B4513] m-0 mb-2">🎓 Il tuo attestato</h1>
          <label htmlFor="cert-name" className="block text-lg text-[#2C1810] mb-1">Scrivi il tuo nome come vuoi che compaia:</label>
          <input
            id="cert-name"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 40))}
            className="w-full text-xl px-3 py-2 border-4 border-[#D4A574] bg-white text-[#2C1810]"
            placeholder="Nome"
            autoComplete="off"
          />
          <p className="text-sm text-[#5D4037] m-0 mt-2">🔒 Il nome non viene salvato né inviato: serve solo per stampare.</p>
          {!complete && (
            <p className="text-base text-[#9A3412] m-0 mt-2">
              Hai completato {stats.done} livelli su {total}. Puoi stampare lo stesso l&apos;attestato di partecipazione, oppure{" "}
              <Link href="/kids/map" className="underline font-bold">continuare il corso</Link>.
            </p>
          )}
          <button onClick={() => window.print()} className="pixel-btn pixel-btn-green px-5 py-2 text-lg mt-3" disabled={!name.trim()}>
            🖨️ Stampa l&apos;attestato
          </button>
        </div>

        <section
          className="print-area relative bg-white text-center p-8 border-[10px] border-double border-[#B45309]"
          style={{ boxShadow: "0 0 0 6px #FFD700 inset" }}
          aria-label="Anteprima dell'attestato"
        >
          <div className="flex justify-center mb-2"><PixelRobot className="w-14 h-16" /></div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#B45309] m-0">La Scuola di Prompt di Promi</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1810] m-0 mt-2">
            {complete ? "Attestato di Maestro dei Prompt" : "Attestato di partecipazione"}
          </h2>
          <p className="text-lg text-[#5D4037] m-0 mt-4">si attesta che</p>
          <p className="text-4xl font-bold text-[#1E3A8A] m-0 mt-2 min-h-[3rem] border-b-2 border-[#D4A574] mx-auto max-w-md">
            {name.trim() || " "}
          </p>
          <p className="text-lg text-[#2C1810] m-0 mt-4 max-w-xl mx-auto">
            {complete
              ? "ha completato tutti i livelli del corso sull'intelligenza artificiale: sa scrivere prompt chiari e usare l'IA in modo sicuro e responsabile."
              : `ha completato ${stats.done} livelli su ${total} del corso sull'intelligenza artificiale.`}
          </p>
          <div className="flex justify-center gap-6 mt-5 text-[#2C1810]">
            <div><p className="text-3xl font-bold m-0">{stats.done}/{total}</p><p className="text-sm m-0">livelli</p></div>
            <div><p className="text-3xl font-bold m-0 flex items-center gap-1 justify-center">{stats.stars}<PixelStar filled className="w-6 h-6" /></p><p className="text-sm m-0">stelle</p></div>
            <div><p className="text-3xl font-bold m-0">🏅 {stats.worldsDone}</p><p className="text-sm m-0">mondi</p></div>
          </div>
          <div className="flex justify-between items-end mt-8 text-sm text-[#5D4037] gap-4">
            <div className="text-left"><p className="m-0">Data</p><p className="m-0 font-bold text-base text-[#2C1810]">{today}</p></div>
            <div className="text-right"><p className="m-0 border-t-2 border-[#9CA3AF] pt-1 w-48">Firma dell&apos;insegnante</p></div>
          </div>
        </section>
      </div>
    </div>
  );
}
