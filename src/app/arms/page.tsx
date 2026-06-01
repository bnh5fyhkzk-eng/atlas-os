const sections = [
  { title: "Main-brain", note: "Mac mini · sovereign core" },
  { title: "Pascal-arm", note: "client slice · share-link ready" },
  { title: "Charle-arm", note: "client slice · share-link ready" },
  { title: "Curiosity-arm", note: "research · reach · wonder" },
  { title: "Hermes-cloud", note: "cloud compose · agentic reach" },
] as const;

export default function ArmsPage() {
  return (
    <main className="mx-auto max-w-2xl px-8 py-16 pb-32">
      <header className="mb-20">
        <h1 className="text-sm tracking-[0.3em] uppercase text-[var(--paper)]/50">
          ARMS
        </h1>
        <p className="font-serif mt-6 text-lg text-[var(--paper)]/70 italic">
          Distributed body · octopus-spatial
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
