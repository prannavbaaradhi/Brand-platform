import { createClient } from "@supabase/supabase-js";
import type { Database } from "@brand/database/types";

const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey =
  process.env.SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !publishableKey) {
  throw new Error("Missing Supabase URL or publishable key.");
}

export const publicDb = createClient<Database>(url, publishableKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});

export function getServerDb() {
  const secret =
    process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!secret) {
    throw new Error("SUPABASE_SECRET_KEY is required for server-only commerce operations.");
  }

  return createClient<Database>(url!, secret, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}
