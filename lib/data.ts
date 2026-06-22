import type { ChecklistItem, Tool, EvidenceItem, Alert, Matter, RagStatus, RegisterCategory } from './types'

// ── Layer B: Tenant record (demo seed — Northgate Recruitment) ──────────────
export const TENANT = {
  name: 'Northgate Recruitment',
  sector: 'Recruitment',
  workspaceLabel: 'EU AI Act workspace',
}

// Alias kept for any existing component still referencing COMPANY
export const COMPANY = { name: TENANT.name, sub: TENANT.workspaceLabel }

// ── Layer A: Fixed — Article 26 Obligation Checklist (§6.1) ────────────────
// 10 items identical for every high-risk use case, every tenant.
// Render verbatim; do not paraphrase.
export const CHECKLIST: ChecklistItem[] = [
  {
    id: 'c1',
    t: "Follow the vendor's instructions for use",
    recurring: false,
    done: true,
    plain: "Obtain the provider's instructions and use the system only for the purpose they state. Repurposing it can make you the provider under Article 25. Keep a copy on file.",
    basis: 'Article 26(1)',
  },
  {
    id: 'c2',
    t: 'Have an assigned employee overseeing it',
    recurring: false,
    done: false,
    plain: "Name a person with the competence, training and authority to monitor outputs and to override or stop the system. Record who they are and what they're empowered to do.",
    basis: 'Article 26(2)',
  },
  {
    id: 'c3',
    t: 'Keep your input data clean',
    recurring: false,
    done: false,
    plain: "To the extent you control the input data, make sure it's relevant and representative for the system's purpose. Document its source and any known gaps or bias.",
    basis: 'Article 26(4)',
  },
  {
    id: 'c4',
    t: 'Monitor how the system performs',
    recurring: true,
    done: false,
    plain: "Watch operation against the provider's instructions. Define what 'off' looks like and who watches for it.",
    basis: 'Article 26(5)',
  },
  {
    id: 'c5',
    t: 'Suspend use and report serious incidents',
    recurring: true,
    done: false,
    plain: 'If the system creates a risk to health, safety or fundamental rights, suspend use, inform the provider and the relevant market-surveillance authority without undue delay, and log it.',
    basis: 'Article 26(5) · Article 73',
  },
  {
    id: 'c6',
    t: "Keep the system's logs for at least six months",
    recurring: true,
    done: false,
    plain: "Retain the logs the system generates automatically, where they're under your control, for at least six months (longer if other law requires). Confirm logging is on and accessible.",
    basis: 'Article 26(6)',
  },
  {
    id: 'c7',
    t: 'Tell your staff before you use it on them',
    recurring: false,
    done: true,
    plain: 'Before deploying a high-risk system in the workplace, inform affected workers and their representatives. Keep a record.',
    basis: 'Article 26(7)',
  },
  {
    id: 'c8',
    t: 'Tell people affected by an AI-assisted decision',
    recurring: false,
    done: false,
    plain: 'Where the system makes or assists decisions about people, those individuals must be told a high-risk AI system is being used on them.',
    basis: 'Article 26(11)',
  },
  {
    id: 'c9',
    t: 'Do a data protection impact assessment (DPIA)',
    recurring: false,
    done: false,
    plain: "Use the provider's Article 13 documentation to complete or update your DPIA. The AI Act duty builds on your existing GDPR duty — extend it, don't duplicate.",
    basis: 'Article 26(9) · GDPR Art. 35',
  },
  {
    id: 'c10',
    t: 'Complete a Fundamental Rights Impact Assessment (FRIA)',
    recurring: false,
    done: false,
    plain: 'Before first use, assess the impact on fundamental rights: who\'s affected, what could go wrong, what safeguards and human oversight are in place, and what you\'ll do if harm occurs.',
    basis: 'Article 27',
  },
]

// All 10 obligation IDs (every high-risk use case carries all 10)
export const ALL_OBLIGATION_IDS = CHECKLIST.map(c => c.id)

