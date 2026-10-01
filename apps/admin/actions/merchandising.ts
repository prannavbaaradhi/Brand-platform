"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../lib/auth";
import { slugify } from "../lib/slug";

export async function createCollection(formData: FormData) {
  const { supabase } = await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? name));
  const description = String(formData.get("description") ?? "").trim() || null;

  if (!name || !slug) throw new Error("Collection name is required.");

  const { error } = await supabase.from("collections").insert({
    name,
    slug,
    description
  });

  if (error) throw error;
  revalidatePath("/collections");
}

export async function toggleCollection(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const next = String(formData.get("next") ?? "false") === "true";

  const { error } = await supabase
    .from("collections")
    .update({
      is_published: next,
      published_at: next ? new Date().toISOString() : null
    })
    .eq("id", id);

  if (error) throw error;
  revalidatePath("/collections");
}

export async function createLookbook(formData: FormData) {
  const { supabase } = await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? title));
  const description = String(formData.get("description") ?? "").trim() || null;
  const cover = String(formData.get("cover_image_url") ?? "").trim() || null;

  if (!title || !slug) throw new Error("Lookbook title is required.");

  const { error } = await supabase.from("lookbooks").insert({
    title,
    slug,
    description,
    cover_image_url: cover
  });

  if (error) throw error;
  revalidatePath("/lookbooks");
}

export async function toggleLookbook(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const next = String(formData.get("next") ?? "false") === "true";

  const { error } = await supabase
    .from("lookbooks")
    .update({
      is_published: next,
      published_at: next ? new Date().toISOString() : null
    })
    .eq("id", id);

  if (error) throw error;
  revalidatePath("/lookbooks");
}

export async function createDiscount(formData: FormData) {
  const { supabase } = await requireAdmin();
  const code = String(formData.get("code") ?? "").trim().toUpperCase();
  const type = String(formData.get("type") ?? "percentage");
  const value = Number(formData.get("value") ?? 0);
  const minimumOrder = Number(formData.get("minimum_order") ?? 0);
  const usageLimitRaw = String(formData.get("usage_limit") ?? "").trim();

  if (!code || !Number.isFinite(value) || value <= 0) {
    throw new Error("Invalid discount.");
  }

  const { error } = await supabase.from("discounts").insert({
    code,
    type: type === "fixed" ? "fixed" : "percentage",
    value,
    minimum_order: Math.max(0, minimumOrder),
    usage_limit: usageLimitRaw ? Number(usageLimitRaw) : null
  });

  if (error) throw error;
  revalidatePath("/discounts");
}

export async function toggleDiscount(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const next = String(formData.get("next") ?? "false") === "true";

  const { error } = await supabase
    .from("discounts")
    .update({ is_active: next })
    .eq("id", id);

  if (error) throw error;
  revalidatePath("/discounts");
}
