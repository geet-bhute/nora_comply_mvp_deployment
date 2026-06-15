'use client'

import { useApp } from '@/lib/store'
import { toolRag } from '@/lib/data'
import { COMPANY } from '@/lib/data'

export default function Topbar() {
  const { checklist, tools } = useApp()

  const total = checklist.length
  const done = checklist.filter(o => o.done).length
  const pct = Math.round((done / total) * 100)
  const hasRed = tools.some(t => toolRag(t) === 'red')

  let pill = { bg: 'var(--amber-bg)', color: 'var(--amber)', text: 'In progress' }
  if (hasRed) pill = { bg: 'var(--red-bg)', color: 'var(--red)', text: 'Action needed' }
  else if (pct >= 70) pill = { bg: 'var(--green-bg)', color: 'var(--green)', text: 'On track' }

  return (
    <header className="topbar">
      <div className="company">
        <div className="clogo"><img src="/logo.png" alt="" /></div>
        <div>
          <div className="cn">{COMPANY.name}</div>
          <div className="cs">{COMPANY.sub}</div>
        </div>
      </div>
      <div className="top-spacer" />
      <div className="ready-pill" style={{ background: pill.bg, color: pill.color }}>
        <span className="dot" />
        <span>{pill.text}</span>
      </div>
    </header>
  )
}
