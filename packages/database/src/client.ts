import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export function createBrowserSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Missing public Supabase environment variables.");
  }

  return createClient<Database>(url, key);
}
