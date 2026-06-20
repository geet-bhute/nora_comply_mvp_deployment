'use client'

import { useApp } from '@/lib/store'
import { TENANT } from '@/lib/data'

// FIXED policy template (§6.4) — only {{ }} fields vary by tenant
const POLICY_VERSION = '1.0'
const POLICY_OWNER = '[name / role]'
const POLICY_APPROVED = '[date]'
const POLICY_REVIEW = '[date]'

export default function PolicyPage() {
  const { tools, showToast } = useApp()

  const toolSummary = tools.map(t => t.name).join(', ') || '[no systems registered]'

  return (
    <>
      <div className="page-title">Internal Policy Template</div>
      <div className="page-lede">
        A ready-to-edit internal AI use policy, pre-filled for your tools and use cases. Adapt the bracketed fields, then export it for sign-off.
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
        <button className="btn btn-primary" onClick={() => showToast('Edit mode — coming soon')}>
          Edit policy
        </button>
        <button className="btn btn-ghost" onClick={() => showToast('PDF export — coming soon')}>
          Export as PDF
        </button>
        <button className="btn btn-ghost" onClick={() => showToast('Word export — coming soon')}>
          Export as Word
        </button>
      </div>

      <div className="card policy-doc">
        <h2 style={{ fontFamily: 'var(--font-fraunces), serif', fontWeight: 700, fontSize: 20, marginBottom: 4 }}>
          {TENANT.name} — Responsible AI Use Policy
        </h2>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
          <strong>Version:</strong> {POLICY_VERSION} &nbsp;·&nbsp;
          <strong>Owner:</strong> {POLICY_OWNER} &nbsp;·&nbsp;
          <strong>Approved:</strong> {POLICY_APPROVED} &nbsp;·&nbsp;
          <strong>Next review:</strong> {POLICY_REVIEW}
        </p>

        <h3>1. Purpose &amp; scope</h3>
        <p>
          Governs how {TENANT.name} selects, deploys and oversees AI systems under the EU AI Act and related law
          (GDPR, employment and equality law). Applies to all staff and contractors who procure, configure, operate
          or rely on AI systems.
        </p>

        <h3>2. Our role under the Act</h3>
        <p>
          We are a <strong>deployer</strong>. Where we use high-risk systems we meet the Article 26 obligations and
          complete an Article 27 FRIA. We do not use prohibited systems (Article 5).
        </p>

        <h3>3. System register &amp; risk rating</h3>
        <p>
          Every AI system and use case is recorded with a risk tier. No use case goes live until rated and, if
          high-risk, given an owner and an obligations checklist.
          {tools.length > 0 && (
            <> Current registered systems: {toolSummary}.</>
          )}
        </p>

        <h3>4. Human oversight</h3>
        <p>
          Every high-risk use case has a named, trained owner with authority to review, challenge, override or
          suspend the system. AI informs decisions about people; it doesn&apos;t make them unchecked.
        </p>

        <h3>5. Transparency</h3>
        <p>
          Where a system interacts with a person, generates synthetic media, or assists a decision about someone,
          we disclose it clearly (Articles 50, 26(11), 86).
        </p>

        <h3>6. Data, logging &amp; retention</h3>
        <p>
          Relevant, representative input data where within our control; logs kept at least six months;
          AI processing aligned with GDPR including DPIAs.
        </p>

        <h3>7. Incidents</h3>
        <p>
          Any risk to health, safety or fundamental rights triggers suspension, escalation, notification to
          provider and authority, and a logged record.
        </p>

        <h3>8. Training &amp; AI literacy</h3>
        <p>
          All staff who operate or oversee AI receive AI-literacy training appropriate to their role (Article 4).
        </p>

        <h3>9. Procurement &amp; vendor changes</h3>
        <p>
          New tools risk-assessed before purchase; vendor changes monitored; a new or altered feature is
          re-rated before it&apos;s relied upon.
        </p>

        <h3>10. Review</h3>
        <p>
          Reviewed at least annually and whenever the law, our tools, or our use cases change materially.
        </p>
      </div>
    </>
  )
}
