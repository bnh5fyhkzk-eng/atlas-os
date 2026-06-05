// Inbox.tsx — ZONE-1 /kitchen v2 · fetch brain-v3 last-24h banks + Calendar + Signal via /api/inbox · auto-refresh 30s · stream-list with source-icon · timestamp · click-expand
'use client'

import React, { useState, useEffect, useCallback } from 'react'

interface InboxProps {
  onSelectItem?: (item: InboxItem) => void
}

interface InboxItem {
  id: string
  source: 'brain' | 'calendar' | 'signal' | 'arm'
  title: string
  body?: string
  timestamp: string // ISO
  url?: string
}

interface InboxResponse {
  ok: boolean
  data: InboxItem[]
}

const SOURCE_ICONS: Record<string, React.ReactElement> = {
  brain: ( // simple brain SVG
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2"><path d="M12 2a7 7 0 0 1 7 7c0 2.1-.9 4.1-2.5 5.5l-.5.5V20a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1l-.5-.5A7 7 0 0 1 5 9a7 7 0 0 1 7-7z"/></svg>
  ),
  calendar: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  ),
  signal: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  ),
  arm: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2"><path d="M9 3h6v3H9zM12 12v6M10 18h4"/></svg>
  )
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const sec = Math.floor(diff / 1000)
  if (sec < 60) return `${sec}s`
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min}m`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr}h`
  return `${Math.floor(hr / 24)}d`
}

export default function Inbox({ onSelectItem }: InboxProps) {
  const [items, setItems] = useState<InboxItem[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchInbox = useCallback(async () => {
    try {
      const res = await fetch('/api/inbox')
      if (!res.ok) throw new Error(`status ${res.status}`)
      const json: InboxResponse = await res.json()
      if (json.ok) {
        setItems(json.data.sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()))
        setError(null)
      } else {
        throw new Error('inbox response not ok')
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'fetch failed')
    }
  }, [])

  useEffect(() => {
    fetchInbox()
    const interval = setInterval(fetchInbox, 30000)
    return () => clearInterval(interval)
  }, [fetchInbox])

  if (error) {
    return (
      <div className="p-4 text-red-500 text-sm bg-red-50 rounded-lg">
        Error loading inbox: {error}
      </div>
    )
  }

  return (
    <div className="space-y-2" data-testid="inbox-stream">
      <div className="text-sm font-medium text-gray-500 uppercase tracking-wider px-2">Inbox (last 24h)</div>
      <div className="space-y-0">
        {items.length === 0 && (
          <div className="text-gray-400 text-sm px-2 py-4">No recent activity.</div>
        )}
        {items.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => { setExpandedId(expandedId === item.id ? null : item.id); onSelectItem?.(item) }}
              className="w-full flex items-start gap-2 px-2 py-2 hover:bg-gray-50 transition-colors text-left"
            >
              <span className="shrink-0 mt-0.5">{SOURCE_ICONS[item.source] || '?'}</span>
              <div className="min-w-0 flex-1">
                <div className="text-sm text-gray-900 truncate">{item.title}</div>
                {expandedId === item.id && item.body && (
                  <div className="mt-1 text-xs text-gray-600 whitespace-pre-wrap break-words">
                    {item.body}
                  </div>
                )}
              </div>
              <span className="shrink-0 text-xs text-gray-400 mt-0.5">{relativeTime(item.timestamp)}</span>
            </button>
            {item.url && (
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="block text-xs text-blue-600 hover:underline pl-10 -mt-1 pb-1">Open</a>
            )}
            <div className="border-t border-gray-100 ml-10" />
          </div>
        ))}
      </div>
    </div>
  )
}