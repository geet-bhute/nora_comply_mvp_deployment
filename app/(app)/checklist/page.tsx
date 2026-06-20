'use client'

import { useState } from 'react'
import { useApp } from '@/lib/store'
import { TENANT, CHECKLIST } from '@/lib/data'
import { IconTick } from '@/components/icons'

function ArticleBadge({ text }: { text: string }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 6,
      background: 'var(--brand-soft)', color: 'var(--brand)',
    }}>
      {text}
    </span>
  )
}

function ObligationRow({
  item,
  num,
  done,
  onToggle,
}: {
  item: typeof CHECKLIST[0]
  num: number
  done: boolean
  onToggle: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`obl ${done ? 'is-done' : ''} ${open ? 'open' : ''}`}>
      <div className="obl-head" onClick={() => setOpen(o => !o)}>
        <button
          className={`check ${done ? 'done' : ''}`}
          onClick={e => { e.stopPropagation(); onToggle() }}
          aria-label={done ? 'Mark incomplete' : 'Mark complete'}
        >
          <IconTick />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="obl-title">{item.t}</div>
          <div className="obl-meta">
            <ArticleBadge text={item.basis} />
            {item.recurring && <span className="tag recur">Recurring</span>}
          </div>
        </div>
        <span className="obl-chev">›</span>
      </div>
      <div className="obl-body">
        <div className="obl-inner">
          <div className="field">
            <div className="fl">What this means</div>
            <p>{item.plain}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ObligationMonitorPage() {
  const { tools, checklist, toggleChecklistItem } = useApp()

  const toolsWithHighRisk = tools
    .map(t => ({ tool: t, useCases: t.useCases.filter(uc => uc.rag === 'red') }))
    .filter(({ useCases }) => useCases.length > 0)

  const doneCount = checklist.filter(o => o.done).length

  return (
    <>
      <div className="page-title">{TENANT.name}&rsquo;s Obligation Monitor</div>
      <div className="page-lede">
        <em>
          High-Risk AI Systems must be used in line with the Deployer Obligations under Article 26.
          Since your company is using high-risk AI systems, you are deemed a deployer under the Act.
        </em>
      </div>

      {toolsWithHighRisk.length === 0 ? (
        <div className="card stat" style={{ padding: '28px 24px', color: 'var(--muted)', fontSize: 14 }}>
          Good news — none of your registered use cases are high-risk, so the Article 26 deployer checklist
          doesn&apos;t apply yet. If that changes, the obligations will appear here automatically.
        </div>
      ) : (
        <>
          {toolsWithHighRisk.map(({ tool, useCases }) => (
            <div key={tool.id} className="ob-tool-group">
              {/* Tool section header */}
              <div className="ob-tool-group-head">
                <div className="ob-tool-logo">
                  {tool.logo ? (
                    <img src={tool.logo} alt={tool.name} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                  ) : (
                    <span style={{ fontWeight: 700, color: 'var(--brand)', fontSize: 16 }}>{tool.name[0]}</span>
                  )}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{tool.name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 1 }}>
                    {useCases.length} high-risk use case{useCases.length !== 1 ? 's' : ''} · Article 26 obligations apply
                  </div>
                </div>
              </div>

              {/* Use cases under this tool */}
              {useCases.map(uc => {
                const fulfilled = uc.obligationsFulfilled ?? doneCount
                return (
                  <div key={uc.id} className="ob-uc-section">
                    <div className="ob-uc-header">
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 14.5 }}>{uc.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{uc.basis}</div>
                      </div>
                      <span className="rag red" style={{ flexShrink: 0 }}><span className="d" />High risk</span>
                      <span style={{ fontSize: 12.5, color: 'var(--muted)', fontWeight: 600, flexShrink: 0 }}>
                        {fulfilled} / 10 fulfilled
                      </span>
                    </div>

                    <div className="card" style={{ marginBottom: 0 }}>
                      {CHECKLIST.map((item, idx) => (
                        <ObligationRow
                          key={item.id}
                          item={item}
                          num={idx + 1}
                          done={checklist.find(o => o.id === item.id)?.done ?? false}
                          onToggle={() => toggleChecklistItem(item.id)}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}

          {/* Cross-cutting notes (FIXED, §6.1) */}
          <div className="card" style={{ padding: '18px 22px', marginTop: 8, background: 'var(--brand-soft)', border: '1px solid var(--brand)', borderRadius: 'var(--radius)' }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '.4px', textTransform: 'uppercase', color: 'var(--brand)', marginBottom: 10 }}>
              Cross-cutting duties
            </div>
            <p style={{ fontSize: 13, color: '#2C3A52', marginBottom: 8 }}>
              • <strong>AI literacy (Article 4)</strong> has applied since 2 February 2025 — everyone operating or overseeing these systems should understand how they work and where they fail. It&apos;s a standing duty, not a per-system tick.
            </p>
            <p style={{ fontSize: 13, color: '#2C3A52', marginBottom: 8 }}>
              • <strong>Right to explanation (Article 86)</strong> — anyone subject to a decision based on one of these systems can ask you for a clear, meaningful explanation of the AI&apos;s role in it. Be ready to give one.
            </p>
            <p style={{ fontSize: 12, color: 'var(--muted)', fontStyle: 'italic', marginBottom: 0 }}>
              Public-authority EU-database registration (Article 26(8)/Article 49) applies only to public bodies, so it&apos;s not in this list for private deployers.
            </p>
          </div>
        </>
      )}
    </>
  )
}
