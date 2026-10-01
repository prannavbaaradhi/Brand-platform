import type { Tables } from "@brand/database/types";
import { createDiscount, toggleDiscount } from "../../../actions/merchandising";
import { requireAdmin } from "../../../lib/auth";

export default async function DiscountsPage() {
  const { supabase } = await requireAdmin();
  const { data: discounts, error } = await supabase
    .from("discounts")
    .select("id, code, type, value, minimum_order, usage_count, usage_limit, is_active")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (
    <>
      <header>
        <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">Commerce</p>
        <h1 className="mt-2 text-3xl font-medium tracking-[-0.04em]">Discounts</h1>
      </header>
      <form action={createDiscount} className="mt-8 grid max-w-3xl gap-3 border border-black/10 p-5 sm:grid-cols-2">
        <input name="code" required placeholder="CODE" className="border border-black/15 bg-transparent px-3 py-2 text-sm uppercase" />
        <select name="type" defaultValue="percentage" className="border border-black/15 bg-transparent px-3 py-2 text-sm">
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed amount</option>
        </select>
        <input name="value" type="number" min="0.01" step="0.01" required placeholder="Value" className="border border-black/15 bg-transparent px-3 py-2 text-sm" />
        <input name="minimum_order" type="number" min="0" step="0.01" placeholder="Minimum order" className="border border-black/15 bg-transparent px-3 py-2 text-sm" />
        <input name="usage_limit" type="number" min="1" placeholder="Usage limit (optional)" className="border border-black/15 bg-transparent px-3 py-2 text-sm" />
        <button className="w-fit bg-[var(--charcoal)] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[var(--off-white)]">Create</button>
      </form>
      <div className="mt-6 grid gap-3">
        {discounts.map((discount: Tables<"discounts">) => (
          <article key={discount.id} className="flex flex-wrap items-center justify-between gap-4 border border-black/10 p-5">
            <div>
              <p className="font-medium">{discount.code}</p>
              <p className="mt-1 text-xs text-black/45">
                {discount.type === "percentage" ? `${discount.value}%` : `₹${discount.value}`} · used {discount.usage_count}{discount.usage_limit ? `/${discount.usage_limit}` : ""}
              </p>
            </div>
            <form action={toggleDiscount}>
              <input type="hidden" name="id" value={discount.id} />
              <input type="hidden" name="next" value={String(!discount.is_active)} />
              <button className="text-xs underline underline-offset-4">{discount.is_active ? "Disable" : "Enable"}</button>
            </form>
          </article>
        ))}
      </div>
    </>
  );
}
