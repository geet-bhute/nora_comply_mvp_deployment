# Nora Comply — Wireframe V2 Build Prompt (Multi-Tenant)

**Hand this file to your coding agent (Claude Code / Cursor / v0 / etc.).**
It re-skins the existing prototype to match Wireframe V2 — the 8 tabs, the structure, and the content. It is built for **any company that logs in**, not for one client. Northgate Recruitment is only **example seed data** for the demo and must be fully replaceable.

---

## 0. READ FIRST — Guardrails (do not break anything that works)

> **Instruction to the agent:** The existing codebase is the source of truth for styling, components, routing, and state. Your job is to make the **navigation, structure, and content** match this spec — not to rebuild the app.

1. **Do not delete or rewrite working components.** Keep the existing design system (navy sidebar, orange active-tab pill, blue primary buttons, red/amber/green risk pills, cards, drawers, chat bubbles). Reuse existing components.
2. **Do not change routing or state management** unless a screen genuinely doesn't exist yet.
3. **Additive only.** Existing features (sector switching, risk drawers, Ask Nora chat, evidence vault, matter queue) stay — only adjust labels/copy/order to match.
4. **No new dependencies** unless strictly required. Use the project's existing icon set.
5. **Literal copy** lives inside `>` blockquotes or fenced blocks. Everything else is instruction.
6. **Old wireframe placeholder notes are NOT content** ("Kath and Emily…", "Need icons…", "Astaarus", "Brennan & Associates"). Remove them. Do not render any of them.
7. **If a spec item conflicts with working code, keep the working code and flag it in a comment.** Don't break a working feature to satisfy a copy change.
8. App must still build with all existing interactions intact.

---

## 1. The two-layer model (this is the core of the rebuild)

Everything on screen is one of two kinds of content. **Build them as two distinct layers.**

### Layer A — FIXED (the EU AI Act knowledge layer)
Identical for every tenant. Ships with the product. Lives in static/config files or a content service — **never** hardcoded inside a tenant record. This includes:
- The Article 26 obligation checklist (the 10 items)
- The risk-rationale library (why a use case is high / limited / minimal risk)
- The Responsible AI Use explainer (risk tiers, provider vs deployer, the timeline)
- The Internal Policy template (structure + clause text)
- The Evidence-pack card descriptions
- Ask Nora's framing copy and behaviour
- Regulatory alerts (e.g. the Omnibus timeline update) — same for all tenants

> ⚠️ This layer must be **legally accurate and current** (Section 6 + Section 11 give the verified text and sources). Do not paraphrase it into something inaccurate.

### Layer B — VARIABLE (the per-tenant data layer)
Loaded from the logged-in company's record. Drives everything tenant-specific via merge tokens:

```
TENANT
  {{tenant.name}}            e.g. "Northgate Recruitment"
  {{tenant.sector}}          e.g. "Recruitment" | "Healthcare" | "Finance" | "Education" | …
  {{tenant.workspaceLabel}}  default "EU AI Act workspace"

SYSTEMS  (0..n)
  {{system.name}}            e.g. "Bullhorn"
  {{system.logo}}
  {{system.useCaseCount}}

USE CASES  (per system, 0..n)
  {{useCase.name}}
  {{useCase.riskTier}}       "high" | "limited" | "minimal"   → drives the red/amber/green pill
  {{useCase.classKey}}       key into the FIXED risk-rationale library (Section 6.2)
  {{useCase.obligationsFulfilled}}   integer 0..10  (high-risk only)

ALERTS  (tenant-specific tool/use-case changes; 0..n)
  {{alert.type}}             "tool_change" | "regulatory"(=fixed) 
  {{alert.title}} {{alert.body}} {{alert.severity}}

POLICY MERGE FIELDS
  {{policy.owner}} {{policy.approvedDate}} {{policy.reviewDate}} {{policy.version}}

EVIDENCE FIGURES (computed from the tenant's live data)
  {{counts.systems}} {{counts.useCases}} {{counts.obligationsFulfilled}} {{counts.obligationsTotal}}
  {{compliance.healthPct}} {{counts.highRiskUseCases}}
```

**Rule of thumb:** if it's a fact about the EU AI Act → Layer A. If it's a fact about *this company* → Layer B (a token). No company name, system name, or count is ever written into the fixed content.

