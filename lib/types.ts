export type RagStatus = 'green' | 'amber' | 'red'

export interface ChecklistItem {
  id: string
  t: string
  recurring: boolean
  done: boolean
  plain: string
  basis: string
}

export interface UseCase {
  id: string
  name: string
  rag: RagStatus
  what: string
  basis: string
  obligations: string[]
}

export interface Tool {
  id: string
  name: string
  vendor: string
  change?: string
  useCases: UseCase[]
}

export interface EvidenceItem {
  n: string
  t: string
  linked: string
  legal?: boolean
}

export interface Alert {
  sev: 'urgent' | 'info'
  title: string
  body: string
}

export interface MatterMessage {
  who: 'firm' | 'me' | 'sys'
  name: string
  txt: string
  meta: string
}

export interface Matter {
  id: string
  title: string
  firm: string
  tier: number
  status: string
  price: string
  sla: string
  opened: string
  q: string
  bundle: string[]
  thread: MatterMessage[]
}

export interface ChatMessage {
  role: 'ai' | 'user'
  html: string
}

export type RegisterCategory =
  | 'Minimal risk'
  | 'Limited risk — transparency'
  | 'Non-banned biometrics'
  | 'Critical infrastructure'
  | 'Education and vocational training'
  | 'Employment, workers management and access to self-employment'
  | 'Access and enjoyment of essential public and private services'
  | 'Law enforcement'
  | 'Migration, asylum, and border control management'
  | 'Administration of justice and democratic processes'
