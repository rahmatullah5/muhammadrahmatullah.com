/** @format */

import { getAllPostIds, getPostData } from "@/lib/posts";
import { Metadata } from "next";

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
    <div className="container py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <h1 className="mb-4">{postData.title}</h1>
        <div
          className="flex items-center gap-4 text-secondary mb-8"
          style={{ flexWrap: "wrap" }}
        >
          <time dateTime={postData.date}>{postData.date}</time>
          {postData.tags && postData.tags.length > 0 && (
            <>
              <span style={{ color: "var(--border)" }}>|</span>
              <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
                {postData.tags.map((tag: string) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.15rem 0.5rem",
                      backgroundColor: "var(--background-secondary)",
                      border: "1px solid var(--border)",
                      borderRadius: "999px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: postData.contentHtml || "" }}
          className="prose"
        />
      </article>
    </div>
  );
}