// ── Provider-side obligations (for the Responsible AI Use breakdown) ───────
export const PROVIDER_OBLIGATIONS = [
  { id: 'p1', t: 'Risk management system', basis: 'Article 9',
    plain: "Establish, implement, document and maintain a risk management process across the system's entire lifecycle, identifying and mitigating reasonably foreseeable risks." },
  { id: 'p2', t: 'Data governance', basis: 'Article 10',
    plain: 'Ensure training, validation and testing data is relevant, sufficiently representative and examined for possible bias, to the extent feasible.' },
  { id: 'p3', t: 'Technical documentation', basis: 'Article 11',
    plain: "Draw up and keep up to date documentation showing the system meets the Act's requirements, before placing it on the market." },
  { id: 'p4', t: 'Logging design', basis: 'Article 12',
    plain: 'Design the system to automatically generate logs over its lifetime, appropriate to its intended purpose, so deployers can meet their own record-keeping duties.' },
  { id: 'p5', t: 'Accuracy, robustness and cybersecurity', basis: 'Article 15',
    plain: 'Meet appropriate, declared levels of accuracy and robustness, and resilience against errors, faults and attempts to exploit vulnerabilities.' },
  { id: 'p6', t: 'Conformity assessment and CE marking', basis: 'Articles 16–20, 43–48',
    plain: 'Carry out a conformity assessment against the requirements and affix the CE marking before placing the system on the market.' },
  { id: 'p7', t: 'EU database registration', basis: 'Article 49',
    plain: 'Register standalone high-risk systems in the EU database before placing them on the market or putting them into service.' },
  { id: 'p8', t: 'Quality management system', basis: 'Article 17',
    plain: 'Operate a documented QMS covering regulatory compliance strategy, design controls, data management, and testing procedures.' },
  { id: 'p9', t: 'Post-market monitoring', basis: 'Article 72',
    plain: 'Actively monitor the system after it reaches the market, and report serious incidents to the relevant authorities (Article 73).' },
]

// ── Layer A: Fixed — Risk-Rationale Library (§6.2) ─────────────────────────
// Keyed by classKey. Slot {{useCase.name}} / {{system.name}} at render time.
// HIGH RISK — Annex III
export const RISK_RATIONALE: Record<string, string> = {
  'high.biometrics':
    'This use involves biometrics — remote biometric identification, biometric categorisation inferring sensitive attributes, or emotion recognition — which is high-risk under Annex III, point 1. (Pure verification that you are who you claim to be is excluded.) Because it touches privacy and non-discrimination, the Article 26 obligations and an Article 27 FRIA apply.',
  'high.critical_infrastructure':
    'This is a safety component in the management or operation of critical infrastructure (digital infrastructure, road traffic, or the supply of water, gas, heating or electricity) — high-risk under Annex III, point 2, because failure can endanger health and safety at scale. Article 26 obligations and an Article 27 FRIA apply.',
  'high.education':
    "This use decides access, admission or assignment to education or training, evaluates learning outcomes, steers learning, or monitors test conduct — high-risk under Annex III, point 3, because it can shape a person's educational and career path. Article 26 obligations and an Article 27 FRIA apply.",
  'high.employment':
    'This use sits in recruitment, selection or worker management — targeted job ads, filtering applications, evaluating or scoring candidates, or decisions on promotion, termination, task allocation or performance — high-risk under Annex III, point 4. An automated output can decide who progresses, touching the right to non-discrimination and fair access to employment. High-risk doesn\'t mean banned: the Article 26 obligations and an Article 27 FRIA apply.',
  'high.essential_services':
    'This use affects access to essential public or private services — benefit eligibility, creditworthiness (other than fraud detection), emergency-call triage, or health/life insurance risk and pricing — high-risk under Annex III, point 5, because it can determine access to things people depend on. Article 26 obligations and an Article 27 FRIA apply.',
  'high.law_enforcement':
    'This is a law-enforcement use — victim-risk or re-offending assessment, polygraphs, evidence-reliability evaluation, or profiling in investigations — high-risk under Annex III, point 6. Article 26 obligations and an Article 27 FRIA apply.',
  'high.migration_border':
    'This is a migration, asylum or border-control use — polygraphs, irregular-migration or health-risk assessment, examining visa/asylum/residence applications, or identification (other than verifying travel documents) — high-risk under Annex III, point 7. Article 26 obligations and an Article 27 FRIA apply.',
  'high.justice_democracy':
    'This use supports the administration of justice or democratic processes — researching and applying the law to facts, alternative dispute resolution, or influencing elections, referenda or voting behaviour — high-risk under Annex III, point 8. Article 26 obligations and an Article 27 FRIA apply.',
  'high.borderline_6_3':
    "We've rated this high-risk to stay safe. It supports a high-risk decision (e.g. summarising or pre-processing information a reviewer then acts on), which usually keeps it in scope under Annex III. It could qualify for the narrow Article 6(3) exemption — for tasks that don't materially influence the outcome, where a human independently reviews the full underlying information. If you can evidence that, ask Nora about re-rating.",
  // LIMITED RISK — Article 50
  'limited.chatbot':
    "Minimal decision-making, but a transparency duty applies: under Article 50, anyone interacting directly with this system must be made aware they're dealing with an AI, at the latest at first interaction (Article 50(5)).",
  'limited.deepfake_media':
    'This generates or manipulates image, audio or video that could appear authentic. Under Article 50(4), you must disclose that the content is artificially generated or manipulated (lighter touch for clearly artistic, satirical or fictional work).',
  'limited.public_text':
    "This generates text published to inform the public on matters of public interest. Under Article 50(4) you must disclose it's AI-generated, unless a human took editorial responsibility.",
  'limited.emotion_biometric_categorisation':
    'Under Article 50(3), people exposed to emotion-recognition or biometric-categorisation systems must be informed it\'s operating, with data handled under GDPR. (Many such systems are also high-risk — both sets of duties can apply.)',
  // MINIMAL RISK
  'minimal.general':
    "This use doesn't evaluate or decide anything about individuals, so it's minimal risk — no specific obligations beyond good practice. Two things to keep in view: Article 4 AI literacy still applies to everyone using it, and if it's ever pointed at decisions about people (scoring, selection, targeted ads), it would re-rate to high-risk.",
}

