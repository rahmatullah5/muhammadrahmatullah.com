/** @format */

import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { FiArrowRight } from "react-icons/fi";

const Portfolio = () => {
  const posts = getSortedPostsData();

  return (
    <section className="container py-8">
      <h2 className="mb-8">Selected Work</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        {posts.map((post) => (
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
