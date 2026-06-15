'use client'

import { useApp } from '@/lib/store'
import ChecklistRow from '@/components/ChecklistRow'

export default function ChecklistPage() {
  const { checklist, tools } = useApp()
  const total = checklist.length
  const done = checklist.filter(o => o.done).length
  const pct = Math.round((done / total) * 100)

  return (
    <>
      <div className="page-eyebrow">Source of truth</div>
      <div className="page-title">Compliance Checklist</div>
      <div className="page-lede">Your obligations under the EU AI Act, in plain English.</div>

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

      <div className="card">
        {checklist.map((item, i) => {
          const applies: string[] = []
          tools.forEach(t => t.useCases.forEach(u => {
            if (u.obligations.includes(item.id)) applies.push(`${t.name} · ${u.name}`)
          }))
          return <ChecklistRow key={item.id} item={item} num={i + 1} applies={applies} />
        })}
      </div>

      <div style={{ textAlign: 'center', color: 'var(--faint)', fontSize: 12, marginTop: 26 }}>
        © 2026 Nora Comply. All rights reserved.
      </div>
    </>
  )
}
