'use client'

import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/store'
import { toolRag } from '@/lib/data'
import { IconChev, IconBell, IconInfo, IconPlus } from '@/components/icons'

function ragLabel(r: string) {
  return { green: 'Green · Minimal risk', amber: 'Amber · Limited risk', red: 'Red · High risk' }[r] ?? r
}

export default function DashboardPage() {
  const { checklist, tools, alert, alertDismissed, setOpenToolId, setRegisterOpen } = useApp()
  const router = useRouter()

  const total = checklist.length
  const done = checklist.filter(o => o.done).length
  const pct = Math.round((done / total) * 100)

  const rc = { green: 0, amber: 0, red: 0 }
  tools.forEach(t => { rc[toolRag(t)]++ })

  const requiredIds = new Set<string>()
  tools.forEach(t => t.useCases.forEach(u => {
    if (u.rag !== 'green') u.obligations.forEach(id => requiredIds.add(id))
  }))
  const nextItem = checklist.find(o => !o.done && requiredIds.has(o.id)) ?? checklist.find(o => !o.done)

  return (
    <>
      <div className="page-head">
        <div className="lede-wrap">
          <div className="page-eyebrow">Your compliance, at a glance</div>
          <div className="page-title">Good morning. Here&apos;s where you stand.</div>
          <div className="page-lede">One place to see what you must have in place, the risk status of your AI tools, and the evidence to prove it. Ask Nora anything — answers come with citations.</div>
        </div>
        <button className="btn btn-primary" onClick={() => setRegisterOpen(true)}><IconPlus /> Register AI system</button>
      </div>

      {!alertDismissed && (
        <div className={`alert-strip ${alert.sev === 'urgent' ? 'urgent' : ''}`} style={{ marginBottom: 22 }}>
          <div className="ic">{alert.sev === 'urgent' ? <IconBell /> : <IconInfo />}</div>
          <div style={{ flex: 1 }}>
            <h4>{alert.title}</h4>
            <p>{alert.body}</p>
            <div className="alert-actions">
              <button className="btn btn-primary" onClick={() => setOpenToolId('bullhorn')}>Review Bullhorn use cases</button>
              <button className="btn btn-quiet" onClick={() => router.push('/alerts')}>View all updates</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid cols-3">
        <div className="card stat">
          <div className="k">Readiness</div>
          <div className="v">{pct}<small>%</small></div>
          <div className="sub">{done} of {total} checklist items complete</div>
          <div className="bar"><i style={{ width: `${pct}%` }} /></div>
        </div>

        <div className="card stat">
          <div className="k">AI tools in use</div>
          <div className="v">{tools.length}</div>
          <div className="sub">
            {rc.red ? `${rc.red} high-risk · ` : ''}
            {rc.amber ? `${rc.amber} limited · ` : ''}
            {rc.green} minimal
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
            {rc.red > 0 && <span className="rag red"><span className="d" />{rc.red}</span>}
            {rc.amber > 0 && <span className="rag amber"><span className="d" />{rc.amber}</span>}
            {rc.green > 0 && <span className="rag green"><span className="d" />{rc.green}</span>}
          </div>
        </div>

        <div className="card stat">
          <div className="k">Do next</div>
          <div style={{ marginTop: 10, fontWeight: 600, fontSize: 15 }}>{nextItem ? nextItem.t : 'All clear 🎉'}</div>
          <div className="sub">{nextItem ? 'Most urgent checklist item' : 'Nothing outstanding'}</div>
          {nextItem && (
            <button className="btn btn-ghost" style={{ marginTop: 14 }} onClick={() => router.push('/checklist')}>
              Open checklist
            </button>
          )}
        </div>
      </div>

      <div className="section-head">
        <h2>Your AI tools</h2>
        <span className="hint">Click a tool to see its use cases &amp; obligations</span>
      </div>
      <div className="card">
        {tools.map(tool => {
          const rag = toolRag(tool)
          return (
            <div key={tool.id} className="tool-row" onClick={() => setOpenToolId(tool.id)}>
              <div className="tool-ic">{tool.name[0]}</div>
              <div>
                <div className="nm">{tool.name}</div>
                <div className="vn">{tool.vendor} · {tool.useCases.length} use case{tool.useCases.length > 1 ? 's' : ''}</div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
                <span className={`rag ${rag}`}><span className="d" />{ragLabel(rag)}</span>
                <span style={{ color: 'var(--faint)' }}><IconChev /></span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="section-head">
        <h2>Need an answer?</h2>
        <span className="hint">Grounded in the law and your own records</span>
      </div>
      <div className="card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }} onClick={() => router.push('/ask')}>
        <div className="msg ai" style={{ maxWidth: 'none' }}><div className="who">N</div></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 14.5 }}>Ask Nora</div>
          <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>&ldquo;Do I need a DPIA for Bullhorn?&rdquo; · &ldquo;What does human oversight actually mean?&rdquo; · Cited answers, or a one-click handoff to external legal counsel.</div>
        </div>
        <span style={{ color: 'var(--faint)' }}><IconChev /></span>
      </div>
    </>
  )
}
