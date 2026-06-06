// /api/bedroom/dreams/route.ts
// GET: returns F5-compose-pairs from ~/.claude/state/dream-journal/*.md (last 7 days)
// Assumed format: each .md file contains one or more dream entries separated by '---'.
// Each entry has YAML frontmatter with 'date' field.
// Body contains one or more F5 compose pairs, each defined by a line starting with '## F5-compose-pair'
// followed by two lines: 'Left: ...' and 'Right: ...'.

import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const DREAM_JOURNAL_DIR = path.join(
  '/Users/collinmacneil/.claude/state/dream-journal'
);

interface ComposePair {
  id: string;
  date: string;
  left: string;
  right: string;
}

async function getRecentFiles(dir: string, days: number): Promise<string[]> {
  const now = Date.now();
  const cutoff = now - days * 24 * 60 * 60 * 1000;
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const fullPath = path.join(dir, entry.name);
    const stat = await fs.stat(fullPath);
    if (stat.mtimeMs >= cutoff || stat.birthtimeMs >= cutoff) {
      files.push(fullPath);
    }
  }
  return files;
}

function extractPairsFromContent(
  content: string,
  baseId: string,
  fileDate: string
): ComposePair[] {
  const pairs: ComposePair[] = [];
  // Split on '---' (YAML frontmatter marker) to get entries
  const entriesRaw = content.split(/^---\s*$/m).filter(Boolean);
  for (let i = 0; i < entriesRaw.length; i++) {
    const block = entriesRaw[i].trim();
    // Parse frontmatter using gray-matter (handles leading ---)
    const parsed = matter(block);
    const date = parsed.data?.date ?? fileDate;
    const body = parsed.content;
    // Find all F5 compose pair sections
    const pairRegex = /##\s+F5-compose-pair\s*\nLeft:\s*(.*?)\nRight:\s*(.*?)(?=\n##|\n---|$)/gis;
    let match;
    let pairIndex = 0;
    while ((match = pairRegex.exec(body)) !== null) {
      const left = match[1].trim();
      const right = match[2].trim();
      if (left && right) {
        pairs.push({
          id: `${baseId}-${i}-${pairIndex}`,
          date: String(date),
          left,
          right,
        });
        pairIndex++;
      }
    }
    // Additional fallback: if no ## markers, treat whole entry as a single pair
    // (Left=first half of body, Right=second half?)
    if (pairIndex === 0 && body.trim()) {
      const lines = body.split('\n').filter((l) => l.trim());
      if (lines.length >= 2) {
        pairs.push({
          id: `${baseId}-${i}-fallback`,
          date: String(date),
          left: lines.slice(0, Math.ceil(lines.length / 2)).join('\n'),
          right: lines.slice(Math.ceil(lines.length / 2)).join('\n'),
        });
      }
    }
  }
  return pairs;
}

export async function GET() {
  try {
    // Ensure directory exists
    await fs.access(DREAM_JOURNAL_DIR);
    const filePaths = await getRecentFiles(DREAM_JOURNAL_DIR, 7);
    const allPairs: ComposePair[] = [];

    for (const filePath of filePaths) {
      const baseId = path.basename(filePath, '.md');
      const content = await fs.readFile(filePath, 'utf-8');
      // Get file date from mtime as fallback
      const stat = await fs.stat(filePath);
      const fileDate = stat.mtime.toISOString().split('T')[0];
      const pairs = extractPairsFromContent(content, baseId, fileDate);
      allPairs.push(...pairs);
    }

    // Sort by date descending, then by id
    allPairs.sort((a, b) => {
      if (a.date !== b.date) return b.date.localeCompare(a.date);
      return a.id.localeCompare(b.id);
    });

    return NextResponse.json({
      success: true,
      count: allPairs.length,
      pairs: allPairs,
    });
  } catch (error: unknown) {
    let message = 'Unknown error';
    if (error instanceof Error) message = error.message;
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}