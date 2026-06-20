'use client'

import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/store'
import { TENANT, computeCounts } from '@/lib/data'
import { IconBell, IconInfo, IconPlus } from '@/components/icons'

export default function OverviewPage() {
  const { tools, alert, alertDismissed, setOpenToolId, setRegisterOpen, dismissAlert, showToast } = useApp()
  const router = useRouter()

  const counts = computeCounts(tools)

  return (
    <>
      <div className="page-head" style={{ marginBottom: 22 }}>
        <div className="lede-wrap">
          <div className="page-title">{TENANT.name}&rsquo;s Compliance at a Glance</div>
          <div className="page-lede" style={{ marginBottom: 0 }}>
            Your at-a-glance position. Open any tile to see the detail behind it.
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setRegisterOpen(true)}>
          <IconPlus /> Register AI system
        </button>
      </div>

      {/* At-a-glance stat strip */}
      <div className="grid cols-4" style={{ marginBottom: 22 }}>
        <button className="card stat overview-tile" onClick={() => router.push('/yourtools')}>
          <div className="k">AI systems registered</div>
          <div className="v">{counts.systems}</div>
          <div className="sub">{counts.useCases} use cases tracked</div>
        </button>

        <button className="card stat overview-tile" onClick={() => router.push('/yourtools')}>
          <div className="k">Use cases tracked</div>
          <div className="v">{counts.useCases}</div>
          <div className="sub">{counts.highRiskUseCases} high-risk</div>
        </button>

        <button className="card stat overview-tile" onClick={() => router.push('/checklist')}>
          <div className="k">Obligations fulfilled</div>
          <div className="v" style={{ fontSize: 26 }}>
            {counts.obligationsFulfilled}<span style={{ fontSize: 15, color: 'var(--faint)', fontWeight: 500 }}>/{counts.obligationsTotal}</span>
          </div>
          <div className="sub">{counts.healthPct}% compliance health</div>
          <div className="bar" style={{ marginTop: 10 }}>
            <i style={{ width: `${counts.healthPct}%` }} />
          </div>
        </button>

        <button className="card stat overview-tile" onClick={() => router.push('/alerts')}>
          <div className="k">Next key date</div>
          <div style={{ marginTop: 8, fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}>2 Aug 2026</div>
          <div className="sub">Transparency duties apply</div>
        </button>
      </div>

      {/* Primary alert card — highest-severity unresolved alert */}
      {!alertDismissed ? (
        <div className={`alert-strip ${alert.sev === 'urgent' ? 'urgent' : ''}`} style={{ marginBottom: 22 }}>
          <div className="ic">{alert.sev === 'urgent' ? <IconBell /> : <IconInfo />}</div>
          <div style={{ flex: 1 }}>
            <h4>{alert.title}</h4>
            <p>{alert.body}</p>
            <div className="alert-actions">
              <button className="btn btn-primary" onClick={() => setOpenToolId('bullhorn')}>
                Review Bullhorn use cases
              </button>
              <button className="btn btn-quiet" onClick={() => { dismissAlert(); showToast('Dismissed') }}>
                Dismiss
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="card stat" style={{ marginBottom: 22, padding: '20px 22px', color: 'var(--muted)', fontSize: 14 }}>
          Nothing needs your attention right now.
        </div>
      )}
    </>
  )
}
