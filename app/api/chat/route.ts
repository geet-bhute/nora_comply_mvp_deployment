import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import OpenAI from "openai";
import { KNOWLEDGE_BASE } from "@/lib/knowledge-base";
import { rankChunksBySimilarity, buildSystemPrompt } from "@/lib/rag-utils";

// Embeddings are computed once on cold start and cached for the process lifetime.
// Would move to pgvector in production — this is fine for a prototype.
let embeddedChunksCache: Array<{
  id: string;
  source: string;
  title: string;
  sourceUrl: string;
  content: string;
  embedding: number[];
}> | null = null;

async function getEmbeddedChunks(openaiClient: OpenAI) {
  if (embeddedChunksCache) return embeddedChunksCache;

  const texts = KNOWLEDGE_BASE.map((chunk) => `${chunk.title}. ${chunk.content}`);

  const response = await openaiClient.embeddings.create({
    model: "text-embedding-3-small",
    input: texts,
  });

  embeddedChunksCache = KNOWLEDGE_BASE.map((chunk, index) => ({
    id: chunk.id,
    source: chunk.source,
    title: chunk.title,
    sourceUrl: chunk.sourceUrl,
    content: chunk.content,
    embedding: response.data[index].embedding,
  }));

  return embeddedChunksCache;
}

export async function POST(request: Request) {
  const { messages } = await request.json();
  const latestMessage = messages[messages.length - 1].content as string;

  const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const queryEmbeddingResponse = await openaiClient.embeddings.create({
    model: "text-embedding-3-small",
    input: latestMessage,
  });
  const queryEmbedding = queryEmbeddingResponse.data[0].embedding;

  const embeddedChunks = await getEmbeddedChunks(openaiClient);
  const relevantChunks = rankChunksBySimilarity(queryEmbedding, embeddedChunks, 4);
  const systemPrompt = buildSystemPrompt(relevantChunks);

  // gpt-4o over mini — legal reasoning needs the larger model, the cost difference is worth it
  const result = streamText({
    model: openai("gpt-4o"),
    system: systemPrompt,
    messages,
  });

  return result.toTextStreamResponse();
}
