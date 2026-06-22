'use client'

import { useState } from 'react'
import { useApp } from '@/lib/store'
import { TENANT, toolRag, REGISTER_CATEGORIES, ragForCategory, basisForCategory, classKeyForCategory, OBS_FOR_RAG } from '@/lib/data'
import { IconPlus } from '@/components/icons'
import UseCaseBlock from '@/components/UseCaseBlock'
import type { RegisterCategory, UseCase } from '@/lib/types'

function ragLabel(r: string) {
  return { green: 'Minimal risk', amber: 'Limited risk', red: 'High risk' }[r] ?? r
}

function RagPill({ r }: { r: string }) {
  const labels: Record<string, string> = { green: 'Minimal risk', amber: 'Limited risk', red: 'High risk' }
  return <span className={`rag ${r}`}><span className="d" />{labels[r] ?? r}</span>
}

const emptyDraft = () => ({ name: '', what: '', category: 'Minimal risk' as RegisterCategory })

export default function YourSystemsPage() {
  const { tools, setRegisterOpen, addUseCase, showToast } = useApp()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [addingUC, setAddingUC] = useState(false)
  const [draft, setDraft] = useState(emptyDraft)

  const selected = selectedId ? tools.find(t => t.id === selectedId) ?? null : null

  const submitUseCase = () => {
    if (!draft.name.trim() || !selectedId) { showToast('Use case name is required'); return }
    const rag = ragForCategory(draft.category)
    const uc: UseCase = {
      id: `uc-${selectedId}-${Date.now()}`,
      name: draft.name.trim(),
      rag,
      classKey: classKeyForCategory(draft.category),
      what: draft.what.trim() || 'Use case registered for risk tracking.',
      basis: basisForCategory(draft.category),
      obligations: OBS_FOR_RAG[rag],
    }
    addUseCase(selectedId, uc)
    showToast('Use case added', 'ok')
    setAddingUC(false)
    setDraft(emptyDraft)
  }

  const cancelAddUC = () => {
    setAddingUC(false)
    setDraft(emptyDraft)
  }

  // ── Detail view ──────────────────────────────────────────────────────────────
  if (selected) {
    const rag = toolRag(selected)
    return (
      <>
        <div style={{ marginBottom: 22 }}>
          <button className="btn btn-ghost" onClick={() => { setSelectedId(null); setAddingUC(false); setDraft(emptyDraft) }}>
            ← Back to AI Systems
          </button>
        </div>

        <div className="card tool-detail-card">
          <div className="tool-detail-head">
            <div className="tool-detail-logo">
              {selected.logo ? (
                <img src={selected.logo} alt={selected.name} />
              ) : (
                <span>{selected.name[0]}</span>
              )}
            </div>
            <div className="tool-detail-info">
              <div className="tool-detail-name">{selected.name}</div>
              <div className="tool-detail-vendor">{selected.vendor}</div>
              <RagPill r={rag} />
            </div>
          </div>

          {selected.change && (
            <div className="change-note" style={{ margin: '16px 24px 0' }}>⚠ {selected.change}</div>
          )}

          <div style={{ padding: '20px 24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>
                Use Cases <span style={{ fontWeight: 400, color: 'var(--muted)', fontSize: 13 }}>({selected.useCases.length})</span>
              </div>
              <button className="btn btn-primary" onClick={() => setAddingUC(v => !v)}>
                <IconPlus /> Add use case
              </button>
            </div>

            {addingUC && (
              <div className="card uc-add-form">
                <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 14, color: 'var(--brand)' }}>
                  New use case for {selected.name}
                </div>
                <div className="reg-field">
                  <label>Use case name</label>
                  <input
                    value={draft.name}
                    onChange={e => setDraft(d => ({ ...d, name: e.target.value }))}
                    placeholder="e.g. CV Screening"
                    autoFocus
                  />
                </div>
                <div className="reg-field">
                  <label>Description (optional)</label>
                  <input
                    value={draft.what}
                    onChange={e => setDraft(d => ({ ...d, what: e.target.value }))}
                    placeholder="What is this use case for?"
                  />
                </div>
                <div className="reg-field" style={{ marginBottom: 16 }}>
                  <label>Risk category</label>
                  <select value={draft.category} onChange={e => setDraft(d => ({ ...d, category: e.target.value as RegisterCategory }))}>
                    {REGISTER_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-primary" onClick={submitUseCase}>Add use case</button>
                  <button className="btn btn-quiet" onClick={cancelAddUC}>Cancel</button>
                </div>
              </div>
            )}

            {selected.useCases.map(uc => (
              <UseCaseBlock key={uc.id} uc={uc} toolId={selected.id} showApplyGuardrails />
            ))}

            {selected.useCases.length === 0 && !addingUC && (
              <div style={{ fontSize: 14, color: 'var(--muted)', padding: '12px 0', textAlign: 'center' }}>
                No use cases yet. Add one to start tracking obligations.
              </div>
            )}
          </div>
        </div>
      </>
    )
  }

  // ── Grid view ────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="page-head">
        <div className="lede-wrap">
          <div className="page-title">{TENANT.name}&rsquo;s AI Systems</div>
          <div className="page-lede">
            <em>Every AI system has multiple use cases under the EU AI Act. For each use case, the Article 26 deployer obligations must be fulfilled.</em>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setRegisterOpen(true)}>
          <IconPlus /> Register AI system
        </button>
      </div>

      {tools.length === 0 ? (
        <div className="card stat" style={{ padding: '28px 24px', color: 'var(--muted)', fontSize: 14 }}>
          No systems registered yet. Add your first AI tool to start mapping its use cases and obligations.
        </div>
      ) : (
        <div className="systems-grid">
          {tools.map(tool => (
            <button
              key={tool.id}
              className="card sys-card"
              onClick={() => setSelectedId(tool.id)}
            >
              <div className="sys-card-head">
                <div className="sys-card-titles">
                  <div className="sys-name">{tool.name}</div>
                  <div className="sys-count">Use Cases: {tool.useCases.length}</div>
                </div>
                <div className="sys-logo">
                  {tool.logo ? (
                    <img src={tool.logo} alt={tool.name} />
                  ) : (
                    <span>{tool.name[0]}</span>
                  )}
                </div>
              </div>
              <div className="sys-chips">
                {tool.useCases.map(uc => <RagPill key={uc.id} r={uc.rag} />)}
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  )
}
