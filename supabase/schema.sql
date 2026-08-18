-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query)
-- This is the canonical schema for the table app/api/contact/route.js writes to.
-- Constraints here are kept in sync with the limits in lib/validation.js.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (
    char_length(trim(name)) between 2 and 100
  ),
  email text not null check (
    char_length(email) <= 150
    and email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'
  ),
  -- Exactly 10 digits, no country code/spaces/dashes (kept in sync with
  -- lib/validation.js's PHONE_PATTERN).
  phone text not null check (
    phone ~ '^\d{10}$'
  ),
  -- Message is optional at the application layer, so an empty string must
  -- be allowed; only the upper bound is enforced.
  message text not null check (
    char_length(message) <= 2000
  ),
  created_at timestamptz not null default now()
);

-- Supports "recent submissions" style queries for a future admin view.
create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

-- Anyone (including anonymous website visitors) can submit a contact message.
drop policy if exists "Anyone can insert contact messages" on public.contact_messages;
create policy "Anyone can insert contact messages"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

-- No select/update/delete policy is defined for anon/authenticated, so the
-- public cannot read, edit, or delete rows. Reading messages for an admin
-- dashboard should go through the service role key (which bypasses RLS)
-- from a trusted server context only (see lib/supabase/server.js).