// ── Layer A: Annex III category list ────────────────────────────────────────
export const ANNEX3: RegisterCategory[] = [
  'Non-banned biometrics',
  'Critical infrastructure',
  'Education and vocational training',
  'Employment, workers management and access to self-employment',
  'Access and enjoyment of essential public and private services',
  'Law enforcement',
  'Migration, asylum, and border control management',
  'Administration of justice and democratic processes',
]

export const REGISTER_CATEGORIES: RegisterCategory[] = ['Minimal risk', 'Limited risk — transparency', ...ANNEX3]

export const OBS_FOR_RAG: Record<RagStatus, string[]> = {
  red: ALL_OBLIGATION_IDS,
  amber: ['c1', 'c4', 'c8'],
  green: ['c1'],
}

export function ragForCategory(cat: RegisterCategory): RagStatus {
  if (cat === 'Minimal risk') return 'green'
  if (cat === 'Limited risk — transparency') return 'amber'
  return 'red'
}

export function basisForCategory(cat: RegisterCategory): string {
  if (cat === 'Minimal risk') return 'Minimal risk — not high-risk or transparency-listed.'
  if (cat === 'Limited risk — transparency') return 'Limited risk — Article 50 transparency duties apply.'
  return `Annex III high-risk — ${cat}.`
}

export function classKeyForCategory(cat: RegisterCategory): string {
  const map: Partial<Record<RegisterCategory, string>> = {
    'Non-banned biometrics': 'high.biometrics',
    'Critical infrastructure': 'high.critical_infrastructure',
    'Education and vocational training': 'high.education',
    'Employment, workers management and access to self-employment': 'high.employment',
    'Access and enjoyment of essential public and private services': 'high.essential_services',
    'Law enforcement': 'high.law_enforcement',
    'Migration, asylum, and border control management': 'high.migration_border',
    'Administration of justice and democratic processes': 'high.justice_democracy',
    'Limited risk — transparency': 'limited.chatbot',
    'Minimal risk': 'minimal.general',
  }
  return map[cat] ?? 'minimal.general'
}

// ── Layer B: Tools / Systems — Demo seed (§8, Northgate Recruitment) ────────
// Fully replaceable. Swap the tenant record and every screen updates.
export const TOOLS: Tool[] = [
  {
    id: 'bullhorn',
    name: 'Bullhorn',
    logo: '/logos/bullhorn.webp',
    vendor: 'Applicant tracking system',
    change: "A new candidate-match use case appeared in your account. We've re-rated it Green → Red (high risk) and listed the checklist items it now triggers.",
    useCases: [
      {
        id: 'uc-bh-1',
        name: 'Candidate Role Match Scoring',
        rag: 'red',
        classKey: 'high.employment',
        obligationsFulfilled: 7,
        what: 'Scores and ranks candidates against a role, directly influencing who gets shortlisted. Automated output can decide who progresses.',
        basis: 'Annex III high-risk — Employment, workers management and access to self-employment.',
        obligations: ALL_OBLIGATION_IDS,
      },
      {
        id: 'uc-bh-2',
        name: 'CV Summarisation and Admin Drafting',
        rag: 'red',
        classKey: 'high.borderline_6_3',
        obligationsFulfilled: 4,
        what: 'Summarises CVs and drafts admin text. Supports a high-risk decision — output is human-reviewed but assists the shortlisting process.',
        basis: 'Annex III high-risk (borderline) — supports employment decisions.',
        obligations: ALL_OBLIGATION_IDS,
      },
    ],
  },
  {
    id: 'claude',
    name: 'Claude',
    logo: '/logos/claude.png',
    vendor: 'General-purpose AI assistant',
    useCases: [
      {
        id: 'uc-cl-1',
        name: 'Internal Drafting & Q&A',
        rag: 'green',
        classKey: 'minimal.general',
        what: 'Drafts internal documents and answers staff questions. No decisions about people — output is always human-edited.',
        basis: 'Minimal risk — not high-risk or transparency-listed.',
        obligations: ['c1'],
      },
      {
        id: 'uc-cl-2',
        name: 'Candidate Assessment Summaries',
        rag: 'red',
        classKey: 'high.employment',
        obligationsFulfilled: 5,
        what: 'Summarises candidate assessments to support shortlisting decisions. Directly influences who progresses in the recruitment process.',
        basis: 'Annex III high-risk — Employment, workers management and access to self-employment.',
        obligations: ALL_OBLIGATION_IDS,
      },
      {
        id: 'uc-cl-3',
        name: 'Automated Shortlisting & Ranking',
        rag: 'red',
        classKey: 'high.employment',
        obligationsFulfilled: 3,
        what: 'Automatically shortlists and ranks candidates. Automated output directly determines who progresses to interview.',
        basis: 'Annex III high-risk — Employment, workers management and access to self-employment.',
        obligations: ALL_OBLIGATION_IDS,
      },
    ],
  },
  {
    id: 'copilot',
    name: 'Microsoft Copilot',
    logo: '/logos/copilot.avif',
    vendor: 'General assistant',
    useCases: [
      {
        id: 'uc-cp-1',
        name: 'Office Productivity',
        rag: 'green',
        classKey: 'minimal.general',
        what: 'Assists with office tasks — drafting emails, summarising documents, creating presentations. No decisions about people; output always human-edited.',
        basis: 'Minimal risk — not high-risk or transparency-listed.',
        obligations: ['c1'],
      },
    ],
  },
]

