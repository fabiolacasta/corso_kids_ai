"use client";

import { useState, useEffect, useId } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { PixelRobot, PixelStar } from "./pixel-art";
import { useLevelSlug, useSectionNavigation } from "@/components/kids/providers/level-context";
import { getComponentState, saveComponentState, markSectionCompleted } from "@/lib/kids/progress";
import { useKidsA11y } from "@/components/kids/layout/accessibility";

/*
 * Safety games for World 6 ("Safety Shores").
 * - SafetySorter: sort situations into buckets (e.g. green / yellow / red traffic light)
 * - WhatWouldYouDo: a real-life scenario with several choices and feedback for each
 * - SpotTheFake: an AI answer where one sentence is made up (hallucination)
 * They follow the same patterns as the other kids elements: pixel styling,
 * section requirement registration and per-level state persistence.
 */

const pixelClip =
  "polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))";
const smallClip =
  "polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))";

const BUCKET_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  green: { bg: "#DCFCE7", border: "#16A34A", text: "#166534" },
  yellow: { bg: "#FEF9C3", border: "#CA8A04", text: "#854D0E" },
  red: { bg: "#FFE4E6", border: "#E11D48", text: "#9F1239" },
  blue: { bg: "#DBEAFE", border: "#2563EB", text: "#1E40AF" },
  purple: { bg: "#F3E8FF", border: "#9333EA", text: "#6B21A8" },
};

// "Colori sicuri" (color blindness) option: no green/red pair.
const SAFE_BUCKET_COLORS: typeof BUCKET_COLORS = {
  ...BUCKET_COLORS,
  green: { bg: "#DBEAFE", border: "#1D4ED8", text: "#1E3A8A" },
  red: { bg: "#FFEDD5", border: "#C2410C", text: "#7C2D12" },
  blue: { bg: "#E0F2FE", border: "#0369A1", text: "#0C4A6E" },
};

function usePersistentState<T>(initial: T) {
  const levelSlug = useLevelSlug();
  const componentId = useId();
  const [state, setState] = useState<T>(initial);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (levelSlug) {
      const saved = getComponentState<T>(levelSlug, componentId);
      if (saved) setState(saved);
    }
    setLoaded(true);
  }, [levelSlug, componentId]);

  useEffect(() => {
    if (!levelSlug || !loaded) return;
    saveComponentState<T>(levelSlug, componentId, state);
  }, [levelSlug, componentId, state, loaded]);

  return { state, setState, loaded, levelSlug };
}

function useRequirement() {
  const levelSlug = useLevelSlug();
  const { currentSection, markSectionComplete, registerSectionRequirement } = useSectionNavigation();
  useEffect(() => {
    registerSectionRequirement(currentSection);
  }, [currentSection, registerSectionRequirement]);
  return () => {
    if (levelSlug) markSectionCompleted(levelSlug, currentSection);
    markSectionComplete(currentSection);
  };
}

function Bubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="shrink-0">
        <PixelRobot className="w-8 h-10" />
      </div>
      <div className="flex-1 bg-white p-2 shadow-md border-2 border-[#8B4513] ml-2" style={{ clipPath: pixelClip }}>
        <div className="text-base font-bold text-[#2C1810] m-0">{children}</div>
      </div>
    </div>
  );
}

