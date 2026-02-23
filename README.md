<!-- @format -->

# muhammadrahmatullah.com

Personal portfolio and engineering case studies website for **Muhammad Rahmatullah** — Senior Full-stack Engineer.

🔗 **Live**: [muhammadrahmatullah.com](https://muhammadrahmatullah.com)

## About

A minimalist, responsive portfolio showcasing professional experience, technical skills, and engineering case studies written in Google Design Doc / RFC format.

### Features

- **Case Studies** — Engineering write-ups in RFC format (context, goals, design, alternatives, impact)
- **Tag-based Filtering** — Filter projects by technology or domain (Backend, Go, Fintech, etc.)
- **Dark / Light Mode** — Theme toggle with system preference detection
- **SEO Optimized** — Open Graph, Twitter Cards, JSON-LD structured data, sitemap, robots.txt
- **Static Export** — Pre-rendered at build time, deployed to GitHub Pages
- **Markdown Blog** — Content authored in Markdown with GFM table support

## Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Framework  | Next.js 16 (App Router, TypeScript) |
| Styling    | Vanilla CSS (CSS Modules)           |
| Content    | Markdown + gray-matter + remark     |
| Font       | Inter (Google Fonts)                |
| Deployment | GitHub Actions → GitHub Pages       |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (static export)
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── content/posts/       # Markdown case studies (RFC format)
├── public/              # Static assets (images, OG image, resume)
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── about/       # About page (experience, skills, education)
│   │   ├── blog/        # Case studies listing + [id] detail pages
│   │   └── contact/     # Contact page
│   ├── components/      # Navbar, Footer, Portfolio, ThemeProvider
│   └── lib/posts.ts     # Markdown processing utilities
└── .github/workflows/   # GitHub Actions deploy pipeline
```

## Adding a Case Study

Create a new `.md` file in `content/posts/`:

```markdown
---
title: "Your Case Study Title"
date: "2025-01-01"
excerpt: "A short description for the listing page."
tags: ["Backend", "Go", "PostgreSQL"]
---

## Metadata

| Field              | Detail        |
| ------------------ | ------------- |
| **Project Period** | Q1 2025       |
| **Role**           | Lead Engineer |

## Context and Scope

...
```

The post will automatically appear on the Case Studies page and homepage.

## License

MIT
