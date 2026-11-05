/** @format */

import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import styles from "../pages.module.css";

export const metadata: Metadata = {
  title: "About | Muhammad Rahmatullah",
  description:
    "Experience, speaking, open source, and skills of Muhammad Rahmatullah — Senior Software Engineer at Kredivo.",
};

const experiences = [
  {
    company: "Kredivo",
    href: "https://kredivo.com/",
    role: "Senior Software Engineer",
    period: "Dec 2023 – Present",
    type: "Jakarta, Full-time",
    description: [
      "Led the end-to-end integration of BCA Digital (BCAD) as a new lending partner — a financing channel projected at up to ~IDR 1T annually and up to IDR 300B in annual gross profit.",
      "Led the optimization of the data ingestion process, reducing execution time from 10 minutes to 20 seconds.",
      "Cut the internal tool's build size by up to 50% and its Bitbucket pipeline from 30 minutes to 15 minutes.",
      "Developed and maintained internal tools for loan disbursement, repayment, and cancellation using Node.js, React.js, and MySQL.",
      "Mentored a new engineer through a structured 90-day onboarding program with domain knowledge, technical guidance, and cross-functional support.",
      "Awarded the Engineering Excellence Award for consistently delivering high-quality engineering work.",
    ],
  },
  {
    company: "Stockbit",
    href: "https://stockbit.com/",
    role: "Senior Software Engineer",
    period: "Dec 2021 – Dec 2023",
    type: "Remote, Full-time",
    description: [
      "Led the team building an invitation code service for the first 1,000 users of crypto.stockbit.com (AWS EB, Elixir, Phoenix, Docker, PostgreSQL).",
      "Built a real-time crypto market data aggregator and streaming service processing 1 million monthly trades (Kafka, ZeroMQ, Elixir, Phoenix, Redis, PostgreSQL time-series).",
      "Owned RFCs and technical documentation, including API contracts and high-level diagrams.",
      "Implemented GitLab CI pipelines for every service to automate tests, audits, and Docker image builds.",
    ],
  },
  {
    company: "Mekari",
    href: "https://mekari.com/",
    role: "Software Engineer 2",
    period: "June 2020 – Dec 2021",
    type: "Remote, Full-time",
    description: [
      "Developed 11 microservices integrating bank partner and merchant APIs for jurnal.id (AWS Lambda, Rails, Java, MySQL, MongoDB, RabbitMQ).",
      "Built internal system management and monitoring tools that reduced customer issues by 80%.",
      "Won third place in the internal hackathon with an e-signature application built in Ruby on Rails.",
    ],
  },
  {
    company: "Clapping Ape",
    href: "https://www.clappingape.com/",
    role: "Backend Engineer",
    period: "July 2019 – Mar 2020",
    type: "Bandung, Full-time",
    description: [
      "Developed microservices and maintained jagadiri.co.id, the site of one of Indonesia's largest assurance providers (Heroku, AWS, Rails, MySQL, Redis).",
      "Single-handedly designed and developed numerous applications in Ruby on Rails and PHP, improving general performance.",
    ],
  },
  {
    company: "41 Studio",
    role: "Ruby on Rails Engineer",
    period: "Jun 2017 – July 2019",
    type: "Cimahi, Full-time",
    description: [
      "Refactored an online video service backend API, reducing overhead costs by 50% (AWS, Elastic Transcoder, Firebase Cloud Messaging, Rails, Redis).",
      "Developed numerous applications that increased user-friendliness by 20%.",
    ],
  },
];

