import { requireAdmin } from "../../../lib/auth";
import { updateOrder } from "../../../actions/operations";

const stages = ["new","payment_confirmed","to_be_made","in_production","quality_check","packed","shipped","delivered","cancelled"];

export default async function OrdersPage() {
  const { supabase } = await requireAdmin();
  const { data: orders, error } = await supabase
    .from("orders")
    .select("id, order_number, customer_email, total, currency, payment_status, stage, tracking_number, carrier, tracking_url, created_at, order_items(id)")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (
    <>
      <header>
        <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">Operations</p>
        <h1 className="mt-2 text-3xl font-medium tracking-[-0.04em]">Orders</h1>
      </header>
      <div className="mt-8 grid gap-4">
        {orders.map((order) => (
          <article key={order.id} className="border border-black/10 bg-white/25 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-medium">Order #{order.order_number}</p>
                <p className="mt-1 text-sm text-black/50">{order.customer_email}</p>
                <p className="mt-1 text-xs text-black/40">{order.order_items.length} piece(s) · {order.payment_status}</p>
              </div>
              <p className="text-lg">₹{Number(order.total).toLocaleString("en-IN")}</p>
            </div>
            <form action={updateOrder} className="mt-5 grid gap-3 md:grid-cols-5">
              <input type="hidden" name="id" value={order.id} />
              <select name="stage" defaultValue={order.stage} className="border border-black/15 bg-transparent px-3 py-2 text-sm">
                {stages.map((stage) => <option key={stage} value={stage}>{stage.replaceAll("_", " ")}</option>)}
              </select>
              <input name="carrier" defaultValue={order.carrier ?? ""} placeholder="Carrier" className="border border-black/15 bg-transparent px-3 py-2 text-sm" />
              <input name="tracking_number" defaultValue={order.tracking_number ?? ""} placeholder="Tracking number" className="border border-black/15 bg-transparent px-3 py-2 text-sm" />
              <input name="tracking_url" defaultValue={order.tracking_url ?? ""} placeholder="Tracking URL" className="border border-black/15 bg-transparent px-3 py-2 text-sm" />
              <button className="bg-[var(--charcoal)] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[var(--off-white)]">Save</button>
            </form>
          </article>
        ))}
        {!orders.length && <p className="border border-black/10 p-6 text-sm text-black/45">No orders yet.</p>}
      </div>
    </>
  );
}
