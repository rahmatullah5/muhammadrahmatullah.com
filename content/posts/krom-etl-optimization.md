---
title: "KROM ETL Integration Optimization"
date: "2025-01-15"
excerpt: "How I reduced a critical lender data query from 2–3 minutes down to 14 seconds through an ETL-based snapshot strategy."
tags: ["Backend", "ETL", "Kredivo", "Performance"]
---

<!-- @format -->

## Metadata

| Field              | Detail                                           |
| ------------------ | ------------------------------------------------ |
| **Project Period** | Q4 2024 – Q1 2025                                |
| **Role**           | Lead Engineer (Proposal, Design, Implementation) |
| **Team**           | Engineering, Data/ETL, Infrastructure            |
| **Stakeholders**   | Engineering Lead, Data Team Lead                 |
| **Status**         | Deployed to Production                           |

---

## Context and Scope

KROM is one of the largest lenders in Kredivo. The existing KROM data generation process relied on direct queries that took **2–3 minutes on average**, and significantly longer during high-volume periods (e.g., post-holiday carry-over processing).

Because downstream processes depended on this query completion, the delay created:

- Processing bottlenecks
- Slower financial reporting
- Risk of operational backlog during peak volume

Given KROM's scale, reliability and data consistency were critical. We could not safely test in staging due to production-scale data characteristics.

---

## Goals and Non-Goals

### Goals

- Reduce KROM data generation query time to under 30 seconds.
- Maintain strict financial data consistency during the migration.
- Enable a zero-downtime cutover from old to new process.
- Improve reliability during peak load and post-holiday periods.

### Non-Goals

- Not refactoring the entire ETL pipeline — focused specifically on KROM.
- Not changing the downstream data consumers.
- Not migrating other lender integrations to the snapshot approach (though it sets a template).

---

## The Actual Design

### System-Context Diagram

> 📌 _To Be Added — diagram showing the old direct-query path vs. the new ETL snapshot path, including the parallel-run strategy._

### APIs

- No new external APIs introduced.
- Internal integration with ETL DAG pipeline for snapshot generation.
- Feature flag API to toggle between old (real-time query) and new (snapshot-based) process.

### Data Storage

| Store    | Purpose                                                           |
| -------- | ----------------------------------------------------------------- |
| MySQL    | Source transactional data (disbursement, repayment, cancellation) |
| ETL/DAG  | Scheduled snapshot generation pipeline                            |
| Snapshot | Pre-computed query results for KROM reporting                     |

### Code and Pseudo-Code

**Parallel-Run Strategy:**

```
1. Deploy snapshot-based process alongside existing real-time query
2. Feature flag controls which path is active for consumers
3. Both paths run simultaneously during validation period
4. Daily manual reconciliation: compare snapshot vs. real-time results
5. After N days with zero discrepancies → flip feature flag → full cutover
6. Keep old path as fallback for rollback
```

### Degree of Constraint

- Must test directly in production (staging cannot replicate production-scale data).
- Financial accuracy is non-negotiable — zero tolerance for discrepancies.
- Downstream processes cannot experience any interruption during migration.
- KROM is one of the largest lenders — any failure has immediate financial impact.

---

## Alternatives Considered

| Approach                    | Why Not Chosen                                                      |
| --------------------------- | ------------------------------------------------------------------- |
| Optimize the existing query | Fundamental design issue — query scanned too much data at runtime   |
| Cache query results         | Stale data risk for financial calculations                          |
| Big-bang migration          | Too risky for production financial data without parallel validation |

---

## Cross-Cutting Concerns

- **Feature Flags**: Safe toggle between old and new paths for zero-risk cutover.
- **Reconciliation**: Daily manual comparison between snapshot and real-time data.
- **Monitoring**: Query execution time tracked before and after migration.
- **Rollback Strategy**: Old path kept active as fallback during the transition period.

---

## Implementation & Impact

I proposed and implemented an ETL-based snapshot enhancement:

- Designed optimized snapshot queries for KROM disbursement, repayment, and cancellation.
- Integrated the snapshot with ETL (DAG creation handled by the ETL team).
- Coordinated with engineering and infra to ensure smooth orchestration.
- Introduced a **feature flag mechanism** to safely switch between old and new processes.
- Designed a temporary parallel-run strategy where both processes ran simultaneously.
- Performed daily manual reconciliation to ensure consistency before full migration.

**Results:**

![KROM ETL Performance](/blog/krom-etl-snapshot.png)

- Reduced query time from **2–3 minutes to 14 seconds** — a ~90% performance improvement.
- Removed a critical processing bottleneck for one of Kredivo's largest lenders.
- Improved reliability during peak and post-holiday high-volume periods.
- Enabled safer and more scalable processing architecture using snapshot-based data retrieval.
- Successfully deployed to production without financial discrepancies.

This initiative improved system scalability while maintaining strict financial data integrity.
