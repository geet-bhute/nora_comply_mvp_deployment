'use client'

import { useApp } from '@/lib/store'
import { TENANT, computeCounts } from '@/lib/data'
import { IconFile } from '@/components/icons'

function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function IconWarning() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

export default function EvidencePacksPage() {
  const { tools, showToast } = useApp()
  const counts = computeCounts(tools)

  const boardPreview = `${TENANT.name} covers ${counts.systems} AI system${counts.systems !== 1 ? 's' : ''} across ${counts.useCases} use cases. Compliance health: ${counts.healthPct}%. ${counts.highRiskUseCases} high-risk use case${counts.highRiskUseCases !== 1 ? 's' : ''} under active monitoring. Policy v1.0. Next review due [date].`

  const packs = [
    {
      icon: <IconFile />,
      title: 'Board Summary',
      body: 'A one-page plain-English summary of your AI compliance position: governance score, systems status, data obligations, training completion, and outstanding actions. Ready for your next board meeting.',
      preview: boardPreview,
      action: () => showToast('Board Summary generated', 'ok'),
    },
    {
      icon: <IconShield />,
      title: 'Regulator Pack',
      body: 'Your complete evidence record, formatted for regulatory inspection: tool assessments, EU AI Act risk classifications, GDPR data-processing records, DPA status, training completions, and the incident log. Organised by obligation.',
      preview: null,
      action: () => showToast('Regulator Pack generated', 'ok'),
    },
    {
      icon: <IconWarning />,
      title: 'Gap Report',
      body: 'Everything incomplete, overdue or at risk, with clear next steps. Use it to prioritise and close gaps before they become problems.',
      preview: null,
      action: () => showToast('Gap Report generated', 'ok'),
    },
  ]

  return (
    <>
      <div className="page-title">Evidence Generator</div>
      <div className="page-lede">
        <em>Pre-built evidence reports for your board, a regulator, or leadership team.</em>
      </div>

      <div className="ev-pack-grid">
        {packs.map(pack => (
          <div key={pack.title} className="card ev-pack-card">
            <div className="ev-pack-icon">{pack.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{pack.title}</div>
            <p style={{ fontSize: 13.5, color: 'var(--muted)', flex: 1, marginBottom: 14 }}>
              {pack.body}
            </p>
            {pack.preview && (
              <div style={{
                background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 9,
                padding: '10px 13px', fontSize: 12, color: 'var(--muted)', fontStyle: 'italic', marginBottom: 14,
              }}>
                &ldquo;{pack.preview}&rdquo;
              </div>
            )}
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={pack.action}>
              Generate {pack.title}
            </button>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 12.5, color: 'var(--faint)', fontStyle: 'italic', marginTop: 18, textAlign: 'center' }}>
        Reports are generated from your live evidence log. Every figure is traceable to a specific record.
      </p>
    </>
  )
}
