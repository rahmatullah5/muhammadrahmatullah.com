/** @format */

import fs from "fs";
import path from "path";
import Link from "next/link";
import Benchmarks from "@/components/Benchmarks";
import Reveal from "@/components/Reveal";
import SystemMap from "@/components/SystemMap";
import Uptime from "@/components/Uptime";
import WorkIndex from "@/components/WorkIndex";
import { certifications, championship, experiences, talks } from "@/lib/career";
import { getAllTags, getSortedPostsData } from "@/lib/posts";
import styles from "./page.module.css";

const load = [
  { value: "0→1", unit: "lender channel", label: "new digital-bank partner integration, sole engineering PIC" },
  { value: "1M", unit: "trades / mo", label: "real-time crypto market data, Elixir + Kafka" },
  { value: "11", unit: "services", label: "bank & merchant integrations for jurnal.id" },
  { value: "Rp 1B", unit: "recorded", label: "in shared family wallets on Sedompet" },
];

const spec: [string, React.ReactNode][] = [
  ["role", "Senior Software Engineer"],
  ["org", "Kredivo — lending infrastructure"],
  ["region", "Jakarta, ID (UTC+7)"],
  ["runtime", "Ruby · Elixir · Go · Node.js"],
  ["storage", "PostgreSQL · MySQL · Redis · Kafka"],
  ["uptime", <Uptime key="u" />],
];

/** Show an image only if its file was added to /public. */
const hasPublic = (src: string) =>
  fs.existsSync(path.join(process.cwd(), "public", src));

