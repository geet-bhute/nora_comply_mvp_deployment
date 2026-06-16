'use client'

import { useApp } from '@/lib/store'
import { COMPANY, toolRag } from '@/lib/data'

export default function PolicyPage() {
  const { tools, showToast } = useApp()

  return (
    <>
      <div className="page-eyebrow">Policy studio</div>
      <div className="page-title">Internal AI policy</div>
      <div className="page-lede">Generated from the guardrails you&apos;ve applied, and kept in step with them, so your policy and your real controls never drift apart.</div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
        <button className="btn btn-primary" onClick={() => showToast('Policy synced from checklist', 'ok')}>
          Sync from checklist
        </button>
        <button className="btn btn-ghost" onClick={() => showToast('Sent to MD for sign-off', 'ok')}>
          Send to MD for sign-off
        </button>
      </div>

      <div className="card policy-doc">
        <h3>1. Purpose &amp; scope</h3>
        <p>This policy governs how {COMPANY.name} deploys AI tools under the EU AI Act. It applies to every staff member using an AI system listed in our tool register.</p>

        <h3>2. Human oversight <span className="auto">auto-filled from checklist</span></h3>
        <p>Every high-risk use case has a named oversight owner empowered to review and override its output. No high-risk AI output affects a person without human confirmation.</p>

        <h3>3. Tools &amp; use cases in scope <span className="auto">live from register</span></h3>
        <p>
          {tools.map(t => `${t.name} — ${toolRag(t).toUpperCase()}`).join(' · ')}. Each tool&apos;s use cases, risk ratings and triggered checklist items are maintained in the AI tool register and reflected here.
        </p>

        <h3>4. Sign-off</h3>
        <p>This policy is reviewed by the compliance owner and signed off by the Managing Director, who holds legal responsibility. The sign-off is recorded as evidence.</p>
      </div>
    </>
  )
}