---

## 2. Global shell (every screen)

**Left sidebar (navy)**, brand "Nora Comply" at top. Nav items — exact order, exact labels:

1. Overview
2. Your Systems
3. Obligation Monitor
4. Internal Policy
5. Evidence Packs
6. Responsible AI Use
7. Ask Nora
8. Alerts & Updates

- Active tab = orange filled pill; inactive = light pill.
- Sidebar bottom: avatar, "User", sub-label `{{tenant.name}}`, logout icon.

**Top bar:** shield/logo icon + `{{tenant.name}}` (bold) / `{{tenant.workspaceLabel}}` (sub-label). Right side: status pill — `● Action needed` (red) when any unresolved red alert exists, else `● Up to date` (green). Computed from the tenant's alerts, not hardcoded.

---

## 3. Screen — Overview

Keep it **lean** — an alert-first landing pad, not a copy of the other tabs.

**Title:**
> {{tenant.name}}'s Compliance at a Glance

**At-a-glance strip** — 4 read-only stat tiles, each linking to its tab. All values are tokens:

| Tile | Value | Links to |
|---|---|---|
| AI systems registered | {{counts.systems}} | Your Systems |
| Use cases tracked | {{counts.useCases}} | Your Systems |
| Obligations fulfilled | {{counts.obligationsFulfilled}} / {{counts.obligationsTotal}} | Obligation Monitor |
| Next key date | 2 Aug 2026 — transparency duties | Alerts & Updates |

> Caption: *Your at-a-glance position. Open any tile to see the detail behind it.*

