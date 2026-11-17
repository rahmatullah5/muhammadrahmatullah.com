/** @format */

"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import PendingLine from "./PendingLine";
import styles from "./SystemMap.module.css";

type Lane = {
  id: string;
  name: string;
  org: string;
  href: string;
  metric: string;
  nodes: [string, string, string, string];
  events: string[];
};

/**
 * Pipelines I designed or built, drawn as one composite topology.
 * Node names follow the real systems in the case studies.
 */
const LANES: Lane[] = [
  {
    id: "lending",
    name: "lender channeling",
    org: "Kredivo",
    href: "/blog/digital-bank-channeling-integration",
    metric: "new channel, 0→1",
    nodes: ["mobile-app", "lender-svc", "loan-core", "digital-bank"],
    events: [
      "POST /disbursements 201",
      "repayment.settled",
      "PUT /loans/cancel 200",
      "recon.report.sent",
    ],
  },
  {
    id: "etl",
    name: "lender data snapshot",
    org: "Kredivo",
    href: "/blog/lender-snapshot-etl-optimization",
    metric: "2–3m → 14s",
    nodes: ["loan-db", "etl.dag", "snapshot", "lender-report"],
    events: [
      "snapshot.refresh ok",
      "SELECT lender_batch 14s",
      "etl.partition loaded",
    ],
  },
  {
    id: "market",
    name: "crypto market data",
    org: "Stockbit",
    href: "/about#stockbit",
    metric: "1M trades/mo",
    nodes: ["exchange.ws", "kafka", "aggregator.ex", "pg-timeseries"],
    events: [
      "trade BTC/IDR",
      "trade ETH/IDR",
      "candle.1m closed",
      "orderbook.diff",
    ],
  },
  {
    id: "ara",
    name: "smart-money signals",
    org: "ARA",
    href: "/blog/ara-trading-platform",
    metric: "solo build",
    nodes: ["idx-broker", "ingest.go", "scorer", "dashboard"],
    events: [
      "broker.accum TLKM",
      "vwap.recalc",
      "signal.buy scored",
    ],
  },
  {
    id: "wallet",
    name: "family wallet sync",
    org: "Sedompet",
    href: "/blog/sedompet-family-wallet",
    metric: "Rp 1B recorded",
    nodes: ["sqlite.wasm", "sync.queue", "postgres+rls", "household"],
    events: [
      "txn.insert groceries",
      "pocket.transfer",
      "realtime.broadcast",
    ],
  },
];

type Packet = { id: number; lane: number; label: string; dur: number; ms: number };
type LogLine = { id: number; t: string; lane: number; text: string; ok: boolean };

const ts = () => {
  const d = new Date();
  const p = (n: number, w = 2) => String(n).padStart(w, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}.${p(
    d.getMilliseconds(),
    3,
  )}`;
};

export default function SystemMap() {
  const [packets, setPackets] = useState<Packet[]>([]);
  const [log, setLog] = useState<LogLine[]>([]);
  const [count, setCount] = useState(0);
  const [focus, setFocus] = useState<number | null>(null);
  const seq = useRef(0);
  const focusRef = useRef<number | null>(null);
  useEffect(() => {
    focusRef.current = focus;
  }, [focus]);

  const pushLog = useCallback((lane: number, text: string, ok = true) => {
    const id = ++seq.current;
    setLog((l) => [...l.slice(-7), { id, t: ts(), lane, text, ok }]);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // No moving traffic: show a static snapshot of the log instead.
      const t = setTimeout(() => {
        LANES.forEach((lane, li) =>
          lane.events.slice(0, 2).forEach((ev, k) =>
            pushLog(li, `${ev} ${8 + li * 5 + k * 3}ms`),
          ),
        );
      }, 0);
      return () => clearTimeout(t);
    }
    let timer: ReturnType<typeof setTimeout>;
    const spawn = () => {
      if (!document.hidden) {
        const f = focusRef.current;
        const lane =
          f !== null && Math.random() < 0.6
            ? f
            : Math.floor(Math.random() * LANES.length);
        const evs = LANES[lane].events;
        const label = evs[Math.floor(Math.random() * evs.length)];
        const id = ++seq.current;
        setPackets((p) => [
          ...p,
          {
            id,
            lane,
            label,
            dur: 2600 + Math.random() * 1600,
            ms: Math.round(4 + Math.random() * 38),
          },
        ]);
      }
      timer = setTimeout(spawn, 420 + Math.random() * 520);
    };
    timer = setTimeout(spawn, 300);
    return () => clearTimeout(timer);
  }, [pushLog]);

  const arrive = (pk: Packet) => {
    setPackets((p) => p.filter((x) => x.id !== pk.id));
    setCount((c) => c + 1);
    pushLog(pk.lane, `${pk.label} ${pk.ms}ms`);
  };

  return (
    <div className={styles.grid}>
      <div className={`panel ${styles.mapPanel}`}>
        <div className="panel-bar">
          <span>
            <span className="led" />
            <b>topology</b> / systems i&rsquo;ve built
          </span>
          <span className="num">
            events <b>{count.toLocaleString("en-US")}</b>
          </span>
        </div>

        <div className={styles.cols} aria-hidden="true">
          <span>ingress</span>
          <span>transport</span>
          <span>service</span>
          <span>sink</span>
        </div>

        <ul className={styles.lanes}>
          {LANES.map((lane, li) => (
            <li
              key={lane.id}
              className={`${styles.lane} ${
                focus !== null && focus !== li ? styles.dim : ""
              } ${focus === li ? styles.on : ""}`}
              onPointerEnter={() => setFocus(li)}
              onPointerLeave={() => setFocus(null)}
            >
              <Link href={lane.href} className={styles.laneHead}>
                <span>
                  <span className={styles.laneNo}>
                    {String(li + 1).padStart(2, "0")}
                  </span>
                  {lane.name}
                  <span className={styles.org}> · {lane.org}</span>
                </span>
                <span className={styles.metric}>{lane.metric} →</span>
              </Link>
              <div className={styles.row}>
                <span className={styles.track} />
                {lane.nodes.map((n) => (
                  <span key={n} className={styles.node}>
                    {n}
                  </span>
                ))}
                {packets
                  .filter((p) => p.lane === li)
                  .map((p) => (
                    <span
                      key={p.id}
                      className={styles.packet}
                      style={{ ["--dur" as string]: `${p.dur}ms` }}
                      onAnimationEnd={() => arrive(p)}
                    >
                      <i>{p.label}</i>
                    </span>
                  ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={`panel ${styles.logPanel}`}>
        <div className="panel-bar">
          <span>
            <b>tail -f</b> events.log
          </span>
          <span>WIB</span>
        </div>
        <ol className={styles.log} aria-live="off">
          {log.length === 0 && (
            <li className={styles.logIdle}>waiting for traffic…</li>
          )}
          {log.map((l) => (
            <li key={l.id}>
              <span className={styles.logT}>{l.t}</span>
              <span className={l.ok ? styles.logOk : styles.logBad}>
                {l.ok ? "OK " : "ERR"}
              </span>
              <span className={styles.logLane}>
                {LANES[l.lane].nodes[3].padEnd(13)}
              </span>
              <span className={styles.logText}>{l.text}</span>
            </li>
          ))}
          <PendingLine className={styles.pending} />
        </ol>
        <p className={styles.logNote}>
          Composite view. Lane names match the real systems in the case
          studies; traffic is simulated.
        </p>
      </div>
    </div>
  );
}
