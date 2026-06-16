import OpenAI from 'openai'
import { rankChunksBySimilarity, buildSystemPrompt } from '@/lib/rag-utils'

const groqClient = new OpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
})

const embeddingClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// Pre-computed embeddings loaded once at cold start — no embedding API call for the KB.
// Regenerate with: npx tsx scripts/precompute-embeddings.mjs
import precomputed from '@/lib/knowledge-base-embeddings.json'
const EMBEDDED_CHUNKS = precomputed as Array<{
  id: string; source: string; title: string; sourceUrl: string; content: string; embedding: number[]
}>

export async function POST(request: Request) {
  const { messages } = await request.json()
  const latestMessage = messages[messages.length - 1].content as string

  // Only 1 embedding API call per query (the KB is pre-computed)
  const qRes = await embeddingClient.embeddings.create({
    model: 'text-embedding-3-small',
    input: latestMessage,
  })
  const queryEmbedding = qRes.data[0].embedding

  const relevantChunks = rankChunksBySimilarity(queryEmbedding, EMBEDDED_CHUNKS, 4)
  const systemPrompt = buildSystemPrompt(relevantChunks)

  const stream = await groqClient.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'system', content: systemPrompt }, ...messages],
    stream: true,
  })

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? ''
          if (text) controller.enqueue(new TextEncoder().encode(text))
        }
      } finally {
        controller.close()
      }
    },
  })

  return new Response(readable, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
