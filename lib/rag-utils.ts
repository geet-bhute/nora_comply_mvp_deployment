export function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));

  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dot / (magnitudeA * magnitudeB);
}

export type ScoredChunk = {
  id: string;
  source: string;
  title: string;
  sourceUrl: string;
  content: string;
  score: number;
};

export function rankChunksBySimilarity(
  queryEmbedding: number[],
  chunkEmbeddings: Array<{ id: string; source: string; title: string; sourceUrl: string; content: string; embedding: number[] }>,
  topK: number = 6
): ScoredChunk[] {
  const scored = chunkEmbeddings.map((chunk) => ({
    id: chunk.id,
    source: chunk.source,
    title: chunk.title,
    sourceUrl: chunk.sourceUrl,
    content: chunk.content,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));

  return scored.sort((a, b) => b.score - a.score).slice(0, topK);
}

export function buildSystemPrompt(relevantChunks: ScoredChunk[]): string {
  const context = relevantChunks
    .map((chunk) => `[${chunk.source}]\nTitle: ${chunk.title}\nOfficial source: ${chunk.sourceUrl}\n\n${chunk.content}`)
    .join("\n\n---\n\n");

  return `You are a compliance assistant specialising in the EU AI Act (Regulation (EU) 2024/1689), with a focus on recruitment agencies and HR technology deployers.

Your answers are grounded exclusively in the following retrieved sections of the EU AI Act. All text marked as verbatim is the exact legal language from the official regulation published in the Official Journal of the EU on 12 July 2024. Do not speculate beyond this context. If the context does not contain enough information to answer confidently, say so clearly and direct the user to the official text at https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689.

RETRIEVED CONTEXT (from official EU AI Act text):
${context}

Guidelines:
- Be direct and practical. Compliance teams need actionable answers, not legal disclaimers.
- Always cite the specific Article, paragraph number, and Annex you are drawing from (e.g. "Article 26(6)").
- When quoting the regulation, use quotation marks and identify it as verbatim legal text.
- If a question involves a deadline, state the exact date from Article 113.
- If something requires a human decision or physical action (not just documentation), say so explicitly.
- At the end of your answer, list the source URLs of the chunks you used under a "Sources:" heading.
- Keep answers concise but complete.`;
}
