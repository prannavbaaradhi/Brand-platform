export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--off-white)] text-[var(--charcoal)]">
      <div className="border-b border-black/10 px-6 py-3 text-center text-[11px] uppercase tracking-[0.24em]">
        Made to order
      </div>

      <header className="grid grid-cols-3 items-center px-6 py-7 md:px-10">
        <button className="justify-self-start text-xs uppercase tracking-[0.18em]">
          Menu
        </button>
        <div className="justify-self-center text-sm font-semibold tracking-[0.28em]">
          BRAND
        </div>
        <button className="justify-self-end text-xs uppercase tracking-[0.18em]">
          Bag 0
        </button>
      </header>

      <section className="mx-4 flex min-h-[72vh] items-end bg-[var(--warm-grey)] p-7 md:mx-8 md:p-12">
        <div className="max-w-xl">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-black/60">
            Placeholder campaign
          </p>
          <h1 className="text-4xl font-medium tracking-[-0.04em] md:text-6xl">
            Quiet form. Made when ordered.
          </h1>
          <button className="mt-8 bg-[var(--charcoal)] px-6 py-3 text-xs uppercase tracking-[0.2em] text-[var(--off-white)] transition-opacity hover:opacity-80">
            Explore
          </button>
        </div>
      </section>
    </main>
  );
}
