/** @format */

"use client";

import Link from "next/link";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { PostData } from "@/lib/posts";

interface PortfolioProps {
  posts: PostData[];
  allTags: string[];
}

const Portfolio = ({ posts, allTags }: PortfolioProps) => {
  const [activeTag, setActiveTag] = useState("All");

  const filteredPosts =
    activeTag === "All"
      ? posts
      : posts.filter((post) => post.tags?.includes(activeTag));

  return (
    <section className="container py-8">
      <h2 className="mb-8">Selected Work</h2>

      <div className="flex gap-4 mb-8" style={{ flexWrap: "wrap" }}>
        <button
          onClick={() => setActiveTag("All")}
          className={`btn ${activeTag === "All" ? "" : "btn-outline"}`}
          style={{
            borderRadius: "999px",
            padding: "0.4rem 1rem",
            cursor: "pointer",
            fontSize: "0.875rem",
          }}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`btn ${activeTag === tag ? "" : "btn-outline"}`}
            style={{
              borderRadius: "999px",
              padding: "0.4rem 1rem",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            {tag}
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
        {filteredPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                padding: "1.5rem",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
                backgroundColor: "var(--card-background)",
                transition: "transform 0.2s, box-shadow 0.2s",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3 style={{ marginBottom: "0.5rem" }}>{post.title}</h3>
              <time
                className="text-secondary"
                style={{ fontSize: "0.875rem", marginBottom: "0.75rem" }}
              >
                {post.date}
              </time>
              {post.tags && (
                <div
                  className="flex gap-2"
                  style={{
                    flexWrap: "wrap",
                    marginBottom: "0.75rem",
                  }}
                >
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "0.75rem",
                        padding: "0.15rem 0.5rem",
                        backgroundColor: "var(--background-secondary)",
                        border: "1px solid var(--border)",
                        borderRadius: "999px",
                        color: "var(--secondary)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {post.excerpt && (
                <p
                  className="text-secondary"
                  style={{ marginBottom: "1.5rem", flex: 1 }}
                >
                  {post.excerpt}
                </p>
              )}
              <span
                className="flex items-center gap-2 text-primary"
                style={{ fontSize: "0.9rem", fontWeight: 500 }}
              >
                Read more <FiArrowRight />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
