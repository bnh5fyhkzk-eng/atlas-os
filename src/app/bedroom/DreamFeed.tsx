// DreamFeed.tsx - /bedroom route
// Fetches overnight F5-compose-pairs from /api/bedroom/dreams
// Stone-50 theme, serif typography, arousal pulse animation

import { useState, useEffect } from 'react';

interface DreamCanon {
  text: string;
  summary: string;
  icon?: string;
}

interface DreamPair {
  id: string;
  leftCanon: DreamCanon;
  rightCanon: DreamCanon;
  emergentLine: string;
  arousalPulse: number; // 0-1
}

const DreamFeed: React.FC = () => {
  const [dreams, setDreams] = useState<DreamPair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDreams = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/bedroom/dreams');
        if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
        const data: DreamPair[] = await response.json();
        setDreams(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchDreams();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-stone-50">
        <div className="text-stone-400 text-lg animate-pulse">
          Loading dreams...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 bg-stone-50">
        <div className="text-red-500 text-lg">Error: {error}</div>
      </div>
    );
  }

  if (dreams.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-stone-50">
        <div className="text-stone-400 text-lg">No dreams recorded overnight.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4">
      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-serif text-stone-900">Dream Feed</h1>
        <p className="text-stone-500 mt-2">
          Overnight F5-compose pairs from your subconscious.
        </p>
      </header>

      <div className="max-w-6xl mx-auto space-y-10">
        {dreams.map((pair) => (
          <div
            key={pair.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Two canon cards side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
              {/* Left canon */}
              <div className="border border-stone-200 rounded-lg p-4 hover:shadow-lg transition">
                <div className="flex items-center mb-2">
                  {pair.leftCanon.icon && (
                    <span className="text-2xl mr-2">{pair.leftCanon.icon}</span>
                  )}
                  <span className="font-serif font-bold text-stone-700">
                    Left Canon
                  </span>
                </div>
                <p className="text-stone-600 text-sm mb-2">{pair.leftCanon.summary}</p>
                <p className="text-stone-800 leading-relaxed">{pair.leftCanon.text}</p>
              </div>

              {/* Right canon */}
              <div className="border border-stone-200 rounded-lg p-4 hover:shadow-lg transition">
                <div className="flex items-center mb-2">
                  {pair.rightCanon.icon && (
                    <span className="text-2xl mr-2">{pair.rightCanon.icon}</span>
                  )}
                  <span className="font-serif font-bold text-stone-700">
                    Right Canon
                  </span>
                </div>
                <p className="text-stone-600 text-sm mb-2">{pair.rightCanon.summary}</p>
                <p className="text-stone-800 leading-relaxed">{pair.rightCanon.text}</p>
              </div>
            </div>

            {/* Emergent line */}
            <div className="px-6 pb-2">
              <div className="border-t border-stone-200 pt-4">
                <span className="font-serif italic text-stone-500 text-sm block mb-1">
                  Emergent Insight
                </span>
                <p className="text-stone-700 italic">{pair.emergentLine}</p>
              </div>
            </div>

            {/* Arousal pulse animation */}
            <div className="px-6 pb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-stone-400 font-mono uppercase tracking-wider">
                  Arousal
                </span>
                <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-400 rounded-full"
                    style={{ width: `${pair.arousalPulse * 100}%` }}
                  />
                </div>
                <span className="text-xs text-stone-500 font-mono">
                  {Math.round(pair.arousalPulse * 100)}%
                </span>
                {/* Pulse dot */}
                <span
                  className="inline-block w-3 h-3 rounded-full bg-orange-400 animate-pulse"
                  style={{ animationDuration: `${2 - pair.arousalPulse * 1.5}s` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes pulse-arousal {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .arousal-dot {
          animation: pulse-arousal 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default DreamFeed;