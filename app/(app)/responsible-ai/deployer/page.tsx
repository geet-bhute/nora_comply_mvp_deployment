'use client'

import { useRouter } from 'next/navigation'
import { CHECKLIST } from '@/lib/data'

export default function DeployerBreakdownPage() {
  const router = useRouter()

  return (
    <>
      <div style={{ marginBottom: 22 }}>
        <button className="btn btn-ghost" onClick={() => router.push('/responsible-ai')}>
          ← Back to Responsible AI Use
        </button>
      </div>

      <div className="page-title">Deployer obligations — that&apos;s you</div>
      <div className="page-lede">
        Putting a high-risk system to use means these duties are yours under <strong>Article 26</strong>.
        They&apos;re operational, they&apos;re yours by law, and they can&apos;t be contracted away to the vendor.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {CHECKLIST.map((item, i) => (
          <div key={item.id} className="card" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, borderRadius: 6, background: 'var(--brand)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
              <div style={{ fontWeight: 700, fontSize: 14.5, flex: 1 }}>{item.t}</div>
              <span className="tag dl">{item.basis}</span>
              {item.recurring && <span className="tag recur">Recurring</span>}
            </div>
            <p style={{ fontSize: 13.5, color: '#2C3A52', marginLeft: 32 }}>{item.plain}</p>
          </div>
        ))}
      </div>

      <button className="btn btn-ghost" style={{ marginTop: 20 }} onClick={() => router.push('/ask')}>
        Ask Nora about any of this →
      </button>
    </>
  )
}
