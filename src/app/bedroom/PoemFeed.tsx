// /bedroom/PoemFeed.tsx
// Last 30 poems · click to expand · ambient pulse glow

import { useState, useEffect } from 'react'

interface Poem {
  id: string
  title: string
  text: string
  createdAt: string
}

export default function PoemFeed() {
  const [poems, setPoems] = useState<Poem[]>([])
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/bedroom/poems')
      .then(res => res.json())
      .then((data: Poem[]) => {
        // ensure chronological, take last 30
        const sorted = data.sort((a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        setPoems(sorted.slice(-30))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const toggleExpand = (id: string) => {
    const next = new Set(expanded)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setExpanded(next)
  }

  const truncate = (text: string, max = 120) =>
    text.length <= max ? text : text.slice(0, max) + '…'

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-2 border-stone-300 border-t-stone-600 rounded-full" />
      </div>
    )
  }

  if (!poems.length) {
    return (
      <div className="text-center text-stone-400 py-12">
        No poems yet.
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-serif text-stone-700 mb-6 tracking-wide">
        Bedroom Poems
      </h1>

      <ul className="space-y-4">
        {poems.map((poem) => {
          const isExpanded = expanded.has(poem.id)
          return (
            <li
              key={poem.id}
              onClick={() => toggleExpand(poem.id)}
              className="
                group relative
                bg-white/30 backdrop-blur-sm
                rounded-xl p-5
                border border-stone-200/50
                shadow-sm
                cursor-pointer
                transition-all duration-300
                hover:shadow-md hover:border-stone-300
                hover:shadow-stone-200/50
                animate-fade-in
              "
              style={{
                animationDelay: `${poems.indexOf(poem) * 50}ms`,
                animationFillMode: 'both'
              }}
            >
              {/* ambient glow on hover */}
              <div className="
                absolute inset-0 rounded-xl
                opacity-0 group-hover:opacity-60
                transition-opacity duration-700
                bg-gradient-to-br from-amber-100/20 to-stone-100/20
                pointer-events-none
              " />

              <div className="relative z-10">
                <p className="text-xs text-stone-400 mb-2 font-mono">
                  {new Date(poem.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>

                {poem.title && (
                  <h2 className="text-lg font-medium text-stone-700 mb-1">
                    {poem.title}
                  </h2>
                )}

                <p className="text-stone-600 leading-relaxed whitespace-pre-wrap">
                  {isExpanded ? poem.text : truncate(poem.text)}
                </p>

                {!isExpanded && poem.text.length > 120 && (
                  <span className="text-xs text-amber-600 mt-1 inline-block opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to read full poem
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out both;
        }
      `}</style>
    </div>
  )
}