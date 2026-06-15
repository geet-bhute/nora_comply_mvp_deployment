'use client'

import { useApp } from '@/lib/store'
import { IconFile, IconScale } from '@/components/icons'

export default function EvidencePage() {
  const { evidence, showToast } = useApp()

  return (
    <>
      <div className="page-eyebrow">Audit readiness</div>
      <div className="page-title">Evidence</div>
      <div className="page-lede">Everything that proves your compliance, in one place — including advice from resolved matters, which files itself here automatically.</div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
        <button className="btn btn-primary" onClick={() => showToast('Audit pack generated', 'ok')}>
          <IconFile /> Generate audit pack
        </button>
        <button className="btn btn-ghost" onClick={() => showToast('Evidence upload — prototype')}>
          Attach evidence
        </button>
      </div>

      <div className="card">
        {evidence.map((e, i) => (
          <div key={i} className="ev-row">
            <div className={`ev-ic ${e.legal ? 'legal' : ''}`}>
              {e.legal ? <IconScale /> : <IconFile />}
            </div>
            <div>
              <div className="nm">{e.n}</div>
              <div className="mt">{e.t}</div>
            </div>
            <div className="lk">Linked to: {e.linked}</div>
          </div>
        ))}
      </div>
    </>
  )
}
