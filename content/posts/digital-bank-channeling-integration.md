---
title: "Digital Bank Channeling Integration"
date: "2025-02-10"
excerpt: "End-to-end ownership of a brand-new lender integration with a digital bank partner — disbursement, repayment, cancellation and reconciliation, built with no existing template."
highlight: "0 → 1"
highlightLabel: "new lender channel, sole engineering PIC"
tags: ["Backend", "Integration", "Kredivo", "Fintech"]
---

<!-- @format -->

## Metadata

| Field              | Detail                                                               |
| ------------------ | -------------------------------------------------------------------- |
| **Project Period** | Q1 2025                                                              |
| **Role**           | Sole Engineering PIC (Design, Implementation, External Coordination) |
| **Team**           | Engineering, Data/ETL, Infrastructure                                |
| **Stakeholders**   | Product Manager, Digital Bank Partner (External), Engineering Lead   |
| **Status**         | Delivered to Production                                              |

> Partner name, internal system names and business figures are withheld. The engineering problem is described as it was.

---

## Context and Scope

In 2025, the company started a new channeling partnership with a **digital bank**. This required building an entirely new lender integration covering disbursement, repayment, cancellation, and reporting flows.

There was no existing template for this specific model, no centralized metadata documentation, and several internal systems (the loan core, the lender service, ETL and infrastructure) needed to be aligned.

The channel was expected to carry a large share of new loan volume, which made the integration strategically important and financially sensitive: every rupiah disbursed had to reconcile against the partner's books.

---

## Goals and Non-Goals

### Goals

- Enable the end-to-end loan lifecycle (disbursement, repayment, cancellation) for the new channel.
- Establish reliable BigQuery snapshot reporting for financial reconciliation.
- Ensure financial correctness in a high-volume environment.
- Create a structured integration foundation reusable for future lender partnerships.

### Non-Goals

- Not redesigning the loan-core architecture.
- Not building a generic lender onboarding framework (focused on this partner's requirements).
- Not migrating existing lender integrations.

---

## The Actual Design

### System Context

```
mobile app ──► lender service ──► loan core (MySQL) ──► partner bank
                                      │
                                      └─► ETL / DAG ──► BigQuery snapshots ──► reconciliation
```

### APIs

- **Disbursement API**: Handles loan creation and fund transfer to the partner bank.
- **Repayment API**: Processes incoming repayment data and reconciles with loan-core records.
- **Cancellation API**: Manages loan cancellation flow with proper state transitions.
- **Reporting**: BigQuery snapshot generation for downstream financial reporting.

### Data Storage

| Store    | Purpose                                                              |
| -------- | -------------------------------------------------------------------- |
| MySQL    | Loan-core transactional data (disbursement, repayment, cancellation) |
| BigQuery | Snapshot-based reporting and reconciliation                          |

### Degree of Constraint

- Financial data accuracy is critical — even small discrepancies at this volume mean real exposure.
- No staging environment could replicate production-scale data characteristics.
- Integration had to work across multiple internal systems with no centralized metadata documentation.
- The partner bank had its own file format and validation requirements.

---

## Alternatives Considered

| Approach                               | Why Not Chosen                                                           |
| -------------------------------------- | ------------------------------------------------------------------------ |
| Reuse existing lender template         | This channeling model had no existing template match                     |
| Build a generic lender framework first | Time constraints; the partnership was a high-priority initiative         |
| Skip BigQuery snapshots                | Financial reporting and reconciliation required structured snapshot data |

---

## Cross-Cutting Concerns

- **Data Integrity**: Idempotent processing via cron jobs and queue mechanisms.
- **Reconciliation**: Daily reconciliation logic between loan-core and partner records.
- **Cross-Team Coordination**: Worked directly with the ETL team (DAG pipelines), Infra team (cron, queue setup), and the partner's team (file format alignment).
- **Documentation**: Manually mapped entities across systems due to missing centralized metadata.

---

## Implementation & Impact

I took end-to-end ownership of the integration:

- Designed and implemented the full loan-core integration logic for disbursement, repayment, and cancellation.
- Defined the BigQuery snapshot structure for partner reporting and worked closely with the ETL team so DAG pipelines matched financial requirements.
- Coordinated with Infra to set up cron jobs, queue processing, and data persistence for reliable, idempotent processing.
- Manually mapped entities across systems and clarified data flows with each domain PIC.
- Acted as the sole engineering PIC communicating directly with the PM and the partner bank on file format, validation, and reconciliation logic.

**Results:**

- Launched a new lender channel to production on schedule.
- Established a clear snapshot and reporting contract with the partner, reducing reconciliation risk.
- Reduced ambiguity in cross-domain data mapping that previously lacked documentation.
- Created a structured integration foundation reusable for future lender partnerships.
- Kept financial correctness in a high-volume environment.

This project demonstrated ownership beyond feature delivery — spanning architecture alignment, cross-team coordination, and direct external stakeholder management.
