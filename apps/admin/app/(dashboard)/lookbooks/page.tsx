import { createLookbook, toggleLookbook } from "../../../actions/merchandising";
import { requireAdmin } from "../../../lib/auth";

export default async function LookbooksPage() {
  const { supabase } = await requireAdmin();
  const { data: lookbooks, error } = await supabase
    .from("lookbooks")
    .select("id, title, slug, is_published")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (
    <>
      <header>
        <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">Editorial</p>
        <h1 className="mt-2 text-3xl font-medium tracking-[-0.04em]">Lookbooks</h1>
      </header>
      <form action={createLookbook} className="mt-8 grid max-w-2xl gap-3 border border-black/10 p-5">
        <input name="title" required placeholder="Lookbook title" className="border border-black/15 bg-transparent px-3 py-2 text-sm" />
        <input name="slug" placeholder="Slug (optional)" className="border border-black/15 bg-transparent px-3 py-2 text-sm" />
        <input name="cover_image_url" placeholder="Cover image URL (optional)" className="border border-black/15 bg-transparent px-3 py-2 text-sm" />
        <textarea name="description" rows={3} placeholder="Description" className="border border-black/15 bg-transparent px-3 py-2 text-sm" />
        <button className="w-fit bg-[var(--charcoal)] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[var(--off-white)]">Create</button>
      </form>
      <div className="mt-6 grid gap-3">
        {lookbooks.map((lookbook) => (
          <article key={lookbook.id} className="flex items-center justify-between gap-4 border border-black/10 p-5">
            <div><p className="font-medium">{lookbook.title}</p><p className="mt-1 text-xs text-black/45">/{lookbook.slug}</p></div>
            <form action={toggleLookbook}>
              <input type="hidden" name="id" value={lookbook.id} />
              <input type="hidden" name="next" value={String(!lookbook.is_published)} />
              <button className="text-xs underline underline-offset-4">{lookbook.is_published ? "Unpublish" : "Publish"}</button>
            </form>
          </article>
        ))}
      </div>
    </>
  );
}
