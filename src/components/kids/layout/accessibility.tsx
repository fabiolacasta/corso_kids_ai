"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Accessibility, X, Check, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMusicContext } from "./background-music";

/**
 * Accessibility options for the kids section:
 * - dyslexia: readable font, wider letter/word/line spacing, no italics
 * - focus (ADHD): no animations or moving decorations, music off, strong focus outline
 * - colors (color blindness): green/red become blue/orange; right/wrong always has a symbol
 * - bigText: larger text everywhere
 *
 * Settings are stored only in this browser (localStorage) and applied as
 * data-kids-* attributes on <html>, styled in globals.css.
 */

export type KidsA11ySettings = {
  dyslexia: boolean;
  focus: boolean;
  colors: boolean;
  bigText: boolean;
};

const STORAGE_KEY = "kids-a11y";
const DEFAULTS: KidsA11ySettings = { dyslexia: false, focus: false, colors: false, bigText: false };
const ATTRS: Record<keyof KidsA11ySettings, string> = {
  dyslexia: "data-kids-dyslexia",
  focus: "data-kids-focus",
  colors: "data-kids-colors",
  bigText: "data-kids-bigtext",
};

/** Inline script (runs before first paint) so the chosen settings don't flash. */
export const A11Y_BOOT_SCRIPT = `try{var s=JSON.parse(localStorage.getItem("${STORAGE_KEY}")||"{}");var m=${JSON.stringify(ATTRS)};for(var k in m){if(s[k])document.documentElement.setAttribute(m[k],"1")}}catch(e){}`;

function applyToDocument(s: KidsA11ySettings) {
  const root = document.documentElement;
  (Object.keys(ATTRS) as (keyof KidsA11ySettings)[]).forEach((k) => {
    if (s[k]) root.setAttribute(ATTRS[k], "1");
    else root.removeAttribute(ATTRS[k]);
  });
}

type Ctx = {
  settings: KidsA11ySettings;
  toggle: (key: keyof KidsA11ySettings) => void;
  reset: () => void;
  open: () => void;
};

const A11yContext = createContext<Ctx | null>(null);

export function useKidsA11y() {
  return useContext(A11yContext);
}

export function KidsA11yProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<KidsA11ySettings>(DEFAULTS);
  const [isOpen, setIsOpen] = useState(false);
  const music = useMusicContext();

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      setSettings({ ...DEFAULTS, ...saved });
    } catch {
      // storage not available: keep defaults
    }
  }, []);

  const save = useCallback((next: KidsA11ySettings) => {
    setSettings(next);
    applyToDocument(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }, []);

  const toggle = useCallback(
    (key: keyof KidsA11ySettings) => {
      const next = { ...settings, [key]: !settings[key] };
      if (key === "focus" && next.focus) music?.setIsPlaying(false);
      save(next);
    },
    [settings, save, music]
  );

  const reset = useCallback(() => save(DEFAULTS), [save]);
  const open = useCallback(() => setIsOpen(true), []);

  return (
    <A11yContext.Provider value={{ settings, toggle, reset, open }}>
      {children}
      {isOpen && <AccessibilityPanel onClose={() => setIsOpen(false)} />}
    </A11yContext.Provider>
  );
}

const smallClip =
  "polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))";

/** Header button that opens the accessibility panel. */
export function AccessibilityButton({ withLabel = false }: { withLabel?: boolean }) {
  const t = useTranslations("kids.a11y");
  const ctx = useKidsA11y();
  if (!ctx) return null;
  const active = Object.values(ctx.settings).filter(Boolean).length;
  return (
    <button
      onClick={ctx.open}
      className="pixel-btn px-2 py-1.5 h-8 flex items-center gap-1 text-sm"
      aria-label={t("button")}
      title={t("button")}
      aria-haspopup="dialog"
    >
      <Accessibility className="w-5 h-5" aria-hidden="true" />
      {withLabel && <span>{t("button")}</span>}
      {active > 0 && (
        <span className="ml-0.5 min-w-4 px-1 text-xs leading-4 bg-[#FFD700] text-[#2C1810] font-bold" aria-hidden="true">
          {active}
        </span>
      )}
    </button>
  );
}

