import type { Json } from "@brand/database/types";
import { getServerDb } from "../supabase";

export type PaidOrderItem = {
  variant_id: string;
  quantity: number;
};

export type ConfirmPaidOrderInput = {
  email: string;
  phone?: string | null;
  fullName?: string | null;
  shippingAddress: Json;
  billingAddress?: Json | null;
  items: PaidOrderItem[];
  paymentProvider: string;
  paymentReference: string;
  discountCode?: string | null;
  shippingTotal?: number;
};

export async function confirmPaidOrder(input: ConfirmPaidOrderInput) {
  const db = getServerDb();

  const { data, error } = await db.rpc("create_paid_order", {
    p_email: input.email,
    p_phone: input.phone ?? "",
    p_full_name: input.fullName ?? "",
    p_shipping_address: input.shippingAddress,
    p_billing_address: input.billingAddress ?? null,
    p_items: input.items as unknown as Json,
    p_payment_provider: input.paymentProvider,
    p_payment_reference: input.paymentReference,
    p_discount_code: input.discountCode ?? null,
    p_shipping_total: input.shippingTotal ?? 0
  });

  if (error) throw error;
  return data;
}
