/**
 * "Sfida di classe": the question bank is valid and the quiz flow works
 * (reveal the answer, give a point, final ranking).
 */
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { getAllLevels } from "@/lib/kids/levels";
import { QUIZ_BANK } from "@/lib/kids/quiz-bank";
import { ClassChallenge } from "@/components/kids/layout/class-challenge";

const slugs = getAllLevels().map((l) => l.slug);

describe("quiz bank", () => {
  it("has unique ids and at least 20 questions", () => {
    expect(QUIZ_BANK.length).toBeGreaterThanOrEqual(20);
    expect(new Set(QUIZ_BANK.map((q) => q.id)).size).toBe(QUIZ_BANK.length);
  });

  it.each(QUIZ_BANK.map((q) => [q.id, q] as const))("%s is well formed", (_, q) => {
    expect(q.options).toHaveLength(4);
    expect(new Set(q.options).size).toBe(4);
    expect(q.correct).toBeGreaterThanOrEqual(0);
    expect(q.correct).toBeLessThan(4);
    expect(q.explanation.length).toBeGreaterThan(20);
    expect(slugs).toContain(q.level);
    expect(q.question.trim().endsWith("?")).toBe(true);
  });

  it("has at least 10 questions about safety (world 6)", () => {
    expect(QUIZ_BANK.filter((q) => q.world === 6).length).toBeGreaterThanOrEqual(10);
  });
});

describe("class challenge", () => {
  beforeEach(() => localStorage.clear());

  it("plays 5 questions and shows the ranking", () => {
    render(<ClassChallenge />);
    fireEvent.click(screen.getByRole("button", { name: "5 domande" }));
    fireEvent.click(screen.getByRole("button", { name: /Inizia la sfida/ }));
    for (let i = 0; i < 5; i++) {
      expect(screen.getByText(`Domanda ${i + 1} / 5`)).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: /Mostra la risposta/ }));
      expect(screen.getByRole("status")).toHaveTextContent("Risposta giusta");
      fireEvent.click(screen.getByRole("button", { name: "Punto a Squadra 1" }));
      expect(screen.getByRole("button", { name: "Punto a Squadra 2" })).toBeDisabled();
      fireEvent.click(screen.getByRole("button", { name: /Prossima|Classifica/ }));
    }
    expect(screen.getByRole("heading", { name: /Vince Squadra 1/ })).toBeInTheDocument();
  });

  it("the right answer is not always in the same position", () => {
    render(<ClassChallenge />);
    fireEvent.click(screen.getByRole("button", { name: "15 domande" }));
    fireEvent.click(screen.getByRole("button", { name: /Inizia la sfida/ }));
    const positions = new Set<string>();
    for (let i = 0; i < 15; i++) {
      fireEvent.click(screen.getByRole("button", { name: /Mostra la risposta/ }));
      positions.add(screen.getByRole("status").textContent!.match(/Risposta giusta: ([A-D])/)![1]);
      fireEvent.click(screen.getByRole("button", { name: /Prossima|Classifica/ }));
    }
    expect(positions.size).toBeGreaterThanOrEqual(3);
  });
});
