import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

const WORKSPACE_ID = 'northgate-recruitment'

export async function DELETE(_req: NextRequest, { params }: { params: { slug: string } }) {
  const supabase = getSupabase()

  const { error } = await supabase
    .from('registered_tools')
    .delete()
    .eq('workspace_id', WORKSPACE_ID)
    .eq('slug', params.slug)

  if (error) {
    console.error('[tools] delete error:', error)
    return NextResponse.json({ error: 'Could not delete tool' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
