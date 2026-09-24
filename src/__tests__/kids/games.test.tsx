/**
 * The safety games (world 6) behave correctly: wrong answers explain why,
 * right answers are recognised, and results never rely on color alone.
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/it.json";
import { SafetySorter, WhatWouldYouDo, SpotTheFake } from "@/components/kids/elements/safety-games";

// Use the real translations (vitest.setup.ts mocks next-intl globally)
vi.mock("next-intl", async () => await vi.importActual("next-intl"));

function wrap(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="it" messages={messages as never}>
      {ui}
    </NextIntlClientProvider>
  );
}

beforeEach(() => localStorage.clear());

describe("SafetySorter", () => {
  const buckets = [
    { id: "yes", label: "✅ Sì", color: "green" as const },
    { id: "never", label: "⛔ Mai", color: "red" as const },
  ];
  const items = [
    { text: "Il mio gioco preferito", bucket: "yes", why: "Non dice chi sei." },
    { text: "La mia password", bucket: "never", why: "Le password non si danno a nessuno." },
  ];

  it("check is disabled until every card is placed", async () => {
    wrap(<SafetySorter buckets={buckets} items={items} />);
    const check = await screen.findByRole("button", { name: "Controlla" });
    expect(check).toBeDisabled();
  });

  it("a wrong card shows ✗ and the reason", async () => {
    wrap(<SafetySorter buckets={buckets} items={items} />);
    const yesButtons = await screen.findAllByRole("button", { name: "✅ Sì" });
    fireEvent.click(yesButtons[0]);
    fireEvent.click(yesButtons[1]); // password -> "Sì": wrong
    fireEvent.click(screen.getByRole("button", { name: "Controlla" }));
    expect(await screen.findByText(/1 carta è al posto sbagliato/)).toBeInTheDocument();
    expect(screen.getByLabelText("sbagliato")).toBeInTheDocument();
    expect(screen.getByText("Le password non si danno a nessuno.")).toBeInTheDocument();
  });

  it("all right shows success and ✓ marks", async () => {
    wrap(<SafetySorter buckets={buckets} items={items} successMessage="Bravo!" />);
    fireEvent.click((await screen.findAllByRole("button", { name: "✅ Sì" }))[0]);
    fireEvent.click(screen.getAllByRole("button", { name: "⛔ Mai" })[1]);
    fireEvent.click(screen.getByRole("button", { name: "Controlla" }));
    expect(await screen.findByText("Bravo!")).toBeInTheDocument();
    expect(screen.getAllByLabelText("giusto")).toHaveLength(2);
  });
});

describe("WhatWouldYouDo", () => {
  const choices = [
    { text: "Lo condivido", feedback: "No: potrebbe ferire qualcuno." },
    { text: "Lo dico a un adulto", correct: true, feedback: "Giusto!" },
  ];

  it("wrong choice explains and shows ✗, right choice shows ✓", async () => {
    wrap(<WhatWouldYouDo scenario="Ti arriva una foto finta" choices={choices} />);
    fireEvent.click(await screen.findByRole("button", { name: /Lo condivido/ }));
    expect(await screen.findByText("No: potrebbe ferire qualcuno.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Lo condivido/ })).toHaveTextContent("✗");
    fireEvent.click(screen.getByRole("button", { name: /Lo dico a un adulto/ }));
    expect(await screen.findByText("Ottima scelta!")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Lo dico a un adulto/ })).toHaveTextContent("✓");
  });
});

describe("SpotTheFake", () => {
  const sentences = [
    { text: "Pisa è in Toscana.", why: "Vero." },
    { text: "La torre è alta 3 km.", fake: true },
  ];

  it("true sentence says it is true, fake one is found", async () => {
    wrap(<SpotTheFake question="Trova l'invenzione" sentences={sentences} explanation="È troppo alta!" />);
    fireEvent.click(await screen.findByRole("button", { name: /Pisa è in Toscana/ }));
    expect(await screen.findByText(/Questa frase è vera/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Pisa è in Toscana/ })).toHaveTextContent("✓");
    fireEvent.click(screen.getByRole("button", { name: /alta 3 km/ }));
    await waitFor(() => expect(screen.getByText("Beccata!")).toBeInTheDocument());
    expect(screen.getByText("È troppo alta!")).toBeInTheDocument();
  });
});