export default function Home() {
  const posts = getSortedPostsData();
  const allTags = getAllTags();
  const champImg = [championship.photo, championship.certificate].find(hasPublic);
  const issuers = certifications.reduce<Record<string, number>>((acc, c) => {
    acc[c.issuer] = (acc[c.issuer] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <>
      {/* ── Hero ── */}
      <section className={`wrap ${styles.hero}`}>
        <div className={styles.heroTop}>
          <div>
            <p className={`label boot ${styles.kicker}`}>
              <span className="signal">$</span> whoami
            </p>
            <h1 className={`boot ${styles.headline}`} style={{ ["--d" as string]: "80ms" }}>
              I build the systems <span className="signal">money</span> moves
              through.
            </h1>
            <p className={`boot ${styles.lede}`} style={{ ["--d" as string]: "160ms" }}>
              Muhammad Rahmatullah. Backend engineer since 2017 — lender
              integrations, data pipelines and event streams for fintech,
              crypto and SaaS. I write the RFC, ship it, then make it fast.
            </p>
            <div className={`boot ${styles.ctas}`} style={{ ["--d" as string]: "240ms" }}>
              <Link href="/blog" className="btn btn--primary">
                Read the RFCs →
              </Link>
              <a href="/resume.pdf" className="btn" download>
                resume.pdf ↓
              </a>
            </div>
          </div>

          <dl className={`panel boot ${styles.spec}`} style={{ ["--d" as string]: "200ms" }}>
            <div className="panel-bar">
              <span>
                <b>node</b> / m.rahmatullah
              </span>
              <span>
                <span className="led" />
                healthy
              </span>
            </div>
            {spec.map(([k, v]) => (
              <div key={k} className={styles.specRow}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="boot" style={{ ["--d" as string]: "320ms" }}>
          <SystemMap />
        </div>
      </section>

      {/* ── Benchmarks ── */}
      <section className="wrap section">
        <Reveal className="sec-head">
          <span>
            <b>§01</b>benchmarks
          </span>
          <span>production numbers</span>
        </Reveal>
        <Reveal as="h2" className="sec-title">
          Measured, <span className="dim">not claimed.</span>
        </Reveal>
        <Reveal>
          <Benchmarks />
        </Reveal>
        <Reveal className={styles.load}>
          {load.map((l) => (
            <div key={l.label} className={styles.loadCell}>
              <p className={styles.loadValue}>
                {l.value} <span>{l.unit}</span>
              </p>
              <p className={styles.loadLabel}>{l.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── RFCs ── */}
      <section className="wrap section" style={{ paddingTop: 0 }}>
        <Reveal className="sec-head">
          <span>
            <b>§02</b>case studies
          </span>
          <Link href="/blog" className="link-line">
            all {posts.length} →
          </Link>
        </Reveal>
        <Reveal as="h2" className="sec-title">
          Written like RFCs. <span className="dim">Context, trade-offs, results.</span>
        </Reveal>
        <Reveal>
          <WorkIndex posts={posts} allTags={allTags} />
        </Reveal>
      </section>

      {/* ── Deploy log ── */}
      <section className="wrap section" style={{ paddingTop: 0 }}>
        <Reveal className="sec-head">
          <span>
            <b>§03</b>deploy history
          </span>
          <Link href="/about" className="link-line">
            full changelog →
          </Link>
        </Reveal>
        <Reveal as="h2" className="sec-title">
          Since 2017. <span className="dim">Five releases.</span>
        </Reveal>
        <Reveal className={`panel ${styles.deploys}`}>
          <div className="panel-bar">
            <span>
              <b>git log</b> --career --oneline
            </span>
            <span>2017 → now</span>
          </div>
          <ol>
            {experiences.map((e, i) => {
              const current = i === 0;
              return (
                <li key={e.company}>
                  <Link href={`/about#${e.slug}`} className={styles.deploy}>
                    <span className={styles.ver}>
                      v{experiences.length - i}.0
                    </span>
                    <span className={styles.period}>{e.period}</span>
                    <span className={styles.company}>{e.company}</span>
                    <span className={styles.role}>
                      {e.role}
                      <span className={styles.stack}>{e.stack}</span>
                    </span>
                    <span className={styles.state}>
                      {current ? (
                        <span className="chip chip--ok">
                          <span className="led" />
                          running
                        </span>
                      ) : (
                        <span className={styles.retired}>shipped</span>
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
            <li>
              <a href="#off-duty" className={`${styles.deploy} ${styles.deployPre}`}>
                <span className={styles.ver}>v0.1</span>
                <span className={styles.period}>{championship.date}</span>
                <span className={styles.company}>{championship.game}</span>
                <span className={styles.role}>
                  National esports champion, while still in school
                  <span className={styles.stack}>{championship.event}</span>
                </span>
                <span className={styles.state}>
                  <span className="chip chip--signal">#1</span>
                </span>
              </a>
            </li>
          </ol>
          <p className={styles.deployFoot}>
            + MBA, Bandung Institute of Technology · Engineering Excellence
            Award, Kredivo · {talks.length - 1} talks · 30 mentees ·{" "}
            {certifications.length} certifications
          </p>
        </Reveal>
      </section>
      {/* ── Off duty ── */}
      <section id="off-duty" className="wrap section" style={{ paddingTop: 0 }}>
        <Reveal className="sec-head">
          <span>
            <b>§04</b>off the keyboard
          </span>
          <Link href="/about" className="link-line">
            talks &amp; certs →
          </Link>
        </Reveal>
        <Reveal as="h2" className="sec-title">
          Speaker, mentor, <span className="dim">and a national champion in 2012.</span>
        </Reveal>

        <div className={styles.off}>
          <Reveal className={`panel ${styles.champ}`}>
            <div className="panel-bar">
              <span>
                <b>achievement.log</b> / {championship.year}
              </span>
              <span className="signal">unlocked</span>
            </div>
            {champImg && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={champImg}
                alt={`${championship.game} national championship ${championship.year}`}
                className={styles.champImg}
              />
            )}
            <div className={styles.champBody}>
              <p className={styles.champRank}>#1</p>
              <div>
                <h3 className={styles.champTitle}>
                  National champion — {championship.game}
                </h3>
                <p className={styles.champSub}>
                  Won {championship.event} with a {championship.team}, before I
                  ever wrote a line of production code. Still in school.
                </p>
              </div>
            </div>
            <dl className={styles.champStats}>
              <div>
                <dt>event</dt>
                <dd>{championship.event}</dd>
              </div>
              <div>
                <dt>organizer</dt>
                <dd>{championship.organizer}</dd>
              </div>
              <div>
                <dt>prize</dt>
                <dd className="signal">{championship.prize}</dd>
              </div>
              <div>
                <dt>date</dt>
                <dd>{championship.date}</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal className={`panel ${styles.talks}`} delay={80}>
            <div className="panel-bar">
              <span>
                <b>talks</b> / speaking &amp; mentoring
              </span>
              <span className="num">{talks.length}</span>
            </div>
            <ol>
              {talks.map((t) => (
                <li key={t.title}>
                  <a href={t.href} target="_blank" rel="noopener noreferrer">
                    <span className={styles.ver}>{t.year}</span>
                    <span>
                      <span className={styles.talkTitle}>{t.title}</span>
                      <span className={styles.stack}>{t.where}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className={`panel ${styles.certs}`} delay={160}>
            <div className="panel-bar">
              <span>
                <b>certs</b> / verified credentials
              </span>
              <span>
                {Object.entries(issuers)
                  .map(([k, v]) => `${k} ×${v}`)
                  .join(" · ")}
              </span>
            </div>
            <ul>
              {certifications.map((c) => (
                <li key={c.href}>
                  <a href={c.href} target="_blank" rel="noopener noreferrer">
                    <span className={styles.check}>✓</span>
                    <span>{c.name}</span>
                    <span className={styles.stack}>
                      {c.issuer} · {c.year}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
