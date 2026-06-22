'use client'

import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/store'
import { RISK_RATIONALE } from '@/lib/data'
import type { UseCase } from '@/lib/types'

function ragChip(r: string) {
  const lab: Record<string, string> = { green: 'Minimal risk', amber: 'Limited risk', red: 'High risk' }
  return <span className={`rag ${r}`}><span className="d" />{lab[r] ?? r}</span>
}

export default function UseCaseBlock({ uc, toolId, showApplyGuardrails, showObligations = true }: { uc: UseCase; toolId: string; showApplyGuardrails?: boolean; showObligations?: boolean }) {
  const { checklist, setPendingGroupHighlight, setOpenToolId } = useApp()
  const router = useRouter()

  const goChecklist = () => {
    setPendingGroupHighlight({ toolId, ucId: uc.id })
    setOpenToolId(null)
    router.push('/checklist')
  }

  // Risk rationale: pull from FIXED library via classKey (§6.2), fall back to uc.what
  const rationale = uc.classKey ? (RISK_RATIONALE[uc.classKey] ?? uc.what) : uc.what

  return (
    <div className="uc">
      <div className="uc-head">
        <span className="uc-name">{uc.name}</span>
        {ragChip(uc.rag)}
      </div>

      <div className="uc-ob-h" style={{ marginBottom: 4 }}>Why this risk rating</div>
      <div className="uc-what">{rationale}</div>
      <div className="uc-basis">{uc.basis}</div>

      {/* Standing line for every high-risk use case (§4a, FIXED) */}
      {uc.rag === 'red' && (
        <div style={{
          marginTop: 10, fontSize: 13, color: '#2C3A52',
          background: 'var(--amber-bg)', border: '1px solid var(--amber)',
          borderRadius: 9, padding: '10px 13px',
        }}>
          High-risk systems <strong>are</strong> permitted, but you must have sufficient monitoring and guardrails
          in place. Track your obligations for each use case in the <strong>Obligation Monitor</strong> tab.
        </div>
      )}

      {showObligations && uc.rag === 'red' && (
        <>
          <div className="uc-ob-h">Article 26 obligations</div>
          <div className="uc-obs">
            {checklist.slice(0, 5).map(item => {
              const num = checklist.findIndex(o => o.id === item.id) + 1
              return (
                <button key={item.id} className="ob-link" onClick={goChecklist}>
                  <span className="n">{num}</span>{item.t}<span className="go">›</span>
                </button>
              )
            })}
            <button className="ob-link" style={{ color: 'var(--brand)', fontWeight: 700 }} onClick={goChecklist}>
              <span className="n" style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>+{checklist.length - 5}</span>
              See all {checklist.length} obligations
              <span className="go">›</span>
            </button>
          </div>
        </>
      )}

      {showObligations && uc.rag !== 'red' && uc.obligations.length > 0 && (
        <>
          <div className="uc-ob-h">Obligations</div>
          <div className="uc-obs">
            {uc.obligations.map(id => {
              const num = checklist.findIndex(o => o.id === id) + 1
              const item = checklist.find(o => o.id === id)
              if (!item) return null
              return (
                <button key={id} className="ob-link" onClick={goChecklist}>
                  <span className="n">{num}</span>{item.t}<span className="go">›</span>
                </button>
              )
            })}
          </div>
        </>
      )}

      {showApplyGuardrails && uc.rag === 'red' && (
        <button
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}
          onClick={goChecklist}
        >
          Apply guardrails
        </button>
      )}
    </div>
  )
}
