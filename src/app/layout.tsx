/** @format */

import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const SITE_URL = "https://muhammadrahmatullah.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Muhammad Rahmatullah | Senior Software Engineer",
    template: "%s | Muhammad Rahmatullah",
  },
  description:
    "Senior Software Engineer at Kredivo specializing in Ruby, Elixir, Node.js, and PostgreSQL. Building scalable fintech systems with clarity and precision. Portfolio, case studies, and engineering insights.",
  keywords: [
    "Muhammad Rahmatullah",
    "Senior Software Engineer",
    "Software Engineer",
    "Backend Engineer",
    "Ruby",
    "Elixir",
    "Go",
    "Node.js",
    "Microservices",
    "Portfolio",
    "Fintech",
    "Jakarta",
    "Indonesia",
  ],
  authors: [{ name: "Muhammad Rahmatullah", url: SITE_URL }],
  creator: "Muhammad Rahmatullah",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Muhammad Rahmatullah",
    title: "Muhammad Rahmatullah | Senior Software Engineer",
    description:
      "Senior Software Engineer at Kredivo specializing in Ruby, Elixir, Node.js, and PostgreSQL. Building scalable fintech systems with clarity and precision.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Muhammad Rahmatullah — Senior Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Rahmatullah | Senior Software Engineer",
    description:
      "Senior Software Engineer specializing in Ruby, Elixir, Node.js, and PostgreSQL.",
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
  jobTitle: "Senior Software Engineer",
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
    "Node.js",
    "React",
    "Apache Kafka",
    "PostgreSQL",
    "Microservices",
    "ETL Pipelines",
    "System Design",
  ],
  sameAs: [
    "https://github.com/rahmatullah5",
    "https://www.linkedin.com/in/mrahmatullah/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body id="top">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Cursor />
        </ThemeProvider>
      </body>
    </html>
  );
}
