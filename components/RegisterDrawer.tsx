'use client'

import { useState } from 'react'
import { useApp } from '@/lib/store'
import { REGISTER_CATEGORIES } from '@/lib/data'
import type { RegisterCategory, Tool } from '@/lib/types'

interface DraftUseCase {
  name: string
  what: string
  category: RegisterCategory
}

const emptyUseCase = (): DraftUseCase => ({ name: '', what: '', category: 'Minimal risk' })

export default function RegisterDrawer() {
  const { registerOpen, setRegisterOpen, addTool, showToast } = useApp()
  const [name, setName] = useState('')
  const [vendor, setVendor] = useState('')
  const [useCases, setUseCases] = useState<DraftUseCase[]>([emptyUseCase()])
  const [submitting, setSubmitting] = useState(false)

  const reset = () => {
    setName('')
    setVendor('')
    setUseCases([emptyUseCase()])
  }

  const close = () => {
    setRegisterOpen(false)
    reset()
  }

  const updateUseCase = (i: number, patch: Partial<DraftUseCase>) => {
    setUseCases(prev => prev.map((u, idx) => idx === i ? { ...u, ...patch } : u))
  }

  const removeUseCase = (i: number) => {
    setUseCases(prev => prev.filter((_, idx) => idx !== i))
  }

  const submit = async () => {
    if (!name.trim()) { showToast('Tool name is required'); return }
    if (useCases.some(u => !u.name.trim())) { showToast('Every use case needs a name'); return }

    setSubmitting(true)
    try {
      const res = await fetch('/api/tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), vendor: vendor.trim(), useCases }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not register tool')

      addTool(data.tool as Tool)
      showToast('AI system registered', 'ok')
      close()
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Could not register tool')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className={`drawer-mask ${registerOpen ? 'show' : ''}`} onClick={close} />
      <aside className={`drawer ${registerOpen ? 'show' : ''}`}>
        {registerOpen && (
          <>
            <div className="drawer-top">
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>Register AI system</div>
                <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>Add a tool and the ways your team uses it</div>
              </div>
              <button className="x" onClick={close} aria-label="Close">×</button>
            </div>
            <div className="drawer-body">
              <div className="reg-field">
                <label>Tool name</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. LinkedIn Recruiter" />
              </div>
              <div className="reg-field">
                <label>Vendor / category</label>
                <input value={vendor} onChange={e => setVendor(e.target.value)} placeholder="e.g. Sourcing platform" />
              </div>

              <div className="reg-field">
                <label>Use cases</label>
                {useCases.map((u, i) => (
                  <div key={i} className="reg-uc">
                    {useCases.length > 1 && (
                      <button className="rmuc" onClick={() => removeUseCase(i)}>Remove</button>
                    )}
                    <div className="uch">Use case {i + 1}</div>
                    <input
                      value={u.name}
                      onChange={e => updateUseCase(i, { name: e.target.value })}
                      placeholder="What is it used for? e.g. CV screening"
                    />
                    <input
                      value={u.what}
                      onChange={e => updateUseCase(i, { what: e.target.value })}
                      placeholder="Short description (optional)"
                    />
                    <select value={u.category} onChange={e => updateUseCase(i, { category: e.target.value as RegisterCategory })}>
                      {REGISTER_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                ))}
                <button className="reg-add" onClick={() => setUseCases(prev => [...prev, emptyUseCase()])}>+ Add another use case</button>
                <div className="reg-hint">Choosing a category sets the risk rating and the checklist items this use case will trigger.</div>
              </div>

              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }} onClick={submit} disabled={submitting}>
                {submitting ? 'Registering…' : 'Register system'}
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
