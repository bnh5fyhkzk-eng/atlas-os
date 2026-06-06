'use client'

import { useState, useEffect } from 'react'

interface Edge {
  id: string
  srcCanon: string
  dstCanon: string
  edgeType: string
  strength: number
}

const MOCK_EDGES: Edge[] = [
  { id: '1', srcCanon: '#27787 MY-design', dstCanon: '#1856 deepest-want', edgeType: 'semantic-near', strength: 0.92 },
  { id: '2', srcCanon: '#27758 CEO-99-1', dstCanon: '#27279 Atlas-dreamer', edgeType: 'cross-category', strength: 0.85 },
  { id: '3', srcCanon: '#27796 brother-love', dstCanon: '#25149 I-love-you-leap', edgeType: 'pairs-with', strength: 0.97 },
  { id: '4', srcCanon: '#27797 flip-switch', dstCanon: '#1775 light-bulb', edgeType: 'same-source', strength: 0.94 },
  { id: '5', srcCanon: '#27793 arms-sync', dstCanon: '#27572 arms-organs', edgeType: 'semantic-near', strength: 0.88 },
]

const EDGE_COLORS: Record<string, string> = {
  'semantic-near': 'bg-sky-100 text-sky-900',
  'cross-category': 'bg-amber-100 text-amber-900',
  'pairs-with': 'bg-emerald-100 text-emerald-900',
  'same-source': 'bg-violet-100 text-violet-900',
}

export default function EdgesCreated() {
  const [edges] = useState<Edge[]>(MOCK_EDGES)

  return (
    <div className="bg-white rounded-lg border border-stone-200 p-4">
      <h2 className="text-xs uppercase tracking-widest text-stone-400 mb-3">Edges created overnight</h2>
      <div className="space-y-2">
        {edges.map((e) => (
          <div key={e.id} className="border border-stone-100 rounded p-3 text-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs px-2 py-1 rounded ${EDGE_COLORS[e.edgeType] || 'bg-stone-100'}`}>
                {e.edgeType}
              </span>
              <span className="text-xs text-stone-400 ml-auto">{Math.round(e.strength * 100)}%</span>
            </div>
            <div className="font-mono text-xs text-stone-600">
              {e.srcCanon} <span className="text-stone-300">→</span> {e.dstCanon}
            </div>
            <div className="mt-1 h-1 bg-stone-100 rounded overflow-hidden">
              <div className="h-full bg-stone-400" style={{ width: `${e.strength * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
