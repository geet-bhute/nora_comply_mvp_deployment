'use client'

import { useApp } from '@/lib/store'
import { TENANT } from '@/lib/data'

export default function Topbar() {
  const { alertDismissed } = useApp()

  // Status pill: red when any unresolved alert exists, green otherwise
  const hasActionNeeded = !alertDismissed
  const pill = hasActionNeeded
    ? { bg: 'var(--red-bg)', color: 'var(--red)', text: 'Action needed' }
    : { bg: 'var(--green-bg)', color: 'var(--green)', text: 'Up to date' }

  return (
    <header className="topbar">
      <div className="company">
        <div className="clogo"><img src="/logo.png" alt="" /></div>
        <div>
          <div className="cn">{TENANT.name}</div>
          <div className="cs">{TENANT.workspaceLabel}</div>
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
