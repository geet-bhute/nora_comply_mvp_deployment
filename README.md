# Nora Comply — EU AI Act Compliance Platform (MVP)

Nora Comply is a multi-tenant SaaS web application that helps companies operating in the EU understand and fulfil their obligations under the **EU AI Act (Regulation (EU) 2024/1689)**. It is built for organisations that deploy AI systems — known as "deployers" under the Act — and need a structured, legally accurate way to register their AI tools, classify risk, track Article 26 obligations, and generate evidence for boards and regulators.

---

## What problem this solves

The EU AI Act places significant compliance duties on any business that uses AI systems, particularly "high-risk" ones (e.g. recruitment scoring, CV screening, essential-service decisions). Most companies have no way to:

- Know which of their AI tools are high-risk and why
- Track which of the 10 Article 26 deployer obligations they've fulfilled per use case
- Stay on top of regulatory timeline changes (e.g. the Digital Omnibus deferrals)
- Produce evidence-ready documentation for regulators or boards

Nora Comply solves all of this in one workspace, without requiring legal expertise.

---

## Architecture: the two-layer model

The entire application is built around a strict separation between two types of content:

### Layer A — Fixed (EU AI Act knowledge layer)
Identical for every tenant. Ships with the product. This includes:
- The full Article 26 obligation checklist (10 items, legally verified)
- The risk-rationale library (explains why a use case is high / limited / minimal risk, keyed by `classKey`)
- The Responsible AI Use explainer (risk tiers, provider vs deployer, the regulatory timeline)
- The Internal Policy template (structure + all clause text)
- Evidence pack card descriptions
- Ask Nora's framing copy and retrieval-grounded behaviour
- Regulatory alerts (e.g. the Omnibus timeline update)

### Layer B — Variable (per-tenant data layer)
Loaded from the logged-in company's record. Drives everything company-specific via merge tokens (`{{tenant.name}}`, `{{system.name}}`, `{{useCase.riskTier}}`, etc.).

This separation means legally accurate content is never duplicated or hand-written per client — it is written once and rendered with tenant data slotted in.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database / Auth | Supabase (Postgres + cookie-based session) |
| AI chat (Ask Nora) | Groq (`llama-3.3-70b-versatile`) via OpenAI-compatible SDK |
| Embeddings (RAG) | OpenAI `text-embedding-3-small` |
| Email | Resend |
| Deployment | Vercel-compatible (standard Next.js) |

---

## Application structure

```
app/
  (landing)/          # Public marketing page and demo request form
  (auth)/sign-in/     # Sign-in page (sets nora_session cookie)
  (app)/              # Protected workspace (requires session)
    dashboard/        # Overview — at-a-glance compliance position
    tools/            # Your Systems — register and view AI tools
    yourtools/        # Per-system use-case detail screen
    checklist/        # Obligation Monitor — Article 26 checklist per high-risk use case
    policy/           # Internal Policy — editable template with tenant merge fields
    evidence/         # Evidence Packs — board summary, regulator pack, gap report
    responsible-ai/   # Responsible AI Use — plain-English Act explainer
    ask/              # Ask Nora — retrieval-grounded AI chat
    alerts/           # Alerts & Updates — tool changes and regulatory updates
  api/
    chat/             # Ask Nora streaming RAG endpoint (Groq + OpenAI embeddings)
    demo/             # Demo inquiry submission endpoint (Resend email)

components/           # Shared UI components (Sidebar, Topbar, Drawers, Toast, etc.)
lib/
  data.ts             # Seed data (Northgate Recruitment demo tenant)
  types.ts            # TypeScript types for Tools, UseCases, Alerts, etc.
  store.tsx           # React context for tenant state
  knowledge-base.ts   # EU AI Act knowledge base text for RAG
  knowledge-base-embeddings.json  # Pre-computed embeddings (avoids per-request KB embedding)
  supabase.ts         # Supabase client

scripts/
  precompute-embeddings.mjs  # One-time script to generate knowledge-base-embeddings.json

supabase/migrations/
  001_demo_inquiries.sql     # Table for landing page demo requests
  002_rag_documents.sql      # Table structure for RAG documents

prompts/
  nora_1.md           # Full build spec for the application (Wireframe V2)

middleware.ts          # Route protection — redirects unauthenticated users to /sign-in
```

---

## The 8 workspace screens

| Screen | Route | Purpose |
|---|---|---|
| Overview | `/dashboard` | At-a-glance compliance position: system count, use-case count, obligations fulfilled, next key regulatory date, and the highest-severity alert |
| Your Systems | `/tools` | Register AI tools and view their use cases with risk classifications |
| Obligation Monitor | `/checklist` | Tracks the 10 Article 26 obligations per high-risk use case; shows completion progress |
| Internal Policy | `/policy` | Ready-to-edit internal AI use policy with tenant merge fields; exportable |
| Evidence Packs | `/evidence` | Generates board summaries, regulator packs, and gap reports from live data |
| Responsible AI Use | `/responsible-ai` | Plain-English explainer of risk tiers, provider vs deployer duties, and the regulatory timeline |
| Ask Nora | `/ask` | Retrieval-grounded AI chat that answers from the Act and your own records — never guesses |
| Alerts & Updates | `/alerts` | Tool/use-case change alerts (per-tenant) and regulatory updates (all tenants) |

