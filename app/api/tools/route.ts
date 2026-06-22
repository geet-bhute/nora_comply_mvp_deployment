import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { OBS_FOR_RAG, ragForCategory, basisForCategory, classKeyForCategory } from '@/lib/data'
import type { RagStatus, RegisterCategory, Tool } from '@/lib/types'

const WORKSPACE_ID = 'northgate-recruitment'

interface DraftUseCase {
  name: string
  what: string
  category: RegisterCategory
}

function slugify(s: string, fallback: string) {
  return s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || fallback
}

export async function GET() {
  const supabase = getSupabase()

  const { data: tools, error: toolsErr } = await supabase
    .from('registered_tools')
    .select('id, slug, name, vendor, created_at')
    .eq('workspace_id', WORKSPACE_ID)
    .order('created_at', { ascending: true })

  if (toolsErr) {
    console.error('[tools] list error:', toolsErr)
    return NextResponse.json({ error: 'Could not load registered tools' }, { status: 500 })
  }
  if (!tools || tools.length === 0) return NextResponse.json({ tools: [] })

  const toolIds = tools.map(t => t.id)

  const { data: useCases, error: ucErr } = await supabase
    .from('registered_use_cases')
    .select('id, tool_id, slug, name, rag, what, basis, class_key')
    .in('tool_id', toolIds)

  if (ucErr) {
    console.error('[tools] use case list error:', ucErr)
    return NextResponse.json({ error: 'Could not load use cases' }, { status: 500 })
  }

  const ucIds = (useCases ?? []).map(u => u.id)
  const { data: obligations, error: obErr } = ucIds.length
    ? await supabase.from('registered_use_case_obligations').select('use_case_id, obligation_id').in('use_case_id', ucIds)
    : { data: [], error: null }

  if (obErr) {
    console.error('[tools] obligations list error:', obErr)
    return NextResponse.json({ error: 'Could not load obligations' }, { status: 500 })
  }

  const obsByUc = new Map<string, string[]>()
  for (const o of obligations ?? []) {
    const arr = obsByUc.get(o.use_case_id) ?? []
    arr.push(o.obligation_id)
    obsByUc.set(o.use_case_id, arr)
  }

  const result: Tool[] = tools.map(t => ({
    id: t.slug,
    name: t.name,
    vendor: t.vendor,
    useCases: (useCases ?? [])
      .filter(u => u.tool_id === t.id)
      .map(u => ({
        id: u.slug,
        name: u.name,
        rag: u.rag as RagStatus,
        what: u.what,
        basis: u.basis,
        classKey: u.class_key ?? undefined,
        obligations: obsByUc.get(u.id) ?? [],
      })),
  }))

  return NextResponse.json({ tools: result })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, vendor, useCases } = body as { name?: string; vendor?: string; useCases?: DraftUseCase[] }

    if (!name?.trim()) return NextResponse.json({ error: 'Tool name is required' }, { status: 400 })
    if (!useCases?.length || useCases.some(u => !u.name?.trim())) {
      return NextResponse.json({ error: 'Every use case needs a name' }, { status: 400 })
    }

    const supabase = getSupabase()
    const baseSlug = slugify(name, `tool-${Date.now()}`)

    const { data: existingSlugs, error: slugErr } = await supabase
      .from('registered_tools')
      .select('slug')
      .eq('workspace_id', WORKSPACE_ID)
      .like('slug', `${baseSlug}%`)

    if (slugErr) {
      console.error('[tools] slug lookup error:', slugErr)
      return NextResponse.json({ error: 'Could not save tool' }, { status: 500 })
    }

    const taken = new Set((existingSlugs ?? []).map(r => r.slug))
    let toolSlug = baseSlug
    let suffix = 2
    while (taken.has(toolSlug)) {
      toolSlug = `${baseSlug}-${suffix}`
      suffix += 1
    }

    const { data: tool, error: toolErr } = await supabase
      .from('registered_tools')
      .insert({ workspace_id: WORKSPACE_ID, slug: toolSlug, name: name.trim(), vendor: vendor?.trim() || 'AI tool' })
      .select('id, slug, name, vendor')
      .single()

    if (toolErr || !tool) {
      console.error('[tools] insert tool error:', toolErr)
      return NextResponse.json({ error: 'Could not save tool' }, { status: 500 })
    }

    const useCaseRows = useCases.map((u, i) => {
      const rag = ragForCategory(u.category)
      return {
        tool_id: tool.id,
        slug: `uc-${toolSlug}-${i}`,
        name: u.name.trim(),
        rag,
        what: u.what?.trim() || 'Use case registered for risk tracking.',
        basis: basisForCategory(u.category),
        class_key: classKeyForCategory(u.category),
      }
    })

    const { data: insertedUseCases, error: ucErr } = await supabase
      .from('registered_use_cases')
      .insert(useCaseRows)
      .select('id, slug, name, rag, what, basis, class_key')

    if (ucErr || !insertedUseCases) {
      console.error('[tools] insert use cases error:', ucErr)
      return NextResponse.json({ error: 'Could not save use cases' }, { status: 500 })
    }

    const obligationRows = insertedUseCases.flatMap(u =>
      OBS_FOR_RAG[u.rag as RagStatus].map(obligationId => ({ use_case_id: u.id, obligation_id: obligationId }))
    )

    if (obligationRows.length) {
      const { error: obErr } = await supabase.from('registered_use_case_obligations').insert(obligationRows)
      if (obErr) {
        console.error('[tools] insert obligations error:', obErr)
        return NextResponse.json({ error: 'Could not save obligations' }, { status: 500 })
      }
    }

    const result: Tool = {
      id: tool.slug,
      name: tool.name,
      vendor: tool.vendor,
      useCases: insertedUseCases.map(u => ({
        id: u.slug,
        name: u.name,
        rag: u.rag as RagStatus,
        what: u.what,
        basis: u.basis,
        classKey: u.class_key ?? undefined,
        obligations: OBS_FOR_RAG[u.rag as RagStatus],
      })),
    }

    return NextResponse.json({ tool: result })
  } catch (err) {
    console.error('[tools] unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
