/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://muhammadrahmatullah.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Muhammad Rahmatullah | Senior Full-stack Engineer",
    template: "%s | Muhammad Rahmatullah",
  },
  description:
    "Senior Full-stack Engineer specializing in Ruby, Elixir, Go, and TypeScript. Building scalable systems with clarity and precision. Portfolio, case studies, and engineering insights.",
  keywords: [
    "Muhammad Rahmatullah",
    "Senior Full-stack Engineer",
    "Software Engineer",
    "Backend Engineer",
    "Ruby",
    "Elixir",
    "Go",
    "TypeScript",
    "Microservices",
    "Portfolio",
    "Indonesia",
  ],
  authors: [{ name: "Muhammad Rahmatullah", url: SITE_URL }],
  creator: "Muhammad Rahmatullah",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Muhammad Rahmatullah",
    title: "Muhammad Rahmatullah | Senior Full-stack Engineer",
    description:
      "Senior Full-stack Engineer specializing in Ruby, Elixir, Go, and TypeScript. Building scalable systems with clarity and precision.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Muhammad Rahmatullah — Senior Full-stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Rahmatullah | Senior Full-stack Engineer",
    description:
      "Senior Full-stack Engineer specializing in Ruby, Elixir, Go, and TypeScript.",
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-google-verification-code",
  },
};

// JSON-LD structured data for the site
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Rahmatullah",
  url: SITE_URL,
  jobTitle: "Senior Full-stack Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Kredivo",
  },
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "Bandung Institute of Technology",
    },
    {
      "@type": "EducationalOrganization",
      name: "Widyatama University",
    },
  ],
  knowsAbout: [
    "Ruby",
    "Ruby on Rails",
    "Elixir",
    "Go",
    "TypeScript",
    "PostgreSQL",
    "Microservices",
    "ETL Pipelines",
    "System Design",
  ],
  sameAs: [
    "https://github.com/rahmatullah5",
    "https://www.linkedin.com/in/muhammadrahmatullah/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={inter.className}
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
