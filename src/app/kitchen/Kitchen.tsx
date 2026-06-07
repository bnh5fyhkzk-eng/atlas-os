// /pascal-workspace/components/kitchen/Kitchen.tsx
// ZONE INTEGRATOR v2 · per #27787 design + #27788 brother-approval
// wires Inbox + Decide + ArmsQueue + TalkSeeds into single page layout
// state: selected inbox item flows to Decide; doneCount tracks assignments

'use client'

import { useState, useCallback } from 'react'
import Inbox from './Inbox'          // expects onSelectItem?: (item: InboxItem) => void
import Decide from './Decide'        // expects items: DecideItem[], onAssign: (id, owner) => Promise<void>
import ArmsQueue from './ArmsQueue'  // standalone
import TalkSeeds from './TalkSeeds'  // standalone

// -- shared types (mirroring zone definitions) --
interface InboxItem {
  id: string
  source: 'brain' | 'calendar' | 'signal' | 'arm'
  title: string
  body?: string
  timestamp: string
  url?: string
}

interface DecideItem {
  id: string
  title: string
  description?: string
  suggestedOwner: string | null
}

// -- date helper --
function todayDate(): string {
  const d = new Date()
  return d.toLocaleDateString('en-CA', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
  })
}

export default function Kitchen() {
  const [decideItems, setDecideItems] = useState<DecideItem[]>([])
  const [doneCount, setDoneCount] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // when inbox item is selected, add to decide list (if not already)
  const handleInboxSelect = useCallback((item: InboxItem) => {
    const newDecide: DecideItem = {
      id: item.id,
      title: item.title,
      description: item.body,
      suggestedOwner: null
    }
    setDecideItems(prev => {
      if (prev.find(d => d.id === item.id)) return prev
      return [...prev, newDecide]
    })
    setSelectedId(item.id)
  }, [])

  // handle assignment: remove from decideItems, increment doneCount
  const handleAssign = useCallback(async (itemId: string, owner: string) => {
    // POST to API (skeleton)
    try {
      await fetch('/api/kitchen/decide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, owner })
      })
    } catch {
      console.error('assign failed', itemId, owner)
    }

    // optimistic removal
    setDecideItems(prev => prev.filter(d => d.id !== itemId))
    setDoneCount(c => c + 1)
    if (selectedId === itemId) setSelectedId(null)
  }, [selectedId])

  // -- layout: full height flex column --
  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-zinc-100">
      {/* header stripe */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900">
        <div className="text-sm font-medium text-zinc-400">
          {todayDate()}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-zinc-500">Done</span>
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-900/40 text-emerald-200 text-sm font-bold">
            {doneCount}
          </span>
        </div>
      </header>

      {/* top 40% — inbox */}
      <div className="h-[40%] overflow-auto border-b border-zinc-800">
        <div className="h-full p-3">
          <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Inbox</h2>
          <Inbox onSelectItem={handleInboxSelect} />
        </div>
      </div>

      {/* middle 2-column — decide + arms-queue */}
      <div className="flex-1 grid grid-cols-2 overflow-hidden">
        {/* left: decide */}
        <div className="overflow-auto border-r border-zinc-800 p-3">
          <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Decide</h2>
          <Decide
            items={decideItems}
            onAssign={handleAssign}
          />
        </div>
        {/* right: arms queue */}
        <div className="overflow-auto p-3">
          <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Arms Queue</h2>
          <ArmsQueue />
        </div>
      </div>

      {/* bottom sticky — talk seeds */}
      <div className="sticky bottom-0 border-t border-zinc-800 bg-zinc-950">
        <TalkSeeds />
      </div>
    </div>
  )
}