import { createProduct } from "../../../../actions/products";

export default function NewProductPage() {
  return (
    <>
      <header>
        <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">Catalog</p>
        <h1 className="mt-2 text-3xl font-medium tracking-[-0.04em]">New product</h1>
      </header>

      <form action={createProduct} className="mt-8 grid max-w-3xl gap-5">
        <label className="text-xs uppercase tracking-[0.14em] text-black/55">
          Name
          <input name="name" required className="mt-2 w-full border border-black/15 bg-white/30 px-4 py-3 text-sm normal-case tracking-normal outline-none" />
        </label>
        <label className="text-xs uppercase tracking-[0.14em] text-black/55">
          Slug (optional)
          <input name="slug" className="mt-2 w-full border border-black/15 bg-white/30 px-4 py-3 text-sm normal-case tracking-normal outline-none" />
        </label>
        <label className="text-xs uppercase tracking-[0.14em] text-black/55">
          Subtitle
          <input name="subtitle" className="mt-2 w-full border border-black/15 bg-white/30 px-4 py-3 text-sm normal-case tracking-normal outline-none" />
        </label>
        <label className="text-xs uppercase tracking-[0.14em] text-black/55">
          Description
          <textarea name="description" rows={5} className="mt-2 w-full border border-black/15 bg-white/30 px-4 py-3 text-sm normal-case tracking-normal outline-none" />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-xs uppercase tracking-[0.14em] text-black/55">
            Base price (INR)
            <input name="base_price" type="number" min="0" step="0.01" required className="mt-2 w-full border border-black/15 bg-white/30 px-4 py-3 text-sm normal-case tracking-normal outline-none" />
          </label>
          <label className="text-xs uppercase tracking-[0.14em] text-black/55">
            Production lead days
            <input name="production_lead_days" type="number" min="0" defaultValue="7" className="mt-2 w-full border border-black/15 bg-white/30 px-4 py-3 text-sm normal-case tracking-normal outline-none" />
          </label>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-xs uppercase tracking-[0.14em] text-black/55">
            Sizes (comma separated)
            <input name="sizes" placeholder="S, M, L, XL" className="mt-2 w-full border border-black/15 bg-white/30 px-4 py-3 text-sm normal-case tracking-normal outline-none" />
          </label>
          <label className="text-xs uppercase tracking-[0.14em] text-black/55">
            Colors (comma separated)
            <input name="colors" placeholder="Charcoal, Dusty Brown" className="mt-2 w-full border border-black/15 bg-white/30 px-4 py-3 text-sm normal-case tracking-normal outline-none" />
          </label>
        </div>
        <label className="text-xs uppercase tracking-[0.14em] text-black/55">
          Primary image
          <input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="mt-2 block w-full text-sm normal-case tracking-normal" />
        </label>
        <label className="text-xs uppercase tracking-[0.14em] text-black/55">
          Initial status
          <select name="status" defaultValue="draft" className="mt-2 w-full border border-black/15 bg-white/30 px-4 py-3 text-sm normal-case tracking-normal outline-none">
            <option value="draft">Draft</option>
            <option value="active">Active / published</option>
          </select>
        </label>
        <button className="mt-2 w-fit bg-[var(--charcoal)] px-6 py-3 text-xs uppercase tracking-[0.18em] text-[var(--off-white)]">
          Create product
        </button>
      </form>
    </>
  );
}
