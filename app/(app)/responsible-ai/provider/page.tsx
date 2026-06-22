'use client'

import { useRouter } from 'next/navigation'
import { PROVIDER_OBLIGATIONS } from '@/lib/data'

export default function ProviderBreakdownPage() {
  const router = useRouter()

  return (
    <>
      <div style={{ marginBottom: 22 }}>
        <button className="btn btn-ghost" onClick={() => router.push('/responsible-ai')}>
          ← Back to Responsible AI Use
        </button>
      </div>

      <div className="page-title">Provider obligations</div>
      <div className="page-lede">
        Whoever builds or markets the system carries the build-side load — these duties sit with your vendor,
        not with you, but it&apos;s worth knowing what they&apos;re required to have in place.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {PROVIDER_OBLIGATIONS.map((item, i) => (
          <div key={item.id} className="card" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, borderRadius: 6, background: 'var(--brand)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
              <div style={{ fontWeight: 700, fontSize: 14.5, flex: 1 }}>{item.t}</div>
              <span className="tag dl">{item.basis}</span>
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
