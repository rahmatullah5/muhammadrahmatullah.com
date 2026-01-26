/** @format */

"use client";

import Link from "next/link";
import { useState } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";

const projects = [
  {
    title: "Screener V2",
    description:
      "Advanced stock screening tool with real-time data and automated recommendations.",
    tech: ["Go", "PostgreSQL", "React"],
    category: "Full Stack",
    link: "#",
    github: "#",
  },
  {
    title: "Trade Bot",
    description:
      "Automated trading bot integrated with Telegram for notifications and control.",
    tech: ["Go", "Telegram API", "Redis"],
    category: "DevOps",
    link: "#",
    github: "#",
  },
  {
    title: "E-Commerce Platform",
    description:
      "Scalable e-commerce solution with microservices architecture.",
    tech: ["TypeScript", "Next.js", "NestJS"],
    category: "Full Stack",
    link: "#",
    github: "#",
  },
  {
    title: "Expense Tracker App",
    description:
      "Mobile application for tracking personal finances with chart visualizations.",
    tech: ["React Native", "Firebase"],
    category: "Mobile",
    link: "#",
    github: "#",
  },
];

const categories = ["All", "Full Stack", "DevOps", "Mobile"];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter(
    (project) =>
      activeCategory === "All" || project.category === activeCategory,
  );

  return (
    <section className="container py-8">
      <h2 className="mb-8">Selected Work</h2>

      <div className="flex gap-4 mb-8" style={{ flexWrap: "wrap" }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`btn ${
              activeCategory === category ? "" : "btn-outline"
            }`}
            style={{
              borderRadius: "var(--radius)",
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        {filteredProjects.map((project) => (
          <div
            key={project.title}
            style={{
              padding: "1.5rem",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
              backgroundColor: "var(--card-background)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            className="group"
          >
            <h3 style={{ marginBottom: "0.5rem" }}>{project.title}</h3>
            <p className="text-secondary" style={{ marginBottom: "1.5rem" }}>
              {project.description}
            </p>
            <div className="flex gap-2 mb-8" style={{ flexWrap: "wrap" }}>
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "0.875rem",
                    padding: "0.25rem 0.75rem",
                    backgroundColor: "var(--background-secondary)",
                    borderRadius: "999px",
                    color: "var(--foreground)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <Link
                href={project.link}
                className="flex items-center gap-2 text-secondary hover:text-primary"
              >
                <FiExternalLink /> Demo
              </Link>
              <Link
                href={project.github}
                className="flex items-center gap-2 text-secondary hover:text-primary"
              >
                <FiGithub /> Code
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
