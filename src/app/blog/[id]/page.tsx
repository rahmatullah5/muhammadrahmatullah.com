/** @format */

import { getAllPostIds, getPostData } from "@/lib/posts";
import { Metadata } from "next";

type Params = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const postData = await getPostData(id);

  return {
    title: `${postData.title} | Muhammad Rahmatullah`,
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

  return (
    <div className="container py-8">
      <article>
        <h1 className="mb-4">{postData.title}</h1>
        <div
          className="flex items-center gap-4 text-secondary mb-8"
          style={{ flexWrap: "wrap" }}
        >
          <time>{postData.date}</time>
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
