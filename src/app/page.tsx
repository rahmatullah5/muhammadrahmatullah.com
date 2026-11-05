/** @format */

import Link from "next/link";
import CountUp from "@/components/CountUp";
import LocalTime from "@/components/LocalTime";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import WorkIndex from "@/components/WorkIndex";
import { getAllTags, getSortedPostsData } from "@/lib/posts";
import styles from "./page.module.css";

const stack = [
  "Ruby on Rails",
  "Elixir",
  "Phoenix",
  "Node.js",
  "PostgreSQL",
  "Kafka",
  "Redis",
  "AWS",
  "React",
  "Go",
];

const impact = [
  {
    to: 30,
    suffix: "×",
    label: "Faster data ingestion",
    note: "Data ingestion: 10 minutes → 20 seconds at Kredivo",
  },
  {
    to: 300,
    suffix: "B",
    prefix: "",
    label: "IDR gross profit / year",
    note: "Gross profit from the BCA Digital lending partnership I led",
  },
  {
    to: 1,
    suffix: "M",
    label: "Trades aggregated monthly",
    note: "Real-time crypto market data, Elixir + Kafka",
  },
  {
    to: 80,
    suffix: "%",
    label: "Fewer customer issues",
    note: "Internal monitoring tooling at Mekari",
  },
];

const companies = ["Kredivo", "Stockbit", "Mekari", "Clapping Ape", "41 Studio"];

export default function Home() {
  const posts = getSortedPostsData();
  const allTags = getAllTags();
  const years = new Date().getFullYear() - 2017;

  return (
    <>
      {/* ── Hero ── */}
      <section className={`wrap ${styles.hero}`}>
        <div className={`${styles.meta} fade-in`} style={{ ["--d" as string]: "0ms" }}>
          <span>Senior Software Engineer</span>
          <span>Jakarta, ID — <LocalTime /></span>
          <span>Currently @ Kredivo</span>
        </div>

        <h1 className={styles.headline}>
          <span className="mask" style={{ ["--i" as string]: 0 }}>
            <span>Building systems</span>
          </span>
          <span className="mask" style={{ ["--i" as string]: 1 }}>
            <span>
              with <em className="accent">clarity</em>
              <span className={styles.amp}> &amp;</span>
            </span>
          </span>
          <span className="mask" style={{ ["--i" as string]: 2 }}>
            <span>
              <em>precision</em>
              <span className={styles.dotAccent}>.</span>
            </span>
          </span>
        </h1>

        <div className={`${styles.intro} fade-in`} style={{ ["--d" as string]: "700ms" }}>
          <p className={styles.lede}>
            I&rsquo;m <strong>Muhammad Rahmatullah</strong> — I turn slow,
            tangled backends into fast, boring, dependable ones. Data
            pipelines, microservices and lender integrations that move real
            money.
          </p>
          <div className={styles.ctas}>
            <Link href="/blog" className="pill pill--solid">
              See the work →
            </Link>
            <a href="/resume.pdf" className="pill" download>
              Download CV ↓
            </a>
          </div>
        </div>

        <div className={`${styles.scrollHint} fade-in`} style={{ ["--d" as string]: "1200ms" }}>
          <span className="label">Scroll</span>
          <span className={styles.scrollLine} />
        </div>
      </section>

      <Marquee items={stack} />

      {/* ── Impact ── */}
      <section className={`wrap section`}>
        <Reveal className="section-head">
          <span className="label">(01) Impact</span>
          <span className="label">Numbers, not adjectives</span>
        </Reveal>
        <div className={styles.impact}>
          {impact.map((item, i) => (
            <Reveal key={item.label} delay={i * 90} className={styles.stat}>
              <div className={styles.statNum}>
                <CountUp to={item.to} prefix={item.prefix} suffix={item.suffix} />
              </div>
              <div className={styles.statLabel}>{item.label}</div>
              <div className={styles.statNote}>{item.note}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Work ── */}
      <section className="wrap section" style={{ paddingTop: 0 }}>
        <Reveal className="section-head">
          <span className="label">(02) Selected work</span>
          <Link href="/blog" className="label link-line">
            All case studies →
          </Link>
        </Reveal>
        <Reveal>
          <WorkIndex posts={posts} allTags={allTags} />
        </Reveal>
      </section>

      {/* ── About teaser ── */}
      <section className="wrap section" style={{ paddingTop: 0 }}>
        <Reveal className="section-head">
          <span className="label">(03) About</span>
          <span className="label">Since 2017</span>
        </Reveal>
        <div className={styles.about}>
          <Reveal as="p" className={styles.pull}>
            {years} years shipping production software across fintech,
            crypto and SaaS — from <em>Rails monoliths</em> to{" "}
            <em>Elixir event streams</em>. I write the RFC, build the thing,
            and stay around to make it fast.
          </Reveal>
          <Reveal delay={150} className={styles.aboutSide}>
            <p className="label">Previously</p>
            <ul className={styles.companies}>
              {companies.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="label">Recognition</p>
            <p className={styles.award}>
              Engineering Excellence Award <span className="muted">— Kredivo</span>
            </p>
            <Link href="/about" className="pill">
              Full story →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
