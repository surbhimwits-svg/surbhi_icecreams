-- Migration 0001: canonical contact_messages table.
-- Run in Supabase SQL Editor. Idempotent (safe to re-run).
-- Identical to supabase/schema.sql — kept here as the numbered migration
-- history; supabase/schema.sql stays as the always-current reference copy.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (
    char_length(trim(name)) between 2 and 100
  ),
  email text not null check (
    char_length(email) <= 150
    and email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'
  ),
  phone text not null check (
    char_length(phone) <= 20
    and phone ~ '^(\+91[- ]?)?[6-9][0-9]{4}[- ]?[0-9]{5}$'
  ),
  message text not null check (
    char_length(trim(message)) between 10 and 2000
  ),
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

drop policy if exists "Anyone can insert contact messages" on public.contact_messages;
create policy "Anyone can insert contact messages"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);