const talks = [
  {
    year: "2025",
    title: "Big Data, Smart Solutions: AI Engineers as Digital Innovation Architects",
    where: "Guest speaker for Kredivo at UPN Veteran Jakarta",
    href: "https://drive.google.com/file/d/1SwL81IlnRy8ZsjDxQJNfekKEDUvbDCTn/view?usp=sharing",
  },
  {
    year: "2023",
    title: "Man in the Middle: Mitigation and Prevention",
    where: "Internal Stockbit engineering talk",
    href: "https://drive.google.com/file/d/1aMDppjmW4_RxJKkYq8B2loFpcWUdGGWe/view?usp=sharing",
  },
  {
    year: "2023",
    title: "MySQL and Database",
    where: "Guest speaker for Stockbit at dibimbing.id",
    href: "https://drive.google.com/file/d/1oHBUmL7ONeL2lpHR0dqjnn-DabuwD02l/view?usp=sharing",
  },
  {
    year: "2023",
    title: "Implementation of Coding Principles",
    where: "Guest speaker for Stockbit at Exabytes",
    href: "https://drive.google.com/file/d/1fv7ts4lmPY7maqI1wZg58MPb31lmyaFx/view?usp=sharing",
  },
  {
    year: "2022",
    title: "Build your First RESTful JSON API With Rails and Deploy it to Heroku",
    where: "Guest speaker for Mekari at Exabytes",
    href: "https://drive.google.com/file/d/1CsYOWz-gsy56ErOZEj3qN_IYcnnNiQ8n/view?usp=sharing",
  },
  {
    year: "2021",
    title: "Industrial Trainer & Software Engineer Mentor — 30 mentees",
    where: "Glints, Ministry of Education of Indonesia program",
    href: "https://drive.google.com/file/d/1hvPhPv7u25FCX8VwEPbnK8blpAFj6SbN/view?usp=sharing",
  },
];

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

