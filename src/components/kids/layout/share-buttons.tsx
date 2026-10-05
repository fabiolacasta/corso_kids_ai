"use client";

import { useState } from "react";

/** Share the course with colleagues: WhatsApp, email, Telegram, copy link. No tracking. */
export function ShareButtons({ text, url }: { text: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const full = `${text} ${url}`;
  const enc = encodeURIComponent;
  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${enc(full)}`, cls: "pixel-btn-green" },
    { label: "Telegram", href: `https://t.me/share/url?url=${enc(url)}&text=${enc(text)}`, cls: "" },
    { label: "Email", href: `mailto:?subject=${enc("Corso gratuito sull'IA per le medie")}&body=${enc(full)}`, cls: "pixel-btn-amber" },
  ];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(full);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard not available: the text is selectable on the page
    }
  };
  return (
    <div className="flex flex-wrap gap-2 mt-3 no-print">
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={`pixel-btn ${l.cls} px-4 py-2 text-base`}>
          {l.label}
        </a>
      ))}
      <button onClick={copy} className="pixel-btn pixel-btn-purple px-4 py-2 text-base" aria-live="polite">
        {copied ? "✓ Copiato!" : "Copia il messaggio"}
      </button>
    </div>
  );
}
