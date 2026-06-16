'use client'

import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/store'
import { IconChev, IconScale } from '@/components/icons'

export default function LegalPage() {
  const { matters, openMatterId, setOpenMatterId, resolveMatter, showToast } = useApp()
  const router = useRouter()

  if (openMatterId) {
    const m = matters.find(x => x.id === openMatterId)
    if (m) {
      return (
        <>
          <button className="btn btn-quiet" onClick={() => setOpenMatterId(null)} style={{ marginBottom: 12 }}>
            Back to all matters
          </button>
          <div className="page-title" style={{ fontSize: 22 }}>{m.title}</div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', margin: '8px 0 20px', flexWrap: 'wrap' }}>
            <span className="rag violet"><span className="d" />{m.status}</span>
            <span className="price-tag">{m.price}</span>
            <span className="tag">SLA: {m.sla}</span>
            <span className="tag">{m.firm}</span>
            <span className="tag" style={{ background: 'var(--violet-bg)', color: 'var(--violet)' }}>Privileged thread</span>
          </div>

          <div className="card thread">
            <div className="bundle">
              <div className="bh">Context bundle · attached automatically</div>
              <ul>
                {m.bundle.map((b, i) => (
                  <li key={i}><span className="b">&#9658;</span>{b}</li>
                ))}
              </ul>
            </div>

            <div className="law-msg me">
              <div className="who" style={{ background: 'var(--ink)', borderRadius: '50%' }}>CO</div>
              <div>
                <div className="b2">{m.q}</div>
                <div className="meta">You · {m.opened}</div>
              </div>
            </div>

            {m.thread.map((t, i) => (
              <div key={i} className="law-msg">
                <div className="who" style={t.who === 'sys' ? { background: 'var(--brand)' } : {}}>
                  {t.name}
                </div>
                <div>
                  <div className="b2">{t.txt}</div>
                  <div className="meta">{t.meta}</div>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
              {m.id === 'm1' ? (
                <button
                  className="btn btn-violet"
                  onClick={() => {
                    resolveMatter(m.id)
                    showToast('Advice filed to your evidence vault', 'ok')
                    setOpenMatterId(null)
                    router.push('/evidence')
                  }}
                >
                  Accept advice &amp; file to evidence
                </button>
              ) : (
                <button className="btn btn-ghost" onClick={() => showToast('Reply sent to firm', 'ok')}>Reply</button>
              )}
              <button className="btn btn-quiet" onClick={() => showToast('Reminder sent')}>Nudge firm</button>
            </div>
          </div>
        </>
      )
    }
  }

  return (
    <>
      <div className="page-eyebrow">Compliance support</div>
      <div className="page-title">Expert &amp; legal</div>
      <div className="page-lede">Most questions resolve instantly with citations from the law and your own records. Complex matters reach a specialist with full context already attached.</div>

      <div className="tiers">
        <div className="card tier t1">
          <div className="tn">Tier 1 · included</div>
          <h3>Ask Nora</h3>
          <p>Grounded AI answers with citations from the law and your own records. Refuses and escalates when unsure.</p>
          <div className="sla">Instant · resolves ~75% of questions</div>
          <span className="arrow"><IconChev /></span>
        </div>
        <div className="card tier t2">
          <div className="tn">Tier 2 · included</div>
          <h3>Compliance experts</h3>
          <p>Act specialists review judgment calls: &ldquo;is this guardrail enough,&rdquo; DPIA draft reviews, questionnaire checks.</p>
          <div className="sla">Same / next business day</div>
          <span className="arrow"><IconChev /></span>
        </div>
        <div className="card tier t3">
          <div className="tn">Tier 3 · per matter</div>
          <h3>External counsel</h3>
          <p>Privileged advice for interpretation, contracts, incidents, regulator correspondence. Fixed fees, visible upfront.</p>
          <div className="sla">SLA per matter · fully briefed on open</div>
        </div>
      </div>

      <div className="section-head">
        <h2>Your matters</h2>
        <span className="hint">Click a matter to open the thread</span>
      </div>
      <div className="card">
        {matters.map(m => (
          <div key={m.id} className="matter-row" onClick={() => setOpenMatterId(m.id)}>
            <div className="matter-ic"><IconScale /></div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{m.title}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{m.firm} · opened {m.opened} · {m.sla}</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="rag violet"><span className="d" />{m.status}</span>
              <span style={{ color: 'var(--faint)' }}><IconChev /></span>
            </div>
          </div>
        ))}
      </div>

    </>
  )
}
