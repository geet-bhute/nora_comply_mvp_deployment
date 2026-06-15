'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/store'
import { toolRag } from '@/lib/data'
import UseCaseBlock from './UseCaseBlock'

function ragLabel(r: string) {
  return { green: 'Green · Minimal risk', amber: 'Amber · Limited risk', red: 'Red · High risk' }[r] ?? r
}

export default function ToolDrawer() {
  const { openToolId, setOpenToolId, tools } = useApp()
  const router = useRouter()

  const tool = openToolId ? tools.find(t => t.id === openToolId) ?? null : null

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenToolId(null) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [setOpenToolId])

  return (
    <>
      <div
        className={`drawer-mask ${tool ? 'show' : ''}`}
        onClick={() => setOpenToolId(null)}
      />
      <aside className={`drawer ${tool ? 'show' : ''}`}>
        {tool && (
          <>
            <div className="drawer-top">
              <div className="tool-ic">{tool.name[0]}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{tool.name}</div>
                <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>{tool.vendor}</div>
              </div>
              <button className="x" onClick={() => setOpenToolId(null)} aria-label="Close">×</button>
            </div>

            <div className="drawer-body">
              <div style={{ marginBottom: 16 }}>
                {(() => { const r = toolRag(tool); return <span className={`rag ${r}`}><span className="d" />{ragLabel(r)}</span> })()}
              </div>

              {tool.change && (
                <div className="change-note">Warning: {tool.change}</div>
              )}

              {tool.useCases.map(uc => <UseCaseBlock key={uc.id} uc={uc} />)}

              <button
                className="btn btn-ghost"
                style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
                onClick={() => {
                  setOpenToolId(null)
                  router.push('/ask')
                }}
              >
                Ask Nora about this tool
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
