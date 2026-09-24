"use client";

import { useEffect, useState } from "react";

/**
 * "Modalità classe" for the interactive whiteboard (LIM): every level and
 * section is open, and the teacher toolbar (discussion questions, timer,
 * team scores) is shown. Stored only in this browser.
 */
const KEY = "kids-classroom";
const EVENT = "kids-classroom-change";

export function isClassroomMode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function setClassroomMode(on: boolean) {
  try {
    if (on) localStorage.setItem(KEY, "1");
    else localStorage.removeItem(KEY);
  } catch {
    // storage not available
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useClassroomMode(): boolean {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const sync = () => setOn(isClassroomMode());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return on;
}
