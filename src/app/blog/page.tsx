/** @format */

import type { Metadata } from "next";
import WorkIndex from "@/components/WorkIndex";
import { getAllTags, getSortedPostsData } from "@/lib/posts";
import styles from "../pages.module.css";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Engineering case studies and professional highlights.",
};

export default function BlogIndex() {
  const posts = getSortedPostsData();
  const allTags = getAllTags();

  return (
    <div className="wrap">
      <header className={styles.head}>
        <div className={`${styles.kicker} boot`}>
          <span className="label">
            <span className="signal">$</span> ls ./docs/rfc
          </span>
          <span className="label">{posts.length} documents</span>
        </div>
        <h1 className={`${styles.title} boot`} style={{ ["--d" as string]: "80ms" }}>
          Case studies, <span className="dim">written as RFCs.</span>
        </h1>
        <p className={`${styles.lede} boot`} style={{ ["--d" as string]: "160ms" }}>
          Problems, constraints, trade-offs and results from my engineering
          work: what was slow, what was risky, and what I did about it.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="muted">No posts yet.</p>
      ) : (
        <div className="boot" style={{ ["--d" as string]: "240ms" }}>
          <WorkIndex posts={posts} allTags={allTags} />
        </div>
      )}
    </div>
  );
}
