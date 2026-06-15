'use client'

import { useApp } from '@/lib/store'

export default function Toast() {
  const { toastState } = useApp()

  return (
    <div className={`toast ${toastState ? 'show' : ''}`}>
      {toastState?.kind === 'ok' && <span className="ok">✓</span>}
      {toastState?.msg}
    </div>
  )
}
