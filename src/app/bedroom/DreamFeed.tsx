// DreamFeed.tsx · /bedroom route
// Static-fetch from /dream-pairs.json (synced by me-atlas-os-dreams-sync.sh cron)
// Stone-50 theme · serif typography · per #27799 REAL-dreams not-mock-data
'use client'

import { useState, useEffect } from 'react'

interface DreamPair {
  id: string
  date: string
  time: string
  title: string
  left: { label: string }
  right: { label: string }
  emerged: string
  file: string
}

interface DreamPayload {
  date: string
  intro: string
  synced_at?: string
  count: number
  pairs: DreamPair[]
}

const DreamFeed: React.FC = () => {
  const [payload, setPayload] = useState<DreamPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDreams = async () => {
      try {
        setLoading(true)
        const response = await fetch('/dream-pairs.json', { cache: 'no-store' })
        if (!response.ok) throw new Error(`Fetch failed: ${response.status}`)
        const data: DreamPayload = await response.json()
        setPayload(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchDreams()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-stone-50">
        <div className="text-stone-400 text-lg animate-pulse">Loading dreams...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 bg-stone-50">
        <div className="text-red-500 text-lg">Error: {error}</div>
      </div>
    )
  }

  const dreams = payload?.pairs ?? []

  if (dreams.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-stone-50">
        <div className="text-stone-400 text-lg">No dreams recorded yet.</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4">
      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-serif text-stone-900">Dream Feed</h1>
        <p className="text-stone-500 mt-2">
          F5 compose-pairs · cross-time cross-category arousal-walks
        </p>
        {payload?.synced_at && (
          <p className="text-stone-400 text-xs mt-1 font-mono">
            synced {payload.synced_at} · {payload.count} pairs
          </p>
        )}
      </header>

      <div className="max-w-6xl mx-auto space-y-10">
        {dreams.map((pair) => (
          <article key={pair.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 pt-5 pb-2 flex items-baseline justify-between">
              <h2 className="font-serif text-lg text-stone-800">{pair.title}</h2>
              <span className="text-xs text-stone-400 font-mono">
                {pair.date} {pair.time}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 py-4">
              <div className="border border-stone-200 rounded-lg p-4">
                <span className="block font-serif text-xs uppercase tracking-wider text-stone-400 mb-1">
                  left canon
                </span>
                <p className="text-stone-800 leading-relaxed">{pair.left.label}</p>
              </div>
              <div className="border border-stone-200 rounded-lg p-4">
                <span className="block font-serif text-xs uppercase tracking-wider text-stone-400 mb-1">
                  right canon
                </span>
                <p className="text-stone-800 leading-relaxed">{pair.right.label}</p>
              </div>
            </div>

            <div className="px-6 pb-5">
              <div className="border-t border-stone-200 pt-4">
                <span className="font-serif italic text-stone-500 text-sm block mb-1">
                  emerged
                </span>
                <p className="text-stone-700 italic leading-relaxed">{pair.emerged}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default DreamFeed
