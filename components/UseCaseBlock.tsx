'use client'

import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/store'
import type { UseCase } from '@/lib/types'

function ragChip(r: string) {
  const lab: Record<string, string> = { green: 'Green · Minimal risk', amber: 'Amber · Limited risk', red: 'Red · High risk' }
  return <span className={`rag ${r}`}><span className="d" />{lab[r] ?? r}</span>
}

export default function UseCaseBlock({ uc }: { uc: UseCase }) {
  const { checklist, setPendingHighlight, setOpenToolId } = useApp()
  const router = useRouter()

  const goChecklist = (id: string) => {
    setPendingHighlight(id)
    setOpenToolId(null)
    router.push('/checklist')
  }

  return (
    <div className="uc">
      <div className="uc-head">
        <span className="uc-name">{uc.name}</span>
        {ragChip(uc.rag)}
      </div>
      <div className="uc-ob-h" style={{ marginBottom: 4 }}>Plain English Verdict</div>
      <div className="uc-what">{uc.what}</div>
      <div className="uc-basis">{uc.basis}</div>
      <div className="uc-ob-h">Guardrails to green-light</div>
      <div className="uc-obs">
        {uc.obligations.map(id => {
          const num = checklist.findIndex(o => o.id === id) + 1
          const item = checklist.find(o => o.id === id)
          if (!item) return null
          return (
            <button key={id} className="ob-link" onClick={() => goChecklist(id)}>
              <span className="n">{num}</span>{item.t}<span className="go">›</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
