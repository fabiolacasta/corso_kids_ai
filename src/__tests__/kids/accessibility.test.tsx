/**
 * Accessibility options: badge opens the panel, switches apply and persist,
 * focus mode turns the music off.
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/it.json";
import { KidsA11yProvider, AccessibilityBadge, AccessibilityButton } from "@/components/kids/layout/accessibility";
import { MusicProvider, MusicButton } from "@/components/kids/layout/background-music";

vi.mock("next-intl", async () => await vi.importActual("next-intl"));

function setup() {
  return render(
    <NextIntlClientProvider locale="it" messages={messages as never}>
      <MusicProvider>
        <KidsA11yProvider>
          <AccessibilityBadge />
          <AccessibilityButton />
          <MusicButton />
        </KidsA11yProvider>
      </MusicProvider>
    </NextIntlClientProvider>
  );
}

beforeEach(() => {
  localStorage.clear();
  for (const a of ["data-kids-dyslexia", "data-kids-focus", "data-kids-colors", "data-kids-bigtext"]) document.documentElement.removeAttribute(a);
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});

describe("accessibility panel", () => {
  it("the badge is visible and opens the dialog, Escape closes it", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: /Corso accessibile/ }));
    expect(screen.getByRole("dialog", { name: "Accessibilità" })).toBeInTheDocument();
    expect(screen.getAllByRole("switch")).toHaveLength(4);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it.each([
    ["Lettura facilitata", "data-kids-dyslexia", "dyslexia"],
    ["Colori sicuri", "data-kids-colors", "colors"],
    ["Testo più grande", "data-kids-bigtext", "bigText"],
  ])("%s applies %s and is saved", (label, attr, key) => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: /Corso accessibile/ }));
    const sw = screen.getByRole("switch", { name: new RegExp(label) });
    expect(sw).toHaveAttribute("aria-checked", "false");
    fireEvent.click(sw);
    expect(sw).toHaveAttribute("aria-checked", "true");
    expect(document.documentElement.getAttribute(attr)).toBe("1");
    expect(JSON.parse(localStorage.getItem("kids-a11y")!)[key]).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: /Ripristina/ }));
    expect(document.documentElement.hasAttribute(attr)).toBe(false);
  });

  it("focus mode (ADHD) turns the music off", () => {
    setup();
    expect(screen.getByRole("button", { name: "Mute music" })).toBeInTheDocument(); // music on by default
    fireEvent.click(screen.getByRole("button", { name: /Corso accessibile/ }));
    fireEvent.click(screen.getByRole("switch", { name: /concentrazione/ }));
    expect(document.documentElement.getAttribute("data-kids-focus")).toBe("1");
    expect(screen.getByRole("button", { name: "Play music" })).toBeInTheDocument();
  });

  it("saved choices are restored", () => {
    localStorage.setItem("kids-a11y", JSON.stringify({ colors: true }));
    setup();
    fireEvent.click(screen.getByRole("button", { name: /Corso accessibile/ }));
    expect(screen.getByRole("switch", { name: /Colori sicuri/ })).toHaveAttribute("aria-checked", "true");
  });
});
