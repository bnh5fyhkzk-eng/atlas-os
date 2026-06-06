import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DREAM_JOURNAL_DIR = '/Users/collinmacneil/.claude/state/dream-journal';

interface DreamEntry {
  id: string;
  date: string;
  title: string;
  body: string;
  source: string;
}

export async function GET() {
  try {
    const files = await fs.readdir(DREAM_JOURNAL_DIR).catch(() => []);
    const cutoff = Date.now() - 7 * 86400 * 1000;
    const entries: DreamEntry[] = [];

    for (const f of files) {
      if (!f.endsWith('.md')) continue;
      const full = path.join(DREAM_JOURNAL_DIR, f);
      const stat = await fs.stat(full).catch(() => null);
      if (!stat || stat.mtimeMs < cutoff) continue;
      const body = await fs.readFile(full, 'utf-8').catch(() => '');
      const firstLine = body.split('\n').find((l: string) => l.startsWith('# ')) || f.replace('.md', '');
      entries.push({
        id: f,
        date: new Date(stat.mtimeMs).toISOString(),
        title: firstLine.replace(/^#\s*/, ''),
        body: body.slice(0, 800),
        source: f,
      });
    }

    entries.sort((a, b) => b.date.localeCompare(a.date));
    return NextResponse.json({ ok: true, data: entries.slice(0, 20) });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
