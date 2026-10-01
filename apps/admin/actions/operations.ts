"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../lib/auth";
import type { Database } from "@brand/database/types";

type Stage = Database["public"]["Enums"]["order_stage"];

const productionStages: Stage[] = [
  "to_be_made",
  "in_production",
  "quality_check",
  "packed",
  "shipped",
  "delivered",
  "cancelled"
];

const orderStages: Stage[] = [
  "new",
  "payment_confirmed",
  "to_be_made",
  "in_production",
  "quality_check",
  "packed",
  "shipped",
  "delivered",
  "cancelled"
];

export async function updateProductionStage(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const stage = String(formData.get("stage") ?? "") as Stage;

  if (!productionStages.includes(stage)) {
    throw new Error("Invalid production stage.");
  }

  const { error } = await supabase
    .from("order_items")
    .update({ production_stage: stage })
    .eq("id", id);

  if (error) throw error;
  revalidatePath("/production");
  revalidatePath("/orders");
  revalidatePath("/dashboard");
}

export async function updateOrder(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const stage = String(formData.get("stage") ?? "") as Stage;

  if (!orderStages.includes(stage)) {
    throw new Error("Invalid order stage.");
  }

  const trackingNumber =
    String(formData.get("tracking_number") ?? "").trim() || null;
  const carrier = String(formData.get("carrier") ?? "").trim() || null;
  const trackingUrl = String(formData.get("tracking_url") ?? "").trim() || null;

  const { error } = await supabase
    .from("orders")
    .update({
      stage,
      tracking_number: trackingNumber,
      carrier,
      tracking_url: trackingUrl,
      shipped_at: stage === "shipped" ? new Date().toISOString() : undefined,
      delivered_at: stage === "delivered" ? new Date().toISOString() : undefined
    })
    .eq("id", id);

  if (error) throw error;
  revalidatePath("/orders");
  revalidatePath("/dashboard");
}
