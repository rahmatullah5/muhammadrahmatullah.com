/** @format */

import type { Metadata } from "next";
import { FiDownload } from "react-icons/fi";

export const metadata: Metadata = {
  title: "About | Muhammad Rahmatullah",
  description: "Professional experience and skills of Muhammad Rahmatullah.",
};

const experiences = [
  {
    company: "Kredivo",
    role: "Senior Full-stack Engineer",
    period: "Dec 2023 – Present",
    type: "Remote, Full-time",
    description: [
      "Led the optimization of the Data Ingestion process, reducing execution time from 10 minutes to 20 seconds.",
      "Optimized internal tool build times and Bitbucket pipelines, reducing build size by 50% and improving speed by 50%.",
      "Developed and maintained internal tools for loan management using Node.js, React.js, and MySQL.",
    ],
  },
  {
    company: "Stockbit",
    role: "Senior Backend Engineer",
    period: "Dec 2021 – Dec 2023",
    type: "Remote, Full-time",
    description: [
      "Led development of invitation code service handling initial 1000 users for crypto.stockbit.com.",
      "Developed real-time crypto market data aggregator processing 1 million monthly trades using Elixir, Phoenix, Kafka, and Redis.",
      "Created comprehensive RFCs and technical documentation.",
      "Implemented GitLab CI pipelines for automated testing and auditing.",
    ],
  },
  {
    company: "Mekari",
    role: "Software Engineer 2",
    period: "June 2020 – Dec 2021",
    type: "Remote, Full-time",
    description: [
      "Developed 11 Microservices integrating with bank and merchant APIs using AWS, Lambda, Rails, and Java.",
      "Built internal monitoring tools reducing customer issues by 80%.",
      "Won third place in internal hackathon with an e-signature application.",
    ],
  },
  {
    company: "Clapping Ape",
    role: "Backend Engineer",
    period: "July 2019 – Mar 2020",
    type: "Bandung, Full-time",
    description: [
      "Developed microservices and maintained jagadiri.co.id using AWS and Rails.",
      "Designed numerous applications improving general performance.",
    ],
  },
  {
    company: "41 Studio",
    role: "Ruby on Rails Engineer",
    period: "Jun 2017 – July 2019",
    type: "Cimahi, Full-time",
    description: [
      "Refactored video service backend API reducing overhead by 50%.",
      "Developed user-friendly software applications.",
    ],
  },
];

const education = [
  {
    school: "Bandung Institute of Technology",
    degree: "Master of Business Administration",
    period: "2022-2024",
    detail: "GPA 3.70",
  },
  {
    school: "Widyatama University",
    degree: "Bachelor of Information Systems",
    period: "2017-2021",
    detail: "Cumlaude, GPA 3.72",
  },
];

const skills = [
  "Ruby",
  "Ruby on Rails",
  "Elixir",
  "Phoenix",
  "JavaScript",
  "TypeScript",
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
  "Docker",
  "CI/CD",
  "Bash",
];

export default function AboutPage() {
  return (
    <div className="container py-8">
      <section className="mb-8 flex justify-between items-start gap-4 flex-wrap">
        <div>
          <h1>About Me</h1>
          <p className="text-secondary" style={{ fontSize: "1.1rem" }}>
            Senior Full-stack Engineer with a strong background in optimizing
            high-scale systems and developing robust microservices. Experienced
            in leading technical initiatives and mentoring teams.
          </p>
        </div>
        <a
          href="/resume.pdf"
          target="_blank"
          className="btn btn-outline flex items-center gap-2"
          download
        >
          <FiDownload /> Download CV
        </a>
      </section>

      <div style={{ display: "grid", gap: "4rem" }}>
        {/* Experience Section */}
        <section>
          <h2 className="mb-8">Experience</h2>
          <div className="flex flex-col gap-4">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                style={{
                  borderLeft: "2px solid var(--border)",
                  paddingLeft: "1.5rem",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "-6px",
                    top: "0",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "var(--foreground)",
                  }}
                />
                <h3 style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>
                  {exp.role}
                </h3>
                <div
                  className="flex justify-between items-center text-secondary"
                  style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}
                >
                  <span>{exp.company}</span>
                  <span>{exp.period}</span>
                </div>
                <ul
                  style={{ listStyle: "disc", paddingLeft: "1rem" }}
                  className="text-secondary"
                >
                  {exp.description.map((item, i) => (
                    <li key={i} style={{ marginBottom: "0.25rem" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <h2>Skills</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {skills.map((skill) => (
              <span
                key={skill}
                style={{
                  padding: "0.25rem 0.75rem",
                  backgroundColor: "var(--border)",
                  borderRadius: "999px",
                  fontSize: "0.9rem",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section>
          <h2>Education</h2>
          <div className="flex flex-col gap-4">
            {education.map((edu, idx) => (
              <div key={idx}>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>
                  {edu.school}
                </h3>
                <p className="text-secondary">{edu.degree}</p>
                <div
                  className="flex justify-between text-secondary"
                  style={{ fontSize: "0.9rem" }}
                >
                  <span>{edu.detail}</span>
                  <span>{edu.period}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
