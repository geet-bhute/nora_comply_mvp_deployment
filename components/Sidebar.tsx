'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useApp } from '@/lib/store'
import {
  IconDashboard, IconYourTools, IconRoadmap, IconEvidence,
  IconPolicy, IconAlerts, IconAsk,
} from './icons'

// Icon for Responsible AI Use (reuses the shield/scale shape)
function IconResponsibleAI() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

// Exact 8-tab order from spec §2
const NAV = [
  { href: '/dashboard',      label: 'Overview',             icon: <IconDashboard /> },
  { href: '/yourtools',      label: 'Your Systems',         icon: <IconYourTools /> },
  { href: '/checklist',      label: 'Obligation Monitor',   icon: <IconRoadmap /> },
  { href: '/policy',         label: 'Internal Policy',      icon: <IconPolicy /> },
  { href: '/evidence',       label: 'Evidence Packs',       icon: <IconEvidence /> },
  { href: '/responsible-ai', label: 'Responsible AI Use',   icon: <IconResponsibleAI /> },
  { href: '/ask',            label: 'Ask Nora',             icon: <IconAsk /> },
  { href: '/alerts',         label: 'Alerts & Updates',     icon: <IconAlerts />, badge: 'alert' },
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
          <div className="brand-sub">EU AI Act compliance</div>
        </div>
      </div>

      {NAV.map(item => {
        const count = item.badge === 'alert' ? alertBadge : 0
        return (
          <Link key={item.href} href={item.href} className={`nav-item ${pathname === item.href ? 'active' : ''}`}>
            {item.icon}
            {item.label}
            {count > 0 && <span className="nav-badge">{count}</span>}
          </Link>
        )
      })}

      <div className="side-foot">
        <div className="avatar">{user?.initials ?? 'CO'}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, color: '#fff', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user?.name ?? 'User'}
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