const RAG_ORDER: Record<RagStatus, number> = { green: 0, amber: 1, red: 2 }

export function toolRag(tool: Tool): RagStatus {
  return tool.useCases.reduce<RagStatus>((worst, uc) => (RAG_ORDER[uc.rag] > RAG_ORDER[worst] ? uc.rag : worst), 'green')
}

// Derived counts computed from live tenant data
export function computeCounts(tools: Tool[]) {
  const allUseCases = tools.flatMap(t => t.useCases)
  const highRiskUseCases = allUseCases.filter(uc => uc.rag === 'red')
  const obligationsTotal = highRiskUseCases.length * 10
  const obligationsFulfilled = highRiskUseCases.reduce((sum, uc) => sum + (uc.obligationsFulfilled ?? 0), 0)
  const healthPct = obligationsTotal > 0 ? Math.round((obligationsFulfilled / obligationsTotal) * 100) : 100
  return {
    systems: tools.length,
    useCases: allUseCases.length,
    highRiskUseCases: highRiskUseCases.length,
    obligationsTotal,
    obligationsFulfilled,
    healthPct,
  }
}

// ── Layer B: Tenant alert (demo seed) ────────────────────────────────────────
export const ALERT: Alert = {
  sev: 'urgent',
  title: 'Bullhorn added a candidate-match feature with no notice',
  body: "A new use case appeared in your account. We've re-rated it Green → Red (high risk) and listed the checklist items it now triggers.",
}

// ── Layer B: Evidence ────────────────────────────────────────────────────────
export const EVIDENCE_DATA: EvidenceItem[] = [
  { n: 'Internal AI policy (draft)', t: 'Policy · in progress', linked: 'Have an assigned employee overseeing it' },
  { n: 'AI-literacy training records', t: 'Training record · complete', linked: 'Have an assigned employee overseeing it' },
  { n: 'Bullhorn DPIA', t: 'DPIA · outstanding', linked: 'Do a data protection impact assessment (DPIA)' },
  { n: 'Candidate AI notice', t: 'Policy · live on careers page', linked: 'Tell people affected by an AI-assisted decision' },
]

// ── Layer B: Legal matters ───────────────────────────────────────────────────
export const INITIAL_MATTERS: Matter[] = [
  {
    id: 'm1',
    title: 'Vendor contract: AI-feature change-notice clause',
    firm: 'External counsel',
    tier: 3,
    status: 'In progress',
    price: '€450 fixed',
    sla: '3 business days',
    opened: '9 Jun',
    q: 'Can we require our ATS vendor to give notice before enabling new AI features? What clause should we push for at renewal?',
    bundle: [
      "Your question + Ask Nora's attempted answer",
      'Bullhorn use cases + risk history',
      'Checklist items the match use case triggers',
      'Current vendor contract (uploaded)',
    ],
    thread: [
      { who: 'firm', name: 'LC', txt: "Thanks — the context bundle covers everything we need; no call required. Short answer: yes. At renewal, push for an 'AI Feature Change Notice' clause: 30 days' written notice before any feature that processes personal data or influences decisions about individuals is enabled, with an opt-out default. We've drafted the clause and a fallback position.", meta: 'External counsel · privileged' },
      { who: 'firm', name: 'LC', txt: "Attached: draft clause v1 + negotiation note. Once you confirm, we'll mark the matter resolved and the advice will file to your evidence vault against the Bullhorn record.", meta: 'Draft_clause_v1.docx · Negotiation_note.pdf' },
    ],
  },
]
