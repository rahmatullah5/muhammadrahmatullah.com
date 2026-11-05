/** @format */

import type { Metadata } from "next";
import WorkIndex from "@/components/WorkIndex";
import { getAllTags, getSortedPostsData } from "@/lib/posts";
import styles from "../pages.module.css";

export const metadata: Metadata = {
  title: "Case Studies | Muhammad Rahmatullah",
  description: "Engineering case studies and professional highlights.",
};

export default function BlogIndex() {
  const posts = getSortedPostsData();
  const allTags = getAllTags();

  return (
    <div className="wrap">
      <header className={styles.head}>
        <div className={`${styles.kicker} fade-in`} style={{ ["--d" as string]: "0ms" }}>
          <span className="label">(Work)</span>
          <span className="label">{posts.length} case studies</span>
        </div>
        <h1 className={styles.title}>
          <span className="mask" style={{ ["--i" as string]: 0 }}>
            <span>Case</span>
          </span>
          <span className="mask" style={{ ["--i" as string]: 1 }}>
            <span>
              <em>studies</em>
              <span className="accent">.</span>
            </span>
          </span>
        </h1>
        <p className={`${styles.lede} fade-in`} style={{ ["--d" as string]: "500ms" }}>
          Problems, constraints, trade-offs and results from my engineering
          work: what was slow, what was risky, and what I did about it.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="muted">No posts yet.</p>
      ) : (
        <div className="fade-in" style={{ ["--d" as string]: "700ms" }}>
          <WorkIndex posts={posts} allTags={allTags} />
        </div>
      )}
    </div>
  );
}
