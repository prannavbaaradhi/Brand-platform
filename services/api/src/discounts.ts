import type { FastifyInstance } from "fastify";
import { getServerDb } from "./supabase";

export async function registerDiscountRoutes(app: FastifyInstance) {
  app.post("/discounts/validate", async (request, reply) => {
    const body = request.body as { code?: string; subtotal?: number };

    const code = String(body?.code ?? "").trim();
    const subtotal = Number(body?.subtotal ?? 0);

    if (!code || !Number.isFinite(subtotal) || subtotal < 0) {
      return reply.code(400).send({ error: "Invalid discount request" });
    }

    const db = getServerDb();
    const { data, error } = await db.rpc("validate_discount", {
      p_code: code,
      p_subtotal: subtotal
    });

    if (error) throw error;

    const result = data?.[0];
    return {
      valid: Boolean(result?.valid),
      code: result?.normalized_code ?? code.toUpperCase(),
      amount: Number(result?.discount_amount ?? 0),
      message: result?.message ?? "Invalid code"
    };
  });
}
