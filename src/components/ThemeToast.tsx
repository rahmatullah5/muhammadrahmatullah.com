/** @format */

"use client";

import { useEffect, useRef, useState } from "react";
import { THEME_EVENT } from "./ThemeProvider";
import styles from "./ThemeToast.module.css";

type Joke = { cmd: string; lines: string[]; level: "ok" | "warn" | "alert" };

const DARK: Joke[] = [
  {
    cmd: "git checkout dark-side",
    lines: ["Welcome to the dark side.", "We have cookies. And fewer 2 a.m. pages."],
    level: "ok",
  },
  {
    cmd: "kubectl scale lights --replicas=0",
    lines: ["Lights off.", "The bugs can't see you now."],
    level: "ok",
  },
  {
    cmd: "export THEME=dark",
    lines: ["Dark mode on.", "This is where production incidents get fixed."],
    level: "ok",
  },
];

const LIGHT: Joke[] = [
  {
    cmd: "git checkout light-side",
    lines: ["Light side restored.", "Your retinas have opened a ticket."],
    level: "warn",
  },
  {
    cmd: "export THEME=light",
    lines: ["Light mode? Bold choice.", "Sunglasses recommended for the next 5 seconds."],
    level: "warn",
  },
  {
    cmd: "git revert dark-side",
    lines: ["Rebellion detected.", "The dark side has been notified."],
    level: "warn",
  },
];

const FLAPPING: Joke = {
  cmd: "alert: theme-toggle FLAPPING",
  lines: [
    "Incident INC-2012 opened. Severity: disco.",
    "Root cause: you. Please stop clicking.",
  ],
  level: "alert",
};

const FLAP_COUNT = 5;
const FLAP_WINDOW = 4000;
const TYPE_MS = 22;
const HOLD_MS = 3200;

/**
 * Easter egg: every theme switch prints a one-liner in a little console
 * toast. Toggle fast enough and it pages you instead.
 */
export default function ThemeToast() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [typed, setTyped] = useState(0);
  const flips = useRef<number[]>([]);
  const turn = useRef({ dark: 0, light: 0 });

  useEffect(() => {
    const onSwitch = (e: Event) => {
      const next = (e as CustomEvent<"dark" | "light">).detail;
      const now = Date.now();
      flips.current = [...flips.current, now].filter((t) => now - t < FLAP_WINDOW);

      let pick: Joke;
      if (flips.current.length >= FLAP_COUNT) {
        pick = FLAPPING;
        flips.current = [];
      } else {
        const pool = next === "dark" ? DARK : LIGHT;
        pick = pool[turn.current[next] % pool.length];
        turn.current[next] += 1;
      }
      setJoke(pick);
      setTyped(0);
    };
    window.addEventListener(THEME_EVENT, onSwitch);
    return () => window.removeEventListener(THEME_EVENT, onSwitch);
  }, []);

  const total = joke ? joke.lines.join("\n").length : 0;

  // Type the message out, hold, then dismiss.
  useEffect(() => {
    if (!joke) return;
    if (typed < total) {
      const t = setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setJoke(null), HOLD_MS);
    return () => clearTimeout(t);
  }, [joke, typed, total]);

  if (!joke) return null;

  const text = joke.lines.join("\n").slice(0, typed);

  return (
    <div
      className={`${styles.toast} ${styles[joke.level]}`}
      role="status"
      aria-live="polite"
      onClick={() => setJoke(null)}
    >
      <div className={styles.bar}>
        <span>
          <span className={styles.dot} />
          {joke.level === "alert" ? "pagerduty" : "theme.sh"}
        </span>
        <span aria-hidden="true">×</span>
      </div>
      <p className={styles.cmd}>
        <span className={styles.prompt}>$</span> {joke.cmd}
      </p>
      <p className={styles.out}>
        {text}
        <span className={styles.caret} aria-hidden="true" />
      </p>
      <span className="sr-only">{joke.lines.join(" ")}</span>
    </div>
  );
}
