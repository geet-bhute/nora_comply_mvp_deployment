'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useApp } from '@/lib/store'
import {
  IconDashboard, IconYourTools, IconRoadmap, IconTools, IconEvidence,
  IconPolicy, IconAlerts, IconAsk, IconLegal,
} from './icons'

const NAV_COMPLIANCE = [
  { href: '/dashboard', label: 'Dashboard', icon: <IconDashboard /> },
  { href: '/yourtools', label: 'Your tools', icon: <IconYourTools /> },
  { href: '/checklist', label: 'Checklist', icon: <IconRoadmap /> },
  { href: '/tools', label: 'AI tools and risk', icon: <IconTools /> },
  { href: '/evidence', label: 'Evidence', icon: <IconEvidence /> },
  { href: '/policy', label: 'Policy', icon: <IconPolicy /> },
  { href: '/alerts', label: 'Alerts & updates', icon: <IconAlerts />, badge: 'alert' },
]

const NAV_INTELLIGENCE = [
  { href: '/ask', label: 'Ask Nora', icon: <IconAsk /> },
  { href: '/legal', label: 'Expert & legal', icon: <IconLegal />, badge: 'legal' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { matters, alertDismissed } = useApp()

  const alertBadge = alertDismissed ? 0 : 1
  const legalBadge = matters.filter(m => m.status !== 'Resolved').length

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
      {NAV_INTELLIGENCE.map(item => {
        const count = item.badge === 'legal' ? legalBadge : 0
        return (
          <Link key={item.href} href={item.href} className={`nav-item ${pathname === item.href ? 'active' : ''}`}>
            {item.icon}
            {item.label}
            {count > 0 && <span className="nav-badge violet">{count}</span>}
          </Link>
        )
      })}

      <div className="side-foot">
        <div className="avatar">CO</div>
        <div>
          <div style={{ fontSize: 13, color: '#fff', fontWeight: 500 }}>Compliance owner</div>
          <div style={{ fontSize: 11, color: '#7E92BE' }}>Reports to MD</div>
        </div>
      </div>
    </aside>
  )
}
