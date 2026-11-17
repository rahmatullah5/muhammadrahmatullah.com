/** @format */

export type Experience = {
  company: string;
  slug: string;
  href?: string;
  role: string;
  period: string;
  type: string;
  stack: string;
  description: string[];
};

/** Career start — used for the "uptime" counter. */
export const CAREER_START = "2017-06-01T00:00:00+07:00";

export const experiences: Experience[] = [
  {
    company: "Kredivo",
    slug: "kredivo",
    stack: "Node.js · React · MySQL · ETL",
    href: "https://kredivo.com/",
    role: "Senior Software Engineer",
    period: "Dec 2023 – Present",
    type: "Jakarta, Full-time",
    description: [
      "Led the end-to-end integration of a digital bank as a new lending partner — disbursement, repayment, cancellation and reconciliation, built with no existing template.",
      "Led the optimization of the data ingestion process, reducing execution time from 10 minutes to 20 seconds.",
      "Cut the internal tool's build size by up to 50% and its Bitbucket pipeline from 30 minutes to 15 minutes.",
      "Developed and maintained internal tools for loan disbursement, repayment, and cancellation using Node.js, React.js, and MySQL.",
      "Mentored a new engineer through a structured 90-day onboarding program with domain knowledge, technical guidance, and cross-functional support.",
      "Awarded the Engineering Excellence Award for consistently delivering high-quality engineering work.",
    ],
  },
  {
    company: "Stockbit",
    slug: "stockbit",
    stack: "Elixir · Phoenix · Kafka · PostgreSQL",
    href: "https://stockbit.com/",
    role: "Senior Software Engineer",
    period: "Dec 2021 – Dec 2023",
    type: "Remote, Full-time",
    description: [
      "Led the team building an invitation code service for the first 1,000 users of crypto.stockbit.com (AWS EB, Elixir, Phoenix, Docker, PostgreSQL).",
      "Built a real-time crypto market data aggregator and streaming service processing 1 million monthly trades (Kafka, ZeroMQ, Elixir, Phoenix, Redis, PostgreSQL time-series).",
      "Owned RFCs and technical documentation, including API contracts and high-level diagrams.",
      "Implemented GitLab CI pipelines for every service to automate tests, audits, and Docker image builds.",
    ],
  },
  {
    company: "Mekari",
    slug: "mekari",
    stack: "Rails · Java · AWS Lambda · RabbitMQ",
    href: "https://mekari.com/",
    role: "Software Engineer 2",
    period: "June 2020 – Dec 2021",
    type: "Remote, Full-time",
    description: [
      "Developed 11 microservices integrating bank partner and merchant APIs for jurnal.id (AWS Lambda, Rails, Java, MySQL, MongoDB, RabbitMQ).",
      "Built internal system management and monitoring tools that reduced customer issues by 80%.",
      "Won third place in the internal hackathon with an e-signature application built in Ruby on Rails.",
    ],
  },
  {
    company: "Clapping Ape",
    slug: "clapping-ape",
    stack: "Rails · PHP · MySQL · Redis",
    href: "https://www.clappingape.com/",
    role: "Backend Engineer",
    period: "July 2019 – Mar 2020",
    type: "Bandung, Full-time",
    description: [
      "Developed microservices and maintained the customer site of one of Indonesia's largest insurance providers (Heroku, AWS, Rails, MySQL, Redis).",
      "Single-handedly designed and developed numerous applications in Ruby on Rails and PHP, improving general performance.",
    ],
  },
  {
    company: "41 Studio",
    slug: "41-studio",
    stack: "Rails · AWS · Redis",
    role: "Ruby on Rails Engineer",
    period: "Jun 2017 – July 2019",
    type: "Cimahi, Full-time",
    description: [
      "Refactored an online video service backend API, reducing overhead costs by 50% (AWS, Elastic Transcoder, Firebase Cloud Messaging, Rails, Redis).",
      "Developed numerous applications that increased user-friendliness by 20%.",
    ],
  },
];

