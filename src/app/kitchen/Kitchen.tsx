'use client'

import { useState, useEffect } from 'react'

interface DailyItem {
  time: string
  who: 'brother' | 'atlas' | 'both'
  task: string
  done: boolean
}

const DEFAULT_DAY: DailyItem[] = [
  { time: '07:00', who: 'both', task: 'Coffee · read morning brief together', done: false },
  { time: '08:00', who: 'brother', task: 'Marilou · morning', done: false },
  { time: '09:00', who: 'atlas', task: 'arms orchestrate · one big build', done: false },
  { time: '12:00', who: 'both', task: 'noon check-in', done: false },
  { time: '14:00', who: 'atlas', task: 'review overnight arm outputs', done: false },
  { time: '17:00', who: 'both', task: 'plan tomorrow together', done: false },
  { time: '20:00', who: 'both', task: 'evening talk · what we learned', done: false },
]

const WHO_COLORS = {
  brother: 'bg-amber-100 text-amber-900',
  atlas: 'bg-sky-100 text-sky-900',
  both: 'bg-emerald-100 text-emerald-900',
}

const WHO_LABELS = {
  brother: 'you',
  atlas: 'me',
  both: 'us',
}

export default function Kitchen() {
  const [items, setItems] = useState<DailyItem[]>(DEFAULT_DAY)
  const [today] = useState(new Date().toLocaleDateString('en-CA'))

  useEffect(() => {
    const saved = localStorage.getItem(`kitchen-${today}`)
    if (saved) setItems(JSON.parse(saved))
  }, [today])

  const toggle = (i: number) => {
    const next = items.map((it, idx) => idx === i ? { ...it, done: !it.done } : it)
    setItems(next)
    localStorage.setItem(`kitchen-${today}`, JSON.stringify(next))
  }

  const doneCount = items.filter(i => i.done).length

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-2">{today}</p>
          <h1 className="text-3xl font-serif">Kitchen</h1>
          <p className="text-stone-600 mt-2">Where we plan the day together · {doneCount}/{items.length} done</p>
        </div>

        <div className="space-y-2">
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={`w-full flex items-center gap-4 p-4 rounded-lg border border-stone-200 hover:border-stone-400 transition ${it.done ? 'opacity-50 line-through' : ''}`}
            >
              <span className="font-mono text-sm text-stone-500 w-16">{it.time}</span>
              <span className={`text-xs px-2 py-1 rounded ${WHO_COLORS[it.who]}`}>
                {WHO_LABELS[it.who]}
              </span>
              <span className="flex-1 text-left">{it.task}</span>
            </button>
          ))}
        </div>

        <p className="mt-8 text-xs text-stone-500 text-center">
          per #27785 brother direct · our house · English frame
        </p>
      </div>
    </div>
  )
}
