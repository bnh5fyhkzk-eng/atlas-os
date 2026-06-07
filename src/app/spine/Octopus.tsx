// /app/spine/components/Octopus.tsx
// Next.js 15, TypeScript, Tailwind, stone-50 background, Quebec-FR microcopy

'use client'

import { useState, useEffect } from 'react'

type ArmKey = 'code' | 'pascal' | 'curiosity' | 'research' | 'infra' | 'dream' | 'hermes'

const ARM_LABELS: Record<ArmKey, { label: string; color: string; path: string }> = {
  code:      { label: 'Code',      color: '#3B82F6', path: 'M100,150 Q120,80 200,80' },
  pascal:    { label: 'Pascal',    color: '#10B981', path: 'M100,180 Q140,120 220,120' },
  curiosity: { label: 'Curiosité', color: '#F59E0B', path: 'M100,210 Q160,160 240,160' },
  research:  { label: 'Recherche', color: '#8B5CF6', path: 'M100,240 Q180,200 260,200' },
  infra:     { label: 'Infra',     color: '#EF4444', path: 'M100,270 Q200,240 280,240' },
  dream:     { label: 'Rêve',      color: '#EC4899', path: 'M100,300 Q220,280 300,280' },
  hermes:    { label: 'Hermès',    color: '#6366F1', path: 'M100,330 Q240,320 320,320' },
}

interface ArmData {
  lastPoem: string
  lastCatch: string
  lastDream: string
}

export default function Octopus() {
  const [selected, setSelected] = useState<ArmKey | null>(null)
  const [data, setData] = useState<Record<ArmKey, ArmData>>({} as any)
  const [cost, setCost] = useState<number>(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/openrouter/balance')
      .then(r => r.json())
      .then(b => setCost(b.balance || 0))
      .catch(() => setCost(0))
  }, [])

  const selectArm = async (key: ArmKey) => {
    setLoading(true)
    setSelected(key)
    try {
      const res = await fetch(`/api/brain/arm?name=${key}`)
      if (res.ok) {
        const json = await res.json()
        setData(prev => ({ ...prev, [key]: json }))
      }
    } catch {
      // fallback dummy
      setData(prev => ({ ...prev, [key]: { lastPoem: 'Aucun poème', lastCatch: 'Aucune capture', lastDream: 'Aucun rêve' } }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 relative flex flex-col items-center justify-center font-sans text-zinc-100">
      {/* Cost widget top-right */}
      <div className="absolute top-4 right-4 bg-zinc-900 shadow rounded-lg px-4 py-2 text-sm">
        <span className="text-zinc-400">Budget OpenRouter :</span>{' '}
        <span className="font-semibold">${cost.toFixed(2)}</span>
      </div>

      <h1 className="text-2xl font-bold mb-6 mt-10">Ma pieuvre de service</h1>

      {/* SVG Octopus */}
      <svg viewBox="0 0 400 400" className="w-80 h-80 mb-6">
        {/* Body */}
        <ellipse cx="150" cy="220" rx="50" ry="60" fill="#B45309" className="drop-shadow-md" />
        {/* Eyes */}
        <circle cx="130" cy="210" r="6" fill="white" />
        <circle cx="170" cy="210" r="6" fill="white" />
        <circle cx="132" cy="212" r="3" fill="black" />
        <circle cx="172" cy="212" r="3" fill="black" />

        {/* Tentacles (clickable groups) */}
        {(Object.entries(ARM_LABELS) as [ArmKey, typeof ARM_LABELS[ArmKey]][])
          .sort((a, b) => a[1].label.localeCompare(b[1].label)) // alphabetical for stable order
          .map(([key, arm]) => (
            <g
              key={key}
              onClick={() => selectArm(key)}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <path
                d={arm.path}
                stroke={arm.color}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />
              <text
                x={arm.path.split(' ').slice(-1)[0].split(',')[0]}
                y={parseFloat(arm.path.split(' ').slice(-1)[0].split(',')[1]) + 20}
                fill={arm.color}
                fontSize="12"
                fontWeight="bold"
                textAnchor="middle"
              >
                {arm.label}
              </text>
            </g>
          ))}
      </svg>

      {/* Selected arm panel */}
      {selected && (
        <div className="bg-zinc-900 rounded-xl shadow-lg p-6 w-full max-w-md mx-auto transition-all">
          <h2 className="text-xl font-bold mb-2 text-zinc-200">{ARM_LABELS[selected].label}</h2>
          {loading ? (
            <p className="text-zinc-500">Chargement en cours...</p>
          ) : (
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-stone-600">Dernier poème :</span>
                <p className="text-stone-600">{data[selected]?.lastPoem || 'Aucun'}</p>
              </div>
              <div>
                <span className="font-semibold text-stone-600">Dernière capture :</span>
                <p className="text-stone-600">{data[selected]?.lastCatch || 'Aucune'}</p>
              </div>
              <div>
                <span className="font-semibold text-stone-600">Dernier rêve :</span>
                <p className="text-stone-600">{data[selected]?.lastDream || 'Aucun'}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}