const certifications = [
  {
    name: "Go: The Complete Developer's Guide",
    issuer: "Udemy",
    year: "2022",
    href: "https://www.udemy.com/certificate/UC-72ed1670-7279-4081-99b4-0b91f8fb7df0/",
  },
  {
    name: "The Complete Elixir and Phoenix Bootcamp",
    issuer: "Udemy",
    year: "2021",
    href: "https://www.udemy.com/certificate/UC-6308ea71-7cd5-4c90-903f-c7cf49f4ed92/",
  },
  {
    name: "Elixir and Phoenix: Real World Functional Programming",
    issuer: "Udemy",
    year: "2021",
    href: "https://www.udemy.com/certificate/UC-9ea703e1-a418-4628-b90b-363a6bb527ff/",
  },
  {
    name: "Intermediate REST API",
    issuer: "HackerRank",
    year: "2020",
    href: "https://www.hackerrank.com/certificates/5b16f2fd017f",
  },
  {
    name: "Intermediate SQL",
    issuer: "HackerRank",
    year: "2020",
    href: "https://www.hackerrank.com/certificates/cac48d534ec9",
  },
  {
    name: "Basic SQL",
    issuer: "HackerRank",
    year: "2020",
    href: "https://www.hackerrank.com/certificates/147a1c7215fe",
  },
  {
    name: "Intermediate Problem Solving",
    issuer: "HackerRank",
    year: "2020",
    href: "https://www.hackerrank.com/certificates/1299660001f6",
  },
  {
    name: "Basic Problem Solving",
    issuer: "HackerRank",
    year: "2020",
    href: "https://www.hackerrank.com/certificates/e2fe9c34db3f",
  },
  {
    name: "Intermediate Ruby",
    issuer: "HackerRank",
    year: "2020",
    href: "https://www.hackerrank.com/certificates/3fdf1cdfdf27",
  },
  {
    name: "Basic Ruby",
    issuer: "HackerRank",
    year: "2020",
    href: "https://www.hackerrank.com/certificates/68285779e01a",
  },
  {
    name: "Basic JavaScript",
    issuer: "HackerRank",
    year: "2020",
    href: "https://www.hackerrank.com/certificates/29127d26366e",
  },
  {
    name: "Basic Java",
    issuer: "HackerRank",
    year: "2020",
    href: "https://www.hackerrank.com/certificates/38c9dd02a41f",
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

export default function AboutPage() {
  return (
    <div className="wrap">
      <header className={styles.head}>
        <div
          className={`${styles.kicker} fade-in`}
          style={{ ["--d" as string]: "0ms" }}
        >
          <span className="label">(About)</span>
          <span className="label">Jakarta, ID — since 2017</span>
        </div>
        <h1 className={styles.title}>
          <span className="mask" style={{ ["--i" as string]: 0 }}>
            <span>Make it work,</span>
          </span>
          <span className="mask" style={{ ["--i" as string]: 1 }}>
            <span>
              then make it <em className="accent">fast.</em>
            </span>
          </span>
        </h1>
        <div className="fade-in" style={{ ["--d" as string]: "600ms" }}>
          <p className={styles.lede}>
            Senior Software Engineer at Kredivo. I lead lender integrations,
            speed up data pipelines, and build the internal tools that move
            loans — and I&rsquo;ve spent years before that on real-time crypto
            data at Stockbit and banking microservices at Mekari. Off the
            keyboard I speak, mentor, and hold an MBA from ITB.
          </p>
          <div style={{ marginTop: 28 }}>
            <a href="/resume.pdf" className="pill pill--solid" download>
              Download CV ↓
            </a>
          </div>
        </div>
      </header>

      <section className={styles.split}>
        <div className={styles.splitLabel}>
          <span className="label">(01)</span>
          <h2>Experience</h2>
        </div>
        <div>
          {experiences.map((exp) => (
            <Reveal key={exp.company} className={styles.job}>
              <div className={styles.jobPeriod}>
                {exp.period}
                <br />
                {exp.type}
              </div>
              <div>
                <h3 className={styles.jobCompany}>
                  {exp.href ? (
                    <a href={exp.href} {...ext}>
                      {exp.company}
                    </a>
                  ) : (
                    exp.company
                  )}
                </h3>
                <p className={styles.jobRole}>{exp.role}</p>
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
        <div className={styles.splitLabel}>
          <span className="label">(02)</span>
          <h2>Speaking &amp; mentoring</h2>
        </div>
        <ul className={styles.rows}>
          {talks.map((t) => (
            <Reveal as="li" key={t.title}>
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
            </Reveal>
          ))}
        </ul>
      </section>

      <section className={styles.split}>
        <div className={styles.splitLabel}>
          <span className="label">(03)</span>
          <h2>Open source</h2>
        </div>
        <ul className={styles.rows}>
          {openSource.map((o) => (
            <Reveal as="li" key={o.name}>
              <a href={o.href} {...ext} className={styles.rowLink}>
                <span className="label">Contrib.</span>
                <span>
                  <span className={styles.rowTitle}>{o.name}</span>
                  <span className={styles.rowSub}>{o.desc}</span>
                </span>
                <span className={styles.rowArrow} aria-hidden="true">
                  ↗
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className={styles.split}>
        <div className={styles.splitLabel}>
          <span className="label">(04)</span>
          <h2>Toolbox</h2>
        </div>
        <Reveal as="p" className={styles.skills}>
          {skills.map((skill, i) => (
            <span key={skill} className={styles.skill}>
              {skill}
              {i < skills.length - 1 && (
                <span className={styles.slash}> /</span>
              )}
            </span>
          ))}
        </Reveal>
      </section>

      <section className={styles.split}>
        <div className={styles.splitLabel}>
          <span className="label">(05)</span>
          <h2>Certifications</h2>
        </div>
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
        <div className={styles.splitLabel}>
          <span className="label">(06)</span>
          <h2>Education</h2>
        </div>
        <div>
          {education.map((edu) => (
            <Reveal key={edu.school} className={styles.edu}>
              <h3 className={styles.eduSchool}>{edu.school}</h3>
              <span className="label" style={{ paddingTop: "0.6em" }}>
                {edu.period}
              </span>
              <p>
                {edu.degree} <span className="muted">— {edu.detail}</span>
              </p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
