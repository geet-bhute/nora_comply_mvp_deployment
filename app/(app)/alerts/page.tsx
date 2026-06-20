'use client'

import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/store'
import { IconBell, IconInfo } from '@/components/icons'

export default function AlertsPage() {
  const { alert, alertDismissed, dismissAlert, setOpenToolId, showToast } = useApp()
  const router = useRouter()

  return (
    <>
      <div className="page-title">Alerts &amp; updates</div>
      <div className="page-lede">
        Tool and use-case changes, plus regulatory updates, in one place, so a new use case never appears silently again.
      </div>

      {/* Tenant alert (Layer B) */}
      {!alertDismissed ? (
        <div className={`alert-strip ${alert.sev === 'urgent' ? 'urgent' : ''}`} style={{ marginBottom: 16 }}>
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
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16, padding: '14px 18px', background: 'var(--bg)', borderRadius: 10 }}>
          No tool alerts right now.
        </div>
      )}

      {/* Regulatory alert (Layer A, FIXED) — same for every tenant, blue info card */}
      <div className="alert-strip" style={{ borderColor: 'var(--brand)', background: 'var(--brand-soft)', marginBottom: 16 }}>
        <div className="ic"><IconInfo /></div>
        <div style={{ flex: 1 }}>
          <h4>EU AI Act timeline updated — high-risk obligations deferred</h4>
          <p>
            The Digital Omnibus (provisional agreement, 7 May 2026) defers Annex III high-risk duties —
            including Article 26 deployer obligations and the Article 27 FRIA — from 2 August 2026 to{' '}
            <strong>2 December 2027</strong>. This takes legal effect only once the Omnibus is formally
            adopted and published (expected before August 2026).{' '}
            <strong>Your Article 50 transparency duties still apply from 2 August 2026.</strong>{' '}
            Your checklist reflects the latest position, so keep closing gaps now.
          </p>
          <div className="alert-actions">
            <button className="btn btn-ghost" onClick={() => router.push('/responsible-ai')}>
              See full timeline
            </button>
          </div>
        </div>
      </div>

      {alertDismissed && (
        <div style={{ fontSize: 13, color: 'var(--muted)', padding: '10px 0', fontStyle: 'italic' }}>
          No alerts right now. We&apos;ll flag tool changes and regulatory updates here as they happen.
        </div>
      )}
    </>
  )
}
