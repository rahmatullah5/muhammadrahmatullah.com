/** @format */

"use client";

import { useEffect, useState } from "react";
import { CAREER_START } from "@/lib/career";

const p = (n: number) => String(n).padStart(2, "0");

/** Time since my first production deploy, ticking every second. */
export default function Uptime({ short = false }: { short?: boolean }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return <span className="num">--y --m --d</span>;

  const start = new Date(CAREER_START);
  const end = new Date(now);
  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  const anchor = new Date(start);
  anchor.setMonth(start.getMonth() + months);
  if (anchor > end) {
    months -= 1;
    anchor.setMonth(anchor.getMonth() - 1);
  }
  const y = Math.floor(months / 12);
  const m = months % 12;
  let rest = Math.floor((end.getTime() - anchor.getTime()) / 1000);
  const d = Math.floor(rest / 86400);
  rest %= 86400;
  const hh = Math.floor(rest / 3600);
  const mm = Math.floor((rest % 3600) / 60);
  const ss = rest % 60;

  return (
    <span className="num" suppressHydrationWarning>
      {y}y {p(m)}m {p(d)}d
      {!short && ` ${p(hh)}:${p(mm)}:${p(ss)}`}
    </span>
  );
}
