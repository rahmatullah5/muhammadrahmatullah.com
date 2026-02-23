---
title: "BCAD Channeling Integration"
date: "2025-02-10"
excerpt: "End-to-end ownership of a new lender integration with BCA Digital, projected to generate up to 300B IDR gross profit annually."
---

<!-- @format -->

In 2025, Kredivo initiated a new channeling partnership with **BCA Digital (BCAD)**. This required building an entirely new lender integration covering disbursement, repayment, cancellation, and reporting flows.

There was no existing template for this specific model, no centralized metadata documentation, and multiple internal systems (TREX, ms-lender, ETL, Infra) needed to be aligned.

The projected business impact is significant:

- 100–200B IDR disbursement per month
- ~1T IDR annually
- Estimated ~300B IDR gross profit per year
- ~100k–500k loans annually

![BCAD Integration](/blog/bcad-integration.png)

This made the integration strategically important and financially sensitive.

## Approach

I took end-to-end ownership of the integration:

- Designed and implemented the full TREX integration logic for disbursement, repayment, and cancellation.
- Defined the BigQuery snapshot structure for BCAD reporting and worked closely with the ETL team to ensure DAG pipelines matched financial requirements.
- Coordinated with Infra to set up cron jobs, queue processing, and data persistence to ensure reliable and idempotent processing.
- Manually mapped entities across systems and proactively clarified data flows with each domain PIC, due to missing centralized metadata documentation.
- Acted as the sole engineering PIC communicating directly with PM & BCAD for file format alignment, validation, and reconciliation logic.

## Results

- Successfully enabled a new lender channel with projected annual revenue contribution of up to 300B IDR.
- Established a clear snapshot and reporting contract for BCAD, reducing reconciliation risk.
- Reduced ambiguity in cross-domain data mapping that previously lacked documentation.
- Created a structured integration foundation reusable for future lender partnerships.
- Ensured financial correctness in a high-volume environment where even small discrepancies could result in significant exposure.

This project demonstrated ownership beyond feature delivery — spanning architecture alignment, cross-team coordination, and direct external stakeholder management.
