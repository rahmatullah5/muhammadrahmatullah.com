---
title: "BCAD Channeling Integration"
date: "2025-02-10"
excerpt: "End-to-end ownership of a new lender integration with BCA Digital, projected to generate up to 300B IDR gross profit annually."
tags: ["Backend", "Integration", "Kredivo", "Fintech"]
---

<!-- @format -->

## Metadata

| Field              | Detail                                                               |
| ------------------ | -------------------------------------------------------------------- |
| **Project Period** | Q1 2025                                                              |
| **Role**           | Sole Engineering PIC (Design, Implementation, External Coordination) |
| **Team**           | Engineering, Data/ETL, Infrastructure                                |
| **Stakeholders**   | Product Manager, BCA Digital (External Partner), Engineering Lead    |
| **Status**         | Delivered to Production                                              |

---

## Context and Scope

In 2025, Kredivo initiated a new channeling partnership with **BCA Digital (BCAD)**. This required building an entirely new lender integration covering disbursement, repayment, cancellation, and reporting flows.

There was no existing template for this specific model, no centralized metadata documentation, and multiple internal systems (TREX, ms-lender, ETL, Infra) needed to be aligned.

The projected business impact is significant:

- 100–200B IDR disbursement per month
- ~1T IDR annually
- Estimated ~300B IDR gross profit per year
- ~100k–500k loans annually

![BCAD Integration](/blog/bcad-integration.png)

This made the integration strategically important and financially sensitive.

---

## Goals and Non-Goals

### Goals

- Enable end-to-end loan lifecycle (disbursement, repayment, cancellation) for the BCAD channel.
- Establish reliable BigQuery snapshot reporting for financial reconciliation.
- Ensure financial correctness in a high-volume environment.
- Create a structured integration foundation reusable for future lender partnerships.

### Non-Goals

- Not redesigning the TREX core architecture.
- Not building a generic lender onboarding framework (focused on BCAD-specific requirements).
- Not migrating existing lender integrations.

---

## The Actual Design

### System-Context Diagram

> 📌 _To Be Added — diagram showing TREX, ms-lender, ETL/DAG pipelines, BigQuery, and BCAD external systems._

### APIs

- **Disbursement API**: Handles loan creation and fund transfer to BCAD.
- **Repayment API**: Processes incoming repayment data and reconciles with TREX records.
- **Cancellation API**: Manages loan cancellation flow with proper state transitions.
- **Reporting**: BigQuery snapshot generation for downstream financial reporting.

### Data Storage

| Store    | Purpose                                                         |
| -------- | --------------------------------------------------------------- |
| MySQL    | TREX transactional data (disbursement, repayment, cancellation) |
| BigQuery | Snapshot-based reporting and reconciliation                     |

### Code and Pseudo-Code

> 📌 _To Be Added — key integration flow pseudo-code for disbursement and reconciliation logic._

### Degree of Constraint

- Financial data accuracy is absolutely critical — even small discrepancies at this volume could result in significant exposure.
- No staging environment could replicate production-scale data characteristics.
- Integration had to work across multiple internal systems (TREX, ms-lender, ETL, Infra) with no centralized metadata documentation.
- External partner (BCA Digital) had their own file format and validation requirements.

---

## Alternatives Considered

| Approach                               | Why Not Chosen                                                           |
| -------------------------------------- | ------------------------------------------------------------------------ |
| Reuse existing lender template         | BCAD's channeling model had no existing template match                   |
| Build a generic lender framework first | Time constraints; BCAD was a high-priority business initiative           |
| Skip BigQuery snapshots                | Financial reporting and reconciliation required structured snapshot data |

---

## Cross-Cutting Concerns

- **Data Integrity**: Idempotent processing via cron jobs and queue mechanisms.
- **Reconciliation**: Daily reconciliation logic between TREX and BCAD records.
- **Cross-Team Coordination**: Worked directly with ETL team (DAG pipelines), Infra team (cron, queue setup), and external BCAD team (file format alignment).
- **Documentation**: Manually mapped entities across systems due to missing centralized metadata.

---

## Implementation & Impact

I took end-to-end ownership of the integration:

- Designed and implemented the full TREX integration logic for disbursement, repayment, and cancellation.
- Defined the BigQuery snapshot structure for BCAD reporting and worked closely with the ETL team to ensure DAG pipelines matched financial requirements.
- Coordinated with Infra to set up cron jobs, queue processing, and data persistence to ensure reliable and idempotent processing.
- Manually mapped entities across systems and proactively clarified data flows with each domain PIC.
- Acted as the sole engineering PIC communicating directly with PM & BCAD for file format alignment, validation, and reconciliation logic.

**Results:**

- Successfully enabled a new lender channel with projected annual revenue contribution of up to 300B IDR.
- Established a clear snapshot and reporting contract for BCAD, reducing reconciliation risk.
- Reduced ambiguity in cross-domain data mapping that previously lacked documentation.
- Created a structured integration foundation reusable for future lender partnerships.
- Ensured financial correctness in a high-volume environment.

This project demonstrated ownership beyond feature delivery — spanning architecture alignment, cross-team coordination, and direct external stakeholder management.
