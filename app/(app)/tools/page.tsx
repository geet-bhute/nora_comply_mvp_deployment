'use client'

import { useApp } from '@/lib/store'
import { toolRag } from '@/lib/data'
import { IconChev, IconPlus } from '@/components/icons'

function ragLabel(r: string) {
  return { green: 'Green · Minimal risk', amber: 'Amber · Limited risk', red: 'Red · High risk' }[r] ?? r
}

export default function ToolsPage() {
  const { tools, setOpenToolId, setRegisterOpen } = useApp()

  return (
    <>
      <div className="page-head">
        <div className="lede-wrap">
          <div className="page-eyebrow">AI Tool Register</div>
          <div className="page-title">AI tools and risk</div>
          <div className="page-lede">Every AI tool you run, with a traffic-light risk assessment. Nora Comply will never automatically block your tools.</div>
        </div>
        <button className="btn btn-primary" onClick={() => setRegisterOpen(true)}><IconPlus /> Register AI system</button>
      </div>
      <div className="card">
        {tools.map(tool => {
          const rag = toolRag(tool)
          return (
            <div key={tool.id} className="tool-row" onClick={() => setOpenToolId(tool.id)}>
              <div className="tool-ic">{tool.name[0]}</div>
              <div><div className="nm">{tool.name}</div><div className="vn">{tool.vendor} · {tool.useCases.length} use case{tool.useCases.length > 1 ? 's' : ''}</div></div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
                <span className={`rag ${rag}`}><span className="d" />{ragLabel(rag)}</span>
                <span style={{ color: 'var(--faint)' }}><IconChev /></span>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
