import { createClient } from "@supabase/supabase-js";

// Server-only: uses the service role key, which bypasses Row Level Security.
// Never import this file from a "use client" component or expose it to the browser.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );
}