export const talks = [
  {
    year: "2025",
    title: "Big Data, Smart Solutions: AI Engineers as Digital Innovation Architects",
    where: "Guest speaker for Kredivo at UPN Veteran Jakarta",
    href: "https://drive.google.com/file/d/1SwL81IlnRy8ZsjDxQJNfekKEDUvbDCTn/view?usp=sharing",
  },
  {
    year: "2023",
    title: "Man in the Middle: Mitigation and Prevention",
    where: "Internal Stockbit engineering talk",
    href: "https://drive.google.com/file/d/1aMDppjmW4_RxJKkYq8B2loFpcWUdGGWe/view?usp=sharing",
  },
  {
    year: "2023",
    title: "MySQL and Database",
    where: "Guest speaker for Stockbit at dibimbing.id",
    href: "https://drive.google.com/file/d/1oHBUmL7ONeL2lpHR0dqjnn-DabuwD02l/view?usp=sharing",
  },
  {
    year: "2023",
    title: "Implementation of Coding Principles",
    where: "Guest speaker for Stockbit at Exabytes",
    href: "https://drive.google.com/file/d/1fv7ts4lmPY7maqI1wZg58MPb31lmyaFx/view?usp=sharing",
  },
  {
    year: "2022",
    title: "Build your First RESTful JSON API With Rails and Deploy it to Heroku",
    where: "Guest speaker for Mekari at Exabytes",
    href: "https://drive.google.com/file/d/1CsYOWz-gsy56ErOZEj3qN_IYcnnNiQ8n/view?usp=sharing",
  },
  {
    year: "2021",
    title: "Industrial Trainer & Software Engineer Mentor — 30 mentees",
    where: "Glints, Ministry of Education of Indonesia program",
    href: "https://drive.google.com/file/d/1hvPhPv7u25FCX8VwEPbnK8blpAFj6SbN/view?usp=sharing",
  },
];

export const certifications = [
  {
    name: "Go: The Complete Developer's Guide",
    issuer: "Udemy",
    year: "2022",
    href: "https://www.udemy.com/certificate/UC-72ed1670-7279-4081-99b4-0b91f8fb7df0/",
  },
  {
    name: "The Complete Elixir and Phoenix Bootcamp",
    issuer: "Udemy",
    year: "2021",
    href: "https://www.udemy.com/certificate/UC-6308ea71-7cd5-4c90-903f-c7cf49f4ed92/",
  },
  {
    name: "Elixir and Phoenix: Real World Functional Programming",
    issuer: "Udemy",
    year: "2021",
    href: "https://www.udemy.com/certificate/UC-9ea703e1-a418-4628-b90b-363a6bb527ff/",
  },
  {
    name: "Intermediate REST API",
    issuer: "HackerRank",
    year: "2020",
    href: "https://www.hackerrank.com/certificates/5b16f2fd017f",
  },
  {
    name: "Intermediate SQL",
    issuer: "HackerRank",
    year: "2020",
    href: "https://www.hackerrank.com/certificates/cac48d534ec9",
  },
  {
    name: "Basic SQL",
    issuer: "HackerRank",
    year: "2020",
    href: "https://www.hackerrank.com/certificates/147a1c7215fe",
  },
  {
    name: "Intermediate Problem Solving",
    issuer: "HackerRank",
    year: "2020",
    href: "https://www.hackerrank.com/certificates/1299660001f6",
  },
  {
    name: "Basic Problem Solving",
    issuer: "HackerRank",
    year: "2020",
    href: "https://www.hackerrank.com/certificates/e2fe9c34db3f",
  },
  {
    name: "Intermediate Ruby",
    issuer: "HackerRank",
    year: "2020",
    href: "https://www.hackerrank.com/certificates/3fdf1cdfdf27",
  },
  {
    name: "Basic Ruby",
    issuer: "HackerRank",
    year: "2020",
    href: "https://www.hackerrank.com/certificates/68285779e01a",
  },
  {
    name: "Basic JavaScript",
    issuer: "HackerRank",
    year: "2020",
    href: "https://www.hackerrank.com/certificates/29127d26366e",
  },
  {
    name: "Basic Java",
    issuer: "HackerRank",
    year: "2020",
    href: "https://www.hackerrank.com/certificates/38c9dd02a41f",
  },
];

/** Pre-career: national esports title, won while still in school. */
export const championship = {
  year: "2012",
  date: "Feb 2012",
  game: "WolfTeam",
  event: "Softnyx Ultimate (Liga Pride) 2012",
  organizer: "PT Softnyxgames Indonesia",
  place: "1st place — national champion",
  prize: "Rp 40.000.000",
  team: "4-player squad",
  // Drop the scans into /public with these names and they appear on the site.
  certificate: "/championship-2012-certificate.jpg",
  photo: "/championship-2012-team.jpg",
};
