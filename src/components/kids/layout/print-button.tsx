"use client";

export function PrintButton({ label = "🖨️ Stampa", className = "" }: { label?: string; className?: string }) {
  return (
    <button onClick={() => window.print()} className={`no-print pixel-btn pixel-btn-green px-4 py-2 text-lg ${className}`}>
      {label}
    </button>
  );
}
