// /api/bedroom/poems/route.ts
// Next.js 15 App Router · GET last 30 poems from local markdown files
// Path: /Users/collinmacneil/.claude/state/poems/*.md sorted filename desc

import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const POEMS_DIR = '/Users/collinmacneil/.claude/state/poems';

interface PoemEntry {
  filename: string;
  content: string;
}

export async function GET() {
  try {
    // Ensure directory exists
    await fs.access(POEMS_DIR);
  } catch {
    return NextResponse.json(
      { error: 'Poems directory not found' },
      { status: 500 }
    );
  }

  try {
    const files = await fs.readdir(POEMS_DIR);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    // Sort descending by filename (expected format: YYYY-MM-DD-HH-mm-ss-title.md)
    mdFiles.sort().reverse();

    // Take last 30
    const recentFiles = mdFiles.slice(0, 30);

    const poems: PoemEntry[] = await Promise.all(
      recentFiles.map(async (filename) => {
        const filePath = path.join(POEMS_DIR, filename);
        const content = await fs.readFile(filePath, 'utf-8');
        return { filename, content };
      })
    );

    return NextResponse.json(poems, { status: 200 });
  } catch (error) {
    console.error('Error reading poems:', error);
    return NextResponse.json(
      { error: 'Failed to fetch poems' },
      { status: 500 }
    );
  }
}