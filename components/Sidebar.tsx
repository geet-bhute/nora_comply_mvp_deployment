'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useApp } from '@/lib/store'
import {
  IconDashboard, IconYourTools, IconRoadmap, IconTools, IconEvidence,
  IconPolicy, IconAlerts, IconAsk,
} from './icons'

const NAV_COMPLIANCE = [
  { href: '/dashboard', label: 'Dashboard', icon: <IconDashboard /> },
  { href: '/yourtools', label: 'Your tools', icon: <IconYourTools /> },
  { href: '/checklist', label: 'Checklist', icon: <IconRoadmap /> },
  { href: '/tools', label: 'AI Tools and Risk', icon: <IconTools /> },
  { href: '/evidence', label: 'Evidence', icon: <IconEvidence /> },
  { href: '/policy', label: 'Policy', icon: <IconPolicy /> },
  { href: '/alerts', label: 'Alerts & updates', icon: <IconAlerts />, badge: 'alert' },
]

const NAV_INTELLIGENCE = [
  { href: '/ask', label: 'Ask Nora', icon: <IconAsk /> },
]

function getSession() {
  try {
    const raw = document.cookie.split('; ').find(c => c.startsWith('nora_session='))
    if (!raw) return null
    return JSON.parse(decodeURIComponent(raw.split('=').slice(1).join('=')))
  } catch {
    return null
  }
}

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { alertDismissed } = useApp()
  const [user, setUser] = useState<{ name: string; initials: string; company: string } | null>(null)

  useEffect(() => {
    setUser(getSession())
  }, [])

  const alertBadge = alertDismissed ? 0 : 1

  function signOut() {
    document.cookie = 'nora_session=; path=/; max-age=0'
    router.push('/')
  }

  return (
    <aside className="side">
      <div className="brand">
        <div className="brand-mark"><img src="/logo.png" alt="Nora Comply" /></div>
        <div>
          <div className="brand-name">Nora Comply</div>
          <div className="brand-sub">AI Act cockpit</div>
        </div>
      </div>

      <div className="nav-label">Compliance</div>
      {NAV_COMPLIANCE.map(item => {
        const count = item.badge === 'alert' ? alertBadge : 0
        return (
          <Link key={item.href} href={item.href} className={`nav-item ${pathname === item.href ? 'active' : ''}`}>
            {item.icon}
            {item.label}
            {count > 0 && <span className="nav-badge">{count}</span>}
          </Link>
        )
      })}

      <div className="nav-label">Intelligence</div>
      {NAV_INTELLIGENCE.map(item => (
        <Link key={item.href} href={item.href} className={`nav-item ${pathname === item.href ? 'active' : ''}`}>
          {item.icon}
          {item.label}
        </Link>
      ))}

      <div className="side-foot">
        <div className="avatar">{user?.initials ?? 'CO'}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, color: '#fff', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user?.name ?? 'Compliance owner'}
          </div>
          <div style={{ fontSize: 11, color: '#7E92BE', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user?.company ?? 'Northgate Recruitment'}
          </div>
        </div>
        <button
          onClick={signOut}
          title="Sign out"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7E92BE', padding: '4px', borderRadius: 6, flexShrink: 0, lineHeight: 0 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </aside>
  )
}
