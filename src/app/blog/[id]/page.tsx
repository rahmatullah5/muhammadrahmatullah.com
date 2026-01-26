/** @format */

import { getAllPostIds, getPostData, PostData } from "@/lib/posts";
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
        <div className="text-secondary mb-8">
          <time>{postData.date}</time>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: postData.contentHtml || "" }}
          style={{ lineHeight: "1.8", fontSize: "1.1rem" }}
        />
      </article>
    </div>
  );
}
