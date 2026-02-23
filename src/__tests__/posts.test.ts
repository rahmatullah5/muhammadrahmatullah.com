/** @format */

/**
 * Tests for blog post listing, tags, and frontmatter.
 * These tests use gray-matter directly to avoid ESM issues
 * with the remark ecosystem in Jest.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

function getPostFiles() {
  return fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
}

function getParsedPosts() {
  return getPostFiles().map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const content = fs.readFileSync(
      path.join(postsDirectory, fileName),
      "utf-8",
    );
    const { data } = matter(content);
    return { id, ...data };
  });
}

describe("Blog Post Listing", () => {
  it("has at least one post", () => {
    const posts = getParsedPosts();
    expect(posts.length).toBeGreaterThan(0);
  });

  it("each post has required frontmatter fields", () => {
    const posts = getParsedPosts();
    posts.forEach((post: any) => {
      expect(post.id).toBeDefined();
      expect(post.title).toBeDefined();
      expect(post.date).toBeDefined();
      expect(post.excerpt).toBeDefined();
      expect(post.tags).toBeDefined();
    });
  });

  it("each post has a valid date format (YYYY-MM-DD)", () => {
    const posts = getParsedPosts();
    posts.forEach((post: any) => {
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  it("posts can be sorted by date descending", () => {
    const posts = getParsedPosts().sort((a: any, b: any) =>
      a.date < b.date ? 1 : -1,
    );
    for (let i = 1; i < posts.length; i++) {
      expect((posts[i - 1] as any).date >= (posts[i] as any).date).toBe(true);
    }
  });

  it("each post has tags as a non-empty array of strings", () => {
    const posts = getParsedPosts();
    posts.forEach((post: any) => {
      expect(Array.isArray(post.tags)).toBe(true);
      expect(post.tags.length).toBeGreaterThan(0);
      post.tags.forEach((tag: string) => {
        expect(typeof tag).toBe("string");
      });
    });
  });

  it("all tags are unique across the same post", () => {
    const posts = getParsedPosts();
    posts.forEach((post: any) => {
      const unique = new Set(post.tags);
      expect(unique.size).toBe(post.tags.length);
    });
  });

  it("post IDs are URL-safe (lowercase, hyphenated)", () => {
    const posts = getParsedPosts();
    posts.forEach((post: any) => {
      expect(post.id).toMatch(/^[a-z0-9-]+$/);
    });
  });
});

describe("Blog Post Content (RFC Format)", () => {
  it("each post has Context and Scope section", () => {
    getPostFiles().forEach((file) => {
      const content = fs.readFileSync(path.join(postsDirectory, file), "utf-8");
      expect(content).toContain("## Context and Scope");
    });
  });

  it("each post has Goals and Non-Goals section", () => {
    getPostFiles().forEach((file) => {
      const content = fs.readFileSync(path.join(postsDirectory, file), "utf-8");
      expect(content).toContain("## Goals and Non-Goals");
    });
  });

  it("each post has Implementation & Impact section", () => {
    getPostFiles().forEach((file) => {
      const content = fs.readFileSync(path.join(postsDirectory, file), "utf-8");
      expect(content).toContain("## Implementation & Impact");
    });
  });

  it("each post has a Metadata table", () => {
    getPostFiles().forEach((file) => {
      const content = fs.readFileSync(path.join(postsDirectory, file), "utf-8");
      expect(content).toContain("## Metadata");
      expect(content).toContain("**Project Period**");
      expect(content).toContain("**Role**");
    });
  });

  it("no empty links in any post", () => {
    getPostFiles().forEach((file) => {
      const content = fs.readFileSync(path.join(postsDirectory, file), "utf-8");
      const emptyLinks = content.match(/\[.*?\]\(\s*\)/g);
      expect(emptyLinks).toBeNull();
    });
  });
});

describe("SEO & Asset Integrity", () => {
  const publicDir = path.join(process.cwd(), "public");

  it("OG image exists", () => {
    expect(fs.existsSync(path.join(publicDir, "og-image.png"))).toBe(true);
  });

  it("all blog images referenced in posts exist", () => {
    getPostFiles().forEach((file) => {
      const content = fs.readFileSync(path.join(postsDirectory, file), "utf-8");
      const imageRegex = /!\[.*?\]\(\/blog\/(.*?)\)/g;
      let match;
      while ((match = imageRegex.exec(content)) !== null) {
        const imagePath = path.join(publicDir, "blog", match[1]);
        expect(fs.existsSync(imagePath)).toBe(true);
      }
    });
  });
});
