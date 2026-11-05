/** @format */

"use client";

import { useEffect, useRef } from "react";

type CountUpProps = {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
};

/**
 * Counts from 0 to `to` once the number scrolls into view. Server HTML shows
 * the final value; the animation writes to the DOM directly (no re-renders).
 */
export default function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1600,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const render = (n: number) => {
      el.textContent = `${prefix}${n}${suffix}`;
    };
    render(0);

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          render(Math.round((1 - Math.pow(1 - t, 4)) * to));
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      render(to);
    };
  }, [to, prefix, suffix, duration]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}
      {to}
      {suffix}
    </span>
  );
}
