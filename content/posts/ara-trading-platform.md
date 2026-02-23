---
title: "ARA — Automated Research Assistant for Smart Money Trading"
date: "2025-02-20"
excerpt: "A full-stack trading intelligence platform that tracks institutional money flow to identify high-probability stock opportunities in the Indonesian market."
tags: ["Full Stack", "Go", "React", "PostgreSQL", "Personal Project"]
---

<!-- @format -->

## Metadata

| Field              | Detail                                                 |
| ------------------ | ------------------------------------------------------ |
| **Project Period** | Dec 2024 – Present                                     |
| **Role**           | Solo Engineer (Design, Architecture, Development, Ops) |
| **Team**           | Individual / Personal Project                          |
| **Stakeholders**   | Personal use                                           |
| **Status**         | Live                                                   |

---

## Context and Scope

Retail traders in the Indonesian stock market often lack visibility into what institutional brokers ("smart money") are doing. Key data like broker accumulation patterns, volume-weighted pricing, and buy consistency are available but scattered and hard to interpret.

Without this insight, retail traders frequently buy at prices higher than institutions, reducing their edge and increasing risk.

**ARA (Advanced Recommended Action)** is a full-stack trading intelligence platform that analyzes institutional money flow to identify high-probability stock trading opportunities.

> "Don't Buy Higher Than the Institutions."  
> If large brokers are accumulating at an average price of 2,100, buying at 2,250 means you're paying 7% more than smart money. ARA quantifies this gap and surfaces actionable signals.

---

## Goals and Non-Goals

### Goals

- Build a self-hosted trading research assistant that surfaces high-conviction opportunities.
- Automate institutional flow analysis (volume-weighted pricing, consistency tracking, probability scoring).
- Provide actionable BUY / HOLD / AVOID recommendations with human-readable explanations.
- Deliver recommendations via both a web dashboard and Telegram bot notifications.
- Support automated bracket order placement with configurable TP/SL.

### Non-Goals

- Not intended to execute fully autonomous trading without human review.
- Not a public SaaS product (architected for extensibility, but currently personal use).
- No mobile-native application.

---

## The Actual Design

### System-Context Diagram

> 📌 _To Be Added — system-context diagram showing the interaction between Frontend, Backend API, PostgreSQL, Redis, Telegram Bot, and external data sources._

### APIs

The backend exposes a RESTful API with Swagger/ReDoc documentation:

- **Screener V1** — Filters stocks by MA period and minimum market value.
- **Screener V2** — Enhanced version with detailed human-readable descriptions for each recommendation.
- **Trade API** — Auto bracket order placement with configurable TP/SL.
- **Auth** — Google OAuth for frontend dashboard access.

**Links:**

- [Frontend — ara-frontend.muhammadrahmatullah.com](https://ara-frontend.muhammadrahmatullah.com/)
- [API Documentation](https://ara-backend-production.up.railway.app/docs)

### Data Storage

| Store      | Purpose                                           |
| ---------- | ------------------------------------------------- |
| PostgreSQL | Stock data, broker flow, screener results, orders |
| Redis      | Caching, session management                       |

- **Stock Data Ingestion**: Automated sync pipeline that ingests and normalizes stock market data from JSON sources into PostgreSQL.

### Code and Pseudo-Code

**Screening Methodology** — ARA evaluates each stock through multiple lenses:

1. **Volume-Weighted Analysis** — Big accumulators carry more weight than small traders. A broker buying 10,000 lots has more conviction than one buying 100 lots.
2. **Consistency Tracking** — e.g., 4 out of 5 days buying = 80% conviction.
3. **Price Validation** — Current price vs. broker accumulation average.
4. **Technical Confirmation** — Support/resistance levels validate entries.

A "Strong BUY" signal requires: price ≤ broker average, consistency ≥ 70%, and probability of upward movement ≥ 70%.

### Degree of Constraint

- Must handle full IDX market data daily without timeout or data loss.
- Financial data accuracy is non-negotiable — reconciliation logic must be deterministic.
- Telegram notifications must be near real-time.

---

## Alternatives Considered

| Approach                 | Why Not Chosen                                                 |
| ------------------------ | -------------------------------------------------------------- |
| Python + Django          | Go was chosen for performance and concurrency in data pipeline |
| Third-party screener API | No existing API provides broker-level accumulation granularity |
| Serverless (Lambda)      | Persistent connections to DB and Telegram require long-running |

---

## Cross-Cutting Concerns

- **Authentication**: Google OAuth for dashboard; API key for Telegram bot.
- **Observability**: Structured logging, Railway deployment metrics.
- **Deployment**: Backend on Railway, frontend on custom subdomain.
- **Error Handling**: Graceful degradation on data source failures.

---

## Tech Stack

- **Backend**: Go (Golang), PostgreSQL, Redis, Telegram Bot API
- **Frontend**: React, TypeScript, Vite
- **Infra**: Railway, custom domain DNS

---

## Implementation & Impact

![ARA Trading Platform](/blog/ara-trading.png)

- Built a complete trading research platform from zero — backend, frontend, API, Telegram integration, and deployment.
- The V2 screener provides detailed, human-readable descriptions explaining the reasoning behind every recommendation.
- Processes and scores the full Indonesian stock market daily, surfacing only high-conviction opportunities.
- Designed for personal use but architected with clean API contracts, making it extensible for future users.
