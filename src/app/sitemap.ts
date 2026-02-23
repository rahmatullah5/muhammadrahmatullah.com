/** @format */

import { MetadataRoute } from "next";
import { getSortedPostsData } from "@/lib/posts";

export const dynamic = "force-static";

const SITE_URL = "https://muhammadrahmatullah.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getSortedPostsData();

  const blogEntries = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...blogEntries,
  ];
}
