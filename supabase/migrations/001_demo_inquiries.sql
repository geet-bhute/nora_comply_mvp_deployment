-- Run in Supabase: Dashboard → SQL Editor → New query → paste → Run

create table if not exists demo_inquiries (
  id           uuid        default gen_random_uuid() primary key,
  created_at   timestamptz default now() not null,
  name         text        not null,
  email        text        not null,
  company      text        not null,
  role         text,
  company_size text,
  ai_tools     text[],
  message      text
);

alter table demo_inquiries enable row level security;

-- Server-side inserts only (service role bypasses RLS)
-- No SELECT policy needed — reads happen via service role in the dashboard

create index if not exists demo_inquiries_created_at_idx on demo_inquiries (created_at desc);
create index if not exists demo_inquiries_email_idx      on demo_inquiries (email);
