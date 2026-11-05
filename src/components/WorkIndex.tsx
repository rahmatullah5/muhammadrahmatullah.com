/** @format */

"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { PostData } from "@/lib/posts";
import styles from "./WorkIndex.module.css";

type WorkIndexProps = {
  posts: PostData[];
  allTags?: string[];
};

/**
 * Numbered, big-type index of case studies. On fine pointers a preview card
 * (headline metric + excerpt) trails the cursor over the hovered row.
 */
export default function WorkIndex({ posts, allTags = [] }: WorkIndexProps) {
  const [activeTag, setActiveTag] = useState("All");
  const [hovered, setHovered] = useState<PostData | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeTag === "All"
      ? posts
      : posts.filter((p) => p.tags?.includes(activeTag));

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = previewRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${e.clientX + 28}px, ${e.clientY - 40}px, 0)`;
  };

  const count = (tag: string) =>
    tag === "All"
      ? posts.length
      : posts.filter((p) => p.tags?.includes(tag)).length;

  return (
    <div>
      {allTags.length > 0 && (
        <div className={styles.filters} role="group" aria-label="Filter work">
          {["All", ...allTags].map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`${styles.filter} ${activeTag === tag ? styles.active : ""}`}
              aria-pressed={activeTag === tag}
            >
              {tag}
              <sup>{count(tag)}</sup>
            </button>
          ))}
        </div>
      )}

      <ol
        className={styles.list}
        onPointerMove={onMove}
        onPointerLeave={() => setHovered(null)}
      >
        {filtered.map((post, i) => (
          <li key={post.id} className={styles.item}>
            <Link
              href={`/blog/${post.id}`}
              className={styles.row}
              data-cursor="Read"
              onPointerEnter={() => setHovered(post)}
            >
              <span className={styles.num}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.main}>
                <span className={styles.title}>{post.title}</span>
                {post.excerpt && (
                  <span className={styles.excerpt}>{post.excerpt}</span>
                )}
              </span>
              <span className={styles.tags}>
                {post.tags?.slice(0, 3).map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </span>
              <span className={styles.year}>{post.date.slice(0, 4)}</span>
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div
        ref={previewRef}
        className={`${styles.preview} ${hovered ? styles.previewOn : ""}`}
        aria-hidden="true"
      >
        {hovered && (
          <div className={styles.card}>
            {hovered.highlight && (
              <div className={styles.metric}>{hovered.highlight}</div>
            )}
            {hovered.highlightLabel && (
              <div className="label">{hovered.highlightLabel}</div>
            )}
            <p className={styles.cardText}>{hovered.excerpt}</p>
          </div>
        )}
      </div>
    </div>
  );
}
