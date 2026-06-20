'use client'

import React, { createContext, useContext, useState, useCallback, useRef } from 'react'
import type { ChecklistItem, EvidenceItem, Matter, ChatMessage, Tool, Alert, UseCase } from './types'
import { CHECKLIST, TOOLS, EVIDENCE_DATA, ALERT, INITIAL_MATTERS } from './data'

interface ToastState { msg: string; kind?: string }

interface AppContextType {
  // checklist
  checklist: ChecklistItem[]
  toggleChecklistItem: (id: string) => void
  pendingHighlight: string | null
  setPendingHighlight: (id: string | null) => void
  pendingGroupHighlight: { toolId: string; ucId: string } | null
  setPendingGroupHighlight: (g: { toolId: string; ucId: string } | null) => void

  // tools
  tools: Tool[]
  addTool: (t: Tool) => void
  addUseCase: (toolId: string, uc: UseCase) => void

  // alert
  alert: Alert
  alertDismissed: boolean
  dismissAlert: () => void

  // evidence
  evidence: EvidenceItem[]

  // matters
  matters: Matter[]
  addMatter: (m: Matter) => void
  resolveMatter: (id: string) => void
  openMatterId: string | null
  setOpenMatterId: (id: string | null) => void

  // chat
  chatLog: ChatMessage[] | null
  setChatLog: (log: ChatMessage[] | null) => void

  // drawer
  openToolId: string | null
  setOpenToolId: (id: string | null) => void

  // register drawer
  registerOpen: boolean
  setRegisterOpen: (open: boolean) => void

  // toast
  toastState: ToastState | null
  showToast: (msg: string, kind?: string) => void

  // helpers
  matterSeqRef: React.MutableRefObject<number>
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => JSON.parse(JSON.stringify(CHECKLIST)))
  const [tools, setTools] = useState<Tool[]>(() => JSON.parse(JSON.stringify(TOOLS)))
  const [evidence, setEvidence] = useState<EvidenceItem[]>(() => JSON.parse(JSON.stringify(EVIDENCE_DATA)))
  const [alertDismissed, setAlertDismissed] = useState(false)
  const [matters, setMatters] = useState<Matter[]>(INITIAL_MATTERS)
  const [openMatterId, setOpenMatterId] = useState<string | null>(null)
  const [chatLog, setChatLogRaw] = useState<ChatMessage[] | null>(null)
  const [openToolId, setOpenToolId] = useState<string | null>(null)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [pendingHighlight, setPendingHighlight] = useState<string | null>(null)
  const [pendingGroupHighlight, setPendingGroupHighlight] = useState<{ toolId: string; ucId: string } | null>(null)
  const [toastState, setToastState] = useState<ToastState | null>(null)
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const matterSeqRef = useRef(2)

  const toggleChecklistItem = useCallback((id: string) => {
    setChecklist(prev => prev.map(o => o.id === id ? { ...o, done: !o.done } : o))
  }, [])

  const addTool = useCallback((t: Tool) => {
    setTools(prev => [...prev, t])
  }, [])

  const addUseCase = useCallback((toolId: string, uc: UseCase) => {
    setTools(prev => prev.map(t => t.id === toolId ? { ...t, useCases: [...t.useCases, uc] } : t))
  }, [])

  const dismissAlert = useCallback(() => setAlertDismissed(true), [])

  const addMatter = useCallback((m: Matter) => {
    setMatters(prev => [m, ...prev])
  }, [])

  const resolveMatter = useCallback((id: string) => {
    setMatters(prev => prev.map(m => m.id === id ? { ...m, status: 'Resolved' } : m))
    setEvidence(prev => [{ n: 'External counsel advice', t: 'Filed from resolved matter', linked: 'Bullhorn match feature', legal: true }, ...prev])
  }, [])

  const setChatLog = useCallback((log: ChatMessage[] | null) => {
    setChatLogRaw(log)
  }, [])

  const showToast = useCallback((msg: string, kind?: string) => {
    setToastState({ msg, kind })
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    toastTimerRef.current = setTimeout(() => setToastState(null), 2200)
  }, [])

  return (
    <AppContext.Provider value={{
      checklist, toggleChecklistItem, pendingHighlight, setPendingHighlight,
      pendingGroupHighlight, setPendingGroupHighlight,
      tools, addTool, addUseCase,
      alert: ALERT, alertDismissed, dismissAlert,
      evidence,
      matters, addMatter, resolveMatter, openMatterId, setOpenMatterId,
      chatLog, setChatLog,
      openToolId, setOpenToolId,
      registerOpen, setRegisterOpen,
      toastState, showToast,
      matterSeqRef,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