(The "Next key date" tile text is FIXED — it's a regulatory date, the same for all tenants — until the date passes, then it advances to the next milestone in Section 6.3.)

**Primary alert card** — render the tenant's highest-severity unresolved alert here (Layer B). If none, show a calm empty state: *"Nothing needs your attention right now."* For the demo seed, this is the Bullhorn card (Section 7).

---

## 4. Screen — Your Systems

**Title:**
> {{tenant.name}}'s AI Systems

**Subtitle (FIXED, italic):**
> Every AI system has multiple use cases under the EU AI Act. For each use case, the Article 26 deployer obligations must be fulfilled.

**Button:** `+ Register AI system`

**System cards** (grid, one per `{{system}}`): logo + `{{system.name}}`, "Use Cases: {{system.useCaseCount}}", and one risk pill per use case (colour from `{{useCase.riskTier}}`). Card click → that system's use-case screen (Section 4a).

**Empty state** (new tenant, no systems yet):
> No systems registered yet. Add your first AI tool to start mapping its use cases and obligations.

---

## 4a. Screen — System Use Cases (one per system)

**Title:**
> {{tenant.name}}'s {{system.name}} AI Use Cases

**Subtitle (FIXED, italic):**
> Every AI system has multiple use cases under the EU AI Act. For each use case, the Article 26 deployer obligations must be fulfilled.

**Button:** `+ Add Use Case`

**Use-case rows:** "Use Case N" (small, blue) over bold `{{useCase.name}}`, risk pill on the right, chevron → drawer. The drawer renders the **risk rationale pulled from the FIXED library (Section 6.2) using `{{useCase.classKey}}`**, with `{{useCase.name}}` / `{{system.name}}` slotted in. This is how explanations stay correct and consistent for *any* company in *any* sector without hand-writing them per client.

**Standing line (FIXED) inside every high-risk drawer:**
> High-risk systems **are** permitted, but you must have sufficient monitoring and guardrails in place. Track your obligations for each use case in the **Obligation Monitor** tab.

---

## 5. Screen — Obligation Monitor

**Title:**
> {{tenant.name}}'s Obligation Monitor

**Subtitle (FIXED, italic):**
> High-Risk AI Systems must be used in line with the Deployer Obligations under Article 26. Since your company is using high-risk AI systems, you are deemed a deployer under the Act.

**Structure:** a scrollable list — one expandable block per **high-risk** use case (minimal/limited use cases don't appear). Block header: `{{useCase.name}}`, risk pill, `{{useCase.obligationsFulfilled}} / 10 obligations fulfilled`. Expanding shows the FIXED 10-item checklist (Section 6.1); the per-item tick state comes from the tenant record.

**Empty state** (tenant has no high-risk use cases):
> Good news — none of your registered use cases are high-risk, so the Article 26 deployer checklist doesn't apply yet. If that changes, the obligations will appear here automatically.

---

## 6. FIXED CONTENT LIBRARIES (Layer A — verified, render verbatim)

### 6.1 The Article 26 Obligation Checklist (10 items — identical for every high-risk use case, every tenant)

Each row: checkbox · plain-English title · Article badge · chevron → detail drawer.

1. **Follow the vendor's instructions for use** — badge `Article 26(1)`
   > Obtain the provider's instructions and use the system only for the purpose they state. Repurposing it can make *you* the provider under Article 25. Keep a copy on file.
2. **Have an assigned employee overseeing it** — badge `Article 26(2)`
   > Name a person with the competence, training and authority to monitor outputs and to override or stop the system. Record who they are and what they're empowered to do.
3. **Keep your input data clean** — badge `Article 26(4)`
   > To the extent you control the input data, make sure it's relevant and representative for the system's purpose. Document its source and any known gaps or bias.
4. **Monitor how the system performs** — badge `Article 26(5)`
   > Watch operation against the provider's instructions. Define what "off" looks like and who watches for it.
5. **Suspend use and report serious incidents** — badge `Article 26(5) · Article 73`
   > If the system creates a risk to health, safety or fundamental rights, suspend use, inform the provider and the relevant market-surveillance authority without undue delay, and log it.
6. **Keep the system's logs for at least six months** — badge `Article 26(6)`
   > Retain the logs the system generates automatically, where they're under your control, for at least six months (longer if other law requires). Confirm logging is on and accessible.
7. **Tell your staff before you use it on them** — badge `Article 26(7)`
   > Before deploying a high-risk system in the workplace, inform affected workers and their representatives. Keep a record.
8. **Tell people affected by an AI-assisted decision** — badge `Article 26(11)`
   > Where the system makes or assists decisions about people, those individuals must be told a high-risk AI system is being used on them.
9. **Do a data protection impact assessment (DPIA)** — badge `Article 26(9) · GDPR Art. 35`
   > Use the provider's Article 13 documentation to complete or update your DPIA. The AI Act duty builds on your existing GDPR duty — extend it, don't duplicate.
10. **Complete a Fundamental Rights Impact Assessment (FRIA)** — badge `Article 27`
    > Before first use, assess the impact on fundamental rights: who's affected, what could go wrong, what safeguards and human oversight are in place, and what you'll do if harm occurs.

**Cross-cutting notes (FIXED, shown below the list):**
> • **AI literacy (Article 4)** has applied since 2 February 2025 — everyone operating or overseeing these systems should understand how they work and where they fail. It's a standing duty, not a per-system tick.
> • **Right to explanation (Article 86)** — anyone subject to a decision based on one of these systems can ask you for a clear, meaningful explanation of the AI's role in it. Be ready to give one.
> • *Public-authority EU-database registration (Article 26(8)/Article 49) applies only to public bodies, so it's not in this list for private deployers.*

### 6.2 Risk-Rationale Library (keyed by `classKey` — the engine that explains any use case for any sector)

When a use case is registered, it's tagged with a `classKey`. The matching entry renders in the drawer, with `{{useCase.name}}` slotted in. **High-risk entries map to the eight Annex III areas; limited-risk to Article 50; minimal to the residual tier.**

**HIGH RISK — Annex III areas:**

- `high.biometrics` →
  > This use involves biometrics — remote biometric identification, biometric categorisation inferring sensitive attributes, or emotion recognition — which is high-risk under Annex III, point 1. (Pure verification that you are who you claim to be is excluded.) Because it touches privacy and non-discrimination, the Article 26 obligations and an Article 27 FRIA apply.

- `high.critical_infrastructure` →
  > This is a safety component in the management or operation of critical infrastructure (digital infrastructure, road traffic, or the supply of water, gas, heating or electricity) — high-risk under Annex III, point 2, because failure can endanger health and safety at scale. Article 26 obligations and an Article 27 FRIA apply.

- `high.education` →
  > This use decides access, admission or assignment to education or training, evaluates learning outcomes, steers learning, or monitors test conduct — high-risk under Annex III, point 3, because it can shape a person's educational and career path. Article 26 obligations and an Article 27 FRIA apply.

- `high.employment` →
  > This use sits in recruitment, selection or worker management — targeted job ads, filtering applications, evaluating or scoring candidates, or decisions on promotion, termination, task allocation or performance — high-risk under Annex III, point 4. An automated output can decide who progresses, touching the right to non-discrimination and fair access to employment. High-risk doesn't mean banned: the Article 26 obligations and an Article 27 FRIA apply.

- `high.essential_services` →
  > This use affects access to essential public or private services — benefit eligibility, creditworthiness (other than fraud detection), emergency-call triage, or health/life insurance risk and pricing — high-risk under Annex III, point 5, because it can determine access to things people depend on. Article 26 obligations and an Article 27 FRIA apply.

- `high.law_enforcement` →
  > This is a law-enforcement use — victim-risk or re-offending assessment, polygraphs, evidence-reliability evaluation, or profiling in investigations — high-risk under Annex III, point 6. Article 26 obligations and an Article 27 FRIA apply.

- `high.migration_border` →
  > This is a migration, asylum or border-control use — polygraphs, irregular-migration or health-risk assessment, examining visa/asylum/residence applications, or identification (other than verifying travel documents) — high-risk under Annex III, point 7. Article 26 obligations and an Article 27 FRIA apply.

- `high.justice_democracy` →
  > This use supports the administration of justice or democratic processes — researching and applying the law to facts, alternative dispute resolution, or influencing elections, referenda or voting behaviour — high-risk under Annex III, point 8. Article 26 obligations and an Article 27 FRIA apply.

- `high.borderline_6_3` → *(use for "assistive" cases like summarisation that may qualify for the Article 6(3) exemption)*
  > We've rated this high-risk to stay safe. It supports a high-risk decision (e.g. summarising or pre-processing information a reviewer then acts on), which usually keeps it in scope under Annex III. It *could* qualify for the narrow Article 6(3) exemption — for tasks that don't materially influence the outcome, where a human independently reviews the full underlying information. If you can evidence that, ask Nora about re-rating.

**LIMITED RISK — Article 50 transparency:**

- `limited.chatbot` →
  > Minimal decision-making, but a transparency duty applies: under Article 50, anyone interacting directly with this system must be made aware they're dealing with an AI, at the latest at first interaction (Article 50(5)).
- `limited.deepfake_media` →
  > This generates or manipulates image, audio or video that could appear authentic. Under Article 50(4), you must disclose that the content is artificially generated or manipulated (lighter touch for clearly artistic, satirical or fictional work).
- `limited.public_text` →
  > This generates text published to inform the public on matters of public interest. Under Article 50(4) you must disclose it's AI-generated, unless a human took editorial responsibility.
- `limited.emotion_biometric_categorisation` →
  > Under Article 50(3), people exposed to emotion-recognition or biometric-categorisation systems must be informed it's operating, with data handled under GDPR. (Many such systems are *also* high-risk — both sets of duties can apply.)

**MINIMAL RISK:**

- `minimal.general` →
  > This use doesn't evaluate or decide anything about individuals, so it's minimal risk — no specific obligations beyond good practice. Two things to keep in view: Article 4 AI literacy still applies to everyone using it, and if it's ever pointed at decisions about people (scoring, selection, targeted ads), it would re-rate to high-risk.

### 6.3 Responsible AI Use — explainer (FIXED, render as readable sections)

**Title:**
> Responsible AI Use

**Intro:**
> A plain-English guide to how the EU AI Act works, where your tools sit, and what's expected of you. For the legal text behind any point, ask Nora — every answer links to the source.

**The four risk tiers**

> 🔴 **Red — High risk (Annex III).** Permitted but heavily governed. Eight areas: **biometrics** (non-banned); **critical infrastructure**; **education & vocational training**; **employment & worker management** (recruitment, candidate evaluation, promotion, monitoring); **essential public & private services** (benefits, creditworthiness, emergency triage, insurance); **law enforcement**; **migration, asylum & border control**; **administration of justice & democratic processes**.

> 🟡 **Amber — Limited risk (Article 50 transparency).** Not heavily governed, but people must be told: when they're interacting with an AI (50(1)); when exposed to emotion recognition or biometric categorisation (50(3)); when content is a deepfake or AI-generated public-interest text (50(4)). Disclosure must be clear and given at the latest at first interaction or exposure (50(5)).

> 🟢 **Green — Minimal risk.** Everything else — the vast majority of everyday AI (drafting help, spam filters, productivity tools). No specific obligations beyond good practice and AI literacy.

> ⛔ **Unacceptable risk (Article 5) — prohibited.** Banned outright: social scoring, manipulative or exploitative systems, untargeted facial-image scraping, workplace/education emotion recognition, and AI-generated non-consensual intimate imagery and CSAM ("nudifiers", added by the Digital Omnibus). Out of scope for normal business use.

**Provider vs deployer — who owes what**

> **Providers** build or market the system and carry the build-side load: risk management, data governance, technical documentation, logging design, accuracy/robustness, conformity assessment and CE marking, EU-database registration, quality management, post-market monitoring.
>
> **Deployers** put the system to use — that's **you**. Your duties are operational and live in **Article 26**: follow instructions, assign human oversight, keep input data clean, monitor, retain logs six months, inform workers and affected individuals, run your DPIA, and complete an Article 27 FRIA where required — plus give a person an explanation of an AI-assisted decision when asked (Article 86). These duties are yours by law and **can't be contracted away to the vendor.**

**Timeline — what applies and when** *(FIXED; update only when the Omnibus is formally adopted — see Section 11)*

> - **2 Feb 2025** — Prohibited practices (Art 5) and AI literacy (Art 4) apply. ✅ In force.
> - **2 Aug 2025** — Governance rules and general-purpose AI model obligations apply. ✅ In force.
> - **2 Aug 2026** — The Act becomes generally applicable. **Article 50 transparency duties for deployers apply from this date and are *not* deferred.**
> - **2 Dec 2026** — Provider watermarking / machine-readable marking of AI output (Article 50(2)).
> - **2 Dec 2027** — **Annex III standalone high-risk obligations** — your Article 26 duties and Article 27 FRIA — apply from here (deferred from 2 Aug 2026 by the Digital Omnibus).
> - **2 Aug 2028** — High-risk AI embedded in regulated products (Annex I).
>
> **Important:** the high-risk deferrals come from the **Digital Omnibus on AI** (provisional political agreement, 7 May 2026). They take legal effect **only once the Omnibus is formally adopted and published in the Official Journal** — expected before 2 August 2026. Until then, 2 August 2026 stands as the date in the law as written. We track adoption and update these dates automatically.

### 6.4 Internal Policy template (FIXED structure + clauses; only the bracketed/`{{ }}` fields vary by tenant)

**Title:** `Internal Policy Template`
**Intro:** *A ready-to-edit internal AI use policy, pre-filled for your tools and use cases. Adapt the bracketed fields, then export it for sign-off.*
**Buttons:** `Edit policy` · `Export as PDF` · `Export as Word`

> ### {{tenant.name}} — Responsible AI Use Policy
> **Version:** {{policy.version}} · **Owner:** {{policy.owner}} · **Approved:** {{policy.approvedDate}} · **Next review:** {{policy.reviewDate}}
>
> **1. Purpose & scope** — Governs how {{tenant.name}} selects, deploys and oversees AI systems under the EU AI Act and related law (GDPR, employment and equality law). Applies to all staff and contractors who procure, configure, operate or rely on AI systems.
>
> **2. Our role under the Act** — We are a **deployer**. Where we use high-risk systems we meet the Article 26 obligations and complete an Article 27 FRIA. We do not use prohibited systems (Article 5).
>
> **3. System register & risk rating** — Every AI system and use case is recorded with a risk tier. No use case goes live until rated and, if high-risk, given an owner and an obligations checklist.
>
> **4. Human oversight** — Every high-risk use case has a named, trained owner with authority to review, challenge, override or suspend the system. AI informs decisions about people; it doesn't make them unchecked.
>
> **5. Transparency** — Where a system interacts with a person, generates synthetic media, or assists a decision about someone, we disclose it clearly (Articles 50, 26(11), 86).
>
> **6. Data, logging & retention** — Relevant, representative input data where within our control; logs kept at least six months; AI processing aligned with GDPR including DPIAs.
>
> **7. Incidents** — Any risk to health, safety or fundamental rights triggers suspension, escalation, notification to provider and authority, and a logged record.
>
> **8. Training & AI literacy** — All staff who operate or oversee AI receive AI-literacy training appropriate to their role (Article 4).
>
> **9. Procurement & vendor changes** — New tools risk-assessed before purchase; vendor changes monitored; a new or altered feature is re-rated before it's relied upon.
>
> **10. Review** — Reviewed at least annually and whenever the law, our tools, or our use cases change materially.

### 6.5 Evidence Packs (FIXED card copy; preview figures are tokens)

**Title:** `Evidence Generator`
**Subtitle (italic):** *Pre-built evidence reports for your board, a regulator, or leadership team.*

> **Board Summary** *(icon: document)* — A one-page plain-English summary of your AI compliance position: governance score, systems status, data obligations, training completion, and outstanding actions. Ready for your next board meeting.
> *Preview:* "{{tenant.name}} covers {{counts.systems}} AI systems across {{counts.useCases}} use cases. Compliance health: {{compliance.healthPct}}%. {{counts.highRiskUseCases}} high-risk use cases under active monitoring. Policy {{policy.version}} approved {{policy.approvedDate}}. Next review due {{policy.reviewDate}}."

> **Regulator Pack** *(icon: shield)* — Your complete evidence record, formatted for regulatory inspection: tool assessments, EU AI Act risk classifications, GDPR data-processing records, DPA status, training completions, and the incident log. Organised by obligation.

> **Gap Report** *(icon: warning triangle)* — Everything incomplete, overdue or at risk, with clear next steps. Use it to prioritise and close gaps before they become problems.

**Footer (italic):** *Reports are generated from your live evidence log. Every figure is traceable to a specific record.*

### 6.6 Ask Nora (FIXED copy + behaviour)

**Title:** `Ask Nora`
**Subtitle:** *Answers are retrieved from the Act, official guidance, and **your own records**, never guessed. Every claim carries a citation, with a link to the official text when you want the full legal detail.*

**Suggested chips** (tappable, prefill input — phrase generically, slot tenant tool names where natural):
- `Do I need a DPIA for {{system.name}}'s match feature?`
- `What does human oversight actually mean?`
- `When's the deadline now?`
- `Are we liable for vendor bias?`

**Opening message** (with green `● Grounded in law` badge):
> Hi. I answer from the EU AI Act, official guidance, and your own tool register and evidence. If I can't ground an answer, I'll say so and point you to the official text instead of guessing.
>
> Try one of the suggestions above, or ask anything.

**Behaviour:** retrieval-grounded only; show a "Grounded in law" badge per answer; inline citations linking to source; if grounding fails, say so rather than guess. Keep the existing chat plumbing — only match the copy above.

---

## 7. Screen — Alerts & Updates

**Title:** `Alerts & updates`
**Subtitle (FIXED):** *Tool and use-case changes, plus regulatory updates, in one place, so a new use case never appears silently again.*

Two sources feed this list:
- **Tenant alerts (Layer B)** — tool/use-case changes specific to the logged-in company.
- **Regulatory alerts (Layer A, FIXED)** — same for every tenant; Nora pushes these.

**Regulatory alert (FIXED — render for all tenants), blue info card:**
> **EU AI Act timeline updated — high-risk obligations deferred**
> The Digital Omnibus (provisional agreement, 7 May 2026) defers Annex III high-risk duties — including Article 26 deployer obligations and the Article 27 FRIA — from 2 August 2026 to **2 December 2027**. This takes legal effect only once the Omnibus is formally adopted and published (expected before August 2026). **Your Article 50 transparency duties still apply from 2 August 2026.** Your checklist reflects the latest position, so keep closing gaps now.

Button: `See full timeline` (→ Responsible AI Use).

**Tenant alert card** (Layer B example, the demo seed — red card):
> **{{system.name}} added a {{alert.featureName}} feature with no notice**
> A new use case appeared in your account. We've re-rated it {{alert.oldTier}} → {{alert.newTier}} and listed the checklist items it now triggers.

Buttons: `Review {{system.name}} use cases` · `Dismiss`.

**Empty state:** *No alerts right now. We'll flag tool changes and regulatory updates here as they happen.*

---

## 8. DEMO SEED DATA (example only — Northgate Recruitment; fully replaceable)

> This is sample Layer-B data to make the demo look populated. A real tenant's record replaces all of it. The Layer-A content above does **not** change between tenants.

```
tenant: { name: "Northgate Recruitment", sector: "Recruitment", workspaceLabel: "EU AI Act workspace" }

systems:
  - name: "Bullhorn", useCaseCount: 2
      useCases:
        - { name: "Candidate Role Match Scoring",        riskTier: high,    classKey: high.employment,     obligationsFulfilled: 7 }
        - { name: "CV Summarisation and Admin Drafting",  riskTier: high,    classKey: high.borderline_6_3,  obligationsFulfilled: 4 }
  - name: "Claude", useCaseCount: 3
      useCases:
        - { name: "Internal Drafting & Q&A",              riskTier: minimal, classKey: minimal.general }
        - { name: "Candidate Assessment Summaries",       riskTier: high,    classKey: high.employment,     obligationsFulfilled: 5 }
        - { name: "Automated Shortlisting & Ranking",     riskTier: high,    classKey: high.employment,     obligationsFulfilled: 3 }
  - name: "Microsoft Copilot", useCaseCount: 1
      useCases:
        - { name: "Office Productivity",                  riskTier: minimal, classKey: minimal.general }

alerts (tenant):
  - { type: tool_change, system: "Bullhorn", featureName: "candidate-match", oldTier: "Green", newTier: "Red (high risk)", severity: high }

policy: { version: "1.0", owner: "[name / role]", approvedDate: "[date]", reviewDate: "[date]" }

derived counts: systems=3, useCases=6, highRiskUseCases=4, obligationsTotal=40 (4×10), obligationsFulfilled=19, healthPct≈48
```

---

## 9. Regulatory accuracy notes (do not render — for whoever maintains Layer A)

- Basis: EU AI Act (Reg. (EU) 2024/1689) — Articles 4, 5, 26, 27, 50, 73, 86; Annex III (8 areas) — and the **Digital Omnibus on AI** provisional agreement of **7 May 2026**.
- Omnibus deferrals: Annex III standalone high-risk → **2 Dec 2027**; Annex I embedded → **2 Aug 2028**; Art 50(2) provider watermarking → **2 Dec 2026**. As of **June 2026**, formal adoption was **pending** (approval expected June, publication July). Deferrals are legally effective only on publication in the Official Journal; until then 2 Aug 2026 stands as written.
- **Article 50 transparency duties for deployers are NOT deferred** — they apply from 2 Aug 2026. Near-term hook.
- Article 4 AI literacy in force since 2 Feb 2025. Article 5 prohibitions in force since 2 Feb 2025 (now including the new NCII/CSAM "nudifier" ban added by the Omnibus).
- Article 26(8) EU-database registration is a **public-authority** duty — excluded from the private-deployer checklist by design.
- Article 86 (right to explanation) applies to decisions based on Annex III high-risk systems, except Annex III point 2 (critical infrastructure).
- **When the Omnibus is formally adopted, update only: Responsible AI Use §6.3 timeline + the regulatory alert in §7.** Nothing else depends on these dates.

---

## 10. Acceptance checklist (agent self-check)

- [ ] Sidebar = the 8 tabs in the exact order/labels (§2).
- [ ] No tenant name, system, or count is hardcoded into any FIXED content — all via tokens (§1).
- [ ] Northgate appears only as replaceable seed data (§8); swapping the tenant record changes every screen correctly.
- [ ] Risk explanations render from the `classKey` library (§6.2), not per-company hardcoding.
- [ ] Obligation Monitor shows only high-risk use cases; checklist = the 10 FIXED items (§6.1).
- [ ] Empty states exist for: no systems, no high-risk use cases, no alerts.
- [ ] Regulatory alert uses the **updated** deferral dates, not "2 August 2026" for high-risk (§7).
- [ ] All Layer-A copy matches §6 verbatim and is legally accurate.
- [ ] Existing features still work and weren't rewritten; app builds clean.