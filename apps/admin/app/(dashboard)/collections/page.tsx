import type { Tables } from "@brand/database/types";
import { createCollection, toggleCollection } from "../../../actions/merchandising";
import { requireAdmin } from "../../../lib/auth";

export default async function CollectionsPage() {
  const { supabase } = await requireAdmin();
  const { data: collections, error } = await supabase
    .from("collections")
    .select("id, name, slug, description, is_published")
    .order("sort_order");

  if (error) throw error;

  return (
    <>
      <header>
        <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">Merchandising</p>
        <h1 className="mt-2 text-3xl font-medium tracking-[-0.04em]">Collections</h1>
      </header>
      <form action={createCollection} className="mt-8 grid max-w-2xl gap-3 border border-black/10 p-5">
        <input name="name" required placeholder="Collection name" className="border border-black/15 bg-transparent px-3 py-2 text-sm" />
        <input name="slug" placeholder="Slug (optional)" className="border border-black/15 bg-transparent px-3 py-2 text-sm" />
        <textarea name="description" rows={3} placeholder="Description" className="border border-black/15 bg-transparent px-3 py-2 text-sm" />
        <button className="w-fit bg-[var(--charcoal)] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[var(--off-white)]">Create</button>
      </form>
      <div className="mt-6 grid gap-3">
        {collections.map((collection: Tables<"collections">) => (
          <article key={collection.id} className="flex items-center justify-between gap-4 border border-black/10 p-5">
            <div>
              <p className="font-medium">{collection.name}</p>
              <p className="mt-1 text-xs text-black/45">/{collection.slug}</p>
            </div>
            <form action={toggleCollection}>
              <input type="hidden" name="id" value={collection.id} />
              <input type="hidden" name="next" value={String(!collection.is_published)} />
              <button className="text-xs underline underline-offset-4">
                {collection.is_published ? "Unpublish" : "Publish"}
              </button>
            </form>
          </article>
        ))}
      </div>
    </>
  );
}
