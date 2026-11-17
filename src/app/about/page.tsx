/** @format */

import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { certifications, championship, experiences, talks } from "@/lib/career";
import styles from "../pages.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Experience, speaking, open source, and skills of Muhammad Rahmatullah — Senior Software Engineer at Kredivo.",
};


const openSource = [
  {
    name: "ifme",
    desc: "Mental health communication web app for sharing experiences with loved ones.",
    href: "https://github.com/ifmeorg/ifme",
  },
  {
    name: "EBWiki",
    desc: "Repository of police abuse cases against people of color.",
    href: "https://github.com/EBWiki/EBWiki",
  },
  {
    name: "twirp-elixir",
    desc: "Elixir implementation of the Twirp RPC framework.",
    href: "https://github.com/keathley/twirp-elixir",
  },
];


const education = [
  {
    school: "Bandung Institute of Technology",
    degree: "Master of Business Administration",
    period: "2022–2024",
    detail: "GPA 3.70",
  },
  {
    school: "Widyatama University",
    degree: "Bachelor of Information Systems",
    period: "2017–2021",
    detail: "Cum laude, GPA 3.72",
  },
];

const skills = [
  "Ruby",
  "Ruby on Rails",
  "Elixir",
  "Phoenix",
  "JavaScript",
  "Node.js",
  "React.js",
  "SQL",
  "NoSQL",
  "AWS",
  "Google API",
  "RabbitMQ",
  "Apache Kafka",
  "Redis",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Heroku",
  "Git",
  "Docker",
  "CI/CD",
  "New Relic",
  "Datadog",
  "Bash",
];

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const Label = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <div className={styles.splitLabel}>
    <span className="label">
      <b>§{n}</b>
    </span>
    <h2>{children}</h2>
  </div>
);

export default function AboutPage() {
  return (
    <div className="wrap">
      <header className={styles.head}>
        <div className={`${styles.kicker} boot`}>
          <span className="label">
            <span className="signal">$</span> cat ./about.md
          </span>
          <span className="label">Jakarta, ID · since 2017</span>
        </div>
        <h1 className={`${styles.title} boot`} style={{ ["--d" as string]: "80ms" }}>
          Make it work, <span className="dim">then make it fast.</span>
        </h1>
        <div className="boot" style={{ ["--d" as string]: "160ms" }}>
          <p className={styles.lede}>
            Senior Software Engineer at Kredivo. I lead lender integrations,
            speed up data pipelines, and build the internal tools that move
            loans — and I&rsquo;ve spent years before that on real-time crypto
            data at Stockbit and banking microservices at Mekari. Off the
            keyboard I speak, mentor, and hold an MBA from ITB.
          </p>
          <div className={styles.ctas}>
            <a href="/resume.pdf" className="btn btn--primary" download>
              resume.pdf ↓
            </a>
          </div>
        </div>
      </header>

      <section className={styles.split}>
        <Label n="01">Changelog</Label>
        <div>
          {experiences.map((exp, i) => (
            <Reveal key={exp.company} className={styles.job}>
              <div id={exp.slug} className={styles.jobBar}>
                <span>
                  <b>v{experiences.length - i}.0</b>
                  {exp.period}
                </span>
                <span>{exp.type}</span>
              </div>
              <div className={styles.jobBody}>
                <h3 className={styles.jobCompany}>
                  {exp.href ? (
                    <a href={exp.href} {...ext}>
                      {exp.company} ↗
                    </a>
                  ) : (
                    exp.company
                  )}
                </h3>
                <p className={styles.jobRole}>{exp.role}</p>
                <p className={styles.jobStack}>{exp.stack}</p>
                <ul className={styles.bullets}>
                  {exp.description.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.split}>
        <Label n="02">Speaking &amp; mentoring</Label>
        <Reveal as="ul" className={styles.rows}>
          {talks.map((t) => (
            <li key={t.title}>
              <a href={t.href} {...ext} className={styles.rowLink}>
                <span className="label">{t.year}</span>
                <span>
                  <span className={styles.rowTitle}>{t.title}</span>
                  <span className={styles.rowSub}>{t.where}</span>
                </span>
                <span className={styles.rowArrow} aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </Reveal>
      </section>

      <section className={styles.split}>
        <Label n="03">Open source</Label>
        <Reveal as="ul" className={styles.rows}>
          {openSource.map((o) => (
            <li key={o.name}>
              <a href={o.href} {...ext} className={styles.rowLink}>
                <span className="label">contrib</span>
                <span>
                  <span className={styles.rowTitle}>{o.name}</span>
                  <span className={styles.rowSub}>{o.desc}</span>
                </span>
                <span className={styles.rowArrow} aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </Reveal>
      </section>

      <section className={styles.split}>
        <Label n="04">Dependencies</Label>
        <Reveal className={styles.skills}>
          {skills.map((skill) => (
            <span key={skill} className={styles.skill}>
              {skill}
            </span>
          ))}
        </Reveal>
      </section>

      <section className={styles.split}>
        <Label n="05">Certifications</Label>
        <Reveal as="ul" className={styles.certs}>
          {certifications.map((c) => (
            <li key={c.href}>
              <a href={c.href} {...ext} className={styles.cert}>
                <span className={styles.certName}>{c.name}</span>
                <span className="label">
                  {c.issuer} · {c.year}
                </span>
              </a>
            </li>
          ))}
        </Reveal>
      </section>

      <section className={styles.split}>
        <Label n="06">Education</Label>
        <div>
          {education.map((edu) => (
            <Reveal key={edu.school} className={styles.edu}>
              <h3 className={styles.eduSchool}>{edu.school}</h3>
              <span className="label">{edu.period}</span>
              <p>
                {edu.degree} <span className="muted">— {edu.detail}</span>
              </p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className={styles.split}>
        <Label n="07">Before engineering</Label>
        <Reveal className={styles.edu}>
          <h3 className={styles.eduSchool}>
            National champion — {championship.game}
          </h3>
          <span className="label">{championship.date}</span>
          <p>
            Won {championship.event}, organized by {championship.organizer},
            with a {championship.team} while still in school.{" "}
            <span className="muted">Prize: {championship.prize}.</span>
          </p>
        </Reveal>
      </section>
    </div>
  );
}