---

## Ask Nora — how the RAG pipeline works

1. The EU AI Act knowledge base (`lib/knowledge-base.ts`) is chunked and embedded once using OpenAI `text-embedding-3-small`. The result is stored in `lib/knowledge-base-embeddings.json` and loaded at cold start — no embedding API call is made per request for the knowledge base.
2. When a user sends a message, one embedding call is made for the query.
3. The top 4 most relevant chunks are retrieved by cosine similarity (`lib/rag-utils`).
4. Those chunks plus the conversation history are sent to Groq (`llama-3.3-70b-versatile`) with a system prompt that instructs the model to answer only from the provided context, cite sources, and say so if it cannot ground an answer.
5. The response streams back to the client.

To regenerate the pre-computed embeddings (e.g. after updating the knowledge base):

```bash
npx tsx scripts/precompute-embeddings.mjs
```

---

## Risk classification

Every AI use case is tagged with a `classKey` that maps to an entry in the fixed risk-rationale library. The key follows the pattern `tier.area`, for example:

| classKey | Risk tier | EU AI Act basis |
|---|---|---|
| `high.employment` | High | Annex III, point 4 — recruitment and worker management |
| `high.education` | High | Annex III, point 3 — education and vocational training |
| `high.essential_services` | High | Annex III, point 5 — benefits, credit, insurance, emergency triage |
| `high.biometrics` | High | Annex III, point 1 — biometric identification and categorisation |
| `high.borderline_6_3` | High | Assistive tasks that support a high-risk decision (possible Art. 6(3) exemption) |
| `limited.chatbot` | Limited | Article 50(1) — must disclose AI interaction |
| `limited.deepfake_media` | Limited | Article 50(4) — must disclose AI-generated content |
| `minimal.general` | Minimal | No specific Act obligations beyond AI literacy |

When a use case drawer is opened in the UI, the explanation is pulled from the library using the `classKey` — it is never hand-written per company.

---

## Regulatory accuracy

The fixed content in this application is grounded in:

- **EU AI Act** (Reg. (EU) 2024/1689) — Articles 4, 5, 26, 27, 50, 73, 86; Annex III
- **Digital Omnibus on AI** — provisional political agreement of 7 May 2026

Key compliance dates reflected in the application:

| Date | What applies |
|---|---|
| 2 Feb 2025 | Prohibited practices (Art. 5) and AI literacy (Art. 4) — **in force** |
| 2 Aug 2025 | Governance rules and GPAI model obligations — **in force** |
| 2 Aug 2026 | Act generally applicable; **Article 50 transparency duties for deployers** |
| 2 Dec 2026 | Provider watermarking of AI output (Art. 50(2)) |
| 2 Dec 2027 | Annex III high-risk obligations — Article 26 deployer duties and Article 27 FRIA (deferred from Aug 2026 by Digital Omnibus) |
| 2 Aug 2028 | High-risk AI embedded in regulated products (Annex I) |

> The Omnibus deferrals are legally effective only once formally adopted and published in the Official Journal. Until then, 2 Aug 2026 stands as written in the Act. When adoption is confirmed, update only `lib/knowledge-base.ts` (the timeline section) and the regulatory alert in the Alerts screen.

---

## Getting started

### Prerequisites

- Node.js 18+
- A Supabase project (for auth and demo-inquiry storage)
- An OpenAI API key (for query embeddings)
- A Groq API key (for Ask Nora LLM responses)
- A Resend API key (for demo inquiry emails, optional)

### Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Required variables:

```
OPENAI_API_KEY=          # OpenAI — used for query embeddings only
GROQ_API_KEY=            # Groq — used for Ask Nora LLM responses
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=          # Optional — only needed for demo inquiry emails
```

### Install and run

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

### Database setup

Run the Supabase migrations in order:

```
supabase/migrations/001_demo_inquiries.sql
supabase/migrations/002_rag_documents.sql
```

### Pre-compute knowledge-base embeddings

This only needs to be run once (or when `lib/knowledge-base.ts` changes):

```bash
npx tsx scripts/precompute-embeddings.mjs
```

---

## Demo tenant / seed data

The application ships with demo data for **Northgate Recruitment** — a fictional recruitment firm used to make the demo look populated. This data lives in `lib/data.ts` and `lib/store.tsx`. A real multi-tenant deployment replaces this with records loaded from the logged-in company's database row.

The demo includes:
- 3 AI systems: Bullhorn, Claude, Microsoft Copilot
- 6 use cases across those systems, with a mix of high-risk and minimal-risk classifications
- 1 urgent tenant alert (Bullhorn added a candidate-match feature)
- 1 fixed regulatory alert (Omnibus deferral update)
- A compliance health score of ~48% (19 of 40 possible obligations fulfilled)

---

## Authentication

Route protection is handled by `middleware.ts`. A `nora_session` cookie is checked on every request to the protected `(app)` group. Users without a session are redirected to `/sign-in`; users with a session visiting `/` or `/sign-in` are redirected to `/dashboard`.

---

## Build

```bash
npm run build
npm run start
```

The project is a standard Next.js 14 App Router application and deploys without configuration on Vercel.