function Feedback({ ok, title, children }: { ok: boolean; title: string; children?: React.ReactNode }) {
  return (
    <div
      className={cn(
        "mt-3 p-3 animate-in fade-in zoom-in-95 duration-300",
        ok
          ? "bg-gradient-to-br from-[#BBF7D0] to-[#86EFAC] border-2 border-[#22C55E]"
          : "bg-gradient-to-br from-[#FEF08A] to-[#FDE047] border-2 border-[#F59E0B]"
      )}
      style={{ clipPath: pixelClip }}
    >
      <p className="text-base font-bold text-[#2C1810] m-0 text-center">
        {ok && <PixelStar filled className="w-4 h-4 inline mr-1" />}
        {title}
        {ok && <PixelStar filled className="w-4 h-4 inline ml-1" />}
      </p>
      {children && <div className="text-sm text-[#5D4037] mt-2">{children}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SafetySorter                                                        */
/* ------------------------------------------------------------------ */

interface Bucket {
  id: string;
  label: string;
  color?: keyof typeof BUCKET_COLORS;
}
interface SortItem {
  text: string;
  bucket: string;
  why?: string;
}
interface SafetySorterProps {
  title?: string;
  instruction?: string;
  buckets: Bucket[];
  items: SortItem[];
  successMessage?: string;
}

export function SafetySorter({ title, instruction, buckets, items, successMessage }: SafetySorterProps) {
  const t = useTranslations("kids.safety");
  const complete = useRequirement();
  const { state, setState, loaded } = usePersistentState<{ picks: Record<number, string>; checked: boolean; checkedPicks?: Record<number, string> }>({
    picks: {},
    checked: false,
  });
  const safeColors = useKidsA11y()?.settings.colors;
  const palette = safeColors ? SAFE_BUCKET_COLORS : BUCKET_COLORS;
  if (!loaded) return null;

  const { picks, checked } = state;
  const checkedPicks = state.checkedPicks || {};
  const allPicked = items.every((_, i) => picks[i]);
  const wrong = items.filter((it, i) => picks[i] && picks[i] !== it.bucket).length;
  const allRight = checked && allPicked && wrong === 0;

  const pick = (i: number, b: string) => {
    if (allRight) return;
    setState({ ...state, picks: { ...picks, [i]: b }, checked: false });
  };
  const check = () => {
    setState({ ...state, checked: true, checkedPicks: { ...picks } });
    if (allPicked && items.every((it, i) => picks[i] === it.bucket)) complete();
  };

  return (
    <div className="my-2">
      {title && <Bubble>{title}</Bubble>}
      {instruction && <p className="text-sm text-[#5D4037] mb-2 m-0">{instruction}</p>}
      <div className="grid gap-2">
        {items.map((it, i) => {
          const p = picks[i];
          const isWrong = !!p && p !== it.bucket && checkedPicks[i] === p;
          const isRight = checked && p === it.bucket;
          return (
            <div
              key={i}
              className={cn(
                "bg-white border-2 p-2 flex flex-col sm:flex-row sm:items-center gap-2",
                isRight ? "border-[#22C55E] bg-[#F0FDF4]" : isWrong ? "border-[#EF4444] bg-[#FFF1F2]" : "border-[#D97706]"
              )}
              style={{ clipPath: smallClip }}
            >
              <div className="flex-1">
                <p className="text-base text-[#2C1810] m-0 leading-tight">
                  {isRight && <span className="font-bold text-[#16A34A] mr-1" aria-label="giusto">✓</span>}
                  {isWrong && <span className="font-bold text-[#DC2626] mr-1" aria-label="sbagliato">✗</span>}
                  {it.text}
                </p>
                {allRight && it.why && <p className="text-sm text-[#5D4037] m-0 mt-1">{it.why}</p>}
                {isWrong && (
                  <p className="text-sm text-[#9F1239] m-0 mt-1">
                    <b>{t("whyWrong")}</b> {it.why || t("thinkAgain")}
                  </p>
                )}
              </div>
              <div className="flex gap-1 flex-wrap">
                {buckets.map((b) => {
                  const c = palette[b.color || "blue"];
                  const sel = p === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => pick(i, b.id)}
                      disabled={allRight}
                      className="px-3 py-1 text-sm font-bold border-2 transition-colors"
                      style={{
                        clipPath: smallClip,
                        background: sel ? c.border : c.bg,
                        borderColor: c.border,
                        color: sel ? "#fff" : c.text,
                      }}
                      aria-pressed={sel}
                    >
                      {b.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {!allRight && (
        <div className="mt-3 text-center">
          <button onClick={check} disabled={!allPicked} className={cn("pixel-btn px-6 py-2 text-base", !allPicked && "opacity-40")}>
            {t("check")}
          </button>
        </div>
      )}
      {checked && !allRight && <Feedback ok={false} title={t("sortWrong", { count: wrong })} />}
      {allRight && <Feedback ok title={successMessage || t("sortRight")} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* WhatWouldYouDo                                                      */
/* ------------------------------------------------------------------ */

interface Choice {
  text: string;
  correct?: boolean;
  feedback: string;
}
interface WhatWouldYouDoProps {
  scenario: string;
  question?: string;
  choices: Choice[];
  promiMessage?: string;
}

export function WhatWouldYouDo({ scenario, question, choices, promiMessage }: WhatWouldYouDoProps) {
  const t = useTranslations("kids.safety");
  const complete = useRequirement();
  const { state, setState, loaded } = usePersistentState<{ tried: number[]; done: boolean }>({ tried: [], done: false });
  if (!loaded) return null;
  const last = state.tried[state.tried.length - 1];

  const choose = (i: number) => {
    if (state.done || state.tried.includes(i)) return;
    const ok = !!choices[i].correct;
    setState({ tried: [...state.tried, i], done: ok });
    if (ok) complete();
  };

  return (
    <div className="my-2">
      <div className="bg-[#FEF3C7] border-2 border-[#D97706] p-3 mb-2" style={{ clipPath: pixelClip }}>
        <p className="text-xs font-bold uppercase tracking-wider text-[#B45309] m-0 mb-1">{t("scenario")}</p>
        <p className="text-base text-[#2C1810] m-0 leading-snug">{scenario}</p>
      </div>
      <Bubble>{question || t("whatWouldYouDo")}</Bubble>
      <div className="grid gap-2">
        {choices.map((c, i) => {
          const tried = state.tried.includes(i);
          const ok = !!c.correct;
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={state.done || tried}
              className={cn(
                "text-left bg-white border-2 p-2 flex gap-2 items-start transition-all",
                !tried && !state.done && "hover:scale-[1.01] hover:shadow-lg border-[#F59E0B]",
                tried && ok && "border-[#22C55E] bg-[#F0FDF4]",
                tried && !ok && "border-[#EF4444] bg-[#FFF1F2] opacity-80",
                state.done && !tried && "opacity-50 border-[#E5E7EB]"
              )}
              style={{ clipPath: smallClip }}
            >
              <span
                className={cn(
                  "w-6 h-6 shrink-0 flex items-center justify-center text-sm font-bold text-white",
                  tried ? (ok ? "bg-[#22C55E]" : "bg-[#EF4444]") : "bg-[#F59E0B]"
                )}
                style={{ clipPath: smallClip }}
              >
                {tried ? (ok ? "✓" : "✗") : String.fromCharCode(65 + i)}
              </span>
              <span className="text-base text-[#2C1810] leading-tight">{c.text}</span>
            </button>
          );
        })}
      </div>
      {last !== undefined && (
        <Feedback ok={!!choices[last].correct} title={choices[last].correct ? t("goodChoice") : t("thinkAgain")}>
          <p className="m-0">{choices[last].feedback}</p>
          {state.done && promiMessage && (
            <div className="flex items-center gap-2 mt-2 bg-white/60 p-2" style={{ clipPath: smallClip }}>
              <PixelRobot className="w-6 h-7 shrink-0" />
              <p className="text-sm text-[#5D4037] m-0">{promiMessage}</p>
            </div>
          )}
        </Feedback>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SpotTheFake                                                         */
/* ------------------------------------------------------------------ */

interface Sentence {
  text: string;
  fake?: boolean;
  /** Why this sentence is true (shown when it is tapped by mistake) */
  why?: string;
}
interface SpotTheFakeProps {
  question: string;
  sentences: Sentence[];
  explanation: string;
}

export function SpotTheFake({ question, sentences, explanation }: SpotTheFakeProps) {
  const t = useTranslations("kids.safety");
  const complete = useRequirement();
  const { state, setState, loaded } = usePersistentState<{ tried: number[]; found: boolean }>({ tried: [], found: false });
  if (!loaded) return null;

  const tap = (i: number) => {
    if (state.found || state.tried.includes(i)) return;
    const f = !!sentences[i].fake;
    setState({ tried: [...state.tried, i], found: f });
    if (f) complete();
  };
  const lastWrong = !state.found && state.tried.length > 0;

  return (
    <div className="my-2">
      <Bubble>{question}</Bubble>
      <div className="bg-white border-2 border-[#8B4513] p-3" style={{ clipPath: pixelClip }}>
        <p className="text-xs font-bold uppercase tracking-wider text-[#8B7355] m-0 mb-1">{t("aiAnswer")}</p>
        <p className="m-0 leading-relaxed">
          {sentences.map((s, i) => {
            const tried = state.tried.includes(i);
            return (
              <button
                key={i}
                onClick={() => tap(i)}
                disabled={state.found || tried}
                className={cn(
                  "inline text-left text-base text-[#2C1810] px-1 mr-1 transition-colors",
                  !tried && !state.found && "hover:bg-[#FEF3C7] cursor-pointer",
                  tried && s.fake && "bg-[#FDE047] outline outline-2 outline-[#F59E0B]",
                  tried && !s.fake && "bg-[#DCFCE7] text-[#166534]"
                )}
              >
                {s.text}
              </button>
            );
          })}
        </p>
      </div>
      {lastWrong && (
        <Feedback ok={false} title={t("thisIsTrue")}>
          {sentences[state.tried[state.tried.length - 1]]?.why && (
            <p className="m-0">{sentences[state.tried[state.tried.length - 1]].why}</p>
          )}
        </Feedback>
      )}
      {state.found && (
        <Feedback ok title={t("found")}>
          <p className="m-0">{explanation}</p>
        </Feedback>
      )}
    </div>
  );
}
