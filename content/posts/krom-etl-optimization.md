---
title: "KROM ETL Integration Optimization"
date: "2025-01-15"
excerpt: "How I reduced a critical lender data query from 2–3 minutes down to 14 seconds through an ETL-based snapshot strategy."
---

<!-- @format -->

KROM is one of the largest lenders in Kredivo. The existing data generation process relied on direct queries that took **2–3 minutes on average**, and significantly longer during high-volume periods such as post-holiday carry-over processing.

Because downstream processes depended on this query completion, the delay created processing bottlenecks, slower financial reporting, and risk of operational backlog during peak volume.

Given KROM's scale, reliability and data consistency were critical. We could not safely test in staging due to production-scale data characteristics.

## Approach

To address the bottleneck, I proposed and implemented an ETL-based snapshot enhancement:

- Designed optimized snapshot queries for KROM disbursement, repayment, and cancellation.
- Integrated the snapshot with ETL (DAG creation handled by the ETL team).
- Coordinated with engineering and infra to ensure smooth orchestration.
- Introduced a **feature flag mechanism** to safely switch between the old (real-time query) and new (snapshot-based) process.
- Designed a temporary parallel-run strategy where both processes ran simultaneously.
- Performed daily manual reconciliation between real and snapshot data to ensure consistency before full migration.

Because we had to test directly in production, this dual-run strategy ensured zero financial risk while validating performance improvements.

## Results

![KROM ETL Performance](/blog/krom-etl-snapshot.png)

- Reduced query time from **2–3 minutes to 14 seconds** — a ~90% performance improvement.
- Removed a critical processing bottleneck for one of Kredivo's largest lenders.
- Improved reliability during peak and post-holiday high-volume periods.
- Enabled safer and more scalable processing architecture using snapshot-based data retrieval.
- Successfully deployed to production without financial discrepancies.

This initiative improved system scalability while maintaining strict financial data integrity.
