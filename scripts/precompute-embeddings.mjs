// Run once: node scripts/precompute-embeddings.mjs
// Saves embeddings to lib/knowledge-base-embeddings.json
// Commit that file — no cold-start embedding cost at runtime.

import { readFileSync, writeFileSync } from 'fs'
import { createRequire } from 'module'
import { pathToFileURL } from 'url'
import OpenAI from 'openai'
import { config } from 'dotenv'

config({ path: '.env.local' })

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// Dynamically import the TS knowledge base via tsx if available, else parse manually
async function getChunks() {
  try {
    const { KNOWLEDGE_BASE } = await import('../lib/knowledge-base.ts')
    return KNOWLEDGE_BASE
  } catch {
    // Fallback: run via tsx
    console.error('Run with: npx tsx scripts/precompute-embeddings.mjs')
    process.exit(1)
  }
}

const chunks = await getChunks()
console.log(`Embedding ${chunks.length} chunks...`)

const texts = chunks.map(c => `${c.title}. ${c.content}`)
const res = await openai.embeddings.create({ model: 'text-embedding-3-small', input: texts })

const output = chunks.map((chunk, i) => ({
  id: chunk.id,
  source: chunk.source,
  title: chunk.title,
  sourceUrl: chunk.sourceUrl,
  content: chunk.content,
  embedding: res.data[i].embedding,
}))

writeFileSync('lib/knowledge-base-embeddings.json', JSON.stringify(output))
console.log(`✓ Saved ${output.length} embeddings to lib/knowledge-base-embeddings.json`)
console.log(`  Dimensions: ${output[0].embedding.length}`)
