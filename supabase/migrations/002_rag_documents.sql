-- RAG: EU AI Act document chunks with vector embeddings
-- Run AFTER 001_demo_inquiries.sql
-- Requires pgvector extension (enabled by default on Supabase)

create extension if not exists vector;

-- ── Document chunks ───────────────────────────────────────────────────────────
-- Each row is one chunk of the EU AI Act (article, recital, or annex passage)
create table if not exists eu_ai_act_chunks (
  id           bigserial   primary key,
  created_at   timestamptz default now() not null,

  -- Source metadata
  source       text        not null,          -- e.g. 'EU AI Act 2024/1689'
  article      text,                          -- e.g. 'Article 6', 'Recital 47', 'Annex III'
  title        text,                          -- short heading of the article/section
  chunk_index  int         not null default 0, -- position within the article (for ordering)

  -- Content
  content      text        not null,          -- the raw text of this chunk

  -- Vector embedding (text-embedding-3-small = 1536 dims)
  embedding    vector(1536)
);

-- Indexes
create index if not exists eu_ai_act_chunks_article_idx
  on eu_ai_act_chunks (article);

-- HNSW index for fast approximate nearest-neighbour search
-- (cosine distance — matches OpenAI embedding space)
create index if not exists eu_ai_act_chunks_embedding_idx
  on eu_ai_act_chunks
  using hnsw (embedding vector_cosine_ops)
  with (m = 16, ef_construction = 64);

-- ── Similarity search function ────────────────────────────────────────────────
-- Called from the Ask Nora API: match_eu_ai_act(query_embedding, match_count)
create or replace function match_eu_ai_act(
  query_embedding vector(1536),
  match_count     int     default 5,
  match_threshold float   default 0.5
)
returns table (
  id          bigint,
  article     text,
  title       text,
  content     text,
  similarity  float
)
language sql stable
as $$
  select
    id,
    article,
    title,
    content,
    1 - (embedding <=> query_embedding) as similarity
  from eu_ai_act_chunks
  where 1 - (embedding <=> query_embedding) > match_threshold
  order by embedding <=> query_embedding
  limit match_count;
$$;

-- ── Chat sessions (optional — store Ask Nora conversation history) ────────────
create table if not exists rag_sessions (
  id         uuid        default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  user_email text,                          -- from nora_session cookie if available
  messages   jsonb       not null default '[]'::jsonb
);

alter table rag_sessions enable row level security;
