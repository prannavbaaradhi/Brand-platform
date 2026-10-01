import { requireAdmin } from "../../../lib/auth";

export default async function DashboardPage() {
  const { supabase } = await requireAdmin();

  const [products, orders, queue, customers] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase
      .from("order_items")
      .select("*", { count: "exact", head: true })
      .in("production_stage", ["to_be_made", "in_production", "quality_check", "packed"]),
    supabase.from("customers").select("*", { count: "exact", head: true })
  ]);

  const cards = [
    ["Products", products.count ?? 0],
    ["Orders", orders.count ?? 0],
    ["In production", queue.count ?? 0],
    ["Customers", customers.count ?? 0]
  ];

  return (
    <>
      <header>
        <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">
          Overview
        </p>
        <h1 className="mt-2 text-3xl font-medium tracking-[-0.04em]">
          Dashboard
        </h1>
      </header>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value]) => (
          <article key={label} className="border border-black/10 bg-white/30 p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-black/45">
              {label}
            </p>
            <p className="mt-6 text-4xl tracking-[-0.05em]">{value}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 border border-black/10 p-6">
        <p className="text-sm leading-6 text-black/60">
          This store is configured for made-to-order production. New paid pieces
          will enter the production queue instead of reducing inventory.
        </p>
      </section>
    </>
  );
}
