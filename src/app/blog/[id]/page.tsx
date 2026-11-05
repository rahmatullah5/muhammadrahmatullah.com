/** @format */

import { getAllPostIds, getPostData } from "@/lib/posts";
import { Metadata } from "next";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import ReadingProgress from "@/components/ReadingProgress";
import styles from "../../pages.module.css";

type Params = Promise<{ id: string }>;

const SITE_URL = "https://muhammadrahmatullah.com";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const postData = await getPostData(id);

  const title = postData.title;
  const description =
    postData.excerpt || `Case study: ${postData.title} by Muhammad Rahmatullah`;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      url: `${SITE_URL}/blog/${id}`,
      siteName: "Muhammad Rahmatullah",
      publishedTime: postData.date,
      authors: ["Muhammad Rahmatullah"],
      tags: postData.tags || [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${id}`,
    },
  };
}

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => ({
    id: path.params.id,
  }));
}

export default async function Post({ params }: { params: Params }) {
  const { id } = await params;
  const postData = await getPostData(id);

  // Article JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: postData.title,
    description: postData.excerpt || "",
    datePublished: postData.date,
    author: {
      "@type": "Person",
      name: "Muhammad Rahmatullah",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Muhammad Rahmatullah",
    },
    url: `${SITE_URL}/blog/${id}`,
    keywords: postData.tags?.join(", ") || "",
  };

  return (
    <div className="wrap">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className={styles.head}>
        <div className={`${styles.kicker} fade-in`} style={{ ["--d" as string]: "0ms" }}>
          <Link href="/blog" className="label link-line">
            ← All case studies
          </Link>
          <span className="label">Case study</span>
        </div>
        <h1 className={styles.titleSm}>
          <span className="mask" style={{ ["--i" as string]: 0 }}>
            <span>{postData.title}</span>
          </span>
        </h1>
        {postData.excerpt && (
          <p className={`${styles.lede} fade-in`} style={{ ["--d" as string]: "400ms" }}>
            {postData.excerpt}
          </p>
        )}
        <div className={`${styles.postMeta} fade-in`} style={{ ["--d" as string]: "600ms" }}>
          <div>
            <p className="label">Published</p>
            <time dateTime={postData.date}>
              {format(parseISO(postData.date), "MMMM yyyy")}
            </time>
          </div>
          <div>
            <p className="label">Topics</p>
            <div className={styles.tagRow}>
              {postData.tags?.map((tag: string) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {postData.highlight && (
            <div>
              <p className="label">{postData.highlightLabel || "Headline"}</p>
              <div className={styles.postMetric}>{postData.highlight}</div>
            </div>
          )}
        </div>
      </header>

      <article className={styles.article}>
        <div
          dangerouslySetInnerHTML={{ __html: postData.contentHtml || "" }}
          className="prose"
        />
        <Link href="/blog" className={`${styles.back} pill`}>
          ← Back to all work
        </Link>
      </article>
    </div>
  );
}
