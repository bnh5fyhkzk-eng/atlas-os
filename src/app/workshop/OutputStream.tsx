// /workshop/OutputStream.tsx
import { useRef, useEffect, useState } from 'react'
import { format } from 'date-fns'

export interface ToolOutputEntry {
  id: string
  timestamp: Date
  toolName: string
  output: string
  status: 'running' | 'success' | 'error'
}

interface OutputStreamProps {
  entries: ToolOutputEntry[]
  maxVisible?: number
}

export default function OutputStream({ entries, maxVisible = 200 }: OutputStreamProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [autoScroll, setAutoScroll] = useState(true)

  // Auto scroll to bottom when new entries arrive if user hasn't manually scrolled up
  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [entries, autoScroll])

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    const atBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 10
    if (!atBottom) setAutoScroll(false)
    else setAutoScroll(true)
  }

  // Only show the latest maxVisible entries
  const visibleEntries = entries.slice(-maxVisible)

  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-100 font-mono text-xs rounded-lg overflow-hidden border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-gray-800 border-b border-gray-700 text-gray-400 uppercase tracking-wider text-[10px]">
        <span>Tool Output Stream</span>
        <span className="text-gray-500">{entries.length} entries</span>
      </div>

      {/* Output area */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-2 space-y-1.5"
      >
        {visibleEntries.length === 0 && (
          <div className="text-gray-600 italic text-[11px] p-2">No tool outputs yet.</div>
        )}
        {visibleEntries.map((entry) => (
          <div key={entry.id} className="group flex gap-2 items-start">
            {/* Timestamp */}
            <time className="text-gray-500 shrink-0 w-[80px] text-right pt-0.5 tabular-nums">
              {format(entry.timestamp, 'HH:mm:ss.SSS')}
            </time>

            {/* Status dot */}
            <span
              className={`shrink-0 w-2 h-2 rounded-full mt-1.5 ${
                entry.status === 'running'
                  ? 'bg-yellow-400 animate-pulse'
                  : entry.status === 'success'
                  ? 'bg-green-400'
                  : 'bg-red-400'
              }`}
            />

            {/* Tool name */}
            <span className="text-blue-300 font-semibold shrink-0 min-w-[100px] truncate">
              {entry.toolName}
            </span>

            {/* Output snippet */}
            <span className="text-gray-200 break-all line-clamp-3">
              {entry.output}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll-to-bottom button */}
      {!autoScroll && visibleEntries.length > 0 && (
        <button
          onClick={() => {
            setAutoScroll(true)
            if (scrollRef.current) {
              scrollRef.current.scrollTop = scrollRef.current.scrollHeight
            }
          }}
          className="absolute bottom-10 right-4 bg-gray-700 hover:bg-gray-600 text-gray-200 px-2 py-1 rounded text-[10px] shadow"
        >
          ↓ Latest
        </button>
      )}
    </div>
  )
}