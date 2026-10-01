import type { Tables } from "@brand/database/types";
import { requireAdmin } from "../../../lib/auth";
import { updateProductionStage } from "../../../actions/operations";

type ProductionRow = Pick<
  Tables<"order_items">,
  "id" | "product_name" | "variant_label" | "size" | "color" | "quantity" | "production_stage"
> & {
  orders: { order_number: number; customer_email: string } | null;
};

const stages = ["to_be_made","in_production","quality_check","packed","shipped","delivered","cancelled"];

export default async function ProductionPage() {
  const { supabase } = await requireAdmin();
  const { data: items, error } = await supabase
    .from("order_items")
    .select("id, product_name, variant_label, size, color, quantity, production_stage, orders(order_number, customer_email)")
    .in("production_stage", ["to_be_made","in_production","quality_check","packed"])
    .order("created_at", { ascending: true });

  if (error) throw error;

  return (
    <>
      <header>
        <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">Made to order</p>
        <h1 className="mt-2 text-3xl font-medium tracking-[-0.04em]">Production queue</h1>
      </header>
      <div className="mt-8 grid gap-3">
        {items.map((item: ProductionRow) => (
          <article key={item.id} className="grid gap-4 border border-black/10 p-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-medium">{item.product_name}</p>
              <p className="mt-1 text-sm text-black/50">{item.size ?? "—"} · {item.color ?? "—"} · Qty {item.quantity}</p>
              <p className="mt-1 text-xs text-black/40">Order #{item.orders?.order_number ?? "—"} · {item.orders?.customer_email ?? ""}</p>
            </div>
            <form action={updateProductionStage} className="flex gap-2">
              <input type="hidden" name="id" value={item.id} />
              <select name="stage" defaultValue={item.production_stage} className="border border-black/15 bg-transparent px-3 py-2 text-sm">
                {stages.map((stage) => <option key={stage} value={stage}>{stage.replaceAll("_", " ")}</option>)}
              </select>
              <button className="bg-[var(--charcoal)] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[var(--off-white)]">Update</button>
            </form>
          </article>
        ))}
        {!items.length && <p className="border border-black/10 p-6 text-sm text-black/45">Production queue is clear.</p>}
      </div>
    </>
  );
}
