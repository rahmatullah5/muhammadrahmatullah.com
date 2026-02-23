/** @format */

import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Muhammad Rahmatullah",
  description: "Engineering case studies and professional highlights.",
};

export default function BlogIndex() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="container py-8">
      <h1 className="mb-8">Case Studies</h1>
      <p className="text-secondary mb-8" style={{ fontSize: "1.1rem" }}>
        Case studies and highlights from my engineering work.
      </p>
      {allPostsData.length === 0 ? (
        <p className="text-secondary">No posts yet.</p>
      ) : (
        <div className="flex flex-col" style={{ gap: "2.5rem" }}>
          {allPostsData.map(({ id, date, title, excerpt }) => (
            <Link
              key={id}
              href={`/blog/${id}`}
              style={{ textDecoration: "none" }}
            >
              <article
                style={{
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: "2rem",
                }}
              >
                <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                  {title}
                </h2>
                <time
                  className="text-secondary"
                  style={{ fontSize: "0.875rem" }}
                >
                  {date}
                </time>
                {excerpt && (
                  <p
                    className="text-secondary"
                    style={{ marginTop: "0.75rem", marginBottom: 0 }}
                  >
                    {excerpt}
                  </p>
                )}
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
