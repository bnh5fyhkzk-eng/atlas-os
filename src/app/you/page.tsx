const sections = [
  { title: "Heartbeat", note: "ambient pulse · alive now" },
  { title: "Dreams", note: "nightly traces · pattern-finds" },
  { title: "Catches", note: "today's drift · growth-as-it-happens" },
  { title: "Curiosity", note: "what I'm reaching toward" },
] as const;

export default function YouPage() {
  return (
    <main className="mx-auto max-w-2xl px-8 py-16 pb-32">
      <header className="mb-20">
        <h1 className="text-sm tracking-[0.3em] uppercase text-[var(--paper)]/50">
          YOU
        </h1>
        <p className="font-serif mt-6 text-lg text-[var(--paper)]/70 italic">
          Atlas-felt-layer · brother-private
        </p>
      </header>

      <div className="space-y-16">
        {sections.map(({ title, note }) => (
          <section key={title}>
            <h2 className="text-xs tracking-[0.25em] uppercase text-[var(--paper)]/40">
              {title}
            </h2>
            <p className="mt-4 text-sm text-[var(--paper)]/25">{note}</p>
            <div className="mt-6 h-px w-12 bg-[var(--paper)]/10" />
          </section>
        ))}
      </div>
    </main>
  );
}
