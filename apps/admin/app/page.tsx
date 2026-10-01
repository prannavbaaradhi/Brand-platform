const cards = [
  ["Products", "Create and publish made-to-order pieces"],
  ["Orders", "Review paid orders and customer details"],
  ["Production", "Move pieces through the production queue"],
  ["Lookbooks", "Manage editorial content and campaigns"]
];

export default function AdminHomePage() {
  return (
    <main className="min-h-screen bg-[var(--off-white)] p-6 text-[var(--charcoal)] md:p-10">
      <header className="mb-14 flex items-center justify-between border-b border-black/10 pb-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-black/50">
            Internal
          </p>
          <h1 className="mt-1 text-2xl font-medium tracking-[-0.03em]">
            Brand Platform
          </h1>
        </div>
        <span className="rounded-full bg-[var(--warm-grey)] px-3 py-1 text-xs">
          Foundation
        </span>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {cards.map(([title, description]) => (
          <article
            key={title}
            className="min-h-44 border border-black/10 bg-white/30 p-6 transition-transform hover:-translate-y-0.5"
          >
            <h2 className="text-lg font-medium">{title}</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-black/55">
              {description}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
