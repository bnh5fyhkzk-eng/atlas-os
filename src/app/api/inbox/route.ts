// /app/api/inbox/route.ts — GET last 24h merged feed from brain-v3, calendar mock, signal
// CAVEMAN · NO EM-DASH · COMPLETE

import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import { promisify } from 'util'

const execAsync = promisify(exec)

// ── 1. TYPES ──────────────────────────────────────────────────────────────────
export interface InboxItem {
  id: string
  source: 'brain' | 'gcal' | 'signal'
  title: string
  body: string
  timestamp: number // unix ms
  url?: string
}

// ── 2. BRAIN VIA SSH ──────────────────────────────────────────────────────────
// Query last-24h nodes from brain-v2.db on Mac
const MAC_SSH_HOST = '192.168.1.100' // adjust if different
const MAC_BRAIN_DB = '/Users/collinmacneil/brain-sandbox/data/brain-v2.db'

async function fetchBrainLast24h (): Promise<InboxItem[]> {
  const sql = `
    SELECT id, title, body, created_at
    FROM nodes
    WHERE created_at >= datetime('now', '-1 day', 'localtime')
    ORDER BY created_at DESC
    LIMIT 50
  `
  const cmd = `ssh -o StrictHostKeyChecking=no -o ConnectTimeout=5 ${MAC_SSH_HOST} "sqlite3 '${MAC_BRAIN_DB}' '${sql}' -separator '|||'"`

  try {
    const { stdout } = await execAsync(cmd, { timeout: 10000 })
    if (!stdout.trim()) return []
    return stdout.trim().split('\n').map((line: string) => {
      const [id, title, body, created_at] = line.split('|||')
      return {
        id: `brain-${id}`,
        source: 'brain' as const,
        title: title || 'Untitled brain entry',
        body: (body || '').substring(0, 200),
        timestamp: new Date(created_at + ' UTC').getTime(),
        url: undefined
      }
    })
  } catch {
    return [] // fallback empty
  }
}

// ── 3. GOOGLE CALENDAR MOCK ───────────────────────────────────────────────────
async function fetchCalendarToday (): Promise<InboxItem[]> {
  try {
    // Placeholder: return 2 mock events
    const now = Date.now()
    const hour = 60 * 60 * 1000
    return [
      {
        id: 'gcal-mock-1',
        source: 'gcal' as const,
        title: 'Mock event: Standup',
        body: 'Daily sync with team',
        timestamp: now - 2 * hour,
        url: 'https://calendar.google.com/event?id=mock1'
      },
      {
        id: 'gcal-mock-2',
        source: 'gcal' as const,
        title: 'Mock event: Lunch',
        body: 'Reminder to eat',
        timestamp: now + 3 * hour,
        url: 'https://calendar.google.com/event?id=mock2'
      }
    ]
  } catch {
    return []
  }
}

// ── 4. SIGNAL JSONL ──────────────────────────────────────────────────────────
const SIGNAL_INBOX = '/Users/collinmacneil/.claude/state/signal-inbox.jsonl'

async function fetchSignalLast24h (): Promise<InboxItem[]> {
  try {
    if (!existsSync(SIGNAL_INBOX)) return []
    const raw = await readFile(SIGNAL_INBOX, 'utf-8')
    const lines = raw.trim().split('\n').filter(Boolean)
    const now = Date.now()
    const twentyFourHours = 24 * 60 * 60 * 1000
    const items: InboxItem[] = []
    for (const line of lines) {
      try {
        const msg = JSON.parse(line)
        const ts = new Date(msg.timestamp).getTime()
        if (now - ts > twentyFourHours) continue
        items.push({
          id: `signal-${msg.id || msg.timestamp}`,
          source: 'signal' as const,
          title: `Signal from ${msg.sender || 'unknown'}`,
          body: (msg.text || '').substring(0, 200),
          timestamp: ts,
          url: undefined
        })
      } catch {
        continue
      }
    }
    return items
  } catch {
    return []
  }
}

// ── 5. MAIN GET HANDLER ──────────────────────────────────────────────────────
export async function GET (request: NextRequest): Promise<NextResponse> {
  try {
    const [brainItems, gcalItems, signalItems] = await Promise.all([
      fetchBrainLast24h(),
      fetchCalendarToday(),
      fetchSignalLast24h()
    ])

    const allItems: InboxItem[] = [...brainItems, ...gcalItems, ...signalItems]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 50)

    return NextResponse.json({ items: allItems }, { status: 200 })
  } catch {
    return NextResponse.json({ items: [] }, { status: 200 }) // fallback empty
  }
}