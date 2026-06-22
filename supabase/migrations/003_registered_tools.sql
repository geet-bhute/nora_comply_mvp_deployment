-- Run in Supabase: Dashboard → SQL Editor → New query → paste → Run
-- Stores AI systems added via the "Register AI system" drawer.
-- Seed/demo tools (Bullhorn, Microsoft Copilot) stay in lib/data.ts and are not in this table.

create table if not exists registered_tools (
  id           uuid        default gen_random_uuid() primary key,
  created_at   timestamptz default now() not null,
  workspace_id text        default 'northgate-recruitment' not null,
  slug         text        not null,
  name         text        not null,
  vendor       text        not null
);

create table if not exists registered_use_cases (
  id           uuid        default gen_random_uuid() primary key,
  created_at   timestamptz default now() not null,
  tool_id      uuid        not null references registered_tools(id) on delete cascade,
  slug         text        not null,
  name         text        not null,
  rag          text        not null check (rag in ('green', 'amber', 'red')),
  what         text        not null,
  basis        text        not null,
  class_key    text
);

-- Defensive: if this table already existed before class_key was added, backfill the column.
alter table registered_use_cases add column if not exists class_key text;

-- Obligation ids reference the static checklist (c1..c10) defined in lib/data.ts.
create table if not exists registered_use_case_obligations (
  use_case_id    uuid not null references registered_use_cases(id) on delete cascade,
  obligation_id  text not null,
  primary key (use_case_id, obligation_id)
);

alter table registered_tools enable row level security;
alter table registered_use_cases enable row level security;
alter table registered_use_case_obligations enable row level security;

-- Server-side reads/writes only (service role bypasses RLS) — no anon policies needed.

create index if not exists registered_tools_workspace_idx on registered_tools (workspace_id);
create index if not exists registered_use_cases_tool_idx on registered_use_cases (tool_id);
create index if not exists registered_use_case_obligations_uc_idx on registered_use_case_obligations (use_case_id);
