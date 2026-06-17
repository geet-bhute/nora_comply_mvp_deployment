'use client'

import { useEffect, useRef, useState } from 'react'
import { useApp } from '@/lib/store'
import { IconChev, IconTick } from './icons'
import type { ChecklistItem } from '@/lib/types'

export default function ChecklistRow({ item, num, applies }: { item: ChecklistItem; num: number; applies: string[] }) {
  const { toggleChecklistItem, showToast, pendingHighlight, setPendingHighlight } = useApp()
  const [open, setOpen] = useState(false)
  const [flash, setFlash] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (pendingHighlight !== item.id) return
    setPendingHighlight(null)
    setOpen(true)
    setFlash(true)
    const t = setTimeout(() => setFlash(false), 1600)
    const scrollT = setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 70)
    return () => { clearTimeout(t); clearTimeout(scrollT) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingHighlight])

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleChecklistItem(item.id)
    if (!item.done) showToast('Marked done', 'ok')
  }

  return (
    <div ref={ref} className={`obl ${item.done ? 'is-done' : ''} ${open ? 'open' : ''} ${flash ? 'flash' : ''}`} id={`obl-${item.id}`}>
      <div className="obl-head">
        <div
          className={`check ${item.done ? 'done' : ''}`}
          onClick={handleToggle}
          role="checkbox"
          aria-checked={item.done}
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleToggle(e as unknown as React.MouseEvent) }}
        >
          <IconTick />
        </div>
        <div style={{ flex: 1 }} onClick={() => setOpen(o => !o)}>
          <div className="obl-title">{num}. {item.t}</div>
          <div className="obl-meta">
            {item.recurring && <span className="tag recur">Recurring</span>}
            <span className="tag dl">{item.basis.split(' — ')[0]}</span>
            {item.done && item.recurring && <span className="tag">Done · re-opens when due</span>}
          </div>
        </div>
        <span className="obl-chev" onClick={() => setOpen(o => !o)}><IconChev /></span>
      </div>
      <div className="obl-body">
        <div className="obl-inner">
          <div className="field">
            <div className="fl">In plain English</div>
            <p>{item.plain}</p>
          </div>
          {item.recurring && item.done && (
            <div className="obl-note">This is a recurring duty; it re-opens when it&apos;s next due. Your readiness score reflects what&apos;s current, not a one-time tick.</div>
          )}
          <div className="field">
            <div className="fl">Legal basis</div>
            <p>{item.basis}</p>
          </div>
          <div className="field">
            <div className="fl">Applies to</div>
            {applies.length
              ? <div className="applies">{applies.map((a, i) => <span key={i} className="ap">{a}</span>)}</div>
              : <p style={{ color: 'var(--muted)' }}>No current use case requires this.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
