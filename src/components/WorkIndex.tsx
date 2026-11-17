/** @format */

"use client";

import Link from "next/link";
import { useState } from "react";
import { PostData } from "@/lib/posts";
import styles from "./WorkIndex.module.css";

type WorkIndexProps = {
  posts: PostData[];
  allTags?: string[];
  limit?: number;
};

/** Case studies as an RFC index: number, title, status, headline metric. */
export default function WorkIndex({ posts, allTags = [], limit }: WorkIndexProps) {
  const [activeTag, setActiveTag] = useState("all");

  // Oldest post is RFC-001; numbers stay stable while filtering.
  const numbered = posts.map((p, i) => ({
    ...p,
    rfc: `RFC-${String(posts.length - i).padStart(3, "0")}`,
  }));

  const filtered = (
    activeTag === "all"
      ? numbered
      : numbered.filter((p) => p.tags?.includes(activeTag))
  ).slice(0, limit);

  // Only tags shared by 2+ studies are worth a filter button.
  const filterTags = allTags.filter(
    (t) => posts.filter((p) => p.tags?.includes(t)).length > 1,
  );

  const count = (tag: string) =>
    tag === "all"
      ? posts.length
      : posts.filter((p) => p.tags?.includes(tag)).length;

  return (
    <div className={`panel ${styles.panel}`}>
      <div className="panel-bar">
        <span>
          <b>docs/rfc</b> / design docs &amp; postmortems
        </span>
        <span className="num">{filtered.length} rows</span>
      </div>

      {filterTags.length > 0 && (
        <div className={styles.filters} role="group" aria-label="Filter by tag">
          <span className={styles.prompt}>filter:</span>
          {["all", ...filterTags].map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`${styles.filter} ${
                activeTag === tag ? styles.active : ""
              }`}
              aria-pressed={activeTag === tag}
            >
              {tag.toLowerCase()}
              <sup>{count(tag)}</sup>
            </button>
          ))}
        </div>
      )}

      <div className={styles.head} aria-hidden="true">
        <span>id</span>
        <span>title</span>
        <span>status</span>
        <span className={styles.right}>headline</span>
      </div>

      <ol className={styles.list}>
        {filtered.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`} className={styles.row}>
              <span className={styles.id}>{post.rfc}</span>
              <span className={styles.main}>
                <span className={styles.title}>{post.title}</span>
                {post.excerpt && (
                  <span className={styles.excerpt}>{post.excerpt}</span>
                )}
                <span className={styles.tags}>
                  <span className={styles.date}>{post.date.slice(0, 7)}</span>
                  {post.tags?.slice(0, 3).map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </span>
              </span>
              <span className={styles.status}>
                {post.status && (
                  <span
                    className={`chip ${
                      post.status === "Live" ? "chip--ok" : "chip--signal"
                    }`}
                  >
                    {post.status === "Live" && <span className="led" />}
                    {post.status}
                  </span>
                )}
              </span>
              <span className={styles.metric}>
                {post.highlight && (
                  <span className={styles.metricNum}>{post.highlight}</span>
                )}
                {post.highlightLabel && (
                  <span className={styles.metricLabel}>
                    {post.highlightLabel}
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
