---
title: "Sedompet — One Shared Wallet for the Whole Family"
date: "2026-11-13"
excerpt: "A local-first family budgeting web app: SQLite in the browser, Supabase Postgres with row-level security behind it, so everyone in a household records into one wallet from their own phone."
highlight: "1B"
highlightLabel: "IDR recorded in shared family wallets"
tags: ["Full Stack", "React", "PostgreSQL", "SQLite", "Personal Project"]
---

<!-- @format -->

## Metadata

| Field              | Detail                                                       |
| ------------------ | ------------------------------------------------------------ |
| **Project Period** | Nov 2026 – Present                                           |
| **Role**           | Solo Engineer (Product, Design, Architecture, Development)   |
| **Team**           | Individual / Personal Project                                |
| **Stakeholders**   | My own family, then friends and relatives by invitation      |
| **Status**         | Live — [sedompet.vercel.app](https://sedompet.vercel.app) · [try the demo](https://sedompet.vercel.app/demo) |

---

## Context and Scope

Most budgeting apps assume **one person, one phone, one set of numbers**. Indonesian households don't work that way: one parent pays the electricity, the other does the groceries, the kids get a weekly allowance, and the "family money" is spread across cash, two bank accounts and a couple of e-wallets. Each person tracking alone means nobody knows what is actually left this month.

I was using a single-user, offline budgeting app for my own finances and wanted the same depth of features — but **shared**. Its sync model copied the whole database file between one person's devices; there was no notion of members, roles or a server-side source of truth, so it could not be stretched into a family product.

**Sedompet** (Indonesian _"satu dompet"_, one wallet) is the result: a web app where a family, a shared kos, or a group of friends records into **one wallet** from their own phones, with roles, private pockets and live updates.

> "Satu dompet, satu keluarga."  
> If Ayah logs fuel and Ibu logs groceries, both screens — and the budget — update immediately.

---

## Goals and Non-Goals

### Goals

- One wallet ("Dompet") shared by many members, each on their own device, with **live updates**.
- **Family-appropriate roles**: owner, admin, member (can only edit their own entries), viewer (children, read-only).
- **Private pockets**: a member's personal savings stay invisible to the rest of the family.
- Full budgeting depth: categories and sub-categories with custom icons, budgets (including "everything except instalments" and per-child allowances), recurring bills and salary, loans owed/lent, balance corrections, charts and a forecast.
- Fast and usable on bad mobile connections: the UI must never wait on the network to show data.
- Bring years of history over from the old app without losing a rupiah.
- A warm, plain-language Indonesian UI ("Masih aman! Sisa Rp 3,9 jt, kira-kira Rp 260 rb per hari") rather than an admin dashboard.

### Non-Goals

- No SMS or email infrastructure for login (cost and deliverability) — see the phone + PIN design below.
- No bank-account aggregation or automatic transaction import from banks.
- No native mobile apps; a mobile-first web app first.
- Not multi-currency; IDR only.

---

## The Actual Design

### System-Context Diagram

```
┌─ Each family member's phone ─────────┐
│ React UI ◀──reads── SQLite (WASM)    │
│    │ writes          ▲  in IndexedDB │
│    ▼                 │               │
│ SQLite ─trigger─▶ outbox             │
└──────────────────│───────▲───────────┘
          upsert / RPC     │ pull on
                   ▼       │ realtime
┌─ Supabase ───────────────────────────┐
│ Postgres + Row-Level Security        │
│ Auth: phone → identity + PIN         │
│ Realtime · RPCs (register, invites)  │
└──────────────────────────────────────┘
```

### Data Storage

Every finance table — accounts, categories (self-referencing for sub-categories), transactions, budgets, recurring items, loans, activity — carries a `dompet_id`. The same schema exists twice: **SQLite in the browser** as a cache and **Postgres on Supabase** as the source of truth.

Money is stored as integer rupiah. Transfers, balance corrections and loan movements carry a `flag` so they move balances without polluting spending statistics or budgets.

### Local-First Sync (Outbox Pattern)

Every screen reads synchronously from in-browser SQLite, so navigation and charts are instant and work offline.

- **Writes**: the UI writes to SQLite exactly as in offline mode. SQLite `AFTER INSERT/UPDATE/DELETE` triggers append to an `outbox` table; an uploader batches consecutive rows per table (preserving foreign-key order) and upserts them to Supabase.
- **Reads from others**: a Supabase Realtime subscription triggers a debounced pull that replaces the local cache inside one transaction, with the triggers suppressed.
- **Conflicts and permissions**: if Postgres rejects a change (for example a member editing someone else's entry), the outbox is dropped and the cache is re-pulled, so every screen converges to the server's truth.

Because all mutations go through the outbox, features written for the offline demo — including the history importer — worked against the cloud backend without modification.

### Security Model

Authorization lives **in the database, not the client**. Row-Level Security policies and `SECURITY DEFINER` functions enforce:

- Members only see Dompets they belong to; strangers see nothing.
- Private accounts — and every transaction in them — are visible only to their owner, including to admins.
- Members can only edit or delete what they created; viewers cannot write at all.
- Cross-tenant integrity: a transaction cannot reference an account, category or payer from another Dompet.
- A Dompet always keeps at least one owner; deactivating a phone number revokes access immediately.

### Login Without SMS

Phone numbers are how Indonesian families identify each other, but SMS OTP is costly and unreliable. Sedompet uses **phone number + 6-digit PIN**, gated by activation:

- An admin page issues **single-use activation codes**; a Dompet owner issues **invite codes** (6 characters, multi-use, role-scoped) shared over WhatsApp as a link.
- A `register_phone` database function creates the auth account only for an activated number or a valid code, and atomically reserves the invitee's seat in the right Dompet.
- Supabase Auth's public sign-up rejected the synthetic login address (no mail server behind it), so registration moved into the database, while sign-in still uses Supabase's standard password flow.

### Migration From the Old App

The importer reads the old app's SQLite backup **in the browser** (the file never leaves the device) or as a generated SQL seed, mapping accounts, nested categories, transfers, balance corrections, loans and budgets with exclusion rules.

IDs are derived deterministically from the source rows, so re-running an import never duplicates data.

---

## Alternatives Considered

| Option | Why not |
| ------ | ------- |
| **Share the old app's file-based sync** (one shared cloud folder) | Whole-database merges, race conditions, no roles or permissions. |
| **Firestore as the source of truth** | Would mean rewriting a large body of SQL aggregation (budgets, reports, forecasts) as document queries; RLS-style rules on relational data are a better fit in Postgres. |
| **A dedicated sync engine (e.g. PowerSync)** | A strong fit long-term, but an extra hosted service for a family-scale dataset. The outbox + realtime-pull approach kept the same local-first behaviour with fewer moving parts. |
| **SMS OTP / email magic links** | Cost, deliverability, and many family members (especially parents) don't use email. |

---

## Cross-Cutting Concerns

- **Testing the rules where they live.** Every policy and RPC has scenario tests that run against a throwaway local Postgres with a stubbed Supabase `auth` schema: owner/admin/member/viewer/stranger behaviour, private-account isolation, cross-Dompet references, invite and activation-code abuse, deactivation. Migrations are re-run twice to prove they are idempotent.
- **Privacy.** Personal finance data in seeds and backups is kept out of version control; the browser importer never uploads the source file.
- **Accessibility and charts.** Chart colours were validated for colour-vision deficiency; where contrast was borderline, charts gained legends, hover read-outs and a table view instead of relying on colour.
- **Mobile-first UX.** Bottom-sheet forms with pinned save actions, icon tiles instead of dropdowns, a custom date picker with "Hari ini / Kemarin" shortcuts — and every sheet measured at 375 px to guarantee no horizontal scroll.

---

## Tech Stack

| Layer     | Technology                                                                  |
| --------- | --------------------------------------------------------------------------- |
| Frontend  | React 18, TypeScript, Vite, Tailwind CSS v4                                 |
| Local DB  | SQLite compiled to WebAssembly (sql.js), persisted in IndexedDB             |
| Backend   | Supabase — PostgreSQL, Row-Level Security, PL/pgSQL RPCs, Auth, Realtime     |
| Testing   | SQL scenario suites on ephemeral PostgreSQL, TypeScript strict mode         |
| Hosting   | Vercel (static SPA with `/`, `/demo`, `/app` routes)                        |

---

## Implementation & Impact

- **Rp 1 billion** recorded in Sedompet across shared family wallets, with every balance and budget figure exact to the rupiah.
- **Zero-setup demo**: an offline "Keluarga Santoso" family with two months of data runs entirely in the browser — open two tabs as two family members and watch entries sync between them.
- Family features the single-user app couldn't express: roles for children, private pockets, per-member spending, allowance budgets, a chat-style family activity feed.
- Forecasting combines registered recurring bills and income with 90-day spending pace to project month-end and three-month balances, with plain-language guidance when spending is trending over budget.
