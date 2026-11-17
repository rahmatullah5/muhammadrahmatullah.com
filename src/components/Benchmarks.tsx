/** @format */

"use client";

import { useEffect, useRef } from "react";
import styles from "./Benchmarks.module.css";

type Bench = {
  name: string;
  where: string;
  before: number;
  after: number;
  beforeLabel: string;
  afterLabel: string;
  delta: string;
};

const BENCHES: Bench[] = [
  {
    name: "Data ingestion job",
    where: "Kredivo",
    before: 600,
    after: 20,
    beforeLabel: "10 min",
    afterLabel: "20 s",
    delta: "30× faster",
  },
  {
    name: "Lender data snapshot query",
    where: "Kredivo · ETL snapshot",
    before: 150,
    after: 14,
    beforeLabel: "2–3 min",
    afterLabel: "14 s",
    delta: "~10× faster",
  },
  {
    name: "CI pipeline, internal tool",
    where: "Kredivo · Bitbucket",
    before: 30,
    after: 15,
    beforeLabel: "30 min",
    afterLabel: "15 min",
    delta: "2× faster",
  },
  {
    name: "Customer-reported issues",
    where: "Mekari · monitoring tools",
    before: 100,
    after: 20,
    beforeLabel: "baseline",
    afterLabel: "−80%",
    delta: "−80%",
  },
  {
    name: "Video API overhead cost",
    where: "41 Studio · backend refactor",
    before: 100,
    after: 50,
    beforeLabel: "baseline",
    afterLabel: "−50%",
    delta: "−50%",
  },
];

/**
 * Before/after bars. On first view each "after" bar starts at the
 * "before" length and shrinks to its real value.
 */
export default function Benchmarks() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add(styles.run);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`panel ${styles.panel}`}>
      <div className="panel-bar">
        <span>
          <b>benchmarks</b> / before → after, production
        </span>
        <span className={styles.legend}>
          <i className={styles.swBefore} /> before
          <i className={styles.swAfter} /> after
        </span>
      </div>
      <ul className={styles.list}>
        {BENCHES.map((b, i) => {
          const after = Math.max((b.after / b.before) * 100, 1.2);
          return (
            <li
              key={b.name}
              className={styles.row}
              style={{ ["--i" as string]: i }}
            >
              <div className={styles.name}>
                <span>{b.name}</span>
                <span className={styles.where}>{b.where}</span>
              </div>
              <div className={styles.bars}>
                <div className={styles.bar}>
                  <span className={styles.before} />
                  <em>{b.beforeLabel}</em>
                </div>
                <div className={styles.bar}>
                  <span
                    className={styles.after}
                    style={{ ["--w" as string]: after.toFixed(2) }}
                  />
                  <em className={styles.afterLabel}>{b.afterLabel}</em>
                </div>
              </div>
              <div className={styles.delta}>{b.delta}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
