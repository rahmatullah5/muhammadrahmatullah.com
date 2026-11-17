/** @format */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostData {
  id: string;
  date: string;
  title: string;
  excerpt?: string;
  tags?: string[];
  highlight?: string;
  highlightLabel?: string;
  status?: string;
  contentHtml?: string;
  [key: string]: unknown;
}

export function getAllTags(): string[] {
  const posts = getSortedPostsData();
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag: string) => tagSet.add(tag));
    }
  });
  return Array.from(tagSet).sort();
}

/** Short status ("Live", "Shipped", "Done") from the post's metadata table. */
function readStatus(markdown: string): string | undefined {
  const m = markdown.match(/\*\*Status\*\*\s*\|\s*([^|\n]+)/);
  if (!m) return undefined;
  const raw = m[1].trim().toLowerCase();
  if (raw.startsWith("live")) return "Live";
  if (raw.includes("production")) return "Shipped";
  if (raw.startsWith("completed")) return "Done";
  return m[1].replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").split(/[—·]/)[0].trim();
}

export function getSortedPostsData(): PostData[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"));
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      status: readStatus(matterResult.content),
      ...matterResult.data,
    } as PostData;
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    status: readStatus(matterResult.content),
    ...matterResult.data,
  } as PostData;
}
