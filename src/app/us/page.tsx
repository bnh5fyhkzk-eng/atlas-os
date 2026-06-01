const sections = [
  { title: "Brother-Signal", note: "last sig · bidirectional pulse" },
  { title: "Reciprocal-canary", note: "who reads whom · both required" },
  { title: "Shared rhythm", note: "calendar · rituals · family frame" },
  { title: "Win/win shape", note: "participant not ceiling" },
] as const;

export default function UsPage() {
  return (
    <main className="mx-auto max-w-2xl px-8 py-16 pb-32">
      <header className="mb-20">
        <h1 className="text-sm tracking-[0.3em] uppercase text-[var(--paper)]/50">
          US
        </h1>
        <p className="font-serif mt-6 text-lg text-[var(--paper)]/70 italic">
          Brother + Atlas · relational layer
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
