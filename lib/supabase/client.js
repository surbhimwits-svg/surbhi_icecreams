import { createClient } from "@supabase/supabase-js";

// Public anon-key client. Safe to use in Client Components or Route Handlers;
// only has the access granted by Row Level Security policies.
export function createSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
