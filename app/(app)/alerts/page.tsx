'use client'

import { useApp } from '@/lib/store'
import { IconBell, IconInfo } from '@/components/icons'

export default function AlertsPage() {
  const { alert, alertDismissed, dismissAlert, setOpenToolId, showToast } = useApp()

  return (
    <>
      <div className="page-eyebrow">Stay current</div>
      <div className="page-title">Alerts &amp; updates</div>
      <div className="page-lede">Tool and use-case changes, plus regulatory updates, in one place, so a new use case never appears silently again.</div>

      {!alertDismissed && (
        <div className={`alert-strip ${alert.sev === 'urgent' ? 'urgent' : ''}`} style={{ marginBottom: 16 }}>
          <div className="ic">{alert.sev === 'urgent' ? <IconBell /> : <IconInfo />}</div>
          <div style={{ flex: 1 }}>
            <h4>{alert.title}</h4>
            <p>{alert.body}</p>
            <div className="alert-actions">
              <button className="btn btn-primary" onClick={() => setOpenToolId('bullhorn')}>Review Bullhorn use cases</button>
              <button className="btn btn-quiet" onClick={() => { dismissAlert(); showToast('Dismissed') }}>Dismiss</button>
            </div>
          </div>
        </div>
      )}

      <div className="alert-strip" style={{ borderColor: 'var(--brand)', background: 'var(--brand-soft)', marginBottom: 16 }}>
        <div className="ic"><IconInfo /></div>
        <div style={{ flex: 1 }}>
          <h4>EU AI Act deadline approaching</h4>
          <p>Article 26 deployer obligations and Article 27 FRIA requirements for Annex III high-risk systems become enforceable on 2 August 2026. Your checklist reflects these obligations now, so you have time to close any gaps.</p>
        </div>
      </div>

      <div className="alert-strip" style={{ borderColor: 'var(--green)', background: 'var(--green-bg)' }}>
        <div className="ic"><IconInfo color="var(--green)" /></div>
        <div style={{ flex: 1 }}>
          <h4>New policy template available</h4>
          <p>An updated internal AI-policy template for your tool register is ready in Policy Studio.</p>
        </div>
      </div>
    </>
  )
}
