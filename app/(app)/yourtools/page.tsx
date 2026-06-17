'use client'

import { useState } from 'react'
import { useApp } from '@/lib/store'
import { toolRag } from '@/lib/data'
import { IconChev, IconPlus } from '@/components/icons'
import UseCaseBlock from '@/components/UseCaseBlock'

function ragLabel(r: string) {
  return { green: 'Green · Minimal risk', amber: 'Amber · Limited risk', red: 'Red · High risk' }[r] ?? r
}

export default function YourToolsPage() {
  const { tools, setRegisterOpen } = useApp()
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <>
      <div className="page-head">
        <div className="lede-wrap">
          <div className="page-eyebrow">Tools &amp; use cases</div>
          <div className="page-title">Your tools</div>
          <div className="page-lede">Each tool, and the specific ways you use it. Open a tool to see its use cases: every use case links to the checklist items it triggers, because your obligations apply again for each new tool and each new way you use one.</div>
        </div>
        <button className="btn btn-primary" onClick={() => setRegisterOpen(true)}><IconPlus /> Register AI system</button>
      </div>

      <div className="card">
        {tools.map(t => {
          const open = openId === t.id
          const rag = toolRag(t)
          return (
            <div key={t.id} className={`yt ${open ? 'open' : ''}`}>
              <div className="yt-head" onClick={() => setOpenId(open ? null : t.id)}>
                <div className="yt-logo">{t.name[0]}</div>
                <div>
                  <div className="nm" style={{ fontWeight: 600, fontSize: 15 }}>{t.name}</div>
                  <div className="yt-count">{t.vendor} · {t.useCases.length} use case{t.useCases.length > 1 ? 's' : ''}</div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span className={`rag ${rag}`}><span className="d" />{ragLabel(rag)}</span>
                  <span className="yt-chev"><IconChev /></span>
                </div>
              </div>
              <div className="uc-wrap">
                {t.useCases.map(uc => <UseCaseBlock key={uc.id} uc={uc} toolId={t.id} />)}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
