import Link from "next/link";
import type { Tables } from "@brand/database/types";
import { requireAdmin } from "../../../lib/auth";
import { updateProductStatus } from "../../../actions/products";

type ProductListRow = Pick<
  Tables<"products">,
  "id" | "name" | "slug" | "base_price" | "currency" | "status" | "production_lead_days"
> & {
  product_variants: Array<{ id: string }>;
};

export default async function ProductsPage() {
  const { supabase } = await requireAdmin();
  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, slug, base_price, currency, status, production_lead_days, product_variants(id)")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (
    <>
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">Catalog</p>
          <h1 className="mt-2 text-3xl font-medium tracking-[-0.04em]">Products</h1>
        </div>
        <Link href="/products/new" className="bg-[var(--charcoal)] px-4 py-3 text-xs uppercase tracking-[0.16em] text-[var(--off-white)]">
          New product
        </Link>
      </header>

      <div className="mt-8 overflow-x-auto border border-black/10">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-black/10 text-[10px] uppercase tracking-[0.14em] text-black/45">
            <tr>
              <th className="p-4 font-normal">Product</th><th className="p-4 font-normal">Price</th><th className="p-4 font-normal">Variants</th><th className="p-4 font-normal">Lead time</th><th className="p-4 font-normal">Status</th><th className="p-4 font-normal">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: ProductListRow) => (
              <tr key={product.id} className="border-b border-black/[0.06] last:border-0">
                <td className="p-4"><p className="font-medium">{product.name}</p><p className="mt-1 text-xs text-black/45">/{product.slug}</p></td>
                <td className="p-4">₹{Number(product.base_price).toLocaleString("en-IN")}</td>
                <td className="p-4">{product.product_variants.length}</td>
                <td className="p-4">{product.production_lead_days} days</td>
                <td className="p-4 capitalize">{product.status}</td>
                <td className="p-4">
                  <form action={updateProductStatus}>
                    <input type="hidden" name="id" value={product.id} />
                    <input type="hidden" name="status" value={product.status === "active" ? "draft" : "active"} />
                    <button className="text-xs underline underline-offset-4">{product.status === "active" ? "Unpublish" : "Publish"}</button>
                  </form>
                </td>
              </tr>
            ))}
            {!products.length && <tr><td className="p-6 text-black/45" colSpan={6}>No products yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
