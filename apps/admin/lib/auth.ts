import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { data: admin, error: adminError } = await supabase
    .from("admin_users")
    .select("user_id, role, display_name")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminError || !admin) {
    redirect("/unauthorized");
  }

  return { supabase, user, admin };
}
