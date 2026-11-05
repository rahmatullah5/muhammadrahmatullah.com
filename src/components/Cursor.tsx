/** @format */

"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Cursor.module.css";

/**
 * Soft follower ring. Grows and fills over interactive elements; shows a
 * label for elements carrying `data-cursor="Label"`. Fine pointers only.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [state, setState] = useState<"idle" | "link" | "label" | "down">(
    "idle",
  );

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduced) return;

    const pos = { x: -100, y: -100 };
    const cur = { x: -100, y: -100 };
    let raf = 0;
    let visible = false;

    const tick = () => {
      cur.x += (pos.x - cur.x) * 0.2;
      cur.y += (pos.y - cur.y) * 0.2;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible && ref.current) {
        cur.x = pos.x;
        cur.y = pos.y;
        ref.current.style.opacity = "1";
        visible = true;
      }
      const target = e.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setLabel(labelled.dataset.cursor || "");
        setState("label");
      } else if (target?.closest("a, button, [role='button']")) {
        setState("link");
      } else {
        setState("idle");
      }
    };
    const onLeave = () => {
      if (ref.current) ref.current.style.opacity = "0";
      visible = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={styles.cursor} aria-hidden="true">
      <div className={`${styles.ring} ${styles[state]}`}>
        <span className={styles.text}>{state === "label" ? label : ""}</span>
      </div>
    </div>
  );
}
