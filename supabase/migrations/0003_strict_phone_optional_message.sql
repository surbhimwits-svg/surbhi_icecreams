-- Migration 0003: tighten the phone format, relax the message requirement.
-- Run in Supabase SQL Editor. Idempotent (safe to re-run) and non-destructive
-- — it only replaces two CHECK constraints, no columns/data are touched.
--
-- Why this is needed:
--   * The phone rule changed from "optional +91 prefix, 6-9 first digit,
--     spaces/dashes allowed" to "exactly 10 digits, digits only" to match
--     the new frontend/API validation in lib/validation.js. Rows that would
--     pass the new app-level check (e.g. a plain 10-digit number not
--     starting with 6-9) could otherwise still be rejected by the old,
--     stricter DB constraint.
--   * The message field is now optional at the app layer. The old
--     constraint required 10-2000 trimmed characters, which would reject
--     every empty-message submission with a raw DB error.
--
-- This finds the existing CHECK constraints by inspecting their definition
-- (rather than assuming a specific auto-generated name), so it's safe even
-- if the live constraint names differ from what "create table" would
-- normally generate.

do $$
declare
  c record;
begin
  for c in
    select conname
    from pg_constraint
    where conrelid = 'public.contact_messages'::regclass
      and contype = 'c'
      and pg_get_constraintdef(oid) ilike '%phone%'
  loop
    execute format('alter table public.contact_messages drop constraint %I', c.conname);
  end loop;

  for c in
    select conname
    from pg_constraint
    where conrelid = 'public.contact_messages'::regclass
      and contype = 'c'
      and pg_get_constraintdef(oid) ilike '%message%'
  loop
    execute format('alter table public.contact_messages drop constraint %I', c.conname);
  end loop;
end $$;

alter table public.contact_messages
  add constraint contact_messages_phone_check
  check (phone ~ '^\d{10}$');

alter table public.contact_messages
  add constraint contact_messages_message_check
  check (char_length(message) <= 2000);
