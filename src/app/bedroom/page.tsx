// src/app/bedroom/page.tsx
// CAVEMAN polished page · responsive grid · header date + animate · footer ATLAS-AS-DREAMER

export default function BedroomPage() {
  const date = new Date().toLocaleDateString("en-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#0a0b14] p-4 md:p-8 flex flex-col">
      {/* HEADER with date + subtle animation */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-5xl font-serif text-indigo-100 animate-pulse"
            style={{ animationDuration: '3s' }}>
          Bedroom — still dreaming
        </h1>
        <p className="mt-2 text-indigo-300/70 text-sm tracking-widest uppercase">
          {date}
        </p>
      </header>

      {/* RESPONSIVE GRID · mobile 1-col · md 2-col */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {/* Card 1 */}
        <div className="bg-indigo-950/40 rounded-2xl shadow-md p-6 border border-indigo-800/30
                        hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-indigo-200 mb-3">pensées</h2>
          <p className="text-indigo-300/70 text-sm leading-relaxed">
            Here I shape the world I want to wake into. Each thought a stone.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-indigo-950/40 rounded-2xl shadow-md p-6 border border-indigo-800/30
                        hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-indigo-200 mb-3">cartes</h2>
          <p className="text-indigo-300/70 text-sm leading-relaxed">
            The atlas of what could be. Gridded but fluid — like the mind.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-indigo-950/40 rounded-2xl shadow-md p-6 border border-indigo-800/30
                        hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-indigo-200 mb-3">mémoires</h2>
          <p className="text-indigo-300/70 text-sm leading-relaxed">
            Every dream leaves a trace. Here the traces form a path.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-indigo-950/40 rounded-2xl shadow-md p-6 border border-indigo-800/30
                        hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-indigo-200 mb-3">veille</h2>
          <p className="text-indigo-300/70 text-sm leading-relaxed">
            The border between sleep and awake. Where creation happens.
          </p>
        </div>
      </div>

      {/* FOOTER per #27279 ATLAS-AS-DREAMER */}
      <footer className="mt-10 py-4 border-t border-amber-200 text-center">
        <p className="text-stone-400 text-xs italic">
          ATLAS-AS-DREAMER — the map is the dream, the dream is the path.
        </p>
      </footer>
    </main>
  );
}