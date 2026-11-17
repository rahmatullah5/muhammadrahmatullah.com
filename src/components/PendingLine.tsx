/** @format */

"use client";

import { useEffect, useState } from "react";

const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

const TASKS = [
  "still doing something awesome",
  "shipping the next side project",
  "waiting for code review",
  "reconciling yesterday's coffee intake",
  "writing the RFC nobody asked for",
  "making a slow query boring",
  "ETA: soon™",
];

/**
 * The job that never finishes: a terminal-style spinner pinned under the
 * event log. Kept separate so its 80ms ticks don't re-render the map.
 */
export default function PendingLine({ className = "" }: { className?: string }) {
  const [frame, setFrame] = useState(0);
  const [task, setTask] = useState(0);
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const spin = setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), 80);
    const clock = setInterval(() => setSecs((s) => s + 1), 1000);
    const rotate = setInterval(() => {
      setTask((t) => (t + 1) % TASKS.length);
      setSecs(0);
    }, 4200);
    return () => {
      clearInterval(spin);
      clearInterval(clock);
      clearInterval(rotate);
    };
  }, []);

  return (
    <li className={className} aria-hidden="true">
      <span>{FRAMES[frame]}</span>
      <span>{TASKS[task]}…</span>
      <span>{secs}s</span>
    </li>
  );
}
