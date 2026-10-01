"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../lib/auth";
import { slugify } from "../lib/slug";

function csv(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function createProduct(formData: FormData) {
  const { supabase } = await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? name));
  const description = String(formData.get("description") ?? "").trim() || null;
  const subtitle = String(formData.get("subtitle") ?? "").trim() || null;
  const basePrice = Number(formData.get("base_price") ?? 0);
  const leadDays = Number(formData.get("production_lead_days") ?? 7);
  const status = String(formData.get("status") ?? "draft") === "active" ? "active" : "draft";

  if (!name || !slug || !Number.isFinite(basePrice) || basePrice < 0) {
    throw new Error("Invalid product details.");
  }

  const { data: product, error: productError } = await supabase
    .from("products")
    .insert({
      name,
      slug,
      subtitle,
      description,
      base_price: basePrice,
      production_lead_days: Math.max(0, leadDays),
      status,
      published_at: status === "active" ? new Date().toISOString() : null
    })
    .select("id, slug")
    .single();

  if (productError) throw productError;

  const sizes = csv(formData.get("sizes"));
  const colors = csv(formData.get("colors"));
  const sizeValues: Array<string | null> = sizes.length ? sizes : [null];
  const colorValues: Array<string | null> = colors.length ? colors : [null];

  const variants = sizeValues.flatMap((size, sizeIndex) =>
    colorValues.map((color, colorIndex) => ({
      product_id: product.id,
      size,
      color,
      sku: [slug, size, color]
        .filter(Boolean)
        .join("-")
        .toUpperCase()
        .replace(/[^A-Z0-9-]/g, ""),
      sort_order: sizeIndex * colorValues.length + colorIndex
    }))
  );

  const { error: variantError } = await supabase
    .from("product_variants")
    .insert(variants);

  if (variantError) {
    await supabase.from("products").delete().eq("id", product.id);
    throw variantError;
  }

  const image = formData.get("image");
  if (image instanceof File && image.size > 0) {
    const ext = image.name.split(".").pop()?.toLowerCase() || "bin";
    const storagePath = `products/${product.id}/${randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("catalog")
      .upload(storagePath, image, {
        cacheControl: "3600",
        upsert: false,
        contentType: image.type || undefined
      });

    if (uploadError) throw uploadError;

    const { data: publicUrl } = supabase.storage
      .from("catalog")
      .getPublicUrl(storagePath);

    const { error: imageError } = await supabase.from("product_images").insert({
      product_id: product.id,
      image_url: publicUrl.publicUrl,
      alt_text: name,
      position: 0
    });

    if (imageError) throw imageError;
  }

  revalidatePath("/products");
  redirect("/products");
}

export async function updateProductStatus(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const requested = String(formData.get("status") ?? "draft");
  const status =
    requested === "active" || requested === "archived" ? requested : "draft";

  const { error } = await supabase
    .from("products")
    .update({
      status,
      available_for_order: status !== "archived",
      published_at: status === "active" ? new Date().toISOString() : null
    })
    .eq("id", id);

  if (error) throw error;
  revalidatePath("/products");
  revalidatePath("/dashboard");
}