/** Visible badge: tells teachers and students the course is accessible, and opens the panel. */
export function AccessibilityBadge({ className }: { className?: string }) {
  const t = useTranslations("kids.a11y");
  const ctx = useKidsA11y();
  return (
    <button
      type="button"
      onClick={ctx?.open}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 bg-[#1E3A8A] text-white border-2 border-[#FFD700] hover:bg-[#1E40AF] focus-visible:outline-4 focus-visible:outline-[#FFD700]",
        className
      )}
      style={{ clipPath: smallClip }}
      title={t("badgeHint")}
      aria-haspopup="dialog"
    >
      <Accessibility className="w-5 h-5 shrink-0" aria-hidden="true" />
      <span className="text-left leading-tight">
        <span className="block text-sm font-bold">{t("badge")}</span>
        <span className="block text-xs">{t("badgeItems")}</span>
      </span>
    </button>
  );
}

function AccessibilityPanel({ onClose }: { onClose: () => void }) {
  const t = useTranslations("kids.a11y");
  const ctx = useKidsA11y();
  const firstRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    firstRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!ctx) return null;
  const options: { key: keyof KidsA11ySettings; emoji: string }[] = [
    { key: "dyslexia", emoji: "📖" },
    { key: "focus", emoji: "🎯" },
    { key: "colors", emoji: "🎨" },
    { key: "bigText", emoji: "🔍" },
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="kids-a11y-title"
        className="relative bg-[#FEF3C7] border-4 border-[#8B4513] p-5 w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 text-[#8B4513] hover:bg-[#8B4513]/10"
          aria-label={t("close")}
        >
          <X className="w-5 h-5" />
        </button>
        <h2 id="kids-a11y-title" className="text-2xl font-bold text-[#8B4513] mb-2 flex items-center gap-2 pr-8">
          <Accessibility className="w-6 h-6" aria-hidden="true" />
          {t("title")}
        </h2>
        <p className="text-base text-[#5D4037] m-0 mb-4">{t("intro")}</p>

        <div className="flex flex-col gap-3">
          {options.map((o, i) => {
            const on = ctx.settings[o.key];
            return (
              <button
                key={o.key}
                ref={i === 0 ? firstRef : undefined}
                role="switch"
                aria-checked={on}
                onClick={() => ctx.toggle(o.key)}
                className={cn(
                  "text-left p-3 border-4 flex items-start gap-3 bg-white",
                  on ? "border-[#1E40AF]" : "border-[#D4A574] hover:border-[#8B4513]"
                )}
                style={{ clipPath: smallClip }}
              >
                <span className="text-2xl leading-none" aria-hidden="true">{o.emoji}</span>
                <span className="flex-1">
                  <span className="block text-lg font-bold text-[#2C1810] leading-tight">{t(`${o.key}.title`)}</span>
                  <span className="block text-sm text-[#5D4037] mt-1 leading-snug">{t(`${o.key}.desc`)}</span>
                </span>
                <span
                  className={cn(
                    "shrink-0 px-2 py-1 text-sm font-bold flex items-center gap-1 border-2",
                    on ? "bg-[#1E40AF] text-white border-[#1E3A8A]" : "bg-[#F3F4F6] text-[#374151] border-[#9CA3AF]"
                  )}
                  aria-hidden="true"
                >
                  {on ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  {on ? t("on") : t("off")}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2 justify-between items-center mt-4">
          <button
            onClick={ctx.reset}
            className="px-3 py-2 text-sm font-bold text-[#5D4037] border-2 border-[#D4A574] bg-white hover:border-[#8B4513] flex items-center gap-1"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            {t("reset")}
          </button>
          <button onClick={onClose} className="pixel-btn pixel-btn-green px-4 py-2 text-base">
            {t("done")}
          </button>
        </div>
        <p className="text-xs text-[#8B7355] m-0 mt-3">{t("privacy")}</p>
      </div>
    </div>
  );
}
