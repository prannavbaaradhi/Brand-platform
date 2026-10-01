"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../lib/auth";
import type { Json } from "@brand/database/types";

export async function saveHomepageContent(formData: FormData) {
  const { supabase, user } = await requireAdmin();

  const value: Json = {
    announcement: String(formData.get("announcement") ?? "").trim(),
    heroEyebrow: String(formData.get("hero_eyebrow") ?? "").trim(),
    heroTitle: String(formData.get("hero_title") ?? "").trim(),
    heroCta: String(formData.get("hero_cta") ?? "").trim()
  };

  const { error } = await supabase.from("site_content").upsert({
    key: "homepage",
    value,
    is_public: true,
    updated_by: user.id
  });

  if (error) throw error;
  revalidatePath("/content");
}
