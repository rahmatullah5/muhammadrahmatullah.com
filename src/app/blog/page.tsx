/** @format */

import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Muhammad Rahmatullah",
  description:
    "Thoughts on software engineering, distributed systems, and more.",
};

export default function BlogIndex() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="container py-8">
      <h1 className="mb-8">Blog</h1>
      {allPostsData.length === 0 ? (
        <p className="text-secondary">No posts found.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {allPostsData.map(({ id, date, title }) => (
            <div
              key={id}
              style={{
                borderBottom: "1px solid var(--border)",
                paddingBottom: "2rem",
              }}
            >
              <Link href={`/blog/${id}`} style={{ textDecoration: "none" }}>
                <h2
                  style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}
                  className="hover:underline"
                >
                  {title}
                </h2>
              </Link>
              <small className="text-secondary">{date}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
