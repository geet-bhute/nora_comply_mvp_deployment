import type { ChecklistItem, Tool, EvidenceItem, Alert, Matter, RagStatus, RegisterCategory } from './types'

export const COMPANY = { name: 'Northgate Recruitment', sub: 'EU AI Act workspace' }

export const CHECKLIST: ChecklistItem[] = [
  { id: 'c1', t: 'Follow the instructions', recurring: false, done: true,
    plain: "Use the system the way the provider says to use it.",
    basis: "Article 26(1) — use in line with the provider's instructions." },
  { id: 'c2', t: 'Have a competent person overseeing it', recurring: false, done: false,
    plain: "That employee needs to have completed AI literacy training and have the authority to act — to review the output and overrule it where needed.",
    basis: "Article 26(2) — assign human oversight to competent, empowered people." },
  { id: 'c3', t: 'Keep your data clean', recurring: false, done: false,
    plain: "If you control what data goes into the system, make sure it's relevant and representative for what you're using it for.",
    basis: "Article 26(4) — deployer duty over input data." },
  { id: 'c4', t: 'Watch it while it runs', recurring: true, done: false,
    plain: "Monitor the system, and if something looks risky or goes wrong, report it to the provider, distributor and the relevant authority immediately. Pause use if needed.",
    basis: "Article 26(5) — monitoring and incident reporting (Articles 72 & 79)." },
  { id: 'c5', t: 'Keep logs for at least 6 months', recurring: true, done: false,
    plain: "Hold onto the system's automatically generated records, to the extent they're under your control, for at least six months.",
    basis: "Article 26(6) — record-keeping." },
  { id: 'c6', t: 'Tell your workers', recurring: false, done: true,
    plain: "Before deploying an AI system in the workplace, inform the employees and their representatives that it's being used.",
    basis: "Article 26(7) — inform workers and their representatives." },
  { id: 'c7', t: 'Check the EU database', recurring: false, done: false,
    plain: "If you're a public body, make sure the system is registered before using it. If it isn't, don't use it and flag it to the provider.",
    basis: "Article 26(8) — registration check (Articles 49 & 71)." },
  { id: 'c8', t: 'Data protection impact assessments', recurring: false, done: false,
    plain: "Use the system's documentation to help you run any required GDPR privacy impact assessments.",
    basis: "Article 26(9) — DPIA under GDPR Article 35." },
  { id: 'c9', t: 'Tell people when AI is making decisions about them', recurring: false, done: false,
    plain: "If the system is making or influencing decisions about individuals, those people need to be informed.",
    basis: "Article 26(11) with Article 50 — transparency to affected people." },
  { id: 'c10', t: 'Cooperate with regulators', recurring: true, done: false,
    plain: "If authorities come knocking, work with them on any action they take in relation to the system.",
    basis: "Article 26(12) — cooperate with competent authorities." },
]

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
  red: ['c1', 'c2', 'c3', 'c4', 'c5', 'c7', 'c8', 'c9', 'c10'],
  amber: ['c1', 'c4', 'c9', 'c10'],
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

export const TOOLS: Tool[] = [
  {
    id: 'bullhorn',
    name: 'Bullhorn',
    vendor: 'Applicant tracking system',
    change: 'A new candidate-match use case appeared with no notice. We re-rated that use case Green → Red (high risk) on 4 Jun.',
    useCases: [
      {
        id: 'uc-bh-1',
        name: 'Candidate–role match scoring',
        rag: 'red',
        what: 'Usable once the Nora Comply compliance evidencing has been set up and checklist items ticked. Scores and ranks candidates against a role, directly influencing who gets shortlisted.',
        basis: 'Annex III high-risk — Employment, worker management & access to self-employment.',
        obligations: ['c1', 'c2', 'c3', 'c4', 'c5', 'c8', 'c9', 'c10'],
      },
      {
        id: 'uc-bh-2',
        name: 'CV summarisation & admin drafting',
        rag: 'green',
        what: 'Summarises CVs and drafts admin text. No automated decision about a person — output is human-edited.',
        basis: 'Minimal risk — not high-risk or transparency-listed.',
        obligations: ['c1', 'c2'],
      },
    ],
  },
  {
    id: 'copilot',
    name: 'Microsoft Copilot',
    vendor: 'General assistant',
    useCases: [
      {
        id: 'uc-cp-1',
        name: 'Pitch & report drafting',
        rag: 'green',
        what: 'Drafts pitches and reports for staff. No decisions about people; output is always human-edited.',
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

export const EVIDENCE_DATA: EvidenceItem[] = [
  { n: 'Internal AI policy (draft)', t: 'Policy · in progress', linked: 'Have a real person overseeing it' },
  { n: 'AI-literacy training records', t: 'Training record · complete', linked: 'Have a real person overseeing it' },
  { n: 'Bullhorn DPIA', t: 'DPIA · outstanding', linked: 'Data protection impact assessments' },
  { n: 'Candidate AI notice', t: 'Policy · live on careers page', linked: 'Tell people when AI is making decisions about them' },
]

export const ALERT: Alert = {
  sev: 'urgent',
  title: 'Bullhorn added a candidate-match feature with no notice',
  body: "A new match-% scoring use case appeared in your account. We've re-rated that use case Green → Red (high risk) and listed the checklist items it now triggers.",
}

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
      { who: 'firm', name: 'LC', txt: "Thanks — the context bundle covers everything we need; no call required. Short answer: yes. At renewal, push for an “AI Feature Change Notice” clause: 30 days' written notice before any feature that processes personal data or influences decisions about individuals is enabled, with an opt-out default. We've drafted the clause and a fallback position.", meta: 'External counsel · privileged' },
      { who: 'firm', name: 'LC', txt: "Attached: draft clause v1 + negotiation note. Once you confirm, we'll mark the matter resolved and the advice will file to your evidence vault against the Bullhorn record.", meta: 'Draft_clause_v1.docx · Negotiation_note.pdf' },
    ],
  },
]
