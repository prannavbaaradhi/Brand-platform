import { requireAdmin } from "../../../lib/auth";
import { saveHomepageContent } from "../../../actions/content";

export default async function ContentPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", "homepage")
    .maybeSingle();

  const value = (data?.value && typeof data.value === "object" && !Array.isArray(data.value))
    ? data.value
    : {};

  const read = (key: string) => {
    const candidate = value && key in value ? value[key] : "";
    return typeof candidate === "string" ? candidate : "";
  };

  return (
    <>
      <header>
        <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">Storefront CMS</p>
        <h1 className="mt-2 text-3xl font-medium tracking-[-0.04em]">Site content</h1>
      </header>
      <form action={saveHomepageContent} className="mt-8 grid max-w-2xl gap-5">
        <label className="text-xs uppercase tracking-[0.14em] text-black/55">
          Announcement
          <input name="announcement" defaultValue={read("announcement")} className="mt-2 w-full border border-black/15 bg-white/30 px-4 py-3 text-sm normal-case tracking-normal" />
        </label>
        <label className="text-xs uppercase tracking-[0.14em] text-black/55">
          Hero eyebrow
          <input name="hero_eyebrow" defaultValue={read("heroEyebrow")} className="mt-2 w-full border border-black/15 bg-white/30 px-4 py-3 text-sm normal-case tracking-normal" />
        </label>
        <label className="text-xs uppercase tracking-[0.14em] text-black/55">
          Hero title
          <input name="hero_title" defaultValue={read("heroTitle")} className="mt-2 w-full border border-black/15 bg-white/30 px-4 py-3 text-sm normal-case tracking-normal" />
        </label>
        <label className="text-xs uppercase tracking-[0.14em] text-black/55">
          Hero CTA
          <input name="hero_cta" defaultValue={read("heroCta")} className="mt-2 w-full border border-black/15 bg-white/30 px-4 py-3 text-sm normal-case tracking-normal" />
        </label>
        <button className="w-fit bg-[var(--charcoal)] px-5 py-3 text-xs uppercase tracking-[0.16em] text-[var(--off-white)]">
          Save content
        </button>
      </form>
    </>
  );
}
