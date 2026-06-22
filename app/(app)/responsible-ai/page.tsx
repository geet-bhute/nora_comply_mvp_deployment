'use client'

import { useRouter } from 'next/navigation'

// FIXED Layer A content — render verbatim (§6.3)
export default function ResponsibleAIUsePage() {
  const router = useRouter()

  return (
    <>
      <div className="page-title">Responsible AI Use</div>
      <div className="page-lede">
        A plain-English guide to how the EU AI Act works, where your tools sit, and what&apos;s expected of you.
        For the legal text behind any point, ask Nora — every answer links to the source.
      </div>

      {/* The four risk tiers */}
      <div className="section-head" style={{ marginTop: 0 }}>
        <h2>The four risk tiers</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 30 }}>
        <div className="card" style={{ padding: '18px 22px', borderLeft: '4px solid var(--red)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 18 }}>🔴</span>
            <span className="rag red"><span className="d" />High risk — Annex III</span>
          </div>
          <p style={{ fontSize: 14, color: '#2C3A52' }}>
            <strong>Permitted but heavily governed.</strong> Eight areas:{' '}
            <strong>biometrics</strong> (non-banned); <strong>critical infrastructure</strong>;{' '}
            <strong>education &amp; vocational training</strong>;{' '}
            <strong>employment &amp; worker management</strong> (recruitment, candidate evaluation, promotion, monitoring);{' '}
            <strong>essential public &amp; private services</strong> (benefits, creditworthiness, emergency triage, insurance);{' '}
            <strong>law enforcement</strong>; <strong>migration, asylum &amp; border control</strong>;{' '}
            <strong>administration of justice &amp; democratic processes</strong>.
          </p>
        </div>

        <div className="card" style={{ padding: '18px 22px', borderLeft: '4px solid var(--amber)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 18 }}>🟡</span>
            <span className="rag amber"><span className="d" />Limited risk — Article 50 transparency</span>
          </div>
          <p style={{ fontSize: 14, color: '#2C3A52' }}>
            Not heavily governed, but people must be told: when they&apos;re interacting with an AI (50(1));
            when exposed to emotion recognition or biometric categorisation (50(3)); when content is a deepfake
            or AI-generated public-interest text (50(4)). Disclosure must be clear and given at the latest at
            first interaction or exposure (50(5)).
          </p>
        </div>

        <div className="card" style={{ padding: '18px 22px', borderLeft: '4px solid var(--green)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 18 }}>🟢</span>
            <span className="rag green"><span className="d" />Minimal risk</span>
          </div>
          <p style={{ fontSize: 14, color: '#2C3A52' }}>
            Everything else — the vast majority of everyday AI (drafting help, spam filters, productivity tools).
            No specific obligations beyond good practice and AI literacy.
          </p>
        </div>

        <div className="card" style={{ padding: '18px 22px', borderLeft: '4px solid var(--ink)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 18 }}>⛔</span>
            <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--ink)' }}>Unacceptable risk — Article 5</span>
            <span className="tag" style={{ background: '#F0F0F0', color: 'var(--ink)', fontWeight: 700 }}>Prohibited</span>
          </div>
          <p style={{ fontSize: 14, color: '#2C3A52' }}>
            Banned outright: social scoring, manipulative or exploitative systems, untargeted facial-image
            scraping, workplace/education emotion recognition, and AI-generated non-consensual intimate imagery
            and CSAM (&ldquo;nudifiers&rdquo;, added by the Digital Omnibus). Out of scope for normal business use.
          </p>
        </div>
      </div>

      {/* Provider vs deployer */}
      <div className="section-head">
        <h2>Provider vs deployer — who owes what</h2>
      </div>

      <div className="grid cols-2" style={{ marginBottom: 30 }}>
        <button
          className="card resp-card-btn"
          style={{ padding: '18px 22px', border: '2px solid var(--brand)', background: 'var(--brand-soft)', textAlign: 'left', width: '100%' }}
          onClick={() => router.push('/responsible-ai/deployer')}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--brand)' }}>Deployers — that&apos;s you</div>
            <span style={{ color: 'var(--brand)' }}>›</span>
          </div>
          <p style={{ fontSize: 14, color: '#2C3A52' }}>
            Put the system to use — your duties live in <strong>Article 26</strong> and{' '}
            <strong>can&apos;t be contracted away to the vendor.</strong>
          </p>
          <div style={{ fontSize: 12.5, color: 'var(--brand)', fontWeight: 600, marginTop: 10 }}>See breakdown →</div>
        </button>

        <button
          className="card resp-card-btn"
          style={{ padding: '18px 22px', textAlign: 'left', width: '100%' }}
          onClick={() => router.push('/responsible-ai/provider')}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--muted)' }}>Providers</div>
            <span style={{ color: 'var(--faint)' }}>›</span>
          </div>
          <p style={{ fontSize: 14, color: '#2C3A52' }}>
            Build or market the system and carry the build-side load — 9 obligations, from risk management to
            post-market monitoring.
          </p>
          <div style={{ fontSize: 12.5, color: 'var(--brand)', fontWeight: 600, marginTop: 10 }}>See breakdown →</div>
        </button>
      </div>

      {/* Timeline */}
      <div className="section-head">
        <h2>Timeline — what applies and when</h2>
      </div>

      <div className="card" style={{ padding: '20px 24px', marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--amber)', fontWeight: 700, marginBottom: 14, letterSpacing: '.3px', textTransform: 'uppercase' }}>
          ⚠ Omnibus note: deferrals below are from the Digital Omnibus provisional agreement (7 May 2026).
          They take legal effect only once formally adopted and published in the Official Journal — expected before 2 Aug 2026.
        </div>

        {[
          { date: '2 Feb 2025', text: 'Prohibited practices (Art 5) and AI literacy (Art 4) apply.', status: '✅ In force', color: 'var(--green)' },
          { date: '2 Aug 2025', text: 'Governance rules and general-purpose AI model obligations apply.', status: '✅ In force', color: 'var(--green)' },
          { date: '2 Aug 2026', text: 'The Act becomes generally applicable. Article 50 transparency duties for deployers apply from this date and are not deferred.', status: 'Upcoming', color: 'var(--amber)' },
          { date: '2 Dec 2026', text: 'Provider watermarking / machine-readable marking of AI output (Article 50(2)).', status: 'Upcoming', color: 'var(--muted)' },
          { date: '2 Dec 2027', text: 'Annex III standalone high-risk obligations — your Article 26 duties and Article 27 FRIA — apply from here (deferred from 2 Aug 2026 by the Digital Omnibus).', status: 'Deferred', color: 'var(--brand)' },
          { date: '2 Aug 2028', text: 'High-risk AI embedded in regulated products (Annex I).', status: 'Deferred', color: 'var(--muted)' },
        ].map(item => (
          <div key={item.date} style={{
            display: 'flex', gap: 16, padding: '12px 0',
            borderBottom: '1px solid var(--line-soft)',
          }}>
            <div style={{ width: 110, flexShrink: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--ink)' }}>{item.date}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: item.color, marginTop: 3 }}>{item.status}</div>
            </div>
            <div style={{ fontSize: 13.5, color: '#2C3A52', flex: 1 }}>{item.text}</div>
          </div>
        ))}

        <p style={{ fontSize: 12.5, color: 'var(--muted)', fontStyle: 'italic', marginTop: 14 }}>
          <strong>Important:</strong> the high-risk deferrals come from the Digital Omnibus on AI (provisional political
          agreement, 7 May 2026). Until the Omnibus is formally adopted and published, 2 August 2026 stands as the
          date in the law as written. We track adoption and update these dates automatically.
        </p>
      </div>

      <button className="btn btn-ghost" onClick={() => router.push('/ask')}>
        Ask Nora about any of this →
      </button>
    </>
  )
}
