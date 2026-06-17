'use client'

import { useApp } from '@/lib/store'
import ChecklistRow from '@/components/ChecklistRow'

function ragLabel(r: string) {
  return { green: 'Green · Minimal risk', amber: 'Amber · Limited risk', red: 'Red · High risk' }[r] ?? r
}

export default function ChecklistPage() {
  const { checklist, tools } = useApp()
  const total = checklist.length
  const done = checklist.filter(o => o.done).length
  const pct = Math.round((done / total) * 100)

  return (
    <>
      <div className="page-eyebrow">Source of truth</div>
      <div className="page-title">Compliance Checklist</div>
      <div className="page-lede">Your obligations under the EU AI Act, in plain English — grouped by tool and use case, because they apply afresh for every new way you use an AI system.</div>

      <div className="card stat" style={{ marginBottom: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="k">Progress</div>
            <div className="sub" style={{ marginTop: 4 }}>{done} of {total} complete</div>
          </div>
          <div className="v" style={{ fontSize: 26 }}>{pct}<small>%</small></div>
        </div>
        <div className="bar"><i style={{ width: `${pct}%` }} /></div>
      </div>
      <div className="bar-help">Tick items off as you complete them. Recurring items re-open when they&apos;re next due, so your score always reflects what&apos;s current.</div>

      {tools.map(tool => (
        <div key={tool.id} style={{ marginTop: 28 }}>
          <div className="section-head" style={{ margin: '0 0 14px' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="tool-ic">{tool.name[0]}</span>
              {tool.name}
            </h2>
            <span className="hint">{tool.vendor}</span>
          </div>

          {tool.useCases.map(uc => (
            <div key={uc.id} className="card" style={{ marginBottom: 16 }}>
              <div className="uc-head" style={{ padding: '16px 18px 0' }}>
                <span className="uc-name">{uc.name}</span>
                <span className={`rag ${uc.rag}`}><span className="d" />{ragLabel(uc.rag)}</span>
              </div>
              {uc.obligations.map(id => {
                const item = checklist.find(o => o.id === id)
                const num = checklist.findIndex(o => o.id === id) + 1
                if (!item) return null
                return (
                  <ChecklistRow
                    key={`${tool.id}-${uc.id}-${id}`}
                    item={item}
                    num={num}
                    applies={[`${tool.name} · ${uc.name}`]}
                    toolId={tool.id}
                    ucId={uc.id}
                    domId={`obl-${tool.id}-${uc.id}-${id}`}
                  />
                )
              })}
            </div>
          ))}
        </div>
      ))}

      <div style={{ textAlign: 'center', color: 'var(--faint)', fontSize: 12, marginTop: 26 }}>
        © 2026 Nora Comply. All rights reserved.
      </div>
    </>
  )
}